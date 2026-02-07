import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { getItemsDistributionList } from 'features/inventory/inventoryActions';
import { selectItemsDistributionList, selectLoading } from 'features/inventory/inventorySlice';
import useDebounce from 'hooks/useDebounce';
import { BackToListBtn } from 'pages/projectManagement/singleTicketView/SingleTicketView.styles';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';

import { Row } from '../Inventory.styles';
import { QuantityItem } from '../returnedItems/byEmployee/pendingReturnRequests/PendingReturnRequests.styles';
import {
  BackButtonWrapper,
  Container,
  PageWrapper,
  QuantityGroup,
  QuantityWrapper,
  SearchContainer,
} from './ItemLocationTracking.styles';
import { useItemLocationSearchData } from './useSearchData';

const ItemLocationTracking = () => {
  const { itemTypeUuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const distributionData = useSelector(selectItemsDistributionList);
  const loading = useSelector(selectLoading);
  const { searchData, setItemLocationSearchData } = useItemLocationSearchData();

  const [searchValue, setSearchValue] = useState(searchData.search || '');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const isLoading = loading.itemsDistributionList;
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const handleNavigateToEmployeeInventory = (employee) => {
    const employeeUuid = employee?.employeeUuid;
    if (employeeUuid) {
      navigate(`/inventory/employee-inventory/${employeeUuid}`);
    }
  };

  const tableColumns = useMemo(() => [
    {
      title: 'Employee',
      key: 'fullName',
      dataIndex: 'fullName',
      sortable: true,
      render: (fullName, record) => (
        <span
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => handleNavigateToEmployeeInventory(record)}
        >
          {fullName}
        </span>
      ),
    },
    {
      title: 'Role/ Occupation',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'quantity',
      key: 'expiredQuantity',
      dataIndex: 'expiredQuantity',
      width: '450',
      align: 'center',
      render: (_, row) => (
        <QuantityWrapper>
          <QuantityGroup>
            <QuantityItem>
              <p>Available</p>
              <p>
                {row.availableQuantity || 0} {row.unitOfMeasurement}
              </p>
            </QuantityItem>
            <QuantityItem>
              <p>In Use</p>
              <p>
                {row.usedQuantity || 0} {row.unitOfMeasurement}
              </p>
            </QuantityItem>
            <QuantityItem>
              <p>Expired</p>
              <p>
                {row.expiredQuantity || 0} {row.unitOfMeasurement}
              </p>
            </QuantityItem>
          </QuantityGroup>
        </QuantityWrapper>
      ),
    },
  ]);

  const modalColumns = useMemo(() => [
    {
      title: 'Employee',
      key: 'fullName',
      dataIndex: 'fullName',
      sortable: true,
      render: (fullName, record) => (
        <span
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => handleNavigateToEmployeeInventory(record)}
        >
          {fullName}
        </span>
      ),
    },
    {
      title: 'Role/ Occupation',
      key: 'role',
      dataIndex: 'role',
    },
  ]);
  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>Available</ExpandedLabel>
            <ExpandedValue>
              {row.availableQuantity} {''} {row.unitOfMeasurement}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>In Use</ExpandedLabel>
            <ExpandedValue>
              {row.usedQuantity} {''} {row.unitOfMeasurement}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Expired</ExpandedLabel>
            <ExpandedValue>
              {row.expiredQuantity} {''} {row.unitOfMeasurement}
            </ExpandedValue>
          </Row>
        </ExpandableWrapper>
      </>
    );
  };

  const onPaginationChange = (page) => {
    const limit = searchData.limit || 10;
    const offset = (page - 1) * limit;
    setItemLocationSearchData({ offset });
  };
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setItemLocationSearchData({ search: debouncedSearchValue });
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (itemTypeUuid) {
      dispatch(getItemsDistributionList({ itemTypeUuid, params: searchData }));
    }
  }, [itemTypeUuid, dispatch, searchData]);

  return (
    <PageWrapper>
      <BackButtonWrapper>
        <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>
      </BackButtonWrapper>
      <Container>
        <SearchContainer>
          <Input
            placeholder="Search distribution..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            width="300px"
          />
        </SearchContainer>
      </Container>
      <Table
        columns={tableColumns}
        data={distributionData?.employees}
        totalPages={distributionData?.pagination?.totalCount}
        currentPage={currentPage}
        onPaginationChange={onPaginationChange}
        loading={isLoading}
        emptyMessage="No distribution data available"
      />
      <MobileList
        columns={modalColumns}
        data={distributionData?.employees}
        expandable={renderExpandableContent}
        currentPage={currentPage}
        totalPages={distributionData?.pagination?.totalCount}
        onPaginationChange={onPaginationChange}
      />
    </PageWrapper>
  );
};

export default ItemLocationTracking;
