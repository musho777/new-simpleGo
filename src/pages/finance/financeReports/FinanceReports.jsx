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
  exportFinanceReportsExcel,
  exportFinanceReportsPDF,
  getFinanceReports,
  markFinanceRequestAsDone,
  markFinanceRequestAsSeen,
  rejectFinanceRequest,
} from 'features/financeRequest/financeRequestActions';
import {
  selectFinanceRequestBulkApproveLoading,
  selectFinanceRequestBulkRejectLoading,
  selectReportsCount,
  selectReportsData,
  selectReportsLoading,
  selectReportsPagesCount,
  selectReportsSummary,
} from 'features/financeRequest/financeRequestSlice';
import Tag from 'pages/components/tag';
import { formatDateTime } from 'utils/dateUtils';

import ApproveRate from '../../../assets/finance/approve_rate.svg';
import ApprovedIcon from '../../../assets/finance/approved.svg';
import dollar from '../../../assets/finance/dollar.svg';
import DoneIcon from '../../../assets/finance/done.svg';
import Excel from '../../../assets/finance/excel.svg';
import Pdf from '../../../assets/finance/pdf.svg';
import { FinanceReportsCard } from '../components/financeReportsCard';
import {
  ApproveRejectButtonsWrapper,
  RejectButton,
} from '../financeRequest/FinanceRequest.styles';
import BulkActionModal from '../financeRequest/components/BulkActionModal/BulkActionModal';
import BulkMarkAsSeenModal from '../financeRequest/components/BulkMarkAsSeenModal/BulkMarkAsSeenModal';
import Actions from '../financeRequest/components/actions/Actions';
import {
  CardsGrid,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  ExportWrapper,
  FilterWrapper,
  PDFWrapper,
  PageWrapper,
  PdfIcon,
  PdfText,
  Row,
} from './FinanceReports.styles';
import { Filter } from './components/filter';
import { useFinanceReportsSearchData } from './useSearchData';

