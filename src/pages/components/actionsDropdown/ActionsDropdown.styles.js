import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 4px;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const Menu = styled.div`
  position: absolute;
  background: white;
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));
  border-radius: 8px;
  padding: 10px;
  z-index: 99999;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const DisableWrapper = styled.div`
  position: absolute;
  background-color: ${theme.colors.white};
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: auto;
`;
