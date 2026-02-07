import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Switch from 'common-ui/switch';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedNews,
  selectSkillsById,
  setSelectedNewSkills,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { capitalizeFirstLetter } from 'utils';

const infoLevelOptions = {
  1: 'Intern',
  2: 'Junior',
  3: 'Middle',
  4: 'Senior',
  5: 'Master',
};

const Skills = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const data = useSelector(selectSkillsById);
  const selectAll = useSelector(selectAllSelectedNews);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const newSkills = data?.new;

  const dispatch = useDispatch();

  const fieldItemSkills = newSkills?.map((item) => {
    return {
      uuid: item.uuid,
      leftItem: (
        <>
          {capitalizeFirstLetter(item.skill)}
          <ProfileInfoTag title={infoLevelOptions[item.level]} />
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
    dispatch(setSelectedNewSkills(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([...new Set(newSkills?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return newSkills?.length > 0 ? (
    <FieldItem
      showCheckbox
      title="Skills"
      data={fieldItemSkills}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
    />
  ) : (
    <></>
  );
};

export default Skills;
