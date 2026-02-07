import styled, { css } from 'styled-components';

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 27px;
  width: 100%;
  margin-left: 2px;
  cursor: pointer;
`;

export const TooltipIcon = styled.img`
  cursor: pointer;
`;

export const TooltipText = styled.div`
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s;
  width: 190px;
  max-height: 180px;
  overflow-x: auto;
  position: absolute;
  filter: drop-shadow(0px 3px 16px rgba(0, 0, 0, 0.16));

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 12px;
  border-radius: 10px;
  background-color: #fff;

  z-index: 10;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  ${({ $index }) =>
    $index > 5
      ? css`
          bottom: 100%;
          transform: translate(-15px, -15px);
        `
      : css`
          top: 20px;
          transform: translate(-15px, 15px);
        `}
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: #1d3557;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  word-break: break-word;
`;

export const Span = styled.span`
  color: #212529;
  font-size: 14px;
  font-weight: 500;
  text-decoration-line: underline;
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: flex;
    align-items: center;
  }
`;
