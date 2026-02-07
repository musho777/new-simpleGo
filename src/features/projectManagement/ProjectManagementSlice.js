import { createSlice } from '@reduxjs/toolkit';

import { notifySuccess } from 'utils/notifyConfig';

import {
  createTicket,
  editTicket,
  getAppointmentContext,
  getAppointments,
  getAssigneesForFilter,
  getCreatedByForFilter,
  getCustomerData,
  getProjects,
  getProjectsForFilter,
  getSingleAppointment,
  getSingleTicket,
  getSubprojectsForFilter,
  getSubtasks,
  getTickets,
  getTicketsGrid,
  sendComment,
} from './ProjectManagementActions';

const initialState = {
  loading: {
    tickets: false,
    singleTicket: false,
    singleAppointment: false,
    projectsForFilter: false,
    subprojectsForFilter: false,
    create: false,
    edit: false,
    comment: false,
    projects: false,
    subtasks: {},
    customerData: false,
    appointmentContext: false,
  },
  success: {
    tickets: false,
    singleTicket: false,
    singleAppointment: false,
    projectsForFilter: false,
    subprojectsForFilter: false,
    create: false,
    edit: false,
    projects: false,
    comment: false,
    subtasks: {},
    customerData: false,
    appointmentContext: false,
  },
  tickets: [],

  ticketCart: {
    'In Progress': [],
    'To Do': [],
    Waiting: [],
    Resolved: [],
    Closed: [],
    Rejected: [],
    Reopen: [],
  },

  totalPagesList: {
    'In Progress': 1,
    'To Do': 1,
    Waiting: 1,
    Resolved: 1,
    Closed: 1,
    Rejected: 1,
    Reopen: 1,
  },

  countList: {
    'In Progress': 0,
    'To Do': 0,
    Waiting: 0,
    Resolved: 0,
    Closed: 0,
    Rejected: 0,
    Reopen: 0,
  },
  currentPage: {
    'In Progress': 1,
    'To Do': 1,
    Waiting: 1,
    Resolved: 1,
    Closed: 1,
    Rejected: 1,
    Reopen: 1,
  },
  singleTicket: {},
  singleAppointment: {},

  totalPages: 1,
  count: 0,
  ticketAssignTypes: {
    myAssigned: 0,
    myAssignedNew: 0,
    myTeamNewTickets: 0,
    myTeamTickets: 0,
    myWatcher: 0,
    myWatcherNew: 0,
  },
  projectsForFilter: [],
  subprojectsForFilter: [],
  assigneesForFilter: [],
  createdByForFilter: [],
  projects: [],
  subtasks: {},
  subtasksPagination: {},
  ticketJustClosed: false,
  customerData: null,
  appointmentContext: null,

  appointment: [],
};

