import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useDiagramsSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    startDate: null,
    endDate: null,
  };

  const searchData = useMemo(
    () => ({
      startDate: searchParams.get('startDate') || null,
      endDate: searchParams.get('endDate') || null,
    }),
    [searchParams]
  );

  const setDiagramsSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    const appendKey = (key, value) => {
      if (value !== null && value !== undefined && value !== '') {
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
      if (value !== null && value !== undefined && value !== '') {
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
    setDiagramsSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
