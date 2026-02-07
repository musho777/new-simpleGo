import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  width: ${theme.widths.full};
  max-width: ${({ $maxWidth }) => ($maxWidth ? `${$maxWidth}px` : `${theme.widths.authForm}`)};
  gap: ${theme.spacing.large};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.large};
`;

export const Description = styled.p`
  color: ${theme.colors.secondaryText};
  line-height: ${theme.typography.lineHeight.medium};
  font-size: ${theme.typography.fontSize.formDesc};
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  .mt-13 {
    margin-top: 13px;
  }
`;

export const SuccessContainer = styled.div`
  box-shadow: ${theme.shadows.medium};
  border-radius: ${theme.borders.radius};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  width: 100%;
  min-height: 422px;
`;

export const Icon = styled.img``;

export const ResponseError = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: rgba(230, 57, 70, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: 17px;

  color: #e63946;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`;
