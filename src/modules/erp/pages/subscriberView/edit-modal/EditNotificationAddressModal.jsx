import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateNotificationAddress } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { notificationAddressModalSchema } from '../schema';

const EditNotificationAddressModal = ({
  isOpen,
  onClose,
  customerId,
  notificationAddress,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(notificationAddressModalSchema),
    defaultValues: {
      notificationAddress: notificationAddress || '',
    },
  });

  const handleSubmitNotificationAddress = async (data) => {
    try {
      const result = await dispatch(
        updateNotificationAddress({
          id: customerId,
          notificationAddress: data.notificationAddress,
        })
      ).unwrap();

      notifySuccess('Notification address updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating notification address:', error);
      notifyError(error || 'Failed to update notification address');
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        notificationAddress: notificationAddress || '',
      });
    }
  }, [isOpen, notificationAddress, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitNotificationAddress)}>
        <Controller
          name="notificationAddress"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Ծանուցումների հասցե"
                placeholder="Ծանուցումների հասցե"
                error={errors.notificationAddress?.message}
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

export default EditNotificationAddressModal;
