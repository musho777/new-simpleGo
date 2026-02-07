import styled from 'styled-components';
import theme from 'styles/theme';

export const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 13px;

  button {
    max-width: 101px;
  }
`;

export const Old = styled.div`
  color: #6c757d;
  font-weight: 500;
`;

export const Change = styled.div`
  color: #2d6cdf;
  font-weight: 600;
`;

export const Icon = styled.img``;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: start;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const WarningSpan = styled.span`
  color: ${theme.colors.danger};
  margin-left: 5px;
`;
