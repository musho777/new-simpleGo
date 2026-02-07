import { memo, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { setDisableBranch, setEnableBranch } from 'features/branches/branchesSlice';
import {
  setDisableDepartment,
  setEnableDepartment,
} from 'features/departments/departmentsSlice';
import { setDisableTeam, setEnableTeam } from 'features/teams/teamsSlice';

import Disable from '../disable';
import Success from '../success';
import {
  Container,
  DisableWrapper,
  DropdownButton,
  Icon,
  Menu,
  MenuItem,
  Overlay,
} from './ActionsDropdown.styles';
import edit from './edit.svg';
import { EntityType } from './enum';
import hide from './hide.svg';
import more from './more.svg';
import view from './view.svg';

const ActionsDropdown = ({ status, name, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleToggleDropdown = () => {
    if (!isOpen) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX - 30,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsOpen(false);
  };

  const handleDisableClick = () => {
    setIsOpen(false);
    setShowDisableModal(true);
  };

  const handleDisableConfirm = () => {
    setShowDisableModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseDisable = () => {
    setShowDisableModal(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);

    switch (type) {
      case EntityType.DEPARTMENT:
        status === null
          ? dispatch(setDisableDepartment(true))
          : dispatch(setEnableDepartment(true));
        break;
      case EntityType.BRANCH:
        status === null ? dispatch(setDisableBranch(true)) : dispatch(setEnableBranch(true));
        break;
      case EntityType.TEAM:
        status === null ? dispatch(setDisableTeam(true)) : dispatch(setEnableTeam(true));
        break;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const getRoute = () => {
    switch (type) {
      case EntityType.DEPARTMENT:
        return '/departments';
      case EntityType.BRANCH:
        return '/departments/branches';
      case EntityType.TEAM:
        return '/departments/branches/teams';
      default:
        return '/departments';
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={dropdownRef}>
      <DropdownButton
        onClick={handleToggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Icon src={more} alt="More options" />
      </DropdownButton>
      {isOpen &&
        createPortal(
          <Menu style={{ top: position.top, left: position.left }}>
            <MenuItem onClick={handleEditClick}>
              <Icon src={edit} alt="Edit" /> Edit
            </MenuItem>
            <MenuItem onClick={handleDisableClick}>
              <Icon src={status === null ? hide : view} alt="Disable" />
              {status === null ? 'Disable' : 'Enable'}
            </MenuItem>
          </Menu>,
          document.body
        )}

      {showDisableModal &&
        createPortal(
          <DisableWrapper
            style={{
              top: '50%',
              left: '50%',
            }}
          >
            <Overlay>
              <Disable
                title={`Are you sure you want to disable this  "${name}" ?`}
                description={`Hiding this "${name}" will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
                buttonText="Yes, Hide"
                onConfirm={handleDisableConfirm}
                onClose={handleCloseDisable}
              />
            </Overlay>
          </DisableWrapper>,
          document.body
        )}

      {showSuccessModal &&
        createPortal(
          <DisableWrapper
            style={{
              top: '50%',
              left: '50%',
            }}
          >
            <Overlay>
              <Success
                title={`Your "${name}" was disabled`}
                description={`Your "${name}" was disabled. It will remain on the list for one month before being moved to the 'Hidden Data' album in the settings section.`}
                buttonText="Ok, thanks"
                route={getRoute()}
                onClose={handleCloseSuccess}
              />
            </Overlay>
          </DisableWrapper>,
          document.body
        )}
    </Container>
  );
};

export default memo(ActionsDropdown);
