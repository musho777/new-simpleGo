import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledDatePickerWrapper = styled.div`
  /* width: 191px; */
  .MuiOutlinedInput-root {
    &:hover fieldset {
      background-color: ${theme.colors.hoverText}1a;
      border: 1px solid ${theme.colors.borderColor};
    }

    &.Mui-focused fieldset {
      background-color: ${theme.colors.hoverText}1a;
      border: 1px solid ${theme.colors.borderColor};
    }
    .MuiInputBase-input {
      padding: 0;
    }
  }
`;
