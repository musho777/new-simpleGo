import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect, Select } from 'common-ui/select';
import TimeSelector from 'common-ui/timeSelector';
import { getTimezone } from 'features/projects/projectsActions';
import { selectTimezone } from 'features/projects/projectsSlice';
import { editSchedule, getSchedule } from 'features/schedules/scheduleActions';
import { selectSchedule } from 'features/schedules/scheduleSlice';
import styled from 'styled-components';
import { generateOptions } from 'utils';

import {
  ErrorForInputs,
  Row,
  Step2,
  TimeSelectorWrapper,
  TitleRate,
} from './Schedules.styles';
import { baseSchema, validationSchema } from './schema';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TICKET_APPOINTMENT_WEEKDAY_OPTIONS = [
  { label: 'Sunday', value: '0' },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
];

const Edit = ({ uuid, handleCloseEditModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const schedule = useSelector(selectSchedule);
  const timezone = useSelector(selectTimezone);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setStep(1);
    reset();
    setIsModalOpen(false);
    handleCloseEditModal();
  };

  useEffect(() => {
    if (uuid) {
      dispatch(getSchedule(uuid));
      setIsModalOpen(true);
    }
  }, [uuid, dispatch]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  useEffect(() => {
    if (schedule) {
      const selectedWeekdays = TICKET_APPOINTMENT_WEEKDAY_OPTIONS.filter((option) =>
        schedule?.workdays?.includes(+option.value)
      );

      reset({
        name: schedule.name,
        description: schedule.description,
        weekdays: selectedWeekdays,
        timezoneId: { label: schedule?.timezone?.name, value: schedule?.timezone?.uuid },
        shiftTime: {
          startTime: schedule.shiftStart,
          endTime: schedule.shiftEnd,
        },
        breakTime: {
          startTime: schedule.breakStart,
          endTime: schedule.breakEnd,
        },
        nightTime: {
          startTime: schedule.nightStart,
          endTime: schedule.nightEnd,
        },
        overtimeRate: schedule.overtimeRate,
        nightRate: schedule.nightRate,
        weekendRate: schedule.weekendRate,
        holidayRate: schedule.holidayRate,
      });
    }
  }, [schedule, reset]);

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
    params.workdays = weekdays?.map((item) => +item.value);
    params.uuid = uuid;

    dispatch(editSchedule(params));
    handleCloseModal();
  };

  const handleGetTimezone = () => {
    dispatch(getTimezone());
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const regex = /^(10(\.0{1,2})?|[0-9](\.[0-9]{0,2})?)$/;

    if (value === '' || regex.test(value)) {
      field.onChange(value);
    }
  };

  const handleNext = async () => {
    const valid = await trigger(['name', 'weekdays', 'timezoneId']);
    if (valid) {
      setStep(2);
    }
  };

  useEffect(() => {
    dispatch(getSchedule(uuid));
  }, []);

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
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit schedule" width="474px">
      <FormWrapper>
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
                    label="Workdays"
                    maxMenuHeight={'140px'}
                    placeholder="At least one day must be selected"
                    options={TICKET_APPOINTMENT_WEEKDAY_OPTIONS}
                    $error={errors.weekdays?.message}
                    menuPlacement="bottom"
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
                    placeholder="Select timezone for the schedule"
                    onMenuOpen={handleGetTimezone}
                    defaultOptions={generateOptions(timezone)}
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
                      label="Shift time"
                      allowDisabled
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
                        labelColor="#6C757D"
                        label="Overtime"
                        placeholder="0.00"
                        onChange={handleChange(field)}
                        error={!!errors.overtimeRate?.message}
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
                        labelColor="#6C757D"
                        placeholder="0.00"
                        onChange={handleChange(field)}
                        error={!!errors.nightRate?.message}
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
                        labelColor="#6C757D"
                        label="Weekend"
                        placeholder="0.00"
                        onChange={handleChange(field)}
                        error={!!errors.weekendRate?.message}
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
                        labelColor="#6C757D"
                        placeholder="0.00"
                        onChange={handleChange(field)}
                        error={!!errors.holidayRate?.message}
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
                  Save schedule
                </Button>
              </Row>
            </Step2>
          )}
        </form>
      </FormWrapper>
    </Modal>
  );
};

export default Edit;
