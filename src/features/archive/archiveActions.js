import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';

export const getArchive = createAsyncThunk(
  'archive/get',
  async ({ path, params }, { rejectWithValue }) => {
    try {
      const query = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== '' && value !== '-- --')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      const response = await ApiClient.get(`${path}/archived?${query}`);
      return {
        data: response?.archived ?? response?.users,
        count: response?.count || 0,
      };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
