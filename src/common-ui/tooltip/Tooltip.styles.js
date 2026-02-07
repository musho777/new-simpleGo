import styled from 'styled-components';

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 18px;
  margin-left: 2px;
`;

export const TooltipIcon = styled.img`
  cursor: pointer;
`;

export const TooltipText = styled.div`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s;

  position: absolute;
  top: -6px;
  left: 50%;
  transform: translate(-50%, -100%);

  background-color: #f4a261;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  white-space: ${({ $isMobile }) => ($isMobile ? 'inherit' : 'nowrap')};
  font-size: 14px;
  z-index: 10;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
