import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import crmIcon from 'assets/customerManagement/crmIcon.svg';
import MobileList from 'common-ui/mobileList/MobileList';
import { Table } from 'common-ui/table';
import { getCustomers } from 'features/customers/customersActions';
import { selectCustomers, selectLoading } from 'features/customers/customersSlice';
import { formatDateTime } from 'utils/dateUtils';

import {
  Container,
  CrmIconWrapper,
  CustomerIDBadge,
  DateTag,
  EllipsisCell,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  Header,
  HeaderText,
  Icon,
  Name,
  OfferCountBadge,
  Row,
} from './CustomerManagement.styles';
import { Filter } from './components/filter';
import { OfferInfoModal } from './components/offerInfoModal';
import { useCustomerManagementSearchData } from './useSearchData';

const getSearchAndFilterCount = (fieldData) => {
  const searchKeys = ['customerId', 'fullName', 'address', 'phoneNumber'];
  const filterKeys = ['tariffs', 'statuses', 'dateFrom', 'dateTo'];

  const searchCount = searchKeys.reduce((count, key) => {
    const value = fieldData[key];
    return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
  }, 0);

  const filterCount = filterKeys.reduce((count, key) => {
    const value = fieldData[key];
    if (key === 'dateFrom' || key === 'dateTo') {
      return count + (value ? 1 : 0);
    }
    if (key === 'tariffs' || key === 'statuses') {
      return count + (Array.isArray(value) && value.length > 0 ? 1 : 0);
    }
    return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
  }, 0);

  return { searchCount, filterCount };
};

const CustomerManagement = () => {
  const { searchData, setCustomerManagementSearchData } = useCustomerManagementSearchData();
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector(selectCustomers);
  const isLoading = useSelector(selectLoading);
  const handleOfferClick = useCallback((offerDetails, event) => {
    if (event) {
      event.stopPropagation();
    }
    setSelectedOffer(offerDetails);
    setIsOfferModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOfferModalOpen(false);
    setSelectedOffer(null);
  }, []);

  const handleRowClick = useCallback(
    (row) => {
      navigate(`/customer-relationship-management/${row.contractNumber}`);
    },
    [navigate]
  );
  console.log('fd2');
  const onPaginationChange = (page) => {
    setCustomerManagementSearchData({ page: page - 1 });
  };

  const handleRowCountChange = (newLimit) => {
    setCustomerManagementSearchData({ size: newLimit, page: 1 });
  };

  const handleSort = (key, direction) => {
    if (direction === null) {
      setCustomerManagementSearchData({ sort: '' });
    } else {
      setCustomerManagementSearchData({ sort: `${key},${direction}` });
    }
  };

  const { searchCount, filterCount } = getSearchAndFilterCount(searchData);

  const tableColumns = useMemo(
    () => [
      {
        title: 'Contract ID',
        key: 'contractNumber',
        dataIndex: 'contractNumber',
        render: (id) => <CustomerIDBadge>{id}</CustomerIDBadge>,
        sortable: true,
      },
      {
        title: 'Contract ID',
        key: 'customerId',
        dataIndex: 'customerId',
      },
      {
        title: 'Full Name',
        key: 'fullName',
        dataIndex: 'fullName',
        sortable: true,
      },
      {
        title: 'Offer',
        key: 'offer',
        dataIndex: 'offer',
        render: (_, data) => (
          <OfferCountBadge
            $disabled={data.tariffs.length === 0}
            onClick={(e) => handleOfferClick(data.tariffs, e)}
          >
            {data.tariffs.length}
          </OfferCountBadge>
        ),
      },
      {
        title: 'Address',
        key: 'address',
        dataIndex: 'address',
        renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
        render: (val) => <EllipsisCell>{val}</EllipsisCell>,
      },
      {
        title: 'Phone Number',
        key: 'phoneNumbers',
        dataIndex: 'phoneNumbers',
        render: (val) => <EllipsisCell>{val ?? '-'}</EllipsisCell>,
      },
      {
        title: 'Created Date',
        key: 'createdDate',
        dataIndex: 'createdDate',
        sortable: true,
        render: (createdDate) => (
          <DateTag type="dateTag" variant={formatDateTime(createdDate)}>
            {formatDateTime(createdDate)}
          </DateTag>
        ),
      },
    ],
    [handleOfferClick]
  );

  const mobileColumns = useMemo(
    () => [
      {
        title: 'Contract ID',
        key: 'customerId',
        dataIndex: 'customerId',
        sortable: true,
      },
      {
        title: 'Full Name',
        key: 'fullName',
        dataIndex: 'fullName',
        render: (name) => <Name>{name}</Name>,
        sortable: true,
      },
      {
        title: 'Offer',
        key: 'offer',
        dataIndex: 'offer',
        render: (_, data) => (
          <OfferCountBadge
            $disabled={data.tariffs.length === 0}
            onClick={(e) => handleOfferClick(data.tariffs, e)}
          >
            {data.tariffs.length}
          </OfferCountBadge>
        ),
      },
    ],
    [handleOfferClick]
  );

  const renderExpandableContent = useCallback((row) => {
    return (
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Address</ExpandedLabel>
          <ExpandedValue>{row.address || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Phone Number</ExpandedLabel>
          <ExpandedValue>{row.phoneNumbers || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Created Date</ExpandedLabel>
          <ExpandedValue>
            <DateTag type="dateTag" variant={formatDateTime(row.createdDate)}>
              {formatDateTime(row.createdDate)}
            </DateTag>
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    );
  }, []);

  useEffect(() => {
    if (filterCount > 0 || searchCount > 0) dispatch(getCustomers(searchData));
  }, [dispatch, searchData, searchCount, filterCount]);

  return (
    <Container>
      <Header>
        <CrmIconWrapper>
          <Icon src={crmIcon} alt="crmIcon" />
        </CrmIconWrapper>
        <HeaderText>
          <p>CRM</p>
          <p>Customer Relationship Management</p>
        </HeaderText>
      </Header>
      <Filter
        searchCount={searchCount}
        searchData={searchData}
        filterCount={filterCount}
        setSearchData={setCustomerManagementSearchData}
      />
      {(searchCount > 0 || filterCount > 0) && (
        <Table
          columns={tableColumns}
          data={customers?.content}
          totalPages={customers?.totalPages}
          dataCount={customers?.totalElements}
          count={searchData.size}
          editableRowCount
          currentPage={searchData.page + 1}
          loading={isLoading}
          onPaginationChange={onPaginationChange}
          handleRowCountChange={handleRowCountChange}
          onSort={handleSort}
          onRowClick={handleRowClick}
        />
      )}
      {(searchCount > 0 || filterCount > 0) && (
        <MobileList
          columns={mobileColumns}
          data={customers?.content}
          expandable={renderExpandableContent}
          onPaginationChange={onPaginationChange}
          currentPage={searchData.page + 1}
          loading={isLoading}
          totalPages={customers?.totalPages}
          editableRowCount
          count={searchData.size}
          handleRowCountChange={handleRowCountChange}
          onRowClick={handleRowClick}
        />
      )}

      <OfferInfoModal
        isOpen={isOfferModalOpen}
        onClose={handleCloseModal}
        offerDetails={selectedOffer}
      />
    </Container>
  );
};

export default CustomerManagement;
