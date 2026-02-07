import styled from 'styled-components';

export const Container = styled.div`
  padding: 25px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #1d3557;
  margin-bottom: 4px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 24px;
  font-weight: 500;
`;

export const BoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 102px 40px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 22px 0px rgba(108, 117, 125, 0.25);
  max-width: 929px;
`;

export const BoxItem = styled.div`
  flex: 1;
  max-width: 263px;
  min-height: 137px;
  border: 2px dashed #1d3557;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(45, 108, 223, 0.2);
    border-color: #2d6cdf;
  }
`;

export const IconWrapper = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
  color: ${({ color }) => color};
`;

export const Label = styled.div`
  font-size: 14px;
  color: #333333;
  font-weight: 500;
  text-align: center;
  padding: 0 10px;
`;
