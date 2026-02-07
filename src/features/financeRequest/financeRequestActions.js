import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError } from 'utils/notifyConfig';

export const getFinanceRequests = createAsyncThunk(
  'financeRequest/getAll',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const data = await ApiClient.get(`/financial-requests/list?${query}`);
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

export const getFinanceReports = createAsyncThunk(
  'financeRequest/getReports',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const data = await ApiClient.get(`/financial-requests/reports/detailed?${query}`);
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

export const createFinanceRequest = createAsyncThunk(
  'financeRequest/create',
  async (requestData, { rejectWithValue }) => {
    try {
      // Check if requestData is FormData (contains files)
      const headers =
        requestData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};

      const response = await ApiClient.post('/financial-requests', requestData, headers);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const updateFinanceRequest = createAsyncThunk(
  'financeRequest/update',
  async ({ id, requestData }, { rejectWithValue }) => {
    try {
      // Check if requestData is FormData (contains files)
      const headers =
        requestData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};

      const response = await ApiClient.patch(
        `/financial-requests/${id}`,
        requestData,
        headers
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteFinanceRequest = createAsyncThunk(
  'financeRequest/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/financial-requests/${id}`);
      return { id, data: response };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getFinanceRequestById = createAsyncThunk(
  'financeRequest/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/financial-requests/${id}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getFinanceReportById = createAsyncThunk(
  'financeRequest/getReportById',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/financial-requests/reports/detailed/${uuid}`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateFinanceRequestStatus = createAsyncThunk(
  'financeRequest/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(`/financial-requests/${id}/status`, { status });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const getFinanceRequestHistory = createAsyncThunk(
  'financeRequest/getHistory',
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const query = params ? buildQueryString(params) : '';
      const response = await ApiClient.get(
        `/financial-requests/${id}/history${query ? `?${query}` : ''}`
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const getFinanceRequestStatusHistory = createAsyncThunk(
  'financeRequest/getStatusHistory',
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const query = params ? buildQueryString(params) : '';
      const response = await ApiClient.get(
        `/financial-requests/${id}/status-history${query ? `?${query}` : ''}`
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const rejectFinanceRequest = createAsyncThunk(
  'financeRequest/reject',
  async ({ id, rejectionReason }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/financial-requests/${id}/reject`, {
        rejectionReason,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const approveFinanceRequest = createAsyncThunk(
  'financeRequest/approve',
  async ({ id, approvalData }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/financial-requests/${id}/approve`, approvalData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const markFinanceRequestAsDone = createAsyncThunk(
  'financeRequest/markAsDone',
  async ({ id, doneData }, { rejectWithValue }) => {
    try {
      // Check if doneData contains files (FormData)
      const headers =
        doneData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};

      const response = await ApiClient.post(
        `/financial-requests/${id}/mark-as-done`,
        doneData,
        headers
      );
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const markFinanceRequestAsSeen = createAsyncThunk(
  'financeRequest/markAsSeen',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(`/financial-requests/${uuid}/seen`);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const bulkApproveFinanceRequests = createAsyncThunk(
  'financeRequest/bulkApprove',
  async ({ requestUuids, notes }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/financial-requests/bulk/approve', {
        requestUuids,
        notes,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const bulkRejectFinanceRequests = createAsyncThunk(
  'financeRequest/bulkReject',
  async ({ requestUuids, rejectionReason }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/financial-requests/bulk/reject', {
        requestUuids,
        rejectionReason,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const bulkMarkAsSeenFinanceRequests = createAsyncThunk(
  'financeRequest/bulkMarkAsSeen',
  async ({ requestUuids }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/financial-requests/bulk/mark-as-seen', {
        requestUuids,
      });
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      notifyError(message);
      return rejectWithValue(message);
    }
  }
);

export const exportFinanceReportsPDF = createAsyncThunk(
  'financeRequest/exportPDF',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const response = await ApiClient.get(`/financial-requests/reports/export/pdf?${query}`, {
        responseType: 'blob',
      });

      // Create blob and download file
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `finance-reports-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return 'PDF exported successfully';
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const exportFinanceReportsExcel = createAsyncThunk(
  'financeRequest/exportExcel',
  async (params, { rejectWithValue }) => {
    try {
      const query = buildQueryString(params);
      const response = await ApiClient.get(
        `/financial-requests/reports/export/excel?${query}`,
        {
          responseType: 'blob',
        }
      );

      // Create blob and download file
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `finance-reports-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return 'Excel exported successfully';
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAccountingTypeChart = createAsyncThunk(
  'financeRequest/getAccountingTypeChart',
  async (params, { rejectWithValue }) => {
    try {
      const query = params ? buildQueryString(params) : '';
      const data = await ApiClient.get(
        `/financial-requests/reports/charts/accounting-type${query ? `?${query}` : ''}`
      );
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

export const getAmountAnalysisChart = createAsyncThunk(
  'financeRequest/getAmountAnalysisChart',
  async (params, { rejectWithValue }) => {
    try {
      const query = params ? buildQueryString(params) : '';
      const data = await ApiClient.get(
        `/financial-requests/reports/charts/amount-comparison${query ? `?${query}` : ''}`
      );
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

export const getTopDepartmentsChart = createAsyncThunk(
  'financeRequest/getTopDepartmentsChart',
  async (params, { rejectWithValue }) => {
    try {
      const query = params ? buildQueryString(params) : '';
      const data = await ApiClient.get(
        `/financial-requests/reports/charts/top-departments${query ? `?${query}` : ''}`
      );
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

export const getCostRatioChart = createAsyncThunk(
  'financeRequest/getCostRatioChart',
  async (params, { rejectWithValue }) => {
    try {
      const query = params ? buildQueryString(params) : '';
      const data = await ApiClient.get(
        `/financial-requests/reports/charts/cost-ratio${query ? `?${query}` : ''}`
      );
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
