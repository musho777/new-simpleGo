import React, { useEffect, useState } from 'react';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import DragDropUploadFile from 'common-ui/dragDropUploadFile';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import RadioGroup from 'common-ui/radioGroup';
import { AsyncSelect } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import {
  FINANCE_REQUEST_ACCOUNTING_TYPE_OPTIONS,
  FINANCE_REQUEST_CURRENCY_OPTIONS,
  FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS,
  FINANCE_REQUEST_FLOW_TYPE_OPTIONS,
  FINANCE_REQUEST_FREQUENCY_OPTIONS,
  FINANCE_REQUEST_PAYMENT_METHOD_OPTIONS,
} from 'constants/constants';
import dayjs from 'dayjs';
import { getFinanceRequestById } from 'features/financeRequest/financeRequestActions';
import { getTicketLinkOptions } from 'features/projectManagement/ProjectManagementActions';
import { createFormData } from 'utils';
import { formatDateTime } from 'utils/dateUtils';
import * as Yup from 'yup';

import {
  AsyncSelectWrapper,
  ButtonRow,
  Column,
  ExistingWrapper,
  Form,
  FormRow,
  Label,
  LoadingContainer,
  RadioButtonWrapper,
  Row,
  SwitchWrapper,
} from './FinanceRequestModal.styles';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(250, 'Title must be at most 250 characters'),
  reason: Yup.string(),
  accountingType: Yup.object().required('Accounting type is required'),
  startDate: Yup.string(),
  endDate: Yup.string(),
  amountRequested: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(999999999999999, 'Amount cannot exceed 15 digits'),
  currency: Yup.object().required('Currency is required'),
  flowType: Yup.string().required('Flow type is required'),
  expenseType: Yup.string().required('Expense type is required'),
  paymentMethod: Yup.string().required('Payment method is required'),
  frequency: Yup.object().when('expenseType', {
    is: (expenseType) => expenseType === 'Fixed' || expenseType === 'Semi-Variable',
    then: () => Yup.object().required('Frequency is required'),
    otherwise: () => Yup.object().nullable(),
  }),
  linkToExistingTicket: Yup.boolean(),
  requiresTicketClosure: Yup.boolean(),
  linkedTicket: Yup.object().when('linkToExistingTicket', {
    is: true,
    then: () =>
      Yup.object().required(
        'Please select a ticket to link or turn off linking before saving.'
      ),
    otherwise: () => Yup.object().nullable(),
  }),
});

const FinanceRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  editId = null,
  isEditMode = false,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      reason: '',
      accountingType: null,
      startDate: '',
      endDate: '',
      amountRequested: '',
      currency: { value: 'AMD', label: 'AMD' },
      flowType: 'Expense',
      expenseType: 'Variable',
      paymentMethod: 'Transfer',
      frequency: null,
      recurrenceEndDate: '',
      linkToExistingTicket: false,
      linkedTicket: null,
      requiresTicketClosure: false,
      files: [],
    },
  });

  const linkToExistingTicket = useWatch({ control, name: 'linkToExistingTicket' });
  const requiresTicketClosure = useWatch({ control, name: 'requiresTicketClosure' });
  const expenseType = useWatch({ control, name: 'expenseType' });
  const startDate = useWatch({ control, name: 'startDate' });
  const endDate = useWatch({ control, name: 'endDate' });
  const [hasMoreCategories, setHasMoreCategories] = useState(true);
  const [categories, setCategories] = useState([]);

  const [ticketOffset, setTicketOffset] = useState(0);

  const loadCategories = async (inputValue, isLoadMore = false, offset = 0) => {
    try {
      const response = await dispatch(
        getTicketLinkOptions({
          search: inputValue,
          limit: 10,
          offset: offset,
        })
      ).unwrap();
      const newCategories = response.tickets || [];
      const ticketOptions = newCategories.map((elm) => ({
        value: elm.uuid,
        label: `(${elm.taskId}) ${elm.name} `,
      }));
      if (isLoadMore && offset > 0) {
        setCategories((prev) => [...prev, ...ticketOptions]);
      } else if (offset === 0) {
        setCategories(ticketOptions);
      }
      if (response.count >= offset) {
        setTicketOffset(offset + 10);
        setHasMoreCategories(response.count > offset);
      }
      return ticketOptions;
    } catch (error) {
      return [];
    }
  };
  const handleTicketScrollToBottom = () => {
    if (hasMoreCategories && !loading.ticket) {
      loadCategories('', true, ticketOffset);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      const formattedData = {
        title: data.title,
        reason: data.reason,
        accountingType: data.accountingType?.value,
        startDate: formatDateTime(data.startDate, true),
        endDate: formatDateTime(data.endDate, true),
        amountRequested: parseFloat(data.amountRequested),
        currency: data.currency?.value,
        flowType: data.flowType,
        expenseType: data.expenseType,
        paymentMethod: data.paymentMethod,
        ...(data.expenseType !== 'Variable' &&
          data.frequency?.value && { frequency: data.frequency.value }),
        ...(data.expenseType !== 'Variable' && {
          recurrenceEndDate: formatDateTime(data.recurrenceEndDate, true),
        }),
        linkToExistingTicket: data.linkToExistingTicket,
        ...(data.linkToExistingTicket && {
          linkedTicketId: data.linkedTicket?.value || data.linkedTicket?.uuid || null,
        }),
        ...(data.linkToExistingTicket &&
          !data.linkToExistingTicket && {
            linkedTicket: data.linkedTicket?.value || data.linkedTicket?.uuid || null,
          }),
        requiresTicketClosure: data.linkToExistingTicket,
      };

      const formData = new FormData();
      createFormData(formData, formattedData);

      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append('files', file);
        });
      }

      if (isEditMode && filesToDelete.length > 0) {
        filesToDelete.forEach((fileUuid) => {
          formData.append('filesToDelete', fileUuid);
        });
      }

      await onSubmit(formData, isEditMode ? editId : null);
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting finance request:', error);
    }
  };

  const handleClose = () => {
    reset();
    setEditData(null);
    setFilesToDelete([]);
    onClose();
  };

  useEffect(() => {
    const fetchEditData = async () => {
      if (isEditMode && editId && !editData) {
        setLoading(true);
        try {
          const requestData = await dispatch(getFinanceRequestById(editId)).unwrap();
          setEditData(requestData);
        } catch (error) {
          console.error('Failed to fetch finance request:', error);
        } finally {
          setLoading(false);
        }
      } else if (!isEditMode) {
        reset();
        setEditData(null);
        setFilesToDelete([]);
      }
    };

    fetchEditData();
  }, [isEditMode, editId, editData, dispatch, reset]);

  useEffect(() => {
    if (isEditMode && editData) {
      const findOptionByValue = (options, value) =>
        options.find((option) => option.value === value) || null;

      setValue('title', editData.title || '');
      setValue('reason', editData.reason || '');
      setValue(
        'accountingType',
        findOptionByValue(FINANCE_REQUEST_ACCOUNTING_TYPE_OPTIONS, editData.accountingType)
      );
      setValue('startDate', editData.startDate || '');
      setValue('endDate', editData.endDate || '');
      setValue('amountRequested', editData.amountRequested || '');
      setValue(
        'currency',
        findOptionByValue(FINANCE_REQUEST_CURRENCY_OPTIONS, editData.currency)
      );
      setValue('flowType', editData.flowType || '');
      setValue('expenseType', editData.expenseType || '');
      setValue('paymentMethod', editData.paymentMethod || 'Transfer');
      setValue(
        'frequency',
        findOptionByValue(FINANCE_REQUEST_FREQUENCY_OPTIONS, editData.frequency)
      );
      setValue('recurrenceEndDate', editData.recurrenceEndDate || '');
      setValue(
        'linkToExistingTicket',
        editData.linkToExistingTicket || editData.requiresTicketClosure || false
      );
      setValue('paymentMethod', editData.paymentMethod);

      setValue('requiresTicketClosure', editData.requiresTicketClosure || false);
      setValue(
        'linkedTicket',
        editData.linkedTicket
          ? {
              uuid: editData.linkedTicket.uuid,
              id: editData.linkedTicket.id,
              label: `(${editData.linkedTicket.id}) ${editData.linkedTicket.title}`,
              status: editData.linkedTicket.status,
            }
          : null
      );
    }
  }, [isEditMode, editData, setValue]);
  return (
    <Modal
      width={'min(80%, 1000px)'}
      maxHeight={'90%'}
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit Finance Request' : 'Create Finance Request'}
    >
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormRow>
          {loading && <LoadingContainer>Loading...</LoadingContainer>}

          <Column>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  error={errors.title?.message}
                  placeholder="Enter request title"
                  required
                />
              )}
            />

            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  label="Reason"
                  error={errors.reason?.message}
                  placeholder="Enter reason for request"
                  resizeVertical={false}
                  resizeHorizontal={false}
                  maxLength={500}
                />
              )}
            />

            <Controller
              name="accountingType"
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  label="Accounting Type"
                  isSearchable={false}
                  $error={errors.accountingType?.message}
                  defaultOptions={FINANCE_REQUEST_ACCOUNTING_TYPE_OPTIONS}
                  placeholder="select accounting type"
                  req
                />
              )}
            />

            <Row>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    label="Start Date"
                    error={errors.startDate?.message}
                    maxDate={endDate ? dayjs(endDate) : undefined}
                  />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    label="End Date"
                    error={errors.endDate?.message}
                    minDate={startDate ? dayjs(startDate) : undefined}
                  />
                )}
              />
            </Row>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioButtonWrapper>
                  <RadioGroup
                    {...field}
                    row={true}
                    label="Payment Method"
                    options={FINANCE_REQUEST_PAYMENT_METHOD_OPTIONS}
                    error={errors.paymentMethod?.message}
                    required
                  />
                </RadioButtonWrapper>
              )}
            />
            <Controller
              name="flowType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row={true}
                  label="Flow Type"
                  options={FINANCE_REQUEST_FLOW_TYPE_OPTIONS}
                  error={errors.flowType?.message}
                  required
                />
              )}
            />

            <Controller
              name="expenseType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row={true}
                  label="Expense Type"
                  options={FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS}
                  error={errors.expenseType?.message}
                  required
                />
              )}
            />
          </Column>

          <Column>
            <Row>
              <Controller
                name="amountRequested"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="Amount Requested"
                    error={errors.amountRequested?.message}
                    placeholder="Enter amount"
                    required
                  />
                )}
              />

              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    label="Currency"
                    $error={errors.currency?.message}
                    defaultOptions={FINANCE_REQUEST_CURRENCY_OPTIONS}
                    placeholder="Select currency"
                    required
                  />
                )}
              />
            </Row>

            {(expenseType === 'Fixed' || expenseType === 'Semi-Variable') && (
              <Controller
                name="frequency"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    label="Frequency"
                    $error={errors.frequency?.message}
                    isSearchable={false}
                    defaultOptions={FINANCE_REQUEST_FREQUENCY_OPTIONS}
                    placeholder="Select frequency"
                    req
                  />
                )}
              />
            )}

            {(expenseType === 'Fixed' || expenseType === 'Semi-Variable') && (
              <Controller
                name="recurrenceEndDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    label="Recurrence End Date"
                    error={errors.recurrenceEndDate?.message}
                    minDate={dayjs()}
                  />
                )}
              />
            )}

            <ExistingWrapper>
              <Controller
                name="linkToExistingTicket"
                control={control}
                render={({ field }) => (
                  <SwitchWrapper>
                    <Switch
                      isOn={field.value}
                      onToggle={() => {
                        field.onChange(!field.value);
                        if (field.value) {
                          setValue('linkedTicket', null);
                        }
                      }}
                      disabled={false}
                    />
                    <Label>Link to Existing Ticket</Label>
                  </SwitchWrapper>
                )}
              />
              {linkToExistingTicket && (
                <Controller
                  name={requiresTicketClosure ? 'linkedTicket' : 'linkedTicket'}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AsyncSelectWrapper>
                      <AsyncSelect
                        value={value}
                        onChange={onChange}
                        placeholder={'Search for existing ticket'}
                        loadOptions={loadCategories}
                        onMenuOpen={() => loadCategories('', false)}
                        onMenuScrollToBottom={handleTicketScrollToBottom}
                        defaultOptions={categories}
                        isClearable
                        cacheOptions
                        isLoading={loading.ticket}
                        $error={errors.linkedTicket?.message}
                        getOptionValue={(option) => option.uuid || option.value}
                      />
                    </AsyncSelectWrapper>
                  )}
                />
              )}
            </ExistingWrapper>

            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <>
                  <DragDropUploadFile
                    uploadDescription="Maximum 15 files"
                    maxFiles={15 - (editData?.files?.length || 0)}
                    onFilesChange={(files) => {
                      field.onChange(files);
                    }}
                    defaultFiles={
                      isEditMode && editData?.files
                        ? editData.files.map((file) => ({
                            name: file.fileName || file.originalName,
                            size: file.size,
                            uuid: file.uuid,
                          }))
                        : []
                    }
                    removeDefaultFile={(fileUuid) => {
                      const updatedFiles = editData.files.filter(
                        (file) => file.uuid !== fileUuid
                      );
                      setEditData({ ...editData, files: updatedFiles });
                      setFilesToDelete((prev) => [...prev, fileUuid]);
                    }}
                  />
                </>
              )}
            />
          </Column>
        </FormRow>

        <ButtonRow>
          <Button outlined onClick={handleClose}>
            Cancel
          </Button>
          <Button secondary type="submit">
            {isEditMode ? 'Update Request' : 'Create Request'}
          </Button>
        </ButtonRow>
      </Form>
    </Modal>
  );
};

export default FinanceRequestModal;
