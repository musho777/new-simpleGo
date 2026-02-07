import styled from 'styled-components';

export const Container = styled.div`
  gap: 10px;
  border-bottom: 0.5px solid #dfdfdf;
  margin-bottom: 30px;

  padding: 30px 0;
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
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

export const AddAddress = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
`;

export const TrashIcon = styled.img``;

export const Group = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;
