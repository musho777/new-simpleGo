import styled from 'styled-components';

export const CityContainer = styled.div`
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

export const SelectContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 15px;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 15px;
  }
`;

export const SelectWrapper = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 232px;

  > div {
    min-height: 38px;
    width: 100%;
  }

  @media (max-width: 768px) {
    max-width: calc(50% - 7.5px);
  }

  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 100%;
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

export const CitiesList = styled.div`
  flex: 1;
`;

export const PaginationWrapper = styled.div`
  width: 731px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CityItem = styled.div`
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

export const CityName = styled.div`
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
