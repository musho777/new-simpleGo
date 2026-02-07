import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import editMobile from 'assets/edit.svg';
import viewHide from 'assets/view-hide.svg';
import view from 'assets/view.svg';
import Modal from 'common-ui/modal';
import {
  selectBranches,
  setBranchId,
  setDeletedBranch,
  setEnabledBranch,
} from 'features/branches/branchesSlice';
import { ActionIcon, MobileActions } from 'pages/userManagement/UserManagement.styles';

import { Container, Dropdown, Icon, Option } from './Actions.styles';
import EditBranchModal from './EditBranchModal';
import edit from './assets/edit.svg';
import enable from './assets/enable.svg';
import more from './assets/more.svg';
import Disable from './disable';

const Actions = ({ id, hideTrigger, disabled }) => {
  const branches = useSelector(selectBranches);
  const branch = branches.find((item) => item.uuid === id);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(null);
  const [modalType, setModalType] = useState(null);

  const getBranchNameById = (id) => {
    const branch = branches.find((item) => item.uuid === id);
    return branch ? branch.name : 'Unknown Branch';
  };

  const handleClickDisable = () => {
    dispatch(setBranchId(id));
    dispatch(setDeletedBranch(getBranchNameById(id)));
    setModalType('disable');
  };

  const handleClickEnable = () => {
    dispatch(setBranchId(id));
    dispatch(setEnabledBranch(getBranchNameById(id)));
    setModalType('enable');
  };

  const handleClickEnableDisable = () => {
    disabled ? handleClickEnable() : handleClickDisable();
  };

  const handleCloseModal = () => {
    setModalType(null);
    setIsOpen(null);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(isOpen ? null : id);
  };

  const handleClickEdit = () => {
    setIsOpen(null);
    setModalType('edit');
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
              {branch.deletedAt === null && (
                <Option onClick={handleClickEdit}>
                  <Icon src={edit} alt="Edit" />
                  Edit
                </Option>
              )}
              {branch.deletedAt === null ? (
                <Option onClick={handleClickDisable}>
                  <Icon src={enable} alt="Disable" />
                  Disable
                </Option>
              ) : (
                <Option onClick={handleClickEnable}>
                  <Icon src={enable} alt="Enable" />
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
            title={`Are you sure you want to disable this ${truncate(getBranchNameById(id), 20)}?`}
            description={`Hiding this ${truncate(getBranchNameById(id), 20)} will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
            buttonText="Yes, Hide"
            onClose={handleCloseModal}
            id={id}
          />
        )}
        {modalType === 'enable' && (
          <Disable
            title={`Are you sure you want to enable this ${truncate(getBranchNameById(id), 20)}?`}
            description={`Hiding this ${truncate(getBranchNameById(id), 20)} will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
            buttonText="Yes, Enable"
            onClose={handleCloseModal}
            id={id}
          />
        )}
      </Modal>
      <EditBranchModal isOpen={modalType === 'edit'} id={id} onClose={handleCloseModal} />
    </Container>
  );
};

export default Actions;
