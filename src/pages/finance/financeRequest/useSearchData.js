import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { formatDateTime } from 'utils/dateUtils';

export const useFinanceRequestSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSearchData = {
    limit: 10,
    offset: 0,
    search: '',
    searchId: '',
    flowType: '',
    expenseType: '',
    accountingType: '',
    paymentMethod: '',
    currency: '',
    status: '',
    startDateFrom: null,
    endDateTo: null,
    requestedDateFrom: null,
    requestedDateTo: null,
    amountFrom: '',
    amountTo: '',
    requester: '',
    completedDateFrom: null,
    completedDateTo: null,
    seenStatus: '',
  };
  const getString = (key) => searchParams.get(key) ?? '';
  const getNumber = (key, fallback) => {
    const val = searchParams.get(key);
    return val !== null ? Number(val) : fallback;
  };

  const searchData = useMemo(() => {
    const startDateFrom = searchParams.get('startDateFrom');
    const endDateTo = searchParams.get('endDateTo');
    const requestedDateFrom = searchParams.get('requestedDateFrom');
    const requestedDateTo = searchParams.get('requestedDateTo');
    const completedDateFrom = searchParams.get('completedDateFrom');
    const completedDateTo = searchParams.get('completedDateTo');

    return {
      limit: getNumber('limit', defaultSearchData.limit),
      offset: getNumber('offset', defaultSearchData.offset),
      search: getString('search'),
      searchId: getString('searchId'),
      flowType: getString('flowType'),
      expenseType: getString('expenseType'),
      accountingType: getString('accountingType'),
      paymentMethod: getString('paymentMethod'),
      currency: getString('currency'),
      status: getString('status'),
      startDateFrom: formatDateTime(startDateFrom, true),
      endDateTo: formatDateTime(endDateTo, true),
      requestedDateFrom: formatDateTime(requestedDateFrom, true),
      requestedDateTo: formatDateTime(requestedDateTo, true),
      amountFrom: getString('amountFrom'),
      amountTo: getString('amountTo'),
      requester: getString('requester'),
      completedDateFrom: formatDateTime(completedDateFrom, true),
      completedDateTo: formatDateTime(completedDateTo, true),
      seenStatus: getString('seenStatus'),
    };
  }, [searchParams]);

  const setFinanceRequestSearchData = (updated) => {
    const nextParams = new URLSearchParams();

    // Get current URL param values (not formatted for backend)
    const currentUrlParams = {
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'),
      search: searchParams.get('search'),
      searchId: searchParams.get('searchId'),
      flowType: searchParams.get('flowType'),
      expenseType: searchParams.get('expenseType'),
      accountingType: searchParams.get('accountingType'),
      paymentMethod: searchParams.get('paymentMethod'),
      currency: searchParams.get('currency'),
      status: searchParams.get('status'),
      startDateFrom: searchParams.get('startDateFrom'),
      endDateTo: searchParams.get('endDateTo'),
      requestedDateFrom: searchParams.get('requestedDateFrom'),
      requestedDateTo: searchParams.get('requestedDateTo'),
      amountFrom: searchParams.get('amountFrom'),
      amountTo: searchParams.get('amountTo'),
      requester: searchParams.get('requester'),
      completedDateFrom: searchParams.get('completedDateFrom'),
      completedDateTo: searchParams.get('completedDateTo'),
      seenStatus: searchParams.get('seenStatus'),
    };

    const fullSearchData = { ...currentUrlParams, ...updated };

    if (!(Object.keys(updated).length === 1 && 'offset' in updated)) {
      fullSearchData.offset = 0;
    }

    // Date fields that need to be stored as YYYY-MM-DD format
    const dateFields = [
      'startDateFrom',
      'endDateTo',
      'requestedDateFrom',
      'requestedDateTo',
      'completedDateFrom',
      'completedDateTo',
    ];

    // Convert ISO strings to YYYY-MM-DD format for URL params
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
    setFinanceRequestSearchData,
    resetSearchData,
    defaultSearchData,
  };
};
