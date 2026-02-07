import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import { Row } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import MobileList from 'common-ui/mobileList';
import MyCheckbox from 'common-ui/myCheckbox';
import { Table } from 'common-ui/table';
import {
  approveEmployeeReturnRequests,
  getEmployeePendingReturnRequests,
} from 'features/inventory/inventoryActions';
import {
  selectEmployeePendingReturnRequests,
  selectLoading,
} from 'features/inventory/inventorySlice';
import Success from 'pages/components/success/Success';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';

import DeclineModal from './DeclineModal';
import { ApproveOrReject, EllipsisCell } from './NewRequests.styles';
import useSearchData from './useSearchData';

const NewReturnedRequests = () => {
  const dispatch = useDispatch();
  const pendingRequests = useSelector(selectEmployeePendingReturnRequests);
  const loading = useSelector(selectLoading);
  const { searchData, setSearchData } = useSearchData();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [showApproveSuccess, setShowApproveSuccess] = useState(false);

  const requests = pendingRequests?.data || [];
  const selectedRequests = requests.filter((request) =>
    selectedIds.has(request.uuid || request.id)
  );

  const toggleCheckbox = (uuid) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(uuid) ? newSet.delete(uuid) : newSet.add(uuid);
      return newSet;
    });
  };

  const columns = useMemo(() => [
    {
      title: '',
      dataIndex: 'uuid',
      key: 'select',
      render: (_, record) => (
        <MyCheckbox
          selected={selectedIds.has(record.uuid || record.id)}
          onClick={() => toggleCheckbox(record.uuid || record.id)}
          uuid={record.uuid || record.id}
        />
      ),
    },
    {
      title: 'Category NAME',
      key: 'categoryName',
      dataIndex: 'categoryName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Item Name',
      key: 'itemName',
      dataIndex: 'itemName',
    },
    {
      title: 'Quantity Available',
      key: 'quantityAvailable',
      dataIndex: 'quantityAvailable',
      render: (quantityAvailable, data) => (
        <p>
          {quantityAvailable} {data.unitOfMeasurement}
        </p>
      ),
    },
    {
      title: 'Quantity Requested',
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
  ]);
  const mobileColumns = useMemo(() => [
    {
      title: '',
      dataIndex: 'uuid',
      key: 'select',
      render: (_, record) => (
        <MyCheckbox
          selected={selectedIds.has(record.uuid || record.id)}
          onClick={() => toggleCheckbox(record.uuid || record.id)}
          uuid={record.uuid || record.id}
        />
      ),
    },
    {
      title: 'Category NAME',
      key: 'categoryName',
      dataIndex: 'categoryName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Item Name',
      key: 'itemName',
      dataIndex: 'itemName',
    },
  ]);
  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Quantity Available</ExpandedLabel>
          <ExpandedValue>
            {row.quantityAvailable} {row.unitOfMeasurement}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Quantity Requested</ExpandedLabel>
          <ExpandedValue>
            {row.quantityRequested} {row.unitOfMeasurement}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Request Reason</ExpandedLabel>
          <ExpandedValue>{row.requestReason}</ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );

  const onPaginationChange = (page) => {
    setSearchData({ page });
  };

  const handleApprove = async () => {
    const requestsWithQuantities = selectedRequests.map((request) => ({
      requestUuid: request.uuid || request.id,
      approvedQuantity: request.quantityRequested,
    }));

    const approveData = {
      requests: requestsWithQuantities,
    };

    try {
      await dispatch(approveEmployeeReturnRequests(approveData)).unwrap();
      setShowApproveSuccess(true);
    } catch (error) {
      console.error('Failed to approve requests:', error);
    }
  };

  const handleApproveSuccessClose = () => {
    setShowApproveSuccess(false);
    setSelectedIds(new Set());
    dispatch(
      getEmployeePendingReturnRequests({
        ...searchData,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getEmployeePendingReturnRequests({
        ...searchData,
      })
    );
  }, [dispatch, searchData]);

  if (showApproveSuccess) {
    return (
      <Success
        title="Requests Approved Successfully!"
        description={`${selectedRequests.length} request${selectedRequests.length > 1 ? 's have' : ' has'} been approved successfully.`}
        buttonText="Continue"
        onClose={handleApproveSuccessClose}
        route={`/personal/inventory/returned-item/new-requests`}
      />
    );
  }

  return (
    <>
      <Table
        currentPage={pendingRequests?.currentPage}
        columns={columns}
        totalPages={pendingRequests?.totalCount}
        onPaginationChange={onPaginationChange}
        data={pendingRequests?.data || []}
        loading={loading.employeePendingReturnRequests}
      />
      <MobileList
        columns={mobileColumns}
        data={pendingRequests?.data || []}
        expandable={renderExpandableContent}
        currentPage={pendingRequests?.currentPage}
        totalPages={pendingRequests?.totalCount}
        onPaginationChange={onPaginationChange}
      />

      <ApproveOrReject>
        <Button
          width={100}
          disabled={selectedRequests.length === 0}
          onClick={() => setIsDeclineOpen(true)}
        >
          Decline
        </Button>
        <Button
          width={100}
          secondary
          disabled={selectedRequests.length === 0 || loading.approveEmployeeReturnRequests}
          loading={loading.approveEmployeeReturnRequests}
          onClick={handleApprove}
        >
          Approve
        </Button>
      </ApproveOrReject>

      {isDeclineOpen && (
        <DeclineModal
          isOpen={isDeclineOpen}
          onClose={() => setIsDeclineOpen(false)}
          selectedRequests={selectedRequests}
          onSuccess={() => {
            setSelectedIds(new Set());
            setIsDeclineOpen(false);
            setSearchData({
              page: 1,
            });
          }}
        />
      )}
    </>
  );
};

export default NewReturnedRequests;
