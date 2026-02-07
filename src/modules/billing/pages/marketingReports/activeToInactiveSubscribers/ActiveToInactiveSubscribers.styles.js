import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  gap: 20px;
  > div {
    width: max-content;
    min-width: 330px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
