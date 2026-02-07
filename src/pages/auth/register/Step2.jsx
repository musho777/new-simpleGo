import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import { registerPhone, verifyOtp } from 'features/auth/authActions';
import {
  selectLoading,
  selectLoginError,
  selectOtp,
  selectUserInfo,
  setRegistrationStep,
} from 'features/auth/authSlice';
import CodeInput from 'pages/components/codeInput';
import { notifyError } from 'utils/notifyConfig';
import * as Yup from 'yup';

import { Form } from '../Auth.styles';

const validationSchema = Yup.object().shape({
  code: Yup.array()
    .of(
      Yup.string()
        .matches(/^[0-9]$/, 'Must be a number')
        .required('Required')
    )
    .length(6, 'Must be exactly 6 digits'),
});

const Step2 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      code: Array(6).fill(''),
    },
  });

  const code = useSelector(selectOtp);
  const error = useSelector(selectLoginError);
  const userInfo = useSelector(selectUserInfo);
  const isLoading = useSelector(selectLoading);

  const { token } = useParams();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const otp = data.code.join('');

    const resultAction = await dispatch(
      verifyOtp({ token, otp, action: 'register phone number' })
    );

    if (verifyOtp.fulfilled.match(resultAction)) {
      dispatch(setRegistrationStep('stepThree'));
    } else if (verifyOtp.rejected.match(resultAction)) {
      notifyError(resultAction.payload || 'An unexpected error occurred.');
    }
  };

  const handleClickResendCode = () => {
    dispatch(registerPhone({ token, phoneNumber: userInfo.phoneNumber }));
  };

  useEffect(() => {
    code?.otp && alert(`Your OTP is: ${code.otp}`);
  }, [code]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="code"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CodeInput
            codeCount={6}
            error={!!errors.code ?? error}
            value={value || Array(6).fill('')}
            onChange={(newValues) => {
              onChange(newValues);
            }}
          />
        )}
      />
      <Button type="link" onClick={handleClickResendCode}>
        Resend code
      </Button>
      <Button primary type="submit" loading={isLoading}>
        Continue
      </Button>
    </Form>
  );
};

export default Step2;
