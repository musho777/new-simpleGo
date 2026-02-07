import { createSlice } from '@reduxjs/toolkit';

import { getPreviousDate } from 'utils/dateUtils';

import {
  checkSecret,
  getActiveTariff,
  getActiveToInactiveSubscribers,
  getActivesCountByDate,
  getAllTariff,
  getCitiesOneDay,
  getCity,
  getContract,
  getContractDiagrams,
  getContractOneDay,
  getContractOneDayAllItemsInfo,
  getContractOneDayGroupInfo,
  getContractPaymentDiagrams,
  getCount,
  getDailyPayments,
  getInactiveSubscribers,
  getInvoices,
  getPassiveToActiveSubscribers,
  getPaymentMethod,
  getPayments,
  getProcess,
  getProcessStatus,
  getProcessType,
  getRegion,
  getRegionsOneDay,
  getStatusesOneDay,
  getTariffsOneDay,
  getUnsubscribedSubscribers,
} from './mainActions';

const initialState = {
  loading: {
    invoices: false,
    count: false,
    activeTariff: false,
    city: false,
    region: false,
    allTariff: false,
    payments: false,
    paymentMethod: false,
    contract: false,
    contractOneDay: false,
    processType: false,
    processStatus: false,
    process: false,
    secret: false,
    export: false,
    exportReport: false,
    contractDiagrams: false,
    contractOneDayAllItemsInfo: false,
    contractOneDayGroupedInfo: false,
    contractPaymentDiagrams: false,
    activesCountByDate: false,
    dailyPayments: false,
    inactiveSubscribers: false,
    paidSubscribers: false,
    unsubscribedSubscribers: false,
    activeToInactiveSubscribers: false,
    passiveToActiveSubscribers: false,
  },
  showFilters: false,
  count: '',
  secretSuccess: false,
  region: [],
  city: [],
  allTariff: [],
  activeTariff: [],
  pagesCount: 0,
  totalElements: 0,
  totalAmountByFilter: 0,
  invoices: [],
  payments: [],
  paymentMethod: [],
  processStatus: [],
  processType: [],
  process: [],
  contract: [],
  contractDiagrams: [],
  contractPaymentDiagrams: [],
  contractOneDay: [],
  citiesOneDay: [],
  regionsOneDay: [],
  statusesOneDay: [],
  tariffsOneDay: [],
  groupedList: [],
  allItemsList: [],
  export: [],
  exportReport: [],
  activesCountByDate: null,
  dailyPayments: [],
  dailyPaymentsCount: 0,
  dailyPaymentsTotalPages: 0,
  dailyPaymentsTotalAmount: 0,
  inactiveSubscribers: [],
  inactiveSubscribersCount: 0,
  inactiveSubscribersTotalPages: 0,
  inactiveSubscribersTotalAmount: 0,
  paidSubscribers: [],
  unsubscribedSubscribers: [],
  unsubscribedSubscribersCount: 0,
  unsubscribedSubscribersTotalPages: 0,
  unsubscribedSubscribersTotalAmount: 0,
  paidSubscribersCount: 0,
  paidSubscribersTotalPages: 0,
  paidSubscribersTotalAmount: 0,
  activeToInactiveSubscribers: [],
  activeToInactiveSubscribersCount: 0,
  activeToInactiveSubscribersTotalPages: 0,
  activeToInactiveSubscribersTotalAmount: 0,
  passiveToActiveSubscribers: [],
  passiveToActiveSubscribersCount: 0,
  passiveToActiveSubscribersTotalPages: 0,
  passiveToActiveSubscribersTotalAmount: 0,
  error: null,
  searchContractData: {},
  searchContractDiagramsData: {},
  searchContractPaymentDiagramsData: {},
  searchExportData: {},
  searchExportPaymentData: {},
  searchContractOneDayData: { date: getPreviousDate() },
  searchContractOneDayAllItemsInfoData: { date: getPreviousDate() },
  searchContractOneDayGroupedInfoData: { date: getPreviousDate() },
  searchCitiesOneDayData: {},
  searchRegionsOneDayData: {},
  searchStatusesOneDayData: {},
  searchTariffsOneDayData: {},
  searchActivesCountByDateData: { date: getPreviousDate() },
  searchDailyPaymentsData: {},
  searchInactiveSubscribersData: {},
  searchPaidSubscribersData: {},
  searchUnsubscribedSubscribersData: {},
  searchActiveToInactiveSubscribersData: {},
  searchPassiveToActiveSubscribersData: {},
  securityModalOpen: false,
  securityValue: '',
  selectedDateFrom: getPreviousDate(),
  comparisonDateFromStart: null,
  comparisonDateFromEnd: null,
  comparisonDateToEnd: null,
  comparisonDateToStart: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setShowFilters: (state, { payload }) => {
      state.showFilters = payload;
    },
    setContractSearchData: (state, { payload }) => {
      state.searchContractData = { ...state.searchContractData, ...payload };
    },
    setContractDiagramsSearchData: (state, { payload }) => {
      state.searchContractDiagramsData = { ...state.searchContractDiagramsData, ...payload };
    },
    setContractPaymentDiagramsSearchData: (state, { payload }) => {
      state.searchContractPaymentDiagramsData = {
        ...state.searchContractPaymentDiagramsData,
        ...payload,
      };
    },
    setExportSearchData: (state, { payload }) => {
      state.searchExportData = { ...state.searchExportData, ...payload };
    },
    setExportPaymentSearchData: (state, { payload }) => {
      state.searchExportPaymentData = { ...state.searchExportPaymentData, ...payload };
    },
    setContractOneDaySearchData: (state, { payload }) => {
      state.searchContractOneDayData = { ...state.searchContractOneDayData, ...payload };
    },
    setContractOneDayAllItemsInfoSearchData: (state, { payload }) => {
      state.searchContractOneDayAllItemsInfoData = {
        ...state.searchContractOneDayAllItemsInfoData,
        ...payload,
      };
    },
    setContractOneDayGroupedInfoSearchData: (state, { payload }) => {
      state.searchContractOneDayGroupedInfoData = {
        ...state.searchContractOneDayGroupedInfoData,
        ...payload,
      };
    },
    setActivesCountByDateSearchData: (state, { payload }) => {
      state.searchActivesCountByDateData = {
        ...state.searchActivesCountByDateData,
        ...payload,
      };
    },
    setDailyPaymentsSearchData: (state, { payload }) => {
      state.searchDailyPaymentsData = {
        ...state.searchDailyPaymentsData,
        ...payload,
      };
    },
    setInactiveSubscribersSearchData: (state, { payload }) => {
      state.searchInactiveSubscribersData = {
        ...state.searchInactiveSubscribersData,
        ...payload,
      };
    },
    setUnsubscribedSubscribersSearchData: (state, { payload }) => {
      state.searchUnsubscribedSubscribersData = {
        ...state.searchUnsubscribedSubscribersData,
        ...payload,
      };
    },
    setPaidSubscribersSearchData: (state, { payload }) => {
      state.searchPaidSubscribersData = {
        ...state.searchPaidSubscribersData,
        ...payload,
      };
    },
    setActiveToInactiveSubscribersSearchData: (state, { payload }) => {
      state.searchActiveToInactiveSubscribersData = {
        ...state.searchActiveToInactiveSubscribersData,
        ...payload,
      };
    },
    setPassiveToActiveSubscribersSearchData: (state, { payload }) => {
      state.searchPassiveToActiveSubscribersData = {
        ...state.searchPassiveToActiveSubscribersData,
        ...payload,
      };
    },
    setSecretSuccess: (state, { payload }) => {
      state.secretSuccess = payload;
    },
    toggleSecurityModal: (state, action) => {
      state.securityModalOpen = action.payload;
      if (!action.payload) {
        state.securityValue = '';
        state.errorMessage = '';
      }
    },
    setSecurityValue: (state, action) => {
      state.securityValue = action.payload;
      state.errorMessage = '';
    },
    setSelectedDateFrom: (state, action) => {
      state.selectedDateFrom = action.payload;
    },
    setComparisonDateFromStart: (state, action) => {
      state.comparisonDateFromStart = action.payload;
    },
    setComparisonDateFromEnd: (state, action) => {
      state.comparisonDateFromEnd = action.payload;
    },
    setComparisonDateToStart: (state, action) => {
      state.comparisonDateToStart = action.payload;
    },
    setComparisonDateToEnd: (state, action) => {
      state.comparisonDateToEnd = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.loading.invoices = true;
        state.error = null;
      })
      .addCase(getInvoices.fulfilled, (state, { payload }) => {
        if (payload) {
          state.invoices = payload.superContractPage?.content;
          state.loading.invoices = false;
          state.error = null;
          state.pagesCount = payload.superContractPage?.totalPages;
          state.totalElements = payload.superContractPage?.totalElements;
          state.totalAmountByFilter = payload?.totalAmountByFilter;
        }
      })
      .addCase(getInvoices.rejected, (state, { payload }) => {
        state.loading.invoices = false;
        state.error = payload;
      })
      .addCase(getCount.pending, (state) => {
        state.loading.count = true;
        state.error = null;
      })
      .addCase(getCount.fulfilled, (state, { payload }) => {
        state.count = payload;
        state.loading.count = false;
        state.error = null;
      })
      .addCase(getCount.rejected, (state, { payload }) => {
        state.loading.count = false;
        state.error = payload;
      })
      .addCase(getActiveTariff.pending, (state) => {
        state.loading.activeTariff = true;
        state.error = null;
      })
      .addCase(getActiveTariff.fulfilled, (state, { payload }) => {
        state.activeTariff = payload;
        state.loading.activeTariff = false;
        state.error = null;
      })
      .addCase(getActiveTariff.rejected, (state, { payload }) => {
        state.loading.activeTariff = false;
        state.error = payload;
      })
      .addCase(getAllTariff.pending, (state) => {
        state.loading.allTariff = true;
        state.error = null;
      })
      .addCase(getAllTariff.fulfilled, (state, { payload }) => {
        state.allTariff = payload;
        state.loading.allTariff = false;
        state.error = null;
      })
      .addCase(getAllTariff.rejected, (state, { payload }) => {
        state.loading.allTariff = false;
        state.error = payload;
      })
      .addCase(getCity.pending, (state) => {
        state.loading.city = true;
        state.error = null;
      })
      .addCase(getCity.fulfilled, (state, { payload }) => {
        state.city = payload;
        state.loading.city = false;
        state.error = null;
      })
      .addCase(getCity.rejected, (state, { payload }) => {
        state.loading.city = false;
        state.error = payload;
      })
      .addCase(getRegion.pending, (state) => {
        state.loading.region = true;
        state.error = null;
      })
      .addCase(getRegion.fulfilled, (state, { payload }) => {
        state.region = payload;
        state.loading.region = false;
        state.error = null;
      })
      .addCase(getRegion.rejected, (state, { payload }) => {
        state.loading.region = false;
        state.error = payload;
      })
      .addCase(getPayments.pending, (state) => {
        state.loading.payments = true;
        state.error = null;
      })
      .addCase(getPayments.fulfilled, (state, { payload }) => {
        if (payload) {
          state.payments = payload.superContractPage.content;
          state.loading.payments = false;
          state.error = null;
          state.pagesCount = payload.superContractPage.totalPages;
          state.totalElements = payload.superContractPage.totalElements;
          state.totalAmountByFilter = payload.totalAmountByFilter;
        }
      })
      .addCase(getPayments.rejected, (state, { payload }) => {
        state.loading.payments = false;
        state.error = payload;
      })
      .addCase(getPaymentMethod.pending, (state) => {
        state.loading.paymentMethod = true;
        state.error = null;
      })
      .addCase(getPaymentMethod.fulfilled, (state, { payload }) => {
        state.paymentMethod = payload;
        state.loading.paymentMethod = false;
        state.error = null;
      })
      .addCase(getPaymentMethod.rejected, (state, { payload }) => {
        state.loading.paymentMethod = false;
        state.error = payload;
      })
      .addCase(getProcess.pending, (state) => {
        state.loading.process = true;
        state.error = null;
      })
      .addCase(getProcess.fulfilled, (state, { payload }) => {
        if (payload) {
          state.process = payload.content;
          state.loading.process = false;
          state.error = null;
          state.pagesCount = payload.totalPages;
          state.totalElements = payload.totalElements;
        }
      })
      .addCase(getProcess.rejected, (state, { payload }) => {
        state.loading.process = false;
        state.error = payload;
      })
      .addCase(getProcessStatus.pending, (state) => {
        state.loading.processStatus = true;
        state.error = null;
      })
      .addCase(getProcessStatus.fulfilled, (state, { payload }) => {
        state.processStatus = payload;
        state.loading.processStatus = false;
        state.error = null;
      })
      .addCase(getProcessStatus.rejected, (state, { payload }) => {
        state.loading.processStatus = false;
        state.error = payload;
      })
      .addCase(getProcessType.pending, (state) => {
        state.loading.processType = true;
        state.error = null;
      })
      .addCase(getProcessType.fulfilled, (state, { payload }) => {
        state.processType = payload;
        state.loading.processType = false;
        state.error = null;
      })
      .addCase(getProcessType.rejected, (state, { payload }) => {
        state.loading.processType = false;
        state.error = payload;
      })
      .addCase(checkSecret.pending, (state) => {
        state.loading.secret = true;
        state.error = null;
      })
      .addCase(checkSecret.fulfilled, (state, { payload }) => {
        state.secretSuccess = true;
        state.securityValue = payload.secret;
        state.loading.secret = false;
        state.error = null;
      })
      .addCase(checkSecret.rejected, (state, { payload }) => {
        state.loading.secret = false;
        if (
          payload === 'An unexpected error occurred' ||
          `Cannot read properties of undefined (reading 'endsWith')`
        ) {
          state.error = 'Wrong security code';
        } else {
          state.error = payload;
        }
      })
      .addCase(getContract.pending, (state) => {
        state.loading.contract = true;
        state.error = null;
      })
      .addCase(getContract.fulfilled, (state, { payload }) => {
        state.contract = payload;
        state.loading.contract = false;
        state.error = null;
      })
      .addCase(getContract.rejected, (state, { payload }) => {
        state.loading.contract = false;
        state.error = payload;
      })
      .addCase(getContractDiagrams.pending, (state) => {
        state.loading.contractDiagrams = true;
        state.error = null;
      })
      .addCase(getContractDiagrams.fulfilled, (state, { payload }) => {
        state.contractDiagrams = payload;
        state.loading.contractDiagrams = false;
        state.error = null;
      })
      .addCase(getContractDiagrams.rejected, (state, { payload }) => {
        state.loading.contractDiagrams = false;
        state.error = payload;
      })
      .addCase(getContractPaymentDiagrams.pending, (state) => {
        state.loading.contractPaymentDiagrams = true;
        state.error = null;
      })
      .addCase(getContractPaymentDiagrams.fulfilled, (state, { payload }) => {
        state.contractPaymentDiagrams = payload;
        state.loading.contractPaymentDiagrams = false;
        state.error = null;
      })
      .addCase(getContractPaymentDiagrams.rejected, (state, { payload }) => {
        state.loading.contractPaymentDiagrams = false;
        state.error = payload;
      })
      .addCase(getContractOneDay.pending, (state) => {
        state.loading.contractOneDay = true;
        state.error = null;
      })
      .addCase(getContractOneDay.fulfilled, (state, { payload }) => {
        state.contractOneDay = payload;
        state.loading.contractOneDay = false;
        state.error = null;
      })
      .addCase(getContractOneDay.rejected, (state, { payload }) => {
        state.loading.contractOneDay = false;
        state.error = payload;
      })
      .addCase(getContractOneDayAllItemsInfo.pending, (state) => {
        state.loading.contractOneDayAllItemsInfo = true;
        state.error = null;
      })
      .addCase(getContractOneDayAllItemsInfo.fulfilled, (state, { payload }) => {
        state.allItemsList = payload;
        state.loading.contractOneDayAllItemsInfo = false;
        state.error = null;
      })
      .addCase(getContractOneDayAllItemsInfo.rejected, (state, { payload }) => {
        state.loading.contractOneDayAllItemsInfo = false;
        state.error = payload;
      })
      .addCase(getContractOneDayGroupInfo.pending, (state) => {
        state.loading.contractOneDayGroupedInfo = true;
        state.error = null;
      })
      .addCase(getContractOneDayGroupInfo.fulfilled, (state, { payload }) => {
        state.groupedList = payload;
        state.loading.contractOneDayGroupedInfo = false;
        state.error = null;
      })
      .addCase(getContractOneDayGroupInfo.rejected, (state, { payload }) => {
        state.loading.contractOneDayGroupedInfo = false;
        state.error = payload;
      })
      .addCase(getCitiesOneDay.pending, (state) => {
        state.error = null;
      })
      .addCase(getCitiesOneDay.fulfilled, (state, { payload }) => {
        state.citiesOneDay = payload;
        state.error = null;
      })
      .addCase(getCitiesOneDay.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getRegionsOneDay.pending, (state) => {
        state.error = null;
      })
      .addCase(getRegionsOneDay.fulfilled, (state, { payload }) => {
        state.regionsOneDay = payload;
        state.error = null;
      })
      .addCase(getRegionsOneDay.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getStatusesOneDay.pending, (state) => {
        state.error = null;
      })
      .addCase(getStatusesOneDay.fulfilled, (state, { payload }) => {
        state.statusesOneDay = payload;
        state.error = null;
      })
      .addCase(getStatusesOneDay.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getTariffsOneDay.pending, (state) => {
        state.error = null;
      })
      .addCase(getTariffsOneDay.fulfilled, (state, { payload }) => {
        state.tariffsOneDay = payload;
        state.error = null;
      })
      .addCase(getTariffsOneDay.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getActivesCountByDate.pending, (state) => {
        state.loading.activesCountByDate = true;
        state.error = null;
      })
      .addCase(getActivesCountByDate.fulfilled, (state, { payload }) => {
        state.activesCountByDate = payload;
        state.loading.activesCountByDate = false;
        state.error = null;
      })
      .addCase(getActivesCountByDate.rejected, (state, { payload }) => {
        state.loading.activesCountByDate = false;
        state.activesCountByDate = [];

        state.error = payload;
      })
      .addCase(getDailyPayments.pending, (state) => {
        state.loading.dailyPayments = true;
        state.error = null;
      })
      .addCase(getDailyPayments.fulfilled, (state, { payload }) => {
        if (payload) {
          state.dailyPayments = payload.content || [];
          state.loading.dailyPayments = false;
          state.error = null;
          state.dailyPaymentsCount = payload.totalElements || 0;
          state.dailyPaymentsTotalPages = payload.totalPages || 0;
          state.dailyPaymentsTotalAmount = payload?.totalElements || 0;
        }
      })
      .addCase(getDailyPayments.rejected, (state, { payload }) => {
        state.loading.dailyPayments = false;
        state.error = payload;
        state.dailyPayments = [];
      })
      .addCase(getInactiveSubscribers.pending, (state) => {
        state.loading.inactiveSubscribers = true;
        state.error = null;
      })
      .addCase(getInactiveSubscribers.fulfilled, (state, { payload }) => {
        if (payload) {
          state.inactiveSubscribers = payload.content || [];
          state.loading.inactiveSubscribers = false;
          state.error = null;
          state.inactiveSubscribersCount = payload.totalElements || 0;
          state.inactiveSubscribersTotalPages = payload.totalPages || 0;
          state.inactiveSubscribersTotalAmount = payload?.totalElements || 0;
        }
      })
      .addCase(getInactiveSubscribers.rejected, (state, { payload }) => {
        state.loading.inactiveSubscribers = false;
        state.error = payload;
        state.inactiveSubscribers = [];
      })
      .addCase(getUnsubscribedSubscribers.pending, (state) => {
        state.loading.unsubscribedSubscribers = true;
        state.error = null;
      })
      .addCase(getUnsubscribedSubscribers.fulfilled, (state, { payload }) => {
        if (payload) {
          state.unsubscribedSubscribers = payload.content || [];
          state.loading.unsubscribedSubscribers = false;
          state.error = null;
          state.unsubscribedSubscribersCount = payload.totalElements || 0;
          state.unsubscribedSubscribersTotalPages = payload.totalPages || 0;
          state.unsubscribedSubscribersTotalAmount = payload?.totalElements || 0;
        }
      })
      .addCase(getUnsubscribedSubscribers.rejected, (state, { payload }) => {
        state.loading.unsubscribedSubscribers = false;
        state.error = payload;
        state.unsubscribedSubscribers = [];
      })

      .addCase(getActiveToInactiveSubscribers.pending, (state) => {
        state.loading.activeToInactiveSubscribers = true;
        state.error = null;
      })
      .addCase(getActiveToInactiveSubscribers.fulfilled, (state, { payload }) => {
        if (payload) {
          state.activeToInactiveSubscribers = payload.content || [];
          state.loading.activeToInactiveSubscribers = false;
          state.error = null;
          state.activeToInactiveSubscribersCount = payload.totalElements || 0;
          state.activeToInactiveSubscribersTotalPages = payload.totalPages || 0;
          state.activeToInactiveSubscribersTotalAmount = payload?.totalElements || 0;
        }
      })
      .addCase(getActiveToInactiveSubscribers.rejected, (state, { payload }) => {
        state.loading.activeToInactiveSubscribers = false;
        state.error = payload;
        state.activeToInactiveSubscribers = [];
      })
      .addCase(getPassiveToActiveSubscribers.pending, (state) => {
        state.loading.passiveToActiveSubscribers = true;
        state.error = null;
      })
      .addCase(getPassiveToActiveSubscribers.fulfilled, (state, { payload }) => {
        if (payload) {
          state.passiveToActiveSubscribers = payload.content || [];
          state.loading.passiveToActiveSubscribers = false;
          state.error = null;
          state.passiveToActiveSubscribersCount = payload.totalElements || 0;
          state.passiveToActiveSubscribersTotalPages = payload.totalPages || 0;
          state.passiveToActiveSubscribersTotalAmount = payload?.totalElements || 0;
        }
      })
      .addCase(getPassiveToActiveSubscribers.rejected, (state, { payload }) => {
        state.loading.passiveToActiveSubscribers = false;
        state.error = payload;
        state.passiveToActiveSubscribers = [];
      });
  },
});

