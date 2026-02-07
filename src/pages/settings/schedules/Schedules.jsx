import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getSchedules } from 'features/schedules/scheduleActions';
import { selectLoading } from 'features/schedules/scheduleSlice';
import Navigation from 'pages/components/navigation';

import Create from './Create';
import ScheduleCards from './ScheduleCards';
import { Container } from './Schedules.styles';
import { useSchedulesSearchParams } from './useSearchData';

const TABS = [
  { name: 'Schedules', path: `/settings/schedules` },
  { name: 'Attendance Policy', path: `/settings/attendance-policy` },
];

const Schedules = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const { searchData } = useSchedulesSearchParams();

  useEffect(() => {
    dispatch(getSchedules(searchData));
  }, [dispatch, JSON.stringify(searchData)]);

  return (
    <Container>
      <div style={{ marginBottom: '20px' }}>
        <Navigation className="nav" tabs={TABS} />
      </div>
      <Create />
      <ScheduleCards isLoading={isLoading.schedules} />
    </Container>
  );
};

export default Schedules;
