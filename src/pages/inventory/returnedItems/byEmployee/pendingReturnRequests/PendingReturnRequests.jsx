import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';
import { Row } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import MyCheckbox from 'common-ui/myCheckbox';
import { Table } from 'common-ui/table';
import {
  approveManagerEmployeeReturns,
  declineManagerEmployeeReturns,
  getManagerEmployeeReturns,
} from 'features/inventory/inventoryActions';
import {
  selectLoading,
  selectManagerEmployeeReturns,
} from 'features/inventory/inventorySlice';
import { BackToListBtn } from 'pages/projectManagement/singleTicketView/SingleTicketView.styles';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';
import { formatDateTime } from 'utils/dateUtils';

import { ModalButtonWrapper } from '../../ReturnedItems.styles';
import RequestBackModal from '../../employeesHoldingItem/RequestBackModal';
import {
  ActionButtonGroup,
  ActionsSection,
  DeclineModalContent,
  DeclineModalText,
  EllipsisCell,
  FilterSection,
  PendingRequestsContainer,
  QuantityGroup,
  QuantityItem,
  QuantityWrapper,
} from './PendingReturnRequests.styles';
import Filter from './filter/Filter';
import usePendingReturnRequestsSearchParams from './useSearchData';

const PendingReturnRequests = () => {
  const dispatch = useDispatch();
  const pendingRequests = useSelector(selectManagerEmployeeReturns);
  const { searchData, setSearchData, resetSearchData } =
    usePendingReturnRequestsSearchParams();
  const loading = useSelector(selectLoading);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const navigate = useNavigate();

  const requests = pendingRequests?.returns || pendingRequests || [];
  const toggleCheckbox = (uuid) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(uuid) ? newSet.delete(uuid) : newSet.add(uuid);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    const allSelected = selectedIds.size === requests.length;
    setSelectedIds(allSelected ? new Set() : new Set(requests.map((r) => r.uuid || r.id)));
  };

  const pendingReturnRequestsColumns = useMemo(() => [
    {
      title: (
        <MyCheckbox
          selected={selectedIds.size === requests.length && requests.length > 0}
          onClick={toggleSelectAll}
        />
      ),
      dataIndex: 'uuid',
      key: 'select',
      width: 50,
      render: (uuid, row) => (
        <MyCheckbox
          selected={selectedIds.has(uuid || row.id)}
          onClick={() => toggleCheckbox(uuid || row.id)}
        />
      ),
    },
    {
      title: 'Employee Full Name',
      dataIndex: 'employeeFullName',
      key: 'employeeFullName',
    },
    {
      title: 'Role/Occupation',
      dataIndex: 'roleOccupation',
      key: 'roleOccupation',
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Quantities',
      key: 'quantities',
      align: 'center',
      width: '450',
      border: true,
      render: (_, row) => (
        <QuantityWrapper>
          <QuantityGroup>
            <QuantityItem>
              <p>Available</p>
              <p>
                {row.quantityAvailable || 0} {row.unitOfMeasurement}
              </p>
            </QuantityItem>
            <QuantityItem>
              <p>In Use</p>
              <p>
                {row.quantityOnUse || 0} {row.unitOfMeasurement}
              </p>
            </QuantityItem>
            <QuantityItem>
              <p>Requested</p>
              <p>
                {row.quantityRequested || 0} {row.unitOfMeasurement}
              </p>
            </QuantityItem>
          </QuantityGroup>
        </QuantityWrapper>
      ),
    },
    {
      title: 'Request Date',
      dataIndex: 'requestedDate',
      key: 'requestedDate',
      render: (requestDate) => <>{formatDateTime(requestDate, true) || '-'}</>,
    },
    {
      title: 'Request Reason',
      dataIndex: 'reason',
      key: 'reason',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
  ]);

  const mobileColumns = useMemo(() => [
    {
      title: (
        <MyCheckbox
          selected={selectedIds.size === requests.length && requests.length > 0}
          onClick={toggleSelectAll}
        />
      ),
      dataIndex: 'uuid',
      key: 'select',
      width: 50,
      render: (uuid, row) => (
        <MyCheckbox
          selected={selectedIds.has(uuid || row.id)}
          onClick={() => toggleCheckbox(uuid || row.id)}
        />
      ),
    },
    {
      title: 'Employee Full Name',
      dataIndex: 'employeeFullName',
      key: 'employeeFullName',
    },
    {
      title: 'Role/Occupation',
      dataIndex: 'roleOccupation',
      key: 'roleOccupation',
    },
  ]);

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Category Name</ExpandedLabel>
          <ExpandedValue>{row.categoryName}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Item Name</ExpandedLabel>
          <ExpandedValue>{row.itemName}</ExpandedValue>
        </Row>

        <Row>
          <ExpandedLabel>Available</ExpandedLabel>
          <ExpandedValue>
            {row.quantityAvailable || 0} {row.unitOfMeasurement}
          </ExpandedValue>
        </Row>

        <Row>
          <ExpandedLabel>In Use</ExpandedLabel>
          <ExpandedValue>
            {row.quantityOnUse || 0} {row.unitOfMeasurement}
          </ExpandedValue>
        </Row>

        <Row>
          <ExpandedLabel>Requested</ExpandedLabel>
          <ExpandedValue>
            {row.quantityRequested || 0} {row.unitOfMeasurement}
          </ExpandedValue>
        </Row>

        <Row>
          <ExpandedLabel>Request Date</ExpandedLabel>
          <ExpandedValue>{formatDateTime(row.returnDate, true) || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Request Reason</ExpandedLabel>
          <ExpandedValue>{row.requestReason}</ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );

  const handleApprove = () => {
    if (selectedIds.size > 0) {
      setIsApproveModalOpen(true);
    }
  };

  const handleDecline = () => {
    if (selectedIds.size > 0) {
      setIsDeclineModalOpen(true);
    }
  };
  const handleClearSelectedRows = () => {
    setSelectedIds(new Set());
  };

  const transformedSelectedRows = requests
    .filter((request) => selectedIds.has(request.uuid || request.id))
    .map((request) => ({
      employeeName: request.employeeFullName,
      role: request.roleOccupation,
      employeeUuid: request.uuid || request.id,
      quantityAvailable: request.quantityRequested,
      unitOfMeasurement: request.unitOfMeasurement,
      requestReason: request.requestReason,
      categoryName: request.categoryName,
      itemName: request.itemName,
    }));

  const selectedCategory = { value: 'approval' };
  const selectedItemTypeUuid = 'approval';

  const handleApprovalCallback = (approvalData) => {
    const formattedData = approvalData.map((item) => ({
      returnUuid: item.id,
      quantityApproved: item.approvedQuantity,
      notes: item.reason || '',
    }));

    return dispatch(approveManagerEmployeeReturns(formattedData)).then((result) => {
      if (result && result.meta && result.meta.requestStatus === 'fulfilled') {
        dispatch(getManagerEmployeeReturns({ ...searchData, status: 'Pending' }));
      }
      return result;
    });
  };

  const handlePageChange = (page) => {
    setSearchData({ page });
  };

  const handleConfirmDecline = () => {
    const requestIds = Array.from(selectedIds);
    const formattedData = requestIds.map((item) => ({
      returnUuid: item,
      declineReason: declineReason,
    }));
    dispatch(declineManagerEmployeeReturns(formattedData)).then((result) => {
      if (result && result.meta && result.meta.requestStatus === 'fulfilled') {
        setIsDeclineModalOpen(false);
        setSelectedIds(new Set());
        setDeclineReason('');
        dispatch(getManagerEmployeeReturns({ ...searchData, status: 'Pending' }));
      }
      return result;
    });
  };

  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(getManagerEmployeeReturns({ ...searchData, status: 'Pending' }));
  }, [dispatch, JSON.stringify(searchData)]);

  return (
    <PendingRequestsContainer>
      <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>

      <FilterSection>
        <Filter
          searchData={searchData}
          setSearchData={setSearchData}
          resetSearchData={resetSearchData}
        />
      </FilterSection>

      <Table
        columns={pendingReturnRequestsColumns}
        data={requests}
        loading={loading.employeePendingReturnRequests}
        rowKey={(row) => row.uuid || row.id}
        onPaginationChange={handlePageChange}
        currentPage={pendingRequests?.page}
        totalPages={pendingRequests?.totalPages}
      />

      <MobileList
        columns={mobileColumns}
        data={requests || []}
        expandable={renderExpandableContent}
        currentPage={pendingRequests?.page}
        totalPages={pendingRequests?.totalPages}
        onPaginationChange={handlePageChange}
      />

      <ActionsSection>
        <ActionButtonGroup>
          <Button onClick={handleDecline} disabled={selectedIds.size === 0}>
            Decline
          </Button>
          <Button onClick={handleApprove} secondary disabled={selectedIds.size === 0}>
            Approve
          </Button>
        </ActionButtonGroup>
      </ActionsSection>

      <RequestBackModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        selectedRows={transformedSelectedRows}
        selectedItemTypeUuid={selectedItemTypeUuid}
        selectedCategory={selectedCategory}
        onClearSelectedRows={handleClearSelectedRows}
        mode="approve"
        onApprove={handleApprovalCallback}
      />

      <Modal
        title="Rejection of requests"
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        width="600px"
      >
        <DeclineModalContent>
          <DeclineModalText>
            Are you sure you want to reject the requests? You can also leave a comment to
            explain why.
          </DeclineModalText>
          <Input
            placeholder="Tap to add a rejection reason (optional)"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
          />

          <ModalButtonWrapper>
            <Button outlined width={150} onClick={() => setIsDeclineModalOpen(false)}>
              Cancel
            </Button>
            <Button secondary width={150} onClick={handleConfirmDecline}>
              Decline
            </Button>
          </ModalButtonWrapper>
        </DeclineModalContent>
      </Modal>
    </PendingRequestsContainer>
  );
};

export default PendingReturnRequests;
