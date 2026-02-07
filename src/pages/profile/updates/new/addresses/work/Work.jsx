import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectAdditionalUpdateSuccess,
  selectAddressesById,
  selectAllSelectedNews,
  setSelectedNewAddresses,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';

const Work = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const newAddresses = useSelector(selectAddressesById);
  const selectAll = useSelector(selectAllSelectedNews);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const data = newAddresses.new.work;

  const workAddressData = data.map((item) => {
    return {
      uuid: item.uuid,
      leftItem: item.address,
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
    dispatch(setSelectedNewAddresses({ work: selectedItems }));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([...new Set(data?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return (
    <FieldItem
      title="Work address"
      data={workAddressData}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
      showCheckbox
    />
  );
};

export default Work;
