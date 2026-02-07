import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  min-height: 84px;

  pointer-events: ${({ $readOnly }) => ($readOnly ? 'none' : 'all')};

  div {
    height: 44px;
  }

  .react-tel-input {
    display: flex;
    gap: 10px;
    flex-direction: row-reverse;
    justify-content: start;
  }

  .selected-flag {
    background: transparent !important;
  }

  .flag-dropdown {
    border-radius: 8px !important;
    border: 1px solid ${(props) => (props.$error ? '#E63946' : '#d4d8dd')};
    background-color: #fff;
    position: relative;
    width: 54px;

    &:focus {
      border-color: ${(props) => (props.$error ? '#E63946' : theme.colors.success)};
    }

    &:hover {
      opacity: '1';
      border-color: ${(props) => (props.$error ? '#E63946' : theme.colors.success)};
      box-shadow: ${(props) =>
        `0px 0px 4px 0px ${props.$error ? '#E63946' : theme.colors.success}`};
    }

    .country-list {
      padding: 10px;
      width: 314px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

      &::-webkit-scrollbar {
        display: none;
      }

      .country.highlight {
        border-radius: 5px;
        background-color: #2d6cdf1a !important;
        width: 100%;
        color: #2d6cdf;
      }

      .country {
        width: 100%;
        height: 33px;
        padding: 7px 0 7px 12px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        color: #6c757d;

        &:hover {
          border-radius: 5px;
          background-color: #2d6cdf1a !important;
          color: #2d6cdf;
        }
      }
    }

    .arrow {
      margin-left: 6px;
      width: 7px;
      height: 7px;
    }
  }

  .react-tel-input input {
    padding-left: 12px !important;
    border: 1px solid ${(props) => (props.$error ? '#E63946' : theme.colors.borderColor)};
    height: 44px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 19px;
    outline: none;
    width: 100%;
    &:focus {
      border-color: ${(props) => (props.$error ? '#E63946' : theme.colors.success)};
    }

    &:hover {
      opacity: '1';
      border-color: ${(props) => (props.$error ? '#E63946' : theme.colors.success)};
      box-shadow: ${(props) =>
        `0px 0px 4px 0px ${props.$error ? '#E63946' : theme.colors.success}`};
    }

    &::placeholder {
      color: #d4d8dd;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      box-shadow: 0 0 0 1000px white inset !important;
      border: 1px solid ${(props) => (props.$error ? '#E63946' : theme.colors.borderColor)};
      color: inherit;
    }

    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      box-shadow: 0 0 0 1000px white inset !important;
      border-color: ${(props) => (props.$error ? '#E63946' : theme.colors.success)};
    }
  }
`;

export const Icon = styled.img`
  margin-bottom: 0px !important;
`;

export const ErrorText = styled.legend`
  color: #e63946;
  font-weight: 600;
  padding: 3px 0 2px 0;
  display: flex;
  gap: 3px;
  justify-content: end;
  align-items: center;
  font-size: 12px;
  line-height: 12px;
  margin-top: 5px;
`;

export const Label = styled.label`
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
