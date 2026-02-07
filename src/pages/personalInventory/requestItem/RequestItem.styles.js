import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  .category-select {
    width: 100%;
  }

  .item-select {
    width: 100%;
  }

  .quantity {
    padding: 0 40px 0 10px;
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

export const ControllerWrapper = styled.div`
  width: 40%;
  @media (max-width: 769px) {
    width: 100%;
  }
`;

export const AddMoreButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  button {
    width: 180px;
    color: #2d6cdf;
    font-size: 14px;
    font-weight: 700;
  }
`;

export const QuantityWrapper = styled.div`
  width: 15% !important;
  @media (max-width: 769px) {
    width: 100% !important;
  }
`;

export const FormRow = styled.div``;

export const TrashWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CheckBoxTitle = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-weight: 700;
`;
