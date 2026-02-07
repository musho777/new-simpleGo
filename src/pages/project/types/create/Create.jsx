import { memo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import { createProjectType } from 'features/projects/projectsActions';
import * as Yup from 'yup';

import { BtnWrapper, Form, Row, SwitchWrapper } from './Create.styles';

const typeReg = /^[Ա-ֆa-zA-Z0-9,.:#\-/()&' ]+$/;

const schema = Yup.object().shape({
  name: Yup.string().required('Project name is required').matches(typeReg, 'Invalid format'),
});

const Create = () => {
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
      name: '',
      description: '',
      disabled: false,
    },
  });

  const handleOpenCreateProjectModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    dispatch(createProjectType(data));
    handleCloseModal();
  };

  return (
    <>
      <BtnWrapper>
        <Button secondary onClick={handleOpenCreateProjectModal} className="h-38">
          + Create project type
        </Button>
      </BtnWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create project type"
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
                {...field}
                label="Project type name"
                error={errors.name?.message}
                required
                placeholder="Enter project type name"
                maxLength={50}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                resizeVertical={false}
                resizeHorizontal={false}
                maxLength={500}
                label="Description"
                placeholder="Describe project type"
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

export default memo(Create);
