import { createSlice } from '@reduxjs/toolkit';

import {
  addNoteToCategoryItem,
  approveEmployeeReturnRequests,
  approveItemRequests,
  approveManagerEmployeeReturns,
  confirmReceipt,
  createCategory,
  createCategoryItem,
  createReturnRequest,
  declineEmployeeReturnRequests,
  declineManagerEmployeeReturns,
  deleteEmployeeReturn,
  deleteReturnRequest,
  editCategoryItem,
  editItemRequest,
  editReturnRequest,
  exportEmployeeInventory,
  exportNewRequests,
  exportRequestHistory,
  getAwaitingReceiptData,
  getCategories,
  getCategoryItems,
  getEmployeeInventory,
  getEmployeePendingReturnRequests,
  getEmployeeReturnAvailableItems,
  getEmployeeReturnedItems,
  getEmployeeReturns,
  getEmployeesHoldingItem,
  getItemDistribution,
  getItemsDistributionList,
  getManagerEmployeeReturns,
  getPersonalInventoryItems,
  getPersonalRequests,
  getRequests,
  getReturnRequestCategories,
  getReturnRequestItems,
  getReturnedItems,
  rejectItemRequests,
  requestItem,
  requestItemBack,
  returnEmployeeItem,
  searchEmployees,
  submitBatchRequests,
  updateEmployeeReturn,
  validateBatchRequests,
} from './inventoryActions';

