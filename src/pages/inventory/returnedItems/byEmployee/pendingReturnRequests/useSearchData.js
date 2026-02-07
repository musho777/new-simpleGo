import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const usePendingReturnRequestsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
      page: getNumber('page', 1),
      limit: getNumber('limit', 10),
      employeeName: getString('employeeName'),
      itemName: getString('itemName'),
      returnedFromDate: getString('returnedFromDate') || null,
    }),
    [searchParams]
  );

  const setSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    const appendKey = (key, value) => {
      if (value !== null && value !== undefined && value !== '') {
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
    const defaultParams = {
      limit: 10,
      page: 1,
    };

    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setSearchData,
    resetSearchData,
  };
};

export default usePendingReturnRequestsSearchParams;
