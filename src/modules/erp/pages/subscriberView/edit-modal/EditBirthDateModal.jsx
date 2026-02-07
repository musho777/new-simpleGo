import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateBirthDate } from '../../../features/main/mainActions';
import { DatePickerWrapper, Form, Row } from '../EditDeleteModal.styles';
import { birthDateModalSchema } from '../schema';

const EditBirthDateModal = ({ isOpen, onClose, customerId, birthDate, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(birthDateModalSchema),
    defaultValues: {
      birthDate: birthDate ? new Date(birthDate) : null,
    },
  });

  const handleSubmitBirthDate = async (data) => {
    try {
      const result = await dispatch(
        updateBirthDate({
          id: customerId,
          birthDate: data.birthDate ? data.birthDate.toISOString().split('T')[0] : null,
        })
      ).unwrap();

      notifySuccess('Birth date updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating birth date:', error);
      notifyError(error || 'Failed to update birth date');
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        birthDate: birthDate ? new Date(birthDate) : null,
      });
    }
  }, [isOpen, birthDate, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitBirthDate)}>
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePickerWrapper>
              <CustomDatePicker
                {...field}
                label="Ծննդյան ամսաթիվ"
                placeholder="Ծննդյան ամսաթիվ"
                error={errors.birthDate?.message}
                height="44px"
                disableFuture={true}
                required={true}
              />
            </DatePickerWrapper>
          )}
        />

        <Row>
          <Button outlined onClick={onClose} disabled={isSubmitting}>
            Չեղարկել
          </Button>
          <Button secondary type="submit" loading={isSubmitting}>
            Հաստատել
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditBirthDateModal;
