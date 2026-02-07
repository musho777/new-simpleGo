import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from 'common-ui/button';
import MyCheckbox from 'common-ui/myCheckbox';
import {
  approveRejectAddressesUpdates,
  approveRejectContactUpdates,
  approveRejectLanguagesUpdates,
  approveRejectMainPhone,
  approveRejectPersonalUpdates,
  approveRejectSkillsUpdates,
  getUserProfileInfoChangesById,
} from 'features/profile/profileActions';
import {
  resetSelectedNewAddresses,
  resetSelectedNewContacts,
  resetSelectedNewLanguages,
  resetSelectedNewMainPhone,
  resetSelectedNewSkills,
  resetSelectedProfileChanges,
  selectAdditionalUpdateSuccess,
  selectAllSelectedChanges,
  selectError,
  selectLoading,
  selectPersonalChangeIds,
  selectSelectedMainPhone,
  selectSelectedNewAddresses,
  selectSelectedNewContacts,
  selectSelectedNewLanguages,
  selectSelectedNewSkills,
  selectUpdateChangesCount,
  setSelectAllChanges,
} from 'features/profile/profileSlice';

import { SelectAllContainer, SelectedCountText } from '../new/New.styles';
import { BtnWrapper } from './Updated.styles';
import Addresses from './addresses';
import Contacts from './contacts';
import Languages from './languages';
import Personal from './personal';
import Skills from './skills';

