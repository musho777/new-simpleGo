import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import MuiTable from 'modules/billing/components/muiTable';
import {
  getCity,
  getProcess,
  getProcessStatus,
  getProcessType,
  getRegion,
} from 'modules/billing/features/main/mainActions';
import {
  selectIsSecurityModalOpen,
  selectLoading,
  selectPagesCount,
  selectProcess,
  selectTotalElements,
} from 'modules/billing/features/main/mainSlice';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';

import Select from '../../assets/subscribers/select.svg';
import {
  ContactLabel,
  ContactValue,
  ContractValue,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  FilterContainer,
  Icon,
  InfoWrapper,
  Row,
  ViewContainer,
} from './Request.styles';
import FilterActions from './filterActions';
import Filters from './filters';
import MobileFilter from './mobileFilter';
import { COLUMNS } from './surveyConstants';
import { useRequestSearchParams } from './useSearchData';

const SurveyReport = () => {
  const { searchData, setRequestSearchData, resetSearchData } = useRequestSearchParams();

  const [viewDetailsData, setViewDetailsData] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const securityValue = localStorage.getItem('securityCode');
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);

  const data = useSelector(selectProcess);
  const pagesCount = useSelector(selectPagesCount);
  const totalElements = useSelector(selectTotalElements);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isTablet = useTabletView();
  const isMobile = useMobileView();

  const handleResetAllFilters = () => {
    resetSearchData();
  };

  const handleOpen = (e) => {
    setViewDetailsData({
      region: e.region,
      city: e.city,
      description: e.description,
      customerInfo: e.customerInfo,
      phoneNumber: e.phoneNumber,
      engineer: e.engineer,
      crateDate: e.crateDate,
    });

    setOpen(true);
  };

  const handlePageChange = (page) => {
    setRequestSearchData({ page });
  };

  const handleClose = () => setOpen(false);

  const TABLET_COLUMNS = [
    { id: 'id', label: 'Հարցման ID', width: '130px', numeric: false },
    {
      id: 'processType',
      label: 'Հարցման տեսակ',
      numeric: false,
      width: '150px',
      render: (processType) => <span style={{ color: '#2D6CDF' }}>{processType}</span>,
    },
    { id: 'engineer', label: 'Ինժեներ', width: '130px', numeric: false },
    {
      id: 'status',
      label: 'Հարցման կարգավիճակ',
      width: '180px',
      numeric: false,
      render: (status) => <span style={{ color: '#FF6A00' }}>{status}</span>,
    },
    { id: 'crateDate', label: 'Հարցման ամսաթիվ', width: '150px', numeric: false },
    {
      id: 'details',
      numeric: false,
      render: (_, e) => <Icon src={Select} onClick={() => handleOpen(e)} />,
    },
  ];

  const mobileColumns = [
    {
      title: 'Հարցման ID',
      dataIndex: 'id',
      sortable: true,
    },
    {
      title: 'Հարցման տեսակ',
      dataIndex: 'processType',
      render: (processType) => <span style={{ color: '#2D6CDF' }}>{processType}</span>,
    },
    {
      title: 'Հարցման կարգավիճակ',
      dataIndex: 'status',
      render: (status) => <span style={{ color: '#FF6A00' }}>{status}</span>,
    },
  ];

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Մարզեր</ExpandedLabel>
          <ExpandedValue>{row.region === null ? '-' : row.region}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Քաղաքներ</ExpandedLabel>
          <ExpandedValue>{row.city === null ? '-' : row.city}</ExpandedValue>
        </Row>
        <Row>
          <div>
            <ExpandedLabel>Հարցմանն առնչվող հաղորդագրություն</ExpandedLabel>
            <ExpandedValue>{row.description === null ? '-' : row.description}</ExpandedValue>
          </div>
        </Row>
        <Row>
          <ExpandedLabel>Ինժեներ</ExpandedLabel>
          <ExpandedValue>{row.engineer === null ? '-' : row.engineer}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Հարցման ամսաթիվ</ExpandedLabel>
          <ExpandedValue>{row.crateDate === null ? '-' : row.crateDate}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Բաժանորդի տվյալներ</ExpandedLabel>
          <ExpandedValue>{row.customerInfo === null ? '-' : row.customerInfo}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Հեռախոսահամար</ExpandedLabel>
          <ExpandedValue>{row.phoneNumber === null ? '-' : row.phoneNumber}</ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleRowCountChange = (count) => {
    setRequestSearchData({ ...searchData, size: count });
  };

  const columns = isTablet ? TABLET_COLUMNS : COLUMNS;

  const memoizedSearchData = useMemo(() => searchData, [searchData]);

  const handleSortClick = (order) => {
    setRequestSearchData({ ...searchData, sort: order });
  };

  useEffect(() => {
    dispatch(getRegion());
    dispatch(getCity());
    dispatch(getProcessStatus());
    dispatch(getProcessType());
    securityValue && dispatch(getProcess({ ...searchData, secret: securityValue }));
  }, [memoizedSearchData, securityValue]);

  return (
    !securityModalOpen && (
      <>
        <ViewContainer>
          <FilterContainer>
            <FilterActions
              toggleFilter={toggleFilter}
              handleResetAllFilters={handleResetAllFilters}
            />
            <Filters />
          </FilterContainer>
          {!isMobile && (
            <MuiTable
              rowCount={searchData.size}
              loading={isLoading.process}
              data={data}
              handleSortClick={handleSortClick}
              columns={columns}
              totalPages={pagesCount}
              currentPage={searchData.page}
              handlePageChange={handlePageChange}
              handleRowCountChange={handleRowCountChange}
              dataCount={totalElements}
            />
          )}
          <Modal closeIcon isOpen={open} onClose={handleClose}>
            <InfoWrapper>
              <div>
                <ContactLabel>Մարզեր</ContactLabel>
                <ContractValue>{viewDetailsData.region}</ContractValue>
              </div>
              <div>
                <ContactLabel>Քաղաքներ</ContactLabel>
                <ContactValue>{viewDetailsData.city}</ContactValue>
              </div>
              <div>
                <ContactLabel>Հարցմանն առնչվող հաղորդագրություն</ContactLabel>
                <ContactValue>{viewDetailsData.description}</ContactValue>
              </div>
              <div>
                <ContactLabel>Բաժանորդի տվյալներ</ContactLabel>
                <ContactValue>{viewDetailsData.customerInfo}</ContactValue>
              </div>
              <div>
                <ContactLabel>Հեռախոսահամար</ContactLabel>
                <ContactValue>{viewDetailsData.phoneNumber}</ContactValue>
              </div>
            </InfoWrapper>
          </Modal>
          <MobileFilter
            isFilterOpen={isFilterOpen}
            handleCloseFilter={() => setIsFilterOpen(false)}
          />
          {isMobile && (
            <MobileList
              columns={mobileColumns}
              data={data}
              expandable={renderExpandableContent}
              onPaginationChange={handlePageChange}
              currentPage={searchData.page}
              loading={isLoading.process}
              totalPages={pagesCount}
              handleSortClick={handleSortClick}
              sortable={true}
            />
          )}
        </ViewContainer>
      </>
    )
  );
};

export default SurveyReport;
