import styled from 'styled-components';

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoLabel = styled.p`
  font-family: Nunito;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #212529;
`;

export const InfoValue = styled.span`
  color: #6c757d;
  word-break: break-all;
`;

export const InputSection = styled.div`
  > div {
    min-height: 0;
  }
  input {
    padding: 0 10px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
