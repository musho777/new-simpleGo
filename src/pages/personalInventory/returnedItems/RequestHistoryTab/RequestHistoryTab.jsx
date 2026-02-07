import { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Row } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { getEmployeeReturns } from 'features/inventory/inventoryActions';
import { selectEmployeeReturns, selectLoading } from 'features/inventory/inventorySlice';
import Tag from 'pages/components/tag';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';
import { formatDateTime } from 'utils/dateUtils';

import Filter from './Filter';
import { EllipsisCell } from './RequestHistoryTab.styles';
import { useRequestHistoryTabSearch } from './useSearchData';

const RequestHistoryTab = () => {
  const dispatch = useDispatch();
  const employeeReturns = useSelector(selectEmployeeReturns);
  const loading = useSelector(selectLoading);

  const { searchData, setRequestHistoryTabSearchData, resetSearchData } =
    useRequestHistoryTabSearch();
  const columns = useMemo(() => [
    {
      title: 'Category Name',
      key: 'categoryName',
      dataIndex: 'categoryName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Item Name',
      key: 'itemName',
      dataIndex: 'itemName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Requested quantity',
      key: 'quantityRequested',
      dataIndex: 'quantityRequested',
      render: (quantityRequested, data) => (
        <p>
          {quantityRequested} {data.unitOfMeasurement}
        </p>
      ),
    },
    {
      title: 'Request Reason',
      key: 'requestReason',
      dataIndex: 'requestReason',
    },
    {
      title: 'Rejection reason',
      key: 'rejectionReason',
      dataIndex: 'rejectionReason',
    },

    {
      title: 'Requested Date',
      key: 'requestedDate',
      dataIndex: 'requestedDate',
      render: (date) => <>{formatDateTime(date, true) || '-'}</>,
    },
    {
      title: 'Returned Date',
      key: 'returnedDate',
      dataIndex: 'returnedDate',
      render: (returnedDate) => <>{formatDateTime(returnedDate, true) || '-'}</>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => <>{<Tag type="status" variant={status} /> || '-'}</>,
    },
  ]);

  const mobileColumns = useMemo(() => [
    {
      title: 'Category',
      key: 'categoryName',
      dataIndex: 'categoryName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Item',
      key: 'itemName',
      dataIndex: 'itemName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Requested quantity',
      key: 'quantityRequested',
      dataIndex: 'quantityRequested',
      render: (text, data) => (
        <p>
          {text} {data.unitOfMeasurement}
        </p>
      ),
    },
  ]);
  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Request Reason</ExpandedLabel>
          <ExpandedValue>{row.requestReason}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Rejection reason</ExpandedLabel>
          <ExpandedValue>{row.rejectionReason}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Requested Date</ExpandedLabel>
          <ExpandedValue>{formatDateTime(row.requestedDate, true) || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Returned Date</ExpandedLabel>
          <ExpandedValue>{formatDateTime(row.returnedDate, true) || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Status</ExpandedLabel>
          <ExpandedValue>
            <Tag type="status" variant={row.status} />
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );

  const onPaginationChange = (page) => {
    setRequestHistoryTabSearchData({ page });
  };

  useEffect(() => {
    dispatch(getEmployeeReturns(searchData));
  }, [dispatch, searchData]);

  return (
    <>
      <Filter
        searchData={searchData}
        setSearchData={setRequestHistoryTabSearchData}
        resetSearchData={resetSearchData}
      />
      <Table
        columns={columns}
        totalPages={employeeReturns?.totalPages}
        data={employeeReturns?.requests || []}
        currentPage={employeeReturns?.page}
        onPaginationChange={onPaginationChange}
        loading={loading.employeeReturns}
      />
      <MobileList
        columns={mobileColumns}
        data={employeeReturns?.requests || []}
        expandable={renderExpandableContent}
        currentPage={employeeReturns?.page}
        totalPages={employeeReturns?.totalPages}
        onPaginationChange={onPaginationChange}
      />
    </>
  );
};

export default RequestHistoryTab;
