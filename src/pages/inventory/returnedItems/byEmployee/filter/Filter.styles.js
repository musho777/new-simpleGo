import styled from 'styled-components';
import theme from 'styles/theme';

export const FilterContainer = styled.div`
  border-radius: 8px;
  background: #fff;
  min-height: 82px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 525px) {
    > div {
      margin-bottom: 20px;
    }
  }
`;

export const FilterActions = styled.div`
  display: flex;
  width: 100%;
  padding: 22px 30px;
  justify-content: space-between;
  align-items: center;
  .h-38 {
    height: 38px !important;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  .action-button {
    max-height: 38px;
    max-width: 180px;
    color: ${theme.colors.primaryText};
    font-size: 12px;
    font-style: normal;
    line-height: normal;
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  .payroll-department-filter {
    min-height: 0;
    label {
      display: none;
    }
  }
  @media (max-width: 710px) {
    padding: 20px 0;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 525px) {
    padding: 20px 0;
    grid-template-columns: 1fr;
    > div {
      width: 100%;
    }
  }
`;

export const FormRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  .btn {
    height: 29px;
    width: 29px;
    padding: 0;
  }

  @media (max-width: 1050px) {
    .m-w-123 {
      max-width: 123px;
    }
    .m-w-187 {
      max-width: 187px;
    }
    .m-w-150 {
      max-width: 150px;
    }
  }

  .max-count-title {
    display: none;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  flex-direction: column;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 57px;
  text-decoration: underline;
`;

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  .date-input {
    max-width: 140px;
    font-size: 12px;
  }

  .range-separator {
    color: #6c757d;
    font-weight: 500;
    margin: 0 4px;
  }
`;
export const CalendarWrapper = styled.div``;

export const QuantityRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  flex-wrap: wrap;
  .quantity-input {
    max-width: 80px;
    height: 38px;
  }

  .range-separator {
    color: #6c757d;
    font-weight: 500;
    margin: 0 4px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  > div {
    min-height: 38px;
  }
`;

export const FilterLabel = styled.label`
  color: #6c757d;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  min-width: 200px;
`;

export const AsyncSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;

  .react-select__control {
    min-height: 38px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    font-size: 12px;

    &:hover {
      border-color: #adb5bd;
    }

    &--is-focused {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }

  .react-select__placeholder {
    color: #6c757d;
    font-size: 12px;
  }

  .react-select__single-value {
    color: #495057;
    font-size: 12px;
  }
`;

export const ItemName = styled.div`
  min-height: 38px;
  margin-top: -5px;
  .quantity-input {
    height: 38px;
  }
  > div {
    min-height: 38px;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: end;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  > button {
    color: #212529;
    font-weight: 600;
    font-style: SemiBold;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0%;
  }
`;
