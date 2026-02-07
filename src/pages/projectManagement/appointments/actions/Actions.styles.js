import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  height: 25px;
  position: ${({ $relative }) => $relative && 'relative'};
  width: ${({ $isMobile }) => ($isMobile ? 'inherit' : '30px')};
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'flex')};
  justify-content: center;
  align-items: center;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    filter: drop-shadow(0px 0 16px rgba(0, 0, 0, 0.16));
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-color: white;
    border-radius: 8px 8px 0 0;
  `};
`;

export const Icon = styled.img``;

export const Dropdown = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background-color: white;
  border-radius: 8px 0 8px 8px;
  padding: 13px;
  z-index: 999;
  max-width: calc(100vw - 20px);
  box-sizing: border-box;
`;

export const Option = styled.div`
  display: flex;
  width: 93px;
  height: 32px;
  padding: 12px 19px 12px 5px;
  align-items: center;
  gap: 9px;
  color: #212529;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  margin-bottom: 4px;

  &:hover {
    background-color: #dfdfdfdf;
    border-radius: 8px;
  }
`;
