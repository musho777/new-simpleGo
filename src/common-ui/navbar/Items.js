import Inventory from 'assets/Inventory.svg';
import InventoryActive from 'assets/InventoryActive.svg';
import BillingIconActive from 'assets/billing/billing-active.svg';
import BillingIcon from 'assets/billing/billing.svg';
import ArchiveIconActive from 'assets/dashboard/archive-active.svg';
import ArchiveIcon from 'assets/dashboard/archive.svg';
import DashboardIconActive from 'assets/dashboard/dashboard-active.svg';
import DashboardIcon from 'assets/dashboard/dashboard.svg';
import DepartmentsIconActive from 'assets/dashboard/department-active.svg';
import DepartmentsIcon from 'assets/dashboard/department.svg';
import FinanceIconActive from 'assets/dashboard/finance-active.svg';
import FinanceIcon from 'assets/dashboard/finance.svg';
import ManagementActive from 'assets/dashboard/management-active.svg';
import Management from 'assets/dashboard/management.svg';
import ProjectsIconActive from 'assets/dashboard/project-active.svg';
import ProjectManagementIconActive from 'assets/dashboard/project-management-active.svg';
import ProjectManagementIcon from 'assets/dashboard/project-management.svg';
import ProjectsIcon from 'assets/dashboard/project.svg';
import ReportsIconActive from 'assets/dashboard/reports-active.svg';
import ReportsIcon from 'assets/dashboard/reports.svg';
import SettingsIconActive from 'assets/dashboard/settings-active.svg';
import SettingsIcon from 'assets/dashboard/settings.svg';
import UserIconActive from 'assets/dashboard/user-active.svg';
import UserIcon from 'assets/dashboard/user.svg';
import Sales from 'assets/sales.svg';
import SalesActive from 'assets/salesActive.svg';
import { SYSTEM_USERS } from 'constants/constants';

const userType = localStorage.getItem('userType');

const settingsToPath =
  userType === 'Hr Manager' ? '/settings/schedules' : '/settings/sales-salary';

const hasAccess = (roles = []) => roles.includes('*') || roles.includes(userType);

const archiveSubmenu = [
  {
    name: 'Departments',
    route: '/archive/departments',
    roles: ['Super Admin', 'Hr Manager', 'Department Head', ...SYSTEM_USERS],
  },
  {
    name: 'Branches',
    route: '/archive/branches',
    roles: ['Super Admin', 'Hr Manager', 'Branch Head', 'Department Head', ...SYSTEM_USERS],
  },
  {
    name: 'Teams',
    route: '/archive/teams',
    roles: [
      'Super Admin',
      'Hr Manager',
      'Team Lead',
      'Branch Head',
      'Department Head',
      ...SYSTEM_USERS,
    ],
  },
  {
    name: 'Users',
    route: '/archive/users',
    roles: ['Super Admin', 'Hr Manager', ...SYSTEM_USERS],
  },
];

const archiveDefaultTo =
  archiveSubmenu.find((item) => hasAccess(item.roles))?.route ?? '/archive/departments';

