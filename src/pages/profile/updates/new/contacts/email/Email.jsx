import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Switch from 'common-ui/switch';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedNews,
  selectContactsById,
  setSelectedNewContacts,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';

const infoTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const Email = () => {
  const data = useSelector(selectContactsById);
  const selectAll = useSelector(selectAllSelectedNews);
  const emails = data?.new?.emails;

  const [selectedItems, setSelectedItems] = useState([]);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const dispatch = useDispatch();

  const handleCheckboxClick = (uuid) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  const fieldItemData = emails.map((item) => {
    return {
      leftItem: (
        <>
          {item.contact} <ProfileInfoTag title={infoTagOptions[item.priority]} />
          <Switch isOn={item.disabled} />
        </>
      ),
      uuid: item.uuid,
    };
  });

  useEffect(() => {
    dispatch(setSelectedNewContacts({ emails: selectedItems }));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([...new Set(emails?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return (
    <FieldItem
      title="Email addresses"
      data={fieldItemData}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
      showCheckbox
    />
  );
};

export default Email;
