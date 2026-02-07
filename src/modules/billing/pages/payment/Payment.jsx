import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import ChartModal from 'modules/billing/components/chartModal';
import MuiTable from 'modules/billing/components/muiTable';
import Tag from 'modules/billing/components/tag';
import TagMethod from 'modules/billing/components/tagMethod';
import {
  getActiveTariff,
  getAllTariff,
  getCity,
  getPaymentMethod,
  getPayments,
  getRegion,
} from 'modules/billing/features/main/mainActions';
import {
  selectContractPaymentDiagrams,
  selectContractPaymentDiagramsSearchData,
  selectIsSecurityModalOpen,
  selectLoading,
  selectPagesCount,
  selectPayments,
  selectTotalAmountByFilter,
  selectTotalElements,
  setContractPaymentDiagramsSearchData,
} from 'modules/billing/features/main/mainSlice';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';
import { getPreviousDate } from 'utils/dateUtils';

import Select from '../../assets/subscribers/select.svg';
import {
  ContactLabel,
  ContactValue,
  ContractValue,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  FilterContainer,
  GraphWrapper,
  Icon,
  InfoWrapper,
  Row,
  ViewContainer,
} from './Payment.styles';
import { COLUMNS } from './billingConstants';
import FilterActions from './filterActions';
import Filters from './filters';
import MobileFilter from './mobileFilter';
import { usePaymentSearchParams } from './useSearchData';

