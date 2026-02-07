import SuccessIcon from 'assets/authAssets/success.svg';
import Button from 'common-ui/button';

import { Content, Description, Icon, SuccessContainer, Title } from './ModalSuccess.styles';

const ModalSuccess = ({
  title,
  description,
  buttonText = 'Ok, thanks',
  onClose,
  height = '433px',
}) => {
  const handleOnOk = () => {
    if (onClose) onClose();
  };

  return (
    <SuccessContainer>
      <Content $height={height}>
        <Icon alt="success icon" src={SuccessIcon} />
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Button primary onClick={handleOnOk}>
          {buttonText}
        </Button>
      </Content>
    </SuccessContainer>
  );
};

export default ModalSuccess;
