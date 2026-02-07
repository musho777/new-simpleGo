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
import { ArrowButton } from './Work.styles';

const disabledText = {
  false: 'Disabled',
  true: 'Enabled',
};
const Work = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const newAddresses = useSelector(selectAddressesById);
  const selectAll = useSelector(selectAllSelectedChanges);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const data = newAddresses.update.work;

  const workAddressData = data.map((item) => {
    return {
      uuid: item.uuid,
      leftItem: isObject(item.address) ? (
        <>
          <Col $alignCenter={item.address.new}>
            <Old>{item.address.old}</Old>
            <ArrowButton>
              <ArrowBottom src={arrow} alt="a" />
            </ArrowButton>
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
