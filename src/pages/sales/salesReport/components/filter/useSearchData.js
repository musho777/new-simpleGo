import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';

export const useReportSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getString = (key) => searchParams.get(key) ?? '';

  const getFirstDayOfCurrentMonth = () => {
    return dayjs().startOf('month').format('YYYY-MM-DD');
  };

  const formatDateForBackend = (dateString, type = 'start') => {
    if (!dateString) return null;

    // Parse YYYY-MM-DD without timezone interpretation
    const [year, month, day] = dateString.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (type === 'end') {
      parsedDate.setHours(23, 59, 59, 999);
    } else {
      parsedDate.setHours(0, 0, 0, 0);
    }

    return parsedDate.toISOString();
  };

  const searchData = useMemo(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    return {
      period: getString('period') || null,
      startDate: formatDateForBackend(startDate || getFirstDayOfCurrentMonth(), 'start'),
      endDate: formatDateForBackend(endDate, 'end'),
      creatorId: getString('creatorId'),
      department: getString('department'),
      leadSourceId: getString('leadSourceId'),
      offerId: getString('offerId'),
      statusId: getString('statusId'),
      tab: getString('tab') || 'Conversion Overview',
    };
  }, [searchParams]);

  const setReportSearchData = (updated) => {
    const nextParams = new URLSearchParams();

    // Get current URL param values (not formatted for backend)
    const currentUrlParams = {
      period: searchParams.get('period'),
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
      creatorId: searchParams.get('creatorId'),
      department: searchParams.get('department'),
      leadSourceId: searchParams.get('leadSourceId'),
      offerId: searchParams.get('offerId'),
      statusId: searchParams.get('statusId'),
      tab: searchParams.get('tab'),
    };

    const fullSearchData = { ...currentUrlParams, ...updated };

    // Date fields that need to be stored as YYYY-MM-DD format
    const dateFields = ['startDate', 'endDate'];

    // Convert ISO strings to YYYY-MM-DD format for URL params
    dateFields.forEach((field) => {
      if (field in fullSearchData && fullSearchData[field]) {
        fullSearchData[field] = dayjs(fullSearchData[field]).format('YYYY-MM-DD');
      }
    });

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
      startDate: '',
      endDate: '',
      creatorId: '',
      department: '',
      leadSourceId: '',
      tab: 'Conversion Overview',
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
    setReportSearchData,
    resetSearchData,
  };
};
