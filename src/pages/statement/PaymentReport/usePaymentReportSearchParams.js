import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const currentDate = new Date();

const defaultSearchData = {
  fromYear: currentDate.getFullYear(),
  fromMonth: 1,
  toYear: currentDate.getFullYear(),
  toMonth: currentDate.getMonth() + 1,
  page: 0,
  size: 10,
};

export const usePaymentReportSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      fromYear: getNumber('fromYear', defaultSearchData.fromYear),
      fromMonth: getNumber('fromMonth', defaultSearchData.fromMonth),
      toYear: getNumber('toYear', defaultSearchData.toYear),
      toMonth: getNumber('toMonth', defaultSearchData.toMonth),
      page: getNumber('page', defaultSearchData.page),
      size: getNumber('size', defaultSearchData.size),
    }),
    [searchParams]
  );

  const setPaymentReportSearchData = (updated) => {
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
    setPaymentReportSearchData,
    resetSearchData,
  };
};
