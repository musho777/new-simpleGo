import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from 'assets/delete.svg';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import { Row } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import {
  deleteEmployeeReturn,
  getEmployeeReturnedItems,
} from 'features/inventory/inventoryActions';
import {
  selectEmployeeReturnedItems,
  selectLoading,
  selectSuccess,
} from 'features/inventory/inventorySlice';
import Tag from 'pages/components/tag';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';
import { formatDateTime } from 'utils/dateUtils';

import EditReturnModal from './EditReturnModal';
import {
  ActionButton,
  ActionIcon,
  ActionsContainer,
  DeleteModalButtons,
  DeleteModalContent,
  DeleteModalText,
  EllipsisCell,
} from './ReturnedByMe.styles';
import useSearchData from './useSearchData';

const ReturnedByMe = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const returnedData = useSelector(selectEmployeeReturnedItems);
  const { searchData, setSearchData } = useSearchData();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingReturn, setDeletingReturn] = useState(null);

  const truncateText = (text, maxLength = 16) => {
    if (!text) return '-';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  const handleEdit = (record) => {
    setEditingReturn(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record) => {
    setDeletingReturn(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingReturn) {
      try {
        await dispatch(deleteEmployeeReturn(deletingReturn.uuid)).unwrap();
        dispatch(getEmployeeReturnedItems({ ...searchData }));
        setIsDeleteModalOpen(false);
        setDeletingReturn(null);
      } catch (error) {
        console.error('Error deleting return:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingReturn(null);
  };

  const handleEditSuccess = () => {
    dispatch(getEmployeeReturnedItems({ ...searchData }));
  };

  const columns = useMemo(() => [
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
    {
      title: 'Request Reason',
      key: 'requestReason',
      dataIndex: 'requestReason',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span style={{ cursor: 'pointer' }}>{truncateText(text)}</span>;
      },
    },
    {
      title: 'quantity returned',
      key: 'quantityReturned',
      dataIndex: 'quantityReturned',
      render: (text) => {
        return <span style={{ cursor: 'pointer' }}>{truncateText(text)}</span>;
      },
    },
    {
      title: 'Rejection reason',
      key: 'rejectionReason',
      dataIndex: 'rejectionReason',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <span style={{ cursor: 'pointer' }}>{truncateText(text)}</span>;
      },
    },
    {
      title: 'Requested Date',
      key: 'requestedDate',
      dataIndex: 'requestedDate',
      render: (dateIssued) => <>{formatDateTime(dateIssued, true) || '-'}</>,
    },
    {
      title: 'Returned Date',
      key: 'returnedDate',
      dataIndex: 'returnedDate',
      render: (dateIssued) => <>{formatDateTime(dateIssued, true) || '-'}</>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <>
          <Tag type="status" variant={status} />
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        if (record.status === 'Pending') {
          return (
            <ActionsContainer>
              <ActionButton onClick={() => handleEdit(record)} title="Edit">
                <ActionIcon src={EditIcon} alt="Edit" />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(record)} title="Delete">
                <ActionIcon src={DeleteIcon} alt="Delete" />
              </ActionButton>
            </ActionsContainer>
          );
        }
        return null;
      },
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
          <ExpandedLabel>quantity returned</ExpandedLabel>
          <ExpandedValue>
            {row.quantityReturned} {row.unitOfMeasurement}
          </ExpandedValue>
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
        {row.status === 'Pending' && (
          <Row>
            <ExpandedLabel>Action</ExpandedLabel>
            <ExpandedValue>
              <ActionsContainer>
                <ActionButton onClick={() => handleEdit(row)} title="Edit">
                  <ActionIcon src={EditIcon} alt="Edit" />
                </ActionButton>
                <ActionButton onClick={() => handleDelete(row)} title="Delete">
                  <ActionIcon src={DeleteIcon} alt="Delete" />
                </ActionButton>
              </ActionsContainer>
            </ExpandedValue>
          </Row>
        )}
      </ExpandableWrapper>
    </>
  );

  const onPaginationChange = (page) => {
    setSearchData({ page });
  };

  useEffect(() => {
    dispatch(
      getEmployeeReturnedItems({
        ...searchData,
      })
    );
  }, [dispatch, searchData]);

  useEffect(() => {
    if (success.updateEmployeeReturn || success.deleteEmployeeReturn) {
      dispatch(getEmployeeReturnedItems({ ...searchData }));
    }
  }, [dispatch, success.updateEmployeeReturn, success.deleteEmployeeReturn, searchData]);

  return (
    <>
      <Table
        currentPage={returnedData?.page}
        columns={columns}
        totalPages={returnedData?.totalPages}
        onPaginationChange={onPaginationChange}
        data={returnedData?.returns || []}
        loading={loading.employeeReturnedItems}
      />

      <MobileList
        columns={mobileColumns}
        data={returnedData?.returns || []}
        expandable={renderExpandableContent}
        currentPage={returnedData?.pag}
        totalPages={returnedData?.totalPages}
        onPaginationChange={onPaginationChange}
      />

      <EditReturnModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        returnData={editingReturn}
      />

      <Modal
        title="Delete Return Request"
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        width="500px"
      >
        <DeleteModalContent>
          <DeleteModalText>
            Are you sure you want to delete this request? It will be deleted immediately.
          </DeleteModalText>
          <DeleteModalButtons>
            <Button outlined onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button secondary onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DeleteModalButtons>
        </DeleteModalContent>
      </Modal>
    </>
  );
};

export default ReturnedByMe;
