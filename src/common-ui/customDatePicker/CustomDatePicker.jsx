import { forwardRef, useState } from 'react';

import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import closeIcon from 'assets/filters/close.svg';
import { ErrorText, Label } from 'common-ui/input/Input.styles';
import errorIcon from 'common-ui/input/assets/error.svg';
import dayjs from 'dayjs';

import { Icon, StyledDatePickerWrapper } from './CustomDatePicker.styles';
import calendar from './calendar.svg';
import select from './select.svg';

const CustomDatePicker = forwardRef(
  (
    {
      label,
      value,
      onChange,
      onClear,
      placeholder,
      error,
      height,
      req,
      disableFuture,
      required = false,
      hideActionBar = false,
      slotProps: customSlotProps = {},
      disabled = false,
      showClearIcon = true,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const handleClear = () => {
      onClear?.();
      onChange('');
    };

    const handleCalendarClick = () => {
      setOpen(true);
    };

    const handleDateChange = (date) => {
      if (date) {
        onChange(dayjs(date).toISOString());
      } else {
        onChange('');
      }
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: '100%' }}>
          {label && (
            <Label>
              {label}
              {(req || required) && <span>*</span>}
            </Label>
          )}

          <StyledDatePickerWrapper $error={error}>
            <DatePicker
              ref={ref}
              disableFuture={disableFuture}
              disabled={disabled}
              value={value ? dayjs(value) : null}
              onChange={handleDateChange}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              sx={{ width: '100%' }}
              slotProps={{
                actionBar: hideActionBar
                  ? { actions: [] }
                  : {
                      actions: ['today'],
                      sx: {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        padding: '8px 16px',
                      },
                    },
                textField: {
                  error: !!error,
                  onClick: handleCalendarClick,
                  placeholder,
                  InputProps: {
                    startAdornment: (
                      <img
                        src={calendar}
                        alt="calendar"
                        style={{ cursor: 'pointer', paddingRight: '10px' }}
                      />
                    ),
                    endAdornment: (
                      <>
                        {showClearIcon && value && (
                          <img
                            src={closeIcon}
                            alt="clear"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClear();
                            }}
                            style={{
                              cursor: 'pointer',
                              width: 13,
                              height: 13,
                              marginRight: -8,
                            }}
                          />
                        )}
                        <img
                          src={select}
                          alt="select"
                          style={{ cursor: 'pointer', paddingLeft: '10px' }}
                        />
                      </>
                    ),
                    sx: {
                      fontSize: '12px',
                      color: '#212529',
                      fontWeight: 500,
                      height: height ?? '38px',
                      borderRadius: '10px',

                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D4D8DD',
                      },

                      '& input::placeholder': {
                        color: '#9a9a9c',
                        fontSize: 14,
                        fontWeight: '400',
                        whiteSpace: 'pre',
                        overflow: 'hidden',
                      },
                    },
                  },
                },
                layout: {
                  sx: {
                    marginTop: '10px',
                  },
                },
                ...customSlotProps,
              }}
              {...props}
            />
          </StyledDatePickerWrapper>

          {error && (
            <ErrorText>
              <Icon src={errorIcon} alt="error" />
              {error}
            </ErrorText>
          )}
        </Box>
      </LocalizationProvider>
    );
  }
);

export default CustomDatePicker;
