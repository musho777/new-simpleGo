import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import ColorPicker from 'common-ui/colorPicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect, Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import { OUT_COME_TYPE } from 'constants/constants';
import {
  createWorkflowStatus,
  editWorkflowStatus,
  getWorkflowStatuses,
} from 'features/sales/salesActions';
import { buildQueryString, generateOptions } from 'utils';
import sessionManager from 'utils/sessionManager';
import * as Yup from 'yup';

import { BtnWrapper, Form, ShiftControl, WorkflowSwitch } from '../Sales.styles';
import useSearchData from './useSearchData';

const StatusActionDefinition = [
  'new',
  'final_status',
  'commission_ready',
  'approval_needed',
  'approved_customer',
  'need_appointment',
  'customer_verification_needed',
  'commission_available',
  'sprint_approved',
  'rejected',
  'closed',
  'done',
];

const statusOptions = StatusActionDefinition.map((status) => ({
  label: status.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
  value: status,
}));
const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(
      nameRegex,
      'Only  Latin and Armenian letters, numbers, and allowed special characters'
    ),
  statusColor: Yup.string()
    .matches(/^#([0-9A-F]{3}){1,2}$/i, 'Invalid hex color')
    .required('Status color is required'),
  statusActionDefinition: Yup.string()
    .oneOf(StatusActionDefinition, 'Invalid status action')
    .required('Status action is required'),
  outcomeType: Yup.string().required('Outcome type is required'),
  precedingStatuses: Yup.array().optional(),
  nextStatuses: Yup.array().optional(),
});

const colorOptions = [
  '#E63946',
  '#2D6CDF',
  '#28A745',
  '#FFC107',
  '#6F42C1',
  '#FD7E14',
  '#6C757D',
  '#000000',
  '#FFFFFF',
];

