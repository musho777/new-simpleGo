import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import {
  getAdditionalInfo,
  getUserProfileInfo,
  updatePersonalInfo,
} from 'features/profile/profileActions';
import {
  resetPersonalInfoSuccess,
  selectAdditionalInfo,
  selectLoading,
  selectPersonalInfo,
  selectPersonalUpdateSuccess,
} from 'features/profile/profileSlice';
import useDebounce from 'hooks/useDebounce';
import FieldItem from 'pages/components/fieldItem';
import { notifySuccess } from 'utils/notifyConfig';
import * as yup from 'yup';

import { PendingIcon } from '../languagesEdit/LanguagesEdit.styles';
import { ButtonContainer, Form, Row, Wrapper } from './PersonalInfoEdit.styles';
import pending from './pending.svg';

const armenianNameRegex = /^[\u0531-\u0556][\u0530-\u058F\s-]*$/;

const PersonalInfoEdit = () => {
  const [editMode, setEditMode] = useState(false);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectPersonalUpdateSuccess);
  const [nicknameError, setNicknameError] = useState(null);
  const [nickname, setNickname] = useState(additionalInfo.nickname);
  const debouncedNickname = useDebounce(nickname, 500);
  const userType = localStorage.getItem('userType');
  const data = useSelector(selectPersonalInfo);
  const { uuid } = useParams();

  const canEditSchedule =
    userType === 'Hr Manager' ||
    (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
    (userType === 'Super Admin' && additionalInfo.isSuper && uuid);

  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(armenianNameRegex, 'First name must contain only Armenian characters.')
      .required('First name is required.')
      .min(2, 'First name must be at least 2 characters.')
      .max(50, 'First name cannot exceed 50 characters.'),
    surname: yup
      .string()
      .matches(armenianNameRegex, 'Last name must contain only Armenian characters.')
      .required('Last name is required.')
      .min(2, 'First name must be at least 2 characters.')
      .max(50, 'Last name cannot exceed 50 characters.'),
    nickname: yup
      .string()
      .notRequired()
      .test(
        'nickname-length',
        'Nickname must be at least 2 characters or left empty.',
        (value) => !value || value.length >= 2
      )
      .max(30, 'Nickname cannot exceed 30 characters.'),
  });

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data.name?.value || '',
      namePending: data.name?.pending,
      surname: data.surname?.value || '',
      surnamePending: data.surname?.pending,
      nickname: additionalInfo.nickname || '',
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    reset({
      name: data.name?.value || '',
      namePending: data.name?.pending,
      surname: data.surname?.value || '',
      surnamePending: data.surname?.pending,
      nickname: additionalInfo.nickname || '',
    });
  }, [additionalInfo, reset, data]);

  const checkNicknameUniqueness = async () => {
    if (!debouncedNickname || debouncedNickname === additionalInfo.nickname) return;

    try {
      const isBusy = await ApiClient.get(`/users/nickname?nickname=${debouncedNickname}`);
      if (isBusy) {
        setNicknameError('Nickname is already taken.');
      } else {
        setNicknameError(null);
      }
    } catch (error) {
      console.error('Error checking nickname uniqueness:', error);
    }
  };

  useEffect(() => {
    checkNicknameUniqueness();
  }, [debouncedNickname]);

  const onSubmit = (data) => {
    const fieldMappings = {
      name: 'name',
      surname: 'surname',
      nickname: 'nickname',
    };

    const modifiedData = {};

    for (const key in data) {
      const mappedKey = fieldMappings[key];
      if (data[key] !== additionalInfo[mappedKey]) {
        modifiedData[key] = data[key];
      }
    }

    dispatch(updatePersonalInfo({ userType, data: modifiedData, uuid }));
    setEditMode(false);
  };

  const handleCancel = () => {
    reset({
      name: data.name?.value || '',
      namePending: data.name?.pending,
      surname: data.surname?.value || '',
      surnamePending: data.surname?.pending,
      nickname: additionalInfo.nickname || '',
    });
    setEditMode(false);
  };

  const onEdit = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (success) {
      notifySuccess('Changes successfully saved');
      if (uuid) {
        dispatch(getAdditionalInfo(uuid));
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getAdditionalInfo());
        dispatch(getUserProfileInfo());
      }
    }

    dispatch(resetPersonalInfoSuccess());
  }, [success]);

  useEffect(() => {
    reset({
      name: data.name?.value || '',
      namePending: data.name?.pending,
      surname: data.surname?.value || '',
      surnamePending: data.surname?.pending,
      nickname: additionalInfo.nickname || '',
    });
  }, [data]);

  return (
    <FieldItem
      type="container"
      title="Personal Information"
      editable={!editMode}
      onEdit={onEdit}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Wrapper>
                <Input
                  {...field}
                  label="First name"
                  placeholder="First name"
                  error={errors.name?.message}
                  disabled={!editMode}
                  readOnly={!editMode}
                  onKeyDown={handleKeyDown}
                />
                {data.name?.pending && <PendingIcon src={pending} alt="Pending" />}
              </Wrapper>
            )}
          />

          <Controller
            name="surname"
            control={control}
            render={({ field }) => (
              <Wrapper>
                <Input
                  {...field}
                  label="Last name"
                  placeholder="Last name"
                  error={errors.surname?.message}
                  disabled={!editMode}
                  readOnly={!editMode}
                  onKeyDown={handleKeyDown}
                />
                {data.surname?.pending && <PendingIcon src={pending} alt="Pending" />}
              </Wrapper>
            )}
          />

          {canEditSchedule && (
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <Wrapper>
                  <Input
                    {...field}
                    label="Nickname"
                    placeholder="Nickname"
                    disabled={!editMode || !canEditSchedule}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    readOnly={!editMode || !canEditSchedule}
                    error={nicknameError || errors.nickname?.message}
                    onKeyDown={handleKeyDown}
                  />
                </Wrapper>
              )}
            />
          )}
        </Row>

        {editMode && (
          <ButtonContainer>
            <Button type="button" outlined onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" secondary disabled={!!nicknameError} loading={isLoading}>
              Save changes
            </Button>
          </ButtonContainer>
        )}
      </Form>
    </FieldItem>
  );
};

export default PersonalInfoEdit;
