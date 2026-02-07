import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Dot from 'assets/authAssets/dot.svg';
import TrueIcon from 'assets/authAssets/true.svg';
import WrongIcon from 'assets/authAssets/wrong.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { setNewPassword } from 'features/auth/authActions';
import { setForgetStep } from 'features/auth/authSlice';
import * as Yup from 'yup';

import { Form, Icon } from '../Auth.styles';
import { ErrorItem, ErrorList } from './Forget.styles';

const Step3 = () => {
  const [hideListDots, setHideListDots] = useState(false);
  const { token } = useParams();

  const schema = Yup.object().shape(
    {
      password: Yup.string().test({
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
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
    required: errors?.password?.message?.includes('Password is required'),
    length: errors?.password?.message?.includes('8-32 characters long'),
    number: errors?.password?.message?.includes('At least one number'),
    case: errors?.password?.message?.includes('One uppercase/lowercase letter'),
    special: errors?.password?.message?.includes('Contains a symbol'),
  };

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const newPassword = data.password;

    dispatch(setNewPassword({ token, newPassword }));
    dispatch(setForgetStep('stepFour'));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
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
      <Button primary type="submit" className="mt-13">
        Continue
      </Button>
    </Form>
  );
};

export default Step3;
