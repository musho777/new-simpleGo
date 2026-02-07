import { useCallback, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import emptyIcon from 'assets/profile/emptyIcon.svg';
import Switch from 'common-ui/switch';
import { SYSTEM_USERS, USERS } from 'constants/constants';
import { editAddress, getUserProfileInfo } from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectAddressSuccess,
  selectAddresses,
  selectLoading,
} from 'features/profile/profileSlice';
import EmptyView from 'pages/components/emptyView';
import FieldItem from 'pages/components/fieldItem';

const Addresses = () => {
  const data = useSelector(selectAddresses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { uuid } = useParams();
  const userType = localStorage.getItem('userType');
  const additionalInfo = useSelector(selectAdditionalInfo);
  const isLoading = useSelector(selectLoading);
  const updateSuccess = useSelector(selectAddressSuccess);

  const shouldDisableSwitch =
    (userType === 'Super Admin' && USERS.includes(additionalInfo?.role)) ||
    (userType === 'Hr Manager' && SYSTEM_USERS.includes(additionalInfo?.role));

  const addressTypes = useMemo(
    () => [
      { key: 'work', title: 'Work address', data: data.work },
      { key: 'home', title: 'Home address', data: data.home },
      { key: 'billing', title: 'Billing address', data: data.billing },
      { key: 'service', title: 'Service address', data: data.service },
      {
        key: 'pickupDelivery',
        title: 'Pickup and delivery address',
        data: data.delivery,
      },
    ],
    [data]
  );

  const handleToggle = useCallback(
    (id, type) => {
      const selectedData = data[type]?.find((item) => item.uuid === id);

      if (selectedData) {
        const updatedAddress = {
          addressId: selectedData.uuid,
          disabled: !selectedData.disabled,
          isNew: selectedData.type === 'add',
        };

        dispatch(
          editAddress({
            addressChanges: [updatedAddress],
            userType,
            uuid,
            type,
          })
        );
      }
    },
    [dispatch, data, userType, uuid]
  );

  const generateFieldItemData = useCallback(
    (data, type) =>
      data?.map((item) => ({
        uuid: item.uuid,
        pending: item.pending,
        disabled: item.disabled,
        leftItem: (
          <>
            {item.country ?? ''} {item.city ?? ''} {item.state ?? ''} {item.address1 ?? ''}
            {item.address2 ?? ''} {item.zip ?? ''}
          </>
        ),
        rightItem: (
          <Switch
            isOn={item.disabled}
            onToggle={() => handleToggle(item.uuid, type)}
            disabled={shouldDisableSwitch}
          />
        ),
      })),
    [handleToggle]
  );

  const onEdit = useCallback(
    (key) => {
      if (!uuid) {
        navigate(`${pathname}/edit`, {
          state: { key: key },
        });
      } else {
        const pathSegments = pathname.split('/');
        const uuidIndex = pathSegments.indexOf(uuid);

        if (uuidIndex > 0) {
          pathSegments.splice(uuidIndex, 0, 'edit');
          const updatedPath = pathSegments.join('/');
          navigate(updatedPath, {
            state: { key: key },
          });
        } else {
          console.error('UUID not found in the pathname');
        }
      }
    },
    [uuid, pathname, navigate]
  );

  const permissions = useMemo(
    () =>
      !uuid ||
      (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper && uuid),
    [uuid, userType, additionalInfo]
  );

  const hasData = useMemo(
    () => addressTypes.some(({ data }) => data?.length > 0),
    [addressTypes]
  );

  useEffect(() => {
    if (updateSuccess) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [updateSuccess, dispatch, uuid]);

  return (
    <>
      {isLoading || hasData ? (
        addressTypes.map(
          ({ key, title, data }) =>
            data?.length > 0 && (
              <FieldItem
                key={key}
                title={title}
                data={generateFieldItemData(data, key)}
                editable
                loading={isLoading}
                onEdit={() => onEdit(key)}
              />
            )
        )
      ) : (
        <EmptyView
          title={uuid ? 'No addresses yet' : 'You haven’t added any addresses yet.'}
          button={permissions}
          buttonTitle="+ Add addresses"
          icon={emptyIcon}
          onClick={() => onEdit('')}
        />
      )}
    </>
  );
};

export default Addresses;
