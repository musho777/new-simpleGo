import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const defaultSearchData = {
  limit: 10,
  offset: 0,
  name: '',
  description: '',
  disabled: '',
  status: 'All statuses',
  districtIds: [],
  leadId: '',
  memberName: '',
};

export const useTeamsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getArray = (key) => searchParams.getAll(key);
  const getString = (key, fallback = '') => {
    const val = searchParams.get(key);
    return val !== null ? val : fallback;
  };
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      name: getString('name', defaultSearchData.name),
      description: getString('description', defaultSearchData.description),
      disabled: getString('disabled', defaultSearchData.disabled),
      status: getString('status', defaultSearchData.status),
      districtIds: getArray('districtIds'),
      leadId: getString('leadId', defaultSearchData.leadId),
      memberName: getString('memberName'),
    }),
    [searchParams]
  );

  const setTeamsSearchData = (updated) => {
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
    const nextParams = new URLSearchParams();

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    };

    Object.entries(defaultSearchData).forEach(([key, value]) => {
      appendKey(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setTeamsSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
