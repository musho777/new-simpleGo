import React from 'react';

import { SwitchButton, SwitchWrapper } from './InventorySwitch.styles';

const InventorySwitch = ({ active, setActive }) => {
  return (
    <SwitchWrapper>
      <SwitchButton
        $active={active === 'Personal use'}
        onClick={() => setActive('Personal use')}
      >
        Personal use
      </SwitchButton>
      <SwitchButton
        $active={active === 'Service use'}
        onClick={() => setActive('Service use')}
      >
        Service use
      </SwitchButton>
    </SwitchWrapper>
  );
};

export default InventorySwitch;
