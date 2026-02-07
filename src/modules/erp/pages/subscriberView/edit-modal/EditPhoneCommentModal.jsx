import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updatePhoneNumbers } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { phoneCommentModalSchema } from '../schema';

const EditPhoneCommentModal = ({
  isOpen,
  onClose,
  customerId,
  phoneNumbers,
  phoneIndex,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const currentPhone = phoneNumbers?.[phoneIndex] || {};

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(phoneCommentModalSchema),
    defaultValues: {
      comment: currentPhone.comment || '',
    },
  });

  const handleSubmitPhoneComment = async (data) => {
    try {
      const updatedPhoneNumbers = [...(phoneNumbers || [])];
      updatedPhoneNumbers[phoneIndex] = {
        ...currentPhone,
        comment: data.comment,
      };

      const result = await dispatch(
        updatePhoneNumbers({
          id: customerId,
          phoneNumbers: updatedPhoneNumbers,
        })
      ).unwrap();

      notifySuccess('Phone comment updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating phone comment:', error);
      notifyError(error || 'Failed to update phone comment');
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        comment: currentPhone.comment || '',
      });
    }
  }, [isOpen, currentPhone.comment, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitPhoneComment)}>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Մեկնաբանություն"
                placeholder="Մեկնաբանություն"
                error={errors.comment?.message}
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

export default EditPhoneCommentModal;
