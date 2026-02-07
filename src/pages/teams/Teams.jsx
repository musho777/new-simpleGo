import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSingleBranch } from 'features/branches/branchesActions';
import { getDistricts } from 'features/regions/regionsActions';
import { getHeads } from 'features/teams/teamsActions';
import {
  selectCreateTeamSuccess,
  selectCreatedTeamName,
  selectDeletedTeam,
  selectDisable,
  selectEnableSuccess,
  selectEnabledTeam,
  selectError,
} from 'features/teams/teamsSlice';

import Success from '../components/success';
import TeamsView from './TeamsView';

const Teams = () => {
  const isSubmitted = useSelector(selectCreateTeamSuccess);
  const dispatch = useDispatch();
  const showDisableSuccess = useSelector(selectDisable);
  const showEnableSuccess = useSelector(selectEnableSuccess);
  const deletedTeamInfo = useSelector(selectDeletedTeam);
  const enabledTeamInfo = useSelector(selectEnabledTeam);
  const error = useSelector(selectError);
  const teamName = useSelector(selectCreatedTeamName);

  const { uuid } = useParams();

  const truncate = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  useEffect(() => {
    if (uuid) {
      dispatch(getSingleBranch(uuid));
    } else {
      // dispatch(getTeams({ branchId: uuid, limit: 10, offset: 0 }));
    }
    dispatch(getHeads());
    dispatch(getDistricts());
  }, [dispatch]);

  if (showEnableSuccess && !error) {
    return (
      <Success
        title={`Your "${truncate(enabledTeamInfo, 25)}" was enabled`}
        description={`Your "${truncate(enabledTeamInfo, 25)}" was enabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
        buttonText="Ok, thanks"
        route={`/departments/branches/teams/${uuid}`}
      />
    );
  }

  if (showDisableSuccess && !error) {
    return (
      <Success
        title={`Your "${truncate(deletedTeamInfo, 25)}" was disabled`}
        description={`Your "${truncate(deletedTeamInfo, 25)}" was disabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
        buttonText="Ok, thanks"
        route={`/departments/branches/teams/${uuid}`}
      />
    );
  }

  if (isSubmitted && !error) {
    return (
      <Success
        title={`Your ${truncate(teamName, 25)}  team request has been sent!`}
        description={`Your ${truncate(teamName, 25)} team is pending now! It will be approved by department head. After all, you will get a notification and your team will be Active.`}
        buttonText="Ok, thanks"
        route={`/departments/branches/teams/${uuid}`}
      />
    );
  }

  return <TeamsView />;
};

export default Teams;
