import styled from 'styled-components';
import theme from 'styles/theme';

export const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.primary};
  &:hover {
    text-decoration: underline;
  }
`;

export const Icon = styled.img`
  margin-right: 3px;
`;

export const Text = styled.span`
  text-decoration: underline;
`;
