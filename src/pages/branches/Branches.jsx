import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  //  getBranches,
  getHeads,
} from 'features/branches/branchesActions';
import {
  selectCreateBranchSuccess,
  selectDeletedBranch,
  selectDisable,
  selectEnableSuccess,
  selectEnabledBranch,
  selectError,
  setNewBranchDepId,
} from 'features/branches/branchesSlice';
import { getSingleDepartment } from 'features/departments/departmentsActions';
import { getRegions } from 'features/regions/regionsActions';

import Success from '../components/success';
import BranchesView from './BranchesView';

const Branches = () => {
  const isSubmitted = useSelector(selectCreateBranchSuccess);
  const showDisableSuccess = useSelector(selectDisable);
  const showEnableSuccess = useSelector(selectEnableSuccess);
  const deletedBranchInfo = useSelector(selectDeletedBranch);
  const enabledBranchInfo = useSelector(selectEnabledBranch);
  const id = localStorage.getItem('newBranchDepUuid');
  const { uuid } = useParams();

  const dispatch = useDispatch();

  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(setNewBranchDepId(uuid));
    localStorage.setItem('newBranchDepUuid', uuid);

    dispatch(getHeads());
    if (uuid) {
      dispatch(getSingleDepartment(uuid));
    }
    // dispatch(getBranches({ departmentId: uuid, limit: 10, offset: 0 }));
    dispatch(getRegions());
  }, [dispatch]);

  const truncate = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  if (showEnableSuccess && !error) {
    return (
      <Success
        title={`Your "${truncate(enabledBranchInfo, 25)}" was enabled`}
        description={`Your "${truncate(enabledBranchInfo, 25)}" was enabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
        buttonText="Ok, thanks"
        route={`/departments/branches/${id}`}
      />
    );
  }

  if (showDisableSuccess && !error) {
    return (
      <Success
        title={`Your "${truncate(deletedBranchInfo, 25)}" was disabled`}
        description={`Your "${truncate(deletedBranchInfo, 25)}" was disabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
        buttonText="Ok, thanks"
        route={`/departments/branches/${id}`}
      />
    );
  }
  if (isSubmitted && !error) {
    return (
      <Success
        title="Your branch request has been sent!"
        description="You successfully created new branch. Now you can add members and work efficiently!"
        buttonText="Ok, thanks"
        route={`/departments/branches/${id}`}
      />
    );
  }

  return <BranchesView />;
};

export default Branches;
