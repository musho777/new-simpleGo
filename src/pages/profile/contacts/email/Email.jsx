import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Switch from 'common-ui/switch';
import { SYSTEM_USERS, USERS } from 'constants/constants';
import {
  getUserProfileInfo,
  updateProfileContactsEmail,
} from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectEmails,
  selectLoading,
  selectUpdateContactsEmailSuccess,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';

const infoTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const Email = () => {
  const emailData = useSelector(selectEmails);
  const [emails, setEmails] = useState(emailData);
  const { pathname } = useLocation();
  const { uuid } = useParams();
  const userType = localStorage.getItem('userType');
  const additionalInfo = useSelector(selectAdditionalInfo);
  const isLoading = useSelector(selectLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateEmailsSuccess = useSelector(selectUpdateContactsEmailSuccess);

  const shouldDisableSwitch =
    (userType === 'Super Admin' && USERS.includes(additionalInfo?.role)) ||
    (userType === 'Hr Manager' && SYSTEM_USERS.includes(additionalInfo?.role));

  const checkPermition =
    uuid &&
    ((userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper));

  const handleToggle = (id) => {
    const updatedEmails = emails.map((item) =>
      item.uuid === id ? { ...item, disabled: !item.disabled } : item
    );

    setEmails(updatedEmails);

    const updatedEmail = updatedEmails
      .filter((item) => item.uuid === id)
      .map((item) => ({
        contactId: item.uuid,
        disabled: item.disabled,
        isNew: item.type === 'add' ? true : false,
      }));

    dispatch(updateProfileContactsEmail({ emailChanges: updatedEmail, userType, uuid }));
  };

  const generateFieldItemData = () => {
    return emailData.map((item) => ({
      type: item.type,
      pending: item.pending,
      leftItem: item.contact,
      rightItem: (
        <>
          <ProfileInfoTag title={infoTagOptions[item.priority]} />
          {item.priority !== 4 && checkPermition && (
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

  const onEmailEdit = () => {
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
  const fullEmailData = [
    ...[
      {
        leftItem: additionalInfo.email,
        rightItem: <ProfileInfoTag title="Highest" />,
      },
    ],
    ...data,
  ];

  useEffect(() => {
    if (updateEmailsSuccess) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [updateEmailsSuccess, dispatch, uuid]);

  useEffect(() => {
    setEmails(emailData);
  }, [emailData]);

  return (
    <>
      <FieldItem
        title="Email addresses"
        data={fullEmailData}
        editable
        onEdit={onEmailEdit}
        loading={isLoading}
      />
    </>
  );
};

export default Email;
