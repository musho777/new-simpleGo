import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import arrow from 'assets/arrow.svg';
import {
  selectAdditionalUpdateSuccess,
  selectAddressesById,
  selectAllSelectedChanges,
  setSelectedNewAddresses,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import { isObject } from 'utils';

import { Change, Old, WarningSpan } from '../../Updated.styles';
import { ArrowBottom, Col, DisabledWrapper } from '../Addresses.styles';

const disabledText = {
  false: 'Disabled',
  true: 'Enabled',
};

const Service = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const newAddresses = useSelector(selectAddressesById);
  const selectAll = useSelector(selectAllSelectedChanges);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const data = newAddresses.update.service;

  const serviceAddressData = data.map((item) => {
    return {
      uuid: item.uuid,
      leftItem: isObject(item.address) ? (
        <>
          <Col $alignCenter={item.address.new}>
            <Old>{item.address.old}</Old>
            <ArrowBottom src={arrow} alt="a" />
            {item.address.new ? (
              <Change>{item.address.new}</Change>
            ) : (
              <WarningSpan>Deleted</WarningSpan>
            )}
          </Col>
        </>
      ) : (
        item.address
      ),
      rightItem: (
        <DisabledWrapper>
          {item.disabled && (
            <Col $alignCenter={true}>
              <Old>{disabledText[item?.disabled?.old]}</Old>
              <ArrowBottom src={arrow} alt="a" />
              <Change>{disabledText[item.disabled?.new]}</Change>
            </Col>
          )}
        </DisabledWrapper>
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
    dispatch(setSelectedNewAddresses({ service: selectedItems }));
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
      title="Service address"
      data={serviceAddressData}
      selectedItems={selectedItems}
      onCheckboxClick={handleCheckboxClick}
      showCheckbox
    />
  );
};

export default Service;