export const {
  setShowFilters,
  setContractSearchData,
  setContractOneDaySearchData,
  setSecretSuccess,
  toggleSecurityModal,
  setSecurityValue,
  setSelectedDateFrom,
  setComparisonDateFromStart,
  setComparisonDateToStart,
  setComparisonDateFromEnd,
  setComparisonDateToEnd,
  setExportSearchData,
  setContractDiagramsSearchData,
  setContractPaymentDiagramsSearchData,
  setContractOneDayAllItemsInfoSearchData,
  setContractOneDayGroupedInfoSearchData,
  setExportPaymentSearchData,
  setActivesCountByDateSearchData,
  setDailyPaymentsSearchData,
  setInactiveSubscribersSearchData,
  setPaidSubscribersSearchData,
  setUnsubscribedSubscribersSearchData,
  setActiveToInactiveSubscribersSearchData,
  setPassiveToActiveSubscribersSearchData,
} = mainSlice.actions;

export const selectShowFilters = (state) => state.main.showFilters;
export const selectInvoices = (state) => state.main.invoices;
export const selectCount = (state) => state.main.count;
export const selectPagesCount = (state) => state.main.pagesCount;
export const selectTotalElements = (state) => state.main.totalElements;
export const selectTotalAmountByFilter = (state) => state.main.totalAmountByFilter;
export const selectLoading = (state) => state.main.loading;
export const selectRegion = (state) => state.main.region;
export const selectCity = (state) => state.main.city;
export const selectActiveTariff = (state) => state.main.activeTariff;
export const selectAllTariff = (state) => state.main.allTariff;
export const selectPayments = (state) => state.main.payments;
export const selectPaymentsMethod = (state) => state.main.paymentMethod;
export const selectProcess = (state) => state.main.process;
export const selectProcessStatus = (state) => state.main.processStatus;
export const selectProcessType = (state) => state.main.processType;
export const selectIsSecurityModalOpen = (state) => state.main.securityModalOpen;
export const selectSelectedDateFrom = (state) => state.main.selectedDateFrom;
export const selectContract = (state) => state.main.contract;
export const selectContractDiagrams = (state) => state.main.contractDiagrams;
export const selectContractSearchData = (state) => state.main.searchContractData;
export const selectContractDiagramsSearchData = (state) =>
  state.main.searchContractDiagramsData;
