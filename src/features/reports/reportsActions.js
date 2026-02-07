import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getReport = createAsyncThunk(
  'payroll/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/intercom/users?${query}`);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getEmployeePayrollData = createAsyncThunk(
  'payroll/getEmployee',
  async ({ employeeId, params }, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/reports/payroll/employee/${employeeId}/checkins?${query}`);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