const Create = ({ isEdit = false, initialData = null, onCloseEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');
  const { searchData } = useSearchData();
  const [workflowStatusOffset, setWorkflowStatusOffset] = useState(0);
  const [hasMoreStatuses, setHasMoreStatuses] = useState(true);
  const [workflowStatuses, setWorkflowStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const loadWorkflowStatusOptions = useCallback(
    async (inputValue, isLoadMore = false, offset = 0) => {
      try {
        setLoading(true);
        const sessionParams = sessionManager.getQueryParams();
        const params = {
          page: Math.floor(offset / 10) + 1,
          perPage: 10,
          name: inputValue || '',
          ...sessionParams,
        };
        const query = buildQueryString(params);
        const data = await ApiClient.get(`/sales/workflow-statuses?${query}`);
        const newStatuses = data.workflowStatuses || [];

        if (isLoadMore && offset > 0) {
          setWorkflowStatuses((prev) => [...prev, ...generateOptions(newStatuses)]);
        } else if (offset === 0) {
          setWorkflowStatuses(generateOptions(newStatuses));
        }

        if (data.total > offset) {
          setWorkflowStatusOffset(offset + 10);
          setHasMoreStatuses(data.total > offset + 10);
        }

        setLoading(false);
        return generateOptions(newStatuses);
      } catch (error) {
        setLoading(false);
        return [];
      }
    },
    [dispatch]
  );

  const handleWorkflowStatusScrollToBottom = () => {
    if (hasMoreStatuses && !loading) {
      loadWorkflowStatusOptions('', true, workflowStatusOffset);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      statusColor: '#FF5733',
      statusActionDefinition: 'new',
      outcomeType: 'none',
      precedingStatuses: [],
      nextStatuses: [],
    },
    shouldFocusError: false,
  });

  const outcomeType = useWatch({
    control,
    name: 'outcomeType',
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        statusColor: initialData.statusColor || '#FF5733',
        statusActionDefinition: initialData.statusActionDefinition || 'new',
        outcomeType: initialData.outcomeType || 'none',
        precedingStatuses: generateOptions(initialData.precedingTransitions) || [],
        nextStatuses: generateOptions(initialData.succeedingTransitions) || [],
        isEnabled: !initialData.isEnabled,
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (outcomeType === 'initial') {
      setValue('precedingStatuses', []);
    }
    if (outcomeType === 'converted' || outcomeType === 'lost') {
      setValue('nextStatuses', []);
    }
  }, [outcomeType]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = (data) => {
    const body = {
      name: data.name,
      description: data.description,
      statusColor: data.statusColor,
      statusActionDefinition: data.statusActionDefinition,
      outcomeType: data.outcomeType,
      precedingStatusIds: data.precedingStatuses?.map((status) => status.value) || [],
      succeedingStatusIds: data.nextStatuses?.map((status) => status.value) || [],
      isEnabled: !data.isEnabled,
    };

    const action =
      isEdit && initialData?.uuid
        ? editWorkflowStatus({ uuid: initialData.uuid, body })
        : createWorkflowStatus(body);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(getWorkflowStatuses(searchData));
        handleCloseModal();
      })
      .catch((error) => {
        if (error) {
          setError('name', {
            type: 'manual',
            message: error,
          });
          scrollToTop();
        }
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 500 ? '370px' : '430px');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isEdit ? (
        <ShiftControl onClick={handleOpenModal}>
          <img alt="Edit icon" src={EditIcon} />
        </ShiftControl>
      ) : (
        <BtnWrapper>
          <Button secondary onClick={handleOpenModal} className="h-38">
            + Add Workflow Status
          </Button>
        </BtnWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit, scrollToTop)}
        title={isEdit ? 'Edit Workflow Status' : 'Create Workflow Status'}
        footer={true}
        maxHeight={'80%'}
      >
        <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                error={errors.name?.message}
                placeholder="Enter name"
                maxLength={50}
                required
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                resizeHorizontal={false}
                label="Description"
                error={errors.description?.message}
                placeholder="Enter description"
                maxLength={250}
              />
            )}
          />

          <Controller
            name="statusColor"
            control={control}
            render={({ field }) => (
              <ColorPicker
                label="Select status color"
                colorOptions={colorOptions}
                selectedColor={field.value}
                handleColorClick={(color) => field.onChange(color)}
                onChange={field.onChange}
                error={errors.statusColor?.message}
              />
            )}
          />

          <Controller
            name="statusActionDefinition"
            control={control}
            render={({ field }) => (
              <div style={{ marginTop: '16px' }}>
                <Select
                  {...field}
                  label="Status Action"
                  options={statusOptions}
                  value={statusOptions.find((opt) => opt.value === field.value)}
                  onChange={(selected) => field.onChange(selected?.value)}
                  $error={errors.statusActionDefinition?.message}
                  placeholder="Select status action"
                />
              </div>
            )}
          />

          <Controller
            name="outcomeType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Outcome Type"
                options={OUT_COME_TYPE}
                value={OUT_COME_TYPE.find((opt) => opt.value === field.value)}
                onChange={(selected) => field.onChange(selected?.value)}
                $error={errors.outcomeType?.message}
                placeholder="Select outcome type"
              />
            )}
          />

          <Controller
            name="precedingStatuses"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                label="Preceding Statuses"
                isMulti
                loadOptions={loadWorkflowStatusOptions}
                onMenuOpen={() => loadWorkflowStatusOptions('', false)}
                onMenuScrollToBottom={handleWorkflowStatusScrollToBottom}
                defaultOptions={workflowStatuses}
                isClearable
                cacheOptions
                isLoading={loading}
                $error={errors.precedingStatuses?.message}
                placeholder="Select preceding statuses"
                isDisabled={outcomeType === 'initial'}
              />
            )}
          />

          <Controller
            name="nextStatuses"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                label="Next Statuses"
                isMulti
                loadOptions={loadWorkflowStatusOptions}
                onMenuOpen={() => loadWorkflowStatusOptions('', false)}
                onMenuScrollToBottom={handleWorkflowStatusScrollToBottom}
                defaultOptions={workflowStatuses}
                isClearable
                cacheOptions
                isLoading={loading}
                $error={errors.nextStatuses?.message}
                placeholder="Select next statuses"
                isDisabled={outcomeType === 'converted' || outcomeType === 'lost'}
              />
            )}
          />

          <Controller
            name="isEnabled"
            control={control}
            render={({ field }) => (
              <WorkflowSwitch>
                <Switch isOn={!field.value} onToggle={() => field.onChange(!field.value)} />
                {field.value ? 'Disabled' : 'Enabled'}
              </WorkflowSwitch>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
