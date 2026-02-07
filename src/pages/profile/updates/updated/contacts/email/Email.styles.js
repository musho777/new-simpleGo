import styled from 'styled-components';

export const Icon = styled.img`
  margin-left: 5px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .p-1 {
    color: #212529;
    font-size: 13px;
    font-weight: 600;
  }

  .p-2 {
    color: #6c757d;
    font-size: 14px;
  }

  .p-3 {
    color: #2d6cdf;
    font-size: 14px;
    font-weight: 600;
  }
`;
