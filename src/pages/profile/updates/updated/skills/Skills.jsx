import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import arrow from 'assets/arrow.svg';
import Switch from 'common-ui/switch';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedChanges,
  selectSkillsById,
  setSelectedNewSkills,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { isObject } from 'utils';
import { capitalizeFirstLetter } from 'utils';

import { Change, Col, Icon, Old, Row, WarningSpan } from '../Updated.styles';

const infoLevelOptions = {
  1: 'Intern',
  2: 'Junior',
  3: 'Middle',
  4: 'Senior',
  5: 'Master',
};

const disabledText = { false: 'Disabled', true: 'Enabled' };

const Skills = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const selectAll = useSelector(selectAllSelectedChanges);

  const data = useSelector(selectSkillsById);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const updatedSkills = data?.update;

  const dispatch = useDispatch();

  const fieldItemSkills = updatedSkills?.map((item) => {
    return {
      uuid: item.uuid,
      leftItem: (
        <Col>
          {isObject(capitalizeFirstLetter(item.skill)) ? (
            <Row>
              <Old>{item.skill.old}</Old>
              <Icon src={arrow} alt="a" />
              {item?.skill?.new ? (
                <Change>{item.skill.new}</Change>
              ) : (
                <WarningSpan>Deleted</WarningSpan>
              )}
            </Row>
          ) : (
            <>{capitalizeFirstLetter(item.skill)}</>
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
    dispatch(setSelectedNewSkills(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([...new Set(updatedSkills?.map((item) => item.uuid))]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return updatedSkills?.length > 0 ? (
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
