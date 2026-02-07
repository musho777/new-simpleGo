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

const Phone = () => {
  const data = useSelector(selectContactsById);
  const phones = data?.new?.phones;
  const [selectedItems, setSelectedItems] = useState([]);
  const selectAll = useSelector(selectAllSelectedNews);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const dispatch = useDispatch();

  const handleCheckboxClick = (uuid) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  const fieldItemData = phones?.map((item) => {
    return {
      leftItem: (
        <>
          +{item.contact} <ProfileInfoTag title={infoTagOptions[item.priority]} />
          <Switch isOn={item.disabled} />
        </>
      ),
      uuid: item.uuid,
    };
  });

  useEffect(() => {
    dispatch(setSelectedNewContacts({ phones: selectedItems }));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([...new Set(phones?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return (
    <FieldItem
      title="Phone numbers"
      data={fieldItemData}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
      showCheckbox
    />
  );
};

export default Phone;
