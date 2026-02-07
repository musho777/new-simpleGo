import { createSlice } from '@reduxjs/toolkit';

import { getHalfYearlySubscribers, getMonthlyPayments } from './statementActions';

const initialState = {
  loading: {
    monthlyPayments: true,
    halfYearlySubscribers: false,
  },
  error: null,
  monthlyPayments: [],
  halfYearlySubscribers: [],
};

const statementSlice = createSlice({
  name: 'statement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlyPayments.pending, (state) => {
        state.loading.monthlyPayments = true;
        state.error = null;
      })
      .addCase(getMonthlyPayments.fulfilled, (state, { payload }) => {
        state.monthlyPayments = payload;
        state.loading.monthlyPayments = false;
        state.error = null;
      })
      .addCase(getMonthlyPayments.rejected, (state, { payload }) => {
        state.loading.monthlyPayments = false;
        state.error = payload;
      })
      .addCase(getHalfYearlySubscribers.pending, (state) => {
        state.loading.halfYearlySubscribers = true;
        state.error = null;
      })
      .addCase(getHalfYearlySubscribers.fulfilled, (state, { payload }) => {
        state.halfYearlySubscribers = payload;
        state.loading.halfYearlySubscribers = false;
        state.error = null;
      })
      .addCase(getHalfYearlySubscribers.rejected, (state, { payload }) => {
        state.loading.halfYearlySubscribers = false;
        state.halfYearlySubscribers = [];
        state.error = payload;
      });
  },
});

export const selectMonthlyPayments = (state) => state.statement.monthlyPayments;
export const selectHalfYearlySubscribers = (state) => state.statement.halfYearlySubscribers;
export const selectStatementLoading = (state) => state.statement.loading;
export const selectStatementError = (state) => state.statement.error;

export default statementSlice.reducer;
