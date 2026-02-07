import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectAdditionalUpdateSuccess,
  selectAddressesById,
  selectAllSelectedNews,
  setSelectedNewAddresses,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';

const PickupDelivery = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const newAddresses = useSelector(selectAddressesById);
  const selectAll = useSelector(selectAllSelectedNews);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const data = newAddresses.new.delivery;

  const deliveryAddressData = data.map((item) => {
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
    dispatch(setSelectedNewAddresses({ delivery: selectedItems }));
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
      title="Pickup and delivery address"
      data={deliveryAddressData}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
      showCheckbox
    />
  );
};

export default PickupDelivery;
