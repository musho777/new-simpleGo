import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import errorIcon from 'assets/authAssets/error.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { userLogin } from 'features/auth/authActions';
import { isAuthorized, selectLoading, selectLoginError } from 'features/auth/authSlice';
import AuthLayout from 'pages/components/authLayout';
import * as Yup from 'yup';

import { Container, Description, Form, Icon, ResponseError, Title } from '../Auth.styles';
import { ForgetLink } from './Login.styles';

const loginSchema = Yup.object().shape({
  login: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginError = useSelector(selectLoginError);
  const isLoading = useSelector(selectLoading);
  const isLoggedIn = useSelector(isAuthorized);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateForget = () => {
    navigate('/forget');
  };

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthLayout>
      <Container>
        <Title>Sign In</Title>
        <Description>
          Enter your Email address and password to log in to your CRM system. After successful
          login, you will be redirected to your dashboard.
        </Description>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <ResponseError>
              <Icon src={errorIcon} alt="i" />
              Incorrect Email address or password. Please try again!
            </ResponseError>
          )}
          <Controller
            name="login"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                label="Email address"
                placeholder="Enter your email address"
                error={errors.login?.message}
              />
            )}
          />
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
                error={errors.password?.message}
              />
            )}
          />
          <Button primary type="submit" className="mt-13" loading={isLoading}>
            Continue
          </Button>
        </Form>

        <ForgetLink onClick={handleNavigateForget}>Forget password?</ForgetLink>
      </Container>
    </AuthLayout>
  );
};

export default Login;
