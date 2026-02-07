import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const defaultSearchData = {
  fromYear: '',
  fromMonth: '',
  toYear: '',
  toMonth: '',
  page: 0,
  size: 10,
};

export const usePaymentReportSearchParams = () => {
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
      fromMonth: getValue('fromMonth', defaultSearchData.fromMonth),
      toYear: getValue('toYear', defaultSearchData.toYear),
      toMonth: getValue('toMonth', defaultSearchData.toMonth),
      page: getValue('page', defaultSearchData.page),
      size: getValue('size', defaultSearchData.size),
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
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return {
    searchData,
    setPaymentReportSearchData,
    resetSearchData,
  };
};
