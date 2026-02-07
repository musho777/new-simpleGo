import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  getAdditionalInfo,
  getUserProfileInfo,
  getUserProfileInfoChangesById,
  getUserProfileInfoView,
} from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectError,
  selectLoading,
  setResetUserInfo,
} from 'features/profile/profileSlice';
import AboutSidebar from 'pages/components/aboutSidebar';
import Navigation from 'pages/components/navigation';
import ProfileHeader from 'pages/components/profileHeader';
import ProfileInfo from 'pages/profile/profileInfo';

import {
  ButtonWrapper,
  Column,
  Container,
  Content,
  ModalContent,
  ModalText,
  ModalTitle,
  PersonalInventoryWrapper,
  Row,
} from './ProfileLayout.styles';

const ProfileLayout = ({ children }) => {
  const userType = localStorage.getItem('userType');
  const additionalInfo = useSelector(selectAdditionalInfo);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { pathname } = useLocation();
  const location = useLocation();
  const fromRef = useRef('');
  const userInfo = useSelector(selectUserInfo);

  const { uuid } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDisabledModal, setShowDisabledModal] = useState(false);

  const fullAccess =
    (userType === 'Super Admin' && additionalInfo.isSuper === true) ||
    (userType === 'Hr Manager' && additionalInfo.isSuper === false);

  const handleExitEdit = () => {
    if (pathname === `/profile/additional-info/edit/${uuid}`) {
      navigate(`/profile/contacts/${uuid}`);
    } else if (pathname.includes('/personal-info/edit')) {
      navigate(uuid ? `/profile/contacts/${uuid}` : `/profile/contacts`);
    } else {
      const updatedPath = pathname.replace('/edit', '');
      navigate(updatedPath);
    }
  };

  useEffect(() => {
    localStorage.setItem('fullAccess', fullAccess);
  }, [isLoading]);

  useEffect(() => {
    setShowDisabledModal(false);
    if (!fullAccess && uuid) {
      dispatch(getUserProfileInfoView(uuid));
      dispatch(getAdditionalInfo(uuid));
      return;
    }
    if (uuid) {
      dispatch(getUserProfileInfoChangesById(uuid));
      dispatch(getAdditionalInfo(uuid));
      dispatch(getUserProfileInfo(uuid));
    } else {
      dispatch(getUserProfileInfo());
      dispatch(getAdditionalInfo());
    }

    if (!uuid) {
      localStorage.removeItem('role');
    }
  }, [pathname, uuid, dispatch, fullAccess]);

  const isPersonalInfoTab = pathname.includes('/contacts');

  const handleClickBackToTickets = () => {
    navigate(-1);
  };
  const handleCloseDisabledModal = () => {
    setShowDisabledModal(false);
    navigate(-1);
  };

  useEffect(() => {
    if (location.state?.from) {
      fromRef.current = location.state.from;
    }
  }, [location.state?.from]);

  useEffect(() => {
    if (error === 'User not found') {
      setShowDisabledModal(true);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      setShowDisabledModal(false);
      dispatch(setResetUserInfo());
    };
  }, []);

  return (
    <Container>
      <ProfileHeader />
      {fromRef.current.startsWith('/project-management/tickets') && (
        <ButtonWrapper>
          <Button onClick={handleClickBackToTickets}>{'< Back'}</Button>
        </ButtonWrapper>
      )}

      {uuid &&
        (userInfo.email === 'anjela.ohanyan@fnet.am' ||
          userInfo.email === 'alisa.gazaryan@fnet.am' ||
          userInfo.email === 'silva.achemyan@fnet.am' ||
          userType === 'Super Admin' ||
          userType === 'General Manager') && (
          <PersonalInventoryWrapper>
            <Button
              secondary
              onClick={() =>
                navigate(
                  `/personal/inventory/${uuid}?limit=10&offset=0&usage=Personal+use&view=list`
                )
              }
            >
              Personal Inventory
            </Button>
          </PersonalInventoryWrapper>
        )}

      {pathname.includes('edit') ? (
        <>
          <Button outlined className="back-button" onClick={handleExitEdit}>
            <span>{'<'}</span> Back to profile
          </Button>

          <Content>
            <Row>
              <AboutSidebar />
              <Column>{children}</Column>
            </Row>
          </Content>
        </>
      ) : (
        <Content>
          <Column>
            {!pathname.includes('inventory') && <Navigation />}
            {children}
          </Column>
          {isPersonalInfoTab && <ProfileInfo />}
        </Content>
      )}

      <Modal
        isOpen={showDisabledModal}
        onClose={handleCloseDisabledModal}
        width="500px"
        centered
      >
        <ModalContent>
          <ModalTitle>User Disabled</ModalTitle>
          <ModalText>
            This user account has been disabled and is no longer accessible.
          </ModalText>
          <Button primary onClick={handleCloseDisabledModal}>
            Go Back
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ProfileLayout;
