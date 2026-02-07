import styled from 'styled-components';

export const Icon = styled.img``;

export const IconButton = styled.img`
  width: 15px;
  height: 15px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    min-height: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Text = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const DoneButton = styled.div`
  width: 100%;
  button {
    background-color: #2d6cdf;
    border-color: #2d6cdf;
    &:hover {
      background-color: #1f56c2;
      border-color: #1f56c2;
    }
  }
  div {
    color: white;
  }
`;

export const AmountInfo = styled.div`
  background-color: #2d6cdf1a;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Row = styled.div``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const KeyText = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const AmountText = styled.p`
  color: #2d6cdf;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  display: block;
  font-weight: 600;
  color: #212529;
  font-size: 14px;
`;
