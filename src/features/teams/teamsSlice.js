import { createSlice } from '@reduxjs/toolkit';

import {
  createTeam,
  deleteTeam,
  enableTeam,
  getHeads,
  getTeams,
  updateTeams,
} from './teamsActions';

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
  deletedTeam: '',
  enabledTeam: '',
  createdTeamName: '',
  teamId: null,
  pagesCount: 1,
  deleteSuccess: false,
  enableSuccess: false,
  updateSuccess: false,
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setCreateTeamStateStatus: (state, { payload }) => {
      state.success = payload;
    },
    setCreatedTeamName: (state, { payload }) => {
      state.createdTeamName = payload;
    },
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },
    setTeamSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setDeletedTeamSuccess: (state, { payload }) => {
      state.deleteSuccess = payload;
    },
    setEnabledTeamSuccess: (state, { payload }) => {
      state.enableSuccess = payload;
    },
    setTeamId: (state, { payload }) => {
      state.teamId = payload;
    },
    setDeletedTeam: (state, { payload }) => {
      state.deletedTeam = payload;
    },
    setEnabledTeam: (state, { payload }) => {
      state.enabledTeam = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeams.fulfilled, (state, { payload }) => {
        if (state.currentPage > Math.ceil(payload.count / 10)) {
          state.currentPage = Math.ceil(payload.count / 10);
        }
        state.loading = false;
        state.error = null;
        state.data = payload.teams;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getTeams.rejected, (state, { payload }) => {
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
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.data.push(payload);
      })
      .addCase(createTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.enableSuccess = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(enableTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enableTeam.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.deleteSuccess = false;
        state.enableSuccess = true;
      })
      .addCase(enableTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateTeams.fulfilled, (state) => {
        state.loading = false;
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(updateTeams.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.updateSuccess = false;
      });
  },
});

export const {
  setCreateTeamStateStatus,
  setShowFilters,
  setTeamSearchData,
  setDisableTeam,
  setEnableTeam,
  setCurrentPage,
  setTeamId,
  setDeletedTeam,
  setDeletedSuccess,
  setEnabledTeam,
  setDeletedTeamSuccess,
  setEnabledTeamSuccess,
  setCreatedTeamName,
} = teamsSlice.actions;

export const selectLoading = (state) => state.teams.loading;
export const selectError = (state) => state.teams.error;
export const selectTeams = (state) => state.teams.data;
export const selectHeads = (state) => state.teams.heads;
export const selectCreateTeamSuccess = (state) => state.teams.success;
export const selectShowFilters = (state) => state.teams.showFilters;
export const selectTeamsSearchData = (state) => state.teams.searchData;
export const selectCurrentPage = (state) => state.teams.currentPage;
export const selectTeamId = (state) => state.teams.teamId;
export const selectDeletedTeam = (state) => state.teams.deletedTeam;
export const selectEnabledTeam = (state) => state.teams.enabledTeam;
export const selectPagesCount = (state) => state.teams.pagesCount;
export const selectEnableSuccess = (state) => state.teams.enableSuccess;
export const selectDisable = (state) => state.teams.deleteSuccess;
export const selectUpdateSuccess = (state) => state.teams.updateSuccess;
export const selectCreatedTeamName = (state) => state.teams.createdTeamName;

export default teamsSlice.reducer;
