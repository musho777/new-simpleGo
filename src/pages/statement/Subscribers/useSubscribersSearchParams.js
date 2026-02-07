import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const currentDate = new Date();

const defaultSearchData = {
  fromYear: currentDate.getFullYear(),
  fromHalfYear: 1,
  toYear: currentDate.getFullYear(),
  toHalfYear: currentDate.getMonth() < 6 ? 1 : 2,
  page: 0,
  size: 10,
};

export const useSubscribersSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      fromYear: getNumber('fromYear', defaultSearchData.fromYear),
      fromHalfYear: getNumber('fromHalfYear', defaultSearchData.fromHalfYear),
      toYear: getNumber('toYear', defaultSearchData.toYear),
      toHalfYear: getNumber('toHalfYear', defaultSearchData.toHalfYear),
      page: getNumber('page', defaultSearchData.page),
      size: getNumber('size', defaultSearchData.size),
    }),
    [searchParams]
  );

  const setSubscribersSearchData = (updated) => {
    const fullSearchData = { ...searchData, ...updated };

    if (!('page' in updated)) {
      fullSearchData.page = 0;
    }

    const nextParams = new URLSearchParams();

    Object.entries(fullSearchData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  const resetSearchData = () => {
    const nextParams = new URLSearchParams();

    Object.entries(defaultSearchData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setSubscribersSearchData,
    resetSearchData,
  };
};