const projectManagementSlice = createSlice({
  name: 'projectManagement',
  initialState,
  reducers: {
    setProjectManagementSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage[payload.type] = payload.page;
    },
    resetSuccess: (state) => {
      state.success.edit = false;
      state.success.create = false;
    },
    deleteFilterKeys: (state) => {
      const keysToRemove = [
        'assigneeIds',
        'projectIds',
        'subprojectIds',
        'createdByIds',
        'priorities',
        'status',
        'trackers',
      ];

      keysToRemove.forEach((key) => {
        delete state.searchData[key];
      });
    },
    setSubtasksPage: (state, { payload }) => {
      const { uuid, page, limit } = payload;
      if (!state.subtasksPagination) state.subtasksPagination = {};
      state.subtasksPagination[uuid] = { page, limit };
    },
    updateTicketStatus: (state, { payload }) => {
      const { ticketId, newStatus } = payload;

      const ticketIndex = state.tickets.findIndex((t) => t.id === ticketId);
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex].status = newStatus;
      }
    },
    setTicketJustClosed: (state, { payload }) => {
      state.ticketJustClosed = payload;
    },
    clearTicketJustClosed: (state) => {
      state.ticketJustClosed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.loading.tickets = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, { payload }) => {
        state.loading.tickets = false;
        state.tickets = payload.tickets;
        state.count = payload.count;
        state.totalPages = payload.totalPages > 0 ? payload.totalPages : 1;
        state.ticketAssignTypes.myAssigned = payload.myAssigned;
        state.ticketAssignTypes.myAssignedNew = payload.myAssignedNew;
        state.ticketAssignTypes.myTeamNewTickets = payload.myTeamNewTickets;
        state.ticketAssignTypes.myTeamTickets = payload.myTeamTickets;
        state.ticketAssignTypes.myWatcher = payload.myWatcher;
        state.ticketAssignTypes.myWatcherNew = payload.myWatcherNew;
      })
      .addCase(getTickets.rejected, (state, { payload }) => {
        state.loading.tickets = false;
        state.error = payload;
      })
      .addCase(getTicketsGrid.pending, (state) => {
        state.loading.tickets = true;
        state.error = null;
      })
      .addCase(getTicketsGrid.fulfilled, (state, { payload }) => {
        state.loading.tickets = false;

        if (payload.status === 'In Progress') {
          state.totalPagesList['In Progress'] =
            payload.totalPages > 0 ? payload.totalPages : 1;
          state.countList['In Progress'] = payload.count;
          if (payload.restart) {
            state.ticketCart['In Progress'] = payload.tickets;
          } else {
            state.ticketCart['In Progress'] = [
              ...state.ticketCart['In Progress'],
              ...payload.tickets,
            ];
          }
        } else if (payload.status === 'To Do') {
          state.totalPagesList['To Do'] = payload.totalPages > 0 ? payload.totalPages : 1;
          state.countList['To Do'] = payload.count;

          if (payload.restart) {
            state.ticketCart['To Do'] = payload.tickets;
          } else {
            state.ticketCart['To Do'] = [...state.ticketCart['To Do'], ...payload.tickets];
          }
        } else if (payload.status === 'Waiting') {
          if (payload.restart) {
            state.ticketCart.Waiting = payload.tickets;
          } else {
            state.ticketCart.Waiting = [...state.ticketCart.Waiting, ...payload.tickets];
          }
          state.totalPagesList['Waiting'] = payload.totalPages > 0 ? payload.totalPages : 1;
          state.countList['Waiting'] = payload.count;
        } else if (payload.status === 'Resolved') {
          if (payload.restart) {
            state.ticketCart.Resolved = payload.tickets;
          } else {
            state.ticketCart.Resolved = [...state.ticketCart.Resolved, ...payload.tickets];
          }
          state.countList['Resolved'] = payload.count;
          state.totalPagesList['Resolved'] = payload.totalPages > 0 ? payload.totalPages : 1;
        } else if (payload.status === 'Closed') {
          if (payload.restart) {
            state.ticketCart.Closed = payload.tickets;
          } else {
            state.ticketCart.Closed = [...state.ticketCart.Closed, ...payload.tickets];
          }
          state.countList['Closed'] = payload.count;
          state.totalPagesList['Closed'] = payload.totalPages > 0 ? payload.totalPages : 1;
        } else if (payload.status === 'Rejected') {
          if (payload.restart) {
            state.ticketCart.Rejected = payload.tickets;
          } else {
            state.ticketCart.Rejected = [...state.ticketCart.Rejected, ...payload.tickets];
          }
          state.countList['Rejected'] = payload.count;
          state.totalPagesList['Rejected'] = payload.totalPages > 0 ? payload.totalPages : 1;
        } else if (payload.status === 'Reopen') {
          if (payload.restart) {
            state.ticketCart.Reopen = payload.tickets;
          } else {
            state.ticketCart.Reopen = [...state.ticketCart.Reopen, ...payload.tickets];
          }
          state.countList['Reopen'] = payload.count;
          state.totalPagesList['Reopen'] = payload.totalPages > 0 ? payload.totalPages : 1;
        }
        state.count = payload.count;
        state.totalPages = payload.totalPages > 0 ? payload.totalPages : 1;
        state.ticketAssignTypes.myAssigned = payload.myAssigned;
        state.ticketAssignTypes.myAssignedNew = payload.myAssignedNew;
        state.ticketAssignTypes.myTeamNewTickets = payload.myTeamNewTickets;
        state.ticketAssignTypes.myTeamTickets = payload.myTeamTickets;
        state.ticketAssignTypes.myWatcher = payload.myWatcher;
        state.ticketAssignTypes.myWatcherNew = payload.myWatcherNew;
      })
      .addCase(getTicketsGrid.rejected, (state, { payload }) => {
        state.loading.tickets = false;
        state.error = payload;
      })

      .addCase(getSingleTicket.pending, (state) => {
        state.loading.singleTicket = true;
        state.error = null;
      })
      .addCase(getSingleTicket.fulfilled, (state, { payload }) => {
        state.loading.singleTicket = false;
        state.singleTicket = payload.ticket;
      })
      .addCase(getSingleTicket.rejected, (state, { payload }) => {
        state.loading.singleTicket = false;
        state.error = payload;
      })
      .addCase(getProjectsForFilter.pending, (state) => {
        state.loading.projectsForFilter = true;
        state.error = null;
      })
      .addCase(getProjectsForFilter.fulfilled, (state, { payload }) => {
        state.loading.projectsForFilter = false;
        state.projectsForFilter = payload;
      })
      .addCase(getProjectsForFilter.rejected, (state, { payload }) => {
        state.loading.projectsForFilter = false;
        state.error = payload;
      })
      .addCase(getSubprojectsForFilter.pending, (state) => {
        state.loading.subprojectsForFilter = true;
        state.error = null;
      })
      .addCase(getSubprojectsForFilter.fulfilled, (state, { payload }) => {
        state.loading.subprojectsForFilter = false;
        state.subprojectsForFilter = payload;
      })
      .addCase(getSubprojectsForFilter.rejected, (state, { payload }) => {
        state.loading.subprojectsForFilter = false;
        state.error = payload;
      })
      .addCase(createTicket.pending, (state) => {
        state.loading.create = true;
        state.error = null;
        state.success.create = false;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.loading.create = false;
        state.success.create = true;
      })
      .addCase(createTicket.rejected, (state, { payload }) => {
        state.loading.create = false;
        state.success.create = false;
        state.error = payload;
      })
      .addCase(editTicket.pending, (state) => {
        state.success.edit = false;
        state.loading.edit = true;
        state.error = null;
      })
      .addCase(editTicket.fulfilled, (state, { payload }) => {
        if (payload.message === 'Nothing to update') {
          notifySuccess(`No changes in ticket ${payload.name}`);
        } else {
          notifySuccess(`Ticket ${payload.name} successfully edited`);
        }
        state.success.edit = true;
        state.loading.edit = false;
      })
      .addCase(editTicket.rejected, (state, { payload }) => {
        state.success.edit = false;
        state.loading.edit = false;
        state.error = payload;
      })
      .addCase(sendComment.pending, (state) => {
        state.success.comment = false;
        state.loading.comment = true;
        state.error = null;
      })
      .addCase(sendComment.fulfilled, (state, { payload }) => {
        state.singleTicket.comments = payload.comments;
        state.success.comment = true;
        state.loading.comment = false;
      })
      .addCase(sendComment.rejected, (state, { payload }) => {
        state.success.comment = false;
        state.loading.comment = false;
        state.error = payload;
      })
      .addCase(getAssigneesForFilter.pending, (state) => {
        state.success.assigneesForFilter = false;
        state.loading.assigneesForFilter = true;
        state.error = null;
      })
      .addCase(getAssigneesForFilter.fulfilled, (state, { payload }) => {
        state.success.assigneesForFilter = false;
        state.loading.assigneesForFilter = true;
        state.assigneesForFilter = payload;
      })
      .addCase(getAssigneesForFilter.rejected, (state, { payload }) => {
        state.success.assigneesForFilter = false;
        state.loading.assigneesForFilter = false;
        state.error = payload;
      })
      .addCase(getCreatedByForFilter.pending, (state) => {
        state.success.createdByForFilter = false;
        state.loading.createdByForFilter = true;
        state.error = null;
      })
      .addCase(getCreatedByForFilter.fulfilled, (state, { payload }) => {
        state.success.createdByForFilter = false;
        state.loading.createdByForFilter = true;
        state.createdByForFilter = payload;
      })
      .addCase(getCreatedByForFilter.rejected, (state, { payload }) => {
        state.success.createdByForFilter = false;
        state.loading.createdByForFilter = false;
        state.error = payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.success.projects = false;
        state.loading.projects = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, { payload }) => {
        state.success.projects = false;
        state.loading.projects = true;
        state.projects = payload;
      })
      .addCase(getProjects.rejected, (state, { payload }) => {
        state.success.projects = false;
        state.loading.projects = false;
        state.error = payload;
      })
      .addCase(getSubtasks.pending, (state, action) => {
        const uuid = action.meta.arg.uuid;
        state.loading.subtasks[uuid] = true;
        state.success.subtasks[uuid] = false;
        state.error = null;
      })
      .addCase(getSubtasks.fulfilled, (state, { payload, meta }) => {
        const uuid = meta.arg.uuid;
        state.subtasks[uuid] = payload;
        state.loading.subtasks[uuid] = false;
        state.success.subtasks[uuid] = true;
      })
      .addCase(getSubtasks.rejected, (state, action) => {
        const uuid = action.meta.arg.uuid;
        state.loading.subtasks[uuid] = false;
        state.success.subtasks[uuid] = false;
        state.error = action.payload;
      })
      .addCase(getCustomerData.pending, (state) => {
        state.loading.customerData = true;
        state.success.customerData = false;
        state.error = null;
      })
      .addCase(getCustomerData.fulfilled, (state, { payload }) => {
        state.loading.customerData = false;
        state.success.customerData = true;
        state.customerData = payload;
      })
      .addCase(getCustomerData.rejected, (state, { payload }) => {
        state.loading.customerData = false;
        state.success.customerData = false;
        state.customerData = null;
        state.error = payload;
      })
      .addCase(getAppointmentContext.pending, (state) => {
        state.loading.appointmentContext = true;
        state.success.appointmentContext = false;
      })
      .addCase(getAppointmentContext.fulfilled, (state, { payload }) => {
        state.loading.appointmentContext = false;
        state.success.appointmentContext = true;
        state.appointmentContext = payload;
      })
      .addCase(getAppointmentContext.rejected, (state, { payload }) => {
        state.loading.appointmentContext = false;
        state.success.appointmentContext = false;
        state.appointmentContext = null;
        state.error = payload;
      })
      .addCase(getAppointments.pending, (state) => {
        console.log('loading');
      })
      .addCase(getAppointments.fulfilled, (state, { payload }) => {
        state.appointment = payload.data;
      })
      .addCase(getAppointments.rejected, (state, { payload }) => {
        console.log('Error');
      })
      .addCase(getSingleAppointment.pending, (state) => {
        state.loading.singleAppointment = true;
        state.error = null;
      })
      .addCase(getSingleAppointment.fulfilled, (state, { payload }) => {
        state.loading.singleAppointment = false;
        state.singleAppointment = payload.ticket;
      })
      .addCase(getSingleAppointment.rejected, (state, { payload }) => {
        state.loading.singleAppointment = false;
        state.error = payload;
      });
  },
});

