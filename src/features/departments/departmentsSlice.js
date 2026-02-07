import { createSlice } from '@reduxjs/toolkit';

import {
  createDepartment,
  deleteDepartment,
  enableDepartment,
  getDepartments,
  getHeads,
  getSingleDepartment,
  updateDepartments,
} from './departmentsActions';

const initialState = {
  loading: false,
  error: null,
  data: null,
  heads: [],
  success: false,
  deleteSuccess: false,
  enableSuccess: false,
  updateSuccess: false,
  showFilters: false,
  depId: null,
  searchData: {
    limit: 10,
    offset: 0,
  },
  currentPage: 1,
  pagesCount: 0,
  deletedDep: '',
  enabledDep: '',
  uuidDepName: '',
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setCreateDepartmentStateStatus: (state, { payload }) => {
      state.success = payload;
    },
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },
    setDepartmentSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setDepId: (state, { payload }) => {
      state.depId = payload;
    },
    setDeletedDep: (state, { payload }) => {
      state.deletedDep = payload;
    },
    setEnabledDep: (state, { payload }) => {
      state.enabledDep = payload;
    },
    setDeletedDepartmentSuccess: (state, { payload }) => {
      state.deleteSuccess = payload;
    },
    setEnabledDepartmentSuccess: (state, { payload }) => {
      state.enableSuccess = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, { payload }) => {
        if (state.currentPage > Math.ceil(payload.count / 10)) {
          state.currentPage =
            Math.ceil(payload.count / 10) <= 1 ? 1 : Math.ceil(payload.count / 10);
        }

        state.loading = false;
        state.error = null;
        state.data = payload.departments;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getDepartments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getHeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHeads.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.heads = payload;
      })
      .addCase(getHeads.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getSingleDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDepartment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.uuidDepName = payload.name;
        state.error = null;
      })
      .addCase(getSingleDepartment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data.push(payload);
      })
      .addCase(createDepartment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.enableSuccess = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteDepartment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(enableDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enableDepartment.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.deleteSuccess = false;
        state.enableSuccess = true;
      })
      .addCase(enableDepartment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateDepartments.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(updateDepartments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.updateSuccess = false;
      });
  },
});

export const {
  setCreateDepartmentStateStatus,
  setShowFilters,
  setDepartmentSearchData,
  setDisableDepartment,
  setEnableDepartment,
  setCurrentPage,
  setDepId,
  setDeletedDep,
  setDeletedDepartmentSuccess,
  setEnabledDep,
  setEnabledDepartmentSuccess,
} = departmentsSlice.actions;

export const selectLoading = (state) => state.departments.loading;
export const selectError = (state) => state.departments.error;
export const selectDepartments = (state) => state.departments.data;
export const selectHeads = (state) => state.departments.heads;
export const selectCreateUserSuccess = (state) => state.departments.success;
export const selectShowFilters = (state) => state.departments.showFilters;
export const selectDepartmentsSearchData = (state) => state.departments.searchData;
export const selectDisable = (state) => state.departments.deleteSuccess;
export const selectEnableSuccess = (state) => state.departments.enableSuccess;
export const selectCurrentPage = (state) => state.departments.currentPage;
export const selectDepId = (state) => state.departments.depId;
export const selectDeletedDep = (state) => state.departments.deletedDep;
export const selectEnabledDep = (state) => state.departments.enabledDep;
export const selectPagesCount = (state) => state.departments.pagesCount;
export const selectSingleDepName = (state) => state.departments.uuidDepName;
export const selectUpdateSuccess = (state) => state.departments.updateSuccess;

export default departmentsSlice.reducer;
