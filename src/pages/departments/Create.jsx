import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Select from 'common-ui/select/Select';
import TextArea from 'common-ui/textArea';
import { createDepartment, getDepartments } from 'features/departments/departmentsActions';
import { selectHeads } from 'features/departments/departmentsSlice';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import { BtnWrapper, Form, Row } from './Departments.styles';

const armenianNameRegex = /^[\u0530-\u058F\s\-_&/.0-9]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Department name is required')
    .matches(
      armenianNameRegex,
      'Only Armenian letters and numbers, starting with an uppercase'
    ),
});

const Create = () => {
  const [modalWidth, setModalWidth] = useState('430px');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heads = useSelector(selectHeads);
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
      departmentHeadId: null,
    },
  });

  const handleOpenCreateDepartmentModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(getDepartments());
    reset();
  };

  const onSubmit = (data) => {
    const cleanData = {};

    for (const key in data) {
      if (data[key] !== null) {
        cleanData[key] = data[key];
      }
    }

    dispatch(createDepartment(cleanData));
    handleCloseModal();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setModalWidth('370px');
      } else {
        setModalWidth('430px');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <BtnWrapper>
        <Button secondary onClick={handleOpenCreateDepartmentModal} className="h-38">
          + Create Department
        </Button>
      </BtnWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create Department"
        onOk={handleSubmit(onSubmit)}
        width={modalWidth}
        footer={true}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Department name"
                placeholder="Enter name"
                error={errors.name?.message}
                required
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
                label="Description"
                placeholder="Describe department"
                error={errors.description?.message}
                tooltip="You can skip this step!"
                resizeVertical={false}
                resizeHorizontal={false}
              />
            )}
          />

          <Controller
            name="departmentHeadId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Department Head"
                $error={errors.departmentHeadId?.message}
                options={generateOptions(heads)}
                tooltip="You can skip this step!"
                placeholder="Assign department head"
                menuPlacement="top"
                maxMenuHeight={180}
              />
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
