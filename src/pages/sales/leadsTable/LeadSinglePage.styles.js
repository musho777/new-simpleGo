import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const BackTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1d3557;
  line-height: 9px;
`;

export const BackAction = styled.div`
  display: flex;
  align-items: center;
  width: 117px;
  height: 40px;
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  .h-38 {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  width: fit-content;
  margin: 0 0 20px 0;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  line-height: 9px;
  color: ${({ $active }) => ($active ? 'rgba(45, 108, 223, 1)' : '#555')};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
  width: 12px;
  height: 12px;
  accent-color: rgba(45, 108, 223, 1);
  cursor: pointer;
`;

export const CheckboxBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
`;

export const TableSection = styled.div`
  margin-top: 20px;

  @media (max-width: 1050px) {
    .table-main-container {
      display: none;
    }
    .mobile-list-main-container {
      display: block;
    }
  }
`;

export const TableSectionFirst = styled.div`
  margin-top: 20px;
`;

export const ProjectType = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 0%;
  background-color: ${({ $color }) => ($color ? $color + '1A' : 'rgba(234, 240, 252, 1)')};
  color: ${({ $color }) => ($color ? $color : 'rgba(45, 108, 223, 1)')};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  width: 120px;
  border-radius: 20px;
  margin-top: -10px;
  margin-right: -10px;
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
  gap: 20px;
`;

export const ExpandedLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  word-break: break-word;
  min-width: 75px;
`;

export const ExpandableRowWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ExpandedValue = styled.p`
  color: ${({ $highlight }) => ($highlight ? '#E63946' : '#212529')};
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const AddNewLeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 522px) {
    gap: 10px;
    flex-wrap: wrap;
  }
  button {
    white-space: nowrap;
    @media (max-width: 522px) {
      width: 100% !important;
      font-size: 12px;
      white-space: normal;
      text-align: center;
      padding: 8px 10px;
      height: auto;
      margin-bottom: 20px;
    }
  }
`;

export const Span = styled.span`
  font-size: 12px;
  cursor: pointer;
`;
