export const SYSTEM_USERS = [
  'Hr Manager',
  'General Manager',
  'Accounting Staff',
  'Legal Staff',
];

export const USERS_PAYROLL_PERMISSIONS = [
  'Hr Manager',
  'Super Admin',
  'General Manager',
  'Accounting Staff',
  'Department Head',
];

export const USERS = ['Department Head', 'Branch Head', 'Team Lead', 'Team Member'];

export const USER_STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'disable', label: 'Disable' },
];

export const EMPLOYEE_RETURN_STATUS = [
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Declined', label: 'Declined' },
];

export const STATUS_OPTIONS = [
  { value: 'All statuses', label: 'All statuses' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'active', label: 'Active' },
];

export const OCCUPATION_OPTIONS = [
  { uuid: 'Customer Support', name: 'Customer Support' },
  { uuid: 'Sales', name: 'Sales' },
  { uuid: 'Development', name: 'Development' },
  { uuid: 'Management', name: 'Management' },
  { uuid: 'Network Engineer', name: 'Network Engineer' },
  { uuid: 'System Engineer', name: 'System Engineer' },
  { uuid: 'Տնօրեն', name: 'Տնօրեն' },
  { uuid: 'Իրավաբան', name: 'Իրավաբան' },
  { uuid: 'Վաճառքի գծով պատասխանատու', name: 'Վաճառքի գծով պատասխանատու' },
  { uuid: 'Գլխավոր պահեստապետ', name: 'Գլխավոր պահեստապետ' },
  { uuid: 'Գլխավոր հաշվապահ', name: 'Գլխավոր հաշվապահ' },
  { uuid: 'Անվտանգության աշխատակից', name: 'Անվտանգության աշխատակից' },
];

