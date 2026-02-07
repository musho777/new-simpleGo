import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';
import * as yup from 'yup';

import { updateLocation } from '../../../features/main/mainActions';
import { Form, InputWrapper, Row } from '../EditDeleteModal.styles';

const locationModalSchema = yup.object().shape({
  location: yup.string().required('Գտնվելու վայրի հասցեն պարտադիր է').trim(),
});

const EditLocationModal = ({ isOpen, onClose, customerId, location, onSuccess }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(locationModalSchema),
    defaultValues: {
      location: location || '',
    },
  });

  useEffect(() => {
    if (isOpen && location) {
      reset({
        location: location || '',
      });
    }
  }, [isOpen, location, reset]);

  const handleSubmitLocation = async (data) => {
    try {
      const result = await dispatch(
        updateLocation({
          id: customerId,
          location: data.location,
        })
      ).unwrap();

      notifySuccess('Location updated successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error updating location:', error);
      notifyError(error || 'Failed to update location');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form onSubmit={handleSubmit(handleSubmitLocation)}>
        <InputWrapper>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Գտնվելու վայրի հասցեն"
                placeholder="Մուտքագրեք գտնվելու վայրի հասցեն"
                width="100%"
                error={errors.location?.message}
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

export default EditLocationModal;
