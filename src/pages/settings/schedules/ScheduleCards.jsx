import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Calendar from 'assets/calendar.svg';
import Clock from 'assets/clock2.svg';
import DeleteIcon from 'assets/delete.svg';
import EditIcon from 'assets/edit.svg';
import Globe from 'assets/globe.svg';
import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import Pagination from 'common-ui/table/Pagination';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import { TICKET_APPOINTMENT_WEEKDAY_OPTIONS } from 'constants/constants';
import { deleteSchedule, getSchedules } from 'features/schedules/scheduleActions';
import {
  selectPagesCount,
  selectSchedules,
  selectSuccess,
  setResetSuccess,
} from 'features/schedules/scheduleSlice';
import EmptyView from 'pages/components/emptyView';
import { TruncatedText } from 'pages/inventory/requestHistory/RequestHistory.styles';

import Edit from './Edit';
import {
  AllShifts,
  Col,
  DeleteConfirmText,
  DeleteTitle,
  EmptyViewWrapper,
  Row,
  ScheduleCard,
  ShiftControl,
  ShiftControllers,
  ShiftFlex,
  ShiftInfo,
  ShiftText,
  ShiftWrapper,
  Title,
} from './Schedules.styles';
import { useSchedulesSearchParams } from './useSearchData';

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

    if (orderedDays.indexOf(currentDay) === orderedDays.indexOf(prevDay) + 1) {
      continue;
    } else {
      if (rangeStart !== prevDay) {
        result.push(`${labelsMap[rangeStart]} - ${labelsMap[prevDay]}`);
      } else {
        result.push(labelsMap[prevDay]);
      }
      rangeStart = currentDay;
    }
  }

  return result.join(', ');
};

const ScheduleCards = ({ isLoading }) => {
  const { searchData, setSchedulesSearchData } = useSchedulesSearchParams();
  const schedules = useSelector(selectSchedules);
  const pagesCount = useSelector(selectPagesCount);
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 12)) + 1;
  }, [searchData.offset, searchData.limit]);
  const success = useSelector(selectSuccess);

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleUuid, setScheduleUuid] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteScheduleUuid, setDeleteScheduleUuid] = useState(null);

  const handleEditSchedule = (uuid) => {
    setIsModalOpen(true);
    setScheduleUuid(uuid);
  };

  const handleDeleteSchedule = (schedule) => {
    setIsDeleteModalOpen(true);
    setDeleteScheduleUuid(schedule);
  };

  const onPaginationChange = (page) => {
    const limit = 12;
    const offset = (page - 1) * limit;
    setSchedulesSearchData({ offset });
  };

  const confirmDeleteSchedule = () => {
    if (deleteScheduleUuid) {
      dispatch(deleteSchedule(deleteScheduleUuid.uuid));
    }
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setScheduleUuid(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteScheduleUuid(null);
  };

  useEffect(() => {
    if (success) {
      dispatch(getSchedules(searchData));
      setScheduleUuid(null);
      setIsModalOpen(false);
      setIsDeleteModalOpen(false);
      setDeleteScheduleUuid(null);
      dispatch(setResetSuccess());
    }
  }, [success]);
  return isLoading ? (
    <LoadContainer>
      <LoadingIcon src={loadIcon} alt="Loading..." />
    </LoadContainer>
  ) : (
    <AllShifts>
      {schedules.length === 0 ? (
        <EmptyViewWrapper>
          <EmptyView title={'No results found'} />
        </EmptyViewWrapper>
      ) : (
        <ShiftWrapper>
          {schedules.map((schedule) => (
            <ScheduleCard key={schedule.uuid}>
              <TruncatedText>
                <Title style={{ borderBottom: '1px solid #DFDFDF', paddingBottom: '15px' }}>
                  {schedule.name}
                </Title>
              </TruncatedText>
              <ShiftFlex>
                <ShiftInfo>
                  <img alt="Calendar" src={Calendar} />
                </ShiftInfo>
                <ShiftInfo>Workdays:</ShiftInfo>
                <ShiftText>{getFormattedWeekdays(schedule?.workdays || [])}</ShiftText>
              </ShiftFlex>
              <ShiftFlex>
                <ShiftInfo>
                  <img alt="Globe" src={Globe} />
                </ShiftInfo>
                <ShiftInfo>Time zone:</ShiftInfo> <ShiftText> {schedule.timezone}</ShiftText>
              </ShiftFlex>
              <ShiftFlex style={{ borderBottom: '1px solid #DFDFDF', paddingBottom: '15px' }}>
                <ShiftInfo>
                  <img alt="Clock" src={Clock} />
                </ShiftInfo>
                <ShiftInfo>Shift Time:</ShiftInfo> <ShiftText>{schedule.shiftTime}</ShiftText>
              </ShiftFlex>
              <ShiftControllers>
                <ShiftControl>
                  <img
                    alt="Edit icon"
                    src={EditIcon}
                    onClick={() => handleEditSchedule(schedule.uuid)}
                  />
                </ShiftControl>
                {schedule.canDelete && (
                  <ShiftControl>
                    <img
                      alt="Delete icon"
                      src={DeleteIcon}
                      onClick={() => handleDeleteSchedule(schedule)}
                    />
                  </ShiftControl>
                )}
              </ShiftControllers>
            </ScheduleCard>
          ))}
        </ShiftWrapper>
      )}
      {pagesCount > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagesCount}
          onPageChange={onPaginationChange}
        />
      )}

      {isModalOpen && scheduleUuid && (
        <Edit uuid={scheduleUuid} handleCloseEditModal={handleCloseEditModal} />
      )}

      {isDeleteModalOpen && (
        <Modal isOpen={true} onClose={handleCloseDeleteModal}>
          <Col>
            <DeleteTitle>Delete Schedule</DeleteTitle>
            <DeleteConfirmText>
              Are you sure you want to delete {`"${deleteScheduleUuid.name}"`} schedule?
            </DeleteConfirmText>
            <Row>
              <Button outlined onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button secondary onClick={confirmDeleteSchedule}>
                Delete
              </Button>
            </Row>
          </Col>
        </Modal>
      )}
    </AllShifts>
  );
};

export default ScheduleCards;