export const selectContractPaymentDiagrams = (state) => state.main.contractPaymentDiagrams;
export const selectContractPaymentDiagramsSearchData = (state) =>
  state.main.searchContractPaymentDiagramsData;
export const selectContractGroupedList = (state) => state.main.groupedList;
export const selectContractAllItemList = (state) => state.main.allItemsList;
export const selectContractOneDay = (state) => state.main.contractOneDay;
export const selectContractOneDaySearchData = (state) => state.main.searchContractOneDayData;
export const selectComparisonDateFromStart = (state) => state.main.comparisonDateFromStart;
export const selectComparisonDateFromEnd = (state) => state.main.comparisonDateFromEnd;
export const selectComparisonDateToStart = (state) => state.main.comparisonDateToStart;
export const selectComparisonDateToEnd = (state) => state.main.comparisonDateToEnd;
export const selectExportSearchData = (state) => state.main.searchExportData;
export const selectExportPaymentSearchData = (state) => state.main.searchExportPaymentData;
export const selectCitiesOneDay = (state) => state.main.citiesOneDay;
export const selectRegionsOneDay = (state) => state.main.regionsOneDay;
export const selectTariffsOneDay = (state) => state.main.tariffsOneDay;
export const selectStatuesOneDay = (state) => state.main.statusesOneDay;
export const selectContractOneDayAllItemsInfoSearchData = (state) =>
  state.main.searchContractOneDayAllItemsInfoData;
