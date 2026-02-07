import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getTeams = createAsyncThunk('teams/get', async (params, { rejectWithValue }) => {
  try {
    const processedParams = {
      ...params,
      teamsHeadId: params.headId?.value ?? params.headId,
    };
    delete processedParams.headId;

    const query = buildQueryString(params);
    const data = await ApiClient.get(`teams?${query}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getHeads = createAsyncThunk('teams/get/heads', async (_, { rejectWithValue }) => {
  try {
    const data = await ApiClient.get('/users/heads?headType=Team');
    return data.heads;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const createTeam = createAsyncThunk(
  'teams/create',
  async (params, { rejectWithValue }) => {
    try {
      await ApiClient.post('/teams', params);
      return { success: true };
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

export const deleteTeam = createAsyncThunk(
  'teams/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/teams/${uuid}`);
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

export const enableTeam = createAsyncThunk(
  'teams/enable',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/teams/enable/${uuid}`);
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

export const updateTeams = createAsyncThunk(
  'teams/update',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const response = await ApiClient.patch(`teams/update/${uuid}`, params);
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