export const USER_ADDITIONAL_INFO = {
  occupation: [
    { value: 'Customer Support', label: 'Customer Support' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Development', label: 'Development' },
    { value: 'Management', label: 'Management' },
    { value: 'Network Engineer', label: 'Network Engineer' },
    { value: 'System Engineer', label: 'System Engineer' },
    { value: 'Տնօրեն', label: 'Տնօրեն' },
    { value: 'Իրավաբան', label: 'Իրավաբան' },
    { value: 'Վաճառքի գծով պատասխանատու', label: 'Վաճառքի գծով պատասխանատու' },
    { value: 'Գլխավոր պահեստապետ', label: 'Գլխավոր պահեստապետ' },
    { value: 'Գլխավոր հաշվապահ', label: 'Գլխավոր հաշվապահ' },
    { value: 'Անվտանգության աշխատակից', label: 'Անվտանգության աշխատակից' },
  ],
  commission: [
    { value: 'Fixed Salary', label: 'Fixed Salary' },
    { value: 'Weekly Pay', label: 'Weekly Pay' },
    { value: 'Hourly Pay', label: 'Hourly Pay' },
  ],
  holidays: [
    { value: 'Armenian Holidays', label: 'Armenian Holidays' },
    { value: 'Russian Holidays', label: 'Russian Holidays' },
    { value: 'US Holidays', label: 'US Holidays' },
  ],
  officeLocation: [
    { value: 'Armenian Office', label: 'Armenian Office' },
    { value: 'ny_office', label: 'New York Office' },
    { value: 'sf_office', label: 'San Francisco Office' },
    { value: 'remote', label: 'Remote' },
  ],
  timezone: [
    { value: 'est', label: 'EST' },
    { value: 'pst', label: 'PST' },
    { value: 'gmt', label: 'GMT' },
  ],
};

export const SALARY_TYPE = [
  { label: 'Fixed Salary', value: 'Fixed Salary' },
  { label: 'Hourly Rate', value: 'Hourly Rate' },
];

export const CURRENCY = [
  { label: 'AMD', value: 'AMD' },
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
];
export const OUT_COME_TYPE = [
  { label: 'None', value: 'none' },
  { label: 'Initial', value: 'initial' },
  { label: 'Converted', value: 'converted' },
  { label: 'Lost', value: 'lost' },
];

export const ARCHIVE_PATHS = {
  '/archive/departments': 'departments',
  '/archive/branches': 'branches',
  '/archive/teams': 'teams',
  '/archive/users': 'users',
};

export const MANAGEMENT_TYPE = [
  { label: 'Waterfall', value: 'Waterfall' },
  { label: 'Agile', value: 'Agile' },
  { label: 'Scrum', value: 'Scrum' },
  { label: 'Kanban', value: 'Kanban' },
];

export const SUBPROJECT_TYPE = [
  { label: 'Activity', value: 'Activity' },
  { label: 'Campaign', value: 'Campaign' },
  { label: 'Operational', value: 'Operational' },
];

export const TICKET_TRACKER_OPTIONS = [
  { label: 'Task', value: 'Task' },
  { label: 'Bug', value: 'Bug' },
  { label: 'Feature', value: 'Feature' },
  { label: 'Suggestion', value: 'Suggestion' },
  { label: 'Support', value: 'Support' },
];

export const TICKET_STATUS_OPTIONS = [
  { label: 'To Do', value: 'To Do' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Closed', value: 'Closed' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Reopen', value: 'Reopen' },
];

export const TICKET_PROGRESS_OPTIONS = [
  { label: '0 %', value: '0' },
  { label: '10 %', value: 10 },
  { label: '20 %', value: 20 },
  { label: '30 %', value: 30 },
  { label: '40 %', value: 40 },
  { label: '50 %', value: 50 },
  { label: '60 %', value: 60 },
  { label: '70 %', value: 70 },
  { label: '80 %', value: 80 },
  { label: '90 %', value: 90 },
  { label: '100 %', value: 100 },
];

export const BILLING_STATUS = [
  { value: 'All statuses', label: 'Բոլորը' },
  { value: '0', label: 'Ակտիվ' },
  { value: '1', label: 'Անջատում' },
  { value: '2', label: 'Անջատված' },
  { value: '3', label: 'Փակված' },
  { value: '4', label: 'Կասեցված' },
  { value: '5', label: 'Միացման մեջ' },
  { value: '6', label: 'Միացված չէ)' },
  { value: '7', label: 'Վճարված չէ' },
  { value: '8', label: 'Վերականգնված' },
];

export const TICKET_PRIORITY_OPTIONS = [
  { label: 'Low', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'High', value: 3 },
  { label: 'Urgent', value: 4 },
];

export const TAG_PRIORITY_TYPES = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Urgent' };

export const TAG_STATUS_TYPES = {
  0: 'Ակտիվ',
  1: 'Անջատում',
  2: 'Անջատված',
  3: 'Փակված',
  4: 'Կասեցված',
  5: 'Միացման մեջ',
  6: 'Միացված չէ',
  7: 'Վճարված չէ',
  8: 'Վերականգնված',
};

export const TICKET_APPOINTMENT_SERVICE_OPTIONS = [
  { label: 'Connection', value: 'Connection' },
  { label: 'Termination', value: 'Termination' },
  { label: 'Suspension', value: 'Suspension' },
  { label: 'Service Change', value: 'Service Change' },
  { label: 'Compliant', value: 'Compliant' },
  { label: 'Inquiry', value: 'Inquiry' },
];

export const TICKET_APPOINTMENT_DURATION_OPTIONS = [
  { label: '10 minutes', value: '10' },
  { label: '20 minutes', value: '20' },
  { label: '30 minutes', value: '30' },
  { label: '40 minutes', value: '40' },
  { label: '50 minutes', value: '50' },
  { label: '1 hour', value: '60' },
];

export const TICKET_APPOINTMENT_REMINDER_OPTIONS = [
  { label: 'Never', value: 'null' },
  { label: '15 minutes', value: '15' },
  { label: '30 minutes', value: '30' },
  { label: '40 minutes', value: '45' },
  { label: '1 hour', value: '60' },
  { label: '12 hour', value: '720' },
  { label: '24 hour', value: '1440' },
];

export const TICKET_APPOINTMENT_FREQUENCY_OPTIONS = [
  { label: 'One time', value: 'One-time' },
  { label: 'Daily', value: 'Daily' },
  { label: 'Weekly', value: 'Weekly' },
  { label: 'Monthly', value: 'Monthly' },
];

export const TICKET_APPOINTMENT_WEEKDAY_OPTIONS = [
  { label: 'Sunday', value: '0' },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
];

export const LIFESPAN_OPTIONS = [
  {
    label: 'Single use',
    value: 'Single use',
  },
  {
    label: 'Reusable',
    value: 'Reusable',
  },
];

export const USAGE_OPTIONS = [
  {
    label: 'Personal use',
    value: 'Personal use',
  },
  {
    label: 'Service use',
    value: 'Service use',
  },
];

export const REQUEST_ITEM_STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'available', label: 'Available' },
  { value: 'unavailable', label: 'Unavailable' },
];

