import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useUserSearchParams = () => {
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
      offset: getNumber('offset', 0),
      search: getString('search'),
      disabled: getString('disabled'),
      isVerified: getString('isVerified'),
      roleIds: getArray('roleIds'),
      occupations: getArray('occupations'),
      name: getString('name'),
      surname: getString('surname'),
      email: getString('email'),
      phoneNumber: getString('phoneNumber'),
      status: getString('status'),
      view: getString('view'),
    }),
    [searchParams]
  );
  const setUserSearchData = (updated) => {
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
    const currentView = searchParams.get('view') || 'list';

    const defaultParams = {
      limit: currentView === 'grid' ? 8 : 10,
      offset: 0,
      search: '',
      disabled: '',
      isVerified: '',
      roleIds: [],
      occupations: [],
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      status: '',
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

    setSearchParams(nextParams, { replace: true });
  };
  return {
    searchData,
    setUserSearchData,
    resetSearchData,
  };
};
