import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useAwaitingSearch = () => {
  const [searchParams, setRawSearchParams] = useSearchParams();

  const defaultSearchData = {
    page: 1,
    limit: 10,
  };

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      page: getNumber('page', defaultSearchData.page),
      limit: getNumber('limit', defaultSearchData.limit),
    }),
    [searchParams]
  );

  const setSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullFilters = { ...searchData, ...updated };

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    };
    Object.entries(fullFilters).forEach(([key, value]) => {
      appendKey(key, value);
    });
    setRawSearchParams(nextParams, { replace: true });
  };

  const resetSearchData = () => {
    const defaultParams = {
      page: 1,
      limit: 10,
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

    setRawSearchParams(nextParams, { replace: true });
  };
  return {
    searchData,
    setSearchData,
    resetSearchData,
    searchParams,
    setSearchParams: setRawSearchParams,
  };
};
