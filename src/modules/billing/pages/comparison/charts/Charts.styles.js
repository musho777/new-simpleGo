import styled from 'styled-components';

export const ChartHeader = styled.div`
  background-color: #fff;
  margin: 20px;
`;

export const HeaderTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  padding: 23px 0 19px 30px;
  border-bottom: 0.5px solid #dfdfdf;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: ${({ $isTablet }) => $isTablet && 'column'};
  gap: ${({ $isTablet }) => ($isTablet ? '20px' : '70px')};
  padding: 22px 43px 30px 30px;
`;

export const ChartWrapper = styled.div`
  display: ${({ $isTablet }) => ($isTablet ? 'block' : 'flex')};
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;

export const MonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MonthView = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const MonthColor = styled.div`
  width: 20px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ $isNext }) => ($isNext ? '#ff6a00' : '#2d6cdf')};
`;

export const MonthTitle = styled.span`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
`;
