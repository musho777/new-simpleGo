import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateName } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { firstNameModalSchema } from '../schema';

const EditFirstNameModal = ({ isOpen, onClose, customerId, nameData, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(firstNameModalSchema),
    defaultValues: {
      firstName: nameData?.firstName || '',
    },
  });

  const handleSubmitFirstName = async (data) => {
    try {
      const result = await dispatch(
        updateName({
          id: customerId,
          nameData: {
            firstName: data.firstName,
            lastName: nameData.lastName,
            patronymic: nameData.patronymic,
          },
        })
      ).unwrap();

      notifySuccess('First name updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating first name:', error);
      notifyError(error || 'Failed to update first name');
    }
  };

  useEffect(() => {
    if (isOpen && nameData) {
      reset({
        firstName: nameData.firstName || '',
      });
    }
  }, [isOpen, nameData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitFirstName)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Անուն"
                placeholder="Անուն"
                error={errors.firstName?.message}
                maxLength={50}
                required
              />
            </InputWrapper>
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

export default EditFirstNameModal;
