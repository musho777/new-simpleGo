import { createSlice } from '@reduxjs/toolkit';

import { notifySuccess } from 'utils/notifyConfig';

import {
  approveFinanceRequest,
  bulkApproveFinanceRequests,
  bulkMarkAsSeenFinanceRequests,
  bulkRejectFinanceRequests,
  createFinanceRequest,
  deleteFinanceRequest,
  getAccountingTypeChart,
  getAmountAnalysisChart,
  getCostRatioChart,
  getFinanceReportById,
  getFinanceReports,
  getFinanceRequestById,
  getFinanceRequestHistory,
  getFinanceRequestStatusHistory,
  getFinanceRequests,
  getTopDepartmentsChart,
  markFinanceRequestAsDone,
  markFinanceRequestAsSeen,
  rejectFinanceRequest,
  updateFinanceRequest,
} from './financeRequestActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
  success: false,
  showFilters: false,
  pagesCount: 0,
  currentPage: 1,
  selectedRequest: null,
  selectedReport: null,
  selectedReportLoading: false,
  createLoading: false,
  createSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
  rejectLoading: false,
  rejectSuccess: false,
  approveLoading: false,
  approveSuccess: false,
  markAsDoneLoading: false,
  markAsDoneSuccess: false,
  markAsSeenLoading: false,
  markAsSeenSuccess: false,
  bulkApproveLoading: false,
  bulkApproveSuccess: false,
  bulkRejectLoading: false,
  bulkRejectSuccess: false,
  bulkMarkAsSeenLoading: false,
  bulkMarkAsSeenSuccess: false,
  historyLoading: false,
  historyData: [],
  statusHistoryLoading: false,
  statusHistoryData: [],
  summary: {},
  summaryReports: {},
  totalCount: 0,
  reportsData: [],
  reportsLoading: [],
  reportsCount: 0,
  reportsPagesCount: 0,
  reportsCurrentPage: 1,
  accountingTypeChartData: [],
  accountingTypeChartLoading: false,
  amountAnalysisData: null,
  amountAnalysisLoading: false,
  topDepartmentsData: [],
  topDepartmentsLoading: false,
  costRatioData: [],
  costRatioLoading: false,
};

