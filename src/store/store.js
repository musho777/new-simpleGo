import { configureStore } from '@reduxjs/toolkit';

import archiveReducer from 'features/archive/archiveSlice';
import authReducer from 'features/auth/authSlice.js';
import branchesReducer from 'features/branches/branchesSlice.js';
import componentsReducer from 'features/components/componentsSlice';
import customersReducer from 'features/customers/customersSlice';
import departmentsReducer from 'features/departments/departmentsSlice.js';
import financeRequestReducer from 'features/financeRequest/financeRequestSlice';
import inventoryReducer from 'features/inventory/inventorySlice';
import notificationsReducer from 'features/notifications/notificationsSlice';
import profileReducer from 'features/profile/profileSlice';
import projectManagementReducer from 'features/projectManagement/ProjectManagementSlice';
import projectsReducer from 'features/projects/projectsSlice';
import quizReducer from 'features/quiz/quizSlice';
import regionsReducer from 'features/regions/regionsSlice';
import reportsReducer from 'features/reports/reportsSlice';
import leadLockReducer from 'features/sales/leadLockSlice';
import salesReducer from 'features/sales/salesSlice';
import schedulesReducer from 'features/schedules/scheduleSlice';
import statementReducer from 'features/statement/statementSlice';
import teamManagementReducer from 'features/teamManagement/teamManagementSlice';
import teamsReducer from 'features/teams/teamsSlice';
import usersReducer from 'features/users/usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: departmentsReducer,
    branches: branchesReducer,
    teams: teamsReducer,
    users: usersReducer,
    customers: customersReducer,
    archive: archiveReducer,
    regions: regionsReducer,
    components: componentsReducer,
    profile: profileReducer,
    projects: projectsReducer,
    teamManagement: teamManagementReducer,
    projectManagement: projectManagementReducer,
    notifications: notificationsReducer,
    schedules: schedulesReducer,
    reports: reportsReducer,
    inventory: inventoryReducer,
    sales: salesReducer,
    leadLock: leadLockReducer,
    financeRequest: financeRequestReducer,
    quiz: quizReducer,
    statement: statementReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
