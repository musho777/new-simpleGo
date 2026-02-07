import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import * as Yup from 'yup';

import {
  createLeadSource,
  editLeadSource,
  getLeadSources,
} from '../../../../../features/sales/salesActions';
import { BtnWrapper, Form, ShiftControl } from '../Sales.styles';
import useSearchData from './useSearchData';

const TYPE_OPTIONS = [
  { value: 'internal', label: 'Internal' },
  { value: 'external', label: 'External' },
];
const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(
      nameRegex,
      'Only  Latin and Armenian letters, numbers, and allowed special characters'
    ),
  type: Yup.object().nullable().required('Type is required'),
  apiUrl: Yup.string()
    .nullable()
    .when('type', {
      is: (val) => val && val.value === 'external',
      then: (schema) => schema.required('Url is required').url('Invalid URL'),
      otherwise: (schema) => schema.notRequired(),
    }),
  isEnabled: Yup.boolean(),
});

const tabConfig = {
  'Lead Source': {
    create: createLeadSource,
    edit: editLeadSource,
    get: getLeadSources,
    title: 'Lead Source',
  },
};

const Create = ({ activeTab, isEdit = false, initialData = null, onCloseEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');
  const { searchData } = useSearchData();

  const dispatch = useDispatch();
  const tab = tabConfig[activeTab];

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      type: null,
      description: '',
      apiUrl: '',
      isEnabled: true,
    },
    shouldFocusError: false,
  });

  const selectedType = watch('type')?.value;

  useEffect(() => {
    if (initialData) {
      const typeObj = TYPE_OPTIONS.find((opt) => opt.value === initialData.type) || null;
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        type: typeObj,
        apiUrl: initialData.apiUrl || '',
        isEnabled: initialData.isEnabled ?? true,
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (selectedType !== 'external') {
      setValue('apiUrl', '');
    }
  }, [selectedType, setValue]);

  const handleOpenCreateModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const onSubmit = (data) => {
    if (!tab) return;

    const body = {
      name: data.name,
      description: data.description,
      type: data.type.value,
      isEnabled: data.isEnabled,
      apiUrl: selectedType === 'external' ? data.apiUrl : undefined,
    };

    const action =
      isEdit && initialData?.uuid
        ? tab.edit?.({ uuid: initialData.uuid, body })
        : tab.create(body);

    if (!action) return;

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(tab.get(searchData));
        handleCloseModal();
      })
      .catch((error) => {
        if (error) {
          setError('name', {
            type: 'manual',
            message: error,
          });
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

  if (!tab) return null;

  return (
    <>
      {isEdit ? (
        <ShiftControl onClick={handleOpenCreateModal}>
          <img alt="Edit icon" src={EditIcon} />
        </ShiftControl>
      ) : (
        <BtnWrapper>
          <Button secondary onClick={handleOpenCreateModal} className="h-38">
            + Add {tab.title}
          </Button>
        </BtnWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit)}
        title={isEdit ? `Edit ${tab.title}` : `Create ${tab.title}`}
        footer={true}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={TYPE_OPTIONS}
                label="Source Type"
                $error={errors.type?.message}
                placeholder="Select type"
                isClearable
                req
                menuPlacement="bottom"
              />
            )}
          />

          {selectedType === 'external' && (
            <Controller
              name="apiUrl"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Add API URL"
                  type="url"
                  error={errors.apiUrl?.message}
                  placeholder="Enter API URL"
                  required
                />
              )}
            />
          )}

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
                label="Description"
                error={errors.description?.message}
                placeholder="Enter description"
                maxLength={250}
                resizeHorizontal={false}
              />
            )}
          />
          <Controller
            name="isEnabled"
            control={control}
            render={({ field }) => (
              <div style={{ marginTop: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    gap: '10px',
                  }}
                >
                  <label style={{ fontSize: '14px', fontWeight: 500 }}>
                    {field.value ? 'Enabled' : 'Disabled'}
                  </label>
                  <Switch isOn={field.value} onToggle={() => field.onChange(!field.value)} />
                </div>
              </div>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
