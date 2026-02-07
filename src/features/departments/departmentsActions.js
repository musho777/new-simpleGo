import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getDepartments = createAsyncThunk(
  'departments/get',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const data = await ApiClient.get(`departments?${query}`);
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

export const getSingleDepartment = createAsyncThunk(
  'departments/get/single',
  async (uuid, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(`departments/${uuid}`);
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

export const getHeads = createAsyncThunk(
  'departments/get/heads',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('/users/heads?headType=Department');
      return data.heads;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createDepartment = createAsyncThunk(
  'departments/create',
  async ({ name, description, departmentHeadId }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/departments/create', {
        name,
        description,
        departmentHeadId: departmentHeadId?.value,
      });
      return data;
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

export const deleteDepartment = createAsyncThunk(
  'departments/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      await ApiClient.del(`/departments/${uuid}`);
      return { success: 'ok' };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const enableDepartment = createAsyncThunk(
  'departments/enable',
  async (uuid, { rejectWithValue }) => {
    try {
      await ApiClient.post(`/departments/enable/${uuid}`);
      return { success: 'ok' };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateDepartments = createAsyncThunk(
  'departments/update',
  async ({ uuid, name, description, departmentHeadId, disabled }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(`departments/update/${uuid}`, {
        name,
        description,
        departmentHeadId,
        disabled,
      });
      return response;
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
