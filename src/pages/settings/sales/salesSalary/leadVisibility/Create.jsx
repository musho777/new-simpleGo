import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError } from 'utils/notifyConfig';
import * as Yup from 'yup';

import {
  editLeadVisibility,
  getLeadVisibility,
} from '../../../../../features/sales/salesActions';
import { BtnWrapper, CountPriceCurrencyWrapper, Form, ShiftControl } from '../Sales.styles';

const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(
      nameRegex,
      'Only Latin and Armenian letters, numbers, and allowed special characters'
    ),
  durationInHours: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .nullable()
    .max(8760, 'Duration cannot exceed 365 days (8760 hours)'),
  durationDisplay: Yup.number()
    .transform((value, originalValue) => {
      if (originalValue === '' || originalValue === null || originalValue === undefined) {
        return undefined;
      }
      const numValue = Number(originalValue);
      return isNaN(numValue) ? undefined : numValue;
    })
    .nullable()
    .max(89, 'Duration must be 89 or less'),
  isActive: Yup.boolean(),
});

const Create = ({ isEdit = false, initialData = null, onCloseEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      durationInHours: null,
      durationDisplay: null,
      isActive: true,
    },
    shouldFocusError: false,
  });

  const durationInHours = watch('durationInHours');

  useEffect(() => {
    if (durationInHours) {
      const days = Math.floor(durationInHours / 24);
      const hours = durationInHours % 24;

      if (days > 0) {
        setValue('durationDisplay', days);
        if (hours > 0) {
          setValue('durationInHours', hours);
        } else {
          setValue('durationInHours', 0);
        }
      }
    }
  }, [durationInHours]);

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        durationInHours: initialData.durationInHours || null,
        durationDisplay: initialData.durationDisplay || null,
        isActive: initialData.isActive ?? true,
      });
    }
  }, [initialData, reset]);

  const handleOpenCreateModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const onSubmit = (data) => {
    const hasHours = data.durationInHours && Number(data.durationInHours) > 0;
    const hasDays = data.durationDisplay && Number(data.durationDisplay) > 0;

    if (!hasHours && !hasDays) {
      notifyError('Either Hours or Days is required');
      return;
    }

    const totalHours =
      (Number(data.durationDisplay) || 0) * 24 + (Number(data.durationInHours) || 0);

    const body = {
      name: data.name,
      duration: `${totalHours}h`,
    };

    const action =
      isEdit && initialData?.uuid
        ? editLeadVisibility({ uuid: initialData.uuid, body })
        : null;

    if (!action) return;

    dispatch(action).then(() => {
      dispatch(getLeadVisibility());
      handleCloseModal();
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
        <ShiftControl onClick={handleOpenCreateModal}>
          <img alt="Edit icon" src={EditIcon} />
        </ShiftControl>
      ) : (
        <BtnWrapper>
          <Button secondary onClick={handleOpenCreateModal} className="h-38">
            + Add Lead Visibility
          </Button>
        </BtnWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit)}
        title={isEdit ? 'Edit Visibility Control' : 'Create Visibility Control'}
        footer={true}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                error={errors.name?.message}
                placeholder="Enter name"
                type="text"
                maxLength={50}
                required
              />
            )}
          />
          <CountPriceCurrencyWrapper>
            <Controller
              name="durationInHours"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Hours"
                  type="number"
                  error={errors.durationInHours?.message}
                  placeholder="Enter duration in hours"
                  min={1}
                  max={8760}
                />
              )}
            />
            <Controller
              name="durationDisplay"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Days"
                  type="number"
                  error={errors.durationDisplay?.message}
                  placeholder="Enter number of days"
                />
              )}
            />
          </CountPriceCurrencyWrapper>
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
