import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import emptyIcon from 'assets/profile/emptyIcon.svg';
import Switch from 'common-ui/switch';
import { SYSTEM_USERS, USERS } from 'constants/constants';
import { editSkills, getUserProfileInfo } from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectLoading,
  selectSkills,
  selectUpdateSkillsSuccess,
} from 'features/profile/profileSlice';
import EmptyView from 'pages/components/emptyView';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { capitalizeFirstLetter } from 'utils';

const infoTagOptions = { 1: 'Intern', 2: 'Junior', 3: 'Middle', 4: 'Senior', 5: 'Master' };

const Skills = () => {
  const dataSkills = useSelector(selectSkills);
  const { pathname } = useLocation();
  const userType = localStorage.getItem('userType');
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateSkillsSuccess = useSelector(selectUpdateSkillsSuccess);
  const isLoading = useSelector(selectLoading);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const [skills, setSkills] = useState(dataSkills);

  const shouldDisableSwitch =
    (userType === 'Super Admin' && USERS.includes(additionalInfo?.role)) ||
    (userType === 'Hr Manager' && SYSTEM_USERS.includes(additionalInfo?.role));

  const handleToggle = (id) => {
    const updatedSkills = skills.map((item) =>
      item.uuid === id ? { ...item, disabled: !item.disabled } : item
    );

    setSkills(updatedSkills);

    const updatedSkill = updatedSkills
      .filter((item) => item.uuid === id)
      .map((item) => ({
        skillId: item.uuid,
        disabled: item.disabled,
        isNew: item.type === 'add' ? true : false,
      }));

    dispatch(editSkills({ skillChanges: updatedSkill, userType, uuid }));
  };

  const generateFieldItemData = useMemo(() => {
    return skills.map((item) => {
      const { pending, skill, level, uuid, disabled, type } = item;

      return {
        type,
        pending,
        disabled,
        leftItem: (
          <>
            <>{capitalizeFirstLetter(skill)}</>
          </>
        ),
        rightItem: (
          <>
            <ProfileInfoTag title={infoTagOptions[+level]} />
            <Switch
              isOn={disabled}
              onToggle={() => handleToggle(uuid)}
              disabled={pending || shouldDisableSwitch}
            />
          </>
        ),
      };
    });
  }, [skills]);

  const onSkillEdit = () => {
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

  const fullSkillsData = [...generateFieldItemData];

  const permissions =
    !uuid ||
    (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
    (userType === 'Super Admin' && additionalInfo.isSuper && uuid);

  useEffect(() => {
    if (updateSkillsSuccess) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [updateSkillsSuccess, dispatch, uuid]);

  useEffect(() => {
    setSkills(dataSkills);
  }, [dataSkills]);

  return (
    <>
      {isLoading || fullSkillsData.length > 0 ? (
        <FieldItem
          title="Skills"
          data={fullSkillsData}
          editable
          onEdit={onSkillEdit}
          loading={isLoading}
        />
      ) : (
        <EmptyView
          title={uuid ? 'No skills yet' : 'You haven’t added any skills yet.'}
          button={permissions}
          buttonTitle="+ Add skills"
          icon={emptyIcon}
          onClick={onSkillEdit}
        />
      )}
    </>
  );
};

export default Skills;
