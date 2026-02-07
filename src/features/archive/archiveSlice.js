import { createSlice } from '@reduxjs/toolkit';

import { getArchive } from './archiveActions';

const initialState = {
  loading: false,
  error: null,
  data: [],
  count: 0,
  heads: [],
  showFilters: false,
  searchData: {},
};

const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },
    setArchiveSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArchive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArchive.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data = payload.data;
        state.count = payload.count;
      })
      .addCase(getArchive.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setShowFilters, setArchiveSearchData } = archiveSlice.actions;

export const selectLoading = (state) => state.archive.loading;
export const selectError = (state) => state.archive.error;
export const selectArchive = (state) => state.archive.data;
export const selectArchiveCount = (state) => state.archive.count;
export const selectShowFilters = (state) => state.archive.showFilters;
export const selectArchivesSearchData = (state) => state.archive.searchData;

export default archiveSlice.reducer;
