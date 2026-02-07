import { forwardRef, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledDatePickerWrapper } from 'common-ui/customDatePicker/CustomDatePicker.styles';
import { Label } from 'common-ui/input/Input.styles';
import dayjs from 'dayjs';

import calendar from './calendar.svg';
import select from './select.svg';

const CustomTimePicker = forwardRef(
  ({ label, value, onChange, onClear, placeholder, height, ...props }, ref) => {
    const [cleared, setCleared] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (cleared) {
        setCleared(false);
      }
    }, [cleared]);

    const handleClear = () => {
      setCleared(true);
      onClear?.();
      onChange(null);
    };

    const handleCalendarClick = () => {
      setOpen(true);
    };

    const handleDateChange = (date) => {
      if (date) {
        const isoString = dayjs(date).toISOString();
        onChange(isoString);
      } else {
        onChange(null);
      }
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ width: '100%' }}>
          {label && <Label>{label}</Label>}
          <StyledDatePickerWrapper>
            <MobileDateTimePicker
              showToolbar={false}
              ref={ref}
              disablePast={true}
              value={value ? dayjs(value) : null}
              onChange={handleDateChange}
              ampm={false}
              sx={{
                width: '100%',
              }}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: handleClear,
                  placeholder,
                },
                toolbar: { hidden: true },
                textField: {
                  onClick: handleCalendarClick,
                  InputProps: {
                    startAdornment: (
                      <img
                        className="mr-[8px] h-[14px] w-[14px]"
                        src={calendar}
                        alt="calendar"
                        style={{
                          cursor: 'pointer',
                          paddingRight: '10px',
                          filter: open
                            ? 'invert(35%) sepia(100%) saturate(200%) hue-rotate(180deg)'
                            : 'none',
                        }}
                      />
                    ),
                    endAdornment: (
                      <img
                        className="mr-[8px] h-[14px] w-[14px]"
                        src={select}
                        alt="select"
                        style={{ cursor: 'pointer', paddingLeft: '10px' }}
                      />
                    ),
                    sx: {
                      fontSize: '12px',
                      color: '#212529',
                      fontWeight: 500,
                      height: height ?? '38px',
                      borderRadius: '10px',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#15C7A7',
                          opacity: 0.3,
                          boxShadow: '0px 0px 2px 0px #15C7A7',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                    },
                  },
                },
                layout: {
                  sx: {
                    marginTop: '10px',
                  },
                },
              }}
              {...props}
            />
          </StyledDatePickerWrapper>
        </Box>
      </LocalizationProvider>
    );
  }
);

export default CustomTimePicker;
