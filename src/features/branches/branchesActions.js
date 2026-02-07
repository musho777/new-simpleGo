import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getBranches = createAsyncThunk(
  'branches/get',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);

      const data = await ApiClient.get(`branches?${query}`);
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

export const getSingleBranch = createAsyncThunk(
  'branches/get/single',
  async (uuid, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(`branches/${uuid}`);
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
  'branches/get/heads',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('/users/heads?headType=Branch');
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

export const createBranch = createAsyncThunk(
  'branches/create',
  async (
    { name, description, departmentId, branchHeadId, regionIds },
    { rejectWithValue }
  ) => {
    try {
      const data = await ApiClient.post('/branches/create', {
        name,
        description,
        departmentId,
        regionIds,
        branchHeadId: branchHeadId?.value,
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

export const deleteBranch = createAsyncThunk(
  'branches/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/branches/${uuid}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const enableBranch = createAsyncThunk(
  'branches/enable',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/branches/enable/${uuid}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateBranches = createAsyncThunk(
  'branches/update',
  async (
    { uuid, name, description, branchHeadId, newRegionIds, deletedRegionIds },
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiClient.patch(`branches/${uuid}`, {
        name,
        description,
        branchHeadId,
        newRegionIds,
        deletedRegionIds,
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
