import { useLocation, useNavigate } from 'react-router-dom';

import { NavContainer, Row, TabButton } from './Navigation.styles';

const Navigation = ({ tabs }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActiveTab = (tabPath) => {
    const currentUrl = `${location.pathname}${location.search}`;
    return currentUrl === tabPath;
  };

  return (
    <Row>
      <NavContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            $isActive={isActiveTab(tab.path)}
            onClick={() => handleTabClick(tab.path)}
          >
            {tab.name}
          </TabButton>
        ))}
      </NavContainer>
    </Row>
  );
};

export default Navigation;
