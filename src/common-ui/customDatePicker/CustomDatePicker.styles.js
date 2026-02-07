import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledDatePickerWrapper = styled.div`
  width: 100%;

  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: ${(props) => (props.$error ? '#E63946' : theme.colors.success)};
      box-shadow: ${(props) =>
        props.$error ? '0px 0px 4px 0px #E63946' : '0px 0px 2px 0px ' + theme.colors.success};
    }

    &.Mui-focused fieldset {
      border-color: ${(props) => (props.$error ? '#E63946' : theme.colors.success)};
      box-shadow: ${(props) =>
        props.$error ? '0px 0px 4px 0px #E63946' : '0px 0px 2px 0px ' + theme.colors.success};
    }

    &.Mui-error {
      & fieldset {
        border-color: #e63946;
      }

      &:hover fieldset {
        border-color: #e63946;
        box-shadow: 0px 0px 4px 0px #e63946;
      }
    }

    & input::placeholder {
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 768px) {
    .MuiOutlinedInput-root {
      height: 48px;
      padding: 10px 5px;
    }

    .MuiOutlinedInput-root input::placeholder {
      font-size: 12px;
      white-space: normal;
      overflow-wrap: break-word;
    }
  }
`;

export const Icon = styled.img``;
