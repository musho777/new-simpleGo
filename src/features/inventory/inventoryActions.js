import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

export const getCategories = createAsyncThunk(
  'inventory/categories/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/inventory/category?${query}`);
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

export const createCategory = createAsyncThunk(
  'inventory/categories/create',
  async (params, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/inventory/category`, params, {
        'Content-Type': 'multipart/form-data',
      });
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

export const deleteCategory = createAsyncThunk(
  'inventory/categories/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      return await ApiClient.del(`/inventory/category/${uuid}`);
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

export const createCategoryItem = createAsyncThunk(
  'inventory/categories/item/create',
  async (params, { rejectWithValue }) => {
    const { uuid } = params;
    const { body } = params;

    try {
      return await ApiClient.post(`/inventory/category/item/${uuid}`, body, {
        'Content-Type': 'multipart/form-data',
      });
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

export const getCategoryItems = createAsyncThunk(
  'inventory/category/items/get',
  async ({ uuid, params }, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/inventory/category/item/${uuid}?${query}`);
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

export const getPersonalInventoryItems = createAsyncThunk(
  'inventory/category/items/personal/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    const { uuid } = params;

    const url = uuid
      ? `/inventory/user/personal/${uuid}?${query}`
      : `/inventory/personal?${query}`;

    try {
      return await ApiClient.get(url);
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

export const addNoteToCategoryItem = createAsyncThunk(
  'inventory/category/item/note/assign',
  async (data, { rejectWithValue }) => {
    const { itemId } = data;
    try {
      return await ApiClient.post(`/inventory/item/assign/${itemId}`, data);
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

export const requestItem = createAsyncThunk(
  'inventory/category/item/request',
  async (data, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/inventory/item/request`, data);
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

export const validateBatchRequests = createAsyncThunk(
  'inventory/batch-requests/validate',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/inventory/batch-requests/validate`, formData, {
        'Content-Type': 'multipart/form-data',
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

export const submitBatchRequests = createAsyncThunk(
  'inventory/batch-requests/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/inventory/batch-requests`, formData, {
        'Content-Type': 'multipart/form-data',
      });
      notifySuccess('Items requested successfully via file upload!');
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

export const editItemRequest = createAsyncThunk(
  'inventory/category/item/edit',
  async (data, { rejectWithValue }) => {
    try {
      return await ApiClient.patch(`/inventory/item/request/${data.uuid}`, data.payload);
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

export const getPersonalRequests = createAsyncThunk(
  'inventory/category/items/personal/requests/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    const { uuid } = params;

    const url = uuid
      ? `/inventory/item/request/personal/${uuid}?${query}`
      : `/inventory/item/request/personal?${query}`;

    try {
      return await ApiClient.get(url);
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

export const getRequests = createAsyncThunk(
  'inventory/category/items/requests/pending/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/inventory/item/requests?${query}`);
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

export const deleteItemRequests = createAsyncThunk(
  'inventory/item/request/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      return await ApiClient.del(`/inventory/item/request/${uuid}`);
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

export const deleteCategoryItem = createAsyncThunk(
  'inventory/categories/item/delete',
  async (uuid, { rejectWithValue }) => {
    try {
      return await ApiClient.del(`/inventory/category/item/${uuid}`);
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

export const editCategoryItem = createAsyncThunk(
  'inventory/categories/item/update',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      return await ApiClient.patch(`/inventory/category/item/${uuid}`, body, {
        'Content-Type': 'multipart/form-data',
      });
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

export const editCategory = createAsyncThunk(
  'inventory/categories/update',
  async ({ uuid, body }, { rejectWithValue }) => {
    try {
      return await ApiClient.patch(`/inventory/category/${uuid}`, body, {
        'Content-Type': 'multipart/form-data',
      });
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const approveItemRequests = createAsyncThunk(
  'inventory/item/request/approve',
  async (data, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/inventory/item/request/approve`, data);
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const rejectItemRequests = createAsyncThunk(
  'inventory/item/request/reject',
  async (data, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/inventory/item/request/reject`, data);
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const saveTemplate = createAsyncThunk(
  'inventory/template/save',
  async (data, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/inventory/templates`, data);
    } catch (error) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getTemplates = createAsyncThunk(
  'inventory/templates/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/inventory/templates?${query}`);
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

export const getTemplateById = createAsyncThunk(
  'inventory/template/getById',
  async (templateId, { rejectWithValue }) => {
    try {
      return await ApiClient.get(`/inventory/templates/${templateId}`);
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

export const editTemplateAction = createAsyncThunk(
  'inventory/template/edit',
  async ({ templateId, data }, { rejectWithValue }) => {
    try {
      return await ApiClient.patch(`/inventory/templates/${templateId}`, data);
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

export const deleteTemplate = createAsyncThunk(
  'inventory/template/delete',
  async (templateId, { rejectWithValue }) => {
    try {
      return await ApiClient.del(`/inventory/templates/${templateId}`);
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

export const searchEmployees = createAsyncThunk(
  'inventory/employees/search',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      const data = await ApiClient.get(`/inventory/employees/search?${query}`);
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

export const getEmployeeInventory = createAsyncThunk(
  'inventory/employees/single',
  async ({ employeeId, params = {} }, { rejectWithValue }) => {
    const query = buildQueryString(params);
    const url = `/inventory/employees/${employeeId}/inventory${query ? `?${query}` : ''}`;

    try {
      return await ApiClient.get(url);
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

export const requestItemBack = createAsyncThunk(
  'inventory/employees/request-back',
  async ({ employeeId, itemTypeId, quantity, reason }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post(
        `/inventory/employees/${employeeId}/items/${itemTypeId}/request-back`,
        {
          quantity,
          reason,
        }
      );
      notifySuccess('Item request submitted successfully!');
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

export const getReturnedItems = createAsyncThunk(
  'inventory/returned-items/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/inventory/return-requests?${query}`);
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

export const getReturnRequestCategories = createAsyncThunk(
  'inventory/return-requests/categories/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      return await ApiClient.get(`/inventory/return-requests/categories?${query}`);
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

export const getReturnRequestItems = createAsyncThunk(
  'inventory/return-requests/items/get',
  async ({ categoryUuid, params = {} }, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(
        `/inventory/return-requests/items?categoryUuid=${categoryUuid}&${query}`
      );
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

export const getEmployeesHoldingItem = createAsyncThunk(
  'inventory/return-requests/employees-holding-item/get',
  async ({ itemTypeUuid, params = {} }, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(
        `/inventory/return-requests/employees-holding-item?itemTypeUuid=${itemTypeUuid}&${query}`
      );
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

export const createReturnRequest = createAsyncThunk(
  'inventory/return-requests/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/inventory/return-requests', data);
      notifySuccess('Return request created successfully');
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        notifyError(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getEmployeeReturns = createAsyncThunk(
  'inventory/employee/returns/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/inventory/employee/return-requests?${query}`);
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

export const getManagerEmployeeReturns = createAsyncThunk(
  'inventory/manager/employee-returns/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/inventory/manager/employee-returns?${query}`);
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

export const approveManagerEmployeeReturns = createAsyncThunk(
  'inventory/manager/employee-returns/approve',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/inventory/manager/employee-returns/approve', {
        returns: data,
      });
      notifySuccess('Return requests approved successfully!');
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

export const declineManagerEmployeeReturns = createAsyncThunk(
  'inventory/manager/employee-returns/decline',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/inventory/manager/employee-returns/decline', {
        returns: data,
      });
      notifySuccess('Return requests declined successfully!');
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

export const getEmployeePendingReturnRequests = createAsyncThunk(
  'inventory/employee/returns/pending/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/inventory/employee/return-requests/pending?${query}`);
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

export const exportEmployeeInventory = createAsyncThunk(
  'inventory/employees/export',
  async ({ employeeId, params = {} }, { rejectWithValue }) => {
    const exportParams = { ...params, format: 'xlsx' };
    const query = buildQueryString(exportParams);
    const url = `/inventory/employees/${employeeId}/inventory/export?${query}`;

    try {
      const response = await ApiClient.get(url, { responseType: 'blob' });

      const blob = new Blob([response], { type: 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `employee-inventory-${employeeId}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      notifySuccess('Inventory exported successfully!');
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

export const getEmployeeReturnedItems = createAsyncThunk(
  'inventory/employee/returned-items/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);

    try {
      return await ApiClient.get(`/inventory/employee/returns?${query}`);
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

export const declineEmployeeReturnRequests = createAsyncThunk(
  'inventory/employee/return-requests/decline',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(
        `/inventory/employee/return-requests/decline`,
        data
      );
      notifySuccess('Requests declined successfully!');
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

export const approveEmployeeReturnRequests = createAsyncThunk(
  'inventory/employee/return-requests/approve',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(
        `/inventory/employee/return-requests/approve`,
        data
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

export const getEmployeeReturnAvailableItems = createAsyncThunk(
  'inventory/employee/returns/available-items/get',
  async (params, { rejectWithValue }) => {
    const query = buildQueryString(params);
    try {
      const data = await ApiClient.get(`/inventory/employee/returns/available-items?${query}`);
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

export const returnEmployeeItem = createAsyncThunk(
  'inventory/employee/item/return',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/inventory/employee/returns', data);
      notifySuccess('Item returned successfully!');
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

export const updateEmployeeReturn = createAsyncThunk(
  'inventory/employee/return/update',
  async ({ returnUuid, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(
        `/inventory/employee/returns/${returnUuid}`,
        data
      );
      notifySuccess('Return request updated successfully!');
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

export const deleteEmployeeReturn = createAsyncThunk(
  'inventory/employee/return/delete',
  async (returnUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/inventory/employee/returns/${returnUuid}`);
      notifySuccess('Return request deleted successfully!');
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

export const getItemDistribution = createAsyncThunk(
  'inventory/items/distribution/get',
  async (itemTypeUuid, { rejectWithValue }) => {
    try {
      return await ApiClient.get(`/inventory/items/${itemTypeUuid}/distribution`);
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

export const getItemsDistributionList = createAsyncThunk(
  'inventory/items/distribution-list/get',
  async ({ itemTypeUuid, params = {} }, { rejectWithValue }) => {
    const query = buildQueryString(params);
    const url = `/inventory/items/${itemTypeUuid}/distribution${query ? `?${query}` : ''}`;

    try {
      return await ApiClient.get(url);
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

export const getAwaitingReceiptData = createAsyncThunk(
  'inventory/employee/awaiting-receipt/get',
  async (params = {}, { rejectWithValue }) => {
    const query = buildQueryString(params);
    const url = `/inventory/employee/awaiting-receipt?${query}`;

    try {
      const data = await ApiClient.get(url);
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

export const confirmReceipt = createAsyncThunk(
  'inventory/employee/confirm-receipt/post',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/inventory/employee/confirm-receipt', data);
      notifySuccess(response.message || 'Receipt confirmed successfully!');
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

export const exportRequestHistory = createAsyncThunk(
  'inventory/request-history/export',
  async (params = {}, { rejectWithValue }) => {
    const exportParams = { ...params, export: true };
    const query = buildQueryString(exportParams);
    const url = `/inventory/item/requests?${query}`;

    try {
      const response = await ApiClient.get(url, { responseType: 'blob' });

      const blob = new Blob([response], { type: 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `request-history-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      notifySuccess('Request history exported successfully!');
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

export const exportNewRequests = createAsyncThunk(
  'inventory/new-requests/export',
  async (params = {}, { rejectWithValue }) => {
    const exportParams = { ...params, export: true, status: 'pending' };
    const query = buildQueryString(exportParams);
    const url = `/inventory/item/requests?${query}`;

    try {
      const response = await ApiClient.get(url, { responseType: 'blob' });

      const blob = new Blob([response], { type: 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `new-requests-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      notifySuccess('New requests exported successfully!');
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

export const deleteReturnRequest = createAsyncThunk(
  'inventory/return-request/delete',
  async (requestUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/inventory/return-requests/${requestUuid}`);
      notifySuccess('Return request deleted successfully!');
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

export const editReturnRequest = createAsyncThunk(
  'inventory/return-request/edit',
  async ({ requestUuid, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(
        `/inventory/return-requests/${requestUuid}`,
        data
      );
      notifySuccess('Return request updated successfully!');
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
