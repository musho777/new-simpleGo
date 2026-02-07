import React, { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import ResetButton from 'common-ui/resetButton';
import TextArea from 'common-ui/textArea';
import { addNoteToCategoryItem } from 'features/inventory/inventoryActions';
import { Form } from 'pages/auth/Auth.styles';

import { noteSchema } from './noteSchema';

const AddRemoveNoteToItem = ({ isOpen, onClose, data, isLoading, hasNote }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(noteSchema),
    defaultValues: {
      customerName: data?.customerName ?? '',
      description: data?.description ?? '',
      customerId: data?.customerId ?? '',
      itemId: data?.uuid,
    },
  });

  const handleReset = () => {
    reset({
      customerName: '',
      description: '',
      customerId: '',
      itemId: data?.uuid,
    });
  };

  const onSubmit = (data) => {
    dispatch(addNoteToCategoryItem(data));
  };

  useEffect(() => {
    reset({
      customerName: data?.customerName ?? '',
      description: data?.description ?? '',
      customerId: data?.customerId ?? '',
      itemId: data?.uuid,
    });
  }, [data]);

  return (
    <Modal
      onOk={handleSubmit(onSubmit)}
      footer={true}
      width="350px"
      isOpen={isOpen}
      onClose={onClose}
      onOkLoading={isLoading}
      closeIcon
      okText={hasNote ? 'Edit' : 'Add note'}
      cancelText="Close"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="customerId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              required
              label={"Customer's ID"}
              error={errors.customerId?.message}
              placeholder="Enter customer's ID"
            />
          )}
        />
        <Controller
          name="customerName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              required
              label="Full name"
              error={errors.customerName?.message}
              placeholder="Enter customer's full name"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              label="Description"
              maxLength={250}
              resizeHorizontal={false}
              resizeVertical={false}
              placeholder="Add your description here"
            />
          )}
        />
      </Form>
      <ResetButton onClick={handleReset} />
    </Modal>
  );
};

export default AddRemoveNoteToItem;
