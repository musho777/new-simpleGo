import styled from 'styled-components';

export const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;

    button {
      width: 100% !important;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding-top: 50px;

  @media (max-width: 480px) {
    gap: 10px;
    padding-top: 30px;

    button {
      flex: 1;
    }
  }
`;

export const CountriesList = styled.div`
  flex: 1;
`;

export const PaginationWrapper = styled.div`
  width: 731px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CountryItem = styled.div`
  width: 731px;
  height: 56px;
  border-radius: 10px;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CountryName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #333;
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;

  &:hover {
    color: #333;
  }
`;