const financeRequestSlice = createSlice({
  name: 'financeRequest',
  initialState,
  reducers: {
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },

    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setSelectedRequest: (state, { payload }) => {
      state.selectedRequest = payload;
    },
    resetFinanceRequestSuccess: (state) => {
      state.success = false;
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
      state.rejectSuccess = false;
      state.approveSuccess = false;
      state.markAsDoneSuccess = false;
      state.markAsSeenSuccess = false;
      state.bulkApproveSuccess = false;
      state.bulkRejectSuccess = false;
      state.bulkMarkAsSeenSuccess = false;
    },
    setCreateSuccess: (state, { payload }) => {
      state.createSuccess = payload;
    },
    setUpdateSuccess: (state, { payload }) => {
      state.updateSuccess = payload;
    },
    setDeleteSuccess: (state, { payload }) => {
      state.deleteSuccess = payload;
    },
    setRejectSuccess: (state, { payload }) => {
      state.rejectSuccess = payload;
    },
    setApproveSuccess: (state, { payload }) => {
      state.approveSuccess = payload;
    },
    setMarkAsDoneSuccess: (state, { payload }) => {
      state.markAsDoneSuccess = payload;
    },
    setMarkAsSeenSuccess: (state, { payload }) => {
      state.markAsSeenSuccess = payload;
    },
    setBulkApproveSuccess: (state, { payload }) => {
      state.bulkApproveSuccess = payload;
    },
    setBulkRejectSuccess: (state, { payload }) => {
      state.bulkRejectSuccess = payload;
    },
    setBulkMarkAsSeenSuccess: (state, { payload }) => {
      state.bulkMarkAsSeenSuccess = payload;
    },
    setReportsCurrentPage: (state, { payload }) => {
      state.reportsCurrentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFinanceRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFinanceRequests.fulfilled, (state, { payload, meta }) => {
        const limit = meta.arg.limit || 10;
        const totalPages = Math.ceil(payload.count / limit);
        if (state.currentPage > totalPages) {
          state.currentPage = totalPages <= 1 ? 1 : totalPages;
        }
        state.loading = false;
        state.error = null;
        state.summary = payload.summary;
        state.data = payload.data;
        state.pagesCount = totalPages;
        state.totalCount = payload.count;
      })
      .addCase(getFinanceRequests.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getFinanceReports.pending, (state) => {
        state.reportsLoading = true;
        state.error = null;
      })
      .addCase(getFinanceReports.fulfilled, (state, { payload, meta }) => {
        const limit = meta.arg.limit || 10;
        const totalPages = Math.ceil(payload.count / limit);
        if (state.reportsCurrentPage > totalPages) {
          state.reportsCurrentPage = totalPages <= 1 ? 1 : totalPages;
        }
        state.reportsLoading = false;
        state.error = null;
        state.summaryReports = payload.summary;
        state.reportsData = payload.data;
        state.reportsCount = payload.count;
        state.reportsPagesCount = totalPages;
      })
      .addCase(getFinanceReports.rejected, (state, { payload }) => {
        state.reportsLoading = false;
        state.error = payload;
      })
      .addCase(getFinanceRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFinanceRequestById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.selectedRequest = payload;
      })
      .addCase(getFinanceRequestById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getFinanceReportById.pending, (state) => {
        state.selectedReportLoading = true;
        state.error = null;
      })
      .addCase(getFinanceReportById.fulfilled, (state, { payload }) => {
        state.selectedReportLoading = false;
        state.error = null;
        state.selectedReport = payload;
      })
      .addCase(getFinanceReportById.rejected, (state, { payload }) => {
        state.selectedReportLoading = false;
        state.error = payload;
      })
      .addCase(createFinanceRequest.pending, (state) => {
        state.createLoading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createFinanceRequest.fulfilled, (state, { payload }) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.error = null;
        notifySuccess('Finance request created successfully');
      })
      .addCase(createFinanceRequest.rejected, (state, { payload }) => {
        state.createLoading = false;
        state.createSuccess = false;
        state.error = payload;
      })
      .addCase(updateFinanceRequest.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = false;
        state.error = null;
      })
      .addCase(updateFinanceRequest.fulfilled, (state, { payload }) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.error = null;
        notifySuccess('Finance request updated successfully');
      })
      .addCase(updateFinanceRequest.rejected, (state, { payload }) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.error = payload;
      })
      .addCase(deleteFinanceRequest.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteFinanceRequest.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.error = null;
        notifySuccess('Finance request deleted successfully');
      })
      .addCase(deleteFinanceRequest.rejected, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteSuccess = false;
        state.error = payload;
      })
      .addCase(getFinanceRequestHistory.pending, (state) => {
        state.historyLoading = true;
        state.error = null;
      })
      .addCase(getFinanceRequestHistory.fulfilled, (state, { payload }) => {
        state.historyLoading = false;
        state.error = null;
        state.historyData = payload.history || [];
      })
      .addCase(getFinanceRequestHistory.rejected, (state, { payload }) => {
        state.historyLoading = false;
        state.error = payload;
      })
      .addCase(getFinanceRequestStatusHistory.pending, (state) => {
        state.statusHistoryLoading = true;
        state.error = null;
      })
      .addCase(getFinanceRequestStatusHistory.fulfilled, (state, { payload }) => {
        state.statusHistoryLoading = false;
        state.error = null;
        state.statusHistoryData = payload.statusHistory || [];
      })
      .addCase(getFinanceRequestStatusHistory.rejected, (state, { payload }) => {
        state.statusHistoryLoading = false;
        state.error = payload;
      })
      .addCase(markFinanceRequestAsDone.pending, (state) => {
        state.markAsDoneLoading = true;
        state.markAsDoneSuccess = false;
        state.error = null;
      })
      .addCase(markFinanceRequestAsDone.fulfilled, (state, { payload }) => {
        state.markAsDoneLoading = false;
        state.markAsDoneSuccess = true;
        state.error = null;
        notifySuccess('Finance request marked as done successfully');
      })
      .addCase(markFinanceRequestAsDone.rejected, (state, { payload }) => {
        state.markAsDoneLoading = false;
        state.markAsDoneSuccess = false;
        state.error = payload;
      })
      .addCase(rejectFinanceRequest.pending, (state) => {
        state.rejectLoading = true;
        state.rejectSuccess = false;
        state.error = null;
      })
      .addCase(rejectFinanceRequest.fulfilled, (state, { payload }) => {
        state.rejectLoading = false;
        state.rejectSuccess = true;
        state.error = null;
        notifySuccess('Finance request rejected successfully');
      })
      .addCase(rejectFinanceRequest.rejected, (state, { payload }) => {
        state.rejectLoading = false;
        state.rejectSuccess = false;
        state.error = payload;
      })
      .addCase(approveFinanceRequest.pending, (state) => {
        state.approveLoading = true;
        state.approveSuccess = false;
        state.error = null;
      })
      .addCase(approveFinanceRequest.fulfilled, (state, { payload }) => {
        state.approveLoading = false;
        state.approveSuccess = true;
        state.error = null;
        notifySuccess('Finance request approved successfully');
      })
      .addCase(approveFinanceRequest.rejected, (state, { payload }) => {
        state.approveLoading = false;
        state.approveSuccess = false;
        state.error = payload;
      })
      .addCase(markFinanceRequestAsSeen.pending, (state) => {
        state.markAsSeenLoading = true;
        state.markAsSeenSuccess = false;
        state.error = null;
      })
      .addCase(markFinanceRequestAsSeen.fulfilled, (state, { payload }) => {
        state.markAsSeenLoading = false;
        state.markAsSeenSuccess = true;
        state.error = null;
        notifySuccess('Finance request marked as seen successfully');
      })
      .addCase(markFinanceRequestAsSeen.rejected, (state, { payload }) => {
        state.markAsSeenLoading = false;
        state.markAsSeenSuccess = false;
        state.error = payload;
      })
      .addCase(bulkApproveFinanceRequests.pending, (state) => {
        state.bulkApproveLoading = true;
        state.bulkApproveSuccess = false;
        state.error = null;
      })
      .addCase(bulkApproveFinanceRequests.fulfilled, (state, { payload }) => {
        state.bulkApproveLoading = false;
        state.bulkApproveSuccess = true;
        state.error = null;
        notifySuccess('Finance requests approved successfully');
      })
      .addCase(bulkApproveFinanceRequests.rejected, (state, { payload }) => {
        state.bulkApproveLoading = false;
        state.bulkApproveSuccess = false;
        state.error = payload;
      })
      .addCase(bulkRejectFinanceRequests.pending, (state) => {
        state.bulkRejectLoading = true;
        state.bulkRejectSuccess = false;
        state.error = null;
      })
      .addCase(bulkRejectFinanceRequests.fulfilled, (state, { payload }) => {
        state.bulkRejectLoading = false;
        state.bulkRejectSuccess = true;
        state.error = null;
        notifySuccess('Finance requests rejected successfully');
      })
      .addCase(bulkRejectFinanceRequests.rejected, (state, { payload }) => {
        state.bulkRejectLoading = false;
        state.bulkRejectSuccess = false;
        state.error = payload;
      })
      .addCase(getAccountingTypeChart.pending, (state) => {
        state.accountingTypeChartLoading = true;
        state.error = null;
      })
      .addCase(getAccountingTypeChart.fulfilled, (state, { payload }) => {
        state.accountingTypeChartLoading = false;
        state.error = null;
        state.accountingTypeChartData = payload;
      })
      .addCase(getAccountingTypeChart.rejected, (state, { payload }) => {
        state.accountingTypeChartLoading = false;
        state.error = payload;
      })
      .addCase(getAmountAnalysisChart.pending, (state) => {
        state.amountAnalysisLoading = true;
        state.error = null;
      })
      .addCase(getAmountAnalysisChart.fulfilled, (state, { payload }) => {
        state.amountAnalysisLoading = false;
        state.error = null;
        state.amountAnalysisData = payload;
      })
      .addCase(getAmountAnalysisChart.rejected, (state, { payload }) => {
        state.amountAnalysisLoading = false;
        state.error = payload;
      })
      .addCase(getTopDepartmentsChart.pending, (state) => {
        state.topDepartmentsLoading = true;
        state.error = null;
      })
      .addCase(getTopDepartmentsChart.fulfilled, (state, { payload }) => {
        state.topDepartmentsLoading = false;
        state.error = null;
        state.topDepartmentsData = payload;
      })
      .addCase(getTopDepartmentsChart.rejected, (state, { payload }) => {
        state.topDepartmentsLoading = false;
        state.error = payload;
      })
      .addCase(getCostRatioChart.pending, (state) => {
        state.costRatioLoading = true;
        state.error = null;
      })
      .addCase(getCostRatioChart.fulfilled, (state, { payload }) => {
        state.costRatioLoading = false;
        state.error = null;
        state.costRatioData = payload;
      })
      .addCase(getCostRatioChart.rejected, (state, { payload }) => {
        state.costRatioLoading = false;
        state.error = payload;
      })
      .addCase(bulkMarkAsSeenFinanceRequests.pending, (state) => {
        state.bulkMarkAsSeenLoading = true;
        state.bulkMarkAsSeenSuccess = false;
        state.error = null;
      })
      .addCase(bulkMarkAsSeenFinanceRequests.fulfilled, (state, { payload }) => {
        state.bulkMarkAsSeenLoading = false;
        state.bulkMarkAsSeenSuccess = true;
        state.error = null;
        notifySuccess('Finance requests marked as seen successfully');
      })
      .addCase(bulkMarkAsSeenFinanceRequests.rejected, (state, { payload }) => {
        state.bulkMarkAsSeenLoading = false;
        state.bulkMarkAsSeenSuccess = false;
        state.error = payload;
      });
  },
});

