import React, { forwardRef } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { Label, RadioWrapper } from './RadioGroup.styles';

// import PropTypes from 'prop-types';

const MyRadioGroup = forwardRef(
  (
    {
      label,
      name,
      options,
      value,
      onChange,
      error,
      helperText,
      row = false,
      required = false,
      disabled = false,
    },
    ref
  ) => {
    return (
      <FormControl
        ref={ref}
        component="fieldset"
        error={error}
        required={required}
        disabled={disabled}
        fullWidth
      >
        {label && (
          <Label>
            {label}
            {required && <span>*</span>}
          </Label>
        )}
        <RadioWrapper>
          <RadioGroup name={name} value={value} onChange={onChange} row={row}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <Radio
                    size="small"
                    sx={{
                      '&.Mui-checked': {
                        color: '#2D6CDF',
                      },
                    }}
                  />
                }
                label={option.label}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: '#212529',
                    fontSize: '14px',
                    fontWeight: 500,
                  },
                }}
              />
            ))}
          </RadioGroup>
        </RadioWrapper>

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

// MyRadioGroup.propTypes = {
//   label: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       label: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func,
//   error: PropTypes.bool,
//   helperText: PropTypes.string,
//   row: PropTypes.bool,
//   required: PropTypes.bool,
//   disabled: PropTypes.bool,
// };

export default MyRadioGroup;
