import { createSlice } from '@reduxjs/toolkit';

import {
  getContractBalance,
  getCustomers,
  getCustomersLeadData,
  getSingleCustomer,
} from './customersActions';

const initialState = {
  customersLoading: false,
  customersError: null,
  customersData: null,
  singleCustomerLoading: false,
  singleCustomerError: null,
  singleCustomerData: null,
  contractBalanceLoading: false,
  contractBalanceError: null,
  contractBalanceData: null,
  customerError: null,
  customerLoading: false,
  customerData: null,
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.customersLoading = true;
        state.customersError = null;
      })
      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.customersLoading = false;
        state.customersError = null;
        state.customersData = payload;
      })
      .addCase(getCustomers.rejected, (state, { payload }) => {
        state.customersLoading = false;
        state.customersError = payload;
      })
      .addCase(getSingleCustomer.pending, (state) => {
        state.singleCustomerLoading = true;
        state.singleCustomerError = null;
      })
      .addCase(getSingleCustomer.fulfilled, (state, { payload }) => {
        state.singleCustomerLoading = false;
        state.singleCustomerError = null;
        state.singleCustomerData = payload;
      })
      .addCase(getSingleCustomer.rejected, (state, { payload }) => {
        state.singleCustomerLoading = false;
        state.singleCustomerError = payload;
      })
      .addCase(getContractBalance.pending, (state) => {
        state.contractBalanceLoading = true;
        state.contractBalanceError = null;
      })
      .addCase(getContractBalance.fulfilled, (state, { payload }) => {
        state.contractBalanceLoading = false;
        state.contractBalanceError = null;
        state.contractBalanceData = payload;
      })
      .addCase(getContractBalance.rejected, (state, { payload }) => {
        state.contractBalanceLoading = false;
        state.contractBalanceError = payload;
      })
      .addCase(getCustomersLeadData.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
        state.customerData = null;
      })
      .addCase(getCustomersLeadData.fulfilled, (state, { payload }) => {
        state.customerLoading = false;
        state.customerError = null;
        state.customerData = payload;
      })
      .addCase(getCustomersLeadData.rejected, (state, { payload }) => {
        state.customerLoading = false;
        state.customerError = payload;
        state.customerData = null;
      });
  },
});

// export const {} = customersSlice.actions;

export const selectLoading = (state) => state.customers.customersLoading;
export const selectError = (state) => state.customers.customersError;
export const selectCustomers = (state) => state.customers.customersData;

export const selectSingleLoading = (state) => state.customers.singleCustomerLoading;
export const selectSingleError = (state) => state.customers.singleCustomerError;
export const selectSingleCustomers = (state) => state.customers.singleCustomerData;

export const selectContractBalanceLoading = (state) => state.customers.contractBalanceLoading;
export const selectContractBalanceError = (state) => state.customers.contractBalanceError;
export const selectContractBalanceData = (state) => state.customers.contractBalanceData;

export const selectCustomerLoading = (state) => state.customers.customerLoading;
export const selectContractError = (state) => state.customers.customerError;
export const selectContractData = (state) => state.customers.customerData;

export default customersSlice.reducer;
