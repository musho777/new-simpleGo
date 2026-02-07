import { createSlice } from '@reduxjs/toolkit';

import { getEmployeePayrollData, getReport } from './reportsActions';

const initialState = {
  loading: {
    reports: false,
    employeePayroll: {},
  },
  success: false,
  reports: [],
  isPayrollViewModalOpen: false,
  employeePayroll: {},
  employeePayrollPagination: {},
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setIsPayrollViewModalOpen: (state, { payload }) => {
      state.isPayrollViewModalOpen = payload;
    },
    setEmployeePayrollPage: (state, { payload }) => {
      const { employeeId, page, limit } = payload;
      state.employeePayrollPagination[employeeId] = { page, limit };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReport.pending, (state) => {
        state.loading.reports = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getReport.fulfilled, (state, { payload }) => {
        state.reports = payload;
        state.loading.reports = false;
        state.error = null;
        state.success = true;
      })
      .addCase(getReport.rejected, (state, { payload }) => {
        state.loading.reports = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(getEmployeePayrollData.pending, (state, action) => {
        const employeeId = action.meta.arg.employeeId;
        state.loading.employeePayroll[employeeId] = true;
      })
      .addCase(getEmployeePayrollData.fulfilled, (state, { payload, meta }) => {
        const employeeId = meta.arg.employeeId;
        state.employeePayroll[employeeId] = payload;
        state.loading.employeePayroll[employeeId] = false;
      })
      .addCase(getEmployeePayrollData.rejected, (state, { payload, meta }) => {
        const employeeId = meta.arg.employeeId;
        state.loading.employeePayroll[employeeId] = false;
        state.error = payload;
      });
  },
});

export const { setIsPayrollViewModalOpen, setEmployeePayrollPage } = reportSlice.actions;

export const selectError = (state) => state.reports.error;
export const selectLoading = (state) => state.reports.loading;
export const selectSuccess = (state) => state.reports.success;
export const selectReports = (state) => state.reports.reports;
export const selectIsPayrollViewModalOpen = (state) => state.reports.isPayrollViewModalOpen;

export const selectEmployeePayrollByUUID = (state, employeeId) =>
  state.reports.employeePayroll[employeeId] || null;
export const selectEmployeePayrollLoading = (state, employeeId) =>
  state.reports.loading.employeePayroll[employeeId] || false;
export const selectEmployeePayrollPageByUUID = (state, employeeId) =>
  state.reports.employeePayrollPagination[employeeId]?.page || 1;

export default reportSlice.reducer;
