import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateExternalId } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { externalIdModalSchema } from '../schema';

const EditExternalIdModal = ({ isOpen, onClose, customerId, externalId, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(externalIdModalSchema),
    defaultValues: {
      externalId: externalId || '',
    },
  });

  const handleSubmitExternalId = async (data) => {
    try {
      const result = await dispatch(
        updateExternalId({
          id: customerId,
          externalId: data.externalId,
        })
      ).unwrap();

      notifySuccess('External ID updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating external ID:', error);
      notifyError(error || 'Failed to update external ID');
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        externalId: externalId || '',
      });
    }
  }, [isOpen, externalId, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitExternalId)}>
        <Controller
          name="externalId"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="ERP External Id"
                placeholder="ERP External Id"
                error={errors.externalId?.message}
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

export default EditExternalIdModal;
