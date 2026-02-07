import { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Modal from 'common-ui/modal';
import { selectUserInfo } from 'features/auth/authSlice';
import { getFilterRoles, getRoles, getUsers } from 'features/users/usersActions';
import {
  resetUserSuccess,
  selectCreateUserSuccess,
  selectDisable,
  selectEnableSuccess,
  selectEnabledUser,
  selectError,
  selectNewInvitedEmail,
  setCreateUserStateStatus,
  setDisableSuccess,
  setEnableSuccess,
} from 'features/users/usersSlice';

import ModalSuccess from './ModalSuccess';
import UsersView from './UsersView';
import { useUserSearchParams } from './useSearchData';

const UserManagement = () => {
  const dispatch = useDispatch();
  const isSubmitted = useSelector(selectCreateUserSuccess);
  const error = useSelector(selectError);
  const user = useSelector(selectUserInfo);
  const showDisableSuccess = useSelector(selectDisable);
  const showEnableSuccess = useSelector(selectEnableSuccess);
  const enabledUserInfo = useSelector(selectEnabledUser);
  const newInvitedEmail = useSelector(selectNewInvitedEmail);
  const { searchData } = useUserSearchParams();

  const isSuperUser = useMemo(() => user?.userType === 'Super Admin', [user]);

  useEffect(() => {
    isSuperUser
      ? dispatch(getRoles({ isSuperUser, isDefault: true }))
      : dispatch(getRoles({ isSuperUser: false, isDefault: true }));
    dispatch(getFilterRoles());
  }, [dispatch, isSuperUser]);

  const truncateName = (name, maxLength = 15) => {
    if (!name) return '';
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  const handleCloseModal = () => {
    dispatch(resetUserSuccess());
    dispatch(setCreateUserStateStatus(false));
    dispatch(setEnableSuccess(false));
    dispatch(setDisableSuccess(false));
    dispatch(getUsers(searchData));
  };

  return (
    <>
      <UsersView />

      <Modal
        isOpen={showEnableSuccess && !error}
        onClose={handleCloseModal}
        width="450px"
        centered
        closeIcon
      >
        <ModalSuccess
          title={`Your "${truncateName(enabledUserInfo)}" was enabled`}
          description={`Your "${truncateName(enabledUserInfo)}" was enabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
          buttonText="Ok, thanks"
          onClose={handleCloseModal}
        />
      </Modal>

      <Modal
        isOpen={showDisableSuccess && !error}
        onClose={handleCloseModal}
        width="450px"
        centered
        closeIcon
      >
        <ModalSuccess
          title={`Your "${truncateName(enabledUserInfo)}" was disabled`}
          description={`Your "${truncateName(enabledUserInfo)}" was disabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
          buttonText="Ok, thanks"
          onClose={handleCloseModal}
        />
      </Modal>

      <Modal
        isOpen={isSubmitted && !error}
        onClose={handleCloseModal}
        width="450px"
        centered
        closeIcon
      >
        <ModalSuccess
          title="Thank you!"
          description={`We've sent an invitation email to ${newInvitedEmail}. Please inform the user to check their inbox (spam/junk folder) for the email containing the link to set up their account. Once they complete their account setup, they will have access to the CRM`}
          buttonText="Ok, thanks"
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default UserManagement;
