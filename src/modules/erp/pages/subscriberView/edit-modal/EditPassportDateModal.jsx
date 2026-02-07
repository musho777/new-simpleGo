import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updatePassport } from '../../../features/main/mainActions';
import { DatePickerWrapper, Form, Row } from '../EditDeleteModal.styles';
import { passportDateModalSchema } from '../schema';

const EditPassportDateModal = ({ isOpen, onClose, customerId, passportData, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(passportDateModalSchema),
    defaultValues: {
      issueDate: passportData?.issueDate ? new Date(passportData.issueDate) : null,
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
            issueDate: data.issueDate ? data.issueDate.toISOString().split('T')[0] : null,
            issuerCode: passportData?.issuerCode,
            address: passportData?.address,
          },
        })
      ).unwrap();

      notifySuccess('Passport issue date updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating passport date:', error);
      notifyError(error || 'Failed to update passport date');
    }
  };

  useEffect(() => {
    if (isOpen && passportData) {
      reset({
        issueDate: passportData.issueDate ? new Date(passportData.issueDate) : null,
      });
    }
  }, [isOpen, passportData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitPassport)}>
        <Controller
          name="issueDate"
          control={control}
          render={({ field }) => (
            <DatePickerWrapper>
              <CustomDatePicker
                {...field}
                label="Տրման ամսաթիվ"
                placeholder="Տրման ամսաթիվ"
                error={errors.issueDate?.message}
                height="44px"
                disableFuture={true}
                required={true}
              />
            </DatePickerWrapper>
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

export default EditPassportDateModal;
