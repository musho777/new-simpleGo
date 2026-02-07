import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import arrow from 'assets/arrow.svg';
import Switch from 'common-ui/switch';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedChanges,
  selectLanguagesById,
  setSelectedNewLanguages,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { isObject } from 'utils';

import { Change, Col, Icon, Old, Row, WarningSpan } from '../Updated.styles';

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

const disabledText = { false: 'Disabled', true: 'Enabled' };

const Languages = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const data = useSelector(selectLanguagesById);
  const selectAll = useSelector(selectAllSelectedChanges);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const updatedLanguages = data?.update;

  const dispatch = useDispatch();

  const fieldItemLanguages = updatedLanguages?.map((item) => {
    return {
      uuid: item.uuid,
      leftItem: (
        <Col>
          {isObject(item.language) ? (
            <Row>
              <Old>{item.language.old}</Old>
              <Icon src={arrow} alt="a" />
              {item?.language?.new ? (
                <Change>{item.language.new}</Change>
              ) : (
                <WarningSpan>Deleted</WarningSpan>
              )}
            </Row>
          ) : (
            <>{item.language}</>
          )}

          {item.level &&
            (isObject(item.level) ? (
              <Row>
                <Old>{infoLevelOptions[item.level?.old]}</Old>
                <Icon src={arrow} alt="a" />
                <Change>{infoLevelOptions[item.level?.new]}</Change>
              </Row>
            ) : (
              <ProfileInfoTag title={infoLevelOptions[item.level]} />
            ))}

          {item.priority &&
            (isObject(item.priority) ? (
              <Row>
                <Old>{infoTagOptions[item.priority?.old]}</Old>
                <Icon src={arrow} alt="a" />
                <Change>{infoTagOptions[item.priority?.new]}</Change>
              </Row>
            ) : (
              <ProfileInfoTag title={infoTagOptions[item.priority]} />
            ))}

          {item.disabled &&
            (isObject(item.disabled) ? (
              <Row>
                <Old>{disabledText[item.disabled.old]}</Old>
                <Icon src={arrow} alt="a" />
                <Change>{disabledText[item.disabled.new]}</Change>
              </Row>
            ) : (
              <Switch isOn={item.disabled} />
            ))}
        </Col>
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
      setSelectedItems([...new Set(updatedLanguages?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return updatedLanguages?.length > 0 ? (
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
