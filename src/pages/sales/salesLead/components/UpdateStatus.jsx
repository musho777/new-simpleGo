import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import reminder from 'assets/reminder.svg';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import { Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TimeSelector from 'common-ui/timeSelector';
import { nextLeadStep, updateLeadStatus } from 'features/sales/salesActions';
import { setResetAll } from 'features/sales/salesSlice';
import { buildQueryString } from 'utils';
import { formatDateTime } from 'utils/dateUtils';
import { notifyError } from 'utils/notifyConfig';
import * as Yup from 'yup';

import AssignCustomerModal from './AssignCustomerModal';
import {
  DatePickerWrapper,
  Icon,
  Reminder,
  TimePickerWrapper,
  TimeSelectorWrapper,
  UpdateStatusForm,
} from './Components.styles';

const schema = Yup.object().shape({
  nextStatus: Yup.object().nullable(),
  precedingStatus: Yup.object().nullable(),
  setRemember: Yup.boolean(),
  reminderDate: Yup.date()
    .typeError('Date is required')
    .when('setRemember', {
      is: true,
      then: (schema) => schema.required('Date is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  reminderTime: Yup.object().when('setRemember', {
    is: true,
    then: (schema) => schema.required('Reminder time is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  recipient: Yup.array().when('setRemember', {
    is: true,
    then: (schema) => schema.min(1, 'At least one recipient is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  tip: Yup.string(),
});

const UpdateStatus = ({
  isOpen,
  onClose,
  status,
  currentStatus,
  leadId,
  option,
  selectedStatus,
}) => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState({ recipient: false });
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [pendingStatusData, setPendingStatusData] = useState(null);
  const {
    handleSubmit,
    control,
    reset,
    watch,
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
      recipient: [],
      tip: '',
    },
    shouldFocusError: false,
  });

  const watchSetRemember = watch('setRemember');
  const watchNextStatus = watch('nextStatus');
  const watchPrecedingStatus = watch('precedingStatus');
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleChangeStatus = (selectedOption) => {
    if (selectedOption) {
      setValue('precedingStatus', null);
    }
  };

  const handleChangePrecedingStatus = (selectedOption) => {
    if (selectedOption) {
      setValue('nextStatus', null);
    }
  };

  const handleChange = () => {
    dispatch(
      nextLeadStep({
        leadId: leadId,
        data: {
          option: option,
          currentStatusId: selectedStatus?.value,
        },
      })
    )
      .unwrap()
      .then((nextLead) => {
        if (nextLead.leadId) {
          dispatch(setResetAll());
          navigate(`/leads/${nextLead.leadId}`, { replace: true });
        } else {
          navigate(-1);
        }
      });
  };

  const validateStatusSelection = (data) => {
    if (!data?.nextStatus?.value && !data?.precedingStatus.value) {
      notifyError('Please select either next status or preceding status');
      return false;
    }
    return true;
  };

  const buildStatusPayload = (data, erpCustomerId = null) => {
    const selectedStatus = data.nextStatus || data.precedingStatus;
    const payload = {
      newStatusId: selectedStatus?.value || selectedStatus?.uuid,
      comment: data.tip || '',
      reminderEnabled: data.setRemember,
    };

    if (erpCustomerId) {
      payload.customerId = erpCustomerId;
    }

    if (data.setRemember) {
      payload.reminderDate = data.reminderDate ? formatDateTime(data.reminderDate, true) : '';
      payload.reminderTime = data.reminderTime ? data.reminderTime.startTime : '';
      payload.reminderRecipients = data.recipient.map((item) => item.value);
      payload.tip = data.tip || '';
    }

    return payload;
  };

  const executeStatusUpdate = async (payload) => {
    await dispatch(
      updateLeadStatus({
        leadId: leadId,
        data: payload,
      })
    )
      .unwrap()
      .then(() => {
        reset();
        setPendingStatusData(null);
        onClose();
        handleChange();
      });
  };

  const onSubmit = async (data) => {
    try {
      if (!validateStatusSelection(data)) return;

      const selectedStatus = data.nextStatus || data.precedingStatus;
      const statusArray = data.nextStatus
        ? currentStatus?.succeedingStatus?.length
          ? currentStatus.succeedingStatus
          : status
        : currentStatus?.precedingStatus?.length
          ? currentStatus.precedingStatus
          : status;

      const fullStatusObject = statusArray?.find((s) => s.uuid === selectedStatus?.value);
      if (fullStatusObject?.outcomeType === 'converted') {
        setPendingStatusData(data);
        setShowCustomerModal(true);
        reset();
        onClose();
        return;
      }

      const payload = buildStatusPayload(data);
      await executeStatusUpdate(payload);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const onApprove = async (data, erpCustomerId) => {
    try {
      if (!validateStatusSelection(data)) return;

      const payload = buildStatusPayload(data, erpCustomerId);
      await executeStatusUpdate(payload);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleClose = () => {
    reset();
    setPendingStatusData(null);
    onClose();
  };

  const handleCustomerApprove = (customerId) => {
    setShowCustomerModal(false);
    onApprove(pendingStatusData, customerId);
  };

  const handleCustomerDecline = () => {
    setShowCustomerModal(false);
    setPendingStatusData(null);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={'Update Status'}
        onOk={handleSubmit(onSubmit)}
        closeIcon
        maxHeight={'80%'}
        footer={true}
      >
        <UpdateStatusForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="nextStatus"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Next Status"
                $error={errors.nextStatus?.message}
                isClearable={true}
                options={
                  currentStatus?.succeedingStatus?.length
                    ? currentStatus.succeedingStatus
                    : status
                }
                placeholder="Select next status"
                menuPlacement="bottom"
                required
                isDisabled={
                  !!watchPrecedingStatus ||
                  currentStatus?.outcomeType === 'converted' ||
                  currentStatus?.outcomeType === 'lost'
                }
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  handleChangeStatus(selectedOption);
                }}
              />
            )}
          />

          <Controller
            name="precedingStatus"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Preceding Status"
                $error={errors.precedingStatus?.message}
                options={
                  currentStatus?.precedingStatus?.length
                    ? currentStatus?.precedingStatus
                    : status
                }
                placeholder="Select preceding status"
                maxMenuHeight={150}
                isClearable={true}
                required
                isDisabled={!!watchNextStatus || currentStatus?.outcomeType === 'initial'}
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                  handleChangePrecedingStatus(selectedOption);
                }}
              />
            )}
          />

          <Reminder>
            <div>
              <Icon src={reminder} alt="FullScreen" />
              <span>Set Reminder</span>
            </div>
            <Controller
              name="setRemember"
              control={control}
              render={({ field }) => (
                <Switch
                  isOn={field.value}
                  onToggle={() => {
                    const newValue = !field.value;
                    field.onChange(newValue);
                  }}
                />
              )}
            />
          </Reminder>

          {watchSetRemember && (
            <>
              <TimePickerWrapper>
                <Controller
                  name="reminderDate"
                  control={control}
                  render={({ field }) => (
                    <DatePickerWrapper>
                      <CustomDatePicker
                        {...field}
                        label="Date"
                        height={44}
                        placeholder="Select date"
                        error={errors.reminderDate?.message}
                        req
                        disablePast
                      />
                    </DatePickerWrapper>
                  )}
                />
                <Controller
                  name="reminderTime"
                  control={control}
                  render={({ field }) => (
                    <TimeSelectorWrapper>
                      <TimeSelector
                        {...field}
                        showToolbar={false}
                        label="Time"
                        placeholder="Select time"
                        error={errors.reminderTime?.message}
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
                name="recipient"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <AsyncSelect
                    value={value}
                    onChange={onChange}
                    maxMenuHeight={150}
                    label="Recipients"
                    $error={errors.recipient?.message}
                    loadOptions={loadRecipients}
                    onMenuOpen={() => loadRecipients('')}
                    defaultOptions={recipients}
                    placeholder="Select recipients"
                    isWhiteArrow={true}
                    req
                    isClearable
                    cacheOptions
                    isLoading={loading.recipient}
                    getOptionValue={(option) => option.value}
                    isMulti
                  />
                )}
              />

              <Controller
                name="tip"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Tip"
                    placeholder="Enter tip"
                    error={errors.tip?.message}
                    tooltip="Tip"
                  />
                )}
              />
            </>
          )}
        </UpdateStatusForm>
      </Modal>
      <AssignCustomerModal
        isOpen={showCustomerModal}
        onClose={handleCustomerDecline}
        onApprove={(e) => handleCustomerApprove(e)}
        leadId={leadId}
      />
    </>
  );
};

export default UpdateStatus;
