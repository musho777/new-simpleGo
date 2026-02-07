import { forwardRef } from 'react';

import { SwitchContainer, SwitchWrapper, Toggle } from './Switch.styles';

const Switch = forwardRef(({ isOn, onToggle, disabled }, ref) => (
  <SwitchContainer onClick={disabled ? undefined : onToggle} ref={ref} $disabled={disabled}>
    <SwitchWrapper $isOn={isOn}>
      <Toggle $isOn={isOn} />
    </SwitchWrapper>
  </SwitchContainer>
));

export default Switch;
