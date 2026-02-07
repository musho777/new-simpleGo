import { createSlice } from '@reduxjs/toolkit';

import {
  dismissNotification,
  getNotifications,
  readNotification,
} from './notificationsActions';

const initialState = {
  loading: {
    notifications: false,
  },
  success: {
    notifications: false,
    dismiss: false,
    read: false,
  },
  error: null,
  count: 0,
  data: [],
  heads: [],
  activeNotifications: ['all'],
  showFilters: false,
  searchData: {
    limit: 10,
    offset: 0,
  },
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },
    setNotificationsSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setActiveNotifications: (state, { payload }) => {
      state.activeNotifications = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading.notifications = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, { payload }) => {
        state.loading.notifications = false;
        state.error = null;
        state.data = payload.notifications;
        state.count = payload.newCount;
      })
      .addCase(getNotifications.rejected, (state, { payload }) => {
        state.loading.notifications = false;
        state.error = payload;
      })
      .addCase(readNotification.pending, (state) => {
        state.error = null;
        state.loading.read = true;
        state.success.read = false;
      })
      .addCase(readNotification.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading.read = false;

        if (payload.all) {
          state.data = state.data.map((notification) => ({
            ...notification,
            read: true,
          }));
        } else {
          const notificationIndex = state.data.findIndex(
            (notification) => notification.uuid === payload.notificationId
          );

          if (notificationIndex !== -1) {
            state.data[notificationIndex].read = true;
          }
        }
      })
      .addCase(readNotification.rejected, (state, { payload }) => {
        state.loading.read = false;
        state.success.read = false;
        state.error = payload;
      })
      .addCase(dismissNotification.pending, (state) => {
        state.loading.dismiss = true;
        state.success.dismiss = false;
        state.error = null;
      })
      .addCase(dismissNotification.fulfilled, (state, { payload }) => {
        state.loading.dismiss = false;
        state.success.dismiss = true;
        state.error = null;

        state.data = state.data.filter((notification) => notification.uuid !== payload);
      })
      .addCase(dismissNotification.rejected, (state, { payload }) => {
        state.loading.dismiss = false;
        state.success.dismiss = false;
        state.error = payload;
      });
  },
});

export const { setShowFilters, setNotificationsSearchData, setActiveNotifications } =
  notificationsSlice.actions;

export const selectLoading = (state) => state.notifications.loading;
export const selectError = (state) => state.notifications.error;
export const selectSuccess = (state) => state.notifications.success;
export const selectNotifications = (state) => state.notifications.data;
export const selectShowFilters = (state) => state.notifications.showFilters;
export const selectNotificationsSearchData = (state) => state.notifications.searchData;
export const selectNewCount = (state) => state.notifications.count;
export const selectActiveNotifications = (state) => state.notifications.activeNotifications;

export default notificationsSlice.reducer;
