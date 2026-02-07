import { createSlice } from '@reduxjs/toolkit';

import { notifySuccess } from 'utils/notifyConfig';

import {
  assignUserPrivilege,
  createSuperUser,
  createUser,
  deleteUsers,
  enableUsers,
  getAvailablePrivileges,
  getFilterRoles,
  getRoles,
  getUserPrivileges,
  getUsers,
  promoteUser,
  updateUserPrivilege,
} from './usersActions';

const initialState = {
  loading: false,
  error: null,
  data: null,
  roles: [],
  filterRoles: [],
  isInviteModalOpen: false,
  userInviteStep: 1,
  userInviteBody: {},
  success: false,
  showFilters: false,
  searchData: {
    limit: 10,
    offset: 0,
  },
  pagesCount: 0,
  currentPage: 1,
  isContactViewModalOpen: false,
  userId: null,
  disabledUser: '',
  enabledUser: '',
  deleteSuccess: false,
  enableSuccess: false,
  promoteLoading: false,
  promoteSuccess: false,
  newInvitedEmail: '',
  // Privilege management
  userPrivileges: null,
  availablePrivileges: [],
  privilegeLoading: false,
  privilegeAssignLoading: false,
  privilegeAssignSuccess: false,
  privilegeUpdateLoading: false,
  privilegeUpdateSuccess: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserInviteStep: (state, { payload }) => {
      state.userInviteStep = payload;
    },
    setUserInviteBody: (state, { payload }) => {
      state.userInviteBody = payload;
    },
    setIsInviteModalOpen: (state, { payload }) => {
      state.isInviteModalOpen = payload;
    },
    setCreateUserStateStatus: (state, { payload }) => {
      state.success = payload;
    },
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },
    setUserSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setIsContactViewModalOpen: (state, { payload }) => {
      state.isContactViewModalOpen = payload;
    },
    setUserId: (state, { payload }) => {
      state.userId = payload;
    },
    setDisabledUser: (state, { payload }) => {
      state.disabledUser = payload;
    },
    setEnabledUser: (state, { payload }) => {
      state.enabledUser = payload;
    },
    resetUserSuccess: (state, { payload }) => {
      state.deleteSuccess = false;
      state.enableSuccess = false;
      state.success = false;
    },
    setEnableSuccess: (state, { payload }) => {
      state.enableSuccess = payload;
    },
    setDisableSuccess: (state, { payload }) => {
      state.deleteSuccess = payload;
    },
    resetPrivilegeSuccess: (state) => {
      state.privilegeAssignSuccess = false;
      state.privilegeUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        if (state.currentPage > Math.ceil(payload.count / 10)) {
          state.currentPage =
            Math.ceil(payload.count / 10) <= 1 ? 1 : Math.ceil(payload.count / 10);
        }
        state.loading = false;
        state.error = null;
        state.data = payload.users;
        state.usersCount = payload.count;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.roles = payload;
      })
      .addCase(getRoles.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getFilterRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilterRoles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.filterRoles = payload;
      })
      .addCase(getFilterRoles.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.newInvitedEmail = payload.email;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createSuperUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSuperUser.fulfilled, (state, { payload }) => {
        state.newInvitedEmail = payload.email;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createSuperUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUsers.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.enableSuccess = false;
        state.deleteSuccess = true;
      })
      .addCase(deleteUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(enableUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enableUsers.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.deleteSuccess = false;
        state.enableSuccess = true;
      })
      .addCase(enableUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(promoteUser.pending, (state) => {
        state.promoteLoading = true;
        state.promoteSuccess = false;
        state.error = null;
      })
      .addCase(promoteUser.fulfilled, (state) => {
        state.promoteLoading = false;
        state.promoteSuccess = true;
        notifySuccess('User successfully promoted to Team Lead');
        state.error = null;
      })
      .addCase(promoteUser.rejected, (state, { payload }) => {
        state.promoteLoading = false;
        state.promoteSuccess = false;
        state.error = payload;
      })
      // User Privileges
      .addCase(getUserPrivileges.pending, (state) => {
        state.privilegeLoading = true;
        state.error = null;
      })
      .addCase(getUserPrivileges.fulfilled, (state, { payload }) => {
        state.privilegeLoading = false;
        state.userPrivileges = payload;
        state.error = null;
      })
      .addCase(getUserPrivileges.rejected, (state, { payload }) => {
        state.privilegeLoading = false;
        state.error = payload;
      })
      // Available Privileges
      .addCase(getAvailablePrivileges.pending, (state) => {
        state.privilegeLoading = true;
        state.error = null;
      })
      .addCase(getAvailablePrivileges.fulfilled, (state, { payload }) => {
        state.privilegeLoading = false;
        state.availablePrivileges = payload;
        state.error = null;
      })
      .addCase(getAvailablePrivileges.rejected, (state, { payload }) => {
        state.privilegeLoading = false;
        state.error = payload;
      })
      // Assign Privilege
      .addCase(assignUserPrivilege.pending, (state) => {
        state.privilegeAssignLoading = true;
        state.privilegeAssignSuccess = false;
        state.error = null;
      })
      .addCase(assignUserPrivilege.fulfilled, (state) => {
        state.privilegeAssignLoading = false;
        state.privilegeAssignSuccess = true;
        state.error = null;
        notifySuccess('Privilege assigned successfully');
      })
      .addCase(assignUserPrivilege.rejected, (state, { payload }) => {
        state.privilegeAssignLoading = false;
        state.privilegeAssignSuccess = false;
        state.error = payload;
      })
      // Update Privilege
      .addCase(updateUserPrivilege.pending, (state) => {
        state.privilegeUpdateLoading = true;
        state.privilegeUpdateSuccess = false;
        state.error = null;
      })
      .addCase(updateUserPrivilege.fulfilled, (state) => {
        state.privilegeUpdateLoading = false;
        state.privilegeUpdateSuccess = true;
        state.error = null;
        notifySuccess('Privilege updated successfully');
      })
      .addCase(updateUserPrivilege.rejected, (state, { payload }) => {
        state.privilegeUpdateLoading = false;
        state.privilegeUpdateSuccess = false;
        state.error = payload;
      });
  },
});

