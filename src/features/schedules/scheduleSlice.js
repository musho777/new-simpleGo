import { createSlice } from '@reduxjs/toolkit';

import {
  createAttendance,
  createSchedule,
  deleteSchedule,
  editAttendance,
  editSchedule,
  getAttendance,
  getSchedule,
  getSchedules,
} from './scheduleActions';

const initialState = {
  loading: {
    schedules: false,
    attendance: false,
  },
  searchData: {
    limit: 12,
    offset: 0,
    name: '',
  },
  currentPage: 1,
  pagesCount: 1,
  error: null,
  success: false,
  schedules: [],
  schedule: {},
  districts: [],
  attendance: {},
};

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setSchedulesSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setResetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendance.pending, (state) => {
        state.loading.attendance = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAttendance.fulfilled, (state, { payload }) => {
        state.attendance = payload;
        state.loading.attendance = false;
        state.error = null;
        state.success = true;
      })
      .addCase(getAttendance.rejected, (state, { payload }) => {
        state.loading.attendance = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(createAttendance.pending, (state) => {
        state.loading.attendance = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAttendance.fulfilled, (state, { payload }) => {
        state.attendance = payload.attendance;
        state.loading.attendance = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createAttendance.rejected, (state, { payload }) => {
        state.loading.attendance = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(editAttendance.pending, (state) => {
        state.loading.attendance = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editAttendance.fulfilled, (state, { payload }) => {
        state.attendance = payload.attendance;
        state.loading.attendance = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editAttendance.rejected, (state, { payload }) => {
        state.loading.attendance = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(createSchedule.pending, (state) => {
        state.loading.schedules = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSchedule.fulfilled, (state, { payload }) => {
        state.loading.schedules = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createSchedule.rejected, (state, { payload }) => {
        state.loading.schedules = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(editSchedule.pending, (state) => {
        state.loading.schedules = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editSchedule.fulfilled, (state, { payload }) => {
        state.loading.schedules = false;
        state.error = null;
        state.success = true;
      })
      .addCase(editSchedule.rejected, (state, { payload }) => {
        state.loading.schedules = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(deleteSchedule.pending, (state) => {
        state.loading.schedules = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteSchedule.fulfilled, (state, { payload }) => {
        state.loading.schedules = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteSchedule.rejected, (state, { payload }) => {
        state.loading.schedules = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(getSchedules.pending, (state) => {
        state.loading.schedules = true;
        state.error = null;
      })
      .addCase(getSchedules.fulfilled, (state, { payload }) => {
        if (state.currentPage > Math.ceil(payload.count / 12)) {
          state.currentPage =
            Math.ceil(payload.count / 12) <= 1 ? 1 : Math.ceil(payload.count / 12);
        }
        state.pagesCount = Math.ceil(payload.count / 12);
        state.loading.schedules = false;
        state.error = null;
        state.schedules = payload.schedules;
      })
      .addCase(getSchedules.rejected, (state, { payload }) => {
        state.loading.schedules = false;
        state.error = payload;
      })
      .addCase(getSchedule.pending, (state) => {
        state.loading.schedule = true;
        state.error = null;
      })
      .addCase(getSchedule.fulfilled, (state, { payload }) => {
        state.loading.schedule = false;
        state.error = null;
        state.schedule = payload;
      })
      .addCase(getSchedule.rejected, (state, { payload }) => {
        state.loading.schedule = false;
        state.error = payload;
      });
  },
});

export const { setCurrentPage, setSchedulesSearchData, setResetSuccess } =
  scheduleSlice.actions;

export const selectError = (state) => state.schedules.error;
export const selectLoading = (state) => state.schedules.loading;
export const selectSuccess = (state) => state.schedules.success;
export const selectSchedules = (state) => state.schedules.schedules;
export const selectSearchData = (state) => state.schedules.searchData;
export const selectCurrentPage = (state) => state.schedules.currentPage;
export const selectPagesCount = (state) => state.schedules.pagesCount;
export const selectSchedule = (state) => state.schedules.schedule;
export const selectAttendance = (state) => state.schedules.attendance;

export default scheduleSlice.reducer;
