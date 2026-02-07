import { Suspense, lazy } from 'react';

import { Navigate, Route } from 'react-router-dom';

import PrivateRoute from 'route/PrivateRoute';
import styled from 'styled-components';

import ErpProvider from '../ErpProvider';
import loadingIcon from '../assets/loading.svg';

const Addresses = lazy(() => import('modules/erp/pages/addresses'));
const Country = lazy(() => import('modules/erp/pages/addresses/country'));
const Region = lazy(() => import('modules/erp/pages/addresses/region'));
const City = lazy(() => import('modules/erp/pages/addresses/city'));
const Street = lazy(() => import('modules/erp/pages/addresses/street'));
const AdministrativeDistrict = lazy(
  () => import('modules/erp/pages/addresses/administrativeDistrict')
);
const BuildingHouse = lazy(() => import('modules/erp/pages/addresses/buildingHouse'));

const NewSubscriber = lazy(() => import('modules/erp/pages/subscribers/newSubscriber'));
const EntrepreneurForm = lazy(() => import('modules/erp/pages/subscribers/entrepreneur'));
const IndividualForm = lazy(() => import('modules/erp/pages/subscribers/individual'));
const LegalEntityForm = lazy(() => import('modules/erp/pages/subscribers/legalEntity'));

const SubscriberViewEdit = lazy(
  () => import('modules/erp/pages/subscriberView/SubscriberViewEdit')
);
const IndividualSubscriberView = lazy(
  () => import('modules/erp/pages/subscriberView/IndividualSubscriberView')
);
const LegalEntitySubscriberView = lazy(
  () => import('modules/erp/pages/subscriberView/LegalEntitySubscriberView')
);
const EntrepreneurSubscriberView = lazy(
  () => import('modules/erp/pages/subscriberView/EntrepreneurSubscriberView')
);

const LoadContainer = styled.div`
  width: 100%;
  min-height: 322px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 100px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => (
  <LoadContainer>
    <LoadingIcon src={loadingIcon} alt="Loading..." />
  </LoadContainer>
);

const ErpWrapper = ({ children }) => {
  return <>{children}</>;
};

const SuspendedComponent = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const ErpModule = (Component) => (
  <Suspense fallback={<Loading />}>
    <ErpProvider>
      <ErpWrapper>
        <Component />
      </ErpWrapper>
    </ErpProvider>
  </Suspense>
);

const ErpRoute = () => [
  <Route
    key="erp-subscriber"
    path="/erp/subscriber"
    element={<PrivateRoute>{ErpModule(NewSubscriber)}</PrivateRoute>}
  />,
  <Route
    key="erp-subscriber-individual"
    path="/erp/subscriber/individual"
    element={<PrivateRoute>{ErpModule(IndividualForm)}</PrivateRoute>}
  />,
  <Route
    key="erp-subscriber-entrepreneur"
    path="/erp/subscriber/entrepreneur"
    element={<PrivateRoute>{ErpModule(EntrepreneurForm)}</PrivateRoute>}
  />,
  <Route
    key="erp-subscriber-legal-entity"
    path="/erp/subscriber/legal-entity"
    element={<PrivateRoute>{ErpModule(LegalEntityForm)}</PrivateRoute>}
  />,
  <Route
    key="erp-subscriber-search"
    path="/erp/subscriber/search"
    element={<PrivateRoute>{ErpModule(SubscriberViewEdit)}</PrivateRoute>}
  />,
  <Route
    key="erp-subscriber-individual-view"
    path="/erp/subscriber/:id/individual"
    element={<PrivateRoute>{ErpModule(IndividualSubscriberView)}</PrivateRoute>}
  />,
  <Route
    key="erp-subscriber-legal-entity-view"
    path="/erp/subscriber/:id/legal-entity-view"
    element={<PrivateRoute>{ErpModule(LegalEntitySubscriberView)}</PrivateRoute>}
  />,
  <Route
    key="erp-subscriber-entrepreneur-view"
    path="/erp/subscriber/:id/entrepreneur"
    element={<PrivateRoute>{ErpModule(EntrepreneurSubscriberView)}</PrivateRoute>}
  />,
  <Route
    key="erp-addresses"
    path="/erp/addresses/*"
    element={<PrivateRoute>{ErpModule(Addresses)}</PrivateRoute>}
  >
    <Route path="country" element={SuspendedComponent(Country)} />
    <Route path="region" element={SuspendedComponent(Region)} />
    <Route path="city-village" element={SuspendedComponent(City)} />
    <Route path="street" element={SuspendedComponent(Street)} />
    <Route
      path="administrative-district"
      element={SuspendedComponent(AdministrativeDistrict)}
    />
    <Route path="building-house" element={SuspendedComponent(BuildingHouse)} />
    <Route index element={<Navigate to="country" replace />} />
  </Route>,
];

export default ErpRoute;