export const {
  setCurrentPage,
  setProjectManagementSearchData,
  resetSuccess,
  deleteFilterKeys,
  setSubtasksPage,
  updateTicketStatus,
  setTicketJustClosed,
  clearTicketJustClosed,
} = projectManagementSlice.actions;

export const selectLoading = (state) => state.projectManagement.loading;
export const selectSuccess = (state) => state.projectManagement.success;
export const selectTickets = (state) => state.projectManagement.tickets;
export const selectTicketType = (state) => state.projectManagement.ticketCart;

export const selectSingleTicket = (state) => state.projectManagement.singleTicket;
export const selectTotalPages = (state) => state.projectManagement.totalPages;
export const selectTotalPagesList = (state) => state.projectManagement.totalPagesList;

export const selectCurrentPage = (state) => state.projectManagement.currentPage;
export const selectTicketsSearchData = (state) => state.projectManagement.searchData;
export const selectCount = (state) => state.projectManagement.count;
export const selectCountList = (state) => state.projectManagement.countList;

export const selectTicketAssignTypes = (state) => state.projectManagement.ticketAssignTypes;
export const selectProjectsForFilter = (state) => state.projectManagement.projectsForFilter;
export const selectSubprojectsForFilter = (state) =>
  state.projectManagement.subprojectsForFilter;
