import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { CharacterCount } from 'common-ui/textArea/TextArea.styles';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updatePassport } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { passportAddressModalSchema } from '../schema';

const EditPassportAddressModal = ({
  isOpen,
  onClose,
  customerId,
  passportData,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passportAddressModalSchema),
    defaultValues: {
      address: passportData?.address || '',
    },
  });

  const handleSubmitPassport = async (data) => {
    try {
      const result = await dispatch(
        updatePassport({
          id: customerId,
          passportData: {
            type: passportData?.type,
            number: passportData?.number,
            issueDate: passportData?.issueDate,
            issuerCode: passportData?.issuerCode,
            address: data.address,
          },
        })
      ).unwrap();

      notifySuccess('Passport address updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating passport address:', error);
      notifyError(error || 'Failed to update passport address');
    }
  };

  useEffect(() => {
    if (isOpen && passportData) {
      reset({
        address: passportData.address || '',
      });
    }
  }, [isOpen, passportData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitPassport)}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Գրանցման հասցե"
                error={errors.address?.message}
                required
              />
              <CharacterCount>միայն հայերեն տառեր, թվեր և սիմվոլներ</CharacterCount>
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

export default EditPassportAddressModal;
