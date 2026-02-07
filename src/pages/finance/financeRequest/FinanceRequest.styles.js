import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  padding: 0px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FilterWrapper = styled.div`
  margin: 20px 0;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  gap: 12px;
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
  min-width: 75px;
`;

export const ExpandedValue = styled.p`
  color: ${({ $highlight }) => ($highlight ? '#E63946' : '#212529')};
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const MobileActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  padding: 8px 0;
`;

export const MobileActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: end;
  padding-right: 16px;
`;

export const ApproveRejectButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  button {
    width: max-content;
  }
`;

export const RejectButton = styled.div`
  button {
    background-color: white;
    color: #e63946;
    border-color: #e63946;
    &:hover {
      background-color: #e63946;
      color: white;
    }
  }
`;
