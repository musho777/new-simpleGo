import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import disable from 'assets/view-hide.svg';
import enable from 'assets/view.svg';
import Modal from 'common-ui/modal';
import { SYSTEM_USERS, USERS } from 'constants/constants';
import {
  selectUsers,
  setDisabledUser,
  setEnabledUser,
  setUserId,
} from 'features/users/usersSlice';

import { Container, Dropdown, Icon, Option } from './Actions.styles';
import more from './assets/more.svg';
import view from './assets/view.svg';
import Disable from './disable';

const Actions = ({ id, role, row: user, isMobile = false, iconClassName, grid = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roleForLocalStorage, setRoleForLocalStorage] = useState(null);
  const users = useSelector(selectUsers);
  const [modalType, setModalType] = useState(null);
  const userType = localStorage.getItem('userType');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSystemUsers = SYSTEM_USERS.includes(role) && userType === 'Super Admin';
  const isUsers = USERS.includes(role) && userType === 'Hr Manager';

  const getUserNameById = (id) => {
    const user = users.find((item) => item.uuid === id);
    return user ? user.name : 'Unknown Branch';
  };

  const handleNavigateProfile = () => {
    navigate(`/profile/contacts/${id}`);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setRoleForLocalStorage(role);
    setIsOpen((prev) => !prev);
  };
  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleClickDisable = () => {
    dispatch(setUserId(id));
    dispatch(setDisabledUser(getUserNameById(id)));
    setModalType('disable');
  };

  const handleClickEnable = () => {
    dispatch(setUserId(id));
    dispatch(setEnabledUser(getUserNameById(id)));
    setModalType('enable');
  };

  useEffect(() => {
    localStorage.setItem('role', roleForLocalStorage);
  }, [roleForLocalStorage]);

  const truncateName = (name, maxLength = 15) => {
    if (!name) return '';
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  return (
    <Container
      className="container"
      $isOpen={isOpen && !isMobile}
      $relative={isOpen}
      $isMobile={isMobile}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {!isMobile && <Icon src={more} alt="more options" className={iconClassName} />}
      {isOpen && !isMobile && (
        <Dropdown className="dropdown" $grid={grid}>
          {(isSystemUsers || isUsers) &&
            (user.deletedAt === null ? (
              <Option onClick={handleClickDisable}>
                <Icon src={disable} alt="Disable" />
                Disable
              </Option>
            ) : (
              <Option onClick={handleClickEnable}>
                <Icon src={enable} alt="Enable" />
                Enable
              </Option>
            ))}
          {user.deletedAt === null && (
            <Option onClick={handleNavigateProfile}>
              <Icon src={view} alt="e" />
              View
            </Option>
          )}
        </Dropdown>
      )}
      {isMobile && (
        <>
          {(isSystemUsers || isUsers) &&
            (user.deletedAt === null ? (
              <Icon onClick={handleClickDisable} src={disable} alt="Disable" />
            ) : (
              <Icon onClick={handleClickEnable} src={enable} alt="Enable" />
            ))}
        </>
      )}
      <Modal isOpen={modalType !== null} onClose={handleCloseModal} width="410px">
        {modalType === 'disable' && (
          <Disable
            title={`Are you sure you want to disable this ${truncateName(getUserNameById(id))}?`}
            description={`Hiding this ${truncateName(getUserNameById(id))} will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
            buttonText="Yes, Hide"
            onClose={handleCloseModal}
            id={id}
            type={modalType}
          />
        )}
        {modalType === 'enable' && (
          <Disable
            title={`was enabled. It will remain  ${truncateName(getUserNameById(id))}?`}
            description={`Hiding this ${truncateName(getUserNameById(id))} will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
            buttonText="Yes, Enable"
            onClose={handleCloseModal}
            id={id}
            type={modalType}
          />
        )}
      </Modal>
    </Container>
  );
};

export default Actions;
