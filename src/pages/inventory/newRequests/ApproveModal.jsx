import React, { useEffect } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import * as Yup from 'yup';

import { ApproveModalInfo, ApproveModalItem, ModalText } from './NewRequests.styles';

const approveSchema = Yup.object().shape({
  requests: Yup.array().of(
    Yup.object().shape({
      requestId: Yup.string().required(),
      quantity: Yup.number()
        .typeError('Required')
        .required('Required')
        .min(1, 'Must be at least 1'),
    })
  ),
});

const ApproveModal = ({ isOpen, onClose, onSubmit, selectedRequests, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(approveSchema),
    defaultValues: {
      requests: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'requests',
  });

  useEffect(() => {
    if (isOpen && selectedRequests?.length) {
      const initialValues = selectedRequests.map((req) => ({
        requestId: req.uuid,
        quantity: req.quantity ?? '',
      }));
      replace(initialValues);
    }
  }, [isOpen, selectedRequests, replace]);

  const onFormSubmit = (data) => {
    onSubmit(data.requests);
  };

  return (
    <Modal
      okText="Approve"
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSubmit(onFormSubmit)}
      onOkLoading={isLoading}
      title="Confirmation of requests"
      footer
      width="540px"
      maxHeight="700px"
    >
      <ModalText>
        You can adjust the quantity and choose how many to approve each request
      </ModalText>

      {fields.map((field, index) => (
        <ApproveModalItem key={field.id}>
          <ApproveModalInfo>{selectedRequests[index]?.requesterName}</ApproveModalInfo>
          <ApproveModalInfo>{selectedRequests[index]?.itemName}</ApproveModalInfo>

          <Controller
            name={`requests[${index}].quantity`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                className="quantity-input"
                error={errors?.requests?.[index]?.quantity?.message}
                width="56px"
              />
            )}
          />
        </ApproveModalItem>
      ))}
    </Modal>
  );
};

export default ApproveModal;
