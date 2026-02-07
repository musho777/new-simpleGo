import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Text = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }
`;
