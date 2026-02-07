import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from 'common-ui/button';
import MyCheckbox from 'common-ui/myCheckbox';
import {
  approveRejectAddressesUpdates,
  approveRejectContactUpdates,
  approveRejectLanguagesUpdates,
  approveRejectSkillsUpdates,
  getUserProfileInfoChangesById,
} from 'features/profile/profileActions';
import {
  resetSelectedNewAddresses,
  resetSelectedNewContacts,
  resetSelectedNewLanguages,
  resetSelectedNewSkills,
  selectAdditionalUpdateSuccess,
  selectAllSelectedNews,
  selectError,
  selectLoading,
  selectNewChangesCount,
  selectSelectedNewAddresses,
  selectSelectedNewContacts,
  selectSelectedNewLanguages,
  selectSelectedNewSkills,
  setSelectAllNews,
} from 'features/profile/profileSlice';

import { BtnWrapper, SelectAllContainer, SelectedCountText } from './New.styles';
import Addresses from './addresses';
import Contacts from './contacts';
import Languages from './languages';
import Skills from './skills';

const New = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const selectAll = useSelector(selectAllSelectedNews);

  const userType = localStorage.getItem('userType');
  const newCount = useSelector(selectNewChangesCount);
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const selectedContacts = useSelector(selectSelectedNewContacts);
  const selectedAddresses = useSelector(selectSelectedNewAddresses);
  const languagesChangeIds = useSelector(selectSelectedNewLanguages);
  const skillsChangeIds = useSelector(selectSelectedNewSkills);
  const success = useSelector(selectAdditionalUpdateSuccess);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const newContactCount = Object.values(selectedContacts || {}).reduce(
    (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
    0
  );
  const newAddressCount = Object.values(selectedAddresses || {}).reduce(
    (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
    0
  );
  const newSkillCount = skillsChangeIds?.length || 0;
  const newLanguageCount = languagesChangeIds?.length || 0;

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
    dispatch(setSelectAllNews(!selectAll));
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
  }, [
    contactChangeIds,
    addressChangeIds,
    languagesChangeIds,
    skillsChangeIds,
    dispatch,
    userType,
  ]);

  const handleApproveNew = useCallback(() => {
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
  }, [
    contactChangeIds,
    addressChangeIds,
    languagesChangeIds,
    skillsChangeIds,
    dispatch,
    userType,
  ]);

  useEffect(() => {
    const totalCount = newLanguageCount + newSkillCount + newAddressCount + newContactCount;

    if (totalCount === newCount) {
      setSelectedCount('All');
      dispatch(setSelectAllNews(true));
    } else {
      setSelectedCount(totalCount);
    }
  }, [newLanguageCount, newSkillCount, newAddressCount, newContactCount]);

  useEffect(() => {
    dispatch(resetSelectedNewContacts());
    dispatch(resetSelectedNewSkills());
    dispatch(resetSelectedNewAddresses());
    dispatch(resetSelectedNewLanguages());

    if (success) {
      dispatch(getUserProfileInfoChangesById(uuid));
    }
  }, [success, error]);

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
      {newCount !== 0 && (
        <BtnWrapper>
          <Button
            outlined
            loading={isLoading}
            disabled={
              contactChangeIds.length === 0 &&
              addressChangeIds.length === 0 &&
              languagesChangeIds.length === 0 &&
              skillsChangeIds.length === 0
            }
            onClick={handleRejectNew}
          >
            Reject
          </Button>
          <Button
            loading={isLoading}
            secondary
            disabled={
              contactChangeIds.length === 0 &&
              addressChangeIds.length === 0 &&
              languagesChangeIds.length === 0 &&
              skillsChangeIds.length === 0
            }
            onClick={handleApproveNew}
          >
            Approve
          </Button>
        </BtnWrapper>
      )}
    </>
  );
};

export default New;
