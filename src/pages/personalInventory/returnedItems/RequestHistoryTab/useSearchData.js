import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useRequestHistoryTabSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    page: 1,
    limit: 10,
    itemName: '',
    status: '',
    requestedFromDate: '',
    requestedToDate: '',
    returnedFromDate: '',
    returnedToDate: '',
    tab: 'history',
  };

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const getString = (key) => searchParams.get(key) ?? '';

  const searchData = useMemo(
    () => ({
      page: getNumber('page', defaultSearchData.page),
      limit: getNumber('limit', defaultSearchData.limit),
      itemName: getString('itemName'),
      status: getString('status'),
      requestedFromDate: getString('requestedFromDate'),
      requestedToDate: getString('requestedToDate'),
      returnedFromDate: getString('returnedFromDate'),
      returnedToDate: getString('returnedToDate'),
      tab: getString('tab', defaultSearchData.tab),
    }),
    [searchParams]
  );

  const setRequestHistoryTabSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'page' in updated)) {
      fullSearchData.page = 1;
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
      if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setRequestHistoryTabSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
