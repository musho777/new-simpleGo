import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';
import * as yup from 'yup';

import { updateCompanyName } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';

const companyNameModalSchema = yup.object().shape({
  companyName: yup.string().required('Կազմակերպության անվանումը պարտադիր է').trim(),
});

const EditCompanyNameModal = ({ isOpen, onClose, customerId, companyName, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(companyNameModalSchema),
    defaultValues: {
      companyName: companyName || '',
    },
  });

  useEffect(() => {
    if (isOpen && companyName) {
      reset({
        companyName: companyName || '',
      });
    }
  }, [isOpen, companyName, reset]);

  const handleSubmitCompanyName = async (data) => {
    try {
      const result = await dispatch(
        updateCompanyName({
          id: customerId,
          companyName: data.companyName,
        })
      ).unwrap();

      notifySuccess('Company name updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating company name:', error);
      notifyError(error || 'Failed to update company name');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitCompanyName)}>
        <InputWrapper>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Կազմակերպության անվանում"
                placeholder="Մուտքագրեք կազմակերպության անվանումը"
                width="100%"
                error={errors.companyName?.message}
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

export default EditCompanyNameModal;
