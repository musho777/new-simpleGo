import styled from 'styled-components';
import theme from 'styles/theme';

export const SwitchContainer = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const SwitchWrapper = styled.div`
  width: 37px;
  height: 20px;
  background-color: ${({ $isOn }) =>
    $isOn ? theme.colors.secondary : theme.colors.borderColor};
  border-radius: 100px;
  padding: 2px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
`;

export const Toggle = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${theme.colors.white};
  border-radius: 100px;
  transform: ${({ $isOn }) => ($isOn ? 'translateX(18px)' : 'translateX(1px)')};
  transition: transform 0.3s;
`;
