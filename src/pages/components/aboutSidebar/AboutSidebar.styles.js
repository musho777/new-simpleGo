import styled from 'styled-components';
import theme from 'styles/theme';

export const SidebarContainer = styled.div`
  width: 320px;
  min-width: 320px;
  padding: 25px 18px 20px 18px;
  background-color: ${theme.colors.white};
  border-radius: 10px;

  @media (max-width: 1000px) {
    min-width: 170px;
  }

  @media screen and (max-width: 768px) {
    width: 100% !important;
  }
`;

export const SidebarHeader = styled.h2`
  padding-left: 10px;
  margin-bottom: ${({ $hideBorder }) => ($hideBorder ? 'none ' : '15px')};
  font-size: 20px;
  color: ${theme.colors.primaryText};
  line-height: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ $hideBorder }) => ($hideBorder ? 'none ' : '0.5px solid #dfdfdf')};
  padding-bottom: ${({ $hideBorder }) => ($hideBorder ? 'none ' : '15px')};
`;

export const SidebarOption = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 10px;
  margin-bottom: 8px;
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? theme.colors.secondary : theme.colors.primaryText)};
  background-color: ${({ $isActive }) => ($isActive ? '#2d6cdf1a' : 'transparent')};
  border-radius: 10px;
  transition:
    background-color 0.3s,
    color 0.3s;

  border: ${({ $isActive }) => ($isActive ? '0.5px solid #2d6cdf' : 'none')};
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;

  &:hover {
    background-color: #2d6cdf1a;
    color: ${theme.colors.secondary};
  }
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 7px;
`;
