import { createSlice } from '@reduxjs/toolkit';

import { getDistricts, getRegions, getSubRegions } from './regionsActions';

// Import getSubRegions

const initialState = {
  loading: false,
  error: null,
  data: [],
  subRegions: null,
  districts: [],
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRegions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data = payload;
      })
      .addCase(getRegions.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getSubRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubRegions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.subRegions = payload;
      })
      .addCase(getSubRegions.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getDistricts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistricts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.districts = payload;
      })
      .addCase(getDistricts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectLoading = (state) => state.regions.loading;
export const selectError = (state) => state.regions.error;
export const selectRegions = (state) => state.regions.data;
export const selectSubRegions = (state) => state.regions.subRegions;
export const selectDistricts = (state) => state.regions.districts;

export default regionsSlice.reducer;
