import { Suspense, lazy } from 'react';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Loading from 'common-ui/loading';
import LeadLockGuard from 'components/LeadLock/LeadLockGuard';
import BillingRoute from 'modules/billing/route/BillingRoute';
import ErpRoute from 'modules/erp/route/ErpRoute';
import Forget from 'pages/auth/forget';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import ProfileLayout from 'pages/components/profileLayout';
import CustomerManagement from 'pages/customerManagement/CustomerManagement';
import singleCustomer from 'pages/customerManagement/singleCustomer';
import EmployeeInventory from 'pages/inventory/employeeInventory';
import ByEmployee from 'pages/inventory/returnedItems/byEmployee/ByEmployee';
import PendingReturnRequests from 'pages/inventory/returnedItems/byEmployee/pendingReturnRequests/PendingReturnRequests';
import NotFound from 'pages/notFound';
import ReturnedItemsLayout from 'pages/personalInventory/returnedItems/returnedItemsLayout';
import Appointments from 'pages/projectManagement/appointments';
import CreateEditAppointments from 'pages/projectManagement/createEditAppointments';
import SingleAppointments from 'pages/projectManagement/singleAppointments';
// import { RequestHistoryTab, ReturnedByMe } from 'pages/personalInventory/requestHistory';
import SalesPage from 'pages/sales/Sales';
import leadSinglePage from 'pages/sales/leadsTable';
import ProductSinglePage from 'pages/sales/productSinglePage';
import SalesLead from 'pages/sales/salesLead';
import { SearchByPhone } from 'pages/sales/salesLead/SearchByPhone';
import SalesDashboard from 'pages/sales/salesReport';
import Sales from 'pages/settings/sales/salesSalary';
import AssignOffer from 'pages/settings/sales/salesSalary/assignOffer';
import AssignSources from 'pages/settings/sales/salesSalary/assignSources';
import ImportLead from 'pages/settings/sales/salesSalary/importLead';
import LeadSource from 'pages/settings/sales/salesSalary/leadSource';
import LeadVisibility from 'pages/settings/sales/salesSalary/leadVisibility';
import NextContactRules from 'pages/settings/sales/salesSalary/nextContactRules';
import Offers from 'pages/settings/sales/salesSalary/offer';
import Products from 'pages/settings/sales/salesSalary/product';
import SalesScript from 'pages/settings/sales/salesSalary/salesScript';
import UserPrivilege from 'pages/settings/sales/salesSalary/userPrivilege';
import WorkflowStatus from 'pages/settings/sales/salesSalary/workflowStatus';
import PaymentReport from 'pages/statement/PaymentReport/PaymentReport';

import PrivateRoute from './PrivateRoute';

const Dashboard = lazy(() => import('pages/dashboard'));
const UserManagement = lazy(() => import('pages/userManagement'));
const Departments = lazy(() => import('pages/departments'));
const Branches = lazy(() => import('pages/branches'));
const ProjectTypes = lazy(() => import('pages/project/types'));
const Projects = lazy(() => import('pages/project/projects'));
const TeamManagement = lazy(() => import('pages/teamManagement'));
const TeamMembership = lazy(() => import('pages/teamManagement/membership'));
const AssignToProject = lazy(() => import('pages/project/projects/assign'));
const Teams = lazy(() => import('pages/teams'));
const Settings = lazy(() => import('pages/settings'));
const Archive = lazy(() => import('pages/archive'));
const ProfileNew = lazy(() => import('pages/profile/updates/new'));
const ProfileUpdate = lazy(() => import('pages/profile/updates/updated'));
const PersonalInfoEdit = lazy(() => import('pages/profile/personalInfoEdit'));
const AdditionalInfoEdit = lazy(() => import('pages/profile/additionalInfoEdit'));
const Contacts = lazy(() => import('pages/profile/contacts'));
const SchedulesProfile = lazy(() => import('pages/profile/schedule'));
const ContactsEdit = lazy(() => import('pages/profile/contactsEdit'));
const Addresses = lazy(() => import('pages/profile/addresses'));
const AddressesEdit = lazy(() => import('pages/profile/addressesEdit'));
const Languages = lazy(() => import('pages/profile/languages'));
const LanguagesEdit = lazy(() => import('pages/profile/languagesEdit'));
const Skills = lazy(() => import('pages/profile/skills'));
const SkillsEdit = lazy(() => import('pages/profile/skillsEdit'));
const CreateEditTicket = lazy(() => import('pages/projectManagement/createEditTicket'));
const Tickets = lazy(() => import('pages/projectManagement/tickets'));
const ProjectManagement = lazy(() => import('pages/projectManagement'));
const SingleTicketView = lazy(() => import('pages/projectManagement/singleTicketView'));
const Schedules = lazy(() => import('pages/settings/schedules'));
const AttendancePolicy = lazy(() => import('pages/settings/attendancePolicy'));
const PayrollReport = lazy(() => import('pages/reports/payroll'));
const Inventory = lazy(() => import('pages/inventory'));
const InventorySinglePage = lazy(() => import('pages/inventory/categorySinglePage'));

