import styled from 'styled-components';

export const QuantityField = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const QuantityGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
`;

export const QuantityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 150px;
  padding: 22px 0px;
  flex: 1;
  justify-content: center;
  min-height: 100%;
  border-right: 1px solid #dee2e6;

  &:first-child {
    border-left: 1px solid #dee2e6;
  }
`;

export const QuantityWrapper = styled.div`
  margin: -16px;
  height: calc(100% + 32px);
`;

export const Date = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
