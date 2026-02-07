import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const usePersonalInventorySearch = () => {
  const [searchParams, setRawSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    offset: 0,
    name: '',
    status: '',
    providedDate: '',
    usage: 'Personal use',
    view: 'grid',
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
      name: getString('name'),
      status: getString('status'),
      providedDate: getString('providedDate'),
      usage: getString('usage'),
      view: getString('view') || defaultSearchData.view,
    }),
    [searchParams]
  );

  const setSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullFilters = { ...searchData, ...updated };
    if (!(Object.keys(updated).length === 1 && 'offset' in updated)) {
      fullFilters.offset = 0;
    }
    const appendKey = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v) => nextParams.append(key, v));
      } else if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    };
    Object.entries(fullFilters).forEach(([key, value]) => {
      appendKey(key, value);
    });
    setRawSearchParams(nextParams, { replace: true });
  };

  const resetSearchData = () => {
    const currentUsage = searchParams.get('usage') || 'Personal use';
    const currentView = searchParams.get('view') || 'list';
    const defaultParams = {
      limit: 10,
      offset: 0,
      name: '',
      status: '',
      providedDate: '',
      usage: currentUsage,
      view: currentView,
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

    setRawSearchParams(nextParams, { replace: true });
  };
  return {
    searchData,
    setSearchData,
    resetSearchData,
    searchParams,
    setSearchParams: setRawSearchParams,
  };
};
