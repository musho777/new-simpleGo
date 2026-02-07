import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import billingApiClient from 'api/billingApiClient';
import { buildQueryString } from 'utils';
import { notifyError, notifySuccess } from 'utils/notifyConfig';
import sessionManager from 'utils/sessionManager';

// Lead Sources
export const getLeadSources = createAsyncThunk(
  'sales/lead-sources/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(`/sales/lead-sources?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createLeadSource = createAsyncThunk(
  'sales/lead-sources/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/lead-sources', data);
      notifySuccess('Lead source created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteLeadSource = createAsyncThunk(
  'sales/lead-sources/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/sales/lead-sources/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const editLeadSource = createAsyncThunk(
  'sales/lead-sources/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/lead-sources/${uuid}`, body);
      notifySuccess('Lead source updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Sales Scripts
export const getSalesScripts = createAsyncThunk(
  'sales/scripts/get',
  async (params, { rejectWithValue }) => {
    const sessionParams = sessionManager.getQueryParams();
    const combinedParams = { ...params, ...sessionParams };
    const query = buildQueryString(combinedParams);
    try {
      const response = await ApiClient.get(`/sales/sales-scripts?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createSalesScript = createAsyncThunk(
  'sales/scripts/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/sales-scripts-enhanced', data);
      notifySuccess('Sales script created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteSalesScript = createAsyncThunk(
  'sales/scripts/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/sales/sales-scripts/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const editSalesScript = createAsyncThunk(
  'sales/scripts/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/sales-scripts-enhanced/${uuid}`, body);
      notifySuccess('Sales script updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

// Product
export const getProducts = createAsyncThunk(
  'sales/products/get',
  async (params, { rejectWithValue }) => {
    const sessionParams = sessionManager.getQueryParams();
    const combinedParams = { ...params, ...sessionParams };
    const query = buildQueryString(combinedParams);
    try {
      const response = await ApiClient.get(`/sales/products?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'sales/products/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/products', data);
      notifySuccess('Product created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'sales/products/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/sales/products/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'sales/products/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/products/${uuid}`, body);
      notifySuccess('Product updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Offer
export const getOffers = createAsyncThunk(
  'sales/offers/get',
  async (params, { rejectWithValue }) => {
    const sessionParams = sessionManager.getQueryParams();
    const combinedParams = { ...params, ...sessionParams };
    const query = buildQueryString(combinedParams);
    try {
      const response = await ApiClient.get(`/sales/offers?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createOffer = createAsyncThunk(
  'sales/offers/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/offers', data);
      notifySuccess('Offer created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteOffer = createAsyncThunk(
  'sales/offers/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/sales/offers/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const editOffer = createAsyncThunk(
  'sales/offers/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/offers/${uuid}`, body);
      notifySuccess('Offer updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Workflow Status
export const getWorkflowStatuses = createAsyncThunk(
  'sales/workflow-statuses/get',
  async (params, { rejectWithValue }) => {
    const sessionParams = sessionManager.getQueryParams();
    const combinedParams = { ...params, ...sessionParams };
    const query = buildQueryString(combinedParams);
    try {
      const response = await ApiClient.get(`/sales/workflow-statuses?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getWorkflowStatusesByPrivilege = createAsyncThunk(
  'sales/workflow-statuses/by-privilege/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `/sales/leads/workflow-statuses/by-privilege?${query}`
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createWorkflowStatus = createAsyncThunk(
  'sales/workflow-statuses/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/workflow-statuses', data);
      notifySuccess('Workflow status created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteWorkflowStatus = createAsyncThunk(
  'sales/workflow-statuses/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/sales/workflow-statuses/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const editWorkflowStatus = createAsyncThunk(
  'sales/workflow-statuses/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/workflow-statuses/${uuid}`, body);
      notifySuccess('Workflow status updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// User Privilege
export const getUserPrivileges = createAsyncThunk(
  'sales/user-privileges/get',
  async (params, { rejectWithValue }) => {
    const sessionParams = sessionManager.getQueryParams();
    const combinedParams = { ...params, ...sessionParams };
    const query = buildQueryString(combinedParams);
    try {
      const response = await ApiClient.get(`/sales/user-privileges?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createUserPrivilege = createAsyncThunk(
  'sales/user-privileges/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/user-privileges', data);
      notifySuccess('User privilege created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteUserPrivilege = createAsyncThunk(
  'sales/user-privileges/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/sales/user-privileges/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const editUserPrivilege = createAsyncThunk(
  'sales/user-privileges/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/user-privileges/${uuid}`, body);
      notifySuccess('User privilege updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Import Lead

export const createImportLead = createAsyncThunk(
  'sales/import-leads',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/import-leads', data, {
        'Content-Type': 'multipart/form-data',
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

// Subproject and Sources

export const getSubprojectSources = createAsyncThunk(
  '/subprojects/sources/get',
  async ({ uuid, query }, { rejectWithValue }) => {
    const q = buildQueryString(query);
    try {
      const response = await ApiClient.get(`/subprojects/${uuid}/sources?${q}`);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const assignSubprojectSources = createAsyncThunk(
  '/subprojects/sources/assign',
  async ({ uuid, sourceIds }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/subprojects/${uuid}/sources/assign`, {
        sourceIds,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeSubprojectSources = createAsyncThunk(
  '/subprojects/sources/remove',
  async ({ uuid, sourceIds }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/subprojects/${uuid}/sources/remove`, {
        sourceIds,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Project and Offers

export const getProjectOffers = createAsyncThunk(
  '/projects/offers/get/asd',
  async ({ uuid, query }, { rejectWithValue }) => {
    const q = buildQueryString(query);
    try {
      const response = await ApiClient.get(`/projects/offers/${uuid}?${q}`);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const assignProjectOffers = createAsyncThunk(
  '/projects/offers/assign',
  async ({ uuid, offerIds }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/projects/offers/assign/${uuid}`, {
        offerIds,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeProjectOffers = createAsyncThunk(
  '/projects/offers/remove',
  async ({ uuid, offerIds }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/projects/offers/remove/${uuid}`, {
        offerIds,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Sales Dashboard

export const getSalesProjects = createAsyncThunk(
  '/sales/dashboard/projects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get('/sales/dashboard/projects');
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createLeadB2B = createAsyncThunk(
  'sales/leads-b2b/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/leads/b2b', data);
      notifySuccess('B2B added successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getSalesSubproject = createAsyncThunk(
  '/sales/dashboard/projects/projectId',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/sales/dashboard/projects/${projectId}`);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createLeadB2C = createAsyncThunk(
  'sales/leads-b2c/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/leads/b2c', data);
      notifySuccess('B2C added successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getSalesLeads = createAsyncThunk(
  '/sales/leads/subproject/subprojectId',
  async (params, { rejectWithValue }) => {
    const { subprojectId } = params;
    const sessionParams = sessionManager.getQueryParams();
    const combinedParams = { ...params, ...sessionParams };
    const query = buildQueryString(combinedParams);

    try {
      const response = await ApiClient.get(`/sales/leads/subproject/${subprojectId}?${query}`);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getLeadById = createAsyncThunk(
  'sales/leads/getById',
  async (leadId, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.get(`/sales/leads/${leadId}?${queryString}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      // Don't show notification for 409 conflicts - let the lock system handle it
      if (error.status !== 409) {
        notifyError(message);
      }
      return rejectWithValue(message);
    }
  }
);

export const addLeadNote = createAsyncThunk(
  'sales/leads/addNote',
  async ({ leadId, data }, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.post(
        `/sales/leads/${leadId}/notes?${queryString}`,
        data
      );
      notifySuccess('Note added successfully');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createLeadOrder = createAsyncThunk(
  'sales/leadOrder/create',
  async ({ leadId, data }, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.post(
        `/sales/leads/${leadId}/orders?${queryString}`,
        data
      );
      notifySuccess('Order added successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'sales/order/update',
  async ({ orderId, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/orders/${orderId}`, data);
      notifySuccess('Order updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getOrderHistory = createAsyncThunk(
  'sales/orders/history',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/sales/leads/${leadId}/orders/history`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);
export const nextLeadStep = createAsyncThunk(
  'sales/lead/nextStep',
  async ({ leadId, data }, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.post(
        `/sales/leads/${leadId}/next?${queryString}`,
        data
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);
export const checkCustomerExists = createAsyncThunk(
  'sales/customer/checkExists',
  async ({ customerId }, { rejectWithValue }) => {
    try {
      const response = await billingApiClient.get(`/sales/customer-exists`, {
        params: { id: customerId },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(
        message === 'An unexpected error occurred'
          ? 'ERP connection failed. Please try again later.'
          : message
      );
      return rejectWithValue(message);
    }
  }
);

export const assignCustomerToLead = createAsyncThunk(
  'sales/lead/assignCustomer',
  async ({ leadId, customerId }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/sales/leads/${leadId}/assign-customer`, {
        customerId,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const updateLeadStatus = createAsyncThunk(
  'sales/lead/updateStatus',
  async ({ leadId, data }, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.post(
        `/sales/leads/${leadId}/status?${queryString}`,
        data
      );
      notifySuccess('Status changed successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const updateLeadB2BDetails = createAsyncThunk(
  'sales/lead/updateB2BDetails',
  async ({ leadId, data }, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.put(`/sales/leads/${leadId}/b2b?${queryString}`, data);
      notifySuccess('Lead details updated successfully.');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const updateLeadB2CDetails = createAsyncThunk(
  'sales/lead/updateB2CDetails',
  async ({ leadId, data }, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.put(`/sales/leads/${leadId}/b2c?${queryString}`, data);
      notifySuccess('Lead details updated successfully.');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const searchLeadByPhone = createAsyncThunk(
  'sales/lead/searchByPhone',
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.post(`/sales/leads/search-phone?${queryString}`, {
        phoneNumber,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getRandomLead = createAsyncThunk(
  'sales/lead/getRandomLead',
  async ({ params }, { rejectWithValue }) => {
    const sessionParams = sessionManager.getQueryParams();
    const combinedParams = { ...params, ...sessionParams };
    const query = buildQueryString(combinedParams);

    try {
      const response = await ApiClient.get(`/sales/leads/random?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getSalesScriptEnhanced = createAsyncThunk(
  'sales/scripts-enhanced/get',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/sales/sales-scripts-enhanced/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const navigateSalesScript = createAsyncThunk(
  'sales/scripts-enhanced/navigate',
  async ({ uuid, selectedOptionId }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/sales/sales-scripts-enhanced/${uuid}/navigate`, {
        selectedOptionId,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getSalesScriptAgent = createAsyncThunk(
  'sales/scripts-enhanced/agent',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/sales/sales-scripts-enhanced/${uuid}/agent`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getPreviousSalesScriptStep = createAsyncThunk(
  'sales/scripts-enhanced/previous',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/sales/sales-scripts-enhanced/${uuid}/back`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getLeadVisibility = createAsyncThunk(
  'sales/lead-visibility/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get('/sales/settings/lead-visibility');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const editLeadVisibility = createAsyncThunk(
  'sales/lead-visibility/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/settings/lead-visibility/${uuid}`, body);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createFollowUp = createAsyncThunk(
  'sales/follow-ups/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/follow-ups', data);
      notifySuccess('Follow-up created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const updateFollowUp = createAsyncThunk(
  'sales/follow-ups/update',
  async ({ followUpId, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.put(`/sales/follow-ups/${followUpId}`, data);
      notifySuccess('Follow-up updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getLeadFollowUps = createAsyncThunk(
  'sales/follow-ups/getByLeadId',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/sales/leads/${leadId}/follow-ups`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getSalesFunnel = createAsyncThunk(
  'sales-analytics/sales-funnel/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(`/sales-analytics/sales-funnel?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getSalesOverview = createAsyncThunk(
  'sales-analytics/overview/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(`/sales/analytics/overview?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

// Next Contact Rules
export const getNextContactRules = createAsyncThunk(
  'sales/next-contact-rules/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(`/sales/next-contact-reminder-rules?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const createNextContactRule = createAsyncThunk(
  'sales/next-contact-rules/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/sales/next-contact-reminder-rules', data);
      notifySuccess('Next contact rule created successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const editNextContactRule = createAsyncThunk(
  'sales/next-contact-rules/edit',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(
        `/sales/next-contact-reminder-rules/${uuid}`,
        body
      );
      notifySuccess('Next contact rule updated successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteNextContactRule = createAsyncThunk(
  'sales/next-contact-rules/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/sales/next-contact-reminder-rules/${uuid}`);
      notifySuccess('Next contact rule deleted successfully');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getLeadsMetrics = createAsyncThunk(
  'sales/analytics/metrics/leads',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(`/sales/analytics/metrics/leads?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getSalesFunnelAnalytics = createAsyncThunk(
  'sales/analytics/funnel',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(`/sales/analytics/funnel?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getMostSoldOffers = createAsyncThunk(
  'sales/analytics/offers/most-sold',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(`/sales/analytics/offers/most-sold?${query}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getTopPerformingEmployees = createAsyncThunk(
  'sales/analytics/performance/employees/top',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const response = await ApiClient.get(
        `/sales/analytics/performance/employees/top?${query}`
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);
