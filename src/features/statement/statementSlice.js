import { createSlice } from '@reduxjs/toolkit';

import { getMonthlyPayments } from './statementActions';

const initialState = {
  loading: {
    monthlyPayments: true,
  },
  error: null,
  monthlyPayments: [],
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
      });
  },
});

export const selectMonthlyPayments = (state) => state.statement.monthlyPayments;
export const selectStatementLoading = (state) => state.statement.loading;
export const selectStatementError = (state) => state.statement.error;

export default statementSlice.reducer;