const initialState = {
  loading: {
    category: false,
    categoryItems: false,
    personalItems: false,
    assignNoteToItem: false,
    requestItem: false,
    validateBatchRequests: false,
    submitBatchRequests: false,
    editItemRequest: false,
    personalRequests: false,
    createCategoryItem: false,
    pendingRequests: false,
    rejectItemRequests: false,
    approveItemRequests: false,
    searchEmployees: false,
    employeeInventory: false,
    exportEmployeeInventory: false,
    requestItemBack: false,
    returnedItems: false,
    returnRequestCategories: false,
    returnRequestItems: false,
    employeesHoldingItem: false,
    createReturnRequest: false,
    employeeReturns: false,
    employeeReturnedItems: false,
    employeePendingReturnRequests: false,
    declineEmployeeReturnRequests: false,
    approveEmployeeReturnRequests: false,
    returnEmployeeItem: false,
    employeeReturnAvailableItems: false,
    updateEmployeeReturn: false,
    deleteEmployeeReturn: false,
    approveManagerEmployeeReturns: false,
    declineManagerEmployeeReturns: false,
    itemDistribution: false,
    itemsDistributionList: false,
    awaitingReceiptData: false,
    confirmReceipt: false,
    exportRequestHistory: false,
    exportNewRequests: false,
    deleteReturnRequest: false,
    editReturnRequest: false,
  },
  success: {
    category: false,
    categoryItems: false,
    personalItems: false,
    assignNoteToItem: false,
    requestItem: false,
    validateBatchRequests: false,
    submitBatchRequests: false,
    editItemRequest: false,
    personalRequests: false,
    createCategoryItem: false,
    pendingRequests: false,
    rejectItemRequests: false,
    approveItemRequests: false,
    searchEmployees: false,
    employeeInventory: false,
    exportEmployeeInventory: false,
    requestItemBack: false,
    returnedItems: false,
    returnRequestCategories: false,
    returnRequestItems: false,
    employeesHoldingItem: false,
    createReturnRequest: false,
    employeeReturns: false,
    employeeReturnedItems: false,
    employeePendingReturnRequests: false,
    declineEmployeeReturnRequests: false,
    approveEmployeeReturnRequests: false,
    returnEmployeeItem: false,
    employeeReturnAvailableItems: false,
    updateEmployeeReturn: false,
    deleteEmployeeReturn: false,
    approveManagerEmployeeReturns: false,
    declineManagerEmployeeReturns: false,
    itemDistribution: false,
    itemsDistributionList: false,
    awaitingReceiptData: false,
    confirmReceipt: false,
    exportRequestHistory: false,
    exportNewRequests: false,
    deleteReturnRequest: false,
    editReturnRequest: false,
  },
  error: {
    category: null,
    categoryItems: null,
    personalItems: null,
    assignNoteToItem: null,
    requestItem: null,
    validateBatchRequests: null,
    submitBatchRequests: null,
    editItemRequest: null,
    personalRequests: null,
    pendingRequests: null,
    createCategoryItem: null,
    rejectItemRequests: null,
    approveItemRequests: null,
    searchEmployees: null,
    employeeInventory: null,
    exportEmployeeInventory: null,
    requestItemBack: null,
    returnedItems: null,
    returnRequestCategories: null,
    returnRequestItems: null,
    employeesHoldingItem: null,
    createReturnRequest: null,
    employeeReturns: null,
    employeeReturnedItems: null,
    employeePendingReturnRequests: null,
    declineEmployeeReturnRequests: null,
    approveEmployeeReturnRequests: null,
    returnEmployeeItem: null,
    employeeReturnAvailableItems: null,
    updateEmployeeReturn: null,
    deleteEmployeeReturn: null,
    approveManagerEmployeeReturns: null,
    declineManagerEmployeeReturns: null,
    itemDistribution: null,
    itemsDistributionList: null,
    awaitingReceiptData: null,
    confirmReceipt: null,
    exportRequestHistory: null,
    exportNewRequests: null,
    deleteReturnRequest: null,
    editReturnRequest: null,
  },
  categories: [],
  categoryItems: [],
  personalItems: [],
  personalTotalCount: null,
  personalRequests: [],
  pendingRequests: {},
  employees: [],
  employeeInventory: null,
  returnedItems: null,
  returnRequestCategories: [],
  returnRequestItems: [],
  employeesHoldingItem: null,
  employeeReturns: null,
  managerEmployeeReturns: null,
  employeeReturnedItems: null,
  employeePendingReturnRequests: null,
  employeeReturnAvailableItems: null,
  itemDistribution: null,
  itemsDistributionList: null,
  awaitingReceiptData: null,
  batchValidationResult: null,
  count: 0,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    resetTeamsState: () => initialState,
    setResetAssignNoteSuccess: (state) => {
      state.success.assignNoteToItem = false;
    },
    setResetEmployee: (state) => {
      state.loading.searchEmployees = false;
      state.employees = [];
      state.count = 0;
      state.success.searchEmployees = true;
    },
    setResetRequestItemSuccess: (state) => {
      state.success.requestItem = false;
      state.success.validateBatchRequests = false;
      state.success.submitBatchRequests = false;
      state.success.editItemRequest = false;
      state.batchValidationResult = null;
    },
    setResetRequestsApproveRejectSuccess: (state) => {
      state.success.rejectItemRequests = false;
      state.success.approveItemRequests = false;
    },
    resetEmployeesHoldingItem: (state) => {
      state.employeesHoldingItem = null;
    },
    setResetRequestItemBackSuccess: (state) => {
      state.success.requestItemBack = false;
    },
    setResetAwaitingReceiptConfirm: (state) => {
      state.success.confirmReceipt = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get categories
      .addCase(getCategories.pending, (state) => {
        state.loading.category = true;
        state.error.category = null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading.category = false;
        state.categories = payload;
        state.count = payload.count;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.loading.category = false;
        state.error.category = payload;
      })

      // Get category items
      .addCase(getCategoryItems.pending, (state) => {
        state.loading.categoryItems = true;
        state.error.categoryItems = null;
      })
      .addCase(getCategoryItems.fulfilled, (state, { payload }) => {
        state.loading.categoryItems = false;
        state.categoryItems = payload;
      })
      .addCase(getCategoryItems.rejected, (state, { payload }) => {
        state.loading.categoryItems = false;
        state.error.categoryItems = payload;
      })

      // Edit category item
      .addCase(editCategoryItem.pending, (state) => {
        state.loading.categoryItems = true;
        state.error.categoryItems = null;
      })
      .addCase(editCategoryItem.fulfilled, (state) => {
        state.loading.categoryItems = false;
      })
      .addCase(editCategoryItem.rejected, (state, { payload }) => {
        state.loading.categoryItems = false;
        state.error.categoryItems = payload;
      })

      // Get personal items
      .addCase(getPersonalInventoryItems.pending, (state) => {
        state.loading.personalItems = true;
        state.error.personalItems = null;
      })
      .addCase(getPersonalInventoryItems.fulfilled, (state, { payload }) => {
        state.loading.personalItems = false;
        state.personalItems = payload.data;
        state.personalTotalCount = payload.total;
      })
      .addCase(getPersonalInventoryItems.rejected, (state, { payload }) => {
        state.loading.personalItems = false;
        state.error.personalItems = payload;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading.category = true;
        state.error.category = null;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.loading.category = false;
        state.categories = payload.categories;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.loading.category = false;
        state.error.category = payload;
      })

      // Assign note
      .addCase(addNoteToCategoryItem.pending, (state) => {
        state.loading.assignNoteToItem = true;
        state.error.assignNoteToItem = null;
      })
      .addCase(addNoteToCategoryItem.fulfilled, (state) => {
        state.loading.assignNoteToItem = false;
        state.success.assignNoteToItem = true;
      })
      .addCase(addNoteToCategoryItem.rejected, (state, { payload }) => {
        state.loading.assignNoteToItem = false;
        state.error.assignNoteToItem = payload;
      })

      // Request item
      .addCase(requestItem.pending, (state) => {
        state.loading.requestItem = true;
        state.error.requestItem = null;
      })
      .addCase(requestItem.fulfilled, (state) => {
        state.loading.requestItem = false;
        state.success.requestItem = true;
      })
      .addCase(requestItem.rejected, (state, { payload }) => {
        state.loading.requestItem = false;
        state.error.requestItem = payload;
      })

      // Validate batch requests
      .addCase(validateBatchRequests.pending, (state) => {
        state.loading.validateBatchRequests = true;
        state.error.validateBatchRequests = null;
        state.batchValidationResult = null;
      })
      .addCase(validateBatchRequests.fulfilled, (state, { payload }) => {
        state.loading.validateBatchRequests = false;
        state.success.validateBatchRequests = true;
        state.batchValidationResult = payload;
      })
      .addCase(validateBatchRequests.rejected, (state, { payload }) => {
        state.loading.validateBatchRequests = false;
        state.error.validateBatchRequests = payload;
        state.batchValidationResult = null;
      })

      // Submit batch requests
      .addCase(submitBatchRequests.pending, (state) => {
        state.loading.submitBatchRequests = true;
        state.error.submitBatchRequests = null;
      })
      .addCase(submitBatchRequests.fulfilled, (state) => {
        state.loading.submitBatchRequests = false;
        state.success.submitBatchRequests = true;
        state.batchValidationResult = null;
      })
      .addCase(submitBatchRequests.rejected, (state, { payload }) => {
        state.loading.submitBatchRequests = false;
        state.error.submitBatchRequests = payload;
      })

      // Edit item request
      .addCase(editItemRequest.pending, (state) => {
        state.loading.editItemRequest = true;
        state.error.editItemRequest = null;
      })
      .addCase(editItemRequest.fulfilled, (state) => {
        state.loading.editItemRequest = false;
        state.success.editItemRequest = true;
      })
      .addCase(editItemRequest.rejected, (state, { payload }) => {
        state.loading.editItemRequest = false;
        state.error.editItemRequest = payload;
      })

      // Approve item request
      .addCase(approveItemRequests.pending, (state) => {
        state.loading.approveItemRequests = true;
        state.error.approveItemRequests = null;
      })
      .addCase(approveItemRequests.fulfilled, (state) => {
        state.loading.approveItemRequests = false;
        state.success.approveItemRequests = true;
      })
      .addCase(approveItemRequests.rejected, (state, { payload }) => {
        state.loading.approveItemRequests = false;
        state.error.approveItemRequests = payload;
      })

      // Reject item request
      .addCase(rejectItemRequests.pending, (state) => {
        state.loading.rejectItemRequests = true;
        state.error.rejectItemRequests = null;
      })
      .addCase(rejectItemRequests.fulfilled, (state) => {
        state.loading.rejectItemRequests = false;
        state.success.rejectItemRequests = true;
      })
      .addCase(rejectItemRequests.rejected, (state, { payload }) => {
        state.loading.rejectItemRequests = false;
        state.error.rejectItemRequests = payload;
      })

      // Create item
      .addCase(createCategoryItem.pending, (state) => {
        state.loading.createCategoryItem = true;
        state.error.createCategoryItem = null;
      })
      .addCase(createCategoryItem.fulfilled, (state) => {
        state.loading.createCategoryItem = false;
        state.success.createCategoryItem = true;
      })
      .addCase(createCategoryItem.rejected, (state, { payload }) => {
        state.loading.createCategoryItem = false;
        state.error.createCategoryItem = payload;
      })

      // Get personal requests
      .addCase(getPersonalRequests.pending, (state) => {
        state.loading.personalRequests = true;
        state.error.personalRequests = null;
      })
      .addCase(getPersonalRequests.fulfilled, (state, { payload }) => {
        state.loading.personalRequests = false;
        state.personalRequests = payload;
        state.count = payload.count;
      })
      .addCase(getPersonalRequests.rejected, (state, { payload }) => {
        state.loading.personalRequests = false;
        state.error.personalRequests = payload;
      })

      // Get pending requests
      .addCase(getRequests.pending, (state) => {
        state.loading.pendingRequests = true;
        state.error.pendingRequests = null;
      })
      .addCase(getRequests.fulfilled, (state, { payload }) => {
        state.loading.pendingRequests = false;
        state.pendingRequests = payload;
      })
      .addCase(getRequests.rejected, (state, { payload }) => {
        state.loading.pendingRequests = false;
        state.error.pendingRequests = payload;
      })

      // Search employees
      .addCase(searchEmployees.pending, (state) => {
        state.loading.searchEmployees = true;
        state.error.searchEmployees = null;
      })
      .addCase(searchEmployees.fulfilled, (state, { payload }) => {
        state.loading.searchEmployees = false;
        state.employees = payload;
        state.count = payload.count || 0;
        state.success.searchEmployees = true;
      })
      .addCase(searchEmployees.rejected, (state, { payload }) => {
        state.loading.searchEmployees = false;
        state.error.searchEmployees = payload;
      })

      // Get employee inventory
      .addCase(getEmployeeInventory.pending, (state) => {
        state.loading.employeeInventory = true;
        state.error.employeeInventory = null;
      })
      .addCase(getEmployeeInventory.fulfilled, (state, { payload }) => {
        state.loading.employeeInventory = false;
        state.employeeInventory = payload;
        state.success.employeeInventory = true;
      })
      .addCase(getEmployeeInventory.rejected, (state, { payload }) => {
        state.loading.employeeInventory = false;
        state.error.employeeInventory = payload;
      })

      // Request item back
      .addCase(requestItemBack.pending, (state) => {
        state.loading.requestItemBack = true;
        state.error.requestItemBack = null;
        state.success.requestItemBack = false;
      })
      .addCase(requestItemBack.fulfilled, (state) => {
        state.loading.requestItemBack = false;
        state.success.requestItemBack = true;
      })
      .addCase(requestItemBack.rejected, (state, { payload }) => {
        state.loading.requestItemBack = false;
        state.error.requestItemBack = payload;
      })

      // Get returned items
      .addCase(getReturnedItems.pending, (state) => {
        state.loading.returnedItems = true;
        state.error.returnedItems = null;
      })
      .addCase(getReturnedItems.fulfilled, (state, { payload }) => {
        state.loading.returnedItems = false;
        state.returnedItems = payload;
        state.success.returnedItems = true;
      })
      .addCase(getReturnedItems.rejected, (state, { payload }) => {
        state.loading.returnedItems = false;
        state.error.returnedItems = payload;
      })

      // Get return request categories
      .addCase(getReturnRequestCategories.pending, (state) => {
        state.loading.returnRequestCategories = true;
        state.error.returnRequestCategories = null;
      })
      .addCase(getReturnRequestCategories.fulfilled, (state, { payload }) => {
        state.loading.returnRequestCategories = false;
        state.returnRequestCategories = payload;
        state.success.returnRequestCategories = true;
      })
      .addCase(getReturnRequestCategories.rejected, (state, { payload }) => {
        state.loading.returnRequestCategories = false;
        state.error.returnRequestCategories = payload;
      })

      // Get return request items
      .addCase(getReturnRequestItems.pending, (state) => {
        state.loading.returnRequestItems = true;
        state.error.returnRequestItems = null;
      })
      .addCase(getReturnRequestItems.fulfilled, (state, { payload }) => {
        state.loading.returnRequestItems = false;
        state.returnRequestItems = payload;
        state.success.returnRequestItems = true;
      })
      .addCase(getReturnRequestItems.rejected, (state, { payload }) => {
        state.loading.returnRequestItems = false;
        state.error.returnRequestItems = payload;
      })

      // Get employees holding item
      .addCase(getEmployeesHoldingItem.pending, (state) => {
        state.loading.employeesHoldingItem = true;
        state.error.employeesHoldingItem = null;
      })
      .addCase(getEmployeesHoldingItem.fulfilled, (state, { payload }) => {
        state.loading.employeesHoldingItem = false;
        state.employeesHoldingItem = payload;
        state.success.employeesHoldingItem = true;
      })
      .addCase(getEmployeesHoldingItem.rejected, (state, { payload }) => {
        state.loading.employeesHoldingItem = false;
        state.error.employeesHoldingItem = payload;
      })

      // Create return request
      .addCase(createReturnRequest.pending, (state) => {
        state.loading.createReturnRequest = true;
        state.error.createReturnRequest = null;
        state.success.createReturnRequest = false;
      })
      .addCase(createReturnRequest.fulfilled, (state) => {
        state.loading.createReturnRequest = false;
        state.success.createReturnRequest = true;
      })
      .addCase(createReturnRequest.rejected, (state, { payload }) => {
        state.loading.createReturnRequest = false;
        state.error.createReturnRequest = payload;
        state.success.createReturnRequest = false;
      })

      // Get employee returns
      .addCase(getEmployeeReturns.pending, (state) => {
        state.loading.employeeReturns = true;
        state.error.employeeReturns = null;
      })
      .addCase(getEmployeeReturns.fulfilled, (state, { payload }) => {
        state.loading.employeeReturns = false;
        state.employeeReturns = payload;
        state.success.employeeReturns = true;
      })
      .addCase(getEmployeeReturns.rejected, (state, { payload }) => {
        state.loading.employeeReturns = false;
        state.error.employeeReturns = payload;
      })

      // Get manager employee returns
      .addCase(getManagerEmployeeReturns.pending, (state) => {
        state.loading.employeeReturns = true;
        state.error.employeeReturns = null;
      })
      .addCase(getManagerEmployeeReturns.fulfilled, (state, { payload }) => {
        state.loading.employeeReturns = false;
        state.managerEmployeeReturns = payload;
        state.success.employeeReturns = true;
      })
      .addCase(getManagerEmployeeReturns.rejected, (state, { payload }) => {
        state.loading.employeeReturns = false;
        state.error.employeeReturns = payload;
      })

      // Approve manager employee returns
      .addCase(approveManagerEmployeeReturns.pending, (state) => {
        state.loading.approveManagerEmployeeReturns = true;
        state.error.approveManagerEmployeeReturns = null;
        state.success.approveManagerEmployeeReturns = false;
      })
      .addCase(approveManagerEmployeeReturns.fulfilled, (state) => {
        state.loading.approveManagerEmployeeReturns = false;
        state.success.approveManagerEmployeeReturns = true;
      })
      .addCase(approveManagerEmployeeReturns.rejected, (state, { payload }) => {
        state.loading.approveManagerEmployeeReturns = false;
        state.error.approveManagerEmployeeReturns = payload;
      })

      // Decline manager employee returns
      .addCase(declineManagerEmployeeReturns.pending, (state) => {
        state.loading.declineManagerEmployeeReturns = true;
        state.error.declineManagerEmployeeReturns = null;
        state.success.declineManagerEmployeeReturns = false;
      })
      .addCase(declineManagerEmployeeReturns.fulfilled, (state) => {
        state.loading.declineManagerEmployeeReturns = false;
        state.success.declineManagerEmployeeReturns = true;
      })
      .addCase(declineManagerEmployeeReturns.rejected, (state, { payload }) => {
        state.loading.declineManagerEmployeeReturns = false;
        state.error.declineManagerEmployeeReturns = payload;
      })

      // Export employee inventory
      .addCase(exportEmployeeInventory.pending, (state) => {
        state.loading.exportEmployeeInventory = true;
        state.error.exportEmployeeInventory = null;
      })
      .addCase(exportEmployeeInventory.fulfilled, (state) => {
        state.loading.exportEmployeeInventory = false;
        state.success.exportEmployeeInventory = true;
      })
      .addCase(exportEmployeeInventory.rejected, (state, { payload }) => {
        state.loading.exportEmployeeInventory = false;
        state.error.exportEmployeeInventory = payload;
      })

      // Get employee returned items
      .addCase(getEmployeeReturnedItems.pending, (state) => {
        state.loading.employeeReturnedItems = true;
        state.error.employeeReturnedItems = null;
      })
      .addCase(getEmployeeReturnedItems.fulfilled, (state, { payload }) => {
        state.loading.employeeReturnedItems = false;
        state.employeeReturnedItems = payload;
        state.success.employeeReturnedItems = true;
      })
      .addCase(getEmployeeReturnedItems.rejected, (state, { payload }) => {
        state.loading.employeeReturnedItems = false;
        state.error.employeeReturnedItems = payload;
        state.success.employeeReturnedItems = false;
      })

      // Get employee pending return requests
      .addCase(getEmployeePendingReturnRequests.pending, (state) => {
        state.loading.employeePendingReturnRequests = true;
        state.error.employeePendingReturnRequests = null;
      })
      .addCase(getEmployeePendingReturnRequests.fulfilled, (state, { payload }) => {
        state.loading.employeePendingReturnRequests = false;
        state.employeePendingReturnRequests = payload;
        state.success.employeePendingReturnRequests = true;
      })
      .addCase(getEmployeePendingReturnRequests.rejected, (state, { payload }) => {
        state.loading.employeePendingReturnRequests = false;
        state.error.employeePendingReturnRequests = payload;
      })
      // Decline employee return requests
      .addCase(declineEmployeeReturnRequests.pending, (state) => {
        state.loading.declineEmployeeReturnRequests = true;
        state.error.declineEmployeeReturnRequests = null;
      })
      .addCase(declineEmployeeReturnRequests.fulfilled, (state) => {
        state.loading.declineEmployeeReturnRequests = false;
        state.success.declineEmployeeReturnRequests = true;
      })
      .addCase(declineEmployeeReturnRequests.rejected, (state, { payload }) => {
        state.loading.declineEmployeeReturnRequests = false;
        state.error.declineEmployeeReturnRequests = payload;
      })
      // Approve employee return requests
      .addCase(approveEmployeeReturnRequests.pending, (state) => {
        state.loading.approveEmployeeReturnRequests = true;
        state.error.approveEmployeeReturnRequests = null;
      })
      .addCase(approveEmployeeReturnRequests.fulfilled, (state) => {
        state.loading.approveEmployeeReturnRequests = false;
        state.success.approveEmployeeReturnRequests = true;
      })
      .addCase(approveEmployeeReturnRequests.rejected, (state, { payload }) => {
        state.loading.approveEmployeeReturnRequests = false;
        state.error.approveEmployeeReturnRequests = payload;
      })
      // Return employee item
      .addCase(returnEmployeeItem.pending, (state) => {
        state.loading.returnEmployeeItem = true;
        state.error.returnEmployeeItem = null;
      })
      .addCase(returnEmployeeItem.fulfilled, (state) => {
        state.loading.returnEmployeeItem = false;
        state.success.returnEmployeeItem = true;
      })
      .addCase(returnEmployeeItem.rejected, (state, { payload }) => {
        state.loading.returnEmployeeItem = false;
        state.error.returnEmployeeItem = payload;
      })
      // Get employee return available items
      .addCase(getEmployeeReturnAvailableItems.pending, (state) => {
        state.loading.employeeReturnAvailableItems = true;
        state.error.employeeReturnAvailableItems = null;
      })
      .addCase(getEmployeeReturnAvailableItems.fulfilled, (state, { payload }) => {
        state.loading.employeeReturnAvailableItems = false;
        state.employeeReturnAvailableItems = payload;
        state.success.employeeReturnAvailableItems = true;
      })
      .addCase(getEmployeeReturnAvailableItems.rejected, (state, { payload }) => {
        state.loading.employeeReturnAvailableItems = false;
        state.error.employeeReturnAvailableItems = payload;
      })
      // Update employee return
      .addCase(updateEmployeeReturn.pending, (state) => {
        state.loading.updateEmployeeReturn = true;
        state.error.updateEmployeeReturn = null;
      })
      .addCase(updateEmployeeReturn.fulfilled, (state) => {
        state.loading.updateEmployeeReturn = false;
        state.success.updateEmployeeReturn = true;
      })
      .addCase(updateEmployeeReturn.rejected, (state, { payload }) => {
        state.loading.updateEmployeeReturn = false;
        state.error.updateEmployeeReturn = payload;
      })
      // Delete employee return
      .addCase(deleteEmployeeReturn.pending, (state) => {
        state.loading.deleteEmployeeReturn = true;
        state.error.deleteEmployeeReturn = null;
      })
      .addCase(deleteEmployeeReturn.fulfilled, (state) => {
        state.loading.deleteEmployeeReturn = false;
        state.success.deleteEmployeeReturn = true;
      })
      .addCase(deleteEmployeeReturn.rejected, (state, { payload }) => {
        state.loading.deleteEmployeeReturn = false;
        state.error.deleteEmployeeReturn = payload;
      })
      // Get item distribution
      .addCase(getItemDistribution.pending, (state) => {
        state.loading.itemDistribution = true;
        state.error.itemDistribution = null;
      })
      .addCase(getItemDistribution.fulfilled, (state, { payload }) => {
        state.loading.itemDistribution = false;
        state.itemDistribution = payload;
        state.success.itemDistribution = true;
      })
      .addCase(getItemDistribution.rejected, (state, { payload }) => {
        state.loading.itemDistribution = false;
        state.error.itemDistribution = payload;
      })
      // Get items distribution list
      .addCase(getItemsDistributionList.pending, (state) => {
        state.loading.itemsDistributionList = true;
        state.error.itemsDistributionList = null;
      })
      .addCase(getItemsDistributionList.fulfilled, (state, { payload }) => {
        state.loading.itemsDistributionList = false;
        state.itemsDistributionList = payload;
        state.success.itemsDistributionList = true;
      })
      .addCase(getItemsDistributionList.rejected, (state, { payload }) => {
        state.loading.itemsDistributionList = false;
        state.error.itemsDistributionList = payload;
      })
      // Get awaiting receipt data
      .addCase(getAwaitingReceiptData.pending, (state) => {
        state.loading.awaitingReceiptData = true;
        state.error.awaitingReceiptData = null;
      })
      .addCase(getAwaitingReceiptData.fulfilled, (state, { payload }) => {
        state.loading.awaitingReceiptData = false;
        state.awaitingReceiptData = payload;
        state.success.awaitingReceiptData = true;
      })
      .addCase(getAwaitingReceiptData.rejected, (state, { payload }) => {
        state.loading.awaitingReceiptData = false;
        state.error.awaitingReceiptData = payload;
      })
      // Confirm receipt
      .addCase(confirmReceipt.pending, (state) => {
        state.loading.confirmReceipt = true;
        state.error.confirmReceipt = null;
      })
      .addCase(confirmReceipt.fulfilled, (state) => {
        state.loading.confirmReceipt = false;
        state.success.confirmReceipt = true;
      })
      .addCase(confirmReceipt.rejected, (state, { payload }) => {
        state.loading.confirmReceipt = false;
        state.error.confirmReceipt = payload;
      })
      // Export request history
      .addCase(exportRequestHistory.pending, (state) => {
        state.loading.exportRequestHistory = true;
        state.error.exportRequestHistory = null;
      })
      .addCase(exportRequestHistory.fulfilled, (state) => {
        state.loading.exportRequestHistory = false;
        state.success.exportRequestHistory = true;
      })
      .addCase(exportRequestHistory.rejected, (state, { payload }) => {
        state.loading.exportRequestHistory = false;
        state.error.exportRequestHistory = payload;
      })
      // Export new requests
      .addCase(exportNewRequests.pending, (state) => {
        state.loading.exportNewRequests = true;
        state.error.exportNewRequests = null;
      })
      .addCase(exportNewRequests.fulfilled, (state) => {
        state.loading.exportNewRequests = false;
        state.success.exportNewRequests = true;
      })
      .addCase(exportNewRequests.rejected, (state, { payload }) => {
        state.loading.exportNewRequests = false;
        state.error.exportNewRequests = payload;
      })
      // Delete return request
      .addCase(deleteReturnRequest.pending, (state) => {
        state.loading.deleteReturnRequest = true;
        state.error.deleteReturnRequest = null;
      })
      .addCase(deleteReturnRequest.fulfilled, (state) => {
        state.loading.deleteReturnRequest = false;
        state.success.deleteReturnRequest = true;
      })
      .addCase(deleteReturnRequest.rejected, (state, { payload }) => {
        state.loading.deleteReturnRequest = false;
        state.error.deleteReturnRequest = payload;
      })
      // Edit return request
      .addCase(editReturnRequest.pending, (state) => {
        state.loading.editReturnRequest = true;
        state.error.editReturnRequest = null;
      })
      .addCase(editReturnRequest.fulfilled, (state) => {
        state.loading.editReturnRequest = false;
        state.success.editReturnRequest = true;
      })
      .addCase(editReturnRequest.rejected, (state, { payload }) => {
        state.loading.editReturnRequest = false;
        state.error.editReturnRequest = payload;
      });
  },
});

