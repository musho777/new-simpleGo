import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  selectAdditionalInfo,
  selectNewChangesCount,
  selectShowSchedule,
  selectUpdateChangesCount,
} from 'features/profile/profileSlice';

import { NavContainer, Row, TabButton } from './Navigation.styles';

const Navigation = ({ tabs: propTabs, hideUpdateRequest }) => {
  const newCount = useSelector(selectNewChangesCount);
  const updateCount = useSelector(selectUpdateChangesCount);
  const userType = localStorage.getItem('userType');
  const showSchedules = useSelector(selectShowSchedule);
  const additionalInfo = useSelector(selectAdditionalInfo);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { uuid } = useParams();

  const showUpdates =
    uuid &&
    ((userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper));

  const defaultTabs =
    (uuid && pathname.includes('new')) || pathname.includes('updates')
      ? [
          {
            name: `New (${newCount})`,
            path: `/profile/new`,
            disabled: newCount === 0,
          },
          {
            name: `Updates (${updateCount})`,
            path: `/profile/updates`,
            disabled: updateCount === 0,
          },
        ]
      : [
          { name: 'Contacts', path: `/profile/contacts` },
          { name: 'Addresses', path: '/profile/addresses' },
          { name: 'Skills', path: '/profile/skills' },
          { name: 'Languages', path: '/profile/languages' },
          ...((!uuid || showSchedules) && additionalInfo.isVerified
            ? [{ name: 'Schedules', path: '/profile/schedule' }]
            : []),
        ];

  const tabs = propTabs || defaultTabs;

  const handleTabClick = (path, disabled, search) => {
    if (disabled) return;
    if (uuid) {
      navigate({ pathname: `${path}/${uuid}`, search: search });
    } else {
      navigate({ pathname: path, search: search });
    }
  };

  const handleNavigateProfile = () => {
    navigate(`/profile/contacts/${uuid}`);
  };

  const handleNavigateChanges = () => {
    if (newCount !== 0) {
      navigate(`/profile/new/${uuid}`);
    } else if (updateCount !== 0) {
      navigate(`/profile/updates/${uuid}`);
    }
  };

  useEffect(() => {
    if (
      (newCount === 0 && updateCount === 0 && pathname.includes('new')) ||
      (newCount === 0 && updateCount === 0 && pathname.includes('updates'))
    ) {
      navigate(`/profile/contacts/${uuid}`, { replace: true });
    }
  }, [newCount, updateCount, pathname, navigate, uuid]);

  return (
    <Row>
      <NavContainer
        $hrTab={(uuid && pathname.includes('new')) || pathname.includes('updates')}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            $isActive={
              tab.active !== undefined
                ? tab.active
                : pathname === tab.path || pathname === `${tab.path}/${uuid}`
            }
            onClick={() => handleTabClick(tab.path, tab.disabled, tab.search)}
            disabled={tab.disabled}
          >
            {tab.name}
          </TabButton>
        ))}
      </NavContainer>

      {(newCount !== 0 || updateCount !== 0) && !!showUpdates && (
        <>
          {pathname.includes('new') || pathname.includes('updates') ? (
            <NavContainer className="w-p">
              {!hideUpdateRequest && (
                <TabButton onClick={handleNavigateProfile}>Back to profile</TabButton>
              )}
            </NavContainer>
          ) : (
            <NavContainer className="w">
              {!hideUpdateRequest && (
                <TabButton onClick={handleNavigateChanges}>
                  Update requests ({newCount + updateCount})
                </TabButton>
              )}
            </NavContainer>
          )}
        </>
      )}
    </Row>
  );
};

export default Navigation;
