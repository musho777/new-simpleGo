import { memo, useMemo } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import { AsyncSelect } from 'common-ui/select';
import Select from 'common-ui/select/Select';
import { USER_ADDITIONAL_INFO } from 'constants/constants';
import { selectUserInfo } from 'features/auth/authSlice';
import { getTimezone } from 'features/projects/projectsActions';
import { selectTimezone } from 'features/projects/projectsSlice';
import { createSuperUser, createUser } from 'features/users/usersActions';
import { selectUserInviteBody } from 'features/users/usersSlice';
import { generateOptions } from 'utils';

import { Form, Row } from './UserManagement.styles';
import { schemaStep2 } from './schema';

const Form2 = memo(({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const prevForm = useSelector(selectUserInviteBody);
  const timezone = useSelector(selectTimezone);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaStep2),
    defaultValues: {
      occupation: null,
      commission: null,
      holidays: null,
      officeLocation: null,
      timezone: null,
    },
  });

  const user = useSelector(selectUserInfo);

  const isSuperUser = useMemo(() => user?.userType === 'Super Admin', [user]);

  const handleGetTimezone = (name) => {
    dispatch(getTimezone({ name }));
  };

  const onSubmit = (data) => {
    isSuperUser
      ? dispatch(createSuperUser({ ...prevForm, ...data }))
      : dispatch(createUser({ ...prevForm, ...data }));

    handleCloseModal();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {!isSuperUser && (
        <Controller
          name="occupation"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Occupation"
              $error={errors.occupation?.message}
              options={USER_ADDITIONAL_INFO.occupation}
              placeholder="Select occupation"
              req
            />
          )}
        />
      )}
      <Controller
        name="commission"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Commission"
            $error={errors.commission?.message}
            options={USER_ADDITIONAL_INFO.commission}
            menuPlacement="bottom"
            req
            placeholder="Select the commissions"
          />
        )}
      />
      <Controller
        name="holidays"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Holidays"
            $error={errors.holidays?.message}
            options={USER_ADDITIONAL_INFO.holidays}
            req
            placeholder="Select the holidays"
          />
        )}
      />
      <Controller
        name="officeLocation"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Office Location"
            $error={errors.officeLocation?.message}
            options={USER_ADDITIONAL_INFO.officeLocation}
            req
            placeholder="Select office location"
            menuPlacement="top"
          />
        )}
      />
      <Controller
        name="timezoneId"
        control={control}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            label="Time zone"
            $error={errors.timezoneId?.message}
            isSearchable={false}
            loadOptions={handleGetTimezone}
            onMenuOpen={handleGetTimezone}
            defaultOptions={generateOptions(timezone)}
            menuPlacement="top"
            req
            placeholder="Select timezone"
          />
        )}
      />
      <Row>
        <Button outlined onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button secondary type="submit">
          Invite
        </Button>
      </Row>
    </Form>
  );
});

export default Form2;
