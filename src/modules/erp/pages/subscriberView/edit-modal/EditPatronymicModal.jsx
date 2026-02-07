import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateName } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';
import { patronymicModalSchema } from '../schema';

const EditPatronymicModal = ({ isOpen, onClose, customerId, nameData, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(patronymicModalSchema),
    defaultValues: {
      patronymic: nameData?.patronymic || '',
    },
  });

  const handleSubmitPatronymic = async (data) => {
    try {
      const result = await dispatch(
        updateName({
          id: customerId,
          nameData: {
            firstName: nameData.firstName,
            lastName: nameData.lastName,
            patronymic: data.patronymic,
          },
        })
      ).unwrap();

      notifySuccess('Patronymic updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating patronymic:', error);
      notifyError(error || 'Failed to update patronymic');
    }
  };

  useEffect(() => {
    if (isOpen && nameData) {
      reset({
        patronymic: nameData.patronymic || '',
      });
    }
  }, [isOpen, nameData, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitPatronymic)}>
        <Controller
          name="patronymic"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Հայրանուն"
                placeholder="Հայրանուն"
                error={errors.patronymic?.message}
                maxLength={50}
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

export default EditPatronymicModal;