export const selectContractOneDayGroupedInfoSearchData = (state) =>
  state.main.searchContractOneDayGroupedInfoData;
export const selectActivesCountByDate = (state) => state.main.activesCountByDate;
export const selectActivesCountByDateSearchData = (state) =>
  state.main.searchActivesCountByDateData;
export const selectDailyPayments = (state) => state.main.dailyPayments;
export const selectDailyPaymentsLoading = (state) => state.main.loading.dailyPayments;
export const selectDailyPaymentsCount = (state) => state.main.dailyPaymentsCount;
export const selectDailyPaymentsTotalPages = (state) => state.main.dailyPaymentsTotalPages;
export const selectDailyPaymentsTotalAmount = (state) => state.main.dailyPaymentsTotalAmount;
export const selectDailyPaymentsSearchData = (state) => state.main.searchDailyPaymentsData;
export const selectInactiveSubscribers = (state) => state.main.inactiveSubscribers;
export const selectInactiveSubscribersLoading = (state) =>
  state.main.loading.inactiveSubscribers;
export const selectInactiveSubscribersCount = (state) => state.main.inactiveSubscribersCount;
export const selectInactiveSubscribersTotalPages = (state) =>
  state.main.inactiveSubscribersTotalPages;
export const selectInactiveSubscribersTotalAmount = (state) =>
  state.main.inactiveSubscribersTotalAmount;
