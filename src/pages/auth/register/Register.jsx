import { Suspense, lazy, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loading from 'common-ui/loading';
import { isAuthorized, selectRegistrationStep, selectUserInfo } from 'features/auth/authSlice';
import AuthLayout from 'pages/components/authLayout';

import { Container, Description, Title } from '../Auth.styles';

const Step1 = lazy(() => import('./Step1'));
const Step2 = lazy(() => import('./Step2'));
const Step3 = lazy(() => import('./Step3'));
const Step4 = lazy(() => import('./Step4'));

const titles = {
  stepOne: 'Verify phone number',
  stepTwo: 'Verify phone number',
  stepThree: 'Create password',
};

const stepComponents = {
  stepOne: Step1,
  stepTwo: Step2,
  stepThree: Step3,
  stepFour: Step4,
};

const widths = {
  stepOne: 314,
  stepTwo: 390,
  stepThree: 390,
  stepFour: 410,
};

const Register = () => {
  const step = useSelector(selectRegistrationStep);
  const isLoggedIn = useSelector(isAuthorized);
  const userInfo = useSelector(selectUserInfo);

  const descriptions = {
    stepOne:
      'For your security, please verify your phone number to access your CRM dashboard.',
    stepTwo: `Enter the 6-digit code we sent to +${userInfo?.phoneNumber}`,
  };

  const navigate = useNavigate();

  const StepComponent = stepComponents[step] || Step1;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <AuthLayout>
      <Suspense fallback={<Loading />}>
        <Container $maxWidth={widths[step]}>
          {titles[step] && <Title>{titles[step]}</Title>}
          {descriptions[step] && <Description>{descriptions[step]}</Description>}
          <StepComponent />
        </Container>
      </Suspense>
    </AuthLayout>
  );
};

export default Register;
