import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import MyCheckbox from 'common-ui/myCheckbox';
import { Table } from 'common-ui/table';
import { getEmployeesHoldingItem } from 'features/inventory/inventoryActions';
import {
  resetEmployeesHoldingItem,
  selectEmployeesHoldingItem,
  selectLoading,
  selectReturnedItems,
} from 'features/inventory/inventorySlice';
import { BackToListBtn } from 'pages/projectManagement/singleTicketView/SingleTicketView.styles';
import { formatDateTime } from 'utils/dateUtils';

import { Row } from '../../Inventory.styles';
import {
  ButtonWrapper,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  Header,
  TableWrapper,
  ViewContainer,
} from '../ReturnedItems.styles';
import { Date, QuantityGroup, QuantityItem, QuantityWrapper } from './Employees.styles';
import RequestBackModal from './RequestBackModal';
import Filter from './filter/Filter';

const EmployeesHoldingItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeesHoldingItem = useSelector(selectEmployeesHoldingItem);
  const returnedItems = useSelector(selectReturnedItems);
  const loading = useSelector(selectLoading);
  const [searchData, setSearchData] = useState({
    limit: 10,
    page: 1,
  });
  const [selectedItemTypeUuid, setSelectedItemTypeUuid] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGetData = (itemTypeUuid, category) => {
    setSelectedItemTypeUuid(itemTypeUuid);
    setSelectedCategory(category);
  };
  const employeesHoldingItemTable = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 50,
      render: (_, row) => {
        const isChecked = selectedRows.some(
          (selectedRow) => selectedRow.employeeuuid === row.employeeuuid
        );
        return (
          <MyCheckbox selected={isChecked} onClick={() => handleRowSelect(row, !isChecked)} />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'employeename',
      key: 'employeename',
    },
    {
      title: 'Role / Occupation',
      dataIndex: 'role',
      key: 'role',
      width: '250',
    },
    {
      title: 'quantity assigned',
      dataIndex: 'quantityassigned',
      key: 'quantityassigned',
      align: 'center',
      width: '200',
      render: (_, row) => (
        <QuantityWrapper>
          <QuantityGroup>
            <QuantityItem>
              <p>Available</p>
              <p>
                {row.quantityavailable || 0} {row.iit_unitOfMeasurement}
              </p>
            </QuantityItem>
            <QuantityItem>
              <p>In Use</p>
              <p>
                {row.quantityinuse || 0} {row.iit_unitOfMeasurement}
              </p>
            </QuantityItem>
          </QuantityGroup>
        </QuantityWrapper>
      ),
    },
    {
      title: 'date',
      dataIndex: 'dateissued',
      key: 'dateissued',
      render: (dateissued) => <Date>{formatDateTime(dateissued, true) || '-'}</Date>,
    },
  ];

  const mobileEmployeesHoldingItemTable = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 50,
      render: (_, row) => {
        const isChecked = selectedRows.some(
          (selectedRow) => selectedRow.employeeUuid === row.employeeUuid
        );
        return (
          <MyCheckbox selected={isChecked} onClick={() => handleRowSelect(row, !isChecked)} />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'employeename',
      key: 'employeename',
    },
    {
      title: 'Role / Occupation',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  const handleRowSelect = (row, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow.employeeuuid !== row.employeeuuid)
      );
    }
  };

  const handleRequestBack = () => {
    if (selectedRows.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClearAll = () => {
    setSelectedRows([]);
  };
  const onPaginationChange = (page) => {
    setSearchData({ page });
    dispatch(getEmployeesHoldingItem({ page, itemTypeUuid: selectedItemTypeUuid }));
  };

  const renderExpandableEmployeesHoldingContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>Name</ExpandedLabel>
            <ExpandedValue>{row.employeename}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Role / Occupation</ExpandedLabel>
            <ExpandedValue>{row.role}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Available</ExpandedLabel>
            <ExpandedValue>
              {row.quantityavailable} {row.iit_unitOfMeasurement}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>In Use</ExpandedLabel>
            <ExpandedValue>
              {row.quantityinuse || 0} {row.iit_unitOfMeasurement}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Date</ExpandedLabel>
            <ExpandedValue>{formatDateTime(row.dateissued, true) || '-'}</ExpandedValue>
          </Row>
        </ExpandableWrapper>
      </>
    );
  };
  useEffect(() => {
    return () => {
      dispatch(resetEmployeesHoldingItem());
    };
  }, [dispatch]);

  return (
    <ViewContainer>
      <Header>
        <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>
      </Header>

      <Filter onGetData={handleGetData} />
      {employeesHoldingItem?.data?.length > 0 && (
        <TableWrapper>
          <Table
            columns={employeesHoldingItemTable}
            data={employeesHoldingItem?.data || []}
            loading={loading.returnedItems}
            totalPages={employeesHoldingItem.totalCount}
            onPaginationChange={onPaginationChange}
            currentPage={employeesHoldingItem.currentPage}
          />

          <MobileList
            columns={mobileEmployeesHoldingItemTable}
            data={employeesHoldingItem?.data || []}
            expandable={renderExpandableEmployeesHoldingContent}
            totalPages={returnedItems?.totalPages}
            currentPage={employeesHoldingItem.currentPage}
            onPaginationChange={onPaginationChange}
          />

          <ButtonWrapper>
            <Button width={140} onClick={handleClearAll}>
              Clear all
            </Button>
            <Button
              width={140}
              secondary
              onClick={handleRequestBack}
              disabled={selectedRows.length === 0}
            >
              Request back
            </Button>
          </ButtonWrapper>
        </TableWrapper>
      )}

      <RequestBackModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedRows={selectedRows}
        selectedItemTypeUuid={selectedItemTypeUuid}
        selectedCategory={selectedCategory}
        onClearSelectedRows={handleClearAll}
      />
    </ViewContainer>
  );
};

export default EmployeesHoldingItem;
