import { useState } from 'react';

import { useSelector } from 'react-redux';

import right from 'assets/right-black.svg';
import close from 'assets/singleTicket/appointment/close.svg';
import durationIcon from 'assets/singleTicket/appointment/duration.svg';
import emailIcon from 'assets/singleTicket/appointment/email.svg';
import frequencyIcon from 'assets/singleTicket/appointment/frequency.svg';
import phoneCallIcon from 'assets/singleTicket/appointment/phone-call.svg';
import reminderIcon from 'assets/singleTicket/appointment/reminder.svg';
import serviceIcon from 'assets/singleTicket/appointment/service.svg';
import textMessageIcon from 'assets/singleTicket/appointment/text-message.svg';
import timezoneIcon from 'assets/singleTicket/appointment/timezone.svg';
import {
  TICKET_APPOINTMENT_DURATION_OPTIONS,
  TICKET_APPOINTMENT_REMINDER_OPTIONS,
} from 'constants/constants';
import { selectSingleTicket } from 'features/projectManagement/ProjectManagementSlice';
import { formatDateTime } from 'utils/dateUtils';

import {
  AppointmentLabel,
  AppointmentValue,
  CloseContainer,
  CloseIconWrapper,
  Container,
  DescriptionArea,
  DetailColumn,
  DetailIcon,
  Details,
  DisplayFlex,
  Icon,
  MarginRightFifty,
  MarginWeekDay,
  Row,
  WeeklyLine,
} from './Appointment.styles';

const weekdayView = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const getDurationView = (d) => {
  const result = TICKET_APPOINTMENT_DURATION_OPTIONS.find(
    (duration) => duration.value === String(d)
  );

  return result ? result.label : null;
};

const getReminderView = (d) => {
  const result = TICKET_APPOINTMENT_REMINDER_OPTIONS.find(
    (reminder) => reminder.value === String(d)
  );

  return result ? result.label : null;
};

const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const Appointment = ({ highlighted = false }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const ticket = useSelector(selectSingleTicket);
  const appointment = ticket.appointment;

  const handleShowDetails = () => {
    setDetailsOpen((prev) => !prev);
  };

  return (
    <Container $active={detailsOpen} $highlighted={highlighted}>
      <MarginRightFifty>{appointment?.location}</MarginRightFifty>
      {appointment.frequency !== 'Weekly' ? (
        <>
          <p>
            {appointment.frequency !== 'Daily'
              ? formatDateTime(appointment?.date)
              : 'Every day'}
          </p>
          <p>{formatTime(appointment?.time)}</p>
        </>
      ) : (
        <WeeklyLine>
          {appointment?.weekdays?.map((item, index) => (
            <DisplayFlex key={`weekday-${index}`}>
              <MarginWeekDay>{weekdayView[item.weekday]}</MarginWeekDay>
              <p>
                {item.time}
                {index !== appointment?.weekdays?.length - 1 && ','}{' '}
              </p>
            </DisplayFlex>
          ))}
        </WeeklyLine>
      )}
      <div onClick={handleShowDetails}>
        <Icon src={right} alt="right" />
      </div>
      {detailsOpen && (
        <Details>
          <CloseContainer>
            <CloseIconWrapper onClick={handleShowDetails}>
              <Icon src={close} />
            </CloseIconWrapper>
          </CloseContainer>
          <DetailColumn>
            <Row>
              <DetailIcon src={serviceIcon} />
              <AppointmentLabel>Service</AppointmentLabel>
              <AppointmentValue>{appointment?.service}</AppointmentValue>
            </Row>
            <Row>
              <DetailIcon src={timezoneIcon} />
              <AppointmentLabel>Timezone</AppointmentLabel>
              <AppointmentValue>{appointment?.timezone.name}</AppointmentValue>
            </Row>
            <Row>
              <DetailIcon src={frequencyIcon} />
              <AppointmentLabel>Frequency</AppointmentLabel>
              <AppointmentValue>{appointment?.frequency}</AppointmentValue>
            </Row>
            <Row>
              <DetailIcon src={durationIcon} />
              <AppointmentLabel>Duration</AppointmentLabel>
              <AppointmentValue>{getDurationView(appointment?.duration)}</AppointmentValue>
            </Row>
            <Row>
              <DetailIcon src={reminderIcon} />
              <AppointmentLabel>Reminder</AppointmentLabel>
              <AppointmentValue>{getReminderView(appointment?.reminder)}</AppointmentValue>
            </Row>
            {appointment?.communicationMethod.phoneCall && (
              <Row>
                <DetailIcon src={phoneCallIcon} />
                <AppointmentLabel>Phone call</AppointmentLabel>
                <AppointmentValue>
                  {appointment?.communicationMethod.phoneCall}
                </AppointmentValue>
              </Row>
            )}
            {appointment?.communicationMethod.textMessage && (
              <Row>
                <DetailIcon src={textMessageIcon} />
                <AppointmentLabel>Text message</AppointmentLabel>
                <AppointmentValue>
                  {appointment?.communicationMethod.textMessage}
                </AppointmentValue>
              </Row>
            )}
            {appointment?.communicationMethod.email && (
              <Row>
                <DetailIcon src={emailIcon} />
                <AppointmentLabel>Email</AppointmentLabel>
                <AppointmentValue>{appointment?.communicationMethod.email}</AppointmentValue>
              </Row>
            )}
          </DetailColumn>

          {appointment.description && (
            <DescriptionArea>{appointment.description}</DescriptionArea>
          )}
        </Details>
      )}
    </Container>
  );
};

export default Appointment;
