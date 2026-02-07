import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border-bottom: 0.4px solid #dfdfdf;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 90px;

  @media (max-width: 1375px) {
    gap: 35px;
  }

  @media (max-width: 900px) {
    height: 180px;
    flex-wrap: wrap;
  }

  @media (max-width: 769px) {
    height: auto;
    gap: 15px;
    padding: 0 10px;
  }
  div {
    min-height: 0;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export const FilterBox = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 769px) {
    display: block;
    width: 100%;
    > div {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
`;

export const SearchBox = styled.div`
  display: flex;

  @media (max-width: 800px) {
    div {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
  @media (max-width: 769px) {
    input {
      width: 100%;
    }
  }
`;

export const SelectBox = styled.div`
  width: 180px;

  div div input {
    min-height: 32px;
  }

  @media (max-width: 800px) {
    max-width: 120px;
  }

  @media (max-width: 769px) {
    max-width: 100%;
  }
`;

export const DateSelectBox = styled.div`
  width: 180px;
  margin-top: 5px;

  div {
    min-height: 46px;
  }

  @media (max-width: 800px) {
    max-width: 120px;
  }
  @media (max-width: 769px) {
    max-width: 100%;
    margin-bottom: 10px;
  }
`;

export const RequestButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    font-size: 14px;
    font-weight: 600;
    line-height: 9px;
    width: fit-content;
  }

  .request-history-btn {
    color: #1d3557;
  }
  @media (max-width: 769px) {
    justify-content: center;
    padding: 10px 0;
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

export const RequestButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  @media (max-width: 769px) {
    margin-top: 10px;
    justify-content: center;
    flex-direction: column;
  }
`;

export const ResetBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
