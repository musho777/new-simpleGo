import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import ChartModal from 'modules/billing/components/chartModal';
import MuiTable from 'modules/billing/components/muiTable/MuiTable';
import Tag from 'modules/billing/components/tag';
import {
  getActiveTariff,
  getAllTariff,
  getCity,
  getCount,
  getInvoices,
  getRegion,
} from 'modules/billing/features/main/mainActions';
import {
  selectContractDiagrams,
  selectContractDiagramsSearchData,
  selectCount,
  selectInvoices,
  selectIsSecurityModalOpen,
  selectLoading,
  selectPagesCount,
  selectTotalAmountByFilter,
  selectTotalElements,
  setContractDiagramsSearchData,
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
  Title,
  ViewContainer,
} from './Subscribers.styles';
import { COLUMNS } from './billingConstants';
import FilterActions from './filterActions';
import Filters from './filters';
import MobileFilter from './mobileFilter';
import { useSubscribersSearchParams } from './useSearchData';

const BillingOverview = () => {
  const { searchData, setSubscribersSearchData, resetSearchData } =
    useSubscribersSearchParams();

  const [viewDetailsData, setViewDetailsData] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchIdInputValue, setSearchIdInputValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAllOpen, setModalAllOpen] = useState(false);
  const securityValue = localStorage.getItem('securityCode');
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);
  const usersCount = useSelector(selectCount);

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

  const data = useSelector(selectInvoices);
  const pagesCount = useSelector(selectPagesCount);
  const totalElements = useSelector(selectTotalElements);
  const totalAmount = useSelector(selectTotalAmountByFilter);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isTablet = useTabletView();
  const isMobile = useMobileView();
  const searchDiagramsData = useSelector(selectContractDiagramsSearchData);
  const contractDiagrams = useSelector(selectContractDiagrams);
  const { activeSubscribersCount, byRegion, byTariff } = contractDiagrams;
  const maxCount = Math.max(...Object.values(byRegion || {}));
  const barData = Object.entries(byRegion || {}).map(([key, count]) => ({
    name: regionMapping[key] || key,
    count: count || 0,
    totalCount: maxCount || 0,
  }));
  const barCategoryData = Object.entries(byTariff || {}).map(([key, count]) => ({
    name: key,
    count: count || 0,
  }));

  const handleOpenModal = () => {
    dispatch(
      setContractDiagramsSearchData({
        ...searchDiagramsData,
        from: searchData.from,
        to: searchData.to,
      })
    );
    setModalOpen(true);
  };

  const handleResetAllFilters = () => {
    setSearchIdInputValue('');
    resetSearchData();
    dispatch(
      setContractDiagramsSearchData({
        ...searchDiagramsData,
        from: getPreviousDate(),
        to: getPreviousDate(),
      })
    );
  };

  const handleOpen = (e) => {
    setViewDetailsData({
      subContractCount: e.subContractCount,
      oldTariffs: e.oldTariffs,
      currentTariffs: e.currentTariffs,
      regions: e.regions,
      cities: e.cities,
      oldStatus: e.oldStatus,
      balance: e.balance,
      phoneNumber: e.phoneNumber,
    });

    setOpen(true);
  };

  const handlePageChange = (page) => {
    setSubscribersSearchData({ page: page - 1 });
  };

  const handleClose = () => setOpen(false);

  const TABLET_COLUMNS = [
    { id: 'contractId', label: 'ԲԱԺԱՆՈՐԴԻ ID', numeric: false },
    {
      id: 'currentStatus',
      label: 'Ընթացիկ ստատուս',
      numeric: false,
      render: (currentStatus) => <Tag type={currentStatus} />,
    },
    { id: 'lastPaymentDate', label: 'Վերջին վճարման ամսաթիվ', width: '140px', numeric: false },
    { id: 'amount', label: 'Վճարման ենթակա գումար', width: '150px', numeric: false },
    { id: 'createDate', label: 'Ստեղծման ամսաթիվ', numeric: false },
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
      title: 'Վճարման ենթակա գումար',
      dataIndex: 'amount',
    },
  ];

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Պայմանագրերի քանակ</ExpandedLabel>
          <ContractValue>
            {row.subContractCount === null ? '-' : row.subContractCount}
          </ContractValue>
        </Row>
        <Row>
          <ExpandedLabel>Հին տարիֆներ</ExpandedLabel>
          <ExpandedValue>{row.oldTariffs == '\n' ? '-' : row.oldTariffs}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Ընթացիկ տարիֆներ</ExpandedLabel>
          <ExpandedValue>
            {row.currentTariffs == '\n' ? '-' : row.currentTariffs}
          </ExpandedValue>
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
          <ExpandedLabel>Հեռախոսահամար</ExpandedLabel>
          <ExpandedValue>{row.phoneNumber === null ? '-' : row.phoneNumber}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Ստեղծման ամսաթիվ</ExpandedLabel>
          <ExpandedValue>{row.createDate === null ? '-' : row.createDate}</ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );

  const amountToPay = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
  }, [data]);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleRowCountChange = (count) => {
    setSubscribersSearchData({ size: count });
  };

  const columns = isTablet ? TABLET_COLUMNS : COLUMNS;

  const handleSortClick = (order) => {
    setSubscribersSearchData({
      sort: [order],
      page: searchData.page,
    });
  };

  useEffect(() => {
    dispatch(getCount({}));
    dispatch(getRegion());
    dispatch(getCity());
    dispatch(getAllTariff());
    dispatch(getActiveTariff());

    securityValue && dispatch(getInvoices({ ...searchData, secret: securityValue }));
  }, [searchData, securityValue, dispatch]);

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
              <Button
                width={193}
                secondary
                onClick={() => {
                  dispatch(
                    setContractDiagramsSearchData({
                      ...searchDiagramsData,
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
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                barData={barData}
                barCategoryData={barCategoryData}
                loading={isLoading.contractDiagrams}
                activeSubscribersCount={activeSubscribersCount}
                headerTitle={`Բաժանորդների քանակը ըստ մարզերի՝ ${activeSubscribersCount}`}
                titleFirst="Բաժանորդների քանակը ըստ մարզերի"
                titleNext="Բաժանորդների քանակ ըստ պլանի"
              />
              <ChartModal
                isOpen={modalAllOpen}
                onClose={() => setModalAllOpen(false)}
                barData={barData}
                barCategoryData={barCategoryData}
                maxCount={maxCount}
                activeSubscribersCount={activeSubscribersCount}
                loading={isLoading.contractDiagrams}
                headerTitle={`Բաժանորդների քանակը ըստ մարզերի՝ ${activeSubscribersCount}`}
                titleFirst="Բաժանորդների քանակը ըստ մարզերի"
                titleNext="Բաժանորդների քանակ ըստ պլանի"
              />
            </GraphWrapper>
          )}

          <FilterContainer>
            {!isMobile && (
              <Title className="inline_title ">
                Ընդհանուր բաժանորդների քանակ՝ {usersCount}
              </Title>
            )}
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
              loading={isLoading.invoices}
              data={data}
              handleSortClick={handleSortClick}
              columns={columns}
              totalPages={pagesCount}
              currentPage={searchData.page + 1}
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
                <ContactLabel>Պայմանագրերի քանակ</ContactLabel>
                <ContractValue>{viewDetailsData.subContractCount}</ContractValue>
              </div>
              <div>
                <ContactLabel>Հին տարիֆներ</ContactLabel>
                <ContactValue>
                  {viewDetailsData.oldTariffs == '\n' ? '-' : viewDetailsData.oldTariffs}
                </ContactValue>
              </div>
              <div>
                <ContactLabel>Ընթացիկ տարիֆներ</ContactLabel>
                <ContactValue>{viewDetailsData.currentTariffs}</ContactValue>
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
              <div>
                <ContactLabel>Հեռախոսահամար</ContactLabel>
                <ContactValue>
                  {viewDetailsData.phoneNumber === null ? '-' : viewDetailsData.phoneNumber}
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
              currentPage={searchData.page + 1}
              loading={isLoading.invoices}
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

export default BillingOverview;
