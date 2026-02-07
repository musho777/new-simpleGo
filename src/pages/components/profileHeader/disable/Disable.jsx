import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';
import { deleteUsers } from 'features/users/usersActions';
import { setDisabledUser } from 'features/users/usersSlice';

import { ButtonWrapper, Content, Description, Icon, Title } from './Disable.styles';
import DisableIcon from './icon.svg';

const Disable = ({ title, description, buttonText, onClose, id, name }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userType = localStorage.getItem('userType');
  const onConfirm = () => {
    dispatch(setDisabledUser(name));
    dispatch(deleteUsers({ uuid: id, userType }));
    navigation('/user-management');
  };

  return (
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
  );
};

export default Disable;
