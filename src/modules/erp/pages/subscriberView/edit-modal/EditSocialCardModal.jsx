import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateSocialCardNumber } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { socialCardModalSchema } from '../schema';

const EditSocialCardModal = ({ isOpen, onClose, customerId, socialCardNumber, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(socialCardModalSchema),
    defaultValues: {
      socialCardNumber: socialCardNumber || '',
    },
  });

  const handleSubmitSocialCard = async (data) => {
    try {
      const result = await dispatch(
        updateSocialCardNumber({
          id: customerId,
          socialCardNumber: data.socialCardNumber,
        })
      ).unwrap();

      notifySuccess('Social card number updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating social card number:', error);
      notifyError(error || 'Failed to update social card number');
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        socialCardNumber: socialCardNumber || '',
      });
    }
  }, [isOpen, socialCardNumber, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitSocialCard)}>
        <Controller
          name="socialCardNumber"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Սոց. քարտի համար"
                placeholder="Սոց. քարտի համար"
                error={errors.socialCardNumber?.message}
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

export default EditSocialCardModal;
