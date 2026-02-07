import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import arrow from 'assets/arrow.svg';
import {
  selectAdditionalUpdateSuccess,
  selectAllSelectedChanges,
  selectPersonalInfoUpdates,
  setSelectedProfileChanges,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import { isObject } from 'utils';

import { Change, Icon, Old } from '../Updated.styles';
import { Row } from './Personal.styles';

const Personal = () => {
  const dispatch = useDispatch();
  const selectAll = useSelector(selectAllSelectedChanges);

  const data = useSelector(selectPersonalInfoUpdates);
  const [selectedItems, setSelectedItems] = useState([]);
  const success = useSelector(selectAdditionalUpdateSuccess);

  const handleCheckboxClick = (uuid) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(uuid)
        ? prevSelected.filter((id) => id !== uuid)
        : [...prevSelected, uuid]
    );
  };

  const fieldItemData = [
    {
      uuid: data?.uuid,
      leftItem: (
        <>
          {isObject(data?.name || data?.surname) && (
            <Row>
              <Old>{`${data?.name?.old ?? ''} ${data.surname?.old ?? ''}`}</Old>
            </Row>
          )}

          <Icon src={arrow} alt="a" />

          {isObject(data?.name || data?.surname) && (
            <Row>
              <Change>{`${data?.name?.new ?? ''} ${data?.surname?.new ?? ''}`}</Change>
            </Row>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setSelectedProfileChanges(...selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems([data?.uuid]);
    } else {
      setSelectedItems([]);
    }
  }, [selectAll]);

  useEffect(() => {
    setSelectedItems([]);
  }, [success]);

  return data !== null ? (
    <FieldItem
      onCheckboxClick={handleCheckboxClick}
      data={fieldItemData}
      selectedItems={selectedItems}
      showCheckbox
      title="Personal Info"
    />
  ) : (
    <></>
  );
};

export default Personal;
