import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Modal as ModalView } from '@mui/material';
import BasicButton from 'common-ui/filterButton';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import { format, parseISO } from 'date-fns';
import { getReport } from 'features/reports/reportsActions';
import {
  selectIsPayrollViewModalOpen,
  selectLoading,
  selectReports,
  setIsPayrollViewModalOpen,
} from 'features/reports/reportsSlice';
import { getAttendance } from 'features/schedules/scheduleActions';
import { selectAttendance } from 'features/schedules/scheduleSlice';
import { useMobileView } from 'hooks/useMobileView';
import Tag from 'pages/components/tag';
import { formatMinutes } from 'utils/dateUtils';

import Filter from './Filter';
import {
  CheckinCheckoutCircle,
  Container,
  DeductionHoursP,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedRow,
  ExpandedValue,
  InfoWrapper,
  OvertimeHoursP,
  PayrollLabel,
  PayrollValue,
  Row,
  ViewPayrollDetails,
  ViewPayrollMobileDetails,
} from './Payroll.styles';
import ArrowBackIcon from './left.svg';
import MobileFilter from './mobileFilter';
import { usePayrollSearchParams } from './useSearchData';

const typeColors = {
  1: '#FF00131A',
  0: '#FF6A001A',
};

const allColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Missed Hours',
    dataIndex: 'missedHours',
    key: 'missedHours',
    render: (missedHours) => (
      <DeductionHoursP>{formatMinutes(Math.abs(missedHours))}</DeductionHoursP>
    ),
  },
  {
    title: 'Overtime hours',
    dataIndex: 'overtimeHours',
    key: 'overtimeHours',
    render: (overtimeHours) => <OvertimeHoursP>{formatMinutes(overtimeHours)}</OvertimeHoursP>,
  },
  {
    title: 'Worked weekends',
    dataIndex: 'workedWeekends',
    key: 'workedWeekends',
  },
  {
    title: 'Holidays',
    dataIndex: 'holidays',
    key: 'holidays',
  },
  {
    title: 'Night hours',
    dataIndex: 'nightHours',
    key: 'nightHours',
  },
  {
    title: 'Total hours',
    dataIndex: 'totalHours',
    key: 'totalHours',
    render: (totalHours) => <>{formatMinutes(totalHours)}</>,
  },
  {
    title: 'Total days',
    dataIndex: 'totalDays',
    key: 'totalDays',
  },
  {
    title: 'Deduction',
    dataIndex: 'deduction',
    key: 'deduction',
    render: (deduction) => <DeductionHoursP>{deduction}</DeductionHoursP>,
  },
  {
    title: 'Total salary',
    dataIndex: 'totalSalary',
    key: 'totalSalary',
  },
  {
    title: 'Schedule type',
    dataIndex: 'scheduleType',
    key: 'scheduleType',
    render: (scheduleType) => <Tag type={'ticketStatuses'} variant={scheduleType} />,
  },
];

const NESTED_COLUMNS = [
  {
    title: 'Date',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: 'Regular shift',
    dataIndex: 'shift',
    key: 'shift',
  },
  {
    title: 'Check in',
    dataIndex: 'checkin',
    key: 'checkin',
    render: (checkin, row) => (
      <Row>
        {checkin && <CheckinCheckoutCircle $color={'#15C7A7'} />}
        {checkin ? format(parseISO(checkin), 'HH:mm') : '-'}
      </Row>
    ),
  },
  {
    title: 'Check out',
    dataIndex: 'checkout',
    key: 'checkout',
    render: (checkout, row) => (
      <Row>
        {checkout && (
          <CheckinCheckoutCircle $color={row.autoCheckout ? '#6C757D' : '#15C7A7'} />
        )}
        {checkout ? format(parseISO(checkout), 'HH:mm') : '-'}
      </Row>
    ),
  },
  {
    title: 'Overtime Hours',
    dataIndex: 'overtimeHours',
    key: 'overtimeHours',
    render: (overtimeHours) => <OvertimeHoursP>{formatMinutes(overtimeHours)}</OvertimeHoursP>,
  },
  {
    title: 'Missed hours',
    dataIndex: 'missedHours',
    key: 'missedHours',
    render: (missedHours) => (
      <DeductionHoursP>{formatMinutes(Math.abs(missedHours))}</DeductionHoursP>
    ),
  },
];

