import styled, { css } from 'styled-components';
import theme from 'styles/theme';

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.small};
  width: 100%;
  min-height: 108px;
`;

export const TextAreaLabel = styled.label`
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-self: start;
  margin-bottom: 5px;
  span {
    color: ${theme.colors.danger};
    margin-left: 2px;
  }
`;

export const TextAreaField = styled.textarea`
  height: auto;
  width: 100%;
  min-height: 68px;
  padding: 15px;
  border: 1px solid ${({ $error }) => ($error ? '#E63946' : theme.colors.borderColor)};
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  color: ${theme.colors.text};

  &::placeholder {
    color: ${theme.colors.borderColor};
    font-size: 14px;
  }

  &:focus {
    border-color: ${({ $error, readOnly }) =>
      readOnly ? theme.colors.borderColor : $error ? '#E63946' : theme.colors.success};
    box-shadow: 0px 0px 3px 1px rgba(63, 81, 181, 0.1);
  }

  &:hover {
    opacity: ${({ readOnly }) => (readOnly ? '1' : '1')};
    border-color: ${({ $error, readOnly }) =>
      readOnly ? theme.colors.borderColor : $error ? '#E63946' : theme.colors.success};
    box-shadow: ${({ readOnly, $error }) =>
      readOnly ? 'none' : `0px 0px 4px 0px ${$error ? '#E63946' : theme.colors.success}`};
  }

  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      border: 1px solid #ccc;
      padding: 16px 54px;
    `}

  ${({ maxLength, minLength }) => css`
    max-length: ${maxLength || 'none'};
    min-length: ${minLength || 'none'};
  `}

  &::-webkit-scrollbar {
    width: 8px;
    margin-top: 30px !important;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(152, 145, 168, 0.37);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(107, 107, 107, 0.514);
    border-radius: 10px;
  }

  resize: ${({ $resizeVertical, $resizeHorizontal }) =>
    $resizeVertical ? 'vertical' : $resizeHorizontal ? 'horizontal' : 'none'};
`;

export const CharacterCount = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 3px;

  color: ${theme.colors.secondaryText};
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
`;

export const EditorCount = styled.span`
  color: ${({ $isExceeded }) => ($isExceeded ? '#e63946' : theme.colors.secondaryText)};
`;
