import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${theme.widths.full};
  text-align: center;
  height: 100%;

  img {
  }

  h1 {
    margin-bottom: 30px;
  }
`;

export const Icon = styled.img``;

export const Title = styled.h1`
  font-size: 18px;
  color: ${theme.colors.primaryText};
  font-weight: 500;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  font-size: 16px;
  color: ${theme.colors.secondaryText};
  margin-bottom: 20px;
`;
