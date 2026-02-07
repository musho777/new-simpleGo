import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { formatDateTime } from 'utils/dateUtils';

export const useErbContractBalanceSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    size: 10,
    page: 0,
    search: '',
    dateFrom: null,
    dateTo: null,
    allTime: false,
  };

  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };
  const getBoolean = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? val === 'true' : fallback;
  };

  const searchData = useMemo(
    () => ({
      size: getNumber('size', defaultSearchData.size),
      page: getNumber('page', defaultSearchData.page),
      search: getString('search'),
      dateFrom: formatDateTime(searchParams.get('dateFrom'), true) || null,
      dateTo: formatDateTime(searchParams.get('dateTo'), true) || null,
      allTime: getBoolean('allTime', defaultSearchData.allTime),
    }),
    [searchParams]
  );

  const setErbContractBalanceSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'page' in updated)) {
      fullSearchData.page = 0;
    }

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (key === 'allTime' && value === true) {
        nextParams.set(key, value);
      } else if (key !== 'allTime' && value !== null && value !== undefined && value !== '') {
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

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (key === 'allTime' && value === true) {
        nextParams.set(key, value);
      } else if (key !== 'allTime' && value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    };

    Object.entries(defaultSearchData).forEach(([key, value]) => {
      appendKey(key, value);
    });

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setErbContractBalanceSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
