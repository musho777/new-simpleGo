import styled from 'styled-components';

export const ItemFilterAndSearch = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
  @media (max-width: 1500px) {
    display: flex;
    max-width: 100%;
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }

  .max-count-title {
    display: none;
  }
`;
export const Image = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 6px;
`;

export const DateBox = styled.div`
  margin-top: 5px;
  > div {
    min-height: 0;
  }
  @media (max-width: 991px) {
    width: 120px;
  }
`;

export const FilterBox = styled.div`
  > div {
    min-height: 0;
  }
  @media (max-width: 991px) {
    width: 120px;
  }
  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const ResetBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectWrapper = styled.div`
  max-width: 200px;
  width: 200px;
  > div {
    min-height: 0;
  }

  @media (max-width: 991px) {
    width: 120px;
  }
`;
