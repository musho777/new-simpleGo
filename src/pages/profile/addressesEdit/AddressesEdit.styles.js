import styled from 'styled-components';

export const Tooltip = styled.div`
  position: absolute;
  background-color: #f4a261;
  color: #fff;
  padding: 5px 10px;
  border-radius: 18px;
  font-size: 12px;
  font-weight: 700;
  top: -23px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  white-space: nowrap;
  z-index: 1;
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${Tooltip} {
    opacity: 1;
  }
`;

export const PendingIcon = styled.img`
  cursor: ${({ $eventsOff }) => ($eventsOff ? 'pointer' : 'default')};
`;

export const TrashWrapper = styled.button`
  background: none;
  border: none;
  height: 32px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
