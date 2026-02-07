import PropTypes from 'prop-types';

import { NavContainer, Row, TabButton } from './TabButtons.styles';

const TabButtons = ({ tabs, activeTab, onTabChange }) => {
  const handleTabClick = (tabName, disabled) => {
    if (disabled) return;
    onTabChange(tabName);
  };

  return (
    <Row>
      <NavContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            $isActive={activeTab === tab.name}
            onClick={() => handleTabClick(tab.name, tab.disabled)}
            disabled={tab.disabled}
          >
            {tab.name}
          </TabButton>
        ))}
      </NavContainer>
    </Row>
  );
};

TabButtons.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default TabButtons;
