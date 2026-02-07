import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const usePersonalRequestsSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    offset: 0,
    startDate: '',
    endDate: '',
  };

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const getString = (key) => searchParams.get(key) ?? '';

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      startDate: getString('startDate'),
      endDate: getString('endDate'),
    }),
    [searchParams]
  );

  const setPersonalRequestsSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'offset' in updated)) {
      fullSearchData.offset = 0;
    }

    Object.entries(fullSearchData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  const resetSearchData = () => {
    const nextParams = new URLSearchParams();

    Object.entries(defaultSearchData).forEach(([key, value]) => {
      nextParams.set(key, String(value));
    });

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setPersonalRequestsSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
