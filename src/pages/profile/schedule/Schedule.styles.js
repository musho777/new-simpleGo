import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 22px;

  input {
    padding: 0 16px;
  }

  .schedule-select-dropdown {
    width: 100%;
  }

  @media screen and (max-width: 769px) {
    display: block;
    margin-top: 20px;
  }
`;

export const MobileRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 22px;
`;

export const RatesRow = styled.div`
  display: flex;
  gap: 22px;
  padding-bottom: 24px;

  div {
    min-height: 0;
  }

  button {
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 0 16px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const OldNewTitle = styled.h2`
  color: #212529;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0;
`;

export const TrashIcon = styled.img``;

export const TrashWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  min-width: 32px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DatePickerWrapper = styled.div`
  width: 100%;
`;

export const AddRowBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;

  button {
    color: #2d6cdf;
    font-size: 14px;
    font-weight: 700;
    max-width: 160px;
  }
`;

export const SalaryAmountTypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media screen and (max-width: 769px) {
    display: block;
  }
`;

export const SalaryType = styled.div`
  width: 350px;
  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

export const SalaryCurrency = styled.div`
  width: 200px;
`;

export const MultiContainer = styled.div`
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .hide-f-t {
    display: none;
  }
`;

export const Header = styled.div`
  border-bottom: 0.4px solid #dfdfdf;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  padding-bottom: 19px;
`;

export const Footer = styled.div`
  border-top: 0.4px solid #dfdfdf;
  display: flex;
  justify-content: end;
  padding-top: 16px;
`;

export const DetailLabel = styled.p`
  color: #6c757d !important;
  font-size: 14px !important;
  font-weight: 400 !important;
`;

export const Icon = styled.img``;

export const RowDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: #212529;
  font-size: 14px;
  font-weight: 600;
`;

export const AssignSchedulesBtnWrapper = styled.div`
  display: flex;
  justify-content: end;

  button {
    max-width: 200px;
  }
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
