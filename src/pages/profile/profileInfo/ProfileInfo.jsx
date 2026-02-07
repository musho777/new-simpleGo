import { Fragment, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { SYSTEM_USERS, USER_ADDITIONAL_INFO } from 'constants/constants';
import {
  selectAdditionalInfo,
  selectAdditionalInfoLoading,
} from 'features/profile/profileSlice';
import { getUserPrivileges } from 'features/users/usersActions';
import { selectUserPrivileges } from 'features/users/usersSlice';
import { isObjectEmpty } from 'utils';

import PrivilegeModal from './PrivilegeModal';
import {
  Container,
  EditIconWrapper,
  Icon,
  IconsWrapper,
  Item,
  LoadContainer,
  LoadingIcon,
  PrivilegeContainer,
  Title,
  TitleWrapper,
  Value,
} from './ProfileInfo.styles';
import down from './down.svg';
import edit from './edit.svg';
import loadingIcon from './loading.svg';
import up from './up.svg';

const ProfileInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPrivilegeModalOpen, setIsPrivilegeModalOpen] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(selectAdditionalInfo);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const loading = useSelector(selectAdditionalInfoLoading);
  const userPrivileges = useSelector(selectUserPrivileges);
  const userType = localStorage.getItem('userType');
  const { uuid } = useParams();
  const navigate = useNavigate();

  const showEdit =
    uuid &&
    ((userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper));

  const showPrivilegeEdit = userType === 'General Manager' && uuid;
  const profileData = () => {
    const showFallback = !loading && !isObjectEmpty(data);

    return [
      { title: 'Department', value: data.departments },
      { title: 'Branch', value: data.branches },
      { title: 'Team', value: data.teams },
      { title: 'Role', value: data.role },
      { title: 'Occupation', value: data.occupation },
      {
        title: 'Time zone',
        value: showFallback
          ? data.timezone
            ? `UTC at ${data.timezone?.name}`
            : 'Not specified'
          : null,
      },
      {
        title: 'Calendar of Holidays',
        value: showFallback ? (data.holidays ? data.holidays : 'Not specified') : null,
      },
      { title: 'Commissions', value: data.commission },
      {
        title: 'Office location',
        value: showFallback
          ? data.officeLocation
            ? USER_ADDITIONAL_INFO.officeLocation.find(
                (location) => location.value === additionalInfo?.officeLocation
              )?.label
            : 'Not specified'
          : null,
      },
    ];
  };

  const handleEditAdditionalInfoNavigate = () => {
    navigate(`/profile/additional-info/edit/${uuid}`);
  };

  const triggerInfo = () => {
    setIsOpen((prev) => !prev);
  };

  const handlePrivilegeModalOpen = () => {
    setIsPrivilegeModalOpen(true);
  };

  const handlePrivilegeModalClose = () => {
    setIsPrivilegeModalOpen(false);
  };

  useEffect(() => {
    if (uuid && [...SYSTEM_USERS, 'Super Admin'].includes(userType)) {
      dispatch(getUserPrivileges(uuid));
    }
  }, [uuid, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <TitleWrapper $hideBorder={isMobile && !isOpen}>
        Additional information
        <IconsWrapper>
          {showEdit && (
            <div onClick={handleEditAdditionalInfoNavigate}>
              <Icon src={edit} />
            </div>
          )}
          {isMobile && (
            <div onClick={triggerInfo}>
              <Icon src={isOpen ? up : down} />
            </div>
          )}
        </IconsWrapper>
      </TitleWrapper>
      {(!isMobile || (isMobile && isOpen)) && (
        <>
          {(!uuid || [...SYSTEM_USERS, 'Super Admin'].includes(userType)) &&
            (userPrivileges?.privileges?.[0]?.name ||
              [...SYSTEM_USERS, 'Super Admin'].includes(userType)) && (
              <Item>
                <Title>Privilege</Title>
                <PrivilegeContainer>
                  <Value>
                    {userPrivileges?.privileges?.[0]?.name || 'No privilege assigned'}
                  </Value>
                  {[...SYSTEM_USERS, 'Super Admin'].includes(userType) &&
                    showPrivilegeEdit && (
                      <EditIconWrapper onClick={handlePrivilegeModalOpen}>
                        <Icon src={edit} />
                      </EditIconWrapper>
                    )}
                </PrivilegeContainer>
              </Item>
            )}

          {profileData()?.map((item, index) => (
            <Fragment key={index}>
              {loading ? (
                <LoadContainer>
                  <LoadingIcon src={loadingIcon} alt="Loading..." />
                </LoadContainer>
              ) : (
                item.value &&
                (!Array.isArray(item.value) || item.value.length > 0) && (
                  <Item>
                    <Title>{item.title}</Title>
                    {Array.isArray(item.value) ? (
                      item.value.map((i, iIndex) => <Value key={iIndex}>{i}</Value>)
                    ) : (
                      <Value>{item.value}</Value>
                    )}
                  </Item>
                )
              )}
            </Fragment>
          ))}
        </>
      )}
      <PrivilegeModal
        isOpen={isPrivilegeModalOpen}
        onClose={handlePrivilegeModalClose}
        userUuid={uuid}
      />
    </Container>
  );
};

export default ProfileInfo;
