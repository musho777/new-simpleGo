import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useCustomerManagementSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    size: 10,
    page: 0,
    customerId: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    tariffs: [],
    statuses: [],
    dateFrom: null,
    dateTo: null,
    sort: '',
  };

  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };
  const getArray = (key) => searchParams.getAll(key);

  const searchData = useMemo(
    () => ({
      size: getNumber('size', defaultSearchData.size),
      page: getNumber('page', defaultSearchData.page),
      customerId: getString('customerId'),
      fullName: getString('fullName'),
      address: getString('address'),
      phoneNumber: getString('phoneNumber'),
      tariffs: getArray('tariffs'),
      statuses: getArray('statuses'),
      dateFrom: searchParams.get('dateFrom') || null,
      dateTo: searchParams.get('dateTo') || null,
      sort: getString('sort'),
    }),
    [searchParams]
  );

  const setCustomerManagementSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'page' in updated)) {
      fullSearchData.page = 0;
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
    setCustomerManagementSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
