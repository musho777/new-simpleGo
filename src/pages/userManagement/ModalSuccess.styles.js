import styled from 'styled-components';
import theme from 'styles/theme';

export const Description = styled.p`
  color: ${theme.colors.secondaryText};
  line-height: ${theme.typography.lineHeight.medium};
  font-size: ${theme.typography.fontSize.formDesc};
`;

export const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.large};
`;

export const Icon = styled.img``;

export const Content = styled.div`
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 410px;
  height: ${({ $height }) => $height || 'auto'};
  padding: 40px 37px;
  box-shadow: ${theme.shadows.medium};
  border-radius: ${theme.borders.radius};
`;
