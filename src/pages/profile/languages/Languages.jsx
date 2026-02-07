import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import emptyIcon from 'assets/profile/emptyIcon.svg';
import Switch from 'common-ui/switch';
import { SYSTEM_USERS, USERS } from 'constants/constants';
import { editLanguages, getUserProfileInfo } from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectLanguages,
  selectLoading,
  selectUpdateLanguagesSuccess,
} from 'features/profile/profileSlice';
import EmptyView from 'pages/components/emptyView';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';

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

const Languages = () => {
  const dataLanguages = useSelector(selectLanguages);
  const [languages, setLanguages] = useState(dataLanguages);
  const updateLanguagesSuccess = useSelector(selectUpdateLanguagesSuccess);
  const userType = localStorage.getItem('userType');
  const { pathname } = useLocation();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  const additionalInfo = useSelector(selectAdditionalInfo);

  const shouldDisableSwitch =
    (userType === 'Super Admin' && USERS.includes(additionalInfo?.role)) ||
    (userType === 'Hr Manager' && SYSTEM_USERS.includes(additionalInfo?.role));

  const handleToggle = (id) => {
    const updatedLanguages = languages.map((item) =>
      item.uuid === id ? { ...item, disabled: !item.disabled } : item
    );

    setLanguages(updatedLanguages);

    const updatedLanguage = updatedLanguages
      .filter((item) => item.uuid === id)
      .map((item) => ({
        languageId: item.uuid,
        disabled: item.disabled,
        isNew: item.type === 'add' ? true : false,
      }));

    dispatch(editLanguages({ languageChanges: updatedLanguage, uuid, userType }));
  };

  const generateFieldItemData = () => {
    return dataLanguages.map((item) => {
      return {
        type: item.type,
        pending: item.pending,
        disabled: item.disabled,
        leftItem: (
          <>
            <>{item.language}</>
          </>
        ),
        rightItem: (
          <>
            <ProfileInfoTag title={infoLevelOptions[item.level]} />
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
      };
    });
  };

  const data = generateFieldItemData();

  const onLanguageEdit = () => {
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

  const permissions =
    !uuid ||
    (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
    (userType === 'Super Admin' && additionalInfo.isSuper && uuid);

  const fullLanguagesData = [...data];

  useEffect(() => {
    if (updateLanguagesSuccess) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [updateLanguagesSuccess, dispatch, uuid]);

  useEffect(() => {
    setLanguages(dataLanguages);
  }, [dataLanguages]);

  return (
    <>
      {isLoading || fullLanguagesData.length > 0 ? (
        <FieldItem
          title="Languages"
          data={fullLanguagesData}
          editable
          onEdit={onLanguageEdit}
          loading={isLoading}
        />
      ) : (
        <EmptyView
          title={uuid ? 'No languages yet' : 'You haven’t added any languages yet.'}
          button={permissions}
          buttonTitle="+ Add languages"
          icon={emptyIcon}
          onClick={onLanguageEdit}
          loading={isLoading}
          permissions={permissions}
        />
      )}
    </>
  );
};

export default Languages;
