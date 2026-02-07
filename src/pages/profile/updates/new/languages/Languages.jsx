import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Switch from 'common-ui/switch';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedNews,
  selectLanguagesById,
  setSelectedNewLanguages,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';

const infoLevelOptions = {
  1: 'Native',
  2: 'Advanced (C2)',
  3: 'Upper - Intermediate (C1)',
  4: 'Intermediate (B2)',
  5: 'Pre-Intermediate (B1)',
  6: 'Elementary (A2)',
  7: 'Beginner (A1)',
};

const infoTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const Languages = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const data = useSelector(selectLanguagesById);
  const selectAll = useSelector(selectAllSelectedNews);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const newLanguages = data?.new;

  const dispatch = useDispatch();

  const fieldItemLanguages = newLanguages?.map((item) => {
    return {
      uuid: item.uuid,
      leftItem: (
        <>
          {item.language}
          <ProfileInfoTag title={infoLevelOptions[item.level]} />
          <ProfileInfoTag title={infoTagOptions[item.priority]} />
          <Switch isOn={item.disabled} />
        </>
      ),
    };
  });

  const handleCheckboxClick = (uuid) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  useEffect(() => {
    dispatch(setSelectedNewLanguages(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([...new Set(newLanguages?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return newLanguages?.length > 0 ? (
    <FieldItem
      showCheckbox
      title="Languages"
      data={fieldItemLanguages}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
    />
  ) : (
    <></>
  );
};

export default Languages;
