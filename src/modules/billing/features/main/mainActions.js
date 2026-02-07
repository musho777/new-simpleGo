import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';

export const getInvoices = createAsyncThunk(
  'main/invoices/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/all-subscribers?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCount = createAsyncThunk('main/count/', async (_, { rejectWithValue }) => {
  try {
    const data = await ApiClient.get(
      'https://billing-reports-api.dev.fnet.am/contract/all-subscribers-count'
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getRegion = createAsyncThunk('main/region/', async (_, { rejectWithValue }) => {
  try {
    const data = await ApiClient.get('https://billing-reports-api.dev.fnet.am/address/region');
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getCity = createAsyncThunk('main/city/', async (_, { rejectWithValue }) => {
  try {
    const data = await ApiClient.get('https://billing-reports-api.dev.fnet.am/address/city');
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getAllTariff = createAsyncThunk(
  'main/allTariff/',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('https://billing-reports-api.dev.fnet.am/tariff/all');
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getActiveTariff = createAsyncThunk(
  'main/activeTariff/',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(
        'https://billing-reports-api.dev.fnet.am/tariff/active'
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const initiatePayment = createAsyncThunk(
  'billing/initiate/payment',
  async (paymentData, { rejectWithValue }) => {
    try {
      await ApiClient.post('/auth/log-out', paymentData);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPayments = createAsyncThunk(
  'main/payments/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/subscribers-payments?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPaymentMethod = createAsyncThunk(
  'main/paymentMethod/',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/payment/method`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProcess = createAsyncThunk(
  'main/process/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/process/all?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProcessType = createAsyncThunk(
  'main/process/type',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/process/type?`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProcessStatus = createAsyncThunk(
  'main/process/status',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/process/status`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const checkSecret = createAsyncThunk(
  'main/secret',
  async (secret, { rejectWithValue }) => {
    try {
      await ApiClient.post(
        `https://billing-reports-api.dev.fnet.am/helper/check-secret?secret=${secret}`
      );
      return { success: 'ok', secret };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContract = createAsyncThunk(
  'main/contract/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/comparison?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContractOneDay = createAsyncThunk(
  'main/contractOneDay/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/one-day-main-info?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContractOneDayGroupInfo = createAsyncThunk(
  'main/contractOneDayGroupInfo/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/one-day-grouped-info?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContractOneDayAllItemsInfo = createAsyncThunk(
  'main/contractOneDayAllItemsInfo/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/one-day-all-items-info?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getExportReport = createAsyncThunk(
  'main/exportReport/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/export-super-info-by-date-and-sub-status?${query}`,
        {
          responseType: 'blob', // <- important
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2CReport = createAsyncThunk(
  'main/b2cReport/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/export-b2c-report?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPaidPreviousMonthReport = createAsyncThunk(
  'main/paidPreviousMonth/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/paid-previous-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPaidBothMonthsReport = createAsyncThunk(
  'main/paidBothMonths/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/paid-previous-month-and-selected-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2BPaidBothMonthsReport = createAsyncThunk(
  'main/b2bPaidBothMonths/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-paid-selected-and-previous-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPaidPreviousInactiveReport = createAsyncThunk(
  'main/paidPreviousInactive/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/paid-previous-month-and-inactive-selected-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2BPaidPreviousInactiveReport = createAsyncThunk(
  'main/b2bPaidPreviousInactive/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-paid-previous-month-and-inactive-selected-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2BPaidPreviousNotPaidCurrentReport = createAsyncThunk(
  'main/b2bPaidPreviousNotPaidCurrent/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-paid-previous-month-and-not-paid-selected-month-and-remained-active?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPaidPreviousRefusedReport = createAsyncThunk(
  'main/paidPreviousRefused/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/paid-previous-month-and-refused-selected-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPaidPreviousNotPaidCurrentReport = createAsyncThunk(
  'main/paidPreviousNotPaidCurrent/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/paid-previous-month-and-not-paid-selected-month-and-remained-active?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPaidSelectedMonthReport = createAsyncThunk(
  'main/paidSelectedMonth/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/paid-selected-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getRefusedSelectedMonthReport = createAsyncThunk(
  'main/refusedSelectedMonth/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/refused-selected-month?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getJoinedServiceReport = createAsyncThunk(
  'main/joinedService/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/joined-service-from-to?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getComparativePeriodsReport = createAsyncThunk(
  'main/comparativePeriods/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/pays-sum-for-two-periods?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2BComparativePeriodsReport = createAsyncThunk(
  'main/b2bComparativePeriods/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-pays-sum-for-two-periods?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getVivaSubscribersReport = createAsyncThunk(
  'main/vivaSubscribers/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/red-tariff?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllCustomersReport = createAsyncThunk(
  'main/allCustomers/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/all-customers?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getExportPaymentReport = createAsyncThunk(
  'main/exportPaymentReport/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/export-super-payments?${query}`,
        {
          responseType: 'blob', // <- important
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContractDiagrams = createAsyncThunk(
  'main/contractDiagrams/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/active-subscribers-diagrams?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getTariffsOneDay = createAsyncThunk(
  'main/tariffsOneDay/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/one-day-tariffs?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getStatusesOneDay = createAsyncThunk(
  'main/statusesOneDay/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/one-day-statuses?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getRegionsOneDay = createAsyncThunk(
  'main/regionsOneDay/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/one-day-regions?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCitiesOneDay = createAsyncThunk(
  'main/citiesOneDay/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/one-day-cities?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContractPaymentDiagrams = createAsyncThunk(
  'main/contractPaymentDiagrams/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/payment-diagrams?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getComprehensiveDb = createAsyncThunk(
  'main/paidPreviousMonth/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-all-customers?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2bAllCustomersWeeklyInfo = createAsyncThunk(
  'main/paidBothMonths/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-all-customers-weekly-info?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2bFromActiveToOther = createAsyncThunk(
  'main/paidBothMonths/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-from-active-to-another?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2bFromPassiveToActive = createAsyncThunk(
  'main/paidBothMonths/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-from-passive-to-active?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2bNewSubscribers = createAsyncThunk(
  'main/paidBothMonths/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-new-customers?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getB2bCanceledSubscribers = createAsyncThunk(
  'main/paidBothMonths/',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/excel/b2b-refused-customers?${query}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getActivesCountByDate = createAsyncThunk(
  'main/activesCountByDate/',
  async (params, { rejectWithValue }) => {
    const secret = localStorage.getItem('securityCode');
    const queryParams = { ...params, secret };
    const query = buildQueryString(queryParams);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/actives-count-by-date?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getActiveToInactiveSubscribers = createAsyncThunk(
  'main/activeToInactiveSubscribers/',
  async (params, { rejectWithValue }) => {
    const secret = localStorage.getItem('securityCode');
    const queryParams = { ...params, secret };
    const query = buildQueryString(queryParams);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/from-active-to-passive-by-date?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getPassiveToActiveSubscribers = createAsyncThunk(
  'main/passiveToActiveSubscribers/',
  async (params, { rejectWithValue }) => {
    const secret = localStorage.getItem('securityCode');
    const queryParams = { ...params, secret };
    const query = buildQueryString(queryParams);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/from-passive-to-active-by-date?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getDailyPayments = createAsyncThunk(
  'main/dailyPayments/',
  async (params, { rejectWithValue }) => {
    const secret = localStorage.getItem('securityCode');
    const queryParams = { ...params, secret };
    const query = buildQueryString(queryParams);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/all-have-paid-by-date?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getInactiveSubscribers = createAsyncThunk(
  'main/inactiveSubscribers/',
  async (params, { rejectWithValue }) => {
    const secret = localStorage.getItem('securityCode');
    const queryParams = { ...params, secret };
    const query = buildQueryString(queryParams);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/all-passives-by-date?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUnsubscribedSubscribers = createAsyncThunk(
  'main/unsubscribedSubscribers/',
  async (params, { rejectWithValue }) => {
    const secret = localStorage.getItem('securityCode');
    const queryParams = { ...params, secret };
    const query = buildQueryString(queryParams);
    try {
      const data = await ApiClient.get(
        `https://billing-reports-api.dev.fnet.am/contract/all-refused-by-date?${query}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
