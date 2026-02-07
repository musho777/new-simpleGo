import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import {
  createNextContactRule,
  editNextContactRule,
  getNextContactRules,
} from 'features/sales/salesActions';
import * as Yup from 'yup';

import { Form } from '../Sales.styles';
import useSearchData from './useSearchData';

const OFFSET_TYPE_OPTIONS = [
  { value: 'minutes', label: 'Minutes' },
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
];

const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const schema = Yup.object().shape({
  reminderName: Yup.string()
    .required('Rule name is required')
    .matches(
      nameRegex,
      'Only Latin and Armenian letters, numbers, and allowed special characters'
    ),
  offsetType: Yup.object().nullable().required('Offset type is required'),
  offsetValue: Yup.number()
    .required('Offset value is required')
    .min(1, 'Must be at least 1')
    .max(10000, 'Cannot exceed 10000'),
  isEnabled: Yup.boolean(),
});

const tabConfig = {
  'Next Contact Rules': {
    create: createNextContactRule,
    edit: editNextContactRule,
    get: getNextContactRules,
    title: 'Next Contact Rule',
  },
};

const Create = ({
  activeTab,
  isEdit = false,
  initialData = null,
  isOpen = false,
  onClose,
}) => {
  const [modalWidth, setModalWidth] = useState('430px');
  const { searchData } = useSearchData();

  const dispatch = useDispatch();
  const tab = tabConfig[activeTab];

  const [formValues, setFormValues] = useState({
    reminderName: '',
    offsetType: { value: 'hours', label: 'Hours' },
    offsetValue: 1,
    isEnabled: true,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formValues,
    shouldFocusError: false,
  });

  useEffect(() => {
    if (isEdit && initialData) {
      const offsetTypeObj =
        OFFSET_TYPE_OPTIONS.find((opt) => opt.value === initialData.offsetType) || null;

      reset({
        reminderName: initialData.reminderName || '',
        offsetType: offsetTypeObj,
        offsetValue: initialData.offsetValue || 1,
        isEnabled: initialData.isEnabled ?? true,
      });
    }
  }, [initialData, isEdit, reset]);

  useEffect(() => {
    if (isOpen && !isEdit) {
      reset({
        reminderName: '',
        offsetType: { value: 'hours', label: 'Hours' },
        offsetValue: 1,
        isEnabled: true,
      });
    }
  }, [isOpen, isEdit, reset]);

  const handleCloseModal = () => {
    reset({
      reminderName: '',
      offsetType: { value: 'hours', label: 'Hours' },
      offsetValue: 1,
      isEnabled: true,
    });
    onClose();
  };

  const onSubmit = (data) => {
    if (!tab) return;

    const body = {
      reminderName: data.reminderName,
      offsetType: data.offsetType.value,
      offsetValue: data.offsetValue,
      isEnabled: data.isEnabled,
    };

    const action =
      isEdit && initialData?.uuid
        ? tab.edit?.({ uuid: initialData.uuid, body })
        : tab.create(body);

    if (!action) return;

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(getNextContactRules(searchData));
        handleCloseModal();
      })
      .catch((error) => {
        if (error) {
          setError('offsetValue', {
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

  return (
    <>
      <Modal
        key={isEdit ? initialData?.uuid : Date.now()}
        isOpen={isOpen || isEdit}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit)}
        title={isEdit ? 'Edit Next Contact Rule' : 'Create Next Contact Rule'}
        footer={true}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="reminderName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                error={errors.reminderName?.message}
                placeholder="Enter name"
                maxLength={50}
                required
              />
            )}
          />

          <Controller
            name="offsetType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={OFFSET_TYPE_OPTIONS}
                label="Offset Type"
                $error={errors.offsetType?.message}
                placeholder="Select offset type"
                req
                menuPlacement="bottom"
              />
            )}
          />

          <Controller
            name="offsetValue"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Offset Value"
                type="number"
                error={errors.offsetValue?.message}
                placeholder="Enter offset value"
                min={1}
                max={1000}
                pattern="[0-9]*"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  field.onChange(value);
                }}
                required
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
