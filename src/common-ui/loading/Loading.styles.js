import styled, { keyframes } from 'styled-components';
import theme from 'styles/theme';

const loading = keyframes`
  0% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1.75);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 517px;
  min-height: 332px;
  box-shadow: 0px 0px 22px 0px #00000026;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

export const StyledText = styled.p`
  color: ${theme.colors.secondaryText};
  font-size: ${theme.typography.fontSize.medium};
  line-height: ${theme.typography.lineHeight.large};
`;

export const StyledTextBold = styled.h2`
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.large};
  line-height: ${theme.typography.lineHeight.extraLarge};
  margin-bottom: 30px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 32px;
  margin-bottom: 23px;
`;

export const Circle = styled.div`
  border-radius: 99999999px;
  height: 13px;
  width: 13px;
  background-color: #2d6cdf;

  display: inline-block;
  animation: ${loading} 1s ease-in-out alternate infinite;

  &:nth-child(1) {
    animation-delay: 1s;
  }

  &:nth-child(2) {
    animation-delay: 0.5s;
  }
`;
