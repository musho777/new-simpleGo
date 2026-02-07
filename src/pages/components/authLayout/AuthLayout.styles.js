import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Image = styled.img`
  height: ${theme.heights.full};

  @media (max-width: 1000px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  min-height: 100vh;
  width: ${theme.widths.full};

  @media screen and (max-width: 430px) {
    min-height: 95vh;
    padding: 0 16px;
  }
`;

export const Div = styled.div``;

export const TermsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.margins.pageBottom};
  font-size: ${theme.typography.fontSize.small};
`;

export const TermsText = styled.p`
  color: ${theme.colors.secondaryText};
  line-height: ${theme.typography.lineHeight.small};
`;
export const TermsLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeights.bold};
  line-height: ${theme.typography.lineHeight.small};

  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
