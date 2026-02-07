import { createSlice } from '@reduxjs/toolkit';

import {
  createBranch,
  deleteBranch,
  enableBranch,
  getBranches,
  getHeads,
  getSingleBranch,
  updateBranches,
} from './branchesActions';

const initialState = {
  loading: false,
  error: null,
  success: false,
  data: null,
  heads: [],
  showFilters: false,
  searchData: {
    limit: 10,
    offset: 0,
  },
  currentPage: 1,
  deletedBranch: '',
  enabledBranch: '',
  branchId: null,
  pagesCount: 1,
  deleteSuccess: false,
  enableSuccess: false,
  newBranchDepId: null,
  uuidBranchName: '',
  updateSuccess: false,
};

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    setCreateBranchStateStatus: (state, { payload }) => {
      state.success = payload;
    },
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },
    setBranchSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setDeletedBranch: (state, { payload }) => {
      state.deletedBranch = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setDeletedBranchSuccess: (state, { payload }) => {
      state.deleteSuccess = payload;
    },
    setEnabledBranchSuccess: (state, { payload }) => {
      state.enableSuccess = payload;
    },
    setBranchId: (state, { payload }) => {
      state.branchId = payload;
    },
    setEnabledBranch: (state, { payload }) => {
      state.enabledBranch = payload;
    },
    setNewBranchDepId: (state, { payload }) => {
      state.newBranchDepId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBranches.fulfilled, (state, { payload }) => {
        if (state.currentPage > Math.ceil(payload.count / 10)) {
          state.currentPage =
            Math.ceil(payload.count / 10) <= 1 ? 1 : Math.ceil(payload.count / 10);
        }
        state.loading = false;
        state.error = null;
        state.data = payload.branches;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getBranches.rejected, (state, { payload }) => {
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
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.data.push(payload);
      })
      .addCase(createBranch.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.enableSuccess = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteBranch.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(enableBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enableBranch.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.deleteSuccess = false;
        state.enableSuccess = true;
      })
      .addCase(enableBranch.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getSingleBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleBranch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.uuidBranchName = payload?.name;
      })
      .addCase(getSingleBranch.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateBranches.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(updateBranches.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.updateSuccess = false;
      });
  },
});

export const {
  setCreateBranchStateStatus,
  setShowFilters,
  setBranchSearchData,
  setDisableBranch,
  setEnableBranch,
  setCurrentPage,
  setBranchId,
  setDeletedBranch,
  setDeletedBranchSuccess,
  setEnabledBranchSuccess,
  setEnabledBranch,
  setNewBranchDepId,
} = branchesSlice.actions;

export const selectLoading = (state) => state.branches.loading;
export const selectError = (state) => state.branches.error;
export const selectBranches = (state) => state.branches.data;
export const selectHeads = (state) => state.branches.heads;
export const selectCreateBranchSuccess = (state) => state.branches.success;
export const selectShowFilters = (state) => state.branches.showFilters;
export const selectBranchesSearchData = (state) => state.branches.searchData;
export const selectCurrentPage = (state) => state.branches.currentPage;
export const selectBranchId = (state) => state.branches.branchId;
export const selectDeletedBranch = (state) => state.branches.deletedBranch;
export const selectEnabledBranch = (state) => state.branches.enabledBranch;
export const selectPagesCount = (state) => state.branches.pagesCount;
export const selectDisable = (state) => state.branches.deleteSuccess;
export const selectEnableSuccess = (state) => state.branches.enableSuccess;
export const selectUuidBranchName = (state) => state.branches.uuidBranchName;
export const selectUpdateSuccess = (state) => state.branches.updateSuccess;

export default branchesSlice.reducer;