export const selectInactiveSubscribersSearchData = (state) =>
  state.main.searchInactiveSubscribersData;
export const selectUnsubscribedSubscribers = (state) => state.main.unsubscribedSubscribers;
export const selectUnsubscribedSubscribersLoading = (state) =>
  state.main.loading.unsubscribedSubscribers;
export const selectUnsubscribedSubscribersCount = (state) =>
  state.main.unsubscribedSubscribersCount;
export const selectUnsubscribedSubscribersTotalPages = (state) =>
  state.main.unsubscribedSubscribersTotalPages;
export const selectUnsubscribedSubscribersTotalAmount = (state) =>
  state.main.unsubscribedSubscribersTotalAmount;
export const selectUnsubscribedSubscribersSearchData = (state) =>
  state.main.searchUnsubscribedSubscribersData;
export const selectPaidSubscribers = (state) => state.main.paidSubscribers;
export const selectPaidSubscribersLoading = (state) => state.main.loading.paidSubscribers;
export const selectPaidSubscribersCount = (state) => state.main.paidSubscribersCount;
export const selectPaidSubscribersTotalPages = (state) => state.main.paidSubscribersTotalPages;
export const selectPaidSubscribersTotalAmount = (state) =>
  state.main.paidSubscribersTotalAmount;
export const selectPaidSubscribersSearchData = (state) => state.main.searchPaidSubscribersData;
export const selectActiveToInactiveSubscribers = (state) =>
  state.main.activeToInactiveSubscribers;
