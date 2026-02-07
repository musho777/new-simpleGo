import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const defaultSearchData = {
  fromYear: '',
  fromHalfYear: '',
  toYear: '',
  toHalfYear: '',
  page: 0,
  size: 10,
};

export const useSubscribersSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValue = (key, fallback) => {
    const val = searchParams.get(key);
    if (val === null) return fallback;
    if (val === '') return '';
    return Number(val);
  };

  const searchData = useMemo(
    () => ({
      fromYear: getValue('fromYear', defaultSearchData.fromYear),
      fromHalfYear: getValue('fromHalfYear', defaultSearchData.fromHalfYear),
      toYear: getValue('toYear', defaultSearchData.toYear),
      toHalfYear: getValue('toHalfYear', defaultSearchData.toHalfYear),
      page: getValue('page', defaultSearchData.page),
      size: getValue('size', defaultSearchData.size),
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
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return {
    searchData,
    setSubscribersSearchData,
    resetSearchData,
  };
};
