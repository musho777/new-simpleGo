import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledText = styled.p`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.medium};
  line-height: ${theme.typography.lineHeight.large};
  font-weight: ${theme.typography.fontWeight.bold};
`;

export const SignInLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: ${theme.typography.fontSize.medium};
  line-height: ${theme.typography.lineHeight.large};
  font-weight: ${theme.typography.fontWeight.bold};
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  padding-top: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 379px;
  width: 100%;
  height: 100%;

  img {
    margin-bottom: 39px;
  }

  h1 {
    margin-bottom: 13px;
  }

  p {
    margin-bottom: 11px;
  }

  button {
    margin-bottom: 3px;
    max-width: 248px !important;
  }
`;

export const ErrorList = styled.ul`
  font-weight: ${theme.typography.fontWeight.semiBold};
  font-size: ${theme.typography.fontSize.small};
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  margin-bottom: ${theme.margins.marginTopSmall};
  color: ${theme.colors.secondaryText};
`;

export const ErrorItem = styled.li`
  line-height: ${theme.typography.lineHeight.medium};
  font-weight: ${theme.typography.fontWeight.regular};
  min-height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
