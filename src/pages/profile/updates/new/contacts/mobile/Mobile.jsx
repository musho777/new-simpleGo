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

const Mobile = () => {
  const data = useSelector(selectContactsById);
  const mobile = data?.new?.mobilePhones;
  const selectAll = useSelector(selectAllSelectedNews);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxClick = (uuid) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  const fieldItemData = mobile?.map((item) => {
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
    dispatch(setSelectedNewContacts({ mobiles: selectedItems }));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([...new Set(mobile?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return (
    <FieldItem
      title="Mobile phone numbers"
      data={fieldItemData}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
      showCheckbox
    />
  );
};

export default Mobile;
