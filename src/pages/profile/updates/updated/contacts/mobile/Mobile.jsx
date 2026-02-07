import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import arrow from 'assets/arrow.svg';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedChanges,
  selectContactsById,
  setSelectedNewContacts,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';

import { WarningSpan } from '../../Updated.styles';
import { Icon } from '../email/Email.styles';
import { Col, Row } from './Mobile.styles';

const infoTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const status = { false: 'Disable', true: 'Enable' };

const Mobile = () => {
  const data = useSelector(selectContactsById);
  const selectAll = useSelector(selectAllSelectedChanges);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const mobile = data?.update?.mobilePhones;

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
        <Col>
          {typeof item.contact === 'string' ? (
            <>{item.contact}</>
          ) : (
            <Row>
              <p className="p-2">{item.contact.old}</p>
              <Icon src={arrow} alt="a" />
              {item.contact.new !== null ? (
                <p className="p-3">{item.contact.new}</p>
              ) : (
                <WarningSpan>Deleted</WarningSpan>
              )}
            </Row>
          )}
          {item.priority && (
            <Row>
              <p className="p-1">Priority:</p>
              <p className="p-2"> {infoTagOptions[item.priority.old]}</p>
              <Icon src={arrow} alt="a" />
              <p className="p-3">{infoTagOptions[item.priority.new]}</p>
            </Row>
          )}
          {item.disabled && (
            <Row>
              <p className="p-1">Status:</p>
              <p className="p-2">{status[item.disabled.old]}</p>
              <Icon src={arrow} alt="a" />
              <p className="p-3">{status[item.disabled.new]}</p>
            </Row>
          )}
        </Col>
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
