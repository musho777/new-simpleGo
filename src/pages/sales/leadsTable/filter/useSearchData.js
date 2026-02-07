import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

const defaultSearchData = {
  companyName: '',
  communicationMethod: '',
  fullName: '',
  address: '',
  dateFrom: '',
  dateTo: '',
  statusId: '',
  createdBy: '',
  sourceId: '',
  direction: 'all',
  page: 1,
  limit: 10,
  sortOrder: 'desc',
  subprojectId: '',
  filterType: 'all',
  contactType: '',
};

export const useLeadSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(
    () => ({
      companyName: getString('companyName'),
      communicationMethod: getString('communicationMethod'),
      fullName: getString('fullName'),
      address: getString('address'),
      dateFrom: getString('dateFrom'),
      dateTo: getString('dateTo'),
      statusId: getString('statusId'),
      createdBy: getString('createdBy'),
      sourceId: getString('sourceId'),
      direction: getString('direction') || 'all',
      page: getNumber('page', 1),
      limit: getNumber('limit', 10),
      sortOrder: getString('sortOrder') || 'desc',
      subprojectId: getString('subprojectId'),
      filterType: getString('filterType') || 'all',
      contactType: getString('contactType') || '',
    }),
    [searchParams]
  );

  const setLeadSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    if (!(Object.keys(updated).length === 1 && 'page' in updated)) {
      fullSearchData.page = 1;
    }

    Object.entries(fullSearchData).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  const resetSearchData = () => {
    const nextParams = new URLSearchParams();
    Object.entries(defaultSearchData).forEach(([key, value]) => {
      if (value !== '') {
        nextParams.set(key, value);
      }
    });
    setSearchParams(nextParams, { replace: true });
  };

  return {
    searchData,
    setLeadSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
