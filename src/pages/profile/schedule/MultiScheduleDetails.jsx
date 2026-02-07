import React, { useMemo } from 'react';

import EditIcon from 'assets/edit.svg';
import pocket from 'assets/pocket.svg';
import salary from 'assets/salary.svg';
import dates from 'assets/singleTicket/date.png';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { TICKET_APPOINTMENT_WEEKDAY_OPTIONS } from 'constants/constants';
import Tag from 'pages/components/tag';
import { formatDateTime } from 'utils/dateUtils';

import {
  DetailLabel,
  ExpandedLabel,
  ExpandedValue,
  Footer,
  Header,
  Icon,
  MobileRow,
  MultiContainer,
  RowDetails,
} from './Schedule.styles';
import rateIcon from './rates.svg';

const getFormattedWeekdays = (selectedDays) => {
  if (!selectedDays?.length) return '';

  const orderedDays = TICKET_APPOINTMENT_WEEKDAY_OPTIONS.map((o) => o.value);
  const labelsMap = Object.fromEntries(
    TICKET_APPOINTMENT_WEEKDAY_OPTIONS.map((o) => [o.value, o.label])
  );

  const sortedDays = [...selectedDays].sort(
    (a, b) => orderedDays.indexOf(a) - orderedDays.indexOf(b)
  );

  const result = [];
  let rangeStart = sortedDays[0];

  for (let i = 1; i <= sortedDays.length; i++) {
    const prevDay = sortedDays[i - 1];
    const currentDay = sortedDays[i];

    if (orderedDays.indexOf(currentDay) === orderedDays.indexOf(prevDay) + 1) continue;

    if (rangeStart !== prevDay) {
      result.push(`${labelsMap[rangeStart]} - ${labelsMap[prevDay]}`);
    } else {
      result.push(labelsMap[prevDay]);
    }
    rangeStart = currentDay;
  }

  return result.join(', ');
};

const MultiScheduleDetails = ({ data, userType, onEdit, uuid, style = 'new' }) => {
  const columns = useMemo(
    () => [
      { title: 'Shift name', dataIndex: 'scheduleName', key: 'scheduleName' },
      { title: 'Shift time', dataIndex: 'shiftTime', key: 'shiftTime' },
      {
        title: 'Workdays',
        dataIndex: 'workdays',
        key: 'workdays',
        render: (workdays) => getFormattedWeekdays(workdays),
      },
      { title: 'Timezone', dataIndex: 'timezone', key: 'timezone' },
      {
        title: 'Effective date',
        dataIndex: 'effectiveDate',
        key: 'effectiveDate',
        render: formatDateTime,
      },
    ],
    []
  );

  const mobileColumns = useMemo(
    () => [
      { title: 'Shift name', dataIndex: 'scheduleName', key: 'scheduleName' },
      { title: 'Shift time', dataIndex: 'shiftTime', key: 'shiftTime' },
    ],
    []
  );

  const renderExpandableContent = (row) => (
    <>
      <MobileRow>
        <ExpandedLabel>Workdays</ExpandedLabel>
        <ExpandedValue>{getFormattedWeekdays(row.workdays)}</ExpandedValue>
      </MobileRow>
      <MobileRow>
        <ExpandedLabel>Timezone</ExpandedLabel>
        <ExpandedValue>{row.timezone}</ExpandedValue>
      </MobileRow>
      <MobileRow>
        <ExpandedLabel>Effective date:</ExpandedLabel>
        <ExpandedValue>{formatDateTime(row.effectiveDate)}</ExpandedValue>
      </MobileRow>
    </>
  );

  const ratesMap = {
    Overtime: data?.rates?.overtimeRate,
    Night: data?.rates?.nightRate,
    Weekend: data?.rates?.weekendRate,
    Holiday: data?.rates?.holidayRate,
  };

  return (
    <MultiContainer>
      <Header>
        <RowDetails style={{ gap: '40px' }}>
          <RowDetails>
            <Icon src={salary} alt="Salary type" />
            <DetailLabel>Salary type:</DetailLabel>
            <Tag type="ticketStatuses" variant={data.salaryType} />
          </RowDetails>
          <RowDetails>
            <Icon src={pocket} alt="Salary amount" />
            <DetailLabel>Salary amount:</DetailLabel>
            {data.salary} {data.currency}
          </RowDetails>
          {data.expirationDate && (
            <RowDetails style={{ color: '#E63946' }}>
              <Icon src={dates} alt="Date" style={{ width: '15px' }} />
              <DetailLabel>Expired date:</DetailLabel>
              {formatDateTime(data.expirationDate)}
            </RowDetails>
          )}
        </RowDetails>

        {data?.rates && (
          <RowDetails>
            <Icon src={rateIcon} alt="Rates" />
            <DetailLabel>Out of shift rates:</DetailLabel>
            {Object.entries(ratesMap).map(([label, value]) => (
              <React.Fragment key={label}>
                <DetailLabel>{label}:</DetailLabel> {value}
              </React.Fragment>
            ))}
          </RowDetails>
        )}
      </Header>

      <Table
        data={data.schedules}
        columns={columns}
        getRowColor={(row) => (row.scheduleOrderType === 'Current' ? '#2D6CDF1A' : undefined)}
      />
      <MobileList
        columns={mobileColumns}
        data={data.schedules}
        getRowColor={(row) => (row.scheduleOrderType === 'Current' ? '#2D6CDF1A' : undefined)}
        sortable={true}
        expandable={renderExpandableContent}
      />

      <Footer>
        {userType === 'Hr Manager' && style === 'new' ? (
          <Icon
            alt="Edit icon"
            src={EditIcon}
            onClick={() => onEdit(uuid)}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <div style={{ height: '28px' }} />
        )}
      </Footer>
    </MultiContainer>
  );
};

export default MultiScheduleDetails;
