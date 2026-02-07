import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import billingClient from 'api/billingApiClient';
import { buildQueryString } from 'utils';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

export const getTickets = createAsyncThunk(
  'projectManagement/tickets/get',
  async (params, { rejectWithValue }) => {
    const { uuid, ...restParams } = params;

    const query = buildQueryString(restParams);
    const url = uuid ? `/tickets/project-tickets/${uuid}?${query}` : `/tickets?${query}`;

    try {
      const response = await ApiClient.get(url);
      return response;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        // if (error.message !== 'Project id must be uuid') notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getTicketLinkOptions = createAsyncThunk(
  'projectManagement/tickets/linkOptions',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const response = await ApiClient.get(`/tickets/link-options?${query}`);
      return response;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getTicketsGrid = createAsyncThunk(
  'projectManagement/ticketType/get',
  async (params, { rejectWithValue }) => {
    const { uuid, ...restParams } = params;
    const query = buildQueryString(restParams);
    const url = uuid ? `/tickets/project-tickets/${uuid}?${query}` : `/tickets?${query}`;
    try {
      const response = await ApiClient.get(url);
      return { ...response, status: restParams.status[0], restart: restParams.restart };
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProjects = createAsyncThunk(
  'projectManagement/projects/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const response = await ApiClient.get(`tickets/user/projects?${query}`);
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

export const getSingleTicket = createAsyncThunk(
  'projectManagement/single/ticket/get',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/tickets/${uuid}`);
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

export const createTicket = createAsyncThunk(
  'projectManagement/tickets/create',
  async (params, { rejectWithValue }) => {
    const name = params.get('title');

    try {
      const data = await ApiClient.post('/tickets', params, {
        'Content-Type': 'multipart/form-data',
      });
      notifySuccess(`Ticket ${name} successfully created`);
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

export const editTicket = createAsyncThunk(
  'projectManagement/tickets/edit',
  async (formData, { rejectWithValue }) => {
    const uuid = formData.get('uuid');
    const name = formData.get('title');

    try {
      const data = await ApiClient.patch(`/tickets/${uuid}`, formData, {
        'Content-Type': 'multipart/form-data',
      });
      return { ...data, name };
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

export const updateTicketStatusApi = createAsyncThunk(
  'projectManagement/ticket/status/update',
  async (params, { rejectWithValue }) => {
    const { uuid, status } = params;
    try {
      return await ApiClient.patch(`/tickets/status/${uuid}`, { status });
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

export const getProjectsForFilter = createAsyncThunk(
  'projectManagement/projects/filter/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/projects/user/all`);
      return response.projects;
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

export const getSubprojectsForFilter = createAsyncThunk(
  'projectManagement/subprojects/filter/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/subprojects/user`);
      return response.subprojects;
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

export const getAssigneesForFilter = createAsyncThunk(
  'projectManagement/assignees/filter/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/tickets/all-project-members-teams`);
      return response.members;
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

export const getCreatedByForFilter = createAsyncThunk(
  'projectManagement/createdBy/filter/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/projects/user/project-members`);
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

export const sendComment = createAsyncThunk(
  'projectManagement/tickets/comment',
  async ({ text, uuid }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post(`/tickets/comment/${uuid}`, { text });
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

export const removeIsNewFromTicket = createAsyncThunk(
  'projectManagement/tickets/is-new/remove',
  async (uuid, { rejectWithValue }) => {
    try {
      const data = await ApiClient.patch(`/tickets/new/${uuid}`);
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

export const getSubtasks = createAsyncThunk(
  'projectManagement/ticket/subtask/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params.params);
    try {
      return await ApiClient.get(`/tickets/subtasks/${params.uuid}?${query}`);
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

export const changePrivateTickets = createAsyncThunk(
  'projectManagement/ticket/privateTickets/patch',
  async ({ uuid, isPrivate }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.patch(`/tickets/private/${uuid}`, { isPrivate });
      notifySuccess('Private changed Successfull');
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

// Appointment

export const createAppointment = createAsyncThunk(
  'sales/customers/appointments',
  async (params, { rejectWithValue }) => {
    const name = params.get('title');
    const customerId = params.get('customerId');
    console.log(customerId, 'kfgjgldh');
    try {
      const data = await ApiClient.post(
        `/sales/customers/${customerId}/appointments`,
        params,
        {
          'Content-Type': 'multipart/form-data',
        }
      );
      console.log(data);
      notifySuccess(`Ticket ${name} successfully created`);
      // return data;
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

export const getAppointmentContext = createAsyncThunk(
  'sales/customers/appointment-context',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(
        `/sales/customers/${customerId}/appointment-context`
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

export const getAppointments = createAsyncThunk(
  'projectManagement/Appointments/get',
  async (params, { rejectWithValue }) => {
    const { uuid, ...restParams } = params;

    const query = buildQueryString(restParams);
    const url = uuid
      ? `/tickets/project-tickets/${uuid}?${query}`
      : `/sales/customer-appointments?${query}`;

    try {
      const response = await ApiClient.get(url);
      return response;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCustomerData = createAsyncThunk(
  'projectManagement/getCustomerData/get',
  async (id, { rejectWithValue }) => {
    const url = `/sales/customer-exists?id=${id}`;
    try {
      const response = await billingClient.get(url);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSingleAppointment = createAsyncThunk(
  'projectManagement/getSingleAppointment/get',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/sales/customer-appointments/${uuid}`);
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
