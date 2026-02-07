import React, { forwardRef, useEffect, useState } from 'react';

import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import clock from 'assets/clock2.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { Select } from 'common-ui/select';
import dayjs from 'dayjs';

import { Container, Row, SelectWrapper, StartEndTimeToggle } from './TimeSelector.styles';

const hourOptions = [
  { value: '12h', label: '12 hour' },
  { value: '24h', label: '24 hour' },
];

const TimeSelector = forwardRef(
  ({ onSubmit, error, singleTime, value, label, allowDisabled, placeholder, req }, ref) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeFormat, setTimeFormat] = useState('12h');
    const [openPicker, setOpenPicker] = useState(null);

    const handleFormatChange = (event) => {
      const newFormat = event.value;
      setTimeFormat(newFormat);
    };

    const openTimePicker = (type) => setOpenPicker(type);
    const closeTimePicker = () => setOpenPicker(null);

    const handleSubmit = () => {
      const formattedStartTime = startTime ? startTime.format('HH:mm') : '';
      const formattedEndTime = endTime ? endTime.format('HH:mm') : '';

      const payload = { startTime: formattedStartTime };
      if (!singleTime) {
        payload.endTime = formattedEndTime;
      }

      onSubmit(payload);
      closeTimePicker();
    };

    useEffect(() => {
      if (!value) return;
      if (value.startTime) {
        const parsedStartTime = dayjs(value.startTime, 'HH:mm');
        if (parsedStartTime.isValid()) {
          setStartTime(parsedStartTime);
        }
      }

      if (value.endTime) {
        const parsedEndTime = dayjs(value.endTime, 'HH:mm');
        if (parsedEndTime.isValid()) {
          setEndTime(parsedEndTime);
        }
      }
    }, [value]);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
          <Input
            placeholder={placeholder}
            error={error}
            className={singleTime ? 'single-time-inp' : 'time-inp'}
            label={label || 'Select Time'}
            required={req}
            value={
              singleTime
                ? startTime?.format(timeFormat === '12h' ? 'hh:mm A' : 'HH:mm') || ''
                : startTime && endTime
                  ? `${startTime.format(timeFormat === '12h' ? 'hh:mm A' : 'HH:mm')} - ${endTime.format(
                      timeFormat === '12h' ? 'hh:mm A' : 'HH:mm'
                    )}`
                  : ''
            }
            onClick={() => openTimePicker('start')}
            icon={clock}
          />
          <SelectWrapper>
            <Select
              options={hourOptions}
              value={hourOptions.find((option) => option.value === timeFormat)}
              onChange={handleFormatChange}
              label="‎"
            />
          </SelectWrapper>

          <Modal centered width="400px" isOpen={Boolean(openPicker)} onClose={closeTimePicker}>
            <Row>
              {!singleTime && (
                <>
                  <StartEndTimeToggle
                    onClick={() => setOpenPicker('start')}
                    $isActive={openPicker === 'start'}
                  >
                    Start time
                  </StartEndTimeToggle>
                  <StartEndTimeToggle
                    $isActive={openPicker === 'end'}
                    onClick={() => setOpenPicker('end')}
                  >
                    End time
                  </StartEndTimeToggle>
                </>
              )}
              {singleTime && <div className="text-lg font-medium">Select Time</div>}
            </Row>

            <StaticTimePicker
              key={openPicker}
              ref={ref}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .css-182xs1g-MuiClock-clock': {
                  backgroundColor: '#EFF2F9',
                },
              }}
              value={openPicker === 'start' ? startTime : endTime}
              onChange={(newValue) =>
                openPicker === 'start' ? setStartTime(newValue) : setEndTime(newValue)
              }
              ampm={timeFormat === '12h'}
              showToolbar={false}
              slotProps={{
                actionBar: { actions: null },
                toolbar: {
                  toolbarTitle: '',
                  sx: {
                    '& .css-1t7mqoy-MuiTimePickerToolbar-hourMinuteLabel': {
                      display: 'flex',
                      alignItems: 'center',
                      '& button': {
                        display: 'flex',
                        alignItems: 'center',
                        background: '#EFF2F9',
                        padding: '20px',
                        '& .css-jdw6pu-MuiTypography-root-MuiPickersToolbarText-root.Mui-selected':
                          {
                            color: '#2D6CDF',
                          },
                      },
                    },
                    '& .css-1aj8kjr-MuiTimePickerToolbar-amPmSelection': {
                      background: '#EFF2F9',
                      display: 'flex',
                      borderRadius: '4px',
                      '& button:nth-of-type(1), & button:nth-of-type(2)': {
                        padding: '16px 10px',
                        height: '48px',
                      },
                      '& .css-1tht8iq-MuiTypography-root-MuiPickersToolbarText-root.Mui-selected':
                        {
                          color: '#2D6CDF',
                        },
                    },
                  },
                },
              }}
              slots={{
                leftArrowIcon: () => null,
                rightArrowIcon: () => null,
              }}
            />

            <Row>
              <Button onClick={closeTimePicker} secondary type="link">
                Cancel
              </Button>
              <Button
                disabled={allowDisabled && (!startTime || !endTime)}
                onClick={handleSubmit}
                secondary
                type="link"
              >
                Ok
              </Button>
            </Row>
          </Modal>
        </Container>
      </LocalizationProvider>
    );
  }
);

export default TimeSelector;
