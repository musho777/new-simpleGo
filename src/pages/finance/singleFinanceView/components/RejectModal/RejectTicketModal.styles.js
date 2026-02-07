import styled from 'styled-components';

export const Icon = styled.img``;

export const Text = styled.p`
  color: #e63946;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const ErrorButton = styled.div`
  width: 100%;
  button {
    background-color: #e63946;
    border-color: #e63946;
    &:hover {
      background-color: #c92a36;
      border-color: #c92a36;
    }
  }
  div {
    color: white;
  }
`;
