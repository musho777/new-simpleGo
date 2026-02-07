import { useState } from 'react';

import WarningIconHovered from 'assets/warning-hovered.svg';
import WarningIcon from 'assets/warning.svg';

import { TooltipIcon, TooltipText, TooltipWrapper } from './Tooltip.styles';

const Tooltip = ({ text, isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TooltipIcon src={isHovered ? WarningIconHovered : WarningIcon} alt="warning" />
      <TooltipText $isVisible={isHovered} $isMobile={isMobile}>
        {text}
      </TooltipText>
    </TooltipWrapper>
  );
};

export default Tooltip;
