import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SuccessIcon from 'assets/authAssets/success.svg';
import Button from 'common-ui/button';
import { setForgetStep } from 'features/auth/authSlice';

import { Description, Icon, SuccessContainer, Title } from '../Auth.styles';
import { Content } from '../register/Register.styles';

const Step4 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginNavigate = () => {
    navigate('/login');
    dispatch(setForgetStep('stepOne'));
  };

  return (
    <SuccessContainer>
      <Content>
        <Icon alt="succes" src={SuccessIcon} />
        <Title>Congratulations!</Title>
        <Description>
          Your password was successfully changed! Sign In and continue your journey with us.
        </Description>
        <Button primary onClick={handleLoginNavigate}>
          Go to Sign In
        </Button>
      </Content>
    </SuccessContainer>
  );
};

export default Step4;
