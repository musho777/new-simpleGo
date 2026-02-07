import styled from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionIcon = styled.img``;

export const DeleteModalContent = styled.div``;

export const DeleteModalText = styled.p`
  font-family: Nunito;
  font-weight: 400;
  font-style: Regular;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  margin-bottom: 30px;
  margin-top: 10px;
  text-align: center;
  color: #6c757d;
`;

export const DeleteModalButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  > button {
    width: fit-content;
  }
`;
