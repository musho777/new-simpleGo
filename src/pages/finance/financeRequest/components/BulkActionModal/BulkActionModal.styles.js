import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1d3557;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    margin: 0;
    color: #2d6cdf;
    font-size: 14px;
  }
`;
