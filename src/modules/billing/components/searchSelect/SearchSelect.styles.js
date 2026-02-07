import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  min-width: 160px;
  font-family: Arial, sans-serif;
  width: ${({ $width }) => $width};
`;

export const DropdownHeader = styled.div`
  border: 0.5px solid ${({ $isSelected }) => ($isSelected ? '#2D6CDF' : '#d4d8dd')};
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 5px;
  color: ${({ $isSelected }) => ($isSelected ? '#2D6CDF' : '#212529')};
  background-color: ${({ $isSelected }) => ($isSelected ? '#2D6CDF1A' : '#ffffff')};
  transition: all 0.3s ease;
  white-space: nowrap;
`;

export const DropdownHeaderContent = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DropdownList = styled.div`
  position: absolute;
  margin-top: 10px;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #d4d8dd;
  border-radius: 10px;
  max-height: 200px;
  min-width: 170px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DropdownSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const DropdownSearch = styled.input`
  width: 100%;
  padding: 10px 10px 10px 36px;
  border: 0.5px solid #d4d8dd;
  border-radius: 10px;
  font-size: 12px;
  box-sizing: border-box;
  background: url(${(props) => props.$icon}) no-repeat 10px center;

  &:focus {
    border: 0.5px solid #d4d8dd;
    outline: none;
  }
`;

export const SelectIcon = styled.img``;

export const DropdownItem = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  &:hover {
    background-color: #f3f4f6;
  }
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;
