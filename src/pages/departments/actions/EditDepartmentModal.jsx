import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { Select } from 'common-ui/select';
import TextArea from 'common-ui/textArea';
import { updateDepartments } from 'features/departments/departmentsActions';
import { selectDepartments, selectHeads } from 'features/departments/departmentsSlice';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import { Form, Row } from '../Departments.styles';

const armenianNameRegex = /^[\u0530-\u058F\s\-_&/.0-9]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Department name is required')
    .matches(
      armenianNameRegex,
      'Only Armenian letters and numbers, starting with an uppercase'
    ),
});

const EditDepartmentModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const departments = useSelector(selectDepartments);
  const department = departments.find((item) => item.uuid === id);
  const heads = useSelector(selectHeads);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: department?.name || '',
      description: department?.description || '',
      departmentHeadId: department?.head
        ? {
            label: `${department?.head?.name} ${department?.head?.surname}`,
            value: department.head?.uuid,
          }
        : null,
    },
  });

  const handleSubmitEdit = (data) => {
    const cleanData = {};

    for (const key in data) {
      if (key === 'departmentHeadId') {
        cleanData[key] =
          data[key] === null
            ? null
            : Array.isArray(data[key])
              ? data[key][0]?.value
              : data[key]?.value;
      } else if (data[key] !== undefined) {
        cleanData[key] = data[key];
      }
    }

    dispatch(updateDepartments({ ...cleanData, uuid: id }));
    onClose();
  };

  useEffect(() => {
    reset({
      name: department?.name || '',
      description: department?.description || '',
      departmentHeadId: department?.head
        ? {
            label: `${department?.head?.name} ${department?.head?.surname}`,
            value: department.head?.uuid,
          }
        : null,
    });
  }, [department, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Department">
      <Form onSubmit={handleSubmit(handleSubmitEdit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Department name"
              error={errors.name?.message}
              required
              placeholder="Enter name"
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
              isClearable
            />
          )}
        />
        <Row>
          <Button outlined onClick={onClose}>
            Cancel
          </Button>
          <Button secondary type="submit">
            Save
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditDepartmentModal;
