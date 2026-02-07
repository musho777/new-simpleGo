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
import { passportIssuerModalSchema } from '../schema';

const EditPassportIssuerModal = ({ isOpen, onClose, customerId, passportData, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passportIssuerModalSchema),
    defaultValues: {
      issuerCode: passportData?.issuerCode || '',
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
            issuerCode: data.issuerCode,
            address: passportData?.address,
          },
        })
      ).unwrap();

      notifySuccess('Passport issuer updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating passport issuer:', error);
      notifyError(error || 'Failed to update passport issuer');
    }
  };

  useEffect(() => {
    if (isOpen && passportData) {
      reset({
        issuerCode: passportData.issuerCode || '',
      });
    }
  }, [isOpen, passportData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitPassport)}>
        <Controller
          name="issuerCode"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="ՈՒմ կողմից է տրված"
                error={errors.issuerCode?.message}
                required
              />
              <CharacterCount>միայն թվանշաններ</CharacterCount>
            </InputWrapper>
          )}
        />

        <Row>
          <Button outlined onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button secondary type="submit" loading={isSubmitting}>
            Save Changes
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditPassportIssuerModal;
