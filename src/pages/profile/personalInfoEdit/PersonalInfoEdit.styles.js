import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;

  label {
    color: #6c757d;
  }
  @media screen and (max-width: 630px) {
    gap: 0;
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  gap: 5px;
  padding-right: 5px;

  input {
    width: 500px;
    max-width: 500px;
  }
  @media screen and (max-width: 1772px) {
    input {
      width: 450px;
    }
  }
  @media screen and (max-width: 1670px) {
    input {
      width: 350px;
    }
  }
  @media screen and (max-width: 1470px) {
    input {
      width: 250px;
    }
  }
  @media screen and (max-width: 1300px) {
    input {
      width: 350px;
    }
  }
  @media screen and (max-width: 1220px) {
    input {
      width: 290px;
    }
  }
  @media screen and (max-width: 1110px) {
    input {
      width: 230px;
    }
  }
  @media screen and (max-width: 900px) {
    input {
      width: 180px;
    }
  }
  @media screen and (max-width: 767px) {
    input {
      width: 220px;
    }
  }
`;
