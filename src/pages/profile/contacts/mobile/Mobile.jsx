import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Switch from 'common-ui/switch';
import {
  getUserProfileInfo,
  updateProfileContactsPhone,
} from 'features/profile/profileActions';
import {
  selectLoading,
  selectMobilePhones,
  selectUpdateContactsNumbersSuccess,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';

import { RightItemWrapper } from './Mobile.styles';

const infoTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const Mobile = () => {
  const mobileData = useSelector(selectMobilePhones);
  const [mobiles, setMobiles] = useState(mobileData);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const userType = localStorage.getItem('userType');
  const updateMobilesSuccess = useSelector(selectUpdateContactsNumbersSuccess);
  const isLoading = useSelector(selectLoading);

  const handleToggle = (id) => {
    const updatedMobiles = mobiles.map((item) =>
      item.uuid === id ? { ...item, disabled: !item.disabled } : item
    );

    setMobiles(updatedMobiles);

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
        isMobile: true,
        userType,
        uuid,
      })
    );
  };
  const generateFieldItemData = () => {
    return mobileData.map((item) => ({
      type: item.type,
      pending: item.pending,
      leftItem: item.contact,
      disabled: item.disabled,
      rightItem: (
        <RightItemWrapper>
          <ProfileInfoTag title={infoTagOptions[item.priority]} />
          {item.priority !== 4 && (
            <Switch
              isOn={item.disabled}
              onToggle={() => handleToggle(item.uuid)}
              disabled={item.pending}
            />
          )}
        </RightItemWrapper>
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
    if (updateMobilesSuccess) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [updateMobilesSuccess, dispatch, uuid]);

  useEffect(() => {
    setMobiles(mobileData);
  }, [mobileData]);

  return data.length > 0 ? (
    <FieldItem
      editable
      title="Mobile phone number"
      data={data}
      onEdit={onMobileEdit}
      loading={isLoading}
    />
  ) : (
    <></>
  );
};

export default Mobile;
