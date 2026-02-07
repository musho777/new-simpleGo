import React from 'react';

import { CheckIcon, CheckboxWrapper } from './MyCheckbox.styles';
import activeIcon from './activeIcon.svg';
import inactiveIcon from './inactiveIcon.svg';

const MyCheckbox = ({ selected, onClick, uuid }) => {
  const handleClick = () => {
    onClick(uuid);
  };

  return (
    <CheckboxWrapper selected={selected} onClick={handleClick}>
      <CheckIcon src={selected ? activeIcon : inactiveIcon} alt="Checkbox Icon" />
    </CheckboxWrapper>
  );
};

export default MyCheckbox;
