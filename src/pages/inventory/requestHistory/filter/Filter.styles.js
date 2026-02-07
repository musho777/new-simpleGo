import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
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
  flex-wrap: wrap;
  > div {
    min-height: 0;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    > div {
      width: 100%;
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
    min-height: 0;
  }
`;
