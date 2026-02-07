import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import exportSvg from 'assets/export.svg';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import {
  exportEmployeeInventory,
  getEmployeeInventory,
} from 'features/inventory/inventoryActions';
import { selectEmployeeInventory, selectLoading } from 'features/inventory/inventorySlice';
import { useMobileView } from 'hooks/useMobileView';
import Tag from 'pages/components/tag';
import { BackToListBtn } from 'pages/projectManagement/singleTicketView/SingleTicketView.styles';
import { formatDateTime } from 'utils/dateUtils';

import { QuantityItem } from '../returnedItems/byEmployee/pendingReturnRequests/PendingReturnRequests.styles';
import {
  EllipsisCell,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  ExportText,
  ExportWrapper,
  Header,
  Icon,
  QuantityGroup,
  QuantityWrapper,
  Row,
  ViewContainer,
} from './EmployeeInventoryDetail.styles';
import Actions from './actions';
import Filter from './filter/Filter';
import { useEmployeeInventoryDetailParams } from './useSearchData';

const EmployeeInventoryDetail = () => {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMobileView();
  const employeeInventory = useSelector(selectEmployeeInventory);
  const loading = useSelector(selectLoading);
  const isExportLoading = loading.exportEmployeeInventory;
  const inventoryColumns = [
    {
      title: 'Item Name',
      dataIndex: 'itemTypeName',
      key: 'itemTypeName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Quantity Assigned',
      dataIndex: 'quantityAssigned',
      align: 'center',
      key: 'quantityAssigned',
      width: '450',
      render: (_, row) => (
        <QuantityWrapper>
          <QuantityGroup>
            <QuantityItem>
              <p>Available</p>
              <p>{row.quantityAvailable || 0}</p>
            </QuantityItem>
            <QuantityItem>
              <p>In Use</p>
              <p>{row.quantityInUse || 0}</p>
            </QuantityItem>
            <QuantityItem>
              <p>Expired</p>
              <p>{row.quantityExpired || 0}</p>
            </QuantityItem>
          </QuantityGroup>
        </QuantityWrapper>
      ),
    },
    {
      title: 'Quantity Returned',
      dataIndex: 'quantityReturned',
      key: 'quantityReturned',
    },
    {
      title: 'Provided Date',
      dataIndex: 'latestProvidedDate',
      key: 'latestProvidedDate',
      render: (date) => <>{formatDateTime(date, true) || '-'}</>,
    },
    {
      title: 'Lifespan',
      dataIndex: 'lifespan',
      key: 'lifespan',
      render: (lifespan) => (
        <Tag type="lifespan" variant={lifespan === 'single-use' ? 'Single use' : 'Reusable'} />
      ),
    },
    {
      title: '',
      dataIndex: 'uuid',
      width: 50,
      key: 'uuid',
      render: (uuid, e) => {
        return (
          <>
            <Actions employeeInventory={employeeInventory} row={e} />
          </>
        );
      },
    },
  ];

  const mobileColumns = [
    { title: 'Item Name', dataIndex: 'itemTypeName', key: 'itemTypeName' },
    { title: 'Category', dataIndex: 'categoryName', key: 'categoryName' },
  ];
  const { searchData, setInventorySearchData, resetSearchData } =
    useEmployeeInventoryDetailParams();
  const pagesCount = Math.ceil(employeeInventory?.totalItems / searchData.limit);

  const [showFilters, setShowFilters] = useState(false);

  const onPaginationChange = (page) => {
    setInventorySearchData({ page });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleExport = () => {
    if (employeeId && !isExportLoading) {
      dispatch(exportEmployeeInventory({ employeeId, params: searchData }));
    }
  };

  useEffect(() => {
    if (employeeId) {
      dispatch(getEmployeeInventory({ employeeId, params: searchData }));
    }
  }, [dispatch, employeeId, searchData]);

  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>Quantity Assigned</ExpandedLabel>
            <ExpandedValue>{row.quantityAssigned}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Quantity Returned</ExpandedLabel>
            <ExpandedValue>{row.quantityReturned}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Provided Date</ExpandedLabel>
            <ExpandedValue>
              {formatDateTime(row.latestProvidedDate, true) || '-'}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Lifespan</ExpandedLabel>
            <ExpandedValue>
              <Tag
                type="lifespan"
                variant={row.lifespan === 'single-use' ? 'Single use' : 'Reusable'}
              />
            </ExpandedValue>
          </Row>
        </ExpandableWrapper>
      </>
    );
  };
  return (
    <ViewContainer>
      <Header>
        <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>
      </Header>
      {!isMobile && (
        <Filter
          searchData={searchData}
          setInventorySearchData={setInventorySearchData}
          resetSearchData={resetSearchData}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      )}
      {employeeInventory?.items?.length > 0 && (
        <ExportWrapper onClick={handleExport} disabled={isExportLoading}>
          <Icon src={exportSvg} alt="Export" />
          <ExportText>{isExportLoading ? 'Loading...' : 'Export'}</ExportText>
        </ExportWrapper>
      )}
      <Table
        columns={inventoryColumns}
        data={employeeInventory?.items || []}
        onPaginationChange={onPaginationChange}
        loading={loading.employeeInventory}
        totalPages={pagesCount}
        currentPage={searchData.page}
      />

      <MobileList
        columns={mobileColumns}
        data={employeeInventory?.items || []}
        expandable={renderExpandableContent}
        onPaginationChange={onPaginationChange}
        currentPage={searchData.page}
        totalPages={pagesCount}
      />
    </ViewContainer>
  );
};

export default EmployeeInventoryDetail;
