import { Suspense, lazy } from 'react';

import { Route } from 'react-router-dom';

import Loading from 'common-ui/loading';
import PrivateRoute from 'route/PrivateRoute';

import BillingProvider from '../BillingProvider';
import SecurityModal from '../components/securityModal';
import useSecurityCheck from '../hooks/useSecurityCheck';
import B2BReport from '../pages/b2b';
import MarketingReports from '../pages/marketingReports/MarketingReports';
import ActiveSubscribers from '../pages/marketingReports/activeSubscribers/ActiveSubscribers';
import ActiveToInactiveSubscribers from '../pages/marketingReports/activeToInactiveSubscribers/ActiveToInactiveSubscribers';
import DailyPayments from '../pages/marketingReports/dailyPayments/DailyPayments';
import InactiveSubscribers from '../pages/marketingReports/inactiveSubscribers/InactiveSubscribers';
import PassiveToActiveSubscribers from '../pages/marketingReports/passiveToActiveSubscribers/PassiveToActiveSubscribers';
import UnsubscribedSubscribers from '../pages/marketingReports/unsubscribedSubscribers/UnsubscribedSubscribers';

const Subscribers = lazy(() => import('modules/billing/pages/subscribers'));
const Payment = lazy(() => import('modules/billing/pages/payment'));
const Request = lazy(() => import('modules/billing/pages/request'));
const Comparison = lazy(() => import('modules/billing/pages/comparison'));
const Daily = lazy(() => import('modules/billing/pages/daily'));
const Export = lazy(() => import('modules/billing/pages/export'));
const ExportPayment = lazy(() => import('modules/billing/pages/export/exportPayment'));
const B2CReport = lazy(() => import('modules/billing/pages/b2c'));

const BillingWrapper = ({ children }) => {
  const {
    securityModalOpen,
    loading,
    securityValue,
    handleSecurityValueChange,
    handleClickCheckSecurityValue,
    handleCancelModal,
    error,
  } = useSecurityCheck();

  return (
    <>
      <SecurityModal
        isOpen={securityModalOpen}
        onClose={handleCancelModal}
        securityValue={securityValue}
        handleSecurityValueChange={handleSecurityValueChange}
        handleClickCheckSecurityValue={handleClickCheckSecurityValue}
        loading={loading.secret}
        error={error}
        onCancel={handleCancelModal}
      />
      {children}
    </>
  );
};

const BillingModule = (Component) => (
  <Suspense fallback={<Loading />}>
    <BillingProvider>
      <BillingWrapper>
        <Component />
      </BillingWrapper>
    </BillingProvider>
  </Suspense>
);

const BillingRoute = () => [
  <Route
    key="billing-overview"
    path="/billing/subscribers"
    element={<PrivateRoute>{BillingModule(Subscribers)}</PrivateRoute>}
  />,
  <Route
    key="billing-report"
    path="/billing/payment"
    element={<PrivateRoute>{BillingModule(Payment)}</PrivateRoute>}
  />,
  <Route
    key="request-report"
    path="/billing/request"
    element={<PrivateRoute>{BillingModule(Request)}</PrivateRoute>}
  />,
  <Route
    key="comparison-report"
    path="/billing/comparison"
    element={<PrivateRoute>{BillingModule(Comparison)}</PrivateRoute>}
  />,
  <Route
    key="daily-report"
    path="/billing/daily"
    element={<PrivateRoute>{BillingModule(Daily)}</PrivateRoute>}
  />,
  <Route
    key="export-report"
    path="/billing/export"
    element={<PrivateRoute>{BillingModule(Export)}</PrivateRoute>}
  />,
  <Route
    key="export-report-payment"
    path="/billing/export/payment"
    element={<PrivateRoute>{BillingModule(ExportPayment)}</PrivateRoute>}
  />,
  <Route
    key="b2c-report"
    path="/billing/b2c"
    element={<PrivateRoute>{BillingModule(B2CReport)}</PrivateRoute>}
  />,
  <Route
    key="b2b-report"
    path="/billing/b2b"
    element={<PrivateRoute>{BillingModule(B2BReport)}</PrivateRoute>}
  />,
  <Route
    key="b2b-marketingReports"
    path="/billing/marketingReports"
    element={<PrivateRoute>{BillingModule(MarketingReports)}</PrivateRoute>}
  >
    <Route index element={BillingModule(ActiveSubscribers)} />
    <Route path="active-to-inactive" element={BillingModule(ActiveToInactiveSubscribers)} />
    <Route path="passive-to-active" element={BillingModule(PassiveToActiveSubscribers)} />
    <Route path="daily-payments" element={BillingModule(DailyPayments)} />
    <Route path="inactive" element={BillingModule(InactiveSubscribers)} />
    <Route path="unsubscribed" element={BillingModule(UnsubscribedSubscribers)} />
  </Route>,
];

export default BillingRoute;
