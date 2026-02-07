import styled from 'styled-components';
import theme from 'styles/theme';

export const MobileDateTimePicker = styled.div`
  width: 100%;
  font-size: 5px;

  .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: ${theme.colors.success};
      opacity: 1;
      box-shadow: 0px 0px 2px 0px ${theme.colors.success};
    }

    &.Mui-focused fieldset {
      border-color: ${theme.colors.success};
      box-shadow: 0px 0px 2px 0px ${theme.colors.success};
    }
  }
`;
