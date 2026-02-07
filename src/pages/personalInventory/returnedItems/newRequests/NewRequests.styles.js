import styled from 'styled-components';

export const ApproveOrReject = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 16px 0;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const RequestCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  > button {
    width: max-content;
  }
`;

export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
