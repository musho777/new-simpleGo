import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Dot from 'assets/authAssets/dot.svg';
import TrueIcon from 'assets/authAssets/true.svg';
import WrongIcon from 'assets/authAssets/wrong.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { adminNewPassword } from 'features/auth/authActions';
import { selectAuthSuccess, selectLoading } from 'features/auth/authSlice';
import { Form, Icon } from 'pages/auth/Auth.styles';
import { ErrorItem, ErrorList } from 'pages/auth/register/Register.styles';
import Success from 'pages/components/success';
import styled from 'styled-components';
import * as Yup from 'yup';

const Title = styled.h1`
  color: #212529;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #6c757d;
  text-align: center;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ChangePasswordSuper = () => {
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectAuthSuccess);
  const [hideListDots, setHideListDots] = useState(false);

  const schema = Yup.object().shape(
    {
      newPassword: Yup.string().test({
        name: 'password-validation',
        test(value, ctx) {
          const errors = [];
          setHideListDots(true);

          if (!value) {
            errors.push('Password is required');
          } else {
            if (!/^.{8,32}$/.test(value)) {
              errors.push('8-32 characters long');
            }
            if (!/[0-9]/.test(value)) {
              errors.push('At least one number');
            }
            if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
              errors.push('One uppercase/lowercase letter');
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
              errors.push('Contains a symbol');
            }
          }

          if (errors.length) {
            return ctx.createError({ message: errors.join(', ') });
          }

          return true;
        },
      }),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    },
    { abortEarly: false }
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const password = {
    required: errors?.newPassword?.message?.includes('Password is required'),
    length: errors?.newPassword?.message?.includes('8-32 characters long'),
    number: errors?.newPassword?.message?.includes('At least one number'),
    case: errors?.newPassword?.message?.includes('One uppercase/lowercase letter'),
    special: errors?.newPassword?.message?.includes('Contains a symbol'),
  };

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { newPassword } = data;
    dispatch(adminNewPassword({ newPassword }));
  };

  if (success) {
    return (
      <Success
        title="Congratulations!"
        description="Your profile was successfully created!"
        buttonText="Go to Log In"
      />
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Set up your new password</Title>
      <Description>For security reasons, please set a new password.</Description>
      <Controller
        name="newPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Password"
            placeholder="********"
            error={!!errors.password}
          />
        )}
      />
      <ErrorList $error={hideListDots}>
        <ErrorItem>
          {hideListDots ? (
            password.required || password.length ? (
              <Icon alt="icon" src={WrongIcon} />
            ) : (
              <Icon alt="icon" src={TrueIcon} />
            )
          ) : (
            <Icon alt="icon" src={Dot} />
          )}
          <span>8-32 characters long</span>
        </ErrorItem>
        <ErrorItem>
          {hideListDots ? (
            password.required || password.number ? (
              <Icon alt="icon" src={WrongIcon} />
            ) : (
              <Icon alt="icon" src={TrueIcon} />
            )
          ) : (
            <Icon alt="icon" src={Dot} />
          )}
          At least one number
        </ErrorItem>
        <ErrorItem>
          {hideListDots ? (
            password.required || password.case ? (
              <Icon alt="icon" src={WrongIcon} />
            ) : (
              <Icon alt="icon" src={TrueIcon} />
            )
          ) : (
            <Icon alt="icon" src={Dot} />
          )}
          One uppercase/lowercase letter
        </ErrorItem>
        <ErrorItem>
          {hideListDots ? (
            password.required || password.special ? (
              <Icon alt="icon" src={WrongIcon} />
            ) : (
              <Icon alt="icon" src={TrueIcon} />
            )
          ) : (
            <Icon alt="icon" src={Dot} />
          )}
          Contains a symbol
        </ErrorItem>
      </ErrorList>
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            label="Confirm Password"
            placeholder="********"
            error={errors?.confirmPassword?.message}
          />
        )}
      />
      <Button primary type="submit" className="mt-13" loading={isLoading}>
        Continue
      </Button>
    </Form>
  );
};

export default ChangePasswordSuper;
