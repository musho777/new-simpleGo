import arrow from 'assets/customerManagement/arrow.svg';
import clock from 'assets/customerManagement/clock.svg';
import statusIcon from 'assets/customerManagement/statusIcon.svg';
import EmptyView from 'pages/components/emptyView';
import Tag from 'pages/components/tag';
import Timeline, { Icon, Row, TimelineContentWrapper } from 'pages/components/timeline';
import { formatDateTime } from 'utils/dateUtils';

import { StatusWrapper } from './Components.styles';

export const StatusTimeline = ({ statusHistory }) => {
  if (!statusHistory || statusHistory.length === 0) {
    return <EmptyView title="No status history available" />;
  }
  return (
    <Timeline
      icon={statusIcon}
      iconBackground="linear-gradient(135deg, #2d6cdf 0%, #1d3557 100%)"
    >
      {statusHistory?.map((elm, i) => {
        return (
          <TimelineContentWrapper
            key={i}
            // history={[
            //   <>
            //     <p className="title">Order Created</p>
            //     <p className="user">{elm?.changedByName}</p>
            //     <StatusWrapper>
            //       <Tag variant={'Pending'} type={'statuses'} />
            //       <Icon src={arrow} alt="statusIcon" />
            //       <Tag variant={'Enabled'} type={'statuses'} />
            //     </StatusWrapper>
            //     <Row>
            //       <Icon src={clock} alt="statusIcon" />
            //       <p className="user">10:30:00 AM</p>
            //     </Row>
            //   </>,
            // ]}
          >
            <p className="title">{elm?.changedByName}</p>
            <p className="user">{elm?.changedByName}</p>
            <StatusWrapper>
              <Tag variant={elm?.fromStatus} type={'statuses'} />
              <Icon src={arrow} alt="statusIcon" />
              <Tag variant={elm?.toStatus} type={'statuses'} />
            </StatusWrapper>

            <Row>
              <Icon src={clock} alt="statusIcon" />
              <p className="user">{formatDateTime(elm?.timestamp)}</p>
            </Row>
          </TimelineContentWrapper>
        );
      })}
    </Timeline>
  );
};
