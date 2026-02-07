import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { forgotPassword } from 'features/auth/authActions';
import { setForgetEmail, setForgetStep } from 'features/auth/authSlice';
import * as Yup from 'yup';

import { Form } from '../Auth.styles';
import { RowDiv, SignInLink, StyledText } from './Forget.styles';

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const Step1 = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate('/login');
  };

  const onSubmit = (data) => {
    const { email } = data;

    dispatch(forgotPassword({ email }));
    dispatch(setForgetEmail(email));
    dispatch(setForgetStep('stepTwo'));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            label="Email address"
            placeholder="Enter your email address"
            error={errors.email?.message}
          />
        )}
      />

      <Button primary type="submit" className="mt-13">
        Continue
      </Button>
      <RowDiv>
        <StyledText>or </StyledText>
        <SignInLink onClick={handleNavigateLogin}> Sign In</SignInLink>
      </RowDiv>
    </Form>
  );
};

export default Step1;
