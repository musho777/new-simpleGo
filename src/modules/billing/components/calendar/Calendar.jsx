import { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import ArrowUp from 'assets/datePicker/arrow-up.svg';
import CalendarActive from 'assets/datePicker/calendar-active.svg';

import calendar from '../../assets/calendar.svg';
import select from '../../assets/select.svg';
import { StyledDatePickerWrapper } from './Calendar.styles';

const Calendar = ({ placeholder, onDateChange, views = ['month', 'year'] }) => {
  const [open, setOpen] = useState(false);
  const handleCalendarClick = () => {
    setOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ p: 0 }}>
        <StyledDatePickerWrapper>
          <MuiDatePicker
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            views={views}
            onChange={onDateChange}
            slotProps={{
              actionBar: {
                actions: ['cancel', 'accept'],
                sx: {
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingTop: '8px',
                },
              },
              inputAdornment: {
                sx: {
                  display: 'none',
                  zIndex: '9999999',
                },
              },
              textField: {
                placeholder,
                onClick: handleCalendarClick,
                InputProps: {
                  startAdornment: (
                    <img
                      className="mr-[8px] h-[14px] w-[14px]"
                      src={open ? CalendarActive : calendar}
                      alt="calendar"
                      style={{ cursor: 'pointer', paddingRight: '10px' }}
                    />
                  ),
                  endAdornment: (
                    <img
                      className="mr-[8px] h-[14px] w-[14px]"
                      src={open ? ArrowUp : select}
                      alt="select"
                      style={{ cursor: 'pointer', paddingLeft: '10px' }}
                    />
                  ),
                  sx: {
                    fontSize: '12px',
                    color: open ? '#2D6CDF' : '#212529',
                    fontWeight: 500,
                    borderRadius: '10px',
                    height: '38px',
                  },
                },
              },
              layout: {
                sx: {
                  marginTop: '10px',
                  '& .MuiDateCalendar-root': {
                    height: '100%',
                  },
                },
              },
            }}
          />
        </StyledDatePickerWrapper>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;
