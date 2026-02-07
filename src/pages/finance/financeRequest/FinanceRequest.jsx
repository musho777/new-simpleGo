import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import {
  approveFinanceRequest,
  bulkApproveFinanceRequests,
  bulkMarkAsSeenFinanceRequests,
  bulkRejectFinanceRequests,
  getFinanceRequests,
  markFinanceRequestAsDone,
  markFinanceRequestAsSeen,
  rejectFinanceRequest,
  updateFinanceRequest,
} from 'features/financeRequest/financeRequestActions';
import {
  selectFinanceRequestBulkApproveLoading,
  selectFinanceRequestBulkRejectLoading,
  selectFinanceRequestLoading,
  selectFinanceRequestPagesCount,
  selectFinanceRequests,
  selectSummary,
} from 'features/financeRequest/financeRequestSlice';
import Tag from 'pages/components/tag';
import FinanceRequestModal from 'pages/finance/financeRequest/components/FinanceRequestModal';
import { formatDateTime } from 'utils/dateUtils';

import ApprovedIcon from '../../../assets/finance/approved.svg';
import DoneIcon from '../../../assets/finance/done.svg';
import PendingIcon from '../../../assets/finance/pending.svg';
import RejectedIcon from '../../../assets/finance/rejected.svg';
import { FinanceReportsCard } from '../components/financeReportsCard';
import {
  ApproveRejectButtonsWrapper,
  CardsGrid,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  FilterWrapper,
  MobileActions,
  MobileActionsWrapper,
  PageWrapper,
  RejectButton,
  Row,
} from './FinanceRequest.styles';
import BulkActionModal from './components/BulkActionModal/BulkActionModal';
import BulkMarkAsSeenModal from './components/BulkMarkAsSeenModal/BulkMarkAsSeenModal';
import Actions from './components/actions/Actions';
import { Filter } from './components/filter';
import { useFinanceRequestSearchData } from './useSearchData';

const FinanceRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(selectFinanceRequests);
  const loading = useSelector(selectFinanceRequestLoading);
  const pageCount = useSelector(selectFinanceRequestPagesCount);
  const totalCount = useSelector((state) => state.financeRequest.totalCount);
  const bulkApproveLoading = useSelector(selectFinanceRequestBulkApproveLoading);
  const bulkRejectLoading = useSelector(selectFinanceRequestBulkRejectLoading);
  const { searchData, setFinanceRequestSearchData, defaultSearchData } =
    useFinanceRequestSearchData();

  const hasActiveFilters = useMemo(() => {
    return JSON.stringify(searchData) !== JSON.stringify(defaultSearchData);
  }, [searchData, defaultSearchData]);
  const summary = useSelector(selectSummary);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [bulkActionModalOpen, setBulkActionModalOpen] = useState(false);
  const [bulkActionType, setBulkActionType] = useState('approve');
  const [bulkMarkAsSeenModalOpen, setBulkMarkAsSeenModalOpen] = useState(false);

  const isFilteredToPending = searchData.status === 'Pending Approval';
  const isFilteredToCompleted = searchData.status === 'Completed';
  const shouldShowCheckboxes = isFilteredToPending || isFilteredToCompleted;

  const filteredRequests = useMemo(() => {
    if (isFilteredToPending) {
      return data?.filter((request) => request.status === 'Pending Approval') || [];
    } else if (isFilteredToCompleted) {
      return data?.filter((request) => request.status === 'Completed') || [];
    }
    return data?.filter((request) => request.status === 'Pending Approval') || [];
  }, [data, isFilteredToPending, isFilteredToCompleted]);

  const allFilteredSelected = useMemo(() => {
    return (
      filteredRequests.length > 0 &&
      filteredRequests.every((req) => selectedRequests.includes(req.uuid || req.id))
    );
  }, [filteredRequests, selectedRequests]);

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const onPaginationChange = (page) => {
    const offset = (page - 1) * searchData.limit;
    setFinanceRequestSearchData({ offset });
  };

  const handleRowCountChange = (newLimit) => {
    setFinanceRequestSearchData({ limit: newLimit, offset: 0 });
  };
  const truncateText = (text, maxLength = 16) => {
    if (!text) return '-';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const formatCurrency = (amount, currency) => {
    if (amount === 0 || amount === null || amount === undefined) return '0';

    const formattedAmount = Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    const currencySymbols = {
      AMD: '֏',
      USD: '$',
      EUR: '€',
      RUB: '₽',
    };
    const leftSide = ['USD', 'EUR'];
    const symbol = currencySymbols[currency] || currency;
    return leftSide.includes(currency)
      ? `${symbol} ${formattedAmount}`
      : `${formattedAmount} ${symbol}`;
  };

  const handleSelectAll = (checked) => {
    if (checked && data) {
      setSelectedRequests(filteredRequests.map((request) => request.uuid || request.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId, checked) => {
    if (checked) {
      setSelectedRequests((prev) => [...prev, requestId]);
    } else {
      setSelectedRequests((prev) => prev.filter((id) => id !== requestId));
    }
  };

  const handleBulkAction = (actionType) => {
    if (selectedRequests.length === 0) return;

    switch (actionType) {
      case 'approve':
      case 'reject':
        setBulkActionType(actionType);
        setBulkActionModalOpen(true);
        break;
      case 'markAsSeen':
        setBulkMarkAsSeenModalOpen(true);
        break;
      default:
        console.error('Unknown bulk action type:', actionType);
    }
  };

  const handleBulkActionConfirm = async (actionType, notes = null) => {
    try {
      switch (actionType) {
        case 'approve':
          await dispatch(
            bulkApproveFinanceRequests({
              requestUuids: selectedRequests,
              notes: notes || '',
            })
          ).unwrap();
          setBulkActionModalOpen(false);
          break;
        case 'reject':
          await dispatch(
            bulkRejectFinanceRequests({
              requestUuids: selectedRequests,
              rejectionReason: notes,
            })
          ).unwrap();
          setBulkActionModalOpen(false);
          break;
        case 'markAsSeen':
          await dispatch(
            bulkMarkAsSeenFinanceRequests({
              requestUuids: selectedRequests,
            })
          ).unwrap();
          setBulkMarkAsSeenModalOpen(false);
          break;
        default:
          console.error('Unknown bulk action type:', actionType);
          return;
      }

      setSelectedRequests([]);
      if (data?.length === 1 && currentPage > 1) {
        setFinanceRequestSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceRequests(searchData));
      }
    } catch (error) {
      console.error(`Failed to ${actionType} requests:`, error);
    }
  };

  const mainColumns = [
    ...(shouldShowCheckboxes
      ? [
          {
            title: (
              <input
                type="checkbox"
                checked={allFilteredSelected}
                disabled={filteredRequests.length === 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            ),
            key: 'select',
            width: 50,
            render: (_, record) => {
              const canSelect =
                (isFilteredToPending && record.status === 'Pending Approval') ||
                (isFilteredToCompleted && record.status === 'Completed');
              return (
                <input
                  type="checkbox"
                  checked={selectedRequests.includes(record.uuid || record.id)}
                  disabled={!canSelect}
                  onChange={(e) =>
                    handleSelectRequest(record.uuid || record.id, e.target.checked)
                  }
                />
              );
            },
          },
        ]
      : []),
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 90,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 400,
      resize: true,
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amountRequested',
      key: 'amountRequested',
      render: (data, row) => formatCurrency(data, row.currency),
    },
    {
      title: 'Requester',
      dataIndex: 'requester',
      key: 'requester',
      render: (requester) => (
        <>
          {requester?.name} {requester?.surname}
        </>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'requestedDate',
      key: 'requestedDate',
      render: (date) => formatDateTime(date, true),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return (
          <>
            <Tag
              type="financeStatus"
              variant={status === 'Pending Approval' ? 'Pending' : status}
            />
          </>
        );
      },
    },
  ];

  const additionalColumns = [
    {
      title: 'Flow Type',
      dataIndex: 'flowType',
      key: 'flowType',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span style={{ cursor: 'pointer' }}>{truncateText(text)}</span>;
      },
      additional: true,
    },
    {
      title: 'Expense Type',
      dataIndex: 'expenseType',
      key: 'expenseType',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span style={{ cursor: 'pointer' }}>{truncateText(text)}</span>;
      },
      additional: true,
    },
  ];

  const [tableColumns, setTableColumns] = useState([...mainColumns]);
  const [availableColumns, setAvailableColumns] = useState([...additionalColumns]);

  useEffect(() => {
    setTableColumns((prev) => {
      const additionalCols = prev.filter((col) => col.additional);
      return [...mainColumns, ...additionalCols];
    });
  }, [shouldShowCheckboxes, selectedRequests, allFilteredSelected, filteredRequests]);

  const actionsColumn = {
    title: 'Actions',
    key: 'actions',
    render: (_, record, index) => {
      const isLastTwo = data && index >= data.length - 2;
      return (
        <Actions
          status={record.status}
          id={record.uuid || record.id}
          record={record}
          onView={handleViewRequest}
          onEdit={handleEditRequest}
          onApprove={handleChangeStatus}
          onReject={handleReject}
          onMarkAsDone={handleMarkAsDone}
          onMarkAsSeen={handleMarkAsSeen}
          onSplit={handleSplit}
          dropdownPosition={isLastTwo ? 'up' : 'down'}
        />
      );
    },
  };

  const addColumn = (column) => {
    setTableColumns((prev) => {
      const newColumns = [...prev];
      newColumns.push(column);
      return newColumns;
    });
    setAvailableColumns((prev) => prev.filter((col) => col.key !== column.key));
  };

  const removeColumn = (column) => {
    setTableColumns((prev) => prev.filter((col) => col.key !== column.key));
    const columnToAdd = additionalColumns.find((col) => col.key === column.key);
    if (columnToAdd) {
      setAvailableColumns((prev) => [...prev, columnToAdd]);
    }
  };

  const columns = [...tableColumns, actionsColumn];

  const mobileColumns = [
    ...(shouldShowCheckboxes
      ? [
          {
            title: (
              <input
                type="checkbox"
                checked={allFilteredSelected}
                disabled={filteredRequests.length === 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            ),
            key: 'select',
            width: 50,
            render: (_, record) => {
              const canSelect =
                (isFilteredToPending && record.status === 'Pending Approval') ||
                (isFilteredToCompleted && record.status === 'Completed');
              return (
                <input
                  type="checkbox"
                  checked={selectedRequests.includes(record.uuid || record.id)}
                  disabled={!canSelect}
                  onChange={(e) =>
                    handleSelectRequest(record.uuid || record.id, e.target.checked)
                  }
                />
              );
            },
          },
        ]
      : []),
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span style={{ cursor: 'pointer' }}>{truncateText(text)}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return (
          <Tag
            type="financeStatus"
            variant={status === 'Pending Approval' ? 'Pending' : status}
          />
        );
      },
    },
  ];

  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>Flow Type</ExpandedLabel>
            <ExpandedValue>{row.flowType || '-'}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Expense Type</ExpandedLabel>
            <ExpandedValue>{row.expenseType || '-'}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Amount</ExpandedLabel>
            <ExpandedValue>{formatCurrency(row.amountRequested, row.currency)}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Requester</ExpandedLabel>
            <ExpandedValue>
              {row.requester?.name} {row.requester?.surname}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Created Date</ExpandedLabel>
            <ExpandedValue>{formatDateTime(row.requestedDate, true)}</ExpandedValue>
          </Row>
        </ExpandableWrapper>
        <MobileActionsWrapper>
          <MobileActions>
            <Actions
              status={row.status}
              id={row.uuid || row.id}
              record={row}
              onView={handleViewRequest}
              onEdit={handleEditRequest}
              onApprove={handleChangeStatus}
              onReject={handleReject}
              onMarkAsDone={handleMarkAsDone}
              onMarkAsSeen={handleMarkAsSeen}
              onSplit={handleSplit}
              dropdownPosition="up"
              isMobile
            />
          </MobileActions>
        </MobileActionsWrapper>
      </>
    );
  };

  const handleCreateRequest = async (requestData, editId = null) => {
    try {
      if (editId) {
        await dispatch(updateFinanceRequest({ id: editId, requestData })).unwrap();
      }
      dispatch(getFinanceRequests(searchData));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingRequest(null);
  };

  const handleViewRequest = (id) => {
    navigate(`/finance/finance-request/${id}`);
  };

  const handleEditRequest = (id) => {
    setEditingRequest({ id });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleChangeStatus = async (id, approvalData) => {
    try {
      await dispatch(approveFinanceRequest({ id: id, approvalData })).unwrap();

      if (data?.length === 1 && currentPage > 1) {
        setFinanceRequestSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceRequests(searchData));
      }
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleReject = async (id, rejectionReason) => {
    try {
      await dispatch(rejectFinanceRequest({ id: id, rejectionReason })).unwrap();

      if (data?.length === 1 && currentPage > 1) {
        setFinanceRequestSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceRequests(searchData));
      }
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleMarkAsDone = async (id, doneData) => {
    try {
      await dispatch(markFinanceRequestAsDone({ id: id, doneData })).unwrap();

      if (data?.length === 1 && currentPage > 1) {
        setFinanceRequestSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceRequests(searchData));
      }
    } catch (error) {
      console.error('Failed to mark request as done:', error);
    }
  };

  const handleMarkAsSeen = async (uuid) => {
    try {
      await dispatch(markFinanceRequestAsSeen({ uuid })).unwrap();
      dispatch(getFinanceRequests(searchData));
    } catch (error) {
      console.error('Failed to mark request as seen:', error);
    }
  };

  const handleSplit = async (id, splitData) => {
    try {
      await dispatch(approveFinanceRequest({ id: id, approvalData: splitData })).unwrap();
      if (data?.length === 1 && currentPage > 1) {
        setFinanceRequestSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceRequests(searchData));
      }
    } catch (error) {
      console.error('Failed to split request:', error);
    }
  };

  useEffect(() => {
    dispatch(getFinanceRequests(searchData));
  }, [searchData]);

  useEffect(() => {
    if (data && selectedRequests.length > 0) {
      const validSelections = selectedRequests.filter((selectedId) => {
        const request = data.find((req) => (req.uuid || req.id) === selectedId);
        if (!request) return false;

        if (isFilteredToPending) {
          return request.status === 'Pending Approval';
        } else if (isFilteredToCompleted) {
          return request.status === 'Completed';
        }
        return false;
      });

      if (validSelections.length !== selectedRequests.length) {
        setSelectedRequests(validSelections);
      }
    }
  }, [data, selectedRequests, isFilteredToPending, isFilteredToCompleted]);

  useEffect(() => {
    setSelectedRequests([]);
  }, [searchData.status]);

  return (
    <PageWrapper>
      <CardsGrid>
        <FinanceReportsCard
          amount={formatCurrency(summary?.pendingAmount ?? 0, searchData.currency || 'AMD')}
          status={'Pending Approval'}
          borderColor={'#FF6A00'}
          icon={PendingIcon}
          loading={loading}
        />
        <FinanceReportsCard
          amount={formatCurrency(summary?.approvedAmount ?? 0, searchData.currency || 'AMD')}
          status={'Approved'}
          borderColor={'#2D6CDF'}
          icon={ApprovedIcon}
          loading={loading}
        />
        <FinanceReportsCard
          amount={formatCurrency(summary?.rejectedAmount ?? 0, searchData.currency || 'AMD')}
          status={'Rejected'}
          borderColor={'#E63946'}
          icon={RejectedIcon}
          loading={loading}
        />
        <FinanceReportsCard
          amount={formatCurrency(summary?.completedAmount ?? 0, searchData.currency || 'AMD')}
          status={'Done'}
          borderColor={'#15C7A7'}
          icon={DoneIcon}
          loading={loading}
        />
        <FinanceReportsCard
          amount={formatCurrency(summary?.seenAmount ?? 0, searchData.currency || 'AMD')}
          status={'Seen'}
          borderColor={'#15C7A7'}
          icon={DoneIcon}
          loading={loading}
        />
      </CardsGrid>
      {(totalCount !== 0 || hasActiveFilters) && (
        <FilterWrapper>
          <Filter searchData={searchData} setSearchData={setFinanceRequestSearchData} />
        </FilterWrapper>
      )}

      {selectedRequests.length > 0 && isFilteredToPending && (
        <ApproveRejectButtonsWrapper>
          <Button
            secondary
            onClick={() => handleBulkAction('approve')}
            type="primary"
            loading={bulkApproveLoading}
            disabled={bulkApproveLoading || bulkRejectLoading}
          >
            Approve Selected ({selectedRequests.length})
          </Button>
          <RejectButton>
            <Button
              secondary
              onClick={() => handleBulkAction('reject')}
              danger
              loading={bulkRejectLoading}
              disabled={bulkApproveLoading || bulkRejectLoading}
            >
              Reject Selected ({selectedRequests.length})
            </Button>
          </RejectButton>
        </ApproveRejectButtonsWrapper>
      )}

      {selectedRequests.length > 0 && isFilteredToCompleted && (
        <ApproveRejectButtonsWrapper>
          <Button secondary onClick={() => handleBulkAction('markAsSeen')} type="primary">
            Mark as Seen ({selectedRequests.length})
          </Button>
        </ApproveRejectButtonsWrapper>
      )}
      <Table
        data={data || []}
        columns={columns}
        loading={loading}
        currentPage={currentPage}
        totalPages={pageCount}
        onPaginationChange={onPaginationChange}
        editableRowCount
        count={searchData.limit}
        dataCount={totalCount}
        handleRowCountChange={handleRowCountChange}
        pageOptions={[10, 25, 50, 100]}
        resizable={true}
        additionalColumns={availableColumns}
        onAdd={addColumn}
        removeRow={removeColumn}
        scrollable={true}
      />
      <MobileList
        columns={mobileColumns}
        data={data || []}
        expandable={renderExpandableContent}
        onPaginationChange={onPaginationChange}
        currentPage={currentPage}
        loading={loading}
        totalPages={pageCount}
        editableRowCount
        count={searchData.limit}
        dataCount={totalCount}
        handleRowCountChange={handleRowCountChange}
        pageOptions={[10, 25, 50, 100]}
      />

      <FinanceRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateRequest}
        editId={editingRequest?.id}
        isEditMode={isEditMode}
      />
      <BulkActionModal
        isOpen={bulkActionModalOpen}
        onClose={() => setBulkActionModalOpen(false)}
        onSubmit={(data) => handleBulkActionConfirm(bulkActionType, data)}
        selectedCount={selectedRequests.length}
        loading={bulkActionType === 'approve' ? bulkApproveLoading : bulkRejectLoading}
        actionType={bulkActionType}
      />
      <BulkMarkAsSeenModal
        isOpen={bulkMarkAsSeenModalOpen}
        onClose={() => setBulkMarkAsSeenModalOpen(false)}
        onMarkAsSeen={() => handleBulkActionConfirm('markAsSeen')}
        selectedCount={selectedRequests.length}
      />
    </PageWrapper>
  );
};

export default FinanceRequest;
