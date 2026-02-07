import { Link } from 'react-router-dom';

import styled from 'styled-components';
import theme from 'styles/theme';

export const SidebarContainer = styled.div`
  background-color: ${theme.colors.primary};
  width: ${(props) => (props.$collapsed ? '80px' : '250px')};
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-right: 18px;

  .mt-mb {
    margin: 30px 0 30px 30px;
  }
  .collaps-logo {
    margin: 30px auto 30px 18px;
  }
  .close-icon {
    align-self: end;
  }

  .w-261 {
    max-width: 140px;
  }

  @media (max-width: 1300px) {
    display: ${(props) => (props.$showNavbar ? 'flex' : 'none')};
    z-index: 999999;
    position: absolute;
    padding-bottom: 100px;
    min-height: 100vh;
  }
`;

export const CloseWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: end;
  margin-left: 20px;
  @media (min-width: 1300px) {
    display: none;
  }
`;

export const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  color: ${(props) => (props.$active ? `${theme.colors.orange}` : `${theme.colors.white}`)};
  background-color: ${(props) =>
    !props.$active ? `${theme.colors.primary}` : `${theme.colors.white}`};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease-in-out;
  padding-left: 28px;
  width: 100%;
  height: 50px;
  text-decoration: none;
  border-radius: ${(props) => (props.$submenu ? '10px' : '0 10px 10px 0')};
  justify-content: space-between;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  padding-right: 10px;
  margin-right: ${(props) => props.$collapsed && '-5px'};
  opacity: ${(props) => (props.$disabled ? '0.5' : '1')};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${(props) =>
      props.$disabled
        ? `${theme.colors.primary}`
        : props.$collapsed
          ? '#ff6a001a'
          : theme.colors.white};
    color: ${(props) => (props.$disabled ? `${theme.colors.white}` : theme.colors.orange)};
  }
`;

export const SidebarItemWrapper = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

export const IconWrapper = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

export const Icon = styled.img`
  color: red;
`;

export const Span = styled.span`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
`;

export const SubmenuContainer = styled.div`
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  padding-left: 40px;
  gap: 18px;
  margin-top: 8px;

  .submenu-icon-depth-1 {
    margin-left: 26px;
  }
`;
export const Collapse = styled.div`
  position: absolute;
  right: -15px;
  top: 70px;
  z-index: 1;
`;
export const ArrowWrapper = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #4f6381;
  cursor: pointer;
  background: #1d3557;
  box-shadow: 0px 3px 10px 0px #0000002b;

  &:active {
    background: #2c4a72;
  }

  &:hover {
    background: #4f6381;
  }
`;

export const NavbarTooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NavbarTooltip = styled.div`
  position: absolute;
  z-index: 999999999;
  left: 80px;
  color: #ff6a00;
  background: white;
  min-width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
  border-radius: 0 10px 10px 0;
  fill: rgba(255, 106, 0, 0.1);
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.15));
`;

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  padding-bottom: 20px;
  gap: 7px;
`;

export const LogoWrapper = styled.div`
  flex-shrink: 0;
`;
