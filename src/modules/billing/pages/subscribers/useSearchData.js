import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { getPreviousDate } from 'utils/dateUtils';

export const useSubscribersSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getArray = (key) => searchParams.getAll(key);
  const getString = (key, fallback = '') => searchParams.get(key) ?? fallback;
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      page: getNumber('page', 0),
      size: getNumber('size', 10),
      region: getArray('region'),
      city: getArray('city'),
      oldTariff: getArray('oldTariff'),
      currentTariff: getArray('currentTariff'),
      oldStatus: getArray('oldStatus'),
      currentStatus: getArray('currentStatus'),
      contractId: getString('contractId'),
      from: getString('from', getPreviousDate()),
      to: getString('to', getPreviousDate()),
      sort: getArray('sort'),
    }),
    [searchParams]
  );

  const setSubscribersSearchData = (updated) => {
    const fullSearchData = { ...searchData, ...updated };

    const nextParams = new URLSearchParams();

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
      page: 0,
      size: 10,
      region: [],
      city: [],
      oldTariff: [],
      currentTariff: [],
      oldStatus: [],
      currentStatus: [],
      contractId: '',
      from: getPreviousDate(),
      to: getPreviousDate(),
      sort: [],
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
    setSubscribersSearchData,
    resetSearchData,
  };
};
