import styled from 'styled-components';

export const Container = styled.div`
  min-height: ${(props) => (props.$readOnly ? '0' : '89px')};
`;

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-self: start;
  margin-bottom: 5px;
  color: ${({ customColor }) => customColor || 'black'};
  span {
    color: #e63946;
    margin-left: 2px;
  }
`;

export const StyledInput = styled.input`
  padding: ${({ $hasRightIcons }) => ($hasRightIcons ? '0 60px 0 16px' : '0 16px')};
  width: ${({ $width }) => $width || '100%'};
  border: 1px solid #d4d8dd;
  height: 44px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 19px;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? '#f8f9fa' : 'white')};
  color: ${({ disabled }) => (disabled ? '#6c757d' : 'inherit')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  &:focus {
    border-color: ${(props) => (props.disabled ? '#d4d8dd' : '#28a745')};
  }

  &:hover {
    border-color: ${(props) => (props.disabled ? '#d4d8dd' : '#28a745')};
    box-shadow: ${(props) => (props.disabled ? 'none' : '0px 0px 4px 0px #28a745')};
  }

  &::placeholder {
    color: #d4d8dd;
  }
`;

export const RightIconsWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 15px;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`;
