import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ModalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 40px;
  input {
    width: 60px;
    padding: 0 10px;
  }
`;

export const ModalLabel = styled.label`
  color: #212529;
  font-family: Nunito;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  > span {
    color: #6c757d;
  }
`;