export const {
  setShowFilters,
  setFinanceRequestSearchData,
  setCurrentPage,
  setSelectedRequest,
  resetFinanceRequestSuccess,
  setCreateSuccess,
  setUpdateSuccess,
  setDeleteSuccess,
  setRejectSuccess,
  setApproveSuccess,
  setMarkAsDoneSuccess,
  setMarkAsSeenSuccess,
  setBulkApproveSuccess,
  setBulkRejectSuccess,
  setBulkMarkAsSeenSuccess,
  setReportsCurrentPage,
} = financeRequestSlice.actions;

export const selectFinanceRequestLoading = (state) => state.financeRequest.loading;
export const selectFinanceRequestError = (state) => state.financeRequest.error;
export const selectFinanceRequests = (state) => state.financeRequest.data;
export const selectFinanceRequestsCount = (state) => state.financeRequest.requestsCount;
export const selectFinanceRequestPagesCount = (state) => state.financeRequest.pagesCount;
export const selectFinanceTotalCount = (state) => state.financeRequest.totalCount;
export const selectFinanceRequestSuccess = (state) => state.financeRequest.success;
export const selectFinanceRequestShowFilters = (state) => state.financeRequest.showFilters;
export const selectFinanceRequestCurrentPage = (state) => state.financeRequest.currentPage;
export const selectSelectedFinanceRequest = (state) => state.financeRequest.selectedRequest;
export const selectFinanceRequestCreateLoading = (state) => state.financeRequest.createLoading;
export const selectFinanceRequestCreateSuccess = (state) => state.financeRequest.createSuccess;
export const selectFinanceRequestUpdateLoading = (state) => state.financeRequest.updateLoading;
export const selectFinanceRequestUpdateSuccess = (state) => state.financeRequest.updateSuccess;
export const selectFinanceRequestDeleteLoading = (state) => state.financeRequest.deleteLoading;
export const selectFinanceRequestDeleteSuccess = (state) => state.financeRequest.deleteSuccess;
export const selectFinanceRequestRejectLoading = (state) => state.financeRequest.rejectLoading;
export const selectFinanceRequestRejectSuccess = (state) => state.financeRequest.rejectSuccess;
export const selectFinanceRequestApproveLoading = (state) =>
  state.financeRequest.approveLoading;
