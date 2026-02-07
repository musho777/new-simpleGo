import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import MyCheckbox from 'common-ui/myCheckbox';
import { Table } from 'common-ui/table';
import {
  approveItemRequests,
  getRequests,
  rejectItemRequests,
} from 'features/inventory/inventoryActions';
import {
  selectLoading,
  selectPendingRequests,
  selectSuccess,
  setResetRequestsApproveRejectSuccess,
} from 'features/inventory/inventorySlice';
import Tag from 'pages/components/tag';
import { formatDateTime, getTimeFromDate } from 'utils/dateUtils';

import { TruncatedText } from '../requestHistory/RequestHistory.styles';
import ApproveModal from './ApproveModal';
import {
  ApproveOrReject,
  Container,
  DescriptionLimitSpan,
  EllipsisCell,
  LightTooltip,
  MobileItemRowBox,
  RequestCheckBox,
  SelectAndRequesterName,
} from './NewRequests.styles';
import RejectModal from './RejectModal';
import Filter from './filter/Filter';
import { useNewRequestSearchParams } from './useSearchData';

const NewRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectPendingRequests);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);

  const { requests = [], count } = data;
  const [lastSubmittedCount, setLastSubmittedCount] = useState(0);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const { searchData, setNewRequestSearchData } = useNewRequestSearchParams();

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);
  const totalPages = Math.ceil(count / 10);

  const onPaginationChange = (page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    setNewRequestSearchData({ offset });
  };

  useEffect(() => {
    dispatch(getRequests({ ...searchData, status: 'pending' }));
  }, [dispatch, searchData]);

  const toggleCheckbox = (uuid) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(uuid) ? newSet.delete(uuid) : newSet.add(uuid);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    const allSelected = selectedIds.size === requests.length;
    setSelectedIds(allSelected ? new Set() : new Set(requests.map((r) => r.uuid)));
  };

  const selectedRequests = requests.filter((r) => selectedIds.has(r.uuid));

  const handleApprove = (requests) => {
    setLastSubmittedCount(requests.length);
    dispatch(approveItemRequests({ requests }));
  };

  const handleReject = (requests) => {
    setLastSubmittedCount(requests.length);
    dispatch(rejectItemRequests({ requests }));
  };

  useEffect(() => {
    if (success.rejectItemRequests || success.approveItemRequests) {
      setIsApproveOpen(false);
      setIsRejectOpen(false);
      setSelectedIds(new Set());
      setNewRequestSearchData({
        ...searchData,
        limit: 10,
        offset: 0,
      });

      dispatch(getRequests({ ...searchData, status: 'pending' })).then((r) => {
        if (r?.payload?.newRequestCount === 0) {
          navigate(-1);
        }
      });

      dispatch(setResetRequestsApproveRejectSuccess());
    }
  }, [
    dispatch,
    success.rejectItemRequests,
    success.approveItemRequests,
    searchData,
    navigate,
    lastSubmittedCount,
  ]);

  const COLUMNS = useMemo(() => [
    {
      title: (
        <RequestCheckBox>
          <MyCheckbox
            selected={selectedIds.size === requests.length && requests.length > 0}
            onClick={toggleSelectAll}
          />
        </RequestCheckBox>
      ),
      dataIndex: 'uuid',
      key: 'select',
      render: (uuid) => (
        <MyCheckbox selected={selectedIds.has(uuid)} onClick={() => toggleCheckbox(uuid)} />
      ),
    },
    { title: 'Requester', dataIndex: 'requesterName', key: 'requesterName' },
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, data) => (
        <p>
          {quantity} {data.unitOfMeasurement}
        </p>
      ),
    },
    {
      title: 'Usage',
      dataIndex: 'usage',
      key: 'usage',
      render: (usage) => <Tag type="usage" variant={usage} />,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (text) => {
        return (
          <LightTooltip title={text.length > 25 ? text : ''} placement="top-start">
            <DescriptionLimitSpan>{text}</DescriptionLimitSpan>
          </LightTooltip>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: formatDateTime,
    },
    {
      title: 'Time',
      dataIndex: 'date',
      key: 'time',
      render: getTimeFromDate,
    },
  ]);

  const mobileColumns = [
    {
      title: 'Requester',
      dataIndex: 'uuid',
      render: (uuid, row) => (
        <>
          <SelectAndRequesterName>
            <MyCheckbox
              selected={selectedIds.has(uuid)}
              onClick={() => toggleCheckbox(uuid)}
            />
            <div>{row.requesterName}</div>
          </SelectAndRequesterName>
        </>
      ),
    },
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      render: (_, row) => <div>{row.itemName}</div>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (_, row) => <div>{row.quantity}</div>,
    },
  ];

  const renderExpandableContent = (row) => (
    <>
      <MobileItemRowBox>
        <strong>Usage:</strong> <Tag type="usage" variant={row.usage} />
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

  return (
    <Container>
      <Filter requests={requests} isLoading={isLoading} />

      <MobileList
        columns={mobileColumns}
        data={requests}
        expandable={renderExpandableContent}
        currentPage={currentPage}
        totalPages={totalPages}
        externalComponent={
          <>
            <ApproveOrReject>
              <Button
                width={100}
                disabled={selectedRequests.length === 0}
                onClick={() => setIsRejectOpen(true)}
              >
                Reject
              </Button>
              <Button
                width={100}
                secondary
                disabled={selectedRequests.length === 0}
                onClick={() => setIsApproveOpen(true)}
              >
                Approve
              </Button>
            </ApproveOrReject>
          </>
        }
        onPaginationChange={onPaginationChange}
      />

      <Table
        loading={isLoading.pendingRequests}
        data={requests}
        columns={COLUMNS}
        currentPage={currentPage}
        totalPages={totalPages}
        onPaginationChange={onPaginationChange}
        externalComponent={
          <>
            <ApproveOrReject>
              <Button
                width={100}
                disabled={selectedRequests.length === 0}
                onClick={() => setIsRejectOpen(true)}
              >
                Reject
              </Button>
              <Button
                width={100}
                secondary
                disabled={selectedRequests.length === 0}
                onClick={() => setIsApproveOpen(true)}
              >
                Approve
              </Button>
            </ApproveOrReject>
          </>
        }
      />

      <ApproveModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onSubmit={handleApprove}
        selectedRequests={selectedRequests}
        isLoading={isLoading.approveItemRequests}
      />

      <RejectModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onSubmit={handleReject}
        selectedRequests={selectedRequests}
        isLoading={isLoading.rejectItemRequests}
      />
    </Container>
  );
};

export default NewRequests;
