import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getTimezone = createAsyncThunk(
  'projects/timezone',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get('/timezones/all');
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProjectTypes = createAsyncThunk(
  'projects/type',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);

      const response = await ApiClient.get(`/projects/types?${query}`);
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

export const getProjects = createAsyncThunk(
  'projects/get',
  async (params, { rejectWithValue }) => {
    try {
      const query = Object.entries(params)
        .flatMap(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((item) => `${key}=${encodeURIComponent(item)}`);
          }
          return value !== undefined && value !== ''
            ? `${key}=${encodeURIComponent(value)}`
            : [];
        })
        .join('&');

      const response = await ApiClient.get(`/projects?${query}`);
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

export const getTeamsToAssign = createAsyncThunk(
  'subprojects/get/unassigned/teams',
  async ({ uuid, query }, { rejectWithValue }) => {
    const queries = Object.entries(query)
      .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((item) => `${key}=${encodeURIComponent(item)}`);
        }
        return value !== undefined && value !== ''
          ? `${key}=${encodeURIComponent(value)}`
          : [];
      })
      .join('&');

    try {
      const response = await ApiClient.get(`/subprojects/team/unassigned/${uuid}?${queries}`);
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

export const getAttachedTeams = createAsyncThunk(
  'subprojects/get/attached/teams',
  async ({ uuid, query }, { rejectWithValue }) => {
    const queries = buildQueryString(query);

    try {
      const response = await ApiClient.get(`/subprojects/team/assigned/${uuid}?${queries}`);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      notifyError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getProjectSubprojects = createAsyncThunk(
  'projects/get/subproject',
  async ({ uuid, query }, { rejectWithValue }) => {
    const queries = buildQueryString(query);

    try {
      const response = await ApiClient.get(`/projects/subprojects/${uuid}?${queries}`);
      return response.subprojects;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      notifyError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getSubprojectTypes = createAsyncThunk(
  'projects/type/sub',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const response = await ApiClient.get(`/subprojects/types?${query}`);
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

export const getSubprojects = createAsyncThunk(
  'projects/sub',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const response = await ApiClient.get(`/subprojects?${query}`);
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

export const createProjectType = createAsyncThunk(
  'projects/type/create',
  async ({ name, description, disabled }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/projects/types', {
        name,
        description,
        disabled,
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

export const createProject = createAsyncThunk(
  'projects/create',
  async (params, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/projects', params);
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

export const editProject = createAsyncThunk(
  'projects/edit',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.patch(`/projects/${uuid}`, params);
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

export const createSubprojectType = createAsyncThunk(
  'subprojects/type/create',
  async ({ name, description, disabled }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/subprojects/types', {
        name,
        description,
        disabled,
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

export const createSubproject = createAsyncThunk(
  'subprojects/create',
  async (params, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/subprojects', params);
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
export const editSubproject = createAsyncThunk(
  'subprojects/edit',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.patch(`/subprojects/${uuid}`, params);
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

export const editProjectType = createAsyncThunk(
  'projects/type/edit',
  async ({ name, description, disabled, uuid }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.patch(`/projects/types/${uuid}`, {
        name,
        description,
        disabled,
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

export const editSubprojectType = createAsyncThunk(
  'subprojects/type/edit',
  async ({ name, description, disabled, uuid }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.patch(`/subprojects/types/${uuid}`, {
        name,
        description,
        disabled,
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

export const getSubprojectsToAssign = createAsyncThunk(
  'projects/subprojects/to/attach',
  async ({ uuid, query }, { rejectWithValue }) => {
    const queries = Object.entries(query)
      .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((item) => `${key}=${encodeURIComponent(item)}`);
        }
        return value !== undefined && value !== ''
          ? `${key}=${encodeURIComponent(value)}`
          : [];
      })
      .join('&');

    try {
      const response = await ApiClient.get(
        `/projects/subprojects/unassigned/${uuid}?${queries}`
      );
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

export const projectsAssignSubproject = createAsyncThunk(
  'projects/subprojects/assign',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.post(`/projects/assign/${uuid}`, params);
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

export const assignTeamToSubproject = createAsyncThunk(
  'subprojects/assign/team',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.post(`/subprojects/assign/${uuid}`, params);
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

export const projectsUnAssignSubproject = createAsyncThunk(
  'projects/subprojects/unassign',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.post(`/projects/unassign/${uuid}`, params);
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

export const unassignTeamFromSubproject = createAsyncThunk(
  'subprojects/unassign/team',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;

    try {
      const data = await ApiClient.post(`/subprojects/unassign/${uuid}`, params);
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
