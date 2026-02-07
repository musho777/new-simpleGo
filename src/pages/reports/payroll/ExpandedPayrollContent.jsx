import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Table } from 'common-ui/table';
import { format } from 'date-fns';
import { getEmployeePayrollData } from 'features/reports/reportsActions';
import {
  selectEmployeePayrollByUUID,
  selectEmployeePayrollLoading,
  selectEmployeePayrollPageByUUID,
  setEmployeePayrollPage,
} from 'features/reports/reportsSlice';

import { CheckinCheckoutCircle, DeductionHoursP, OvertimeHoursP, Row } from './Payroll.styles';

const NESTED_COLUMNS = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Regular shift',
    dataIndex: 'regularShift',
    key: 'regularShift',
  },
  {
    title: 'Check in',
    dataIndex: 'checkIn',
    key: 'checkIn',
    render: (checkIn, row) => (
      <Row>
        {checkIn && <CheckinCheckoutCircle $color={'#15C7A7'} />}
        {checkIn ? format(checkIn, 'HH:mm') : '-'}
      </Row>
    ),
  },
  {
    title: 'Check out',
    dataIndex: 'checkOut',
    key: 'checkOut',
    render: (checkOut, rowData) => (
      <Row>
        {checkOut && (
          <CheckinCheckoutCircle $color={rowData.autoCheckout ? '#6C757D' : '#15C7A7'} />
        )}
        {checkOut ? format(checkOut, 'HH:mm') : '-'}
      </Row>
    ),
  },
  {
    title: 'Overtime Hours',
    dataIndex: 'overtimeHours',
    key: 'overtimeHours',
    render: (overtimeHours) => <OvertimeHoursP>{overtimeHours}</OvertimeHoursP>,
  },
  {
    title: 'Missed hours',
    dataIndex: 'missedHours',
    key: 'missedHours',
    render: (missedHours) => <DeductionHoursP>{missedHours}</DeductionHoursP>,
  },
];

const ExpandedPayrollContent = ({ employeeId }) => {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => selectEmployeePayrollByUUID(state, employeeId));
  const isLoading = useSelector((state) => selectEmployeePayrollLoading(state, employeeId));
  const currentPage = useSelector((state) =>
    selectEmployeePayrollPageByUUID(state, employeeId)
  );

  const checkins = employeeData?.dailyCheckins || [];
  const limit = 5;

  const onPaginationChange = (page) => {
    dispatch(
      setEmployeePayrollPage({
        employeeId,
        page,
        limit,
      })
    );

    const offset = (page - 1) * limit;
    dispatch(
      getEmployeePayrollData({
        employeeId,
        params: { limit, offset },
      })
    );
  };

  useEffect(() => {
    if (!employeeData) {
      dispatch(
        getEmployeePayrollData({
          employeeId,
          params: { limit, offset: 0 },
        })
      );
      dispatch(
        setEmployeePayrollPage({
          employeeId,
          page: 1,
          limit,
        })
      );
    }
  }, [employeeId, employeeData, dispatch]);

  return (
    <Table
      columns={NESTED_COLUMNS}
      data={checkins}
      totalPages={employeeData?.totalPages}
      currentPage={currentPage}
      onPaginationChange={onPaginationChange}
      loading={isLoading}
    />
  );
};

export default ExpandedPayrollContent;
