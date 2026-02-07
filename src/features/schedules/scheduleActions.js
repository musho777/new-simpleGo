import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const createAttendance = createAsyncThunk(
  'attendance/create',
  async (params, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/attendance`, params);
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

export const editAttendance = createAsyncThunk(
  'attendance/edit',
  async ({ uuid, data }, { rejectWithValue }) => {
    try {
      return await ApiClient.patch(`/attendance/${uuid}`, data);
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

export const createSchedule = createAsyncThunk(
  'schedules/create',
  async (params, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/schedules`, params);
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

export const editSchedule = createAsyncThunk(
  'schedules/edit',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      return await ApiClient.patch(`/schedules/${uuid}`, params);
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

export const deleteSchedule = createAsyncThunk(
  'schedules/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      return await ApiClient.del(`/schedules/${uuid}`);
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

export const getAttendance = createAsyncThunk(
  'attendance/get',
  async (_, { rejectWithValue }) => {
    try {
      return await ApiClient.get(`attendance`);
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

export const getSchedules = createAsyncThunk(
  'schedules/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`schedules?${query}`);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        // notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSchedule = createAsyncThunk(
  'schedules/get/single',
  async (uuid, { rejectWithValue }) => {
    try {
      return await ApiClient.get(`schedules/${uuid}`);
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