export const {
  resetTeamsState,
  resetEmployeesHoldingItem,
  setResetAssignNoteSuccess,
  setResetRequestItemSuccess,
  setResetRequestsApproveRejectSuccess,
  setResetRequestItemBackSuccess,
  setResetEmployee,
  setResetAwaitingReceiptConfirm,
} = inventorySlice.actions;

// personalTotalCount

export const selectLoading = (state) => state.inventory.loading;
export const selectSuccess = (state) => state.inventory.success;
export const selectError = (state) => state.inventory.error;
export const selectCategories = (state) => state.inventory.categories;
export const selectCategoryCount = (state) => state.inventory.count;
export const selectPersonalItems = (state) => state.inventory.personalItems;
export const selectPersonalTotalCount = (state) => state.inventory.personalTotalCount;
export const selectCategoryItems = (state) => state.inventory.categoryItems;
export const selectPersonalRequests = (state) => state.inventory.personalRequests;
export const selectPendingRequests = (state) => state.inventory.pendingRequests;
export const selectEmployees = (state) => state.inventory.employees;
export const selectEmployeeInventory = (state) => state.inventory.employeeInventory;
export const selectReturnedItems = (state) => state.inventory.returnedItems;
export const selectReturnRequestCategories = (state) =>
  state.inventory.returnRequestCategories;
export const selectReturnRequestItems = (state) => state.inventory.returnRequestItems;
export const selectEmployeesHoldingItem = (state) => state.inventory.employeesHoldingItem;
export const selectEmployeeReturns = (state) => state.inventory.employeeReturns;
export const selectManagerEmployeeReturns = (state) => state.inventory.managerEmployeeReturns;
export const selectEmployeeReturnedItems = (state) => state.inventory.employeeReturnedItems;
export const selectEmployeePendingReturnRequests = (state) =>
  state.inventory.employeePendingReturnRequests;
export const selectEmployeeReturnAvailableItems = (state) =>
  state.inventory.employeeReturnAvailableItems;
export const selectItemDistribution = (state) => state.inventory.itemDistribution;
export const selectItemsDistributionList = (state) => state.inventory.itemsDistributionList;
export const selectAwaitingReceiptData = (state) => state.inventory.awaitingReceiptData;
export const selectBatchValidationResult = (state) => state.inventory.batchValidationResult;

export const selectAwaitingConfirmReceipt = (state) => state.inventory.success.confirmReceipt;
export default inventorySlice.reducer;
