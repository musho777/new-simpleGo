import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DeleteIcon from 'assets/delete.svg';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import { deleteReturnRequest, getReturnedItems } from 'features/inventory/inventoryActions';
import { selectLoading, selectReturnedItems } from 'features/inventory/inventorySlice';
import Navigation from 'pages/components/navigation';
import Tag from 'pages/components/tag';
import {
  ActionButton,
  ActionsContainer,
} from 'pages/personalInventory/returnedItems/returnedByMe/ReturnedByMe.styles';
import { formatDateTime } from 'utils/dateUtils';

import { Row } from '../Inventory.styles';
import {
  ButtonWrapperRequestBack,
  DeleteModalButtons,
  DeleteModalContent,
  DeleteModalText,
  EllipsisCell,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  Icon,
  TabContent,
  ViewContainer,
} from './ReturnedItems.styles';
import EditReturnModal from './editReturnModal/EditReturnModal';

const ReturnedItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const TABS = [
    { name: 'Requested by Inventory', path: '/inventory/returnedItems' },
    { name: 'By Employee', path: '/inventory/returnedItems/employee' },
  ];
  const returnedItems = useSelector(selectReturnedItems);
  const loading = useSelector(selectLoading);

  const [searchData, setSearchData] = useState({
    page: 1,
    limit: 10,
  });

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'inventory');

  const handleNavigateToEmployeesFilter = () => {
    navigate('/inventory/returnedItems/employees-holding');
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReturn, setEditingReturn] = useState(null);
  const [deletingReturn, setDeletingReturn] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (record) => {
    setEditingReturn(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record) => {
    setDeletingReturn(record);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingReturn(null);
  };

  const handleConfirmDelete = async () => {
    if (deletingReturn) {
      try {
        await dispatch(deleteReturnRequest(deletingReturn.uuid)).unwrap();
        dispatch(getReturnedItems({ ...searchData }));
        setIsDeleteModalOpen(false);
        setDeletingReturn(null);
      } catch (error) {
        console.error('Error deleting return:', error);
      }
    }
  };
  const handleEditSuccess = () => {
    dispatch(getReturnedItems({ ...searchData }));
  };
  const returnedItemsColumns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'employeefullname',
      key: 'employeefullname',
    },
    {
      title: 'Role / Occupation',
      dataIndex: 'roleoccupation',
      key: 'roleoccupation',
      render: (roleoccupation) => <Tag type="roles" variant={roleoccupation} />,
    },
    {
      title: 'Category',
      dataIndex: 'categoryname',
      key: 'categoryname',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },

    {
      title: 'Item Name',
      dataIndex: 'itemname',
      key: 'itemname',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Quantity Requested',
      dataIndex: 'quantityrequested',
      key: 'quantityrequested',
      render: (quantityrequested, data) => (
        <p>
          {quantityrequested} {data.unitofmeasurement}
        </p>
      ),
    },
    {
      title: 'Quantity Returned',
      dataIndex: 'quantityreturned',
      key: 'quantityreturned',
      render: (quantityreturned, data) => (
        <p>
          {quantityreturned} {quantityreturned && data.unitofmeasurement}
        </p>
      ),
    },
    {
      title: 'REASON',
      dataIndex: 'reason',
      key: 'reason',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'RETURN date',
      dataIndex: 'returndate',
      key: 'returndate',
      render: (returndate) => <>{formatDateTime(returndate, true) || '-'}</>,
    },
    {
      title: 'RETURN REASON',
      dataIndex: 'rejectionreason',
      key: 'rejectionreason',
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
        if (record.status === 'Pending' || record.status === 'pending') {
          return (
            <ActionsContainer>
              <ActionButton onClick={() => handleEdit(record)} title="Edit">
                <Icon src={EditIcon} alt="Edit" />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(record)} title="Delete">
                <Icon src={DeleteIcon} alt="Delete" />
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
      title: 'Name',
      dataIndex: 'employeefullname',
      key: 'employeefullname',
    },
    {
      title: 'Role / Occupation',
      dataIndex: 'roleoccupation',
      key: 'roleoccupation',
    },
  ]);

  const onPaginationChange = (page) => {
    setSearchData({ page, limit: 10 });
  };

  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>Name</ExpandedLabel>
            <ExpandedValue>{row.employeefullname}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Role / Occupation</ExpandedLabel>
            <ExpandedValue>{row.roleoccupation}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Category</ExpandedLabel>
            <ExpandedValue>{row.categoryname}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Item Name</ExpandedLabel>
            <ExpandedValue>{row.itemname}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Quantity Requested</ExpandedLabel>
            <ExpandedValue>{row.quantityrequested}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Quantity Returned</ExpandedLabel>
            <ExpandedValue>{row.quantityreturned}</ExpandedValue>
          </Row>

          <Row>
            <ExpandedLabel>REJECT REASON</ExpandedLabel>
            <ExpandedValue>{row.rejectionreason}</ExpandedValue>
          </Row>
        </ExpandableWrapper>
      </>
    );
  };

  useEffect(() => {
    dispatch(getReturnedItems(searchData));
  }, [dispatch, searchData]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  return (
    <ViewContainer>
      <Navigation className="nav" tabs={TABS} />

      <ButtonWrapperRequestBack>
        <Button secondary onClick={handleNavigateToEmployeesFilter}>
          Request item back
        </Button>
      </ButtonWrapperRequestBack>

      <TabContent active={activeTab === 'inventory'}>
        <Table
          columns={returnedItemsColumns}
          data={returnedItems?.requests || []}
          totalPages={returnedItems?.totalPages}
          currentPage={returnedItems?.page}
          onPaginationChange={onPaginationChange}
          loading={loading.returnedItems}
          scrollable={true}
        />
        <MobileList
          columns={mobileColumns}
          data={returnedItems?.requests || []}
          expandable={renderExpandableContent}
          onPaginationChange={onPaginationChange}
          currentPage={returnedItems?.page}
          totalPages={returnedItems?.totalPages}
        />
      </TabContent>

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
    </ViewContainer>
  );
};

export default ReturnedItems;
