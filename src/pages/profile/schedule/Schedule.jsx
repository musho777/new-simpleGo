import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import emptyIcon from 'assets/profile/emptyIcon.svg';
import Button from 'common-ui/button';
import { selectSchedule } from 'features/profile/profileSlice';
import EmptyView from 'pages/components/emptyView';

import CreateEditSchedule from './CreateEditSchedule';
import MultiScheduleDetails from './MultiScheduleDetails';
import { AssignSchedulesBtnWrapper, OldNewTitle } from './Schedule.styles';

const Schedule = () => {
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false);
  const [newScheduleCreation, setNewScheduleCreation] = useState(false);
  const [editScheduleData, setEditScheduleData] = useState(null);

  const userType = localStorage.getItem('userType');

  const assignedSchedules = useSelector(selectSchedule);
  const assignedCurrentSchedule = assignedSchedules?.currentSchedule;
  const assignedUpcomingSchedule = assignedSchedules?.upcomingSchedule;

  const handleEditSchedule = () => {
    setIsCreateEditModalOpen(true);
    setEditScheduleData(
      assignedUpcomingSchedule
        ? { ...assignedUpcomingSchedule, uuid: assignedSchedules.uuid }
        : { ...assignedCurrentSchedule, uuid: assignedSchedules.uuid }
    );
  };

  const handleOpenCreateEditForm = () => {
    setIsCreateEditModalOpen(true);
  };

  const handleOpenAssignNewSchedule = () => {
    setIsCreateEditModalOpen(true);
    setNewScheduleCreation(true);
  };

  const handleCloseCreateEditForm = () => {
    setIsCreateEditModalOpen(false);
    setNewScheduleCreation(false);
    setEditScheduleData(null);
  };

  return (
    <>
      {userType === 'Hr Manager' &&
        !assignedUpcomingSchedule &&
        assignedCurrentSchedule &&
        assignedCurrentSchedule?.schedules[0]?.scheduleOrderType === 'Current' && (
          <AssignSchedulesBtnWrapper>
            <Button onClick={handleOpenAssignNewSchedule} secondary>
              + Assign schedule
            </Button>
          </AssignSchedulesBtnWrapper>
        )}
      {!assignedCurrentSchedule ? (
        <EmptyView
          title="No schedule yet"
          button={userType === 'Hr Manager'}
          buttonTitle="Assign work schedule"
          icon={emptyIcon}
          onClick={handleOpenCreateEditForm}
        />
      ) : !assignedUpcomingSchedule ? (
        <MultiScheduleDetails
          data={assignedCurrentSchedule}
          uuid={assignedCurrentSchedule.userScheduleId}
          userType={userType}
          onEdit={handleEditSchedule}
        />
      ) : (
        <>
          <OldNewTitle>Upcoming schedule</OldNewTitle>
          <MultiScheduleDetails
            data={assignedUpcomingSchedule}
            uuid={assignedUpcomingSchedule.userScheduleId}
            userType={userType}
            onEdit={handleEditSchedule}
            style="new"
          />
          <OldNewTitle>Current schedule</OldNewTitle>
          <MultiScheduleDetails
            data={assignedCurrentSchedule}
            uuid={assignedCurrentSchedule.userScheduleId}
            userType={userType}
            onEdit={handleEditSchedule}
            style="old"
          />
        </>
      )}

      <CreateEditSchedule
        isModalOpen={isCreateEditModalOpen}
        onCancel={handleCloseCreateEditForm}
        initialData={editScheduleData}
        newScheduleCreation={newScheduleCreation}
        lastAllowedEffectiveDate={
          assignedCurrentSchedule?.schedules[assignedCurrentSchedule?.schedules?.length - 1]
            ?.effectiveDate
        }
      />
    </>
  );
};

export default Schedule;
