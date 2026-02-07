import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useRequestHistorySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    offset: 0,
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    status: '',
  };

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const getString = (key, fallback = '') => {
    return searchParams.get(key) || fallback;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      requesterName: getString('requesterName'),
      requesterEmail: getString('requesterEmail'),
      requesterPhone: getString('requesterPhone'),
      status: getString('status'),
    }),
    [searchParams]
  );

  const setRequestHistorySearchData = (updated) => {
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
    setRequestHistorySearchData,
    resetSearchData,
    defaultSearchData,
  };
};
