import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import avatar from 'assets/profileHeader/avatar.svg';
import editIcon from 'assets/profileHeader/edit.svg';
import online from 'assets/profileHeader/online.svg';
import pending from 'assets/profileHeader/pending.svg';
import camera from 'assets/profileHeader/photo-camera.svg';
import verified from 'assets/profileHeader/verified.svg';
import Button from 'common-ui/button';
import ImageUpload from 'common-ui/imageUpload';
import Modal from 'common-ui/modal';
import Switch from 'common-ui/switch';
import { getUserInfo } from 'features/auth/authActions';
import { getAdditionalInfo, uploadProfilePic } from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectAdditionalInfoLoading,
  selectAvatarUploadSuccess,
  selectUploadLoading,
} from 'features/profile/profileSlice';
import { isObjectEmpty } from 'utils';

import Tag from '../tag';
import {
  Avatar,
  AvatarWrapper,
  CameraWrapper,
  Container,
  DisabledWrapper,
  EditView,
  FullName,
  FullRow,
  FullRowEdit,
  Gradient,
  Icon,
  Info,
  InfoContainer,
  LoadAdditionalContainer,
  LoadingAdditionalIcon,
  LoadingIcon,
  NickName,
  OnlineOffline,
  Status,
  TagWrapper,
} from './ProfileHeader.styles';
import Disable from './disable';
import loadIcon from './loading.svg';

const ProfileHeader = () => {
  const { pathname } = useLocation();
  const { uuid } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUploadLoading);
  const loading = useSelector(selectAdditionalInfoLoading);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const uploadAvatarSuccess = useSelector(selectAvatarUploadSuccess);
  const userType = localStorage.getItem('userType');
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [modalType, setModalType] = useState(false);
  const showEdit =
    (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
    (userType === 'Super Admin' && additionalInfo.isSuper && uuid);

  const handleNavigateEdit = () => {
    if (!uuid) {
      navigate(`/profile/personal-info/edit`);
    } else {
      navigate(`/profile/additional-info/edit/${uuid}`);
    }
  };

  const handleUploadAvatar = (file) => {
    const formData = new FormData();
    formData.append('photo', file);

    dispatch(uploadProfilePic(formData));
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      return !prev;
    });
  };

  const handleCloseModal = () => {
    setModalType(false);
  };

  useEffect(() => {
    if (uuid) {
      dispatch(getAdditionalInfo(uuid));
    } else {
      dispatch(getAdditionalInfo());
    }
    dispatch(getUserInfo());
  }, [uploadAvatarSuccess]);

  return (
    <Container>
      <Gradient />
      <Info>
        {uuid ? (
          <AvatarWrapper>
            <Avatar src={additionalInfo?.photo ?? avatar} alt="a" />
          </AvatarWrapper>
        ) : (
          <ImageUpload
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={(e) => setIsDropdownOpen(e)}
            onUpload={handleUploadAvatar}
          >
            {loading || isLoading ? (
              <AvatarWrapper>
                <LoadingIcon src={loadIcon} alt="Loading..." />
              </AvatarWrapper>
            ) : (
              <AvatarWrapper
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                $changeCursor={!uuid}
                id="dropdown-container"
                onClick={() => handleToggleDropdown()}
              >
                {hovered && (
                  <CameraWrapper>
                    <Icon src={camera} alt="camera" />
                  </CameraWrapper>
                )}
                <Avatar src={additionalInfo?.photo ?? avatar} alt="a" />
              </AvatarWrapper>
            )}
          </ImageUpload>
        )}
        <InfoContainer>
          <>
            {loading ? (
              <LoadAdditionalContainer>
                <LoadingAdditionalIcon src={loadIcon} alt="Loading..." />
              </LoadAdditionalContainer>
            ) : (
              !isObjectEmpty(additionalInfo) && (
                <>
                  <FullName>
                    {`${additionalInfo.name} ${additionalInfo.surname}`}
                    <Status src={additionalInfo.isVerified ? verified : pending} alt="v" />
                  </FullName>
                  <NickName>@ {additionalInfo?.nickname}</NickName>
                </>
              )
            )}
          </>

          <FullRowEdit>
            <OnlineOffline src={online} alt="o" />
            <EditView className="editViewMobile">
              {!pathname.includes('new') &&
                !pathname.includes('updates') &&
                !pathname.includes('edit') &&
                uuid &&
                showEdit && (
                  <DisabledWrapper>
                    <TagWrapper className="tag-tooltip">
                      <Tag type="occupation" variant={'Disabled'} />
                    </TagWrapper>
                    <Switch isOn={true} onToggle={() => setModalType(true)} />
                  </DisabledWrapper>
                )}
              {!pathname.includes('new') &&
                !pathname.includes('updates') &&
                !pathname.includes('edit') &&
                (!uuid || showEdit) && (
                  <Button outlined icon={editIcon} onClick={handleNavigateEdit}>
                    Edit
                  </Button>
                )}
            </EditView>
          </FullRowEdit>
        </InfoContainer>
        <FullRow>
          <EditView>
            {!pathname.includes('new') &&
              !pathname.includes('updates') &&
              !pathname.includes('edit') &&
              uuid &&
              showEdit && (
                <DisabledWrapper>
                  <TagWrapper className="tag-tooltip">
                    <Tag type="occupation" variant={'Disabled'} />
                  </TagWrapper>
                  <Switch isOn={true} onToggle={() => setModalType(true)} />
                </DisabledWrapper>
              )}
            {!pathname.includes('new') &&
              !pathname.includes('updates') &&
              !pathname.includes('edit') &&
              (!uuid || showEdit) && (
                <Button outlined icon={editIcon} onClick={handleNavigateEdit}>
                  Edit
                </Button>
              )}
          </EditView>
        </FullRow>
      </Info>

      <Modal isOpen={modalType} onClose={handleCloseModal} width="410px">
        <Disable
          title={`Are you sure you want to disable this ${additionalInfo.name}?`}
          description={`Hiding this ${additionalInfo.name}? will make it temporarily invisible to users, but it will not delete any data. You can enable it at any time from the settings.`}
          buttonText="Yes, Hide"
          onClose={handleCloseModal}
          id={additionalInfo.uuid}
          name={additionalInfo.name}
        />
      </Modal>
    </Container>
  );
};

export default ProfileHeader;
