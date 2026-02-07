import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useTicketSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    offset: 0,
    taskId: '',
    search: '',
    customerId: '',
    onlyAssignee: false,
    onlyAssigneeNew: false,
    onlyTeam: false,
    onlyTeamNew: false,
    onlyWatcher: false,
    onlyWatcherNew: false,
    fromDate: '',
    toDate: '',
    projectIds: [],
    subprojectIds: [],
    teamIds: [],
    assigneeIds: [],
    priorities: [],
    createdByIds: [],
    status: [],
    trackers: [],
    type: 'list',
  };

  const getArray = (key) => searchParams.getAll(key);
  const getString = (key) => searchParams.get(key) ?? '';
  const getBoolean = (key) => searchParams.get(key) === 'true';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      taskId: getString('taskId'),
      search: getString('search'),
      customerId: getString('customerId'),
      onlyAssignee: getBoolean('onlyAssignee'),
      onlyAssigneeNew: getBoolean('onlyAssigneeNew'),
      onlyTeam: getBoolean('onlyTeam'),
      onlyTeamNew: getBoolean('onlyTeamNew'),
      onlyWatcher: getBoolean('onlyWatcher'),
      onlyWatcherNew: getBoolean('onlyWatcherNew'),
      fromDate: getString('fromDate'),
      toDate: getString('toDate'),
      projectIds: getArray('projectIds'),
      subprojectIds: getArray('subprojectIds'),
      teamIds: getArray('teamIds'),
      assigneeIds: getArray('assigneeIds'),
      priorities: getArray('priorities').map(Number).filter(Boolean),
      createdByIds: getArray('createdByIds'),
      status: getArray('status'),
      trackers: getArray('trackers'),
      type: getString('type'),
    }),
    [searchParams]
  );

  const setTicketSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'offset' in updated)) {
      fullSearchData.offset = 0;
    }

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    };

    Object.entries(fullSearchData).forEach(([key, value]) => {
      appendKey(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  const resetSearchData = () => {
    const defaultParams = {
      limit: 10,
      offset: 0,
      taskId: '',
      search: '',
      customerId: '',
      onlyAssignee: false,
      onlyAssigneeNew: false,
      onlyTeam: false,
      onlyTeamNew: false,
      onlyWatcher: false,
      onlyWatcherNew: false,
      fromDate: '',
      toDate: '',
      projectIds: [],
      subprojectIds: [],
      teamIds: [],
      assigneeIds: [],
      priorities: [],
      createdByIds: [],
      status: [],
      trackers: [],
      type: searchData.type,
    };

    const nextParams = new URLSearchParams();

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    };

    Object.entries(defaultParams).forEach(([key, value]) => {
      appendKey(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setTicketSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
