import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useCategoryItemSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const defaultSearchData = {
    limit: 8,
    offset: 0,
    name: '',
    usage: '',
    lifespan: '',
    insertedDate: '',
    view: 'table',
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', 8),
      offset: getNumber('offset', 0),
      name: getString('name'),
      usage: getString('usage'),
      lifespan: getString('lifespan'),
      insertedDate: getString('insertedDate'),
      view: getString('view'),
    }),
    [searchParams]
  );

  const setCategorySingleSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullFilters = { ...searchData, ...updated };
    if (
      !('offset' in updated) &&
      !('name' in updated && updated.name === searchData.name) &&
      !('usage' in updated && updated.usage === searchData.usage) &&
      !('lifespan' in updated && updated.lifespan === searchData.lifespan) &&
      !('insertedDate' in updated && updated.insertedDate === searchData.insertedDate)
    ) {
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
    setCategorySingleSearchData,
    resetSearchData,
  };
};
