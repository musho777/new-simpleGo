import styled from 'styled-components';
import theme from 'styles/theme';

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
    color: ${theme.colors.danger};
    margin-left: 2px;
  }
`;

export const StyledInput = styled.input`
  padding: ${({ $padding, hasLeftIcon }) =>
    $padding ? $padding : hasLeftIcon ? '0 16px 0 40px' : '0 54px 0 16px'};
  width: ${({ $width }) => $width || '100%'};
  border: 1px solid ${(props) => (props.$error ? '#E63946' : `${theme.colors.borderColor}`)};
  height: 44px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 19px;
  outline: none;

  &:focus {
    border-color: ${(props) =>
      props.readOnly
        ? `${theme.colors.borderColor}`
        : props.$error
          ? '#E63946'
          : `${theme.colors.success}`};
  }

  &:hover {
    border-color: ${(props) =>
      props.readOnly
        ? `${theme.colors.borderColor}`
        : props.$error
          ? '#E63946'
          : `${theme.colors.success}`};
    box-shadow: ${(props) =>
      props.readOnly
        ? 'none'
        : `0px 0px 4px 0px ${props.$error ? '#E63946' : `${theme.colors.success}`}`};
  }

  &::placeholder {
    color: #d4d8dd;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    box-shadow: 0 0 0 1000px white inset !important;
    border: 1px solid ${(props) => (props.$error ? '#E63946' : `${theme.colors.borderColor}`)};
    color: inherit;
  }

  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    box-shadow: 0 0 0 1000px white inset !important;
    border-color: ${(props) =>
      props.readOnly
        ? `${theme.colors.borderColor}`
        : props.$error
          ? '#E63946'
          : `${theme.colors.success}`};
  }

  &[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
    -webkit-appearance: none;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (max-width: 375px) {
    height: 48px;
    line-height: 48px;
    padding: 0 12px !important;
  }
`;

export const LeftIconWrapper = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  display: ${(props) => (props.$showLeftIcon ? 'none' : 'flex')};
`;

export const ErrorText = styled.legend`
  color: #e63946;
  font-weight: 600;
  padding: 3px 0 2px 0;
  display: flex;
  gap: 3px;
  justify-content: start;
  font-size: 12px;
  line-height: 12px;
`;

export const UnityWrapper = styled.p`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  font-weight: 400;
  font-size: 13px;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .close {
    width: 16px;
  }
`;

export const Icon = styled.img``;

export const StyledInputWrapper = styled.div`
  position: relative;
`;