export const SIDEBAR_ITEMS = [
  {
    name: 'Dashboard',
    icons: { default: DashboardIcon, active: DashboardIconActive },
    route: '/dashboard',
    roles: ['*'],
  },
  {
    name: 'User Management',
    icons: { default: UserIcon, active: UserIconActive },
    route: '/user-management?limit=10&offset=0&view=list',
    roles: ['*'],
  },
  {
    name: 'Project Management',
    icons: { default: ProjectManagementIcon, active: ProjectManagementIconActive },
    route: '/project-management',
    roles: ['*'],
    submenu: [
      {
        name: 'Tickets',
        route: ['/project-management/tickets', '/project-management/ticket'],
        roles: ['*'],
      },
      {
        name: 'Appointments',
        route: ['/project-management/appointment'],
        roles: ['*'],
      },
    ],
  },
  {
    name: 'Archive',
    route: '/archive',
    to: archiveDefaultTo,
    icons: { default: ArchiveIcon, active: ArchiveIconActive },
    roles: [
      'Super Admin',
      'Hr Manager',
      'Team Lead',
      'Department Head',
      'Branch Head',
      ...SYSTEM_USERS,
    ],
    submenu: archiveSubmenu,
  },
  {
    name: 'Departments',
    route: '/departments',
    icons: { default: DepartmentsIcon, active: DepartmentsIconActive },
    roles: ['Super Admin', 'Hr Manager', 'Department Head', ...SYSTEM_USERS],
    submenu: [
      {
        name: 'Branches',
        route: '/departments/branches',
        roles: ['Super Admin', 'Hr Manager', 'Branch Head', ...SYSTEM_USERS],
        submenu: [
          {
            name: 'Teams',
            route: '/departments/branches/teams',
            roles: ['Super Admin', 'Hr Manager', 'Team Lead', ...SYSTEM_USERS],
          },
        ],
      },
    ],
  },
  {
    name: 'Branches',
    route: '/departments/branches',
    roles: ['Branch Head'],

    icons: { default: DepartmentsIcon, active: DepartmentsIconActive },
  },
  {
    name: 'Teams',
    route: '/departments/branches/teams',
    roles: ['Team Lead'],
    icons: { default: DepartmentsIcon, active: DepartmentsIconActive },
  },
  {
    name: 'Projects',
    to: '/project/types',
    route: '/project/',
    icons: { default: ProjectsIcon, active: ProjectsIconActive },
    roles: ['Super Admin', 'Hr Manager', ...SYSTEM_USERS],
    submenu: [
      { name: 'Projects', route: '/project/projects', roles: ['*'] },
      { name: 'Types', route: '/project/types', roles: ['*'] },
    ],
  },
  {
    name: 'Teams',
    icons: { default: Management, active: ManagementActive },
    route: '/team-management',
    roles: ['Super Admin', 'Hr Manager', ...SYSTEM_USERS],
  },
  // {
  //   name: 'Billing Reports',
  //   icons: { default: BillingIcon, active: BillingIconActive },
  //   route: '/billing',
  //   to: '/billing/subscribers',
  //   roles: ['Super Admin'],
  //   submenu: [
  //     { name: `Subscriber's`, route: '/billing/subscribers', roles: ['Super Admin'] },
  //     { name: 'Payment', route: '/billing/payment', roles: ['Super Admin'] },
  //     { name: 'Request', route: '/billing/request', roles: ['Super Admin'] },
  //     { name: 'Comparison', route: '/billing/comparison', roles: ['Super Admin'] },
  //     { name: 'Daily', route: '/billing/daily', roles: ['Super Admin'] },
  //     { name: 'Export', route: '/billing/export', roles: ['Super Admin'] },
  //     { name: 'B2C', route: '/billing/b2c', roles: ['Super Admin'] },
  //     { name: 'B2B', route: '/billing/b2b', roles: ['Super Admin'] },
  //     {
  //       name: 'Marketing Reports',
  //       route: '/billing/marketingReports',
  //       roles: ['Super Admin'],
  //     },
  //   ],
  // },
  {
    name: 'Statement',
    to: '/statement/payment-report',
    icons: { default: BillingIcon, active: BillingIconActive },
    route: '/statement/payment-report',
    roles: ['Super Admin', 'Hr Manager', 'General Manager'],
    submenu: [
      {
        name: 'Payment Report',
        route: '/statement/payment-report',
        roles: ['General Manager', 'Super Admin', 'Hr Manager'],
      },
      {
        name: 'Subscribers',
        route: '/statement/subscribers',
        roles: ['General Manager', 'Super Admin', 'Hr Manager'],
      },
    ],
  },
  {
    name: 'Settings',
    to: '/settings/schedules',
    icons: { default: SettingsIcon, active: SettingsIconActive },
    route: '/settings',
    roles: ['Super Admin', 'Hr Manager', 'General Manager'],
    submenu: [
      {
        name: 'Schedules',
        route: '/settings/schedules',
        roles: ['General Manager', 'Super Admin', 'Hr Manager'],
      },
      {
        name: 'Sales Settings',
        route: '/settings/sales-salary',
        roles: ['General Manager', 'Super Admin', 'Hr Manager'],
      },
    ],
  },
  {
    name: 'Reports',
    icons: { default: ReportsIcon, active: ReportsIconActive },
    route: '/reports',
    to: '/reports/payroll',
    roles: ['*'],
    submenu: [{ name: 'Payroll report', route: '/reports/payroll', roles: ['*'] }],
  },
  {
    name: 'Inventory',
    icons: { default: Inventory, active: InventoryActive },
    route: '/inventory',
    to: '/inventory/categories?view=table',
    roles: ['Super Admin', 'General Manager', 'Department Head'],
    submenu: [
      {
        name: 'Categories',
        route: '/inventory/categories',
        roles: ['General Manager', 'Super Admin'],
      },
      {
        name: 'Request history',
        route: '/inventory/request-history',
        roles: ['Super Admin', 'General Manager', 'Department Head'],
      },
      {
        name: 'Employee Inventory',
        route: '/inventory/employee-inventory',
        roles: ['Super Admin', 'General Manager', 'Department Head'],
      },
      {
        name: 'Returned Items',
        route: '/inventory/returnedItems',
        roles: ['Super Admin', 'General Manager', 'Department Head'],
      },
    ],
  },
  {
    name: 'Sales',
    icons: { default: Sales, active: SalesActive },
    route: '/sales',
    to: '/sales',
    roles: ['*'],
    submenu: [
      {
        name: 'Add Lead',
        route: '/sales/search-lead',
        roles: ['*'],
      },
      {
        name: 'Report',
        route: '/sales/report',
        roles: ['Super Admin', 'General Manager', 'Department Head', 'Hr Manager'],
      },
    ],
  },
  {
    name: 'Finance Request',
    icons: { default: FinanceIcon, active: FinanceIconActive },
    route: '/finance-request',
    to: '/finance-request',
    roles: ['*'],
  },
  {
    name: 'CRM',
    icons: { default: FinanceIcon, active: FinanceIconActive },
    route: '/customer-relationship-management',
    to: '/customer-relationship-management',
    roles: ['*'],
  },
  // {
  //   name: 'ERP',
  //   icons: { default: ReportsIcon, active: ReportsIconActive },
  //   route: '/erp',
  //   to: '/erp/subscriber',
  //   roles: ['Super Admin', 'General Manager', 'Department Head'],
  //   submenu: [
  //     {
  //       name: 'Բաժանորդի ստեղծում',
  //       route: '/erp/subscriber',
  //       roles: ['Super Admin', 'General Manager', 'Department Head'],
  //     },
  //     {
  //       name: 'Հասցեների ավելացում',
  //       route: '/erp/addresses',
  //       roles: ['Super Admin', 'General Manager', 'Department Head'],
  //     },
  //   ],
  // },
  {
    name: 'Quiz',
    icons: { default: ReportsIcon, active: ReportsIconActive },
    route: '/quiz',
    roles: ['*'],
  },
];
