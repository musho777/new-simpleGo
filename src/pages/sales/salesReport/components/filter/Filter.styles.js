import styled from 'styled-components';

export const FilterContainer = styled.div`
  border-radius: 16px;
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SelectWrapper = styled.div`
  > div {
    min-height: 0;
    width: 160px;
  }
`;
