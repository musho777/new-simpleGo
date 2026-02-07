import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AdditionalInfo from 'assets/profile/additionalInfo.svg';
import AdditionalInfoActive from 'assets/profile/additionalInfoActive.svg';
import Addresses from 'assets/profile/addresses.svg';
import AddressesActive from 'assets/profile/addressesActive.svg';
import Contacts from 'assets/profile/contacts.svg';
import ContactsActive from 'assets/profile/contactsActive.svg';
import Languages from 'assets/profile/languages.svg';
import LanguagesActive from 'assets/profile/languagesActive.svg';
import PersonalInfo from 'assets/profile/personalInfo.svg';
import PersonalInfoActive from 'assets/profile/personalInfoActive.svg';
import Skills from 'assets/profile/skills.svg';
import SkillsActive from 'assets/profile/skillsActive.svg';
import { selectAdditionalInfo } from 'features/profile/profileSlice';

import { Icon, SidebarContainer, SidebarHeader, SidebarOption } from './AboutSidebar.styles';
import down from './down.svg';
import up from './up.svg';

const options = [
  {
    label: 'Additional info',
    route: '/profile/additional-info/edit',
    icons: {
      active: AdditionalInfoActive,
      inactive: AdditionalInfo,
    },
    showCondition: (userType, additionalInfo, uuid) =>
      (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper && uuid),
  },
  {
    label: 'Personal info',
    route: '/profile/personal-info/edit',
    icons: {
      active: PersonalInfoActive,
      inactive: PersonalInfo,
    },
  },
  {
    label: 'Contacts',
    route: '/profile/contacts/edit',
    icons: {
      active: ContactsActive,
      inactive: Contacts,
    },
  },
  {
    label: 'Addresses',
    route: '/profile/addresses/edit',
    icons: {
      active: AddressesActive,
      inactive: Addresses,
    },
  },
  {
    label: 'Skills',
    route: '/profile/skills/edit',
    icons: {
      active: SkillsActive,
      inactive: Skills,
    },
  },
  {
    label: 'Languages',
    route: '/profile/languages/edit',
    icons: {
      active: LanguagesActive,
      inactive: Languages,
    },
  },
];

const AboutSidebar = () => {
  const { uuid } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const additionalInfo = useSelector(selectAdditionalInfo);
  const userType = localStorage.getItem('userType');
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleNavigation = (route) => {
    if (uuid) {
      navigate(`${route}/${uuid}`);
    } else {
      navigate(route);
    }
  };

  const triggerInfo = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader $hideBorder={isMobile && !isOpen}>
        About
        {isMobile && (
          <div onClick={triggerInfo}>
            <Icon src={isOpen ? up : down} />
          </div>
        )}
      </SidebarHeader>
      {(!isMobile || (isMobile && isOpen)) && (
        <>
          {options
            .filter((option) =>
              option.showCondition
                ? option.showCondition(userType, additionalInfo, uuid)
                : true
            )
            .map((option) => {
              const isActive =
                pathname === option.route || pathname === `${option.route}/${uuid}`;
              const isHovered = hoveredOption === option.route;
              const iconUrl =
                isActive || isHovered ? option.icons.active : option.icons.inactive;

              return (
                <SidebarOption
                  key={option.route}
                  $isActive={isActive}
                  onMouseEnter={() => setHoveredOption(option.route)}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={() => handleNavigation(option.route)}
                >
                  <Icon src={iconUrl} alt={`${option.label} icon`} />
                  {option.label}
                </SidebarOption>
              );
            })}
        </>
      )}
    </SidebarContainer>
  );
};

export default AboutSidebar;
