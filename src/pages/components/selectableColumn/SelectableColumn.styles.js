import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: ${(props) => (props.$empty ? '300px' : 'auto')};
  overflow: auto;
  overflow-y: auto;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: ${({ $bordered }) => $bordered && '0.5px solid #dfdfdf'};
  height: 40px !important;
`;

export const Text = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 500;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #dfdfdf;
  padding: 10px 0;
  justify-content: space-between;

  div {
    min-height: 0 !important;
  }

  .max-h {
    max-height: 34px;
  }

  @media screen and (max-width: 460px) {
    flex-direction: column;
    align-items: start;
  }
`;
