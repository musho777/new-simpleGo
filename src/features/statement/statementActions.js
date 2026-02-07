import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleApiError } from 'api/apiUtils';
import billingApiClient from 'api/billingApiClient';
import { buildQueryString } from 'utils';

export const getMonthlyPayments = createAsyncThunk(
  'statement/getMonthlyPayments',
  async (params, thunkAPI) => {
    const query = buildQueryString(params);
    try {
      const data = await billingApiClient.get(`/report/monthly-payments?${query}`);
      return data.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);

export const getHalfYearlySubscribers = createAsyncThunk(
  'statement/getHalfYearlySubscribers',
  async (params, thunkAPI) => {
    const query = buildQueryString(params);
    try {
      const data = await billingApiClient.get(`/report/half-yearly-subscribers?${query}`);
      return data.data;
    } catch (error) {
      return handleApiError(error, thunkAPI);
    }
  }
);