export const selectFinanceRequestApproveSuccess = (state) =>
  state.financeRequest.approveSuccess;
export const selectFinanceRequestHistoryLoading = (state) =>
  state.financeRequest.historyLoading;
export const selectFinanceRequestHistory = (state) => state.financeRequest.historyData;
export const selectFinanceRequestStatusHistoryLoading = (state) =>
  state.financeRequest.statusHistoryLoading;
export const selectFinanceRequestStatusHistory = (state) =>
  state.financeRequest.statusHistoryData;
export const selectFinanceRequestMarkAsDoneLoading = (state) =>
  state.financeRequest.markAsDoneLoading;
export const selectFinanceRequestMarkAsDoneSuccess = (state) =>
  state.financeRequest.markAsDoneSuccess;
export const selectFinanceRequestMarkAsSeenLoading = (state) =>
  state.financeRequest.markAsSeenLoading;
export const selectFinanceRequestMarkAsSeenSuccess = (state) =>
  state.financeRequest.markAsSeenSuccess;
export const selectFinanceRequestBulkApproveLoading = (state) =>
  state.financeRequest.bulkApproveLoading;
export const selectFinanceRequestBulkApproveSuccess = (state) =>
  state.financeRequest.bulkApproveSuccess;
export const selectFinanceRequestBulkRejectLoading = (state) =>
  state.financeRequest.bulkRejectLoading;
