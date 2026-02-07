import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import { deleteTeam, enableTeam } from 'features/teams/teamsActions';
import { selectDeletedTeam, selectEnabledTeam, selectTeamId } from 'features/teams/teamsSlice';

import { ButtonWrapper, Content, Description, Icon, Title } from './Disable.styles';
import DisableIcon from './icon.svg';

const Disable = ({ title, description, buttonText, onClose }) => {
  const dispatch = useDispatch();
  const id = useSelector(selectTeamId);
  const deleted = useSelector(selectDeletedTeam);
  const enabled = useSelector(selectEnabledTeam);

  const onConfirm = () => {
    deleted && dispatch(deleteTeam(id));
    enabled && dispatch(enableTeam(id));
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
