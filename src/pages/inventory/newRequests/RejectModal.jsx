import React, { useEffect } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import * as Yup from 'yup';

import {
  ApproveModalInfo,
  ModalText,
  RejectModalItem,
  RejectsInfo,
} from './NewRequests.styles';

const rejectSchema = Yup.object().shape({
  requests: Yup.array().of(
    Yup.object().shape({
      requestId: Yup.string().required(),
      reason: Yup.string().optional(),
    })
  ),
});

const RejectModal = ({ isOpen, onClose, onSubmit, selectedRequests, isLoading }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(rejectSchema),
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
        reason: '',
      }));
      replace(initialValues);
    }
  }, [isOpen, selectedRequests, replace]);

  const onFormSubmit = (data) => {
    onSubmit(data.requests);
  };

  return (
    <Modal
      okText="Reject"
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSubmit(onFormSubmit)}
      onOkLoading={isLoading}
      title="Rejection of requests"
      footer
      width="540px"
      maxHeight="700px"
    >
      <ModalText>
        Are you sure you want to reject the requests? You can also leave a comment to explain
        why.
      </ModalText>

      {fields.map((field, index) => (
        <RejectModalItem key={field.id}>
          <RejectsInfo>
            <ApproveModalInfo>{selectedRequests[index]?.requesterName}</ApproveModalInfo>
            <ApproveModalInfo>{selectedRequests[index]?.itemName}</ApproveModalInfo>
            <ApproveModalInfo>{selectedRequests[index]?.quantity}</ApproveModalInfo>
          </RejectsInfo>
          <Controller
            name={`requests[${index}].reason`}
            control={control}
            render={({ field }) => (
              <Input placeholder="Tap to add a rejection reason (optional)" {...field} />
            )}
          />
        </RejectModalItem>
      ))}
    </Modal>
  );
};

export default RejectModal;
