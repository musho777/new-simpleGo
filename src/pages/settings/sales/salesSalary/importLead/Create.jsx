import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import DragDropUploadFile from 'common-ui/dragDropUploadFile';
import errorIcon from 'common-ui/input/assets/error.svg';
import Modal from 'common-ui/modal';
import { InfiniteAsyncSelect, Select } from 'common-ui/select';
import {
  createImportLead,
  getLeadSources,
  getWorkflowStatuses,
} from 'features/sales/salesActions';
import {
  selectImportLeadsLoading,
  selectLeadSources,
  selectWorkflowStatuses,
} from 'features/sales/salesSlice';
import { createFormData } from 'utils';
import * as Yup from 'yup';

import { ErrorText, Icon } from '../Sales.styles';

const ACCEPTED_FORMATS = {
  'text/csv': ['.csv'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.oasis.opendocument.spreadsheet': ['.ods'],
  'application/vnd.ms-excel.sheet.macroEnabled.12': ['.xlsm'],
};

const schema = Yup.object().shape({
  leadSource: Yup.string().required('Lead source is required'),
  leadStatus: Yup.string().required('Lead status is required'),
  businessModel: Yup.string()
    .oneOf(['B2B', 'B2C'], 'Business Model is required')
    .required('Business Model is required'),
  type: Yup.string()
    .oneOf(['inbound', 'outbound'], 'Type is required')
    .required('Type is required'),
  files: Yup.array()
    .min(1, 'CSV file is required')
    .max(5, 'Maximum 5 CSV files allowed')
    .required('CSV file is required'),
});

const options = {
  businessModel: [
    { label: 'B2B', value: 'B2B' },
    { label: 'B2C', value: 'B2C' },
  ],
  type: [
    { label: 'Inbound', value: 'inbound' },
    { label: 'Outbound', value: 'outbound' },
  ],
};

const Create = ({
  isEdit = false,
  initialData = null,
  onCloseEdit,
  openFromParent = false,
}) => {
  const [modalWidth, setModalWidth] = useState('430px');
  const dispatch = useDispatch();

  const leadSources = useSelector(selectLeadSources);
  const workflowStatuses = useSelector(selectWorkflowStatuses);
  const isLoading = useSelector(selectImportLeadsLoading);

  useEffect(() => {
    dispatch(getLeadSources());
  }, [dispatch]);

  const leadSourceOptions = (leadSources?.leadSources || []).map((item) => ({
    label: item.name,
    value: item.uuid,
  }));

  const workflowStatusOptions = (workflowStatuses?.workflowStatuses || []).map((item) => ({
    label: item.name,
    value: item.uuid,
  }));

  const loadWorkflowOptions = async (params) => {
    try {
      const response = await dispatch(getWorkflowStatuses(params)).unwrap();
      return response;
    } catch (error) {
      console.error('Error loading workflow options:', error);
      return { workflowStatuses: [], total: 0 };
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      leadSource: '',
      leadStatus: '',
      businessModel: '',
      type: '',
      files: [],
    },
    shouldFocusError: false,
  });

  const handleCloseModal = () => {
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const onSubmit = async (data) => {
    const params = {
      leadSourceId: data.leadSource,
      workflowStatusId: data.leadStatus,
      businessModel: data.businessModel,
      contactType: data.type,
      file: data.files[0],
    };

    const formData = createFormData(new FormData(), params);

    try {
      await dispatch(createImportLead(formData)).unwrap();
      handleCloseModal();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  useEffect(() => {
    if (initialData) {
      reset({
        leadSource: initialData.leadSource || '',
        leadStatus: initialData.leadStatus || '',
        businessModel: initialData.businessModel || '',
        type: initialData.type || '',
        files: initialData.files || [],
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 500 ? '370px' : '430px');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Modal
      height={'730px'}
      isOpen={openFromParent}
      onClose={handleCloseModal}
      width={modalWidth}
      onOk={handleSubmit(onSubmit)}
      title={isEdit ? 'Edit Import Lead' : 'Create Import Lead'}
      onOkLoading={isLoading}
      footer
    >
      <form className="flex flex-col gap-3">
        <Controller
          name="leadSource"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Lead source"
              options={leadSourceOptions}
              value={leadSourceOptions.find((opt) => opt.value === field.value)}
              onChange={(selected) => field.onChange(selected?.value)}
              $error={errors.leadSource?.message}
              placeholder="Select"
            />
          )}
        />

        <Controller
          name="leadStatus"
          control={control}
          render={({ field }) => (
            <InfiniteAsyncSelect
              {...field}
              label="Workflow status"
              loadOptionsAction={loadWorkflowOptions}
              value={workflowStatusOptions.find((opt) => opt.value === field.value)}
              onChange={(selected) => field.onChange(selected?.value)}
              $error={errors.leadStatus?.message}
              placeholder="Select"
            />
          )}
        />

        <Controller
          name="businessModel"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Business Model"
              options={options.businessModel}
              value={options.businessModel.find((opt) => opt.value === field.value)}
              onChange={(selected) => field.onChange(selected?.value)}
              $error={errors.businessModel?.message}
              placeholder="Select"
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Type"
              options={options.type}
              value={options.type.find((opt) => opt.value === field.value)}
              onChange={(selected) => field.onChange(selected?.value)}
              $error={errors.type?.message}
              placeholder="Select"
            />
          )}
        />

        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <>
              <DragDropUploadFile
                {...field}
                accept={ACCEPTED_FORMATS}
                uploadDescription="Only .csv files allowed, max 5 files, max 10MB per file, 100MB total"
                onFilesChange={(files) => setValue('files', files, { shouldValidate: true })}
                maxFiles={5}
              />
              {errors.files?.message && (
                <ErrorText>
                  <Icon src={errorIcon} alt="error" />
                  {errors.files?.message}
                </ErrorText>
              )}
            </>
          )}
        />
      </form>
    </Modal>
  );
};

export default memo(Create);
