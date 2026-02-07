import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  height: 25px;
  position: ${({ $relative }) => $relative && 'relative'};
  width: ${({ $isMobile }) => ($isMobile ? 'inherit' : '30px')};
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'flex')};
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img``;
export const MenuIcon = styled.img`
  width: 20px;
  height: ${({ size }) => size || '20px'};
`;
export const ApproveImg = styled.img`
  width: 20px;
  height: 15px;
`;

export const Dropdown = styled.div`
  position: fixed;
  background-color: white;
  padding: 13px;
  z-index: 99999;
  max-width: calc(100vw - 20px);
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
`;

export const Option = styled.div`
  display: flex;
  width: 140px;
  height: 32px;
  padding-left: 5px;
  padding-right: 19px;
  align-items: center;
  gap: 16px;
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

export const MobileEdit = styled.div`
  display: 'flex';
  gap: 10;
`;
