import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getUsers = createAsyncThunk('users/get', async (params, { rejectWithValue }) => {
  try {
    const query = buildQueryString(params);

    const data = await ApiClient.get(`/users/all?${query}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const createUser = createAsyncThunk(
  'users/create',
  async (
    {
      name,
      surname,
      role,
      phoneNumber,
      email,
      occupation,
      commission,
      holidays,
      officeLocation,
      timezoneId,
    },
    { rejectWithValue }
  ) => {
    try {
      await ApiClient.post('/auth/invite', {
        name,
        surname,
        phoneNumber,
        email,
        defaultRoleId: role?.value,
        occupation: occupation?.value,
        commission: commission?.value,
        holidays: holidays?.value,
        officeLocation: officeLocation?.value,
        timezoneId: timezoneId?.value,
      });
      return { email };
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

export const createSuperUser = createAsyncThunk(
  'superUsers/create',
  async (
    {
      name,
      surname,
      role,
      phoneNumber,
      email,
      commission,
      holidays,
      officeLocation,
      timezoneId,
    },
    { rejectWithValue }
  ) => {
    try {
      await ApiClient.post('/auth/invite-super', {
        name,
        surname,
        phoneNumber,
        email,
        defaultRoleId: role?.value,
        commission: commission?.value,
        holidays: holidays?.value,
        officeLocation: officeLocation?.value,
        timezoneId: timezoneId?.value,
      });
      return { email };
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

export const getRoles = createAsyncThunk(
  'users/roles',
  async (params, { rejectWithValue }) => {
    try {
      const query = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      const data = await ApiClient.get(`/roles?${query}`);
      return data.roles;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getFilterRoles = createAsyncThunk(
  'users/roles/filter',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get('/roles');
      return data.roles;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteUsers = createAsyncThunk(
  'users/delete',
  async ({ uuid, userType }, { rejectWithValue }) => {
    try {
      const disableResponse =
        userType === 'Super Admin' ? `/users/disable-super/${uuid}` : `/users/disable/${uuid}`;
      const response = await ApiClient.del(disableResponse);
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

export const enableUsers = createAsyncThunk(
  'users/enable',
  async ({ uuid, userType }, { rejectWithValue }) => {
    try {
      const enableResponse =
        userType === 'Super Admin' ? `/users/enable-super/${uuid}` : `/users/enable/${uuid}`;
      const response = await ApiClient.patch(enableResponse);
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

export const promoteUser = createAsyncThunk(
  'users/promote',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(`/users/promote/${uuid}`);
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

// User Privilege Management
export const getUserPrivileges = createAsyncThunk(
  'users/privileges/get',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/users/${uuid}/privileges`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      // notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getAvailablePrivileges = createAsyncThunk(
  'users/privileges/available',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get('/users/privileges/available');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const assignUserPrivilege = createAsyncThunk(
  'users/privileges/assign',
  async ({ uuid, privilegeId }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/users/${uuid}/privileges`, { privilegeId });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const updateUserPrivilege = createAsyncThunk(
  'users/privileges/update',
  async ({ uuid, currentPrivilegeId, newPrivilegeId }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(
        `/users/${uuid}/privileges/${currentPrivilegeId}`,
        {
          privilegeId: newPrivilegeId,
        }
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getUsersDropdown = createAsyncThunk(
  'users/dropdown',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const data = await ApiClient.get(`/users/dropdown?${query}`);
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
