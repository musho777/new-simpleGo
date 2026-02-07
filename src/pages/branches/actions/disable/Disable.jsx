import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import { deleteBranch, enableBranch } from 'features/branches/branchesActions';
import {
  selectBranchId,
  selectDeletedBranch,
  selectEnabledBranch,
} from 'features/branches/branchesSlice';

import { ButtonWrapper, Content, Description, Icon, Title } from './Disable.styles';
import DisableIcon from './icon.svg';

const Disable = ({ title, description, buttonText, onClose }) => {
  const dispatch = useDispatch();
  const id = useSelector(selectBranchId);
  const deleted = useSelector(selectDeletedBranch);
  const enabled = useSelector(selectEnabledBranch);

  const onConfirm = () => {
    deleted && dispatch(deleteBranch(id));
    enabled && dispatch(enableBranch(id));
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
