import styled from 'styled-components';
import theme from 'styles/theme';

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  margin: 0;
`;

export const StyledLabel = styled.span`
  color: ${theme.colors.primaryText};
  transition: color 0.3s ease;
  &.checked {
    color: ${theme.colors.secondary};
  }
`;

export const StyledOption = styled.div`
  padding: 10px;
  color: ${theme.colors.primaryText};
  font-size: 12px;
  font-weight: 600;
  width: 100%;
  line-height: 16px;
  white-space: normal;
  word-break: break-word;

  &:hover {
    background-color: ${theme.colors.secondary}1a;
    color: ${theme.colors.secondary};
    border-radius: 5px;
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  border: 1px solid ${theme.colors.borderColor};
  border-radius: 10px;
  background-color: ${theme.colors.white};
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  padding: 9px 3px 9px 10px;
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
