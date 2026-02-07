import React, { forwardRef } from 'react';

import { Autocomplete, TextField } from '@mui/material';
import { ErrorText, Icon, Label } from 'common-ui/input/Input.styles';
import errorIcon from 'common-ui/input/assets/error.svg';
import styled from 'styled-components';

import searchIcon from './search.svg';

const StyledAutocompleteWrapper = styled.div`
  position: relative;
  width: ${(props) => props.width || '100%'};
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    height: ${(props) => props.height || '44px'};
    border-radius: 10px;
    border: 1px solid #d4d8dd;
    background: #fff;
    font-size: 12px;
    color: #212529;
    font-weight: 500;
    padding-right: 15px !important;

    &.Mui-focused {
      border-color: #2d6cdf;
    }

    &.Mui-error {
      border-color: #e63946;
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiInputLabel-root {
    display: none;
  }

  & .MuiAutocomplete-endAdornment {
    display: none;
  }

  & .MuiAutocomplete-clearIndicator,
  & .MuiAutocomplete-popupIndicator {
    display: none;
  }

  & .MuiOutlinedInput-input {
    padding-right: 15px !important;
  }
`;

const CustomAutocomplete = forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      placeholder,
      error,
      required,
      width,
      height,
      ...props
    },
    ref
  ) => {
    return (
      <StyledAutocompleteWrapper width={width}>
        {label && (
          <Label>
            {label}
            {required && <span style={{ color: '#E63946' }}> *</span>}
          </Label>
        )}
        <Autocomplete
          ref={ref}
          options={options}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              placeholder={placeholder}
              height={height}
              error={!!error}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    <div
                      style={{
                        borderLeft: '1px solid #ccc',
                        height: '24px',
                        marginRight: '8px',
                      }}
                    />
                    <img
                      src={searchIcon}
                      alt="search"
                      style={{
                        width: '16px',
                        height: '16px',
                      }}
                    />
                  </>
                ),
              }}
            />
          )}
          {...props}
        />
        {error && (
          <ErrorText>
            <Icon src={errorIcon} alt="error" />
            {error}
          </ErrorText>
        )}
      </StyledAutocompleteWrapper>
    );
  }
);

export default CustomAutocomplete;
