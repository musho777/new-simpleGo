import styled from 'styled-components';
import theme from 'styles/theme';

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media screen and (max-width: 768px) {
    gap: 10px;
  }

  @media screen and (max-width: 460px) {
    flex-direction: column-reverse;
    align-items: end;
    gap: 12px;
    width: 100%;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  border: 0.4px solid ${theme.colors.borderColor}80;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    border-radius: 8px;
  }

  @media screen and (max-width: 460px) {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.borderColor} transparent;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.borderColor};
      border-radius: 2px;
    }
  }
`;

export const TabButton = styled.button`
  padding: 13px 25px;
  font-size: 14px;
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.secondary : theme.colors.secondaryText};
  background-color: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '400')};
  text-align: center;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    ${({ disabled }) => !disabled && `color: ${theme.colors.secondary};`}
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 37px;
    height: 3px;
    background-color: ${theme.colors.secondary};
    border-radius: 3px 3px 0px 0px;
    opacity: ${({ $isActive }) => ($isActive ? '1' : '0')};
    transition: opacity 0.3s ease;
  }

  @media screen and (max-width: 1024px) {
    padding: 15px 20px;
    font-size: 13px;

    &::after {
      width: 32px;
      height: 2.5px;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 14px 16px;
    font-size: 12px;

    &::after {
      width: 28px;
      height: 2.5px;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 12px 14px;
    font-size: 11px;

    &::after {
      width: 24px;
      height: 2px;
    }
  }
`;
