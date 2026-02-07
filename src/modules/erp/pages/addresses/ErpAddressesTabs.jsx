import { NavLink, Outlet, useLocation } from 'react-router-dom';

import {
  ErpAddressesContainer,
  ErpAddressesTabsStyled,
  TabButton,
  TabContent,
  Title,
} from './ErpAddressesTabs.styles';

const tabs = [
  { name: 'Երկիր', path: 'country' },
  { name: 'Շրջան', path: 'region' },
  { name: 'Քաղաք/Գյուղ', path: 'city-village' },
  { name: 'Փողոց', path: 'street' },
  { name: 'Վարչական շրջանը', path: 'administrative-district' },
  { name: 'Շենք/տուն', path: 'building-house' },
];

const ErpAddressesTabs = () => {
  const { pathname } = useLocation();

  return (
    <ErpAddressesContainer>
      <Title>Հասցեներ</Title>
      <ErpAddressesTabsStyled>
        {tabs.map(({ name, path }) => (
          <TabButton
            key={path}
            as={NavLink}
            to={`/erp/addresses/${path}`}
            $active={pathname.includes(path)}
          >
            {name}
          </TabButton>
        ))}
      </ErpAddressesTabsStyled>
      <TabContent>
        <Outlet />
      </TabContent>
    </ErpAddressesContainer>
  );
};

export default ErpAddressesTabs;