export const selectFinanceRequestBulkRejectSuccess = (state) =>
  state.financeRequest.bulkRejectSuccess;
export const selectFinanceRequestBulkMarkAsSeenLoading = (state) =>
  state.financeRequest.bulkMarkAsSeenLoading;
export const selectFinanceRequestBulkMarkAsSeenSuccess = (state) =>
  state.financeRequest.bulkMarkAsSeenSuccess;
export const selectSummary = (state) => state.financeRequest.summary;
export const selectReportsData = (state) => state.financeRequest.reportsData;
export const selectReportsLoading = (state) => state.financeRequest.reportsLoading;
export const selectReportsSummary = (state) => state.financeRequest.summaryReports;
export const selectReportsCount = (state) => state.financeRequest.reportsCount;
export const selectReportsPagesCount = (state) => state.financeRequest.reportsPagesCount;
export const selectReportsCurrentPage = (state) => state.financeRequest.reportsCurrentPage;
export const selectAccountingTypeChartData = (state) =>
  state.financeRequest.accountingTypeChartData;
export const selectAccountingTypeChartLoading = (state) =>
  state.financeRequest.accountingTypeChartLoading;
export const selectAmountAnalysisData = (state) => state.financeRequest.amountAnalysisData;
export const selectAmountAnalysisLoading = (state) =>
  state.financeRequest.amountAnalysisLoading;
export const selectTopDepartmentsData = (state) => state.financeRequest.topDepartmentsData;
export const selectTopDepartmentsLoading = (state) =>
  state.financeRequest.topDepartmentsLoading;
export const selectCostRatioData = (state) => state.financeRequest.costRatioData;
export const selectCostRatioLoading = (state) => state.financeRequest.costRatioLoading;
export const selectSelectedFinanceReport = (state) => state.financeRequest.selectedReport;
export const selectSelectedFinanceReportLoading = (state) =>
  state.financeRequest.selectedReportLoading;

export default financeRequestSlice.reducer;
