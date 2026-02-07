import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Input from 'common-ui/input';
import styled from 'styled-components';

import ArrowIcon from '../../assets/back.svg';
import { getCustomer } from '../../features/main/mainActions';
import {
  BackAction,
  BackTitle,
  CompactInputWrapper,
  Container,
  FormRow,
  FormWrapper,
  FullWidthInputWrapper,
  PassportLabel,
  PhoneRow,
  StyledFormControl,
  Subtitle,
  Title,
} from '../subscribers/individual/IndividualForm.styles';
import CustomInput from './custom-input/CustomInput';
import DeleteEmailModal from './delete-modal/DeleteEmailModal';
import DeleteExternalIdModal from './delete-modal/DeleteExternalIdModal';
import DeleteNotificationAddressModal from './delete-modal/DeleteNotificationAddressModal';
import DeletePhoneCommentModal from './delete-modal/DeletePhoneCommentModal';
import EditBirthDateModal from './edit-modal/EditBirthDateModal';
import EditEmailModal from './edit-modal/EditEmailModal';
import EditExternalIdModal from './edit-modal/EditExternalIdModal';
import EditFirstNameModal from './edit-modal/EditFirstNameModal';
import EditLastNameModal from './edit-modal/EditLastNameModal';
import EditNotificationAddressModal from './edit-modal/EditNotificationAddressModal';
import EditPassportAddressModal from './edit-modal/EditPassportAddressModal';
import EditPassportDateModal from './edit-modal/EditPassportDateModal';
import EditPassportIssuerModal from './edit-modal/EditPassportIssuerModal';
import EditPassportNumberModal from './edit-modal/EditPassportNumberModal';
import EditPatronymicModal from './edit-modal/EditPatronymicModal';
import EditPhoneCommentModal from './edit-modal/EditPhoneCommentModal';
import EditPhoneNumberModal from './edit-modal/EditPhoneNumberModal';
import EditServiceAddressModal from './edit-modal/EditServiceAddressModal';
import EditSocialCardModal from './edit-modal/EditSocialCardModal';
import EditIcon from './icons/edit.svg';
import TrashIcon from './icons/trash.svg';

const ServiceAddressLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-right: 20px;
`;

const ServiceAddressLabel = styled(PassportLabel)`
  margin: 0;
`;

const EditIconButton = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  &:hover {
    opacity: 0.7;
  }
`;

