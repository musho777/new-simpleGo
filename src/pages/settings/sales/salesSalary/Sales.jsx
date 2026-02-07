import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { SalesContainer, SalesTabs, TabButton, TabContent } from './Sales.styles';

const getTabs = (userType) => {
  const baseTabs = [
    { name: 'Lead Source', path: 'lead-source' },
    { name: 'Sales Script', path: 'sales-script' },
    { name: 'Product', path: 'product' },
    { name: 'Offer', path: 'offers' },
    { name: 'Workflow Statuses', path: 'workflow-statuses' },
    { name: 'User Privilege', path: 'user-privilege' },
    { name: 'Import Lead', path: 'import-lead' },
    { name: 'Lead Visibility Control', path: 'lead-visibility' },
    { name: 'Next Contact Notification Rules', path: 'next-contact-rules' },
  ];

  const managerOnlyTabs = [
    { name: 'Assigning Sources to Subproject', path: 'assign-sources' },
    { name: 'Assigning Offer to Project', path: 'assign-offer' },
  ];

  return userType === 'General Manager' ? [...baseTabs, ...managerOnlyTabs] : baseTabs;
};

const Sales = () => {
  const userType = localStorage.getItem('userType');
  const tabs = getTabs(userType);
  const { pathname } = useLocation();

  const handleTabClick = (e, path) => {
    const isActive = pathname.includes(path);
    if (isActive) {
      e.preventDefault();
    }
  };

  const getTabUrl = (path) => {
    if (path === 'next-contact-rules') {
      return `/settings/sales-salary/${path}?limit=16&page=1`;
    }
    return `/settings/sales-salary/${path}?limit=10&page=1&status=all`;
  };

  return (
    <SalesContainer>
      <SalesTabs>
        {tabs.map(({ name, path }) => (
          <TabButton
            key={path}
            as={NavLink}
            to={getTabUrl(path)}
            onClick={(e) => handleTabClick(e, path)}
            $active={pathname.includes(path)}
          >
            {name}
          </TabButton>
        ))}
      </SalesTabs>
      <TabContent>
        <Outlet />
      </TabContent>
    </SalesContainer>
  );
};

export default Sales;