const Payroll = () => {
  const data = useSelector(selectReports) || [];

  const [expandedPagination, setExpandedPagination] = useState({});
  const [columns, setColumns] = useState([]);
  const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);
  const { searchData, setPayrollSearchData } = usePayrollSearchParams();
  const [viewDetailsData, setViewDetailsData] = useState({});
  const itemsPerPage = 10;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / itemsPerPage) + 1;
  }, [searchData.offset, itemsPerPage]);
  const isPayrollViewModalOpen = useSelector(selectIsPayrollViewModalOpen);
  const dispatch = useDispatch();
  const isMobile = useMobileView();
  const isLoading = useSelector(selectLoading);
  const attendance = useSelector(selectAttendance);

  const totalPages = useMemo(() => {
    return Math.ceil((data?.users?.length || 0) / itemsPerPage);
  }, [data?.users?.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.users?.slice(startIndex, endIndex) || [];
  }, [data?.users, currentPage, itemsPerPage]);

  const expandedContentRenderer = (row) => {
    const subItems = row?.subItems || [];
    const itemsPerPage = 5;
    const currentPage = expandedPagination[row?.id] || 1;
    const totalPages = Math.ceil(subItems.length / itemsPerPage);
    const offset = (currentPage - 1) * itemsPerPage;
    const paginatedSubItems = subItems.slice(offset, offset + itemsPerPage);

    return (
      <Table
        columns={NESTED_COLUMNS}
        data={paginatedSubItems}
        totalPages={totalPages}
        currentPage={currentPage}
        onPaginationChange={(page) => handleSubItemsPageChange(row.id, page)}
        loading={isLoading.reports}
      />
    );
  };

  const handleViewClick = (e, row) => {
    e.preventDefault();
    e.stopPropagation();

    setViewDetailsData({
      missedHours: row.missedHours,
      overtimeHours: row.overtimeHours,
      workedWeekends: row.workedWeekends,
      holidays: row.holidays,
      nightHours: row.nightHours,
      deduction: row.deduction,
    });

    dispatch(setIsPayrollViewModalOpen(true));
  };

  const handleViewExpandClick = (e, row) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedEmployeeId(row.id);
  };

  const onPaginationChange = (page) => {
    const offset = (page - 1) * itemsPerPage;
    setPayrollSearchData({ offset });
  };

  const handleSubItemsPageChange = (rowId, page) => {
    setExpandedPagination((prev) => ({ ...prev, [rowId]: page }));
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const compactColumns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Total hours',
        dataIndex: 'totalHours',
        key: 'totalHours',
      },
      {
        title: 'Total days',
        dataIndex: 'totalDays',
        key: 'totalDays',
      },
      {
        title: 'Total salary',
        dataIndex: 'totalSalary',
        key: 'totalSalary',
      },
      {
        title: 'Schedule type',
        dataIndex: 'scheduleType',
        key: 'scheduleType',
        render: (scheduleType) => <Tag type={'ticketStatuses'} variant={scheduleType} />,
      },
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        render: (_, row) => (
          <ViewPayrollDetails onClick={(e) => handleViewClick(e, row)}>
            View
          </ViewPayrollDetails>
        ),
      },
    ],
    [handleViewClick]
  );

  const mobileColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'scheduleType',
      key: 'scheduleType',
      render: (scheduleType) => <Tag type={'ticketStatuses'} variant={scheduleType} />,
    },
    {
      title: 'TIMESHEET',
      dataIndex: 'Timesheet',
      key: 'Timesheet',
      render: (_, row) => (
        <ViewPayrollMobileDetails onClick={(e) => handleViewExpandClick(e, row)}>
          View
        </ViewPayrollMobileDetails>
      ),
    },
  ];

  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <ExpandedRow>
            <ExpandedLabel>Missed hours</ExpandedLabel>
            <ExpandedValue>{formatMinutes(Math.abs(row.missedHours))}</ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Overtime hours</ExpandedLabel>
            <ExpandedValue $type="positive">
              {formatMinutes(Math.abs(row.overtimeHours))}
            </ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Worked Weekends</ExpandedLabel>
            <ExpandedValue>{formatMinutes(Math.abs(row.workedWeekends))}</ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Holidays</ExpandedLabel>
            <ExpandedValue>{formatMinutes(Math.abs(row.holidays))}</ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Night hours</ExpandedLabel>
            <ExpandedValue>{formatMinutes(Math.abs(row.nightHours))}</ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Total hours</ExpandedLabel>
            <ExpandedValue>{formatMinutes(Math.abs(row.totalHours))}</ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Total days</ExpandedLabel>
            <ExpandedValue>{row.totalDays}</ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Deduction</ExpandedLabel>
            <ExpandedValue $type="negative">{row.deduction} AMD</ExpandedValue>
          </ExpandedRow>
          <ExpandedRow>
            <ExpandedLabel>Total Salary</ExpandedLabel>
            <ExpandedValue>{row.totalSalary} AMD</ExpandedValue>
          </ExpandedRow>
        </ExpandableWrapper>
      </>
    );
  };

  const getRowColor = (row) => {
    if (
      row.missedHours >= attendance.monthlyAcceptable &&
      row.missedHours < attendance.monthlyUnacceptable
    ) {
      return typeColors[0];
    } else if (row.missedHours >= attendance.monthlyUnacceptable) {
      return typeColors[1];
    }
  };

  const nestedRowColor = (row) => {
    if (
      row.missedHours >= attendance.dailyAcceptable &&
      row.missedHours < attendance.dailyUnacceptable
    ) {
      return typeColors[0];
    } else if (row.missedHours >= attendance.dailyUnacceptable) {
      return typeColors[1];
    }
  };

  useEffect(() => {
    dispatch(getAttendance()).then(() => {
      dispatch(
        getReport({
          ...searchData,
          departmentId: searchData.departmentId,
          branchId: searchData.branchId,
          teamId: searchData.teamId,
          fromDate: searchData.fromDate,
          toDate: searchData.toDate,
          limit: 10000,
          offset: 0,
        })
      );
    });
  }, [
    searchData.departmentId,
    searchData.branchId,
    searchData.teamId,
    searchData.fromDate,
    searchData.toDate,
  ]);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 1440) {
        setColumns(compactColumns);
      } else {
        setColumns(allColumns);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);
  return (
    <Container>
      <Modal
        width="304px"
        closeIcon
        isOpen={isPayrollViewModalOpen}
        onClose={() => dispatch(setIsPayrollViewModalOpen(false))}
      >
        <InfoWrapper>
          <div>
            <PayrollLabel>Missed hours</PayrollLabel>
            <PayrollValue>{formatMinutes(Math.abs(viewDetailsData.missedHours))}</PayrollValue>
          </div>
          <div>
            <PayrollLabel>Overtime hours</PayrollLabel>
            <PayrollValue $type="positive">
              {formatMinutes(Math.abs(viewDetailsData.overtimeHours))}
            </PayrollValue>
          </div>
          <div>
            <PayrollLabel>Worked Weekends</PayrollLabel>
            <PayrollValue>{viewDetailsData.workedWeekends}</PayrollValue>
          </div>
          <div>
            <PayrollLabel>Holidays</PayrollLabel>
            <PayrollValue>{viewDetailsData.holidays}</PayrollValue>
          </div>
          <div>
            <PayrollLabel>Night hours</PayrollLabel>
            <PayrollValue>{formatMinutes(Math.abs(viewDetailsData.nightHours))}</PayrollValue>
          </div>
          <div>
            <PayrollLabel>Deduction</PayrollLabel>
            <PayrollValue $type="negative">{viewDetailsData.deduction}</PayrollValue>
          </div>
        </InfoWrapper>
      </Modal>
      {!isMobile && <Filter />}
      <Table
        totalPages={totalPages}
        currentPage={currentPage}
        onPaginationChange={onPaginationChange}
        columns={columns}
        data={paginatedData}
        scrollable={true}
        loading={isLoading.reports}
        isExpandable={true}
        getRowColor={getRowColor}
        evenRowColor="#ECF1FB"
        expandedContentRenderer={(row) => {
          const subItems = row.subItems || [];
          const subItemsPerPage = 5;
          const subCurrentPage = expandedPagination[row.id] || 1;
          const subTotalPages = Math.ceil(subItems?.length / subItemsPerPage);
          const subOffset = (subCurrentPage - 1) * subItemsPerPage;
          const paginatedSubItems = subItems?.slice(subOffset, subOffset + subItemsPerPage);

          return (
            <Table
              columns={NESTED_COLUMNS}
              data={paginatedSubItems}
              totalPages={subTotalPages}
              currentPage={subCurrentPage}
              getRowColor={nestedRowColor}
              onPaginationChange={(page) => handleSubItemsPageChange(row.id, page)}
              loading={isLoading.reports}
            />
          );
        }}
      />
      {isMobile && (
        <>
          <BasicButton title="Filter" onClick={toggleFilter} />
          <MobileFilter
            searchData={searchData}
            isFilterOpen={isFilterOpen}
            handleCloseFilter={() => setIsFilterOpen(false)}
          />
        </>
      )}

      <MobileList
        columns={mobileColumns}
        data={paginatedData}
        expandable={renderExpandableContent}
        onPaginationChange={onPaginationChange}
        currentPage={currentPage}
        loading={isLoading.reports}
        totalPages={totalPages}
      />

      <ModalView open={!!expandedEmployeeId} onClose={() => setExpandedEmployeeId(null)}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'background.paper',
            overflowY: 'auto',
            p: 2,
            '& .table-wrapper': {
              display: 'flex !important',
              flexDirection: 'column',
            },
            '& .table-wrapper-page': {
              display: 'flex !important',
              flexDirection: 'column',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={() => setExpandedEmployeeId(null)}>
              <img src={ArrowBackIcon} alt="back" />
            </IconButton>
          </Box>

          {expandedContentRenderer(
            data?.users?.find((u) => u.id === expandedEmployeeId),
            true
          )}
        </Box>
      </ModalView>
    </Container>
  );
};

export default Payroll;
