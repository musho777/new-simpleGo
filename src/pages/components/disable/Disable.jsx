import Button from 'common-ui/button';

import {
  ButtonWrapper,
  Content,
  Description,
  DisableContainer,
  Icon,
  Title,
} from './Disable.styles';
import DisableIcon from './icon.svg';

const Disable = ({ title, description, buttonText, onConfirm, onClose }) => {
  return (
    <DisableContainer>
      <Content>
        <Icon alt="disable icon" src={DisableIcon} />
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonWrapper>
          <Button width="148" outlined onClick={onClose}>
            Cancel
          </Button>
          <Button width="148" primary onClick={onConfirm}>
            {buttonText}
          </Button>
        </ButtonWrapper>
      </Content>
    </DisableContainer>
  );
};

export default Disable;
