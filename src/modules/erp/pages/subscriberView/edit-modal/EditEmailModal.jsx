import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateEmail } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { emailModalSchema } from '../schema';

const EditEmailModal = ({ isOpen, onClose, customerId, email, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(emailModalSchema),
    defaultValues: {
      email: email || '',
    },
  });

  const handleSubmitEmail = async (data) => {
    try {
      const result = await dispatch(
        updateEmail({
          id: customerId,
          email: data.email,
        })
      ).unwrap();

      notifySuccess('Email updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating email:', error);
      notifyError(error || 'Failed to update email');
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        email: email || '',
      });
    }
  }, [isOpen, email, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitEmail)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Էլ․ փոստ"
                placeholder="Էլ․ փոստ"
                error={errors.email?.message}
                type="email"
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

export default EditEmailModal;
