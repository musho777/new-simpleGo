import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    width: 110px;
    padding: 0 10px;
  }
`;

export const UnitOfMeasurement = styled.p`
  font-family: Nunito;
  font-weight: 400;
  font-style: Regular;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #6c757d;
`;
