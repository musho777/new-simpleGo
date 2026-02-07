import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getLeads = createAsyncThunk(
  'teamManagement/leads',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const response = await ApiClient.get(`/users/subproject-team-lead?${query}`);
      return response.users;
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

export const getTeams = createAsyncThunk(
  'teamManagement/teams/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const response = await ApiClient.get(`/subproject-teams?${query}`);
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

export const getTeamMembers = createAsyncThunk(
  'teamManagement/teams/members/get',
  async ({ uuid, params }, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const response = await ApiClient.get(
        `/subproject-teams/members/unassigned/${uuid}?${query}`
      );
      return response.users;
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

export const getAttachedMembers = createAsyncThunk(
  'teamManagement/teams/members/attached/get',
  async ({ uuid, params }, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const response = await ApiClient.get(
        `/subproject-teams/members/assigned/${uuid}?${query}`
      );
      return response.users;
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

export const createTeam = createAsyncThunk(
  'teamManagement/create',
  async (params, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post(`/subproject-teams`, params);
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

export const editTeam = createAsyncThunk(
  'teamManagement/edit',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.patch(`/subproject-teams/${uuid}`, params);
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

export const memberAssignToTeam = createAsyncThunk(
  'teamManagement/member/assign',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.post(`/subproject-teams/assign-members/${uuid}`, params);
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

export const memberDeleteFromTeam = createAsyncThunk(
  'teamManagement/member/delete',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.post(`/subproject-teams/unassign-members/${uuid}`, params);
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
