import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Select from 'common-ui/select/Select';
import TextArea from 'common-ui/textArea';
import { createBranch } from 'features/branches/branchesActions';
import { selectBranches, selectHeads } from 'features/branches/branchesSlice';
import { selectRegions } from 'features/regions/regionsSlice';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import { BtnWrapper, Form, Row } from './Branches.styles';

const armenianNameRegex = /^[\u0530-\u058F\s\-_&/.0-9]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Branch name is required')
    .matches(armenianNameRegex, 'Name must contain only Armenian letters and numbers'),
  regionIds: Yup.array()
    .min(1, 'At least one region is required')
    .required('Region is required'),
});

const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');

  const branches = useSelector(selectBranches);
  const heads = useSelector(selectHeads);
  const regions = useSelector(selectRegions);
  const { uuid } = useParams();

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
      departmentId: uuid,
      branchHeadId: null,
      regionIds: [],
    },
  });

  const handleOpenCreateBranchModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    const cleanData = {};

    for (const key in data) {
      if (data[key] !== null) {
        if (key === 'regionIds' && Array.isArray(data[key])) {
          cleanData[key] = data[key].map((region) => region.value);
        } else {
          cleanData[key] = data[key];
        }
      }
    }

    dispatch(createBranch(cleanData));
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
        <Button secondary onClick={handleOpenCreateBranchModal} className="h-38">
          +Create branch
        </Button>
      </BtnWrapper>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit)}
        title="Create Branch"
        footer={true}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Branch name"
                error={errors.name?.message}
                placeholder="Enter name"
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
                placeholder="Describe branch"
                label="Description"
                error={errors.description?.message}
                tooltip="You can skip this step!"
                maxLength={100}
                resizeVertical={false}
                resizeHorizontal={false}
              />
            )}
          />

          <Controller
            name="branchHeadId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Branch Head"
                $error={errors.branchHeadId?.message}
                tooltip="You can skip this step!"
                options={generateOptions(heads)}
                placeholder="Assign branch head"
                isClearable
                menuPlacement="top"
                maxMenuHeight={180}
              />
            )}
          />

          <Controller
            name="regionIds"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder="Attach 1 or more regions for your branch"
                label="Regions"
                $error={errors.regionIds?.message}
                options={generateOptions(regions)}
                menuPlacement="top"
                maxMenuHeight={180}
                req
              />
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
