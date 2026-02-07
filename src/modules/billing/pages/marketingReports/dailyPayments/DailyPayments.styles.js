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

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: black;
    white-space: nowrap;
  }
`;
