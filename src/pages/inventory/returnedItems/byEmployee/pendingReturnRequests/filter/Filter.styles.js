import styled from 'styled-components';

export const FilterContainer = styled.div`
  border-radius: 8px;
  background: #fff;
  min-height: 82px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