export const {
  setUserInviteStep,
  setUserInviteBody,
  setIsInviteModalOpen,
  setCreateUserStateStatus,
  setShowFilters,
  setUserSearchData,
  setCurrentPage,
  setIsContactViewModalOpen,
  setUserId,
  setDisabledUser,
  setEnabledUser,
  resetUserSuccess,
  setEnableSuccess,
  setDisableSuccess,
  resetPrivilegeSuccess,
} = usersSlice.actions;

export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectUsers = (state) => state.users.data;
export const selectUsersCount = (state) => state.users.usersCount;
export const selectPagesCount = (state) => state.users.pagesCount;
export const selectRoles = (state) => state.users.roles;
export const selectFilterRoles = (state) => state.users.filterRoles;
export const selectUserInviteStep = (state) => state.users.userInviteStep;
export const selectUserInviteBody = (state) => state.users.userInviteBody;
export const selectIsInviteModalOpen = (state) => state.users.isInviteModalOpen;
export const selectCreateUserSuccess = (state) => state.users.success;
export const selectShowFilters = (state) => state.users.showFilters;
export const selectUserSearchData = (state) => state.users.searchData;
export const selectCurrentPage = (state) => state.users.currentPage;
export const selectIsContactViewModalOpen = (state) => state.users.isContactViewModalOpen;
export const selectUserId = (state) => state.users.userId;
export const selectDisabledUser = (state) => state.users.disabledUser;
export const selectEnabledUser = (state) => state.users.enabledUser;
export const selectDisable = (state) => state.users.deleteSuccess;
export const selectEnableSuccess = (state) => state.users.enableSuccess;
export const selectPromoteLoading = (state) => state.users.promoteLoading;
export const selectPromoteSuccess = (state) => state.users.promoteSuccess;
export const selectNewInvitedEmail = (state) => state.users.newInvitedEmail;
// Privilege selectors
export const selectUserPrivileges = (state) => state.users.userPrivileges;
export const selectAvailablePrivileges = (state) => state.users.availablePrivileges;
export const selectPrivilegeLoading = (state) => state.users.privilegeLoading;
export const selectPrivilegeAssignLoading = (state) => state.users.privilegeAssignLoading;
export const selectPrivilegeAssignSuccess = (state) => state.users.privilegeAssignSuccess;
export const selectPrivilegeUpdateLoading = (state) => state.users.privilegeUpdateLoading;
export const selectPrivilegeUpdateSuccess = (state) => state.users.privilegeUpdateSuccess;

export default usersSlice.reducer;
