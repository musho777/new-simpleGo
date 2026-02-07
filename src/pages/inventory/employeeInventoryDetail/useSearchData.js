import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useEmployeeInventoryDetailParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getArray = (key) => searchParams.getAll(key);
  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', 10),
      page: getNumber('page', 1),
      categoryId: getString('categoryId'),
      itemName: getArray('itemName'),
      providedFromDate: getString('providedFromDate'),
      providedToDate: getString('providedToDate'),
      expiryFromDate: getString('expiryFromDate'),
      expiryToDate: getString('expiryToDate'),
      minQuantity: getString('minQuantity'),
      maxQuantity: getString('maxQuantity'),
      search: getString('search'),
    }),
    [searchParams]
  );

  const setInventorySearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

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
    const defaultParams = {
      limit: 10,
      page: 1,
      categoryId: '',
      itemName: '',
      providedDateFrom: '',
      providedToDate: '',
      expiryFromDate: '',
      expiryToDate: '',
      minQuantity: '',
      maxQuantity: '',
      search: '',
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

    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setInventorySearchData,
    resetSearchData,
  };
};
