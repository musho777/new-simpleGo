import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useProjectSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getString = (key, fallback = '') => {
    const val = searchParams.get(key);
    return val !== null ? val : fallback;
  };
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      limit: getNumber('limit', 10),
      offset: getNumber('offset', 0),
      name: getString('name'),
      disabled: getString('disabled'),
      status: getString('status', 'active'),
    }),
    [searchParams]
  );

  const setProjectSearchData = (updated) => {
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
    const defaultParams = {
      limit: 10,
      offset: 0,
      name: '',
      disabled: false,
      status: 'active',
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
    setProjectSearchData,
    resetSearchData,
  };
};
