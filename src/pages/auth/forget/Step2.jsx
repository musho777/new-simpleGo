import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MailIcon from 'assets/authAssets/mail.svg';
import Button from 'common-ui/button';
import { selectForgetEmail, setForgetEmail, setForgetStep } from 'features/auth/authSlice';

import { Description, Icon, SuccessContainer, Title } from '../Auth.styles';
import { Content } from './Forget.styles';

const Step2 = () => {
  const email = useSelector(selectForgetEmail);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
    dispatch(setForgetStep('stepOne'));
    dispatch(setForgetEmail(''));
  };

  return (
    <SuccessContainer>
      <Content>
        <Icon alt="mail icon" src={MailIcon} />
        <Title>Thank you!</Title>
        <Description>
          We’ve sent an invitation email to {email}. Please inform the user to check their
          inbox (spam/junk folder) for the email containing the link to set up their account.
          Once they complete their account setup, they will have access to the CRM.
        </Description>
        <Button primary onClick={handleNavigate}>
          Go to Log In
        </Button>
      </Content>
    </SuccessContainer>
  );
};

export default Step2;
