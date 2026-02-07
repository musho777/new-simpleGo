import { Children, cloneElement, isValidElement, useState } from 'react';

import PropTypes from 'prop-types';

import {
  HistoryIconContainer,
  HistoryRow,
  HorizontalTimelineConnector,
  Icon,
  IconWrapper,
  TimelineContent as StyledTimelineContent,
  TimelineContentWrapper as StyledTimelineContentWrapper,
  TimelineConnector,
  Timeline as TimelineContainer,
  TimelineItem,
  TimelineWrapper,
} from './Timeline.styles';

const Timeline = ({ children, icon, iconBackground }) => {
  const childrenArray = Children.toArray(children);

  return (
    <TimelineWrapper>
      <TimelineContainer>
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1;

          const childWithProps = isValidElement(child)
            ? cloneElement(child, { icon, iconBackground, ...child.props })
            : child;

          return (
            <TimelineItem key={index} $isLast={isLast}>
              <IconWrapper $background={iconBackground}>
                <Icon src={icon} alt="timeline-icon" />
              </IconWrapper>
              {!isLast && <TimelineConnector />}
              {childWithProps}
            </TimelineItem>
          );
        })}
      </TimelineContainer>
    </TimelineWrapper>
  );
};

Timeline.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string.isRequired,
  iconBackground: PropTypes.string,
};

export const TimelineContentWrapper = ({ children, history, icon, iconBackground }) => {
  const [openHistory, setOpenHistory] = useState(false);
  const hasHistory = history && history.length > 0;

  return (
    <StyledTimelineContentWrapper>
      <StyledTimelineContent
        $clickable={hasHistory}
        onClick={() => hasHistory && setOpenHistory(!openHistory)}
      >
        {children}
      </StyledTimelineContent>

      {hasHistory &&
        openHistory &&
        history.map((historyItem, index) => (
          <HistoryRow key={index}>
            <HistoryIconContainer>
              <HorizontalTimelineConnector />
              <IconWrapper $background={iconBackground}>
                <Icon src={icon} alt="timeline-icon" />
              </IconWrapper>
            </HistoryIconContainer>

            <StyledTimelineContent>{historyItem}</StyledTimelineContent>
          </HistoryRow>
        ))}
    </StyledTimelineContentWrapper>
  );
};

TimelineContentWrapper.propTypes = {
  children: PropTypes.node,
  history: PropTypes.arrayOf(PropTypes.node),
  icon: PropTypes.string,
  iconBackground: PropTypes.string,
};

// Export TimelineContent for direct use
export const TimelineContent = StyledTimelineContent;

export default Timeline;
