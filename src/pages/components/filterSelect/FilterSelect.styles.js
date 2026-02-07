import styled from 'styled-components';
import theme from 'styles/theme';

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 173px;
`;

export const SelectedValue = styled.div`
  padding: 8px 11px;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? '#2D6CDF' : '#D4D8DD')};
  font-size: 12px;
  color: ${theme.colors.primaryText};
  border-radius: 10px;
  background-color: ${theme.colors.white};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  font-weight: 600;

  ${({ $isActive }) =>
    $isActive &&
    `
      background-color: #2d6cdf1a;
      color: #2d6cdf;
      border-color: #2d6cdf;
    `}
`;

export const IconContainer = styled.img`
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const ViewTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  margin-right: 4px;
`;
