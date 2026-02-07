import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { CharacterCount } from 'common-ui/textArea/TextArea.styles';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updatePhoneNumbers } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { phoneNumberModalSchema } from '../schema';

const EditPhoneNumberModal = ({
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
    resolver: yupResolver(phoneNumberModalSchema),
    defaultValues: {
      number: currentPhone.number || '',
    },
  });

  const handleSubmitPhoneNumber = async (data) => {
    try {
      const updatedPhoneNumbers = [...(phoneNumbers || [])];
      updatedPhoneNumbers[phoneIndex] = {
        ...currentPhone,
        number: data.number,
      };

      const result = await dispatch(
        updatePhoneNumbers({
          id: customerId,
          phoneNumbers: updatedPhoneNumbers,
        })
      ).unwrap();

      notifySuccess('Phone number updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating phone number:', error);
      notifyError(error || 'Failed to update phone number');
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        number: currentPhone.number || '',
      });
    }
  }, [isOpen, currentPhone.number, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitPhoneNumber)}>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Հեռախոսահամար"
                placeholder="Հեռախոսահամար"
                error={errors.number?.message}
                required
              />
              <CharacterCount>10 նիշ թվային կոդ</CharacterCount>
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

export default EditPhoneNumberModal;
