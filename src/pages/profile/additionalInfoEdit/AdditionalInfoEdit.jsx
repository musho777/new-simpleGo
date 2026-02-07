import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from 'common-ui/button';
import { AsyncSelect, Select } from 'common-ui/select';
import { USER_ADDITIONAL_INFO } from 'constants/constants';
import { selectUserInfo } from 'features/auth/authSlice';
import { editAdditionalInfo, getAdditionalInfo } from 'features/profile/profileActions';
import {
  resetAdditionalUpdateSuccess,
  selectAdditionalInfo,
  selectAdditionalUpdateSuccess,
  selectLoading,
} from 'features/profile/profileSlice';
import { getTimezone } from 'features/projects/projectsActions';
import { selectTimezone } from 'features/projects/projectsSlice';
import { getRoles } from 'features/users/usersActions';
import { selectRoles } from 'features/users/usersSlice';
import FieldItem from 'pages/components/fieldItem';
import { generateOptions } from 'utils';
import { notifySuccess } from 'utils/notifyConfig';

import { capitalizeFirstLetter } from '../../../utils/index';
import { ButtonContainer, Form, Row } from './AdditionalInfoEdit.styles';

const AdditionalInfoEdit = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const user = useSelector(selectUserInfo);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const success = useSelector(selectAdditionalUpdateSuccess);
  const isLoading = useSelector(selectLoading);
  const [editMode, setEditMode] = useState(false);
  const userType = localStorage.getItem('userType');
  const isSuperUser = useMemo(() => user?.userType === 'Super Admin', [user]);
  const timezone = useSelector(selectTimezone);
  const { uuid } = useParams();

  const defaultValues = useMemo(
    () => ({
      defaultRoleId: additionalInfo.role
        ? { value: additionalInfo.role, label: capitalizeFirstLetter(additionalInfo.role) }
        : null,
      occupation: additionalInfo.occupation
        ? {
            value: additionalInfo.occupation,
            label: capitalizeFirstLetter(additionalInfo.occupation),
          }
        : null,
      commission: additionalInfo.commission
        ? {
            value: additionalInfo.commission,
            label: capitalizeFirstLetter(additionalInfo.commission),
          }
        : null,
      holidays: additionalInfo.holidays
        ? {
            value: additionalInfo.holidays,
            label: capitalizeFirstLetter(additionalInfo.holidays),
          }
        : null,
      officeLocation: additionalInfo.officeLocation
        ? USER_ADDITIONAL_INFO.officeLocation.find(
            (location) => location.value === additionalInfo?.officeLocation
          )
        : null,
      timezoneId: {
        value: additionalInfo?.timezone?.uuid ?? '',
        label: additionalInfo?.timezone?.name ?? '',
      },
    }),
    [additionalInfo]
  );

  const { handleSubmit, control, reset } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    const changedValues = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        return [key, value?.value || value];
      })
    );

    const valuesToSubmit = Object.fromEntries(
      Object.entries(changedValues).filter(
        ([key, value]) => value !== defaultValues[key]?.value
      )
    );

    if (Object.keys(valuesToSubmit).length > 0) {
      dispatch(editAdditionalInfo({ data: valuesToSubmit, uuid, userType }));
    }
    reset(defaultValues);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    reset(defaultValues);
  };

  const onEdit = () => {
    setEditMode(true);
  };

  const handleGetTimezone = () => dispatch(getTimezone());

  useEffect(() => {
    isSuperUser
      ? dispatch(getRoles({ isSuperUser, isDefault: true }))
      : dispatch(getRoles({ isSuperUser: false, isDefault: true }));
  }, [dispatch, isSuperUser]);

  useEffect(() => {
    reset(defaultValues);
  }, [additionalInfo, defaultValues]);

  useEffect(() => {
    if (success) {
      dispatch(getAdditionalInfo(uuid));
      notifySuccess('Changes successfully saved');
      dispatch(resetAdditionalUpdateSuccess());
    }
  }, [success, dispatch, uuid]);

  return (
    <FieldItem
      type="container"
      title="Additional information"
      editable={!editMode}
      onEdit={onEdit}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="underline">
          <Controller
            name="defaultRoleId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Role"
                placeholder="Role"
                options={generateOptions(roles)}
                isDisabled={!editMode}
              />
            )}
          />
          {!additionalInfo.isSuper && (
            <Controller
              name="occupation"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Occupation"
                  placeholder="Occupation"
                  isDisabled={!editMode}
                  options={USER_ADDITIONAL_INFO.occupation}
                />
              )}
            />
          )}
        </Row>
        <Row>
          <Controller
            name="timezoneId"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                isSearchable={false}
                isDisabled={!editMode}
                placeholder="Time zone"
                label="Time zone"
                loadOptions={handleGetTimezone}
                onMenuOpen={handleGetTimezone}
                defaultOptions={generateOptions(timezone)}
              />
            )}
          />
          <Controller
            name="holidays"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Calendar of Holidays"
                isDisabled={!editMode}
                placeholder="Calendar of Holidays"
                options={USER_ADDITIONAL_INFO.holidays}
              />
            )}
          />
        </Row>
        <Row>
          <Controller
            name="commission"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Commissions"
                isDisabled={!editMode}
                placeholder="Commissions"
                menuPlacement="top"
                options={USER_ADDITIONAL_INFO.commission}
              />
            )}
          />
          <Controller
            name="officeLocation"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Office location"
                isDisabled={!editMode}
                placeholder="Office location"
                options={USER_ADDITIONAL_INFO.officeLocation}
                menuPlacement="top"
              />
            )}
          />
        </Row>
        {editMode && (
          <ButtonContainer>
            <Button type="button" outlined onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" secondary loading={isLoading}>
              Save changes
            </Button>
          </ButtonContainer>
        )}
      </Form>
    </FieldItem>
  );
};

export default AdditionalInfoEdit;
