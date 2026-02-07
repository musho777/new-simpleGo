import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getHeads } from 'features/departments/departmentsActions';
import {
  selectDeletedDep,
  selectDisable,
  selectEnableSuccess,
  selectEnabledDep,
  selectError,
  selectHeads,
} from 'features/departments/departmentsSlice';
import Success from 'pages/components/success';

import DepartmentsView from './DepartmentsView';

const truncateText = (text, maxLength = 20) =>
  text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;

const Departments = () => {
  const heads = useSelector(selectHeads);
  const error = useSelector(selectError);
  const showDisableSuccess = useSelector(selectDisable);
  const showEnableSuccess = useSelector(selectEnableSuccess);
  const deletedDepInfo = useSelector(selectDeletedDep);
  const enabledDepInfo = useSelector(selectEnabledDep);
  const location = useLocation();
  const fullPath = location.pathname + location.search;
  const dispatch = useDispatch();

  useEffect(() => {
    if (heads.length === 0) dispatch(getHeads());
  }, [dispatch, heads.length]);

  if (showEnableSuccess && !error) {
    return (
      <Success
        title={`Your "${truncateText(enabledDepInfo)}" was enabled`}
        description={`Your "${truncateText(enabledDepInfo)}" was enabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
        buttonText="Ok, thanks"
        route={fullPath}
      />
    );
  }

  if (showDisableSuccess && !error) {
    return (
      <Success
        title={`Your "${truncateText(deletedDepInfo)}" was disabled`}
        description={`Your "${truncateText(deletedDepInfo)}" was disabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
        buttonText="Ok, thanks"
        route={fullPath}
      />
    );
  }

  // if (isSubmitted && !error) {
  //   return (
  //     <Success
  //       title="Thank you!"
  //       description="We’ve sent an invitation email to karapetkarapetyan@gmail.com. Please inform the user to check their inbox (spam/junk folder) for the email containing the link to set up their account. Once they complete their account setup, they will have access to the CRM"
  //       buttonText="Ok, thanks"
  //       route="/departments"
  //     />
  //   );
  // }

  return <DepartmentsView />;
};

export default Departments;
