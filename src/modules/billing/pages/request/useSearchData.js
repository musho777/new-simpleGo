import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { getPreviousDate } from 'utils/dateUtils';

export const useRequestSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getArray = (key) => searchParams.getAll(key);
  const getString = (key, fallback = '') => searchParams.get(key) ?? fallback;
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      page: getNumber('page', 1),
      size: getNumber('size', 10),
      region: getArray('region'),
      city: getArray('city'),
      statusIds: getArray('statusIds'),
      typeIds: getArray('typeIds'),
      from: getString('from', getPreviousDate()),
      to: getString('to', getPreviousDate()),
    }),
    [searchParams]
  );

  const setRequestSearchData = (updated) => {
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
      page: 1,
      regions: [],
      cities: [],
      statusIds: [],
      typeIds: [],
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
    setRequestSearchData,
    resetSearchData,
  };
};
