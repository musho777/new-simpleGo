import styled from 'styled-components';
import theme from 'styles/theme';

export const ForgetLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: ${theme.colors.secondaryText};
  font-size: ${theme.typography.fontSize.medium};
  line-height: ${theme.typography.lineHeight.large};
  font-weight: ${theme.typography.fontWeight.bold};
`;