const ProfileInventory = lazy(() => import('pages/personalInventory/Inventory'));
const PersonalRequests = lazy(() => import('pages/personalInventory/personalRequests'));
const EmployeeInventoryDetail = lazy(() => import('pages/inventory/employeeInventoryDetail'));
const ReturnedItems = lazy(() => import('pages/inventory/returnedItems'));
const EmployeesHoldingItemPage = lazy(
  () => import('pages/inventory/returnedItems/employeesHoldingItem/EmployeesHoldingItem')
);
const InventoryRequests = lazy(() => import('pages/inventory/newRequests'));
const InventoryRequestHistory = lazy(() => import('pages/inventory/requestHistory'));
const ItemLocationTracking = lazy(() => import('pages/inventory/itemLocationTracking'));
const MyTemplates = lazy(() => import('pages/personalInventory/myTemplates'));
const NewReturnedRequests = lazy(
  () => import('pages/personalInventory/returnedItems/newRequests/NewRequests')
);
const RequestHistoryTab = lazy(
  () => import('pages/personalInventory/returnedItems/RequestHistoryTab')
);
const ReturnedByMe = lazy(
  () => import('pages/personalInventory/returnedItems/returnedByMe/ReturnedByMe')
);
const Finance = lazy(() => import('pages/finance/Finance'));
const FinanceReportsDiagrams = lazy(
  () => import('pages/finance/financeReports/diagrams/FinanceReportsDiagrams')
);
const SingleFinanceView = lazy(() => import('pages/finance/singleFinanceView'));
const Quiz = lazy(() => import('pages/quiz/categories'));
const SubCategories = lazy(() => import('pages/quiz/subcategories'));
const Quizzes = lazy(() => import('pages/quiz/quizzes'));
const QuizQuestions = lazy(() => import('pages/quiz/quizQuestions'));
const QuizComplete = lazy(() => import('pages/quiz/quizComplete'));
const AddQuestion = lazy(() => import('pages/quiz/addQuestion'));
const UsersQuizHistory = lazy(() => import('pages/quiz/usersQuizHistory'));
const QuizAttemptHistory = lazy(() => import('pages/quiz/quizAttemptHistory'));
const AllUsersQuizHistory = lazy(() => import('pages/quiz/allUsersQuizHistory'));
const AttemptDetails = lazy(() => import('pages/quiz/attemptDetails'));

