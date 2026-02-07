import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .underline {
    border-bottom: 0.5px solid #dfdfdf;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;

  label {
    color: #6c757d;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  width: 100%;
  justify-content: flex-end;

  button {
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
  }
`;
