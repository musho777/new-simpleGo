import styled from 'styled-components';
import theme from 'styles/theme';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;
`;

export const FilterActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 16px;
  align-items: center;

  .h-38 {
    height: 38px !important;
  }
  button {
    height: 38px;
    font-size: 12px;
    font-weight: 600;
  }
  .filter-trigger-button {
    color: #212529;
    width: 160px;
  }

  .search-trigger-button {
    color: #212529;
    width: 160px;
  }
  @media (max-width: 800px) {
    justify-content: center;
    flex-wrap: wrap;
    width: 100% !important;
  }

  @media (max-width: 400px) {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    width: 100% !important;
    button {
      width: 100% !important;
      padding: 0 !important;
    }
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 400px) {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    button {
      flex: 1 1 100% !important;
      max-width: 100% !important;
      min-width: 0;
    }
  }
`;
export const FilterRightAndLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    padding: 15px;
  }
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 57px;
  &:hover {
    text-decoration: underline;
  }
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 10px 0 0;
`;

export const LeftSideContainer = styled.div`
  flex-shrink: 0;
  padding: 20px 30px 0 30px;
`;

export const FiltersRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px solid rgba(223, 223, 223, 1);
  padding: 10px 10px 0 30px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const CheckboxBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  height: 44px;
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

export const FormRow = styled.form`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  .btn {
    height: 29px;
    width: 29px;
    padding: 0;
  }

  .max-count-title {
    display: none;
  }

  .select-st {
    max-width: 200px;
  }

  .text-area-field {
    opacity: 1;
  }

  @media (max-width: 1050px) {
    .m-w-138 {
      max-width: 138px;
    }
    .m-w-187 {
      max-width: 187px;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    margin-bottom: 20px;
    .m-w-138 {
      max-width: 100%;
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;

export const FilterBox = styled.div`
  display: flex;
  margin: 10px 0 30px 0;
  gap: 20px;
`;

export const CalendarWrapper = styled.div`
  width: 200px;
`;

export const AsyncSelectWrapper = styled.div`
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
