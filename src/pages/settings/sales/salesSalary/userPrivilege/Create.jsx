import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { InfiniteAsyncSelect } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import {
  createUserPrivilege,
  editUserPrivilege,
  getUserPrivileges,
  getWorkflowStatuses,
} from 'features/sales/salesActions';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import { BtnWrapper, Form, ShiftControl } from '../Sales.styles';
import useSearchData from './useSearchData';

const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(
      nameRegex,
      'Only  Latin and Armenian letters, numbers, and allowed special characters'
    ),
  viewableStatusUuids: Yup.array().nullable().required('Status is required'),
  changeableStatusUuids: Yup.array().nullable().required('Status is required'),
  isEnabled: Yup.boolean(),
});

const Create = ({ isEdit = false, initialData = null, onCloseEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');
  const { searchData } = useSearchData();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      viewableStatusUuids: null,
      changeableStatusUuids: null,
      isEnabled: true,
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        viewableStatusUuids: generateOptions(initialData.viewableStatuses) ?? null,
        changeableStatusUuids: generateOptions(initialData.changeableStatuses) ?? null,
        isEnabled: initialData.isEnabled ?? true,
      });
    }
  }, [initialData, reset]);

  const loadWorkflowOptions = async (params) => {
    try {
      const response = await dispatch(getWorkflowStatuses(params)).unwrap();
      return response;
    } catch (error) {
      console.error('Error loading workflow options:', error);
      return { workflowStatuses: [], total: 0 };
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    if (onCloseEdit) onCloseEdit();
  };

  const onSubmit = (data) => {
    const body = {
      name: data.name,
      description: data.description,
      isEnabled: data.isEnabled,
      viewableStatusUuids: data?.viewableStatusUuids?.map((item) => item?.value),
      changeableStatusUuids: data?.changeableStatusUuids?.map((item) => item?.value),
    };

    const action =
      isEdit && initialData?.uuid
        ? editUserPrivilege({ uuid: initialData.uuid, body })
        : createUserPrivilege(body);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(getUserPrivileges(searchData));
        handleCloseModal();
      })
      .catch((error) => {
        if (error) {
          setError('name', {
            type: 'manual',
            message: error,
          });
        }
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 500 ? '370px' : '430px');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isEdit ? (
        <ShiftControl onClick={handleOpenModal}>
          <img alt="Edit icon" src={EditIcon} />
        </ShiftControl>
      ) : (
        <BtnWrapper>
          <Button secondary onClick={handleOpenModal} className="h-38">
            + Add User Privilege
          </Button>
        </BtnWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={handleSubmit(onSubmit)}
        title={isEdit ? 'Edit User Privilege' : 'Create User Privilege'}
        footer
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
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
                label="Description"
                resizeHorizontal={false}
                error={errors.description?.message}
                placeholder="Enter description"
                maxLength={250}
              />
            )}
          />

          <Controller
            name="viewableStatusUuids"
            control={control}
            render={({ field }) => (
              <InfiniteAsyncSelect
                {...field}
                loadOptionsAction={loadWorkflowOptions}
                label="Status (can view)"
                error={errors.viewableStatusUuids?.message}
                placeholder="Select status"
                isClearable
                menuPlacement="bottom"
                isMulti={true}
                pageSize={10}
                req
                paginationType="page"
                initialData={[]}
              />
            )}
          />

          <Controller
            name="changeableStatusUuids"
            control={control}
            render={({ field }) => (
              <InfiniteAsyncSelect
                {...field}
                loadOptionsAction={loadWorkflowOptions}
                label="Status (can change to)"
                error={errors.changeableStatusUuids?.message}
                placeholder="Select status"
                isClearable
                menuPlacement="top"
                isMulti={true}
                req
                pageSize={10}
                paginationType="page"
                initialData={[]}
              />
            )}
          />

          <Controller
            name="isEnabled"
            control={control}
            render={({ field }) => (
              <div style={{ marginTop: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'end',
                  }}
                >
                  <label style={{ fontSize: '14px', fontWeight: 500 }}>
                    {field.value ? 'Enabled' : 'Disabled'}
                  </label>
                  <Switch isOn={field.value} onToggle={() => field.onChange(!field.value)} />
                </div>
              </div>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
