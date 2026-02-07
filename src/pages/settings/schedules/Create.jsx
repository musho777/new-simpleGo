import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect, Select } from 'common-ui/select';
import TimeSelector from 'common-ui/timeSelector';
import { TICKET_APPOINTMENT_WEEKDAY_OPTIONS } from 'constants/constants';
import { getTimezone } from 'features/projects/projectsActions';
import { selectTimezone } from 'features/projects/projectsSlice';
import { createSchedule } from 'features/schedules/scheduleActions';
import useDebounce from 'hooks/useDebounce';
import { generateOptions } from 'utils';

import {
  ErrorForInputs,
  HeadOfShift,
  Row,
  Step2,
  TimeSelectorWrapper,
  TitleRate,
} from './Schedules.styles';
import { baseSchema, validationSchema } from './schema';
import { useSchedulesSearchParams } from './useSearchData';

const Create = () => {
  const { searchData, setSchedulesSearchData } = useSchedulesSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchData.name || '');
  const timezone = useSelector(selectTimezone);
  const [first, setFirst] = useState(false);
  const [step, setStep] = useState(1);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const dispatch = useDispatch();

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    reset();
    setIsModalOpen(false);
    setStep(1);
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(step === 1 ? baseSchema : validationSchema),
    shouldUnregister: false,
    defaultValues: {
      name: '',
      weekdays: [],
      timezoneId: null,
      shiftTime: { startTime: '', endTime: '' },
      breakTime: { startTime: '', endTime: '' },
      nightTime: { startTime: '', endTime: '' },
      overtimeRate: '',
      nightRate: '',
      weekendRate: '',
      holidayRate: '',
    },
  });

  const onSubmit = (data) => {
    const {
      name,
      overtimeRate,
      timezoneId,
      nightRate,
      weekendRate,
      holidayRate,
      shiftTime,
      breakTime,
      nightTime,
      weekdays,
    } = data;
    const params = {};
    params.name = name;
    params.nightRate = nightRate;
    params.weekendRate = weekendRate;
    params.holidayRate = holidayRate;
    params.overtimeRate = overtimeRate;
    params.timezoneId = timezoneId?.value;
    params.shiftStart = shiftTime.startTime;
    params.shiftEnd = shiftTime.endTime;
    params.breakStart = breakTime.startTime;
    params.breakEnd = breakTime.endTime;
    params.nightStart = nightTime.startTime;
    params.nightEnd = nightTime.endTime;
    params.workdays = weekdays?.map((item) => item.value);

    dispatch(createSchedule(params));
    handleCloseModal();
  };

  const handleGetTimezone = () => {
    dispatch(getTimezone());
  };

  const handleSearchValueChange = (e) => {
    setFirst(true);
    setSearchValue(e.target.value);
  };

  const handleNext = async () => {
    const valid = await trigger(['name', 'weekdays', 'timezoneId']);
    if (valid) {
      setStep(2);
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const regex = /^(10(\.0{1,2})?|[0-9](\.[0-9]{0,2})?)$/;

    if (value === '' || regex.test(value)) {
      field.onChange(value);
    }
  };
  useEffect(() => {
    if (first) setSchedulesSearchData({ name: debouncedSearchValue });
  }, [debouncedSearchValue]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <HeadOfShift>
        <Input
          value={searchValue}
          placeholder="Search..."
          maxLength="50"
          onChange={handleSearchValueChange}
        />
        <Button button secondary type="submit" onClick={handleOpenModal}>
          + Add schedule
        </Button>
      </HeadOfShift>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create Schedule"
        width="474px"
        min-height={'440px'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Schedule Name"
                    error={errors.name?.message}
                    placeholder="Enter schedule name"
                    maxLength={50}
                  />
                )}
              />
              <Controller
                name="weekdays"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    label="Weekdays"
                    placeholder="At least one day must be selected"
                    options={TICKET_APPOINTMENT_WEEKDAY_OPTIONS}
                    $error={errors.weekdays?.message}
                    menuPlacement="bottom"
                    maxMenuHeight={'130px'}
                  />
                )}
              />
              <Controller
                name="timezoneId"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    label="Time zone"
                    isSearchable={false}
                    $error={errors.timezoneId?.message}
                    loadOptions={handleGetTimezone}
                    onMenuOpen={handleGetTimezone}
                    defaultOptions={generateOptions(timezone)}
                    placeholder="Select timezone for the schedule"
                  />
                )}
              />

              <Row>
                <Button outlined onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button secondary type="button" onClick={handleNext}>
                  Next
                </Button>
              </Row>
            </>
          )}

          {step === 2 && (
            <Step2>
              <TimeSelectorWrapper>
                <Controller
                  name="shiftTime"
                  control={control}
                  render={({ field }) => (
                    <TimeSelector
                      {...field}
                      allowDisabled
                      placeholder="00:00"
                      label="Shift time"
                      onSubmit={(time) => field.onChange(time)}
                      error={
                        errors.shiftTime?.startTime?.message ||
                        errors.shiftTime?.endTime?.message
                      }
                    />
                  )}
                />
              </TimeSelectorWrapper>
              <TimeSelectorWrapper>
                <Controller
                  name="breakTime"
                  control={control}
                  render={({ field }) => (
                    <TimeSelector
                      {...field}
                      label="Break time"
                      placeholder="00:00"
                      allowDisabled
                      onSubmit={(time) => field.onChange(time)}
                      error={
                        errors.breakTime?.startTime?.message ||
                        errors.breakTime?.endTime?.message
                      }
                    />
                  )}
                />
              </TimeSelectorWrapper>
              <TimeSelectorWrapper>
                <Controller
                  name="nightTime"
                  control={control}
                  render={({ field }) => (
                    <TimeSelector
                      {...field}
                      placeholder="00:00"
                      label="Night time"
                      allowDisabled
                      onSubmit={(time) => field.onChange(time)}
                      error={
                        errors.nightTime?.startTime?.message ||
                        errors.nightTime?.endTime?.message
                      }
                    />
                  )}
                />
              </TimeSelectorWrapper>

              <ErrorForInputs>
                <TitleRate>Out of shift hours rate</TitleRate>
                <Row>
                  <Controller
                    name="overtimeRate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Overtime"
                        labelColor="#6C757D"
                        placeholder="0.00"
                        error={!!errors.overtimeRate?.message}
                        onChange={handleChange(field)}
                        type="number"
                      />
                    )}
                  />

                  <Controller
                    name="nightRate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Night"
                        placeholder="0.00"
                        labelColor="#6C757D"
                        error={!!errors.nightRate?.message}
                        onChange={handleChange(field)}
                        type="number"
                      />
                    )}
                  />

                  <Controller
                    name="weekendRate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Weekend"
                        labelColor="#6C757D"
                        placeholder="0.00"
                        error={!!errors.weekendRate?.message}
                        onChange={handleChange(field)}
                        type="number"
                      />
                    )}
                  />

                  <Controller
                    name="holidayRate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Holiday"
                        placeholder="0.00"
                        labelColor="#6C757D"
                        error={!!errors.holidayRate?.message}
                        onChange={handleChange(field)}
                        type="number"
                      />
                    )}
                  />
                </Row>
                <ErrorForInputs>
                  <p>
                    {errors.overtimeRate?.message ||
                      errors.nightRate?.message ||
                      errors.weekendRate?.message ||
                      errors.holidayRate?.message}
                  </p>
                </ErrorForInputs>
              </ErrorForInputs>

              <Row>
                <Button outlined type="button" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button secondary type="submit">
                  Create schedule
                </Button>
              </Row>
            </Step2>
          )}
        </form>
      </Modal>
    </>
  );
};

export default Create;