const SuspendedComponent = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register/:token" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/new-password/:token" element={<Forget />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route
          path="/"
          element={<PrivateRoute>{SuspendedComponent(Dashboard)}</PrivateRoute>}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute>{SuspendedComponent(Dashboard)}</PrivateRoute>}
        />
        <Route
          path="/user-management"
          element={<PrivateRoute>{SuspendedComponent(UserManagement)}</PrivateRoute>}
        />
        <Route
          path="/departments"
          element={<PrivateRoute>{SuspendedComponent(Departments)}</PrivateRoute>}
        />
        <Route
          path="/project/types"
          element={<PrivateRoute>{SuspendedComponent(ProjectTypes)}</PrivateRoute>}
        />
        <Route
          path="/project/types/sub"
          element={<PrivateRoute>{SuspendedComponent(ProjectTypes)}</PrivateRoute>}
        />
        <Route
          path="/project/projects"
          element={<PrivateRoute>{SuspendedComponent(Projects)}</PrivateRoute>}
        />
        <Route
          path="/project/projects/sub"
          element={<PrivateRoute>{SuspendedComponent(Projects)}</PrivateRoute>}
        />
        <Route
          path="/project/projects/assign"
          element={<PrivateRoute>{SuspendedComponent(AssignToProject)}</PrivateRoute>}
        />
        <Route
          path="/project/projects/sub/assign"
          element={<PrivateRoute>{SuspendedComponent(AssignToProject)}</PrivateRoute>}
        />
        <Route
          path="/team-management"
          element={<PrivateRoute>{SuspendedComponent(TeamManagement)}</PrivateRoute>}
        />
        <Route
          path="/team-management/membership"
          element={<PrivateRoute>{SuspendedComponent(TeamMembership)}</PrivateRoute>}
        />
        <Route
          path="/departments/branches"
          element={<PrivateRoute>{SuspendedComponent(Branches)}</PrivateRoute>}
        />
        <Route
          path="/departments/branches/:uuid"
          element={<PrivateRoute>{SuspendedComponent(Branches)}</PrivateRoute>}
        />
        <Route
          path="/departments/branches/teams"
          element={<PrivateRoute>{SuspendedComponent(Teams)}</PrivateRoute>}
        />
        <Route
          path="/departments/branches/teams/:uuid"
          element={<PrivateRoute>{SuspendedComponent(Teams)}</PrivateRoute>}
        />
        <Route
          path="/settings"
          element={<PrivateRoute>{SuspendedComponent(Settings)}</PrivateRoute>}
        />
        <Route
          path="/settings/schedules"
          element={<PrivateRoute>{SuspendedComponent(Schedules)}</PrivateRoute>}
        />
        <Route
          path="/settings/sales-salary/*"
          element={<PrivateRoute>{SuspendedComponent(Sales)}</PrivateRoute>}
        >
          <Route path="lead-source" element={SuspendedComponent(LeadSource)} />
          <Route path="sales-script" element={SuspendedComponent(SalesScript)} />
          <Route path="product" element={SuspendedComponent(Products)} />
          <Route path="offers" element={SuspendedComponent(Offers)} />
          <Route path="workflow-statuses" element={SuspendedComponent(WorkflowStatus)} />
          <Route path="user-privilege" element={SuspendedComponent(UserPrivilege)} />
          <Route path="assign-offer" element={SuspendedComponent(AssignOffer)} />
          <Route path="assign-sources" element={SuspendedComponent(AssignSources)} />
          <Route path="import-lead" element={SuspendedComponent(ImportLead)} />
          <Route path="lead-visibility" element={SuspendedComponent(LeadVisibility)} />
          <Route path="next-contact-rules" element={SuspendedComponent(NextContactRules)} />

          <Route index element={<Navigate to="lead-source" replace />} />
        </Route>

        <Route
          path="/settings/attendance-policy"
          element={<PrivateRoute>{SuspendedComponent(AttendancePolicy)}</PrivateRoute>}
        />
        <Route
          path="/archive/departments"
          element={<PrivateRoute>{SuspendedComponent(Archive)}</PrivateRoute>}
        />
        <Route
          path="/archive/branches"
          element={<PrivateRoute>{SuspendedComponent(Archive)}</PrivateRoute>}
        />
        <Route
          path="/archive/teams"
          element={<PrivateRoute>{SuspendedComponent(Archive)}</PrivateRoute>}
        />
        <Route
          path="/archive/users"
          element={<PrivateRoute>{SuspendedComponent(Archive)}</PrivateRoute>}
        />
        <Route
          path="/project-management/tickets/create-edit"
          element={<PrivateRoute>{SuspendedComponent(CreateEditTicket)}</PrivateRoute>}
        />
        <Route
          path="/project-management/tickets/create-edit/:uuid"
          element={<PrivateRoute>{SuspendedComponent(CreateEditTicket)}</PrivateRoute>}
        />
        <Route
          path="/project-management"
          element={<PrivateRoute>{SuspendedComponent(ProjectManagement)}</PrivateRoute>}
        />
        <Route
          path="/project-management/tickets"
          element={<PrivateRoute>{SuspendedComponent(Tickets)}</PrivateRoute>}
        />
        <Route
          path="/project-management/tickets/:uuid"
          element={<PrivateRoute>{SuspendedComponent(Tickets)}</PrivateRoute>}
        />
        <Route
          path="/project-management/ticket/:uuid"
          element={<PrivateRoute>{SuspendedComponent(SingleTicketView)}</PrivateRoute>}
        />

        {/* crmAppointments */}

        <Route
          path="/project-management/appointment/create-edit"
          element={<PrivateRoute>{SuspendedComponent(CreateEditAppointments)}</PrivateRoute>}
        />
        {/* <Route
          path="/project-management/appointment/create-edit/:uuid"
          element={<PrivateRoute>{SuspendedComponent(CreateEditTicket)}</PrivateRoute>}
        /> */}

        <Route
          path="/project-management/appointment"
          element={<PrivateRoute>{SuspendedComponent(Appointments)}</PrivateRoute>}
        />
        {/* <Route
          path="/project-management/appointment/:uuid"
          element={<PrivateRoute>{SuspendedComponent(Tickets)}</PrivateRoute>}
        /> */}
        <Route
          path="/project-management/appointment/:uuid"
          element={<PrivateRoute>{SuspendedComponent(SingleAppointments)}</PrivateRoute>}
        />

        {/*Reports */}
        <Route
          path="/reports/payroll"
          element={<PrivateRoute>{SuspendedComponent(PayrollReport)}</PrivateRoute>}
        />
        {/* Inventory */}
        <Route
          path="/inventory/categories"
          element={<PrivateRoute>{SuspendedComponent(Inventory)}</PrivateRoute>}
        />
        <Route
          path="/inventory/categories/:uuid"
          element={<PrivateRoute>{SuspendedComponent(InventorySinglePage)}</PrivateRoute>}
        />
        <Route
          path="/inventory/request-history"
          element={<PrivateRoute>{SuspendedComponent(InventoryRequestHistory)}</PrivateRoute>}
        />
        <Route
          path="/inventory/request-history/awaiting"
          element={<PrivateRoute>{SuspendedComponent(InventoryRequestHistory)}</PrivateRoute>}
        />
        <Route
          path="/inventory/request-history/pending"
          element={<PrivateRoute>{SuspendedComponent(InventoryRequests)}</PrivateRoute>}
        />
        <Route
          path="/inventory/employee-inventory"
          element={<PrivateRoute>{SuspendedComponent(EmployeeInventory)}</PrivateRoute>}
        />
        <Route
          path="/inventory/employee-inventory/:employeeId"
          element={<PrivateRoute>{SuspendedComponent(EmployeeInventoryDetail)}</PrivateRoute>}
        />
        <Route
          path="/inventory/returnedItems"
          element={<PrivateRoute>{SuspendedComponent(ReturnedItems)}</PrivateRoute>}
        />
        <Route
          path="/inventory/returnedItems/employees-holding"
          element={<PrivateRoute>{SuspendedComponent(EmployeesHoldingItemPage)}</PrivateRoute>}
        />
        <Route
          path="/inventory/returnedItems/employee"
          element={<PrivateRoute>{SuspendedComponent(ByEmployee)}</PrivateRoute>}
        />
        <Route
          path="/inventory/returnedItems/employee/pending"
          element={<PrivateRoute>{SuspendedComponent(PendingReturnRequests)}</PrivateRoute>}
        />
        <Route
          path="/inventory/items/:itemTypeUuid/location-tracking"
          element={<PrivateRoute>{SuspendedComponent(ItemLocationTracking)}</PrivateRoute>}
        />
        {/* Sales */}
        <Route
          path="/sales"
          element={<PrivateRoute>{SuspendedComponent(SalesPage)}</PrivateRoute>}
        />

        {/* Sales Dashboard */}
        <Route
          path="/sales/report"
          element={<PrivateRoute>{SuspendedComponent(SalesDashboard)}</PrivateRoute>}
        />

        {/* Products Single Page */}
        <Route
          path="/products/:projectId"
          element={<PrivateRoute>{SuspendedComponent(ProductSinglePage)}</PrivateRoute>}
        />

        {/* Lead */}
        <Route
          path="/lead-single-page/:subprojectId"
          element={<PrivateRoute>{SuspendedComponent(leadSinglePage)}</PrivateRoute>}
        />

        <Route
          path="/sales/search-lead"
          element={<PrivateRoute>{SuspendedComponent(SearchByPhone)}</PrivateRoute>}
        />
        <Route
          path="/leads/:leadId"
          element={
            <PrivateRoute>
              <LeadLockGuard>{SuspendedComponent(SalesLead)}</LeadLockGuard>
            </PrivateRoute>
          }
        />

        {/*Profile routes */}
        <Route
          path="/profile/new/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(ProfileNew)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/updates/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(ProfileUpdate)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/personal-info/edit"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(PersonalInfoEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/personal-info/edit/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(PersonalInfoEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/additional-info/edit/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(AdditionalInfoEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/contacts"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Contacts)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/contacts/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Contacts)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/contacts/edit"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(ContactsEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/contacts/edit/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(ContactsEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/addresses"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Addresses)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/addresses/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Addresses)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/addresses/edit"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(AddressesEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/addresses/edit/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(AddressesEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/languages"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Languages)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/languages/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Languages)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/skills"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Skills)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/skills/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(Skills)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/skills/edit"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(SkillsEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/skills/edit/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(SkillsEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/languages/edit"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(LanguagesEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/languages/edit/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(LanguagesEdit)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/schedule/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(SchedulesProfile)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/schedule"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(SchedulesProfile)}</ProfileLayout>
            </PrivateRoute>
          }
        />
        {/*Personal inventory routes */}
        <Route
          path="/personal/inventory"
          element={<PrivateRoute>{SuspendedComponent(ProfileInventory)}</PrivateRoute>}
        />
        <Route
          path="/personal/inventory/:uuid"
          element={<PrivateRoute>{SuspendedComponent(ProfileInventory)}</PrivateRoute>}
        />

        <Route
          path="/personal/inventory/returned-item/request-history"
          element={
            <PrivateRoute>
              <ReturnedItemsLayout>
                {SuspendedComponent(RequestHistoryTab)}
              </ReturnedItemsLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/personal/inventory/returned-item/new-requests"
          element={
            <PrivateRoute>
              <ReturnedItemsLayout>
                {SuspendedComponent(NewReturnedRequests)}
              </ReturnedItemsLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/personal/inventory/returned-item/returned-by-me"
          element={
            <PrivateRoute>
              <ReturnedItemsLayout>{SuspendedComponent(ReturnedByMe)}</ReturnedItemsLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/personal/inventory/request-history/:uuid"
          element={
            <PrivateRoute>
              <ProfileLayout>{SuspendedComponent(ProfileInventory)}</ProfileLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/personal/inventory/my-templates"
          element={<PrivateRoute>{SuspendedComponent(MyTemplates)}</PrivateRoute>}
        />

        <Route
          path="/personal-requests"
          element={<PrivateRoute>{SuspendedComponent(PersonalRequests)}</PrivateRoute>}
        />
        <Route
          path="/personal-requests/:uuid"
          element={<PrivateRoute>{SuspendedComponent(PersonalRequests)}</PrivateRoute>}
        />
        <Route
          path="/personal-requests/awaiting"
          element={<PrivateRoute>{SuspendedComponent(PersonalRequests)}</PrivateRoute>}
        />
        <Route
          path="/finance-request"
          element={<PrivateRoute>{SuspendedComponent(Finance)}</PrivateRoute>}
        />
        <Route
          path="/finance-reports"
          element={<PrivateRoute>{SuspendedComponent(Finance)}</PrivateRoute>}
        />
        <Route
          path="/finance-reports/diagrams"
          element={<PrivateRoute>{SuspendedComponent(FinanceReportsDiagrams)}</PrivateRoute>}
        />
        <Route
          path="/finance/finance-request/:uuid"
          element={<PrivateRoute>{SuspendedComponent(SingleFinanceView)}</PrivateRoute>}
        />
        <Route
          path="/finance/finance-report/:uuid"
          element={<PrivateRoute>{SuspendedComponent(SingleFinanceView)}</PrivateRoute>}
        />
        <Route
          path="/quiz"
          element={<PrivateRoute>{SuspendedComponent(Quiz)}</PrivateRoute>}
        />
        <Route
          path="/quiz/category/:categoryUuid"
          element={<PrivateRoute>{SuspendedComponent(SubCategories)}</PrivateRoute>}
        />
        <Route
          path="/quiz/category/:categoryUuid/subcategory/:subcategoryUuid"
          element={<PrivateRoute>{SuspendedComponent(Quizzes)}</PrivateRoute>}
        />
        <Route
          path="/quiz/category/:categoryUuid/subcategory/:subcategoryUuid/quiz/:quizUuid"
          element={<PrivateRoute>{SuspendedComponent(QuizQuestions)}</PrivateRoute>}
        />
        <Route
          path="/quiz/category/:categoryUuid/subcategory/:subcategoryUuid/quiz/:quizUuid/complete"
          element={<PrivateRoute>{SuspendedComponent(QuizComplete)}</PrivateRoute>}
        />
        <Route
          path="/quiz/category/:categoryUuid/subcategory/:subcategoryUuid/quiz/:quizUuid/add-question"
          element={<PrivateRoute>{SuspendedComponent(AddQuestion)}</PrivateRoute>}
        />
        <Route
          path="/quiz/category/:categoryUuid/subcategory/:subcategoryUuid/quiz/:quizUuid/history"
          element={<PrivateRoute>{SuspendedComponent(QuizAttemptHistory)}</PrivateRoute>}
        />
        <Route
          path="/quiz/category/:categoryUuid/subcategory/:subcategoryUuid/quiz/:quizUuid/all-users-history"
          element={<PrivateRoute>{SuspendedComponent(AllUsersQuizHistory)}</PrivateRoute>}
        />
        <Route
          path="/quiz/attempt/:attemptUuid"
          element={<PrivateRoute>{SuspendedComponent(AttemptDetails)}</PrivateRoute>}
        />
        <Route
          path="/quiz/users-history"
          element={<PrivateRoute>{SuspendedComponent(UsersQuizHistory)}</PrivateRoute>}
        />

        <Route
          path="/customer-relationship-management"
          element={<PrivateRoute>{SuspendedComponent(CustomerManagement)}</PrivateRoute>}
        />
        <Route
          path="/customer-relationship-management/:customerId"
          element={<PrivateRoute>{SuspendedComponent(singleCustomer)}</PrivateRoute>}
        />

        {/* Statment */}

        <Route
          path="/statement/payment-report"
          element={<PrivateRoute>{SuspendedComponent(PaymentReport)}</PrivateRoute>}
        />
        <Route
          path="/statement/subscribers"
          element={<PrivateRoute>{SuspendedComponent(singleCustomer)}</PrivateRoute>}
        />

        <Route path="*" element={<Navigate to="/not-found" replace />} />
        {BillingRoute()}
        {ErpRoute()}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
