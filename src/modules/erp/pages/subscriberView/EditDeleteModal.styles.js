import styled from 'styled-components';

export const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const DatePickerWrapper = styled.div`
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;

  & > div:first-child {
    min-height: auto !important;
  }
`;
