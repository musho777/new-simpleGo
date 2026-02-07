import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 100%;
  > div {
    min-height: 0;
    width: 200px;
  }

  .action-button {
    max-height: 38px;
    max-width: 100px;
    font-size: 12px;
    font-style: normal;
    line-height: normal;
    img {
      color: white;
    }
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const SelectWrapper = styled.div`
  width: 200px;
  > div {
    display: flex;
    align-items: center;
  }
  @media (max-width: 767px) {
    > div {
      min-height: 0;
    }
  }
`;

export const AsyncSelectWrapper = styled.div`
  > div {
    min-height: 0;
  }
`;
export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .quantity-input {
    max-width: 100px;
    height: 38px;
  }

  .range-separator {
    color: #6c757d;
    font-weight: 500;
    margin: 0 4px;
  }
`;

export const FilterLabel = styled.label`
  color: #6c757d;
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
  font-size: 12px;
`;

export const InputWrapper = styled.div`
  display: flex;
  max-width: 110px;
  > div {
    min-height: 38px;
  }
  input {
    height: 38px;
    padding: 0 5px 0 10px;
  }
`;

export const Line = styled.div`
  width: 100%;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: #212529;
  font-size: 14px;
  font-weight: 600;
  width: 57px;
  text-decoration: underline;
`;

export const ClearAllRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CloseIconWrapper = styled.div`
  cursor: pointer;
  height: 15px;
`;

export const Icon = styled.img``;

export const CustomDatePickerWrapper = styled.div`
  width: 175px !important;
`;

export const FormRow = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;
