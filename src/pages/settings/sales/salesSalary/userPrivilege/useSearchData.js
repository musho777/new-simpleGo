import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const useSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    page: 1,
    search: '',
    isEnabled: '',
    status: 'all',
  };

  const getString = (key, fallback = '') => searchParams.get(key) ?? fallback;

  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const getBooleanOrEmpty = (key) => {
    const val = searchParams.get(key);
    if (val === 'true') return true;
    if (val === 'false') return false;
    return '';
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', defaultSearchData.limit),
      page: getNumber('page', defaultSearchData.page),
      search: getString('search', defaultSearchData.search),
      status: getString('status', defaultSearchData.status),
      isEnabled: getBooleanOrEmpty('isEnabled'),
    }),
    [searchParams]
  );

  const setSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'page' in updated)) {
      fullSearchData.page = 1;
    }

    Object.entries(fullSearchData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  const resetSearchData = () => {
    const nextParams = new URLSearchParams();
    Object.entries(defaultSearchData).forEach(([key, value]) => {
      nextParams.set(key, String(value));
    });
    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setSearchData,
    resetSearchData,
    defaultSearchData,
  };
};

export default useSearchData;