const FinanceReports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportsData = useSelector(selectReportsData);
  const loading = useSelector(selectReportsLoading);
  const pageCount = useSelector(selectReportsPagesCount);
  const reportsCount = useSelector(selectReportsCount);
  const { searchData, setFinanceReportsSearchData } = useFinanceReportsSearchData();
  const summary = useSelector(selectReportsSummary);
  const bulkApproveLoading = useSelector(selectFinanceRequestBulkApproveLoading);
  const bulkRejectLoading = useSelector(selectFinanceRequestBulkRejectLoading);

  const [selectedRequests, setSelectedRequests] = useState([]);
  const [bulkActionModalOpen, setBulkActionModalOpen] = useState(false);
  const [bulkActionType, setBulkActionType] = useState('approve');
  const [bulkMarkAsSeenModalOpen, setBulkMarkAsSeenModalOpen] = useState(false);

  const isFilteredToPending = searchData.status === 'Pending Approval';
  const isFilteredToCompleted = searchData.status === 'Completed';
  const shouldShowCheckboxes = isFilteredToPending || isFilteredToCompleted;

  const filteredRequests = useMemo(() => {
    if (shouldShowCheckboxes) {
      return reportsData || [];
    }
    return [];
  }, [reportsData, shouldShowCheckboxes]);

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
    setFinanceReportsSearchData({ offset });
  };

  const handleRowCountChange = (newLimit) => {
    setFinanceReportsSearchData({ limit: newLimit, offset: 0 });
  };

  const truncateText = (text, maxLength = 16) => {
    if (!text) return '-';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const formatCurrency = (amount, currency) => {
    if (amount === 0 || amount === null || amount === undefined) return '0';

    const formattedAmount = Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
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
    if (checked && reportsData) {
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
      if (reportsData?.length === 1 && currentPage > 1) {
        setFinanceReportsSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceReports(searchData));
      }
    } catch (error) {
      console.error(`Failed to ${actionType} requests:`, error);
    }
  };

  const handleExportPDF = () => {
    dispatch(exportFinanceReportsPDF(searchData));
  };

  const handleExportExcel = () => {
    dispatch(exportFinanceReportsExcel(searchData));
  };

  const handleViewReport = (uuid) => {
    navigate(`/finance/finance-report/${uuid}`);
  };

  const handleEditRequest = (id) => {
    navigate(`/finance/finance-request/${id}/edit`);
  };

  const handleChangeStatus = async (id, approvalData) => {
    try {
      await dispatch(approveFinanceRequest({ id: id, approvalData })).unwrap();

      if (reportsData?.length === 1 && currentPage > 1) {
        setFinanceReportsSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceReports(searchData));
      }
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleReject = async (id, rejectionReason) => {
    try {
      await dispatch(rejectFinanceRequest({ id: id, rejectionReason })).unwrap();

      if (reportsData?.length === 1 && currentPage > 1) {
        setFinanceReportsSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceReports(searchData));
      }
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  const handleMarkAsDone = async (id, doneData) => {
    try {
      await dispatch(markFinanceRequestAsDone({ id: id, doneData })).unwrap();

      if (reportsData?.length === 1 && currentPage > 1) {
        setFinanceReportsSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceReports(searchData));
      }
    } catch (error) {
      console.error('Failed to mark request as done:', error);
    }
  };

  const handleMarkAsSeen = async (uuid) => {
    try {
      await dispatch(markFinanceRequestAsSeen({ uuid })).unwrap();
      dispatch(getFinanceReports(searchData));
    } catch (error) {
      console.error('Failed to mark request as seen:', error);
    }
  };

  const handleSplit = async (id, splitData) => {
    try {
      await dispatch(approveFinanceRequest({ id: id, approvalData: splitData })).unwrap();

      if (reportsData?.length === 1 && currentPage > 1) {
        setFinanceReportsSearchData({ offset: (searchData.offset || 0) - searchData.limit });
      } else {
        dispatch(getFinanceReports(searchData));
      }
    } catch (error) {
      console.error('Failed to split request:', error);
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
              return (
                <input
                  type="checkbox"
                  checked={selectedRequests.includes(record.uuid || record.id)}
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
      dataIndex: 'requestId',
      key: 'requestId',
      width: 90,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 350,
      resize: true,
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
    },
    {
      title: 'Approved Amount',
      dataIndex: 'amountProvided',
      key: 'amountProvided',
      render: (data, row) =>
        data !== 0 ? (
          <>
            {data} {row.currency}
          </>
        ) : (
          <>-</>
        ),
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
    {
      title: 'Requester',
      dataIndex: 'requester',
      key: 'requester',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span>{truncateText(text)}</span>;
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date) => formatDateTime(date, true),
    },
  ];

  const additionalColumns = [
    {
      title: 'Flow Type',
      dataIndex: 'flowType',
      key: 'flowType',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span>{truncateText(text)}</span>;
      },
      additional: true,
    },
    {
      title: 'Expense Type',
      dataIndex: 'expenseType',
      key: 'expenseType',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span>{truncateText(text)}</span>;
      },
      additional: true,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      renderTooltip: (data) => {
        const departmentNames = data?.map((dept) => dept.name).join(', ') || '-';
        return departmentNames?.length > 16 && <span>{departmentNames}</span>;
      },
      render: (data) => {
        if (!data) {
          return <span>-</span>;
        }

        if (typeof data === 'string') {
          return <span>{truncateText(data)}</span>;
        }

        if (Array.isArray(data)) {
          const departmentNames = data.map((dept) => dept.name).join(', ');
          return <span>{truncateText(departmentNames)}</span>;
        }

        if (data.name) {
          return <span>{truncateText(data.name)}</span>;
        }

        return <span>-</span>;
      },
      additional: true,
    },
    {
      title: 'Completion Date',
      dataIndex: 'approvedRejectedDate',
      key: 'approvedRejectedDate',
      render: (date) => <>{date ? formatDateTime(date, true) : <span>-</span>}</>,
      additional: true,
    },
    {
      title: 'Requested Amount',
      dataIndex: 'amountRequested',
      key: 'amountRequested',
      render: (date, row) => (
        <>
          {date} {row.currency}
        </>
      ),
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
    width: 90,
    render: (_, record, index) => {
      const isLastTwo = reportsData && index >= reportsData.length - 2;
      return (
        <Actions
          id={record.uuid}
          record={record}
          onView={(id) => handleViewReport(id)}
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

  // Add column function
  const addColumn = (column) => {
    setTableColumns((prev) => {
      const newColumns = [...prev];
      newColumns.push(column);
      return newColumns;
    });
    setAvailableColumns((prev) => prev.filter((col) => col.key !== column.key));
  };

  // Remove column function
  const removeColumn = (column) => {
    setTableColumns((prev) => prev.filter((col) => col.key !== column.key));
    const columnToAdd = additionalColumns.find((col) => col.key === column.key);
    if (columnToAdd) {
      setAvailableColumns((prev) => [...prev, columnToAdd]);
    }
  };

  // Final columns array with actions at the end
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
              return (
                <input
                  type="checkbox"
                  checked={selectedRequests.includes(record.uuid || record.id)}
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
      dataIndex: 'requestId',
      key: 'requestId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',

      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span>{truncateText(text)}</span>;
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
          <ExpandedLabel>Requested Amount</ExpandedLabel>
          <ExpandedValue>
            {row.amountRequested} {row.currency}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Approved Amount</ExpandedLabel>
          <ExpandedValue>
            {row.amountProvided !== 0 ? (
              <>
                {row.amountProvided} {row.currency}
              </>
            ) : (
              <>-</>
            )}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Requester</ExpandedLabel>
          <ExpandedValue>{row.requester || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Department</ExpandedLabel>
          <ExpandedValue>
            {(() => {
              if (!row.department || row.department === 'N/A') return '-';
              if (typeof row.department === 'string') return row.department;
              if (Array.isArray(row.department)) {
                return row.department.map((dept) => dept.name).join(', ');
              }
              if (row.department.name) return row.department.name;
              return '-';
            })()}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Created Date</ExpandedLabel>
          <ExpandedValue>{formatDateTime(row.createdDate, true)}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Completion Date</ExpandedLabel>
          <ExpandedValue>
            {row.approvedRejectedDate ? formatDateTime(row.approvedRejectedDate, true) : '-'}
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    );
  };

  useEffect(() => {
    dispatch(getFinanceReports(searchData));
  }, [searchData]);

  useEffect(() => {
    if (reportsData && selectedRequests.length > 0) {
      const validSelections = selectedRequests.filter((selectedId) => {
        return reportsData.some((req) => (req.uuid || req.id) === selectedId);
      });

      if (validSelections.length !== selectedRequests.length) {
        setSelectedRequests(validSelections);
      }
    }
  }, [reportsData, selectedRequests]);

  useEffect(() => {
    setSelectedRequests([]);
  }, [searchData.status]);

  const renderContent = () => {
    return (
      <>
        <CardsGrid>
          <FinanceReportsCard
            amount={formatCurrency(
              summary?.totalRequestedAmount ?? 0,
              searchData.currency || 'AMD'
            )}
            status={'Total Requested'}
            borderColor={'#1D3557'}
            icon={dollar}
            loading={loading}
          />
          <FinanceReportsCard
            amount={formatCurrency(
              summary?.totalApprovedAmount ?? 0,
              searchData.currency || 'AMD'
            )}
            status={'Total Approval'}
            borderColor={'#15C7A7'}
            icon={DoneIcon}
            loading={loading}
          />
          <FinanceReportsCard
            amount={formatCurrency(
              summary?.totalPaidAmount ?? 0,
              searchData.currency || 'AMD'
            )}
            status={'Total Paid'}
            borderColor={'#2D6CDF'}
            icon={ApprovedIcon}
            loading={loading}
          />
          <FinanceReportsCard
            amount={formatCurrency(summary?.seenTotal ?? 0, searchData.currency || 'AMD')}
            status={'Seen'}
            borderColor={'#15C7A7'}
            icon={DoneIcon}
            loading={loading}
          />
          <FinanceReportsCard
            amount={`${(summary?.approvalRate ?? 0).toFixed(2)} %`}
            status={'Approval Rate'}
            icon={ApproveRate}
            loading={loading}
          />
        </CardsGrid>

        <ExportWrapper>
          <PDFWrapper onClick={handleExportPDF}>
            <PdfIcon src={Pdf} alt="PDf" />
            <PdfText>Export PDF</PdfText>
          </PDFWrapper>
          <PDFWrapper onClick={handleExportExcel}>
            <PdfIcon src={Excel} alt="Excel" />
            <PdfText color="#15C7A7"> Export Excel</PdfText>
          </PDFWrapper>
        </ExportWrapper>

        <FilterWrapper>
          <Filter searchData={searchData} setSearchData={setFinanceReportsSearchData} />
        </FilterWrapper>

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
          data={reportsData}
          columns={columns}
          loading={loading}
          currentPage={currentPage}
          totalPages={pageCount}
          onPaginationChange={onPaginationChange}
          editableRowCount
          count={searchData.limit}
          dataCount={reportsCount}
          handleRowCountChange={handleRowCountChange}
          pageOptions={[10, 25, 50, 100]}
          resizable={true}
          scrollable={true}
          additionalColumns={availableColumns}
          onAdd={addColumn}
          removeRow={removeColumn}
        />
        <MobileList
          columns={mobileColumns}
          data={reportsData}
          expandable={renderExpandableContent}
          onPaginationChange={onPaginationChange}
          currentPage={currentPage}
          loading={loading}
          totalPages={pageCount}
          editableRowCount
          count={searchData.limit}
          dataCount={reportsCount}
          handleRowCountChange={handleRowCountChange}
          pageOptions={[10, 25, 50, 100]}
        />
      </>
    );
  };

  return (
    <PageWrapper>
      {renderContent()}
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

export default FinanceReports;