export const selectActiveToInactiveSubscribersLoading = (state) =>
  state.main.loading.activeToInactiveSubscribers;
export const selectActiveToInactiveSubscribersCount = (state) =>
  state.main.activeToInactiveSubscribersCount;
export const selectActiveToInactiveSubscribersTotalPages = (state) =>
  state.main.activeToInactiveSubscribersTotalPages;
export const selectActiveToInactiveSubscribersTotalAmount = (state) =>
  state.main.activeToInactiveSubscribersTotalAmount;
export const selectActiveToInactiveSubscribersSearchData = (state) =>
  state.main.searchActiveToInactiveSubscribersData;
export const selectPassiveToActiveSubscribers = (state) =>
  state.main.passiveToActiveSubscribers;
export const selectPassiveToActiveSubscribersLoading = (state) =>
  state.main.loading.passiveToActiveSubscribers;
export const selectPassiveToActiveSubscribersCount = (state) =>
  state.main.passiveToActiveSubscribersCount;
export const selectPassiveToActiveSubscribersTotalPages = (state) =>
  state.main.passiveToActiveSubscribersTotalPages;
export const selectPassiveToActiveSubscribersTotalAmount = (state) =>
  state.main.passiveToActiveSubscribersTotalAmount;
export const selectPassiveToActiveSubscribersSearchData = (state) =>
  state.main.searchPassiveToActiveSubscribersData;

export default mainSlice.reducer;
