import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Navigation from 'modules/billing/components/navigation';
import { selectIsSecurityModalOpen } from 'modules/billing/features/main/mainSlice';

import { NavWrapper, ViewContainer } from './MarketingReports.styles';

const MarketingReports = () => {
  const TABS = [
    { name: 'Ակտիվ բաժանորդ', path: `/billing/marketingReports` },
    { name: 'Ակտիվից պասիվ', path: `/billing/marketingReports/active-to-inactive` },
    { name: 'Պասիվից ակտիվ', path: `/billing/marketingReports/passive-to-active` },
    {
      name: 'Վճարած բաժանորդներ',
      path: `/billing/marketingReports/daily-payments`,
    },
    { name: 'Պասիվ բաժանորդներ', path: `/billing/marketingReports/inactive` },
    { name: 'հրաժարված բաժանորդներ', path: `/billing/marketingReports/unsubscribed` },
  ];
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);
  if (!securityModalOpen)
    return (
      <ViewContainer>
        <NavWrapper>
          <Navigation className="nav" tabs={TABS} />
        </NavWrapper>
        <div>
          <Outlet />
        </div>
      </ViewContainer>
    );
};

export default MarketingReports;
