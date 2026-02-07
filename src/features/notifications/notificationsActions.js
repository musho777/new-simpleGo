import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';

export const getNotifications = createAsyncThunk(
  'notifications/get',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      return await ApiClient.get(`/notifications?${query}`);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const readNotification = createAsyncThunk(
  'notifications/read',
  async (params, { rejectWithValue }) => {
    try {
      await ApiClient.patch('/notifications', params);
      return params;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const dismissNotification = createAsyncThunk(
  'notifications/dismiss',
  async (uuid, { rejectWithValue }) => {
    try {
      await ApiClient.del(`/notifications/${uuid}`);
      return uuid;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
