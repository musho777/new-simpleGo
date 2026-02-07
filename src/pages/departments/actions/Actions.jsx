import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import editMobile from 'assets/edit.svg';
import viewHide from 'assets/view-hide.svg';
import view from 'assets/view.svg';
import Modal from 'common-ui/modal';
import {
  selectDepartments,
  setDeletedDep,
  setDepId,
  setEnabledDep,
} from 'features/departments/departmentsSlice';
import { ActionIcon, MobileActions } from 'pages/userManagement/UserManagement.styles';

import { Container, Dropdown, Icon, Option } from './Actions.styles';
import EditDepartmentModal from './EditDepartmentModal';
import disabledFull from './assets/disable.svg';
import edit from './assets/edit.svg';
import enabled from './assets/enable.svg';
import more from './assets/more.svg';
import Disable from './disable';

const Actions = ({ id, hideTrigger, disabled }) => {
  const departments = useSelector(selectDepartments);
  const department = departments.find((item) => item.uuid === id);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(null);
  const [modalType, setModalType] = useState(null);

  const getDepartmentNameById = (id) => {
    const department = departments.find((item) => item.uuid === id);
    return department ? department.name : 'Unknown Department';
  };

  const handleClickDisable = () => {
    dispatch(setDepId(id));
    dispatch(setDeletedDep(getDepartmentNameById(id)));
    setModalType('disable');
    setIsOpen(null);
  };

  const handleClickEnable = () => {
    dispatch(setDepId(id));
    dispatch(setEnabledDep(getDepartmentNameById(id)));
    setModalType('enable');
    setIsOpen(null);
  };

  const handleClickEnableDisable = () => {
    disabled ? handleClickEnable() : handleClickDisable();
  };

  const handleClickEdit = () => {
    setIsOpen(null);
    setModalType('edit');
  };

  const handleCloseModal = () => {
    setModalType(null);
    setIsOpen(null);
  };

  const toggleDropdown = (event) => {
    if (!hideTrigger) {
      event.stopPropagation();
      setIsOpen(isOpen ? null : id);
    }
  };

  const truncate = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Container
      className="container"
      $isOpen={!modalType && isOpen && !hideTrigger}
      $relative={isOpen}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {!hideTrigger ? (
        <>
          <Icon src={more} alt="more options" onClick={toggleDropdown} />
          {isOpen && !modalType && (
            <Dropdown className="dropdown">
              <Option onClick={handleClickEdit}>
                <Icon src={edit} alt="Edit" />
                Edit
              </Option>
              {department.deletedAt === null ? (
                <Option onClick={handleClickDisable}>
                  <Icon src={enabled} alt="Disable" />
                  Disable
                </Option>
              ) : (
                <Option onClick={handleClickEnable}>
                  <Icon src={disabledFull} alt="Enable" />
                  Enable
                </Option>
              )}
            </Dropdown>
          )}
        </>
      ) : (
        <MobileActions>
          <div onClick={handleClickEnableDisable}>
            <ActionIcon src={disabled ? view : viewHide} />
          </div>
          <div onClick={handleClickEdit}>
            <ActionIcon src={editMobile} />
          </div>
        </MobileActions>
      )}

      <Modal isOpen={modalType !== null} onClose={handleCloseModal} width="410px">
        {modalType === 'disable' && (
          <Disable
            title={`Are you sure you want to disable this ${truncate(getDepartmentNameById(id), 20)}?`}
            description={`Hiding this ${truncate(getDepartmentNameById(id), 20)} will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
            buttonText="Yes, Hide"
            onClose={handleCloseModal}
            id={id}
          />
        )}
        {modalType === 'enable' && (
          <Disable
            title={`Are you sure you want to enable this ${truncate(getDepartmentNameById(id), 20)}?`}
            description={`Hiding this ${truncate(getDepartmentNameById(id), 20)} will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
            buttonText="Yes, Enable"
            onClose={handleCloseModal}
            id={id}
          />
        )}
      </Modal>

      <EditDepartmentModal isOpen={modalType === 'edit'} id={id} onClose={handleCloseModal} />
    </Container>
  );
};

export default Actions;
