import styled from 'styled-components';
import theme from 'styles/theme';

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 0 26px 0;
`;

export const StyledInput = styled.input`
  border: 1px solid
    ${(props) =>
      props.$error
        ? `${theme.colors.danger}`
        : props.$success
          ? `${theme.colors.success}`
          : `${theme.colors.borderColor}`};
  height: 48px;
  width: 48px !important;
  border-radius: 8px;
  font-size: 20px;
  line-height: 27px;
  outline: none;
  text-align: center;
  color: ${(props) =>
    props.$error
      ? `${theme.colors.danger}`
      : props.$success
        ? `${theme.colors.success}`
        : 'initial'};

  &:focus {
    border-color: ${(props) =>
      props.$error ? `${theme.colors.danger}` : `${theme.colors.success}`};
    color: ${(props) =>
      props.$error
        ? `${theme.colors.danger}`
        : props.$success
          ? `${theme.colors.success}`
          : 'initial'};
  }

  &:hover {
    opacity: ${(props) => (props.readOnly ? '1' : '0.3')};
    border-color: ${(props) =>
      props.$error ? `${theme.colors.danger}` : `${theme.colors.success}`};
    box-shadow: ${(props) =>
      props.$error ? `${theme.colors.success}` : `${theme.colors.success}`};
    color: ${(props) =>
      props.$error
        ? `${theme.colors.danger}`
        : props.$success
          ? `${theme.colors.success}`
          : 'initial'};
  }

  &::placeholder {
    color: #d4d8dd;
  }
`;
