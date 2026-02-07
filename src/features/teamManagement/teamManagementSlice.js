import { createSlice } from '@reduxjs/toolkit';

import {
  createTeam,
  editTeam,
  getAttachedMembers,
  getLeads,
  getTeamMembers,
  getTeams,
  memberAssignToTeam,
  memberDeleteFromTeam,
} from './teamManagementActions';

const initialState = {
  loading: {
    teams: false,
    leads: false,
    members: false,
    attachedMembers: false,
    memberDeleteFromTeam: false,
    memberAssignToTeam: false,
  },
  success: null,
  error: null,
  leads: [],
  teams: [],
  members: [],
  attachedMembers: [],
  searchData: {
    limit: 10,
    offset: 0,
    name: '',
    disabled: false,
  },
  currentPage: 1,
  pagesCount: 0,
};

const teamManagementSlice = createSlice({
  name: 'teamManagement',
  initialState,
  reducers: {
    setTeamManagementSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    resetTeamsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get leads
      .addCase(getLeads.pending, (state) => {
        state.loading.leads = true;
        state.error = null;
      })
      .addCase(getLeads.fulfilled, (state, { payload }) => {
        state.loading.leads = false;
        state.leads = payload;
      })
      .addCase(getLeads.rejected, (state, { payload }) => {
        state.loading.leads = false;
        state.error = payload;
      })

      // Get team members
      .addCase(getTeamMembers.pending, (state) => {
        state.loading.members = true;
        state.error = null;
      })
      .addCase(getTeamMembers.fulfilled, (state, { payload }) => {
        state.loading.members = false;
        state.members = payload;
      })
      .addCase(getTeamMembers.rejected, (state, { payload }) => {
        state.loading.members = false;
        state.error = payload;
      })

      // Get team members to attach
      .addCase(getAttachedMembers.pending, (state) => {
        state.loading.attachedMembers = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAttachedMembers.fulfilled, (state, { payload }) => {
        state.success = false;
        state.loading.attachedMembers = false;
        state.attachedMembers = payload;
      })
      .addCase(getAttachedMembers.rejected, (state, { payload }) => {
        state.loading.attachedMembers = false;
        state.success = false;
        state.error = payload;
      })

      // Get teams
      .addCase(getTeams.pending, (state) => {
        state.loading.teams = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getTeams.fulfilled, (state, { payload }) => {
        if (state.currentPage > Math.ceil(payload.count / 10)) {
          state.currentPage =
            Math.ceil(payload.count / 10) <= 1 ? 1 : Math.ceil(payload.count / 10);
        }
        state.success = false;
        state.loading.teams = false;
        state.teams = payload?.teams;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getTeams.rejected, (state, { payload }) => {
        state.loading.teams = false;
        state.success = false;
        state.error = payload;
      })

      // Create team
      .addCase(createTeam.pending, (state) => {
        state.loading.teams = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state) => {
        state.loading.teams = false;
        state.success = true;
      })
      .addCase(createTeam.rejected, (state, { payload }) => {
        state.loading.teams = false;
        state.success = false;
        state.error = payload;
      })

      // Edit team
      .addCase(editTeam.pending, (state) => {
        state.loading.teams = true;
        state.success = false;
        state.error = null;
      })
      .addCase(editTeam.fulfilled, (state) => {
        state.loading.teams = false;
        state.success = true;
      })
      .addCase(editTeam.rejected, (state, { payload }) => {
        state.loading.teams = false;
        state.success = false;
        state.error = payload;
      })

      // Assign team member
      .addCase(memberAssignToTeam.pending, (state) => {
        state.loading.memberAssignToTeam = true;
        state.success = false;
        state.error = null;
      })
      .addCase(memberAssignToTeam.fulfilled, (state) => {
        state.loading.memberAssignToTeam = false;
        state.success = true;
      })
      .addCase(memberAssignToTeam.rejected, (state, { payload }) => {
        state.loading.memberAssignToTeam = false;
        state.success = false;
        state.error = payload;
      })

      // Remove team member
      .addCase(memberDeleteFromTeam.pending, (state) => {
        state.loading.memberDeleteFromTeam = true;
        state.success = false;
        state.error = null;
      })
      .addCase(memberDeleteFromTeam.fulfilled, (state) => {
        state.loading.memberDeleteFromTeam = false;
        state.success = true;
      })
      .addCase(memberDeleteFromTeam.rejected, (state, { payload }) => {
        state.loading.memberDeleteFromTeam = false;
        state.success = false;
        state.error = payload;
      });
  },
});

export const { setTeamManagementSearchData, setCurrentPage, resetTeamsState } =
  teamManagementSlice.actions;

export const selectLoading = (state) => state.teamManagement.loading;
export const selectSuccess = (state) => state.teamManagement.success;
export const selectLeads = (state) => state.teamManagement.leads;
export const selectTeams = (state) => state.teamManagement.teams;
export const selectTeamMembers = (state) => state.teamManagement.members;
export const selectAttachedTeamMembers = (state) => state.teamManagement.attachedMembers;
export const selectCurrentPage = (state) => state.teamManagement.currentPage;
export const selectPagesCount = (state) => state.teamManagement.pagesCount;
export const selectTeamManagementSearchData = (state) => state.teamManagement.searchData;

export default teamManagementSlice.reducer;
