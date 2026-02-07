import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import { deleteUsers, enableUsers } from 'features/users/usersActions';
import { selectUserId } from 'features/users/usersSlice';

import { ButtonWrapper, Content, Description, Icon, Title } from './Disable.styles';
import DisableIcon from './icon.svg';

const Disable = ({ title, description, buttonText, onClose, type }) => {
  const dispatch = useDispatch();
  const uuid = useSelector(selectUserId);
  const userType = localStorage.getItem('userType');

  const onConfirm = () => {
    type === 'disable' && dispatch(deleteUsers({ uuid, userType }));
    type === 'enable' && dispatch(enableUsers({ uuid, userType }));
    onClose();
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
