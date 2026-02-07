import React, { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import calendar from 'assets/calendar.svg';
import date from 'assets/date.svg';
import editIcon from 'assets/profileHeader/edit.svg';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import {
  createAttendance,
  editAttendance,
  getAttendance,
} from 'features/schedules/scheduleActions';
import { selectAttendance, selectLoading } from 'features/schedules/scheduleSlice';
import EmptyView from 'pages/components/emptyView';
import Navigation from 'pages/components/navigation';

import {
  Card,
  Container,
  DetailLabel,
  DetailValue,
  Footer,
  Icon,
  Label,
  Row,
} from './AttendancePolicy.styles';
import { attendancePolicySchema } from './schema';

const TABS = [
  { name: 'Schedules', path: '/settings/schedules' },
  { name: 'Attendance Policy', path: '/settings/attendance-policy' },
];

const AttendancePolicy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const isLoading = useSelector(selectLoading);
  const attendance = useSelector(selectAttendance);
  const { dailyAcceptable, dailyUnacceptable, monthlyAcceptable, monthlyUnacceptable, uuid } =
    attendance;

  const ATTENDANCE_CONFIG = useMemo(
    () => [
      {
        type: 'Daily',
        icon: calendar,
        acceptable: `${dailyAcceptable} minutes`,
        unacceptable: `${dailyUnacceptable} minutes`,
      },
      {
        type: 'Monthly',
        icon: date,
        acceptable: `${monthlyAcceptable} minutes`,
        unacceptable: `${monthlyUnacceptable} minutes`,
      },
    ],
    [dailyAcceptable, dailyUnacceptable, monthlyAcceptable, monthlyUnacceptable]
  );

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(attendancePolicySchema),
    defaultValues: {
      dailyAcceptable: dailyAcceptable,
      dailyUnacceptable: dailyUnacceptable,
      monthlyAcceptable: monthlyAcceptable,
      monthlyUnacceptable: monthlyUnacceptable,
    },
  });

  const handleCloseModal = () => {
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleAddAttendancePolicy = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    isEdit ? dispatch(editAttendance({ uuid, data })) : dispatch(createAttendance(data));
    handleCloseModal();
  };

  const handleClickEdit = () => {
    setIsEdit(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAttendance());
  }, [dispatch]);

  useEffect(() => {
    reset({
      dailyAcceptable: dailyAcceptable,
      dailyUnacceptable: dailyUnacceptable,
      monthlyAcceptable: monthlyAcceptable,
      monthlyUnacceptable: monthlyUnacceptable,
    });
  }, [reset, attendance]);

  if (isLoading.attendance)
    return (
      <LoadContainer>
        <LoadingIcon src={loadIcon} alt="Loading..." />
      </LoadContainer>
    );

  return (
    <Container>
      <Navigation className="nav" tabs={TABS} />

      {attendance ? (
        <Card>
          {ATTENDANCE_CONFIG.map(({ type, icon, acceptable, unacceptable }) => (
            <React.Fragment key={type}>
              <Row>
                <Icon src={icon} />
                <Label>{type}</Label>
              </Row>
              <Row>
                <DetailLabel>Max acceptable minutes:</DetailLabel>
                <DetailValue>{acceptable}</DetailValue>
              </Row>
              <Row>
                <DetailLabel>Max unacceptable minutes:</DetailLabel>
                <DetailValue>{unacceptable}</DetailValue>
              </Row>
            </React.Fragment>
          ))}

          <Footer>
            <button onClick={handleClickEdit}>
              <Icon src={editIcon} />
            </button>
          </Footer>
        </Card>
      ) : (
        <EmptyView
          button
          buttonTitle="Add Attendance Policy"
          onClick={handleAddAttendancePolicy}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onOk={handleSubmit(onSubmit)}
        onClose={handleCloseModal}
        title="Set Attendance Policy"
        width="356px"
        footer={true}
      >
        <Controller
          name="dailyAcceptable"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Max acceptable minutes per day"
              placeholder="Enter max 240 minutes"
              error={errors.dailyAcceptable?.message}
              type="number"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                field.onChange(value);
              }}
            />
          )}
        />
        <Controller
          name="dailyUnacceptable"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Max unacceptable minutes per day"
              placeholder="Enter max 480 minutes"
              error={errors.dailyUnacceptable?.message}
              type="number"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                field.onChange(value);
              }}
            />
          )}
        />
        <Controller
          name="monthlyAcceptable"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Max acceptable minutes per month"
              placeholder="Enter max 4800 minutes"
              error={errors.monthlyAcceptable?.message}
              type="number"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                field.onChange(value);
              }}
            />
          )}
        />
        <Controller
          name="monthlyUnacceptable"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Max unacceptable minutes per month"
              placeholder="Enter max 9000 minutes"
              error={errors.monthlyUnacceptable?.message}
              type="number"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                field.onChange(value);
              }}
            />
          )}
        />
      </Modal>
    </Container>
  );
};

export default AttendancePolicy;
