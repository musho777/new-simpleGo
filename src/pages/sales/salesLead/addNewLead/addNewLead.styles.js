import styled from 'styled-components';

export const Form = styled.form``;

export const SwitchWrapper = styled.div`
  margin-bottom: 20px;
  gap: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const Row = styled.div`
  display: flex;
  gap: 22px;

  > div {
    width: 100%;
  }
  button {
    font-weight: 600;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 22px;
  margin-top: 35px;
  > div {
    width: 100%;
  }
  button {
    font-weight: 600;
  }
`;

export const AddressWrapper = styled.div`
  display: flex;
  gap: 22px;
  margin-bottom: 20px;
`;

export const Date = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 20px 0;
`;

export const SelectWrapper = styled.div``;

export const InputWrapper = styled.div`
  width: 100%;
  input {
    padding: 0 16px;
  }
`;