const Update = () => {
  const userType = localStorage.getItem('userType');
  const updatesCount = useSelector(selectUpdateChangesCount);
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const [selectedCount, setSelectedCount] = useState(0);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectAdditionalUpdateSuccess);
  const error = useSelector(selectError);
  const selectAll = useSelector(selectAllSelectedChanges);
  const selectedContacts = useSelector(selectSelectedNewContacts) || [];
  const selectedAddresses = useSelector(selectSelectedNewAddresses) || [];
  const languagesChangeIds = useSelector(selectSelectedNewLanguages) || [];
  const skillsChangeIds = useSelector(selectSelectedNewSkills) || [];
  const personalChangeIds = useSelector(selectPersonalChangeIds) || [];
  const mainPhoneChangeId = useSelector(selectSelectedMainPhone) || [];

  const updateContactCount = Object.values(selectedContacts || {}).reduce(
    (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
    0
  );
  const updateAddressCount = Object.values(selectedAddresses || {}).reduce(
    (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
    0
  );
  const updateSkillCount = skillsChangeIds?.length || 0;
  const updateLanguageCount = languagesChangeIds?.length || 0;
  const mainPhoneCount = mainPhoneChangeId?.length || 0;
  const personalChangeCount = personalChangeIds?.length ? 1 : 0;

  const contactChangeIds = [
    ...selectedContacts.phones,
    ...selectedContacts.mobiles,
    ...selectedContacts.emails,
  ];

  const addressChangeIds = [
    ...selectedAddresses.home,
    ...selectedAddresses.billing,
    ...selectedAddresses.work,
    ...selectedAddresses.delivery,
    ...selectedAddresses.service,
  ];

  const toggleSelectAll = () => {
    dispatch(setSelectAllChanges(!selectAll));
  };

  const handleRejectNew = useCallback(() => {
    if (contactChangeIds.length > 0) {
      dispatch(approveRejectContactUpdates({ userType, contactChangeIds, approve: false }));
    }

    if (addressChangeIds.length > 0) {
      dispatch(approveRejectAddressesUpdates({ userType, addressChangeIds, approve: false }));
    }

    if (languagesChangeIds.length > 0) {
      dispatch(
        approveRejectLanguagesUpdates({
          userType,
          languageChangeIds: languagesChangeIds,
          approve: false,
        })
      );
    }

    if (skillsChangeIds.length > 0) {
      dispatch(
        approveRejectSkillsUpdates({
          userType,
          skillChangeIds: skillsChangeIds,
          approve: false,
        })
      );
    }

    if (personalChangeIds.length > 0) {
      dispatch(
        approveRejectPersonalUpdates({
          userType,
          changeId: personalChangeIds,
          approve: false,
        })
      );
    }

    if (mainPhoneChangeId.length > 0) {
      dispatch(
        approveRejectMainPhone({
          contactChangeId: mainPhoneChangeId,
          approve: false,
        })
      );
    }
  }, [
    contactChangeIds,
    addressChangeIds,
    languagesChangeIds,
    skillsChangeIds,
    mainPhoneChangeId,
    dispatch,
    userType,
  ]);

  const handleApproveUpdate = useCallback(() => {
    if (contactChangeIds.length > 0) {
      dispatch(approveRejectContactUpdates({ userType, contactChangeIds, approve: true }));
    }

    if (addressChangeIds.length > 0) {
      dispatch(approveRejectAddressesUpdates({ userType, addressChangeIds, approve: true }));
    }

    if (languagesChangeIds.length > 0) {
      dispatch(
        approveRejectLanguagesUpdates({
          userType,
          languageChangeIds: languagesChangeIds,
          approve: true,
        })
      );
    }

    if (skillsChangeIds.length > 0) {
      dispatch(
        approveRejectSkillsUpdates({
          userType,
          skillChangeIds: skillsChangeIds,
          approve: true,
        })
      );
    }

    if (personalChangeIds.length > 0) {
      dispatch(
        approveRejectPersonalUpdates({
          userType,
          changeId: personalChangeIds,
          approve: true,
        })
      );
    }

    if (mainPhoneChangeId.length > 0) {
      dispatch(
        approveRejectMainPhone({
          contactChangeId: mainPhoneChangeId,
          approve: true,
        })
      );
    }
  }, [
    contactChangeIds,
    addressChangeIds,
    languagesChangeIds,
    skillsChangeIds,
    personalChangeIds,
    mainPhoneChangeId,
    dispatch,
    userType,
  ]);

  useEffect(() => {
    dispatch(resetSelectedNewContacts());
    dispatch(resetSelectedNewSkills());
    dispatch(resetSelectedNewAddresses());
    dispatch(resetSelectedNewLanguages());
    dispatch(resetSelectedNewMainPhone());
    dispatch(resetSelectedProfileChanges());

    if (success) {
      dispatch(getUserProfileInfoChangesById(uuid));
    }
  }, [success, error]);

  useEffect(() => {
    const totalCount =
      updateContactCount +
      updateAddressCount +
      updateSkillCount +
      updateLanguageCount +
      mainPhoneCount +
      personalChangeCount;
    if (totalCount === updatesCount) {
      setSelectedCount('All');
      dispatch(setSelectAllChanges(true));
    } else {
      setSelectedCount(totalCount);
    }
    if (totalCount === 0) {
      dispatch(setSelectAllChanges(false));
    }
  }, [
    updateContactCount,
    updateAddressCount,
    updateSkillCount,
    updateLanguageCount,
    mainPhoneCount,
    personalChangeCount,
  ]);

  return (
    <>
      <SelectAllContainer $isSelected={selectAll}>
        <SelectedCountText>Selected {`(${selectedCount ?? 0})`}</SelectedCountText>
        <MyCheckbox selected={selectAll} onClick={toggleSelectAll} />
      </SelectAllContainer>
      <Contacts />
      <Addresses />
      <Skills />
      <Languages />
      <Personal />

      {updatesCount !== 0 && (
        <BtnWrapper>
          <Button
            loading={isLoading}
            outlined
            disabled={
              contactChangeIds.length === 0 &&
              addressChangeIds.length === 0 &&
              languagesChangeIds.length === 0 &&
              skillsChangeIds.length === 0 &&
              mainPhoneChangeId.length === 0 &&
              (personalChangeIds === undefined || personalChangeIds?.length === 0)
            }
            onClick={handleRejectNew}
          >
            Reject
          </Button>
          <Button
            secondary
            loading={isLoading}
            disabled={
              contactChangeIds.length === 0 &&
              addressChangeIds.length === 0 &&
              languagesChangeIds.length === 0 &&
              skillsChangeIds.length === 0 &&
              mainPhoneChangeId.length === 0 &&
              (personalChangeIds === undefined || personalChangeIds?.length === 0)
            }
            onClick={handleApproveUpdate}
          >
            Approve
          </Button>
        </BtnWrapper>
      )}
    </>
  );
};

export default Update;
