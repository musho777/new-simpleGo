import styled from 'styled-components';

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 20px 0;
`;

export const ButtonWrapperRequestBack = styled.div`
  display: flex;
  justify-content: flex-end;
  > button {
    width: max-content;
  }
`;
export const RequestCheckBox = styled.div`
  div {
    display: flex;
    justify-content: start;
    background-color: red;
  }
`;

export const Box = styled.div`
  border: 0.4px solid #d4d8dd;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const TableWrapper = styled.div`
  margin-bottom: 24px;
`;

export const ModalItemContainer = styled.div`
  padding: 10px;
`;

export const ModalItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const EmployeeInfo = styled.div`
  flex: 1;
`;

export const EmployeeName = styled.p`
  color: #000;
  font-family: Nunito;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const EmployeeRole = styled.p`
  color: #6c757d;
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const QuantityField = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    width: 100%;
    div {
      width: 100%;
    }
  }
`;

export const FieldLabel = styled.p`
  color: #000;
  font-family: Nunito;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ReasonSection = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    width: 100%;
    textarea {
      width: 100%;
    }
  }
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const InputWrapper = styled.div`
  div {
    min-height: 0;
  }
  input {
    padding: 0px 5px;
    height: 33px;
  }
  @media (max-width: 600px) {
    input {
      width: 100%;
    }
    div {
      width: 100%;
    }
  }
`;

export const TextAreaWrapper = styled.div`
  width: 70%;
  > div {
    min-height: 0;
  }
  .gIXSQu {
    display: none;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 24px;
`;

export const TabContent = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

export const ExpandableWrapper = styled.div`
  border: 0.5px solid #dfdfdf80;
  border-right: none;
  border-left: none;
  padding: 17px 0;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ExpandedLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  word-break: break-word;
`;

export const ExpandedValue = styled.p`
  color: ${({ $highlight }) => ($highlight ? '#E63946' : '#212529')};
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  gap: 12px;
`;

export const MobileRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 600px) {
    width: 80px;
  }
`;

export const Icon = styled.img``;

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
