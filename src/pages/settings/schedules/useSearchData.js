import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const defaultSearchData = {
  limit: 12,
  offset: 0,
  name: '',
};

export const useSchedulesSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getString = (key, fallback = '') => {
    const val = searchParams.get(key);
    return val !== null ? val : fallback;
  };
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    const num = val !== null ? Number(val) : fallback;
    if (key === 'limit') {
      return isNaN(num) || num > defaultSearchData.limit ? defaultSearchData.limit : num;
    }
    return isNaN(num) ? fallback : num;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      name: getString('name', defaultSearchData.name),
    }),
    [searchParams]
  );

  const setSchedulesSearchData = (updated) => {
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
    setSchedulesSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
