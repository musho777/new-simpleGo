import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BadgeButton } from 'common-ui/badgeButton/BadgeButton';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { getRequests } from 'features/inventory/inventoryActions';
import { selectLoading, selectPendingRequests } from 'features/inventory/inventorySlice';
import Tag from 'pages/components/tag';
import { formatDateTime, getTimeFromDate } from 'utils/dateUtils';

import { capitalizeFirstLetter } from '../../../utils/index';
import {
  Container,
  LightTooltip,
  MobileItemRowBox,
  TruncatedText,
} from './RequestHistory.styles';
import Filter from './filter/Filter';
import { useRequestHistorySearchParams } from './useSearchData';

const COLUMNS = [
  { title: 'Requester', dataIndex: 'requesterName', key: 'requesterName' },
  { title: 'Item name', dataIndex: 'itemName', key: 'itemName' },
  {
    title: 'provided count',
    dataIndex: 'processedQuantity',
    key: 'processedQuantity',
    render: (processedQuantity, data) => (
      <p>
        {processedQuantity} {processedQuantity && data.unitOfMeasurement}
      </p>
    ),
  },
  {
    title: 'requested count',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (quantity, data) => (
      <p>
        {quantity} {quantity && data.unitOfMeasurement}
      </p>
    ),
  },
  {
    title: 'usage',
    dataIndex: 'usage',
    key: 'usage',
    render: (usage) => <Tag type="usage" variant={usage} />,
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag
        type="status"
        variant={
          status === 'awaiting_receipt_confirmation'
            ? 'Awaiting receipt confirmation'
            : status === 'receipt_declined'
              ? 'Receipt declined'
              : capitalizeFirstLetter(status)
        }
      />
    ),
  },
  {
    title: 'reason',
    dataIndex: 'reason',
    key: 'reason',
    render: (text) => {
      return (
        <LightTooltip title={text.length > 25 ? `${text}` : ''} placement="top-start">
          <TruncatedText>{text}</TruncatedText>
        </LightTooltip>
      );
    },
  },
  {
    title: 'date',
    dataIndex: 'date',
    key: 'date',
    render: (date) => formatDateTime(date),
  },
  {
    title: 'time',
    dataIndex: 'date',
    key: 'date-time',
    render: (date) => getTimeFromDate(date),
  },
];

const mobileColumns = [
  {
    title: 'Requester',
    dataIndex: 'requesterName',
    render: (_, row) => <div>{row.requesterName}</div>,
  },
  {
    title: 'Item name',
    dataIndex: 'itemName',
    render: (_, row) => <div>{row.itemName}</div>,
  },
  { title: 'quantity', dataIndex: 'quantity', render: (_, row) => <div>{row.quantity}</div> },
];

const renderExpandableContent = (row) => (
  <>
    <MobileItemRowBox>
      <strong>Usage:</strong> <Tag type="usage" variant={row.usage} />
    </MobileItemRowBox>
    <MobileItemRowBox>
      <strong>Status:</strong>
      <Tag type="status" variant={capitalizeFirstLetter(row.status)} />
    </MobileItemRowBox>
    <MobileItemRowBox>
      <strong>Reason:</strong> <TruncatedText title={row.reason}>{row.reason}</TruncatedText>
    </MobileItemRowBox>
    <MobileItemRowBox>
      <strong>Date:</strong> {formatDateTime(row.date)}
    </MobileItemRowBox>
    <MobileItemRowBox>
      <strong>Time:</strong> {getTimeFromDate(row.date)}
    </MobileItemRowBox>
  </>
);

const RequestHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const data = useSelector(selectPendingRequests);
  const { searchData, setRequestHistorySearchData } = useRequestHistorySearchParams();

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const totalPages = Math.ceil(data.count / 10);

  const onPaginationChange = (page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    setRequestHistorySearchData({ offset });
  };

  const handleNavigateNewRequestsPage = () => {
    navigate('/inventory/request-history/pending');
  };

  useEffect(() => {
    dispatch(getRequests(searchData));
  }, [dispatch, searchData]);

  return (
    <Container>
      <Filter data={data} isLoading={isLoading} />

      {data?.newRequestCount > 0 && (
        <BadgeButton onPress={handleNavigateNewRequestsPage} count={data?.newRequestCount} />
      )}
      <MobileList
        columns={mobileColumns}
        data={data?.requests || []}
        expandable={renderExpandableContent}
        currentPage={currentPage}
        totalPages={totalPages}
        onPaginationChange={onPaginationChange}
      />
      <Table
        emptyText="There are no items yet"
        data={data?.requests || []}
        columns={COLUMNS}
        totalPages={totalPages}
        currentPage={currentPage}
        onPaginationChange={onPaginationChange}
        loading={isLoading.pendingRequests}
        hover={true}
      />
    </Container>
  );
};

export default RequestHistory;
