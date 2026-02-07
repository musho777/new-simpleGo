import styled from 'styled-components';

export const BtnWrapper = styled.div`
  max-width: 200px;
  cursor: pointer;

  .h-38 {
    height: 38px !important;
  }

  button {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 22px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 0;
  width: 100%;
  justify-content: end;
`;
