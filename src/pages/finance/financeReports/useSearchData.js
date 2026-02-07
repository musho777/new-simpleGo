import { useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { formatDateTime } from 'utils/dateUtils';

export const useFinanceRequestSearchData = () => {
  const [searchData, setSearchData] = useState({
    search: '',
    offset: 0,
    limit: 10,
  });

  const setFinanceRequestSearchData = (data) => {
    setSearchData((prev) => ({ ...prev, ...data }));
  };

  const resetSearchData = () => {
    setSearchData({
      search: '',
      offset: 0,
      limit: 10,
    });
  };

  return {
    searchData,
    setFinanceRequestSearchData,
    resetSearchData,
  };
};

export const useFinanceReportsSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    offset: 0,
    startDate: null,
    endDate: null,
    requestedDateFrom: null,
    requestedDateTo: null,
    currency: '',
    minAmount: '',
    maxAmount: '',
    expenseType: '',
    paymentMethod: '',
    requesterUuid: '',
    status: '',
    missingStatus: '',
    completedDateFrom: null,
    completedDateTo: null,
  };

  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const requestedDateFrom = searchParams.get('requestedDateFrom');
    const requestedDateTo = searchParams.get('requestedDateTo');
    const completedDateFrom = searchParams.get('completedDateFrom');
    const completedDateTo = searchParams.get('completedDateTo');

    return {
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      startDate: formatDateTime(startDate, true),
      endDate: formatDateTime(endDate, true),
      requestedDateFrom: formatDateTime(requestedDateFrom, true),
      requestedDateTo: formatDateTime(requestedDateTo, true),
      currency: getString('currency'),
      minAmount: getString('minAmount'),
      maxAmount: getString('maxAmount'),
      expenseType: getString('expenseType'),
      paymentMethod: getString('paymentMethod'),
      requesterUuid: getString('requesterUuid'),
      status: getString('status'),
      missingStatus: getString('missingStatus'),
      completedDateFrom: formatDateTime(completedDateFrom, true),
      completedDateTo: formatDateTime(completedDateTo, true),
    };
  }, [searchParams]);

  const setFinanceReportsSearchData = (updated) => {
    const nextParams = new URLSearchParams();

    // Get current URL param values (not formatted for backend)
    const currentUrlParams = {
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'),
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
      requestedDateFrom: searchParams.get('requestedDateFrom'),
      requestedDateTo: searchParams.get('requestedDateTo'),
      currency: searchParams.get('currency'),
      minAmount: searchParams.get('minAmount'),
      maxAmount: searchParams.get('maxAmount'),
      expenseType: searchParams.get('expenseType'),
      paymentMethod: searchParams.get('paymentMethod'),
      requesterUuid: searchParams.get('requesterUuid'),
      status: searchParams.get('status'),
      missingStatus: searchParams.get('missingStatus'),
      completedDateFrom: searchParams.get('completedDateFrom'),
      completedDateTo: searchParams.get('completedDateTo'),
    };

    const fullSearchData = { ...currentUrlParams, ...updated };

    if (!(Object.keys(updated).length === 1 && 'offset' in updated)) {
      fullSearchData.offset = 0;
    }

    const dateFields = [
      'startDate',
      'endDate',
      'requestedDateFrom',
      'requestedDateTo',
      'completedDateFrom',
      'completedDateTo',
    ];

    dateFields.forEach((field) => {
      if (field in fullSearchData && fullSearchData[field]) {
        fullSearchData[field] = dayjs(fullSearchData[field]).format('YYYY-MM-DD');
      }
    });

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
    setFinanceReportsSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
