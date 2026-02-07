import styled from 'styled-components';
import theme from 'styles/theme';

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 30px;
  gap: 12px;
  flex-wrap: wrap;
  background-color: ${theme.colors.white};
  border-radius: 8px;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.secondaryText};
  white-space: nowrap;
`;

export const Select = styled.select`
  height: 38px;
  padding: 0 10px;
  border: 0.5px solid ${theme.colors.borderColor};
  border-radius: 10px;
  font-size: 13px;
  color: ${theme.colors.primaryText};
  background-color: ${theme.colors.white};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${theme.colors.secondary};
  }
`;

export const Separator = styled.span`
  font-size: 14px;
  color: ${theme.colors.secondaryText};
  padding: 0 4px;
`;

export const FilterContainerPayment = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;
  .inline_title {
    padding-top: 22px;
    padding-left: 30px;
    padding-bottom: 22px;
  }
`;