const IndividualSubscriberView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subscriberData, setSubscriberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFirstNameModalOpen, setIsFirstNameModalOpen] = useState(false);
  const [isLastNameModalOpen, setIsLastNameModalOpen] = useState(false);
  const [isPatronymicModalOpen, setIsPatronymicModalOpen] = useState(false);
  const [isSocialCardModalOpen, setIsSocialCardModalOpen] = useState(false);
  const [isNotificationAddressModalOpen, setIsNotificationAddressModalOpen] = useState(false);
  const [isDeleteNotificationAddressModalOpen, setIsDeleteNotificationAddressModalOpen] =
    useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isDeleteEmailModalOpen, setIsDeleteEmailModalOpen] = useState(false);
  const [isExternalIdModalOpen, setIsExternalIdModalOpen] = useState(false);
  const [isDeleteExternalIdModalOpen, setIsDeleteExternalIdModalOpen] = useState(false);
  const [isPassportNumberModalOpen, setIsPassportNumberModalOpen] = useState(false);

  const [isPassportDateModalOpen, setIsPassportDateModalOpen] = useState(false);
  const [isPassportIssuerModalOpen, setIsPassportIssuerModalOpen] = useState(false);
  const [isPassportAddressModalOpen, setIsPassportAddressModalOpen] = useState(false);

  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);
  const [isPhoneCommentModalOpen, setIsPhoneCommentModalOpen] = useState(false);
  const [isDeletePhoneCommentModalOpen, setIsDeletePhoneCommentModalOpen] = useState(false);
  const [selectedPhoneIndex, setSelectedPhoneIndex] = useState(null);

  const [isBirthDateModalOpen, setIsBirthDateModalOpen] = useState(false);
  const [isServiceAddressModalOpen, setIsServiceAddressModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getCustomer(id)).unwrap();
        setSubscriberData(result);
      } catch (err) {
        console.error('Error fetching subscriber:', err);
        setError(err || 'Failed to fetch subscriber data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubscriber();
    } else {
      console.error('No subscriber ID provided');
      setError('No subscriber ID provided');
      setLoading(false);
    }
  }, [dispatch, id]);

  const handleFirstNameEdit = () => {
    setIsFirstNameModalOpen(true);
  };

  const handleLastNameEdit = () => {
    setIsLastNameModalOpen(true);
  };

  const handlePatronymicEdit = () => {
    setIsPatronymicModalOpen(true);
  };

  const handleSocialCardEdit = () => {
    setIsSocialCardModalOpen(true);
  };

  const handleNotificationAddressEdit = () => {
    setIsNotificationAddressModalOpen(true);
  };

  const handleNotificationAddressDelete = () => {
    setIsDeleteNotificationAddressModalOpen(true);
  };

  const handleEmailEdit = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailDelete = () => {
    setIsDeleteEmailModalOpen(true);
  };

  const handleExternalIdEdit = () => {
    setIsExternalIdModalOpen(true);
  };

  const handleExternalIdDelete = () => {
    setIsDeleteExternalIdModalOpen(true);
  };

  const handlePassportNumberEdit = () => {
    setIsPassportNumberModalOpen(true);
  };

  const handlePassportDateEdit = () => {
    setIsPassportDateModalOpen(true);
  };

  const handlePassportIssuerEdit = () => {
    setIsPassportIssuerModalOpen(true);
  };

  const handlePassportAddressEdit = () => {
    setIsPassportAddressModalOpen(true);
  };

  const handlePhoneNumberEdit = (index) => {
    setSelectedPhoneIndex(index);
    setIsPhoneNumberModalOpen(true);
  };

  const handlePhoneCommentEdit = (index) => {
    setSelectedPhoneIndex(index);
    setIsPhoneCommentModalOpen(true);
  };

  const handlePhoneCommentDelete = (index) => {
    setSelectedPhoneIndex(index);
    setIsDeletePhoneCommentModalOpen(true);
  };

  const handleBirthDateEdit = () => {
    setIsBirthDateModalOpen(true);
  };

  const handleServiceAddressEdit = () => {
    setIsServiceAddressModalOpen(true);
  };

  const handleFirstNameModalClose = () => {
    setIsFirstNameModalOpen(false);
  };

  const handleLastNameModalClose = () => {
    setIsLastNameModalOpen(false);
  };

  const handlePatronymicModalClose = () => {
    setIsPatronymicModalOpen(false);
  };

  const handleSocialCardModalClose = () => {
    setIsSocialCardModalOpen(false);
  };

  const handleNotificationAddressModalClose = () => {
    setIsNotificationAddressModalOpen(false);
  };

  const handleDeleteNotificationAddressModalClose = () => {
    setIsDeleteNotificationAddressModalOpen(false);
  };

  const handleEmailModalClose = () => {
    setIsEmailModalOpen(false);
  };

  const handleDeleteEmailModalClose = () => {
    setIsDeleteEmailModalOpen(false);
  };

  const handleExternalIdModalClose = () => {
    setIsExternalIdModalOpen(false);
  };

  const handleDeleteExternalIdModalClose = () => {
    setIsDeleteExternalIdModalOpen(false);
  };

  const handlePassportNumberModalClose = () => {
    setIsPassportNumberModalOpen(false);
  };

  const handlePassportDateModalClose = () => {
    setIsPassportDateModalOpen(false);
  };

  const handlePassportIssuerModalClose = () => {
    setIsPassportIssuerModalOpen(false);
  };

  const handlePassportAddressModalClose = () => {
    setIsPassportAddressModalOpen(false);
  };

  const handlePhoneNumberModalClose = () => {
    setIsPhoneNumberModalOpen(false);
    setSelectedPhoneIndex(null);
  };

  const handlePhoneCommentModalClose = () => {
    setIsPhoneCommentModalOpen(false);
    setSelectedPhoneIndex(null);
  };

  const handleDeletePhoneCommentModalClose = () => {
    setIsDeletePhoneCommentModalOpen(false);
    setSelectedPhoneIndex(null);
  };

  const handleBirthDateModalClose = () => {
    setIsBirthDateModalOpen(false);
  };

  const handleServiceAddressModalClose = () => {
    setIsServiceAddressModalOpen(false);
  };

  const handleNameUpdate = () => {
    // Refresh subscriber data after successful update
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handleSocialCardUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handleNotificationAddressUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handleEmailUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handleExternalIdUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handlePassportUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handlePhoneNumberUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handleBirthDateUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const handleServiceAddressUpdate = () => {
    if (id) {
      dispatch(getCustomer(id)).then((result) => {
        if (result.payload) {
          setSubscriberData(result.payload);
        }
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('hy-AM');
  };

  if (loading) {
    return (
      <Container>
        <Title>Loading subscriber data...</Title>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Error: {error}</Title>
        <BackAction onClick={() => navigate('/erp/subscriber/search')}>
          <img src={ArrowIcon} alt="icon" />
          <BackTitle>Գնալ հետ</BackTitle>
        </BackAction>
      </Container>
    );
  }

  if (!subscriberData) {
    return (
      <Container>
        <Title>Subscriber not found</Title>
        <BackAction onClick={() => navigate('/erp/subscriber/search')}>
          <img src={ArrowIcon} alt="icon" />
          <BackTitle>Գնալ հետ</BackTitle>
        </BackAction>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Ֆիզիկական անձ</Title>
      <Subtitle>Բաժանորդի տվյալներ</Subtitle>

      <BackAction onClick={() => navigate('/erp/subscriber/search')}>
        <img src={ArrowIcon} alt="icon" />
        <BackTitle>Գնալ հետ</BackTitle>
      </BackAction>

      <FormWrapper>
        <FormRow>
          <CompactInputWrapper>
            <CustomInput
              label="Անուն"
              value={subscriberData.firstName || ''}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handleFirstNameEdit }]}
            />
          </CompactInputWrapper>
          <CompactInputWrapper>
            <CustomInput
              label="Ազգանուն"
              value={subscriberData.lastName || ''}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handleLastNameEdit }]}
            />
          </CompactInputWrapper>
          <CompactInputWrapper>
            <CustomInput
              label="Հայրանոն"
              value={subscriberData.patronymic || ''}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handlePatronymicEdit }]}
            />
          </CompactInputWrapper>
        </FormRow>
        <FormRow>
          {subscriberData.passportType === 'ARMENIAN_ID_CARD' ? (
            <CompactInputWrapper>
              <CustomInput
                label="ID քարտի համար"
                value={subscriberData.passport.number || ''}
                disabled
                width="390px"
                required
                rightIcons={[
                  { src: EditIcon, alt: 'edit', onClick: handlePassportNumberEdit },
                ]}
              />
            </CompactInputWrapper>
          ) : subscriberData.passportType === 'FOREIGN_PASSPORT' ? (
            <CompactInputWrapper>
              <CustomInput
                label="Օտարերկրյա անձնագրի համար"
                value={subscriberData.passport.number || ''}
                disabled
                width="390px"
                required
                rightIcons={[
                  { src: EditIcon, alt: 'edit', onClick: handlePassportNumberEdit },
                ]}
              />
            </CompactInputWrapper>
          ) : (
            <CompactInputWrapper>
              <CustomInput
                label="ԱՆձնագրի համար"
                value={subscriberData.passport.number || ''}
                disabled
                width="390px"
                required
                rightIcons={[
                  { src: EditIcon, alt: 'edit', onClick: handlePassportNumberEdit },
                ]}
              />
            </CompactInputWrapper>
          )}
          <CompactInputWrapper>
            <CustomInput
              label="Տրման ամսաթիվ"
              value={formatDate(subscriberData.passport.issueDate)}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handlePassportDateEdit }]}
            />
          </CompactInputWrapper>

          <CompactInputWrapper>
            <CustomInput
              label="ՈՒմ կողմից է տրված"
              value={subscriberData.passport.issuerCode || ''}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handlePassportIssuerEdit }]}
            />
          </CompactInputWrapper>
          <CompactInputWrapper>
            <CustomInput
              label="Գրանցման հասցե"
              value={subscriberData.passport.address || ''}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handlePassportAddressEdit }]}
            />
          </CompactInputWrapper>
          <CompactInputWrapper>
            <CustomInput
              label="Սոց. քարտի համար"
              value={subscriberData.socialCardNumber || ''}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handleSocialCardEdit }]}
            />
          </CompactInputWrapper>
          <CompactInputWrapper>
            <CustomInput
              label="Ծանուցումների հասցե"
              value={subscriberData.notificationAddress || ''}
              disabled
              width="390px"
              rightIcons={[
                { src: EditIcon, alt: 'edit', onClick: handleNotificationAddressEdit },
                { src: TrashIcon, alt: 'delete', onClick: handleNotificationAddressDelete },
              ]}
            />
          </CompactInputWrapper>
        </FormRow>

        {subscriberData.serviceAddresses && subscriberData.serviceAddresses.length > 0 && (
          <StyledFormControl>
            <ServiceAddressLabelContainer>
              <ServiceAddressLabel>Ծառայությունների մատուցման հասցե</ServiceAddressLabel>
              <EditIconButton src={EditIcon} alt="edit" onClick={handleServiceAddressEdit} />
            </ServiceAddressLabelContainer>
            {subscriberData.serviceAddresses.map((address, index) => (
              <div key={index}>
                <FormRow>
                  <Input
                    label="Փողոց"
                    value={address.building?.street?.name || ''}
                    disabled
                    width="370px"
                    required
                  />

                  <Input
                    label="Տուն"
                    value={address.building?.name || ''}
                    disabled
                    width="370px"
                    required
                  />
                </FormRow>
                <FormRow>
                  <Input label="Բնակարան" value={address.flat || ''} disabled width="370px" />
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Input label="Սենյակ" value={address.room || ''} disabled width="113px" />
                    <Input
                      label="Մուտք"
                      value={address.entrance || ''}
                      disabled
                      width="113px"
                    />
                    <Input label="Հարկ" value={address.floor || ''} disabled width="113px" />
                  </div>
                </FormRow>
                {address.comment && (
                  <FormRow>
                    <FullWidthInputWrapper>
                      <Input
                        label="Մեկնաբանություն"
                        value={address.comment || ''}
                        disabled
                        width="97%"
                      />
                    </FullWidthInputWrapper>
                  </FormRow>
                )}
              </div>
            ))}
          </StyledFormControl>
        )}

        <FormRow>
          <CompactInputWrapper>
            <CustomInput
              label="Էլ․ փոստ"
              value={subscriberData.email || ''}
              disabled
              width="390px"
              rightIcons={[
                { src: EditIcon, alt: 'edit', onClick: handleEmailEdit },
                { src: TrashIcon, alt: 'delete', onClick: handleEmailDelete },
              ]}
            />
          </CompactInputWrapper>
          <CompactInputWrapper>
            <CustomInput
              label="ERP External Id"
              value={subscriberData.externalId || ''}
              disabled
              width="390px"
              rightIcons={[
                { src: EditIcon, alt: 'edit', onClick: handleExternalIdEdit },
                { src: TrashIcon, alt: 'delete', onClick: handleExternalIdDelete },
              ]}
            />
          </CompactInputWrapper>
        </FormRow>
        {subscriberData.phoneNumbers && subscriberData.phoneNumbers.length > 0 && (
          <StyledFormControl>
            <PassportLabel>Հեռախոսահամար</PassportLabel>
            {subscriberData.phoneNumbers.map((phone, index) => (
              <PhoneRow key={index}>
                <CustomInput
                  label="Հեռախոսահամար"
                  value={phone.number || ''}
                  disabled
                  width="370px"
                  required
                  rightIcons={[
                    {
                      src: EditIcon,
                      alt: 'edit',
                      onClick: () => handlePhoneNumberEdit(index),
                    },
                  ]}
                />

                <CustomInput
                  label="Մեկնաբանություն"
                  value={phone.comment || ''}
                  disabled
                  width="370px"
                  rightIcons={[
                    {
                      src: EditIcon,
                      alt: 'edit',
                      onClick: () => handlePhoneCommentEdit(index),
                    },
                    {
                      src: TrashIcon,
                      alt: 'delete',
                      onClick: () => handlePhoneCommentDelete(index),
                    },
                  ]}
                />
              </PhoneRow>
            ))}
          </StyledFormControl>
        )}
        <FormRow>
          <CompactInputWrapper>
            <CustomInput
              label="Ծննդյան ամսաթիվ"
              value={formatDate(subscriberData.birthDate)}
              disabled
              width="390px"
              required
              rightIcons={[{ src: EditIcon, alt: 'edit', onClick: handleBirthDateEdit }]}
            />
          </CompactInputWrapper>
        </FormRow>
      </FormWrapper>

      <EditPassportNumberModal
        isOpen={isPassportNumberModalOpen}
        onClose={handlePassportNumberModalClose}
        customerId={id}
        passportData={subscriberData?.passport}
        onSuccess={handlePassportUpdate}
      />

      <EditPassportDateModal
        isOpen={isPassportDateModalOpen}
        onClose={handlePassportDateModalClose}
        customerId={id}
        passportData={subscriberData?.passport}
        onSuccess={handlePassportUpdate}
      />

      <EditPassportIssuerModal
        isOpen={isPassportIssuerModalOpen}
        onClose={handlePassportIssuerModalClose}
        customerId={id}
        passportData={subscriberData?.passport}
        onSuccess={handlePassportUpdate}
      />

      <EditPassportAddressModal
        isOpen={isPassportAddressModalOpen}
        onClose={handlePassportAddressModalClose}
        customerId={id}
        passportData={subscriberData?.passport}
        onSuccess={handlePassportUpdate}
      />

      <EditFirstNameModal
        isOpen={isFirstNameModalOpen}
        onClose={handleFirstNameModalClose}
        customerId={id}
        nameData={{
          firstName: subscriberData?.firstName,
          lastName: subscriberData?.lastName,
          patronymic: subscriberData?.patronymic,
        }}
        onSuccess={handleNameUpdate}
      />

      <EditLastNameModal
        isOpen={isLastNameModalOpen}
        onClose={handleLastNameModalClose}
        customerId={id}
        nameData={{
          firstName: subscriberData?.firstName,
          lastName: subscriberData?.lastName,
          patronymic: subscriberData?.patronymic,
        }}
        onSuccess={handleNameUpdate}
      />

      <EditPatronymicModal
        isOpen={isPatronymicModalOpen}
        onClose={handlePatronymicModalClose}
        customerId={id}
        nameData={{
          firstName: subscriberData?.firstName,
          lastName: subscriberData?.lastName,
          patronymic: subscriberData?.patronymic,
        }}
        onSuccess={handleNameUpdate}
      />

      <EditSocialCardModal
        isOpen={isSocialCardModalOpen}
        onClose={handleSocialCardModalClose}
        customerId={id}
        socialCardNumber={subscriberData?.socialCardNumber}
        onSuccess={handleSocialCardUpdate}
      />

      <EditNotificationAddressModal
        isOpen={isNotificationAddressModalOpen}
        onClose={handleNotificationAddressModalClose}
        customerId={id}
        notificationAddress={subscriberData?.notificationAddress}
        onSuccess={handleNotificationAddressUpdate}
      />

      <DeleteNotificationAddressModal
        isOpen={isDeleteNotificationAddressModalOpen}
        onClose={handleDeleteNotificationAddressModalClose}
        customerId={id}
        onSuccess={handleNotificationAddressUpdate}
      />

      <EditEmailModal
        isOpen={isEmailModalOpen}
        onClose={handleEmailModalClose}
        customerId={id}
        email={subscriberData?.email}
        onSuccess={handleEmailUpdate}
      />

      <DeleteEmailModal
        isOpen={isDeleteEmailModalOpen}
        onClose={handleDeleteEmailModalClose}
        customerId={id}
        onSuccess={handleEmailUpdate}
      />

      <EditExternalIdModal
        isOpen={isExternalIdModalOpen}
        onClose={handleExternalIdModalClose}
        customerId={id}
        externalId={subscriberData?.externalId}
        onSuccess={handleExternalIdUpdate}
      />

      <DeleteExternalIdModal
        isOpen={isDeleteExternalIdModalOpen}
        onClose={handleDeleteExternalIdModalClose}
        customerId={id}
        onSuccess={handleExternalIdUpdate}
      />

      <EditPhoneNumberModal
        isOpen={isPhoneNumberModalOpen}
        onClose={handlePhoneNumberModalClose}
        customerId={id}
        phoneNumbers={subscriberData?.phoneNumbers}
        phoneIndex={selectedPhoneIndex}
        onSuccess={handlePhoneNumberUpdate}
      />

      <EditPhoneCommentModal
        isOpen={isPhoneCommentModalOpen}
        onClose={handlePhoneCommentModalClose}
        customerId={id}
        phoneNumbers={subscriberData?.phoneNumbers}
        phoneIndex={selectedPhoneIndex}
        onSuccess={handlePhoneNumberUpdate}
      />

      <DeletePhoneCommentModal
        isOpen={isDeletePhoneCommentModalOpen}
        onClose={handleDeletePhoneCommentModalClose}
        customerId={id}
        phoneNumbers={subscriberData?.phoneNumbers}
        phoneIndex={selectedPhoneIndex}
        onSuccess={handlePhoneNumberUpdate}
      />

      <EditBirthDateModal
        isOpen={isBirthDateModalOpen}
        onClose={handleBirthDateModalClose}
        customerId={id}
        birthDate={subscriberData?.birthDate}
        onSuccess={handleBirthDateUpdate}
      />

      <EditServiceAddressModal
        isOpen={isServiceAddressModalOpen}
        onClose={handleServiceAddressModalClose}
        customerId={id}
        serviceAddresses={subscriberData?.serviceAddresses}
        onSuccess={handleServiceAddressUpdate}
      />
    </Container>
  );
};

export default IndividualSubscriberView;
