import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import more from 'assets/more.svg';
import acceptable from 'assets/notifications/acceptable.svg';
import appointment from 'assets/notifications/appointment.svg';
import checkmark from 'assets/notifications/checkmark.svg';
import dismiss from 'assets/notifications/dismiss.svg';
import mark from 'assets/notifications/mark.svg';
import newIcon from 'assets/notifications/new.svg';
import reminder from 'assets/notifications/reminder.svg';
import unacceptable from 'assets/notifications/unacceptable.svg';
import unassign from 'assets/notifications/unassign.svg';
import update from 'assets/notifications/update.svg';
import Button from 'common-ui/button';
import { formatDistanceToNow } from 'date-fns';
import {
  dismissNotification,
  readNotification,
} from 'features/notifications/notificationsActions';
import { selectLoading, selectNotifications } from 'features/notifications/notificationsSlice';
import { readableDateFormat } from 'utils/dateUtils';

import {
  Container,
  Content,
  Description,
  Footer,
  Icon,
  MenuDropdown,
  MenuItem,
  NewIcon,
  NotificationCard,
  NotificationHeader,
  NotificationIcon,
  TimeText,
  Title,
} from './Notification.styles';

const getNotificationIcon = (action) => {
  switch (action) {
    case 'assigned':
      return checkmark;
    case 'update':
      return update;
    case 'unassign':
      return unassign;
    case 'appointment':
      return appointment;
    case 'acceptable':
      return acceptable;
    case 'unacceptable':
      return unacceptable;
    case 'reminder':
      return reminder;

    default:
      return update;
  }
};

const formatDate = (dateString) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

const Notification = ({ notificationsOpen }) => {
  const menuRef = useRef(null);
  const [openMenu, setOpenMenu] = useState({});

  const notifications = useSelector(selectNotifications);
  const isLoading = useSelector(selectLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading.tickets) {
    return <Container>Loading...</Container>;
  }

  const handleSingleTicketNavigate = (id, type) => {
    notificationsOpen(false);
    if (type === 2) {
      navigate('/profile/schedule');
      return;
    } else if (type === 5) {
      navigate(`/finance/finance-request/${id}`);
      return;
    } else if (type === 6) {
      navigate(`/leads/${id}`);
      return;
    }

    if (!id) return;

    const navigationState =
      type === 0 ? { scrollToAppointment: true } : { scrollToLastUpdate: true };

    navigate(`/project-management/ticket/${id}`, {
      state: navigationState,
    });
  };

  const handleMarkAsRead = (notificationId) => {
    event.stopPropagation();
    dispatch(readNotification({ notificationId }));
    setOpenMenu({});
  };

  const handleDismiss = (uuid) => {
    dispatch(dismissNotification(uuid));
    setOpenMenu({});
  };

  const toggleMenu = (notificationId, isOpen) => {
    setOpenMenu((prev) => ({
      ...prev,
      [notificationId]: isOpen,
    }));
  };
  return (
    <Container>
      {notifications?.map((notification) => (
        <NotificationCard
          key={notification.uuid}
          $unread={!notification.read}
          onClick={() => handleMarkAsRead(notification.uuid)}
        >
          <NotificationIcon src={getNotificationIcon(notification.action)} alt="icon" />
          <Content>
            <NotificationHeader>
              {!notification.read && <NewIcon src={newIcon} alt="icon" />}
              <Title $unread={!notification.read}>{notification.title}</Title>

              <div
                style={{
                  position: 'relative',
                  padding: '4px 6px',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  alignItems: 'center',
                }}
                onMouseEnter={() => toggleMenu(notification.uuid, true)}
              >
                <Icon src={more} />
                {openMenu[notification.uuid] && (
                  <MenuDropdown
                    ref={menuRef}
                    id={`notification-menu-${notification.uuid}`}
                    onMouseEnter={() => toggleMenu(notification.uuid, true)}
                    onMouseLeave={() => toggleMenu(notification.uuid, false)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MenuItem
                      onClick={() => handleMarkAsRead(notification.uuid)}
                      id="notification-menu"
                    >
                      <Icon src={mark} alt="mark" />
                      Mark as read
                    </MenuItem>
                    <MenuItem onClick={() => handleDismiss(notification.uuid)}>
                      <Icon src={dismiss} alt="dismiss" />
                      Dismiss
                    </MenuItem>
                  </MenuDropdown>
                )}
              </div>
            </NotificationHeader>

            <Description>
              {notification.type === 6 ? (
                notification.description
              ) : notification.changeType ? (
                <>
                  Ticket: <span>#{notification.targetId}</span> {notification.changeType}{' '}
                  changed
                  {' from '}
                  <i>
                    &quot;
                    {notification.isDate
                      ? readableDateFormat(notification.oldValue)
                      : notification.oldValue}
                    &quot;
                  </i>
                  {' to '}
                  <i>
                    &quot;
                    {notification.isDate
                      ? readableDateFormat(notification.newValue)
                      : notification.newValue}
                    &quot;
                  </i>
                </>
              ) : (
                <>
                  {notification.type !== 2 && notification.title !== 'Attention!' && (
                    <>
                      {notification.type === 5 ? 'Finance Request' : 'Ticket'}:{' '}
                      <span>#{notification.targetId}</span>
                    </>
                  )}
                  {notification.description}
                </>
              )}
            </Description>

            <Footer>
              {notification.title !== 'Attention!' ? (
                <Button
                  secondary
                  onClick={() =>
                    handleSingleTicketNavigate(
                      notification.targetUuid,
                      notification.type,
                      notification.action
                    )
                  }
                  className={`${notification.type === 1 ? 'ticket' : 'appointment'}`}
                >
                  View{' '}
                  {notification.type === 1
                    ? 'ticket'
                    : notification.type === 2
                      ? 'schedule'
                      : notification.type === 5
                        ? 'requests'
                        : notification.type === 6
                          ? 'lead'
                          : 'appointment'}
                </Button>
              ) : (
                <div />
              )}
              <TimeText>{formatDate(notification.createdAt)}</TimeText>
            </Footer>
          </Content>
        </NotificationCard>
      ))}
    </Container>
  );
};

export default Notification;
