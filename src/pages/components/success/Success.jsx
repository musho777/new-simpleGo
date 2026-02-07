import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import SuccessIcon from 'assets/authAssets/success.svg';
import Button from 'common-ui/button';
import { getBranches } from 'features/branches/branchesActions';
import {
  setBranchId,
  setCreateBranchStateStatus,
  setDeletedBranch,
  setDeletedBranchSuccess,
  setEnabledBranch,
  setEnabledBranchSuccess,
} from 'features/branches/branchesSlice';
import { getDepartments } from 'features/departments/departmentsActions';
import {
  setCreateDepartmentStateStatus,
  setDeletedDep,
  setDeletedDepartmentSuccess,
  setDepId,
  setEnabledDep,
  setEnabledDepartmentSuccess,
} from 'features/departments/departmentsSlice';
import { getTeams } from 'features/teams/teamsActions';
import {
  setCreateTeamStateStatus,
  setDeletedTeam,
  setDeletedTeamSuccess,
  setEnabledTeam,
  setEnabledTeamSuccess,
  setTeamId,
} from 'features/teams/teamsSlice';
import { resetUserSuccess, setCreateUserStateStatus } from 'features/users/usersSlice';

import { Content, Description, Icon, SuccessContainer, Title } from './Success.styles';

const Success = ({ title, description, buttonText, route, onClose, height = ' 433px' }) => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDepartmentAction = () => {
    dispatch(setCreateDepartmentStateStatus(false));
    dispatch(setDeletedDepartmentSuccess(false));
    dispatch(setEnabledDepartmentSuccess(false));

    dispatch(setDepId(null));
    dispatch(setDeletedDep(null));
    dispatch(setEnabledDep(null));

    dispatch(getDepartments({ limit: 10, offset: 0 }));
    return;
  };

  const handleBranchAction = () => {
    dispatch(setCreateBranchStateStatus(false));
    dispatch(setDeletedBranchSuccess(false));
    dispatch(setEnabledBranchSuccess(false));
    dispatch(setBranchId(null));
    dispatch(setDeletedBranch(null));
    dispatch(setEnabledBranch(null));

    dispatch(getBranches({ limit: 10, offset: 0 }));
    return;
  };

  const handleTeamAction = () => {
    dispatch(setCreateTeamStateStatus(false));
    dispatch(setDeletedTeamSuccess(false));
    dispatch(setEnabledTeamSuccess(false));

    dispatch(setTeamId(null));
    dispatch(setDeletedTeam(null));
    dispatch(setEnabledTeam(null));

    dispatch(getTeams({ limit: 10, offset: 0 }));
    return;
  };

  const handleOnOk = () => {
    navigate(route ? route : '/login');

    route === '/user-management' && navigate(-1);
    route === `/departments/branches/teams/${uuid}` && handleTeamAction();
    route === `/departments/branches/${uuid}` && handleBranchAction();
    route?.startsWith('/departments') && handleDepartmentAction();

    dispatch(setCreateBranchStateStatus(false));
    dispatch(setCreateUserStateStatus(false));
    dispatch(setCreateTeamStateStatus(false));
    dispatch(setCreateDepartmentStateStatus(false));
    dispatch(resetUserSuccess());
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

export default Success;
