import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { notifyError } from 'utils/notifyConfig';

export const getRegions = createAsyncThunk('regions/get', async (_, { rejectWithValue }) => {
  try {
    const data = await ApiClient.get('/regions');
    return data?.regions;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      notifyError(error.message);
      return rejectWithValue(error.message);
    }
  }
});

export const getSubRegions = createAsyncThunk(
  'subRegions/get',
  async (uuid, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(`/regions/branch-subregions/${uuid}`);
      return data?.branchSubregions;
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

export const getDistricts = createAsyncThunk(
  'regions/districts/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('/regions/districts');
      return data?.districts;
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
