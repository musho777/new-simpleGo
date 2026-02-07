import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import { deleteDepartment, enableDepartment } from 'features/departments/departmentsActions';
import {
  selectDeletedDep,
  selectDepId,
  selectEnabledDep,
} from 'features/departments/departmentsSlice';

import { ButtonWrapper, Content, Description, Icon, Title } from './Disable.styles';
import DisableIcon from './icon.svg';

const Disable = ({ title, description, buttonText, onClose }) => {
  const dispatch = useDispatch();
  const id = useSelector(selectDepId);
  const deleted = useSelector(selectDeletedDep);
  const enabled = useSelector(selectEnabledDep);

  const onConfirm = () => {
    deleted && dispatch(deleteDepartment(id));
    enabled && dispatch(enableDepartment(id));
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
