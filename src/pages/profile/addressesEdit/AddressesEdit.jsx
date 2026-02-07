import { useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';

import deletePending from 'assets/deletePending.svg';
import pending from 'assets/pending.svg';
import Switch from 'common-ui/switch';
import { getUserProfileInfo } from 'features/profile/profileActions';
import {
  resetAddressSuccess,
  selectAdditionalInfo,
  selectAddressSuccess,
  selectAddresses,
  selectCreateAddressesSuccess,
  selectLoading,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';

import { PendingIcon, Tooltip, TooltipWrapper } from './AddressesEdit.styles';
import EditBilling from './editBilling';
import EditHome from './editHome';
import EditPickupDelivery from './editPickupDelivery';
import EditService from './editService';
import EditWork from './editWork';

const AddressesEdit = () => {
  const { uuid } = useParams();
  const [activeComponent, setActiveComponent] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [showEditAddButton, setShowEditAddButton] = useState(null);
  const createAddressesSuccess = useSelector(selectCreateAddressesSuccess);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const changeSuccess = useSelector(selectAddressSuccess);
  const isLoading = useSelector(selectLoading);
  const data = useSelector(selectAddresses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');
  const location = useLocation();
  const state = location.state?.key;
  const addressRefs = {
    work: useRef(null),
    home: useRef(null),
    billing: useRef(null),
    service: useRef(null),
    pickupDelivery: useRef(null),
  };

  const handleAddClick = (componentName) => {
    setShowEditAddButton('add');
    setActiveComponent(componentName);
  };

  const handleScrollTo = (type) => {
    const ref = addressRefs[type];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  };

  const handleCancel = () => {
    setShowEditAddButton(null);
    setActiveComponent(null);
    setIsEdit(null);
  };

  const showUpdates = useMemo(() => {
    return (
      (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper && !!uuid)
    );
  }, [userType, additionalInfo, uuid]);

  const handleNavigateProfile = (type) => {
    if (type === 'add') {
      navigate(`/profile/new/${additionalInfo.uuid}`);
    } else if (type === 'update' || type === 'remove') {
      navigate(`/profile/updates/${additionalInfo.uuid}`);
    }
  };

  const generateFieldItemData = (data) => {
    return data?.map((item) => ({
      uuid: item.uuid,
      leftItem: (
        <>
          {item.pending &&
            (showUpdates ? (
              <TooltipWrapper onClick={() => handleNavigateProfile(item.type)}>
                <PendingIcon
                  src={item.type === 'remove' ? deletePending : pending}
                  alt="Pending"
                  $eventsOff
                />
                <Tooltip>Pending approval, click to proceed!</Tooltip>
              </TooltipWrapper>
            ) : (
              <TooltipWrapper>
                <PendingIcon
                  src={item.type === 'remove' ? deletePending : pending}
                  alt="Pending"
                />
                <Tooltip>Pending</Tooltip>
              </TooltipWrapper>
            ))}
          {item.country ?? ''} {item.city ?? ''} {item.state ?? ''} {item.address1 ?? ''}
          {item.address2 ?? ''} {item.zip ?? ''}
        </>
      ),
      rightItem: <Switch isOn={item.disabled} />,
    }));
  };

  const addressTypes = [
    { key: 'work', title: 'Work address', Component: EditWork, data: data.work },
    { key: 'home', title: 'Home address', Component: EditHome, data: data.home },
    { key: 'billing', title: 'Billing address', Component: EditBilling, data: data.billing },
    { key: 'service', title: 'Service address', Component: EditService, data: data.service },
    {
      key: 'pickupDelivery',
      title: 'Pickup and delivery address',
      Component: EditPickupDelivery,
      data: data.delivery,
    },
  ];

  const onEdit = (key) => {
    setShowEditAddButton('edit');
    setActiveComponent(key);
    setIsEdit(key);
  };

  useEffect(() => {
    if (
      (createAddressesSuccess || changeSuccess) &&
      showEditAddButton === null &&
      !isLoading &&
      activeComponent === null
    ) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [createAddressesSuccess, changeSuccess, showEditAddButton]);

  useEffect(() => {
    if (changeSuccess) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
    dispatch(resetAddressSuccess());
  }, [changeSuccess]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (state) handleScrollTo(state);
    });
  }, [addressTypes, isLoading]);

  return (
    <>
      {addressTypes.map(
        ({ key, title, Component, data }) =>
          (!activeComponent || activeComponent === key) && (
            <FieldItem
              key={key}
              title={title}
              ref={addressRefs[key]}
              data={generateFieldItemData(data)}
              type={activeComponent !== null ? 'container' : ''}
              onEdit={() => onEdit(key)}
              editable={generateFieldItemData(data)?.length > 0}
              loading={isLoading}
            >
              <Component
                onEdit={() => handleAddClick(key)}
                onCancel={handleCancel}
                isEdit={isEdit}
                showEditAddButton={showEditAddButton}
              />
            </FieldItem>
          )
      )}
    </>
  );
};

export default AddressesEdit;
