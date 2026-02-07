import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  border-left: 4px solid ${({ $bgColor }) => $bgColor || '#2d6cdf'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const Title = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

export const Number = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #212529;
`;
