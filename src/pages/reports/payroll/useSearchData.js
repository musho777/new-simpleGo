import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const usePayrollSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 1000,
    offset: 0,
    departmentId: '',
    branchId: '',
    teamId: '',
    fromDate: null,
    toDate: null,
  };

  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      fromDate: getString('fromDate', defaultSearchData.fromDate),
      toDate: getString('toDate', defaultSearchData.toDate),
      departmentId: getString('departmentId'),
      branchId: getString('branchId'),
      teamId: getString('teamId'),
    }),
    [searchParams]
  );

  const setPayrollSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'offset' in updated)) {
      fullSearchData.offset = 0;
    }

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (value !== null && value !== undefined && value !== '') {
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
      } else if (value !== null && value !== undefined && value !== '') {
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
    setPayrollSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
