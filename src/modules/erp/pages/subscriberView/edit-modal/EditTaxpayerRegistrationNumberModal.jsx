import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';
import * as yup from 'yup';

import { updateTaxpayerRegistrationNumber } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';

const taxpayerRegistrationNumberModalSchema = yup.object().shape({
  taxpayerRegistrationNumber: yup
    .string()
    .required('ՀՎՀՀ-ն պարտադիր է')
    .matches(/^[0-9]{8}$/, 'ՀՎՀՀ-ն պետք է լինի 8 թվանշան')
    .trim(),
});

const EditTaxpayerRegistrationNumberModal = ({
  isOpen,
  onClose,
  customerId,
  taxpayerRegistrationNumber,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(taxpayerRegistrationNumberModalSchema),
    defaultValues: {
      taxpayerRegistrationNumber: taxpayerRegistrationNumber || '',
    },
  });

  useEffect(() => {
    if (isOpen && taxpayerRegistrationNumber) {
      reset({
        taxpayerRegistrationNumber: taxpayerRegistrationNumber || '',
      });
    }
  }, [isOpen, taxpayerRegistrationNumber, reset]);

  const handleSubmitTaxpayerRegistrationNumber = async (data) => {
    try {
      const result = await dispatch(
        updateTaxpayerRegistrationNumber({
          id: customerId,
          taxpayerRegistrationNumber: data.taxpayerRegistrationNumber,
        })
      ).unwrap();

      notifySuccess('Taxpayer registration number updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating taxpayer registration number:', error);
      notifyError(error || 'Failed to update taxpayer registration number');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitTaxpayerRegistrationNumber)}>
        <InputWrapper>
          <Controller
            name="taxpayerRegistrationNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="ՀՎՀՀ"
                placeholder="Մուտքագրեք ՀՎՀՀ համարը"
                width="100%"
                error={errors.taxpayerRegistrationNumber?.message}
                required
              />
            )}
          />
        </InputWrapper>

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

export default EditTaxpayerRegistrationNumberModal;
