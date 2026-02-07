import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Switch from 'common-ui/switch';
import { SYSTEM_USERS, USERS } from 'constants/constants';
import {
  getUserProfileInfo,
  updateProfileContactsPhone,
} from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectLoading,
  selectPhones,
  selectUpdateContactsNumbersSuccess,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';

const infoTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const Phone = () => {
  const navigate = useNavigate();
  const phoneData = useSelector(selectPhones);
  const [phones, setPhones] = useState(phoneData);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const userType = localStorage.getItem('userType');
  const isLoading = useSelector(selectLoading);
  const updatePhonesSuccess = useSelector(selectUpdateContactsNumbersSuccess);
  const additionalInfo = useSelector(selectAdditionalInfo);

  const shouldDisableSwitch =
    (userType === 'Super Admin' && USERS.includes(additionalInfo?.role)) ||
    (userType === 'Hr Manager' && SYSTEM_USERS.includes(additionalInfo?.role));

  const handleToggle = (id) => {
    const updatedMobiles = phones.map((item) =>
      item.uuid === id ? { ...item, disabled: !item.disabled } : item
    );

    setPhones(updatedMobiles);

    const updatedMobile = updatedMobiles
      .filter((item) => item.uuid === id)
      .map((item) => ({
        contactId: item.uuid,
        disabled: item.disabled,
        isNew: item.type === 'add' ? true : false,
      }));

    dispatch(
      updateProfileContactsPhone({
        phoneChanges: updatedMobile,
        isMobile: false,
        userType,
        uuid,
      })
    );
  };

  const generateFieldItemData = () => {
    return phoneData.map((item) => ({
      type: item.type,
      pending: item.pending,
      leftItem: item.contact,
      rightItem: (
        <>
          <ProfileInfoTag title={infoTagOptions[item.priority]} />
          {item.priority !== 4 && (
            <Switch
              isOn={item.disabled}
              onToggle={() => handleToggle(item.uuid)}
              disabled={item.pending || shouldDisableSwitch}
            />
          )}
        </>
      ),
    }));
  };

  const onMobileEdit = () => {
    if (!uuid) {
      navigate(`${pathname}/edit`);
    } else {
      const pathSegments = pathname.split('/');
      const uuidIndex = pathSegments.indexOf(uuid);

      if (uuidIndex > 0) {
        pathSegments.splice(uuidIndex, 0, 'edit');
        const updatedPath = pathSegments.join('/');
        navigate(updatedPath);
      } else {
        console.error('UUID not found in the pathname');
      }
    }
  };

  const data = generateFieldItemData();

  useEffect(() => {
    if (updatePhonesSuccess) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [updatePhonesSuccess, dispatch, uuid]);

  useEffect(() => {
    setPhones(phoneData);
  }, [phoneData]);

  return (
    <>
      {phoneData.length ? (
        <FieldItem
          title="Phone number"
          data={data}
          editable
          onEdit={onMobileEdit}
          loading={isLoading}
        />
      ) : null}
    </>
  );
};

export default Phone;
