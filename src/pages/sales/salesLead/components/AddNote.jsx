import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import TextArea from 'common-ui/textArea';
import { addLeadNote, getLeadById } from 'features/sales/salesActions';
import { selectAddNoteLoading, selectAddNoteSuccess } from 'features/sales/salesSlice';
import * as Yup from 'yup';

import { Form } from '../SalesLead.styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});
export const AddNote = ({ isModalOpen, handleCloseModal, modalWidth, leadId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAddNoteLoading);
  const successAddNote = useSelector(selectAddNoteSuccess);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
    shouldFocusError: false,
  });

  const onSubmit = (data) => {
    dispatch(
      addLeadNote({
        leadId: leadId,
        data,
      })
    );
  };

  useEffect(() => {
    if (successAddNote) {
      reset();
      handleCloseModal();
      dispatch(getLeadById(leadId));
    }
  }, [successAddNote]);

  useEffect(() => {
    if (!isModalOpen) {
      reset();
    }
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onOkLoading={isLoading}
      width={modalWidth}
      onOk={handleSubmit(onSubmit)}
      title={'Add Note'}
      footer={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Title"
              error={errors.title?.message}
              placeholder="Armenian or Latin letters"
              maxLength={50}
              required
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
              placeholder="Describe offer"
              error={errors.description?.message}
              resizeVertical={false}
              resizeHorizontal={false}
              maxLength={250}
            />
          )}
        />
      </Form>
    </Modal>
  );
};
