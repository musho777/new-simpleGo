import styled from 'styled-components';
import theme from 'styles/theme';

export const MobileFilterContainer = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
    background: ${theme.colors.white};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FilterLabel = styled.label`
  color: #6c757d;
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
  font-size: 12px;
`;

export const AsyncSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

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

export const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .range-separator {
    color: #6c757d;
    font-weight: 500;
    text-align: center;
    margin: 4px 0;
  }
`;

export const QuantityRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .range-separator {
    color: #6c757d;
    font-weight: 500;
    text-align: center;
    margin: 4px 0;
  }
`;
