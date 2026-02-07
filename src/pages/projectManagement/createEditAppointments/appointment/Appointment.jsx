import { useEffect, useState } from 'react';

import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Trash from 'assets/profile/trash.svg';
import CustomTimePicker from 'common-ui/customTimePicker';
import Input from 'common-ui/input';
import { ErrorText, Icon } from 'common-ui/input/Input.styles';
import errorIcon from 'common-ui/input/assets/error.svg';
import MyCheckbox from 'common-ui/myCheckbox';
import { AsyncSelect, Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import TimeSelector from 'common-ui/timeSelector';
import {
  TICKET_APPOINTMENT_DURATION_OPTIONS,
  TICKET_APPOINTMENT_FREQUENCY_OPTIONS,
  TICKET_APPOINTMENT_REMINDER_OPTIONS,
  TICKET_APPOINTMENT_SERVICE_OPTIONS,
  TICKET_APPOINTMENT_WEEKDAY_OPTIONS,
} from 'constants/constants';
import { selectSingleTicket } from 'features/projectManagement/ProjectManagementSlice';
import { getTimezone } from 'features/projects/projectsActions';
import { selectTimezone } from 'features/projects/projectsSlice';
import MyPhoneInput from 'pages/components/myPhoneInput';
import {
  Column,
  CommunicationContainer,
  CommunicationLabel,
  CommunicationRow,
  CommunicationTitle,
  Container,
  DatePickWrapper,
  DisabledWrapper,
  FormRow,
  TextAreaWrapper,
  TimeSelectorWrapper,
  TrashIcon,
  WeekDayLabel,
  WeekdayContainer,
} from 'pages/projectManagement/createEditTicket/appointment/Appointment.styles';
import { capitalizeFirstLetter, generateOptions } from 'utils';

const Appointment = ({ control, setValue, unregister, errors, clearErrors }) => {
  const [isWeakly, setIsWeakly] = useState(false);
  const [isDaily, setIsDaily] = useState(false);
  const [weekdays, setWeekdays] = useState([]);
  const { uuid } = useParams();
  const ticket = useSelector(selectSingleTicket);

  const dispatch = useDispatch();
  const timezone = useSelector(selectTimezone);

  const handleGetTimezone = () => {
    dispatch(getTimezone());
  };

  const handleFrequencyChange = (option) => {
    setWeekdays([]);
    if (option.value === 'Weekly') {
      setIsWeakly(true);
      setIsDaily(false);
    } else if (option.value === 'Daily') {
      setIsWeakly(false);
      setIsDaily(true);
    } else {
      setIsWeakly(false);
      setIsDaily(false);
    }
  };

  const handleWeekdaysChange = (days) => {
    setWeekdays(days);
  };

  const handleRemoveWeekday = (index) => {
    setWeekdays((prevWeekdays) => {
      const updatedWeekdays = prevWeekdays.filter((_, i) => i !== index);

      setValue('appt-weekdays', updatedWeekdays);

      const removedWeekday = prevWeekdays[index];
      if (removedWeekday) {
        unregister(`appt-time-${removedWeekday.value}`);
      }

      return updatedWeekdays;
    });
  };

  useEffect(() => {
    setWeekdays([]);
    if (ticket?.appointment?.frequency === 'Weekly') {
      setIsWeakly(true);
      if (!ticket.appointment.weekdays) {
        return;
      }
      const mappedWeekdays = ticket?.appointment?.weekdays
        ?.map(({ weekday, time }) => {
          const dayOption = TICKET_APPOINTMENT_WEEKDAY_OPTIONS.find(
            (opt) => opt.value == weekday
          );
          return dayOption ? { ...dayOption, time } : null;
        })
        .filter(Boolean);
      setWeekdays(mappedWeekdays);
    }
  }, [uuid, ticket]);

  useEffect(() => {
    if (uuid && ticket?.appointment) {
      if (ticket.appointment.frequency === 'Daily') {
        setIsDaily(true);
        setIsWeakly(false);
      } else if (ticket.appointment.frequency === 'Weekly') {
        setIsDaily(false);
        setIsWeakly(true);
      } else {
        setIsDaily(false);
        setIsWeakly(false);
      }
    }
  }, [uuid]);

  useEffect(() => {
    if (uuid) {
      setValue('appt-time', { startTime: ticket?.appointment?.time });
    }
  }, [isDaily]);

  useEffect(() => {
    if (!uuid) {
      setWeekdays([]);
      setIsDaily(false);
      setIsWeakly(false);
      setValue('phone-call', { enabled: true, value: '' });
    }
  }, []);

  useEffect(() => {
    if (ticket?.appointment?.timezoneId) {
      setValue('appt-timezoneId', ticket?.appointment?.timezoneId);
    }
  }, [ticket]);

  return (
    <Container>
      <Column>
        <Controller
          name="appt-location"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              placeholder="Location"
              label="Set the location"
              required
              maxLength={500}
              error={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="appt-description"
          control={control}
          render={({ field, fieldState }) => (
            <TextAreaWrapper>
              <TextArea
                {...field}
                placeholder="Description"
                label="Description"
                maxLength={500}
                className="textArea"
                error={fieldState.error?.message}
              />
            </TextAreaWrapper>
          )}
        />

        <Controller
          name="appt-timezoneId"
          control={control}
          render={({ field, fieldState }) => (
            <AsyncSelect
              {...field}
              isSearchable={false}
              $error={fieldState.error?.message}
              label="Time zone"
              loadOptions={handleGetTimezone}
              onMenuOpen={handleGetTimezone}
              defaultOptions={generateOptions(timezone)}
              req
            />
          )}
        />

        <Controller
          name="appt-service"
          control={control}
          render={({ field, fieldState }) => (
            <Select
              options={TICKET_APPOINTMENT_SERVICE_OPTIONS}
              {...field}
              $error={fieldState.error?.message}
              label="Service"
              req
              menuPlacement={'top'}
            />
          )}
        />
      </Column>
      <Column>
        <FormRow>
          <Controller
            name="appt-frequency"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                $error={fieldState.error?.message}
                req
                label="Frequency"
                onChange={(frequency) => {
                  handleFrequencyChange(frequency);
                  field.onChange(frequency);
                }}
                className="appt-select frequency-select"
                options={[...TICKET_APPOINTMENT_FREQUENCY_OPTIONS]}
                defaultValue={{ value: 'One-time', label: 'One-time' }}
              />
            )}
          />

          {!isWeakly && !isDaily ? (
            <Controller
              name="appt-date"
              control={control}
              key={'appt-date'}
              render={({ field }) => (
                <DatePickWrapper>
                  <CustomTimePicker
                    {...field}
                    label="Choose date"
                    options={TICKET_APPOINTMENT_WEEKDAY_OPTIONS}
                    height="44px"
                  />
                </DatePickWrapper>
              )}
            />
          ) : isWeakly ? (
            <Controller
              name="appt-weekdays"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  req
                  isClearable={false}
                  $error={fieldState.error?.message}
                  isMulti
                  hideMultiContainer
                  className="choose-days"
                  label="Choose days"
                  placeholder="Choose days"
                  value={weekdays}
                  onChange={(days) => {
                    const selectedDays = Array.isArray(days) ? days : days ? [days] : [];
                    field.onChange(selectedDays);
                    handleWeekdaysChange(selectedDays);
                  }}
                  options={TICKET_APPOINTMENT_WEEKDAY_OPTIONS}
                />
              )}
            />
          ) : isDaily ? (
            <Controller
              name="appt-time"
              key={'appt-time'}
              control={control}
              render={({ field }) => (
                <TimeSelector
                  {...field}
                  singleTime
                  value={field.value}
                  onSubmit={(time) => field.onChange(time)}
                  onChange={(time) => field.onChange(time)}
                />
              )}
            />
          ) : null}
        </FormRow>
        {isWeakly && (
          <>
            {weekdays?.map((item, index) => (
              <WeekdayContainer key={`row-number-${index}`}>
                <WeekDayLabel>{item.label}</WeekDayLabel>
                <Controller
                  name={`appt-time-${item.value}`}
                  control={control}
                  render={({ field }) => (
                    <TimeSelectorWrapper>
                      <TimeSelector
                        {...field}
                        singleTime
                        value={field.value}
                        onSubmit={(time) => field.onChange(time)}
                        onChange={(time) => field.onChange(time)}
                      />
                      <TrashIcon
                        src={Trash}
                        alt="Remove row"
                        onClick={() => handleRemoveWeekday(index)}
                      />
                    </TimeSelectorWrapper>
                  )}
                />
              </WeekdayContainer>
            ))}
          </>
        )}
        <FormRow>
          <Controller
            name="appt-duration"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                label="Duration"
                $error={fieldState.error?.message}
                req
                className="appt-select frequency-select"
                options={TICKET_APPOINTMENT_DURATION_OPTIONS}
              />
            )}
          />

          <Controller
            name="appt-reminder"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                label="Reminder"
                className="appt-select frequency-select"
                $error={fieldState.error?.message}
                req
                options={TICKET_APPOINTMENT_REMINDER_OPTIONS}
              />
            )}
          />
        </FormRow>
        <CommunicationContainer>
          <CommunicationTitle>
            Communication method <span> *</span>
          </CommunicationTitle>
          {['phone-call', 'text-message', 'email'].map((method) => (
            <Controller
              key={method}
              name={`communication.${method}`}
              control={control}
              render={({ field, fieldState }) => (
                <CommunicationRow $disabled={!field.value?.enabled}>
                  <MyCheckbox
                    onClick={() => {
                      const isDisabling = field.value?.enabled;
                      field.onChange(
                        isDisabling
                          ? {
                              enabled: false,
                              value: field.name === 'communication.email' ? '' : '+374',
                            }
                          : { enabled: true, value: field.value?.value || '' }
                      );

                      if (isDisabling) {
                        clearErrors(`${field.name}.value`);
                      }
                    }}
                    selected={field.value?.enabled}
                  />
                  <CommunicationLabel>
                    {capitalizeFirstLetter(method.replace('-', ' '))}
                  </CommunicationLabel>
                  {method === 'email' ? (
                    <Input
                      className="input-div"
                      disabled={!field.value?.enabled}
                      value={field.value?.value || ''}
                      onChange={(e) =>
                        field.onChange({ ...field.value, value: e.target.value })
                      }
                      error={fieldState.error?.value?.message}
                    />
                  ) : (
                    <MyPhoneInput
                      disabled={!field.value?.enabled}
                      value={field.value?.value || ''}
                      onChange={(phone) => field.onChange({ ...field.value, value: phone })}
                      error={fieldState.error?.value?.message}
                    />
                  )}
                </CommunicationRow>
              )}
            />
          ))}
          {errors?.communication?.root?.message && (
            <ErrorText>
              <Icon src={errorIcon} alt="error" />
              {errors?.communication?.root?.message}
            </ErrorText>
          )}
        </CommunicationContainer>
        {uuid && (
          <DisabledWrapper>
            <Controller
              name={`appt-disabled`}
              control={control}
              render={({ field }) => (
                <Switch isOn={!field.value} onToggle={() => field.onChange(!field.value)} />
              )}
            />
          </DisabledWrapper>
        )}
      </Column>
    </Container>
  );
};

export default Appointment;
