import React, { useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import bell from 'assets/header/bell.svg';
import inventory from 'assets/header/inventory.svg';
import logout from 'assets/header/logout.svg';
import menu from 'assets/header/menu.svg';
import profile from 'assets/header/profile.svg';
import user from 'assets/header/user.svg';
import more from 'assets/more.svg';
import mark from 'assets/notifications/mark.svg';
import Button from 'common-ui/button';
import { userLogout } from 'features/auth/authActions';
import { selectUserInfo } from 'features/auth/authSlice';
import { setShowNavbar } from 'features/components/componentsSlice';
import {
  getNotifications,
  readNotification,
} from 'features/notifications/notificationsActions';
import { selectNewCount } from 'features/notifications/notificationsSlice';
import Notifications from 'pages/notifications';

import {
  Container,
  Div,
  Dropdown,
  DropdownItem,
  Group,
  Icon,
  MenuDropdown,
  MenuIcon,
  MenuItem,
  NotificationButtonWrapper,
  NotificationContent,
  NotificationCountWrapper,
  NotificationHeader,
  NotificationTitle,
  UserIcon,
} from './Header.styles';
import Toggle from './NotifToggle';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [filters, setFilters] = useState(['all']);

  const userInfo = useSelector(selectUserInfo);
  const newCount = useSelector(selectNewCount);
  const userType = localStorage.getItem('userType');

  const { pathname } = useLocation();
  const userIconRef = useRef(null);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleShowNavbar = () => {
    dispatch(setShowNavbar(true));
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleNavigateProfile = () => {
    navigate('/profile/contacts');
    setIsDropdownOpen(false);
  };
  const handleNavigatePersonalInventory = () => {
    navigate('/personal/inventory?limit=10&offset=0&usage=Personal+use&view=list');
    setIsDropdownOpen(false);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        userIconRef.current &&
        !userIconRef.current.contains(event.target) &&
        !event.target.closest('#dropdown-container')
      ) {
        setIsDropdownOpen(false);
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }

      if (
        notificationsOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !event.target.closest('.notification-button')
      ) {
        setNotificationsOpen(false);
      }
    },
    [notificationsOpen]
  );

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
      setNotificationsOpen(false);
    }
  }, []);

  const handleOpenCloseNotifs = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const handleMarkAllAsRead = () => {
    dispatch(readNotification({ all: true }));
  };

  useEffect(() => {
    const payload = {
      limit: 100,
      offset: 0,
      onlyAppointment: filters.includes('appointment'),
      onlyNew: filters.includes('unread'),
      onlyFinance: filters.includes('financial'),
      onlyLeads: filters.includes('sales'),
    };
    dispatch(getNotifications(payload));
  }, [filters, pathname]);

  useEffect(() => {
    if (isDropdownOpen || isMenuOpen || notificationsOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, isMenuOpen, notificationsOpen, handleClickOutside, handleKeyDown]);

  const renderDropdown = () => (
    <Dropdown id="dropdown-container">
      {userType !== 'Super Admin' && (
        <DropdownItem onClick={handleNavigateProfile}>
          <Icon src={profile} alt="l" className="menu-icon" />
          Profile
        </DropdownItem>
      )}
      {userType !== 'Super Admin' && (
        <DropdownItem onClick={handleNavigatePersonalInventory}>
          <Icon src={inventory} alt="l" className="menu-icon" />
          Inventory
        </DropdownItem>
      )}
      <DropdownItem onClick={handleLogout}>
        <Icon src={logout} alt="l" className="menu-icon" />
        Logout
      </DropdownItem>
    </Dropdown>
  );

  const renderNotificationMenu = () => (
    <MenuDropdown ref={menuRef} id="notification-menu" onClick={(e) => e.stopPropagation()}>
      <MenuItem onClick={handleMarkAllAsRead}>
        <Icon src={mark} alt="mark" />
        Mark all as read
      </MenuItem>
    </MenuDropdown>
  );

  const renderNotificationContainer = () => (
    <NotificationContent id="notification-container" ref={notificationRef}>
      <NotificationHeader>
        <NotificationTitle>Notifications</NotificationTitle>
        <div
          style={{ position: 'relative', padding: '4px 6px', cursor: 'pointer' }}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <Icon src={more} />
          {isMenuOpen && createPortal(renderNotificationMenu(), document.body)}
        </div>
      </NotificationHeader>
      <Toggle onChange={handleFilterChange} />
      <Notifications notificationsOpen={setNotificationsOpen} />
    </NotificationContent>
  );

  return (
    <Container>
      <Div>
        <MenuIcon src={menu} alt="menu" onClick={handleShowNavbar} />
      </Div>
      <Group>
        <NotificationButtonWrapper>
          <Button outlined onClick={handleOpenCloseNotifs} className="notification-button">
            <Icon src={bell} alt="notifications" />
          </Button>
          {newCount > 0 && (
            <NotificationCountWrapper>
              {newCount > 9 ? '9+' : newCount}
            </NotificationCountWrapper>
          )}
        </NotificationButtonWrapper>
        <UserIcon
          ref={userIconRef}
          src={userInfo?.photo ?? user}
          alt="user"
          onClick={handleToggleDropdown}
        />
      </Group>
      {isDropdownOpen && createPortal(renderDropdown(), document.body)}
      {notificationsOpen && createPortal(renderNotificationContainer(), document.body)}
    </Container>
  );
};

export default Header;
