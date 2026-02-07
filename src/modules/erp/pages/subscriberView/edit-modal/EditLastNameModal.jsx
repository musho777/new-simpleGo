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
import { lastNameModalSchema } from '../schema';

const EditLastNameModal = ({ isOpen, onClose, customerId, nameData, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(lastNameModalSchema),
    defaultValues: {
      lastName: nameData?.lastName || '',
    },
  });

  const handleSubmitLastName = async (data) => {
    try {
      const result = await dispatch(
        updateName({
          id: customerId,
          nameData: {
            firstName: nameData.firstName,
            lastName: data.lastName,
            patronymic: nameData.patronymic,
          },
        })
      ).unwrap();

      notifySuccess('Last name updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating last name:', error);
      notifyError(error || 'Failed to update last name');
    }
  };

  useEffect(() => {
    if (isOpen && nameData) {
      reset({
        lastName: nameData.lastName || '',
      });
    }
  }, [isOpen, nameData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitLastName)}>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Ազգանուն"
                placeholder="Ազգանուն"
                error={errors.lastName?.message}
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

export default EditLastNameModal;
