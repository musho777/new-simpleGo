import { useNavigate } from 'react-router-dom';

import SuccessIcon from 'assets/authAssets/success.svg';
import Button from 'common-ui/button';

import { Description, Icon, SuccessContainer, Title } from '../Auth.styles';
import { Content } from './Register.styles';

const Step4 = () => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate('/login');
  };

  return (
    <SuccessContainer>
      <Content>
        <Icon alt="success icon" src={SuccessIcon} />
        <Title>Congratulations!</Title>
        <Description>Your profile was successfully created!</Description>
        <Button primary onClick={handleNavigateLogin}>
          Go to the login
        </Button>
      </Content>
    </SuccessContainer>
  );
};

export default Step4;
