import styled, { css } from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  height: 25px;
  position: ${({ $relative }) => $relative && 'relative'};
  width: ${({ $isMobile }) => ($isMobile ? 'inherit' : '50px')};
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
  top: 23px;
  background-color: white;
  padding: 13px;
  z-index: 99999;
  width: 200px;
  box-sizing: border-box;
  border-radius: 8px 0 8px 8px;

  ${(props) =>
    props.$grid
      ? css`
          left: 0;
          border-radius: 0px 8px 8px 8px;
        `
      : css`
          right: 0;
          border-radius: 8px 0 8px 8px;
        `}
`;

export const Option = styled.div`
  display: flex;
  height: 32px;
  padding-left: 5px;
  padding-right: 19px;
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

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InfoLabel = styled.p`
  font-family: Nunito;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #212529;
  margin: 0 0 8px 0;
  word-wrap: break-word;
`;

export const InfoValue = styled.span`
  font-family: Nunito;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #6c757d;
  word-wrap: break-word;
`;

export const InputWrapper = styled.div`
  margin: 20px 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 50%;
  }
`;

export const TableWrapper = styled.div``;
