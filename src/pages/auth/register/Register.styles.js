import styled from 'styled-components';
import theme from 'styles/theme';

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

export const Content = styled.div`
  max-width: 248px;
  width: 100%;
  height: 100%;

  img {
    margin-bottom: 41px;
  }

  h1 {
    margin-bottom: 13px;
  }

  p {
    margin-bottom: 33px;
  }
`;
