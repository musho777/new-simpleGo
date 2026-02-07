import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import {
  selectUserInviteStep,
  setUserInviteBody,
  setUserInviteStep,
} from 'features/users/usersSlice';

import Form1 from './Form1';
import Form2 from './Form2';
import { BtnWrapper, StyledText } from './UserManagement.styles';

const Create = () => {
  const dispatch = useDispatch();
  const step = useSelector(selectUserInviteStep);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');

  const handleOpenCreateUserModal = () => {
    setIsModalOpen(true);
    dispatch(setUserInviteStep(1));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setUserInviteBody({}));
  };

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 500 ? '370px' : '430px');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <BtnWrapper>
        <Button secondary onClick={handleOpenCreateUserModal}>
          + Add new user
        </Button>
      </BtnWrapper>
      <Modal
        isOpen={isModalOpen}
        title="Add user"
        width={modalWidth}
        onClose={handleCloseModal}
      >
        {step === 1 && (
          <StyledText>
            We will send an invitation to the provided Email address with the link to set up
            their profile and use CRM system.
          </StyledText>
        )}
        {step === 1 ? (
          <Form1 handleCloseModal={handleCloseModal} />
        ) : (
          <Form2 handleCloseModal={handleCloseModal} />
        )}
      </Modal>
    </>
  );
};

export default Create;
