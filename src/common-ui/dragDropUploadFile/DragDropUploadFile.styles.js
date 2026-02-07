import styled from 'styled-components';

export const Icon = styled.img`
  width: 50px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  p {
    color: #212529;
    font-size: 12px;
    font-weight: 600;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const RowEnd = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding-top: 7px;
`;
