import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import { getPhoneNumber, registerPhone } from 'features/auth/authActions';
import { selectUserInfo, setRegistrationStep } from 'features/auth/authSlice';
import MyPhoneInput from 'pages/components/myPhoneInput';
import * as Yup from 'yup';

import { Form } from '../Auth.styles';

const phoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .min(11, 'Phone number is too short'),
});

const Step1 = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneNumberSchema),
  });

  const userInfo = useSelector(selectUserInfo);

  const { token } = useParams();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { phoneNumber } = data;
    dispatch(setRegistrationStep('stepTwo'));
    dispatch(registerPhone({ token, phoneNumber }));
  };

  useEffect(() => {
    if (userInfo.phoneNumber) {
      reset({ phoneNumber: userInfo.phoneNumber });
    }
  }, [userInfo.phoneNumber, reset]);

  useEffect(() => {
    dispatch(getPhoneNumber(token));
  }, [dispatch, token]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue={'+3743333333'}
        render={({ field }) => (
          <MyPhoneInput
            {...field}
            label="Phone number"
            placeholder="+374-XX-XXX-XXX"
            error={errors.phoneNumber?.message}
          />
        )}
      />

      <Button primary type="submit" className="mt-13">
        Send code via SMS
      </Button>
    </Form>
  );
};

export default Step1;