const BillingReport = () => {
  const { searchData, setPaymentSearchData, resetSearchData } = usePaymentSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAllOpen, setModalAllOpen] = useState(false);
  const [viewDetailsData, setViewDetailsData] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchIdInputValue, setSearchIdInputValue] = useState('');
  const searchPaymentDiagramsData = useSelector(selectContractPaymentDiagramsSearchData);
  const contractPaymentDiagrams = useSelector(selectContractPaymentDiagrams);
  const { paymentsAmount, byRegion, byTariff } = contractPaymentDiagrams;
  const maxCount = Math.max(...Object.values(byRegion || {}));

  const regionMapping = {
    yerevan: 'Երևան',
    aragatsotn: 'Արագածոտն',
    armavir: 'Արմավիր',
    ararat: 'Արարատ',
    vayocDzor: 'Վայոց Ձոր',
    gegharkunik: 'Գեղարքունիք',
    kotayk: 'Կոտայք',
    lori: 'Լոռի',
    syunik: 'Սյունիք',
    tavush: 'Տավուշ',
    shirak: 'Շիրակ',
  };

  const barData = Object.entries(byRegion || {}).map(([key, count]) => ({
    name: regionMapping[key] || key,
    count: count || 0,
    totalCount: maxCount || 0,
  }));

  const barCategoryData = Object.entries(byTariff || {}).map(([key, count]) => ({
    name: key,
    count: count || 0,
  }));

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num).replace(/,/g, '․');
  };

  const securityValue = localStorage.getItem('securityCode');
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);

  const handleOpenModal = () => {
    dispatch(
      setContractPaymentDiagramsSearchData({
        ...searchPaymentDiagramsData,
        from: searchData.from,
        to: searchData.to,
      })
    );

    setModalOpen(true);
  };

  const data = useSelector(selectPayments);
  const pagesCount = useSelector(selectPagesCount);
  const totalElements = useSelector(selectTotalElements);
  const totalAmount = useSelector(selectTotalAmountByFilter);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isTablet = useTabletView();
  const isMobile = useMobileView();

  const handleResetAllFilters = () => {
    setSearchIdInputValue('');
    resetSearchData();
    dispatch(
      setContractPaymentDiagramsSearchData({
        ...searchPaymentDiagramsData,
        from: getPreviousDate(),
        to: getPreviousDate(),
      })
    );
  };

  const handleOpen = (e) => {
    setViewDetailsData({
      numberOfPayments: e.numberOfPayments,
      regions: e.regions,
      cities: e.cities,
      oldStatus: e.oldStatus,
      balance: e.balance,
    });

    setOpen(true);
  };

  const handlePageChange = (page) => {
    setPaymentSearchData({ page });
  };

  const handleClose = () => setOpen(false);

  const TABLET_COLUMNS = [
    { id: 'contractId', label: 'ԲԱԺԱՆՈՐԴԻ ID', width: '130px', numeric: false },
    {
      id: 'currentStatus',
      label: 'Ընթացիկ ստատուս',
      width: '150px',
      numeric: false,
      render: (currentStatus) => <Tag type={currentStatus} />,
    },
    { id: 'amountPaid', label: 'Վճարած գումար', width: '130px', numeric: false },
    { id: 'lastPaymentDate', label: 'Վերջին վճարման ամսաթիվ', width: '200px', numeric: false },
    {
      id: 'paymentMethod',
      label: 'Վճարման մեթոդ',
      width: '130px',
      numeric: false,
      render: (paymentMethod) => <TagMethod type={paymentMethod} />,
    },
    {
      id: 'details',
      numeric: false,
      render: (_, e) => <Icon src={Select} onClick={() => handleOpen(e)} />,
    },
  ];

  const mobileColumns = [
    {
      title: 'ԲԱԺԱՆՈՐԴԻ ID',
      dataIndex: 'contractId',
      sortable: true,
    },
    {
      title: 'Ընթացիկ ստատուս',
      dataIndex: 'currentStatus',
      render: (currentStatus) => <Tag type={currentStatus} />,
    },
    {
      title: 'Վճարած գումար',
      dataIndex: 'amountPaid',
    },
  ];

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Վճարումների քանակ</ExpandedLabel>
          <ContractValue>
            {row.numberOfPayments === null ? '-' : row.numberOfPayments}
          </ContractValue>
        </Row>
        <Row>
          <ExpandedLabel>Մարզեր</ExpandedLabel>
          <ExpandedValue>{row.regions === null ? '-' : row.regions}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Քաղաքներ</ExpandedLabel>
          <ExpandedValue>{row.cities === null ? '-' : row.cities}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Նախորդող ստատուս</ExpandedLabel>
          <Tag type={row.oldStatus} />
        </Row>
        <Row>
          <ExpandedLabel>Հաշվեկշիռ</ExpandedLabel>
          <ExpandedValue>{row.balance === null ? '-' : row.balance}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Վերջին վճարման ամսաթիվ</ExpandedLabel>
          <ExpandedValue>
            {row.lastPaymentDate === null ? '-' : row.lastPaymentDate}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Վճարման մեթոդ</ExpandedLabel>
          <TagMethod type={row.paymentMethod} />
        </Row>
      </ExpandableWrapper>
    </>
  );

  const amountToPay = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amountPaid, 0).toFixed(2);
  }, [data]);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleRowCountChange = (count) => {
    setPaymentSearchData({ ...searchData, size: count });
  };

  const columns = isTablet ? TABLET_COLUMNS : COLUMNS;

  const memoizedSearchData = useMemo(() => searchData, [searchData]);

  const handleSortClick = (order) => {
    setPaymentSearchData({ ...searchData, sort: order });
  };

  useEffect(() => {
    dispatch(getRegion());
    dispatch(getPaymentMethod());
    dispatch(getCity());
    dispatch(getAllTariff());
    dispatch(getActiveTariff());

    securityValue && dispatch(getPayments({ ...searchData, secret: securityValue }));
  }, [memoizedSearchData, securityValue, dispatch]);

  return (
    !securityModalOpen && (
      <>
        <ViewContainer>
          {isMobile && (
            <GraphWrapper>
              <Button
                width={186}
                outlined
                onClick={handleOpenModal}
                className="buttonModalFirst"
              >
                Տեսնել գծապատկերները
              </Button>
              <ChartModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                barData={barData}
                barCategoryData={barCategoryData}
                maxCount={maxCount}
                loading={isLoading.contractPaymentDiagrams}
                YAxisWith={45}
                headerTitle={`Բաժանորդների վճարած ընդհանուր գումարը՝ ${formatNumber(paymentsAmount)} դրամ`}
                titleFirst="Բաժանորդներից գանձված գումարը ըստ մարզերի"
                titleNext="Բաժանորդներից գանձված գումարը ըստ պլանի  (դրամ)"
                isSum
              />
              <Button
                width={193}
                secondary
                onClick={() => {
                  dispatch(
                    setContractPaymentDiagramsSearchData({
                      ...searchPaymentDiagramsData,
                      from: '',
                      to: '',
                    })
                  );
                  setModalAllOpen(true);
                }}
                className="buttonModal"
              >
                Ամբողջ ժամանակաշրջան
              </Button>
              <ChartModal
                isOpen={modalAllOpen}
                onClose={() => setModalAllOpen(false)}
                barData={barData}
                barCategoryData={barCategoryData}
                maxCount={maxCount}
                loading={isLoading.contractPaymentDiagrams}
                YAxisWith={50}
                headerTitle={`Բաժանորդների վճարած ընդհանուր գումարը՝  ${formatNumber(paymentsAmount)} դրամ`}
                titleFirst="Բաժանորդներից գանձված գումարը ըստ մարզերի"
                titleNext="Բաժանորդներից գանձված գումարը ըստ պլանի  (դրամ)"
                isSum
              />
            </GraphWrapper>
          )}
          <FilterContainer>
            <FilterActions
              toggleFilter={toggleFilter}
              searchIdInputValue={searchIdInputValue}
              setSearchIdInputValue={setSearchIdInputValue}
              handleResetAllFilters={handleResetAllFilters}
            />
            <Filters />
          </FilterContainer>
          {!isMobile && (
            <MuiTable
              rowCount={searchData.size}
              loading={isLoading.payments}
              data={data}
              handleSortClick={handleSortClick}
              columns={columns}
              totalPages={pagesCount}
              currentPage={searchData.page}
              handlePageChange={handlePageChange}
              handleRowCountChange={handleRowCountChange}
              dataCount={totalElements}
              count={amountToPay}
              totalAmount={totalAmount}
            />
          )}
          <Modal closeIcon isOpen={open} onClose={handleClose}>
            <InfoWrapper>
              <div>
                <ContactLabel>Վճարումների քանակ</ContactLabel>
                <ContractValue>{viewDetailsData.numberOfPayments}</ContractValue>
              </div>
              <div>
                <ContactLabel>Մարզեր</ContactLabel>
                <ContactValue>{viewDetailsData.regions}</ContactValue>
              </div>
              <div>
                <ContactLabel>Քաղաքներ</ContactLabel>
                <ContactValue>{viewDetailsData.cities}</ContactValue>
              </div>
              <div>
                <ContactLabel>Նախորդող ստատուս</ContactLabel>
                <Tag type={viewDetailsData.oldStatus} />
              </div>
              <div>
                <ContactLabel>Հաշվեկշիռ</ContactLabel>
                <ContactValue>
                  {viewDetailsData.balance === null ? '-' : viewDetailsData.balance}
                </ContactValue>
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
              loading={isLoading.payments}
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

export default BillingReport;
