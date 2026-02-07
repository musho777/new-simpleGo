import { useState } from 'react';

import { Icon, SwitchButton, SwitchContainer } from './Switch.styles';
import Grid from './grid.svg';
import List from './list.svg';
import Table from './table.svg';

const Switch = ({ onSwitch, value = 'list', page }) => {
  const [selected, setSelected] = useState(value);

  const handleSwitch = (view) => {
    setSelected(view);
    onSwitch(view);
  };

  return (
    <SwitchContainer>
      <SwitchButton $active={selected === 'list'} onClick={() => handleSwitch('list')}>
        <Icon alt="list" src={List} />
      </SwitchButton>

      <SwitchButton $active={selected === 'grid'} onClick={() => handleSwitch('grid')}>
        <Icon alt="grid" src={Grid} />
      </SwitchButton>

      {page !== 'users' && (
        <SwitchButton $active={selected === 'table'} onClick={() => handleSwitch('table')}>
          <Icon alt="table" src={Table} />
        </SwitchButton>
      )}
    </SwitchContainer>
  );
};

export default Switch;
