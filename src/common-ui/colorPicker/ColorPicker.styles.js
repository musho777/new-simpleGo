import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ColorMainDiv = styled.div``;

export const ColorPreview = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color || 'transparent'};
  border: 2px solid #ccc;
  margin-left: 16px;
`;

export const ColorPalette = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 10px;
`;

export const DefaultColor = styled.div`
  border: 1px solid #6c757d;
  border-radius: 99999999px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.isSelected && `3px`};
  position: relative;

  @media (max-width: 769px) {
    width: 20px;
    height: 20px;
  }
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const ColorSwatch = styled.div`
  border-radius: 999999999px;
  cursor: pointer;
  background-color: ${(props) => props.color || 'transparent'};
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: ${(props) => props.isSelected && '1px solid #6c757d'};
`;

export const ColorChoose = styled.img`
  opacity: 1;
  object-fit: contain;
  cursor: pointer;
  width: 26px;

  @media (max-width: 769px) {
    width: 20px;
  }
`;

export const SelectedColor = styled.div`
  border: 1px solid #d4d8dd;
  border-radius: 8px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const ColorName = styled.span`
  margin-left: 30px;
`;

export const SelectColorSpan = styled.span`
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 5px;
  margin-top: 10px;
`;

export const Icon = styled.img`
  object-fit: contain;
`;