export const LEAD_TYPE = [
  { value: 'B2B', label: 'B2B' },
  { value: 'B2C', label: 'B2C' },
];
export const DIRECTION_TYPE = [
  { value: 'inbound', label: 'Inbound' },
  { value: 'outbound', label: 'Outbound' },
];

export const LEAD_STATE = [
  { value: 'subscriber', label: 'Subscriber' },
  { value: 'former_subscriber', label: 'Former Subscriber' },
  { value: 'free_address', label: 'Free Address' },
];

export const CURRENCY_OPTIONS = [
  { value: 'AMD', label: 'AMD' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'RUB', label: 'RUB' },
];

export const UNIT_OPTIONS = [
  { value: 'Metre', label: 'Metre' },
  { value: 'Kg', label: 'Kg' },
  { value: 'Liter', label: 'Liter' },
  { value: 'Unit', label: 'Unit' },
  { value: 'Box', label: 'Box' },
];

export const STATUS_OPTIONS_REQUEST_HISTORY = [
  { label: 'All', value: '' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Pending', value: 'pending' },
  { label: 'Awaiting Receipt Confirmation', value: 'awaiting_receipt_confirmation' },
  { label: 'Receipt Declined', value: 'receipt_declined' },
];

export const FINANCE_REQUEST_ACCOUNTING_TYPE_OPTIONS = [
  { value: 'Operational Expenses', label: 'Operational Expenses' },
  { value: 'Capital Expenditures', label: 'Capital Expenditures' },
  { value: 'Rent', label: 'Rent' },
  { value: 'Salaries', label: 'Salaries' },
  { value: 'Returns / Payments', label: 'Returns / Payments' },
];

export const FINANCE_REQUEST_CURRENCY_OPTIONS = [
  { value: 'AMD', label: 'AMD' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'RUB', label: 'RUB' },
];

export const FINANCE_REQUEST_FREQUENCY_OPTIONS = [
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Quarterly', label: 'Quarterly' },
  { value: 'Yearly', label: 'Yearly' },
];

export const FINANCE_REQUEST_FLOW_TYPE_OPTIONS = [
  { value: 'Expense', label: 'Expense' },
  { value: 'Income', label: 'Income' },
];

export const FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS = [
  { value: 'Variable', label: 'Variable' },
  { value: 'Semi-Variable', label: 'Semi-Variable' },
  { value: 'Fixed', label: 'Fixed' },
];

export const FINANCE_REQUEST_PAYMENT_METHOD_OPTIONS = [
  { value: 'Transfer', label: 'Transfer to Account' },
  { value: 'Cash', label: 'Cash' },
];

export const FlowTypeEnum = {
  INCOME: 'Income',
  EXPENSE: 'Expense',
};

export const ExpenseTypeEnum = {
  VARIABLE: 'Variable',
  SEMI_VARIABLE: 'Semi-Variable',
  FIXED: 'Fixed',
};

export const AccountingTypeEnum = {
  OPERATIONAL_EXPENSES: 'Operational Expenses',
  CAPITAL_EXPENDITURES: 'Capital Expenditures',
  RENT: 'Rent',
  SALARIES: 'Salaries',
  RETURNS_PAYMENTS: 'Returns / Payments',
};

export const CurrencyEnum = {
  AMD: 'AMD',
  USD: 'USD',
  EUR: 'EUR',
  RUB: 'RUB',
};

export const FinancialRequestStatusEnum = {
  PENDING_APPROVAL: 'Pending Approval',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  COMPLETED: 'Completed',
  SEEN: 'Seen',
};

export const FINANCE_REQUEST_STATUS_OPTIONS = [
  { value: 'Pending Approval', label: 'Pending Approval' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Seen', label: 'Seen' },
];

export const CHART_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#8dd1e1',
  '#d084d0',
  '#87d068',
  '#ffb347',
  '#ff6b6b',
  '#4ecdc4',
];

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
