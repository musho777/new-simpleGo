import { useSelector } from 'react-redux';

import { selectNotifications } from 'features/notifications/notificationsSlice';
import EmptyView from 'pages/components/emptyView';

import { Container } from './Notifications.styles';
import Notification from './notification';

const Notifications = ({ notificationsOpen }) => {
  const notifications = useSelector(selectNotifications);

  return (
    <Container>
      {notifications.length > 0 ? (
        <Notification notificationsOpen={notificationsOpen} />
      ) : (
        <EmptyView description="No notifications" />
      )}
    </Container>
  );
};

export default Notifications;
