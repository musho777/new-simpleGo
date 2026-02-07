import { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { getManagerEmployeeReturns } from 'features/inventory/inventoryActions';
import {
  selectLoading,
  selectManagerEmployeeReturns,
} from 'features/inventory/inventorySlice';
import Navigation from 'pages/components/navigation';
import Tag from 'pages/components/tag';
import { formatDateTime } from 'utils/dateUtils';

import {
  EllipsisCell,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  MobileRow,
  ViewContainer,
} from '../ReturnedItems.styles';
import Filter from './filter/Filter';
import useSearchData from './useSearchData';

const ByEmployee = () => {
  const dispatch = useDispatch();
  const TABS = [
    { name: 'Requested by Inventory', path: '/inventory/returnedItems' },
    { name: 'By Employee', path: '/inventory/returnedItems/employee' },
  ];
  const employeeReturns = useSelector(selectManagerEmployeeReturns);
  const loading = useSelector(selectLoading);

  const { searchData, setSearchData, resetSearchData } = useSearchData();

  const onPaginationChange = (page) => {
    setSearchData({ page });
  };

  const employeeReturnsColumns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'employeeFullName',
      key: 'employeeFullName',
    },
    {
      title: 'Role / Occupation',
      dataIndex: 'roleOccupation',
      key: 'roleOccupation',
    },
    {
      title: 'Category NAME',
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
      title: 'Quantity Requested',
      dataIndex: 'quantityRequested',
      key: 'quantityRequested',
      render: (quantityRequested, row) => (
        <>{`${quantityRequested} ${row.unitOfMeasurement}` || '-'}</>
      ),
    },
    {
      title: 'Quantity Returned',
      dataIndex: 'quantityReturned',
      key: 'quantityReturned',
      render: (quantityRequested, row) => (
        <>
          {quantityRequested != null ? `${quantityRequested} ${row?.unitOfMeasurement}` : '-'}
        </>
      ),
    },

    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (returnDate) => <>{formatDateTime(returnDate, true) || '-'}</>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag type={'status'} variant={status} />,
    },
  ]);
  const mobileColumns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'employeeFullName',
      key: 'employeeFullName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Role / Occupation',
      dataIndex: 'roleOccupation',
      key: 'roleOccupation',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Category NAME',
      dataIndex: 'categoryName',
      key: 'categoryName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
  ]);

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <MobileRow>
          <ExpandedLabel>Item Name</ExpandedLabel>
          <ExpandedValue>{row.itemName}</ExpandedValue>
        </MobileRow>
        <MobileRow>
          <ExpandedLabel>Quantity Requested</ExpandedLabel>
          <ExpandedValue>
            {row.quantityRequested} {row.unitOfMeasurement}
          </ExpandedValue>
        </MobileRow>
        <MobileRow>
          <ExpandedLabel>Quantity Returned</ExpandedLabel>
          <ExpandedValue>
            {row.quantityReturned} {row.unitOfMeasurement}
          </ExpandedValue>
        </MobileRow>
        <MobileRow>
          <ExpandedLabel>Return Date</ExpandedLabel>
          <ExpandedValue>{formatDateTime(row.returnDate, true) || '-'}</ExpandedValue>
        </MobileRow>
        <MobileRow>
          <ExpandedLabel>Status </ExpandedLabel>
          <ExpandedValue>
            <Tag type={'status'} variant={row.status} />
          </ExpandedValue>
        </MobileRow>
      </ExpandableWrapper>
    </>
  );
  useEffect(() => {
    dispatch(getManagerEmployeeReturns(searchData));
  }, [dispatch, searchData]);

  return (
    <ViewContainer>
      <Navigation className="nav" tabs={TABS} />
      <Filter
        searchData={searchData}
        setSearchData={setSearchData}
        resetSearchData={resetSearchData}
      />
      <Table
        columns={employeeReturnsColumns}
        data={employeeReturns?.returns || employeeReturns || []}
        loading={loading.returnedItems}
        currentPage={searchData.page}
        onPaginationChange={onPaginationChange}
        totalPages={employeeReturns?.totalPages}
      />
      <MobileList
        columns={mobileColumns}
        data={employeeReturns?.returns || employeeReturns || []}
        expandable={renderExpandableContent}
        currentPage={searchData.page}
        totalPages={employeeReturns?.totalPages}
        onPaginationChange={onPaginationChange}
      />
    </ViewContainer>
  );
};

export default ByEmployee;
