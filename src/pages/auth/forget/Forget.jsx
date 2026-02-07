import { Suspense, lazy, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from 'common-ui/loading';
import { selectForgetStep, setForgetStep } from 'features/auth/authSlice';
import AuthLayout from 'pages/components/authLayout';

import { Container, Description, Title } from '../Auth.styles';

const Step1 = lazy(() => import('./Step1'));
const Step2 = lazy(() => import('./Step2'));
const Step3 = lazy(() => import('./Step3'));
const Step4 = lazy(() => import('./Step4'));

const titles = {
  stepOne: 'Reset password',
  stepThree: 'Create password',
};

const descriptions = {
  stepOne:
    'Enter the email address associated with your account, and we’ll send you a link to reset your password.',
};

const stepComponents = {
  stepOne: Step1,
  stepTwo: Step2,
  stepThree: Step3,
  stepFour: Step4,
};

const widths = {
  stepOne: 390,
  stepTwo: 525,
  stepThree: 390,
  stepFour: 410,
};

const Forget = () => {
  const step = useSelector(selectForgetStep);
  const { token } = useParams();
  const dispatch = useDispatch();

  const StepComponent = stepComponents[step] || Step1;

  useEffect(() => {
    if (token) {
      dispatch(setForgetStep('stepThree'));
    }
  }, [dispatch, token]);

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

export default Forget;