export const selectAssigneesForFilter = (state) => state.projectManagement.assigneesForFilter;
export const selectCreatedByForFilter = (state) => state.projectManagement.createdByForFilter;
export const selectProjects = (state) => state.projectManagement.projects;
export const selectSubtasksByUUID = (state, uuid) =>
  state.projectManagement.subtasks[uuid] || [];
export const selectSubtasksLoading = (state, uuid) =>
  state.projectManagement.loading.subtasks[uuid] || false;
export const selectSubtaskPageByUUID = (state, uuid) =>
  state.projectManagement.subtasksPagination[uuid]?.page || 1;
export const selectTicketJustClosed = (state) => state.projectManagement.ticketJustClosed;
export const selectCustomerData = (state) => state.projectManagement.customerData;
export const selectCustomerDataLoading = (state) =>
  state.projectManagement.loading.customerData;
export const selectAppointmentContext = (state) => state.projectManagement.appointmentContext;
export const selectAppointmentContextLoading = (state) =>
  state.projectManagement.loading.appointmentContext;
export const projectManagementError = (state) => state.projectManagement.error;
export default projectManagementSlice.reducer;

//appointments

export const selectAppointment = (state) => state.projectManagement.appointment;
export const selectSingleAppointment = (state) => state.projectManagement.singleAppointment;
