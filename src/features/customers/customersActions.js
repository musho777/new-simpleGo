import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import billingClient from 'api/billingApiClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getCustomers = createAsyncThunk(
  'customers/get',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const response = await billingClient.get(`/sales/contracts?${query}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        notifyError(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSingleCustomer = createAsyncThunk(
  'getSingleCustomer/get',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const response = await billingClient.get(`/sales/customer-detail?${query}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        notifyError(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getContractBalance = createAsyncThunk(
  'getContractBalance/get',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const response = await billingClient.get(`/sales/contract-balance?${query}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        notifyError(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCustomersLeadData = createAsyncThunk(
  'getCustomersLeadData/get',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/sales/customers/${customerId}/lead-data`);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        notifyError(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
