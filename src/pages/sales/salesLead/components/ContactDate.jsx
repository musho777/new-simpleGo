import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import CustomDatePicker from 'common-ui/customDatePicker';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import TextArea from 'common-ui/textArea';
import TimeSelector from 'common-ui/timeSelector';
import dayjs from 'dayjs';
import { createFollowUp, getLeadFollowUps, updateFollowUp } from 'features/sales/salesActions';
import { buildQueryString } from 'utils';
import * as Yup from 'yup';

import {
  DatePickerWrapper,
  TimePickerWrapper,
  TimeSelectorWrapper,
  UpdateStatusForm,
} from './Components.styles';

const schema = Yup.object().shape({
  Date: Yup.mixed()
    .nullable()
    .test('is-required', 'Date is required', function (value) {
      return value !== null && value !== '' && value !== undefined;
    }),
  Time: Yup.object().required('Time is required'),
  recipients: Yup.array()
    .min(1, 'At least one recipient is required')
    .required('Recipients are required'),
  Notes: Yup.string().optional(),
});

const ContactDate = ({ isOpen, onClose, leadId, editingFollowUp, isEditMode }) => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState({ recipient: false });
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nextStatus: null,
      precedingStatus: null,
      setRemember: false,
      reminderDate: null,
      reminderTime: null,
      recipients: [],
      tip: '',
      Date: null,
      Time: null,
      Notes: '',
    },
    shouldFocusError: false,
  });

  const loadRecipients = async (inputValue = '') => {
    try {
      setLoading((prev) => ({ ...prev, recipient: true }));

      const params = {
        search: inputValue,
      };

      const query = buildQueryString(params);
      const response = await ApiClient.get(`/sales/follow-up-recipients?${query}`);

      const allRecipients = [
        ...(response.users || []).map((user) => ({
          ...user,
          displayName: `${user.name}`,
          type: 'user',
        })),
        ...(response.teams || []).map((team) => ({
          ...team,
          displayName: `${team.name}`,
          type: 'team',
        })),
        ...(response.departments || []).map((dept) => ({
          ...dept,
          displayName: `${dept.name}`,
          type: 'department',
        })),
      ];

      const recipientOptions = allRecipients.map((recipient) => ({
        value: recipient.uuid,
        label: recipient.displayName,
        type: recipient.type,
      }));
      setRecipients(recipientOptions);
      setLoading((prev) => ({ ...prev, recipient: false }));
      return recipientOptions;
    } catch (error) {
      setLoading((prev) => ({ ...prev, recipient: false }));
      return [];
    }
  };

  const onSubmit = async (data) => {
    try {
      const { Date: selectedDate, Time, recipients, Notes } = data;
      const dateTime = new window.Date(selectedDate);
      if (Time?.startTime) {
        const [hours, minutes] = Time.startTime.split(':');
        dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      }

      const recipientUserIds = recipients
        .filter((recipient) => recipient.type === 'user')
        .map((recipient) => recipient.value);

      const recipientTeamIds = recipients
        .filter((recipient) => recipient.type === 'team')
        .map((recipient) => recipient.value);

      const recipientDepartmentIds = recipients
        .filter((recipient) => recipient.type === 'department')
        .map((recipient) => recipient.value);

      const payload = {
        leadId: leadId,
        type: 'next_contact',
        scheduledDateTime: dateTime.toISOString(),
        recipientUserId: recipientUserIds,
        recipientTeamId: recipientTeamIds,
        recipientDepartmentId: recipientDepartmentIds,
        notes: Notes || '',
      };

      if (isEditMode && editingFollowUp) {
        await dispatch(
          updateFollowUp({ followUpId: editingFollowUp.uuid, data: payload })
        ).unwrap();
      } else {
        await dispatch(createFollowUp(payload)).unwrap();
      }

      dispatch(getLeadFollowUps(leadId));
      reset();
      onClose();
    } catch (error) {
      console.error('Error saving follow-up:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (isEditMode && editingFollowUp) {
      const scheduledDate = new Date(editingFollowUp.scheduledDateTime);

      setValue('Date', scheduledDate);

      const hours = scheduledDate.getHours().toString().padStart(2, '0');
      const minutes = scheduledDate.getMinutes().toString().padStart(2, '0');
      setValue('Time', { startTime: `${hours}:${minutes}` });

      setValue('Notes', editingFollowUp.notes || '');

      const recipients = [];
      if (editingFollowUp.recipientUsers && Array.isArray(editingFollowUp.recipientUsers)) {
        editingFollowUp.recipientUsers.forEach((user) => {
          recipients.push({
            type: 'user',
            value: user.uuid,
            label: `${user.name} ${user.surname}` || 'User',
          });
        });
      } else if (editingFollowUp.recipientTeamId) {
        recipients.push({
          type: 'team',
          value: editingFollowUp.recipientTeamId,
          label: editingFollowUp.recipientTeamName || 'Team',
        });
      } else if (editingFollowUp.recipientDepartmentId) {
        recipients.push({
          type: 'department',
          value: editingFollowUp.recipientDepartmentId,
          label: editingFollowUp.recipientDepartmentName || 'Department',
        });
      }
      setValue('recipients', recipients);
    } else {
      reset();
    }
  }, [isEditMode, editingFollowUp]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit Contact Date' : 'Create New Contact Date'}
      closeIcon
      maxHeight={'80%'}
      onOk={handleSubmit(onSubmit)}
      footer={true}
    >
      <UpdateStatusForm onSubmit={handleSubmit(onSubmit)}>
        <TimePickerWrapper>
          <Controller
            name="Date"
            control={control}
            render={({ field }) => (
              <DatePickerWrapper>
                <CustomDatePicker
                  {...field}
                  label="Date"
                  height={44}
                  placeholder="Select date"
                  error={errors.Date?.message}
                  minDate={dayjs()}
                  req
                />
              </DatePickerWrapper>
            )}
          />
          <Controller
            name="Time"
            control={control}
            render={({ field }) => (
              <TimeSelectorWrapper>
                <TimeSelector
                  {...field}
                  showToolbar={false}
                  label="Time"
                  placeholder="Select time"
                  error={errors.Time?.message}
                  req
                  singleTime
                  onSubmit={(time) => field.onChange(time)}
                  format="HH:mm"
                />
              </TimeSelectorWrapper>
            )}
          />
        </TimePickerWrapper>

        <Controller
          name="recipients"
          control={control}
          render={({ field: { onChange, value } }) => (
            <AsyncSelect
              value={value}
              onChange={onChange}
              maxMenuHeight={150}
              label="Recipients"
              $error={errors.recipients?.message}
              loadOptions={loadRecipients}
              onMenuOpen={() => loadRecipients('')}
              defaultOptions={recipients}
              placeholder="Select recipients"
              isWhiteArrow={true}
              req
              isMulti
              isClearable
              cacheOptions
              isLoading={loading.recipient}
              getOptionValue={(option) => option.value}
            />
          )}
        />

        <Controller
          name="Notes"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              placeholder="Enter schedule name"
              label="Notes"
              maxLength={200}
              error={errors.Notes?.message}
              resizeVertical={false}
              resizeHorizontal={false}
            />
          )}
        />
      </UpdateStatusForm>
    </Modal>
  );
};

export default ContactDate;
