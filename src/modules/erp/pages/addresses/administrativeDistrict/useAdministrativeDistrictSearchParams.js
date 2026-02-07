import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useAdministrativeDistrictSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    offset: 0,
    currentPage: 1,
    selectedCountry: null,
    selectedRegion: null,
    selectedCity: null,
  };

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };
  const getObject = (key) => {
    const val = searchParams.get(key);
    return val ? JSON.parse(val) : null;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      currentPage: getNumber('currentPage', defaultSearchData.currentPage),
      selectedCountry: getObject('selectedCountry'),
      selectedRegion: getObject('selectedRegion'),
      selectedCity: getObject('selectedCity'),
    }),
    [searchParams]
  );

  const setAdministrativeDistrictSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'offset' in updated)) {
      fullSearchData.offset = 0;
    }

    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (typeof value === 'object' && value !== null) {
        nextParams.set(key, JSON.stringify(value));
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
      } else if (typeof value === 'object' && value !== null) {
        nextParams.set(key, JSON.stringify(value));
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
    setAdministrativeDistrictSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
