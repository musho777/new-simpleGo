import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Select from 'common-ui/select/Select';
import { selectRoles, setUserInviteBody, setUserInviteStep } from 'features/users/usersSlice';
import useDebounce from 'hooks/useDebounce';
import MyPhoneInput from 'pages/components/myPhoneInput';
import { generateOptions } from 'utils';

import { Form, Row } from './UserManagement.styles';
import { schemaStep1 } from './schema';

const Form1 = memo(({ handleCloseModal }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaStep1),
    defaultValues: {
      name: '',
      surname: '',
      role: null,
      phoneNumber: '',
      email: '',
    },
  });
  const [emailStatus, setEmailStatus] = useState(null);
  const debouncedEmail = useDebounce(watch('email'), 500);

  const [phoneNumberStatus, setPhoneNumberStatus] = useState(null);
  const debouncedPhoneNumber = useDebounce(watch('phoneNumber'), 500);

  const roles = useSelector(selectRoles);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(setUserInviteBody(data));
    dispatch(setUserInviteStep(2));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!debouncedEmail) return;

    setEmailStatus(null);
    clearErrors('email');

    const checkEmailExists = async (email) => {
      try {
        const response = await ApiClient.get(`/users/email-check?email=${email}`);
        if (response) {
          setEmailStatus('available');
          clearErrors('email');
        } else {
          setEmailStatus('busy');
          setError('email', { type: 'manual', message: 'Email is already taken' });
        }
      } catch (error) {
        setEmailStatus('busy');
        setError('email', { type: 'manual', message: 'Invalid email address' });
      }
    };

    checkEmailExists(debouncedEmail);
  }, [debouncedEmail, setError, clearErrors]);

  useEffect(() => {
    if (!debouncedPhoneNumber) return;

    setPhoneNumberStatus(null);
    clearErrors('phoneNumber');

    const checkPhoneNumberExists = async (phoneNumber) => {
      try {
        const response = await ApiClient.get(`/users/phone-check?phoneNumber=${phoneNumber}`);
        if (response) {
          setPhoneNumberStatus('available');
          clearErrors('phoneNumber');
        } else {
          setPhoneNumberStatus('busy');
          setError('phoneNumber', {
            type: 'manual',
            message: 'Phone number is already taken',
          });
        }
      } catch (error) {
        setPhoneNumberStatus('busy');
        setError('phoneNumber', {
          type: 'manual',
          message: 'Phone number is already taken',
        });
      }
    };

    checkPhoneNumberExists(debouncedPhoneNumber);
  }, [debouncedPhoneNumber, setError, clearErrors]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <Row>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="First name"
              error={errors.name?.message}
              className="f-w"
              placeholder="Enter name"
            />
          )}
        />
        <Controller
          name="surname"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Last name"
              error={errors.surname?.message}
              className="f-w"
              placeholder="Enter surname"
            />
          )}
        />
      </Row>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Role"
            $error={errors.role?.message}
            options={generateOptions(roles)}
            placeholder="Role"
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <MyPhoneInput {...field} label="Phone number" error={errors.phoneNumber?.message} />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email address"
            error={errors.email?.message}
            placeholder="Enter email address"
          />
        )}
      />
      <Row>
        <Button outlined onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          secondary
          type="submit"
          disabled={emailStatus === 'busy' || phoneNumberStatus === 'busy'}
        >
          Next
        </Button>
      </Row>
    </Form>
  );
});

export default Form1;
