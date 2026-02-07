import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import arrow from 'assets/arrow.svg';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedChanges,
  selectContactsById,
  setSelectedNewMainPhone,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';

import { Icon } from '../email/Email.styles';
import { Row } from './MainPhone.styles';

const MainPhone = () => {
  const data = useSelector(selectContactsById);
  const selectAll = useSelector(selectAllSelectedChanges);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const mainPhone = data?.update?.mainPhone;

  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxClick = (uuid) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  const fieldItemData = [
    {
      leftItem: (
        <Row>
          <p className="p-2">{mainPhone.contact.old}</p>
          <Icon src={arrow} alt="a" />
          <p className="p-3">{mainPhone.contact.new}</p>
        </Row>
      ),
      uuid: mainPhone.uuid,
    },
  ];

  useEffect(() => {
    dispatch(setSelectedNewMainPhone([...selectedItems]));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([mainPhone.uuid]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return (
    <FieldItem
      title="Main phone"
      data={fieldItemData}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
      showCheckbox
    />
  );
};

export default MainPhone;
