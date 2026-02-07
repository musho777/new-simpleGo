import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import {
  assignUserPrivilege,
  getAvailablePrivileges,
  getUserPrivileges,
  updateUserPrivilege,
} from 'features/users/usersActions';
import {
  resetPrivilegeSuccess,
  selectAvailablePrivileges,
  selectPrivilegeAssignLoading,
  selectPrivilegeAssignSuccess,
  selectPrivilegeUpdateLoading,
  selectPrivilegeUpdateSuccess,
  selectUserPrivileges,
} from 'features/users/usersSlice';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import {
  ButtonContainer,
  CurrentPrivilegeInfo,
  Form,
  PrivilegeDescription,
  PrivilegeName,
} from './ProfileInfo.styles';

const schema = Yup.object().shape({
  privilege: Yup.object().required('Please select a privilege'),
});

const PrivilegeModal = ({ isOpen, onClose, userUuid }) => {
  const dispatch = useDispatch();
  const userPrivileges = useSelector(selectUserPrivileges);
  const availablePrivileges = useSelector(selectAvailablePrivileges);
  const assignLoading = useSelector(selectPrivilegeAssignLoading);
  const assignSuccess = useSelector(selectPrivilegeAssignSuccess);
  const updateLoading = useSelector(selectPrivilegeUpdateLoading);
  const updateSuccess = useSelector(selectPrivilegeUpdateSuccess);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const currentPrivilege = userPrivileges?.privileges?.[0];

    if (currentPrivilege) {
      dispatch(
        updateUserPrivilege({
          uuid: userUuid,
          currentPrivilegeId: currentPrivilege.id,
          newPrivilegeId: data.privilege.value,
        })
      );
    } else {
      dispatch(
        assignUserPrivilege({
          uuid: userUuid,
          privilegeId: data.privilege.value,
        })
      );
    }
  };

  const handleGetAvailablePrivileges = async () => {
    try {
      await dispatch(getAvailablePrivileges()).unwrap();
    } catch (error) {
      console.error('Error loading available privileges:', error);
    }
  };

  useEffect(() => {
    if (isOpen && userUuid) {
      dispatch(getUserPrivileges(userUuid));
      handleGetAvailablePrivileges();
    }
  }, [isOpen, userUuid, dispatch]);

  useEffect(() => {
    if (assignSuccess || updateSuccess) {
      onClose();
      reset();
      if (userUuid) {
        dispatch(getUserPrivileges(userUuid));
      }
      dispatch(resetPrivilegeSuccess());
    }
  }, [assignSuccess, updateSuccess, onClose, reset, userUuid, dispatch]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (userPrivileges) {
      const currentPrivilege = userPrivileges?.privileges?.[0];
      if (currentPrivilege) {
        reset({
          privilege: {
            label: currentPrivilege.name,
            value: currentPrivilege.id,
          },
        });
      }
    }
  }, [userPrivileges]);

  const currentPrivilege = userPrivileges?.privileges?.[0];
  const isLoading = assignLoading || updateLoading;
  const hasPrivilege = Boolean(currentPrivilege);

  const selectedPrivilege = watch('privilege');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage User Privilege"
      closeIcon={true}
      maxHeight="80%"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {currentPrivilege && (
          <CurrentPrivilegeInfo>
            <PrivilegeName>Current Privilege: {currentPrivilege.name}</PrivilegeName>
            <PrivilegeDescription>{currentPrivilege.description}</PrivilegeDescription>
          </CurrentPrivilegeInfo>
        )}

        <Controller
          name="privilege"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              label="Select New Privilege"
              placeholder="Choose a privilege"
              $error={errors.privilege?.message}
              loadOptions={() => Promise.resolve(generateOptions(availablePrivileges))}
              onMenuOpen={handleGetAvailablePrivileges}
              defaultOptions={generateOptions(availablePrivileges)}
              isSearchable={true}
              required
              menuPlacement="bottom"
              maxMenuHeight={90}
            />
          )}
        />

        <ButtonContainer>
          <Button outlined onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            secondary
            type="submit"
            loading={isLoading}
            disabled={currentPrivilege?.id === selectedPrivilege?.value}
          >
            {hasPrivilege ? 'Update Privilege' : 'Assign Privilege'}
          </Button>
        </ButtonContainer>
      </Form>
    </Modal>
  );
};

export default PrivilegeModal;
