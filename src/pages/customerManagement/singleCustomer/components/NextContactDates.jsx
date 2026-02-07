import calendarIcon from 'assets/calendar-outline.svg';
import EmptyView from 'pages/components/emptyView';
import Timeline, { TimelineContent } from 'pages/components/timeline';
import { formatDateTime, getTimeFromDate } from 'utils/dateUtils';

export const NextContactDates = ({ followUps }) => {
  if (!followUps || followUps.length === 0) {
    return <EmptyView title="No next contact dates available" />;
  }
  return (
    <Timeline icon={calendarIcon}>
      {followUps.map((elm, i) => {
        return (
          <TimelineContent key={i}>
            <div>
              <p className="title">Next contact date</p>
              <p className="date">
                {formatDateTime(elm?.scheduledDateTime)}{' '}
                {getTimeFromDate(elm?.scheduledDateTime)}
              </p>
            </div>

            <div>
              <p className="user">Recipients: {elm.createdByName}</p>
              <p className="user">Notes: {elm.notes}</p>
            </div>
          </TimelineContent>
        );
      })}
    </Timeline>
  );
};
