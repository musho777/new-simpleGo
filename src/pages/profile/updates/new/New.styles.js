import styled from 'styled-components';

export const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 13px;

  button {
    max-width: 101px;
  }
`;

export const SelectAllContainer = styled.div`
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: ${({ $isSelected }) => ($isSelected ? '#F0F4FA' : '#fff')};

  display: flex;
  height: 49px;
  padding: 0 48px 0 28px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const SelectedCountText = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 500;
  line-height: 9px;
`;
