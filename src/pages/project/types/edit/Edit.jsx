import { memo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import { editProjectType } from 'features/projects/projectsActions';
import * as Yup from 'yup';

import edit from '../../assets/edit.svg';
import { Icon } from '../Types.styles';
import { BtnWrapper, Form, Row, SwitchWrapper } from './Edit.styles';

const typeReg = /^[Ա-ֆa-zA-Z0-9,.:#\-/()&' ]+$/;

const schema = Yup.object().shape({
  name: Yup.string().required('Project name is required').matches(typeReg, 'Invalid format'),
});

const Edit = ({ name = '', description = '', disabled = false, uuid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name,
      description,
      disabled,
    },
  });

  const handleOpenEditProjectModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    dispatch(editProjectType({ ...data, uuid }));
    handleCloseModal();
  };

  return (
    <>
      <BtnWrapper onClick={handleOpenEditProjectModal}>
        <Icon src={edit} alt="e" />
      </BtnWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Edit project type"
        width={'474px'}
        footer={true}
        onOk={handleSubmit(onSubmit)}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                maxLength={50}
                {...field}
                label="Project type name"
                error={errors.name?.message}
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
                maxLength={500}
                resizeVertical={false}
                resizeHorizontal={false}
                label="Description"
                error={errors.description?.message}
                tooltip="You can skip this step!"
              />
            )}
          />
          <Controller
            name={'disabled'}
            control={control}
            render={({ field }) => (
              <SwitchWrapper>
                <Switch isOn={!field.value} onToggle={() => field.onChange(!field.value)} />
                {field.value === true ? 'Disabled' : 'Enabled'}
              </SwitchWrapper>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Edit);
