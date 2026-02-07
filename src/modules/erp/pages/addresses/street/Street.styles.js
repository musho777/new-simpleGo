import styled from 'styled-components';

export const StreetContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 20px;
`;

export const SelectWrapper = styled.div`
  margin-bottom: 20px;
  max-width: 232px;

  > div {
    min-height: 38px;
    width: 232px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding-top: 50px;
`;

export const StreetsList = styled.div`
  flex: 1;
`;

export const PaginationWrapper = styled.div`
  width: 731px;
`;

export const StreetItem = styled.div`
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
`;

export const StreetName = styled.div`
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

export const SelectContainer = styled.div`
  display: flex;
  gap: 25px;
`;
