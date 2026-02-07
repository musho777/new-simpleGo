import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import dayjs from 'dayjs';
import {
  getAllTariff,
  getCity,
  getContract,
  getRegion,
} from 'modules/billing/features/main/mainActions';
import {
  selectComparisonDateFromEnd,
  selectComparisonDateFromStart,
  selectComparisonDateToEnd,
  selectComparisonDateToStart,
  selectContract,
  selectContractSearchData,
  selectIsSecurityModalOpen,
  selectLoading,
} from 'modules/billing/features/main/mainSlice';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';
import EmptyView from 'pages/components/emptyView';

import empty from '../../assets/comparison/empty.svg';
import loading from '../../assets/loading.svg';
import {
  FilterContainer,
  LoadContainer,
  LoadingIcon,
  TableWrapper,
  ViewContainer,
} from './Comparison.styles';
import Charts from './charts';
import ComparisonTable from './comparisonTable';
import FilterActions from './filterActions';
import Filters from './filters';
import MobileFilter from './mobileFilter';

const ComparisonOverview = () => {
  const [secret, setSecret] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const data = useSelector(selectContract);
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);
  const searchData = useSelector(selectContractSearchData);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const isTablet = useTabletView();
  const isMobile = useMobileView();
  const memoizedSearchData = useMemo(() => searchData, [searchData]);
  const fromStartDate = useSelector(selectComparisonDateFromStart);
  const fromEndDate = useSelector(selectComparisonDateFromEnd);
  const toStartDate = useSelector(selectComparisonDateToStart);
  const toEndDate = useSelector(selectComparisonDateToEnd);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const barData = useMemo(
    () => [
      {
        name: 'Նոր բաժանորդներ',
        'Առաջին միջակայք': data[0]?.subscribersCount,
        'Երկրորդ միջակայք': data[1]?.subscribersCount,
      },
      {
        name: 'Նոր պայմանագրեր',
        'Առաջին միջակայք': data[0]?.contractsCount,
        'Երկրորդ միջակայք': data[1]?.contractsCount,
      },
      {
        name: 'Վճարումներ',
        'Առաջին միջակայք': data[0]?.numberOfPayments,
        'Երկրորդ միջակայք': data[1]?.numberOfPayments,
      },
      {
        name: 'Անջատված ստատուսում հայտնված բաժանորդներ',
        'Առաջին միջակայք': data[0]?.closedCount,
        'Երկրորդ միջակայք': data[1]?.closedCount,
      },
      {
        name: 'Չվճարված ստատուսում հայտնված բաժանորդներ',
        'Առաջին միջակայք': data[0]?.unpaidCount,
        'Երկրորդ միջակայք': data[1]?.unpaidCount,
      },
    ],
    [data]
  );

  const pieData = useMemo(
    () => [
      { name: 'Առաջին', value: Number(data[0]?.paymentsAmount), color: '#2D6CDF' },
      { name: 'Եկրորդ', value: Number(data[1]?.paymentsAmount), color: '#FF6A00' },
    ],
    [data]
  );

  const totalPaymentsAmount = useMemo(
    () =>
      Math.round(
        (Number(data[0]?.paymentsAmount) || 0) + (Number(data[1]?.paymentsAmount) || 0)
      ).toLocaleString('de-DE'),
    [data]
  );

  const rows1 = useMemo(
    () => [
      { label: 'Նոր բաժանորդների քանակը', value: data[0]?.subscribersCount },
      { label: 'Նոր պայմանագրերի քանակ', value: data[0]?.contractsCount },
      { label: 'Վճարումների քանակ', value: data[0]?.numberOfPayments },
      {
        label: 'Անջատված ստատուսում հայտնված բաժանորդների քանակ',
        value: data[0]?.closedCount,
      },
      {
        label: 'Չվճարված ստատուսում հայտնված բաժանորդների քանակ',
        value: data[0]?.unpaidCount,
      },
      { label: 'Վճարված ընդհանուր գումար', value: `${data[0]?.paymentsAmount} դրամ` },
    ],
    [data]
  );

  const rows2 = useMemo(
    () => [
      { label: 'Նոր բաժանորդների քանակը', value: data[1]?.subscribersCount },
      { label: 'Նոր պայմանագրերի քանակ', value: data[1]?.contractsCount },
      { label: 'Վճարումների քանակ', value: data[1]?.numberOfPayments },
      {
        label: 'Անջատված ստատուսում հայտնված բաժանորդների քանակ',
        value: data[1]?.closedCount,
      },
      {
        label: 'Չվճարված ստատուսում հայտնված բաժանորդների քանակ',
        value: data[1]?.unpaidCount,
      },
      { label: 'Վճարված ենթավճար գումար', value: `${data[1]?.paymentsAmount} դրամ` },
    ],
    [data]
  );
  const dateRange1 = `${dayjs(fromStartDate).format('DD/MM/YYYY')} - ${dayjs(fromEndDate).format('DD/MM/YYYY')}`;

  const dateRange2 = `${dayjs(toStartDate).format('DD/MM/YYYY')} - ${dayjs(toEndDate).format('DD/MM/YYYY')}`;

  const dateMonth1 = dayjs(fromStartDate).format('MMMM');
  const dateMonth2 = dayjs(toStartDate).format('MMMM');

  useEffect(() => {
    dispatch(getRegion());
    dispatch(getCity());
    dispatch(getAllTariff());
    if (secret && fromStartDate && fromEndDate && toStartDate && toEndDate) {
      dispatch(getContract({ ...memoizedSearchData, secret }));
    }
  }, [dispatch, memoizedSearchData, secret]);

  useEffect(() => {
    setSecret(localStorage.getItem('securityCode'));
  }, []);

  return (
    !securityModalOpen && (
      <>
        <ViewContainer>
          <FilterContainer>
            <FilterActions searchData={searchData} toggleFilter={toggleFilter} />
            <Filters searchData={searchData} />
          </FilterContainer>
        </ViewContainer>
        {isLoading.contract && (
          <LoadContainer>
            <LoadingIcon src={loading} alt="Loading..." />
          </LoadContainer>
        )}
        {data.length && !isLoading.contract ? (
          <>
            <TableWrapper $isTablet={isTablet || isMobile}>
              <ComparisonTable rows={rows1} header={dateRange1} />
              <ComparisonTable rows={rows2} header={dateRange2} />
            </TableWrapper>
            <Charts
              barData={barData}
              pieData={pieData}
              totalPaymentsAmount={totalPaymentsAmount}
              dateRange1={dateMonth1}
              dateRange2={dateMonth2}
            />
            <MobileFilter
              searchData={searchData}
              isFilterOpen={isFilterOpen}
              handleCloseFilter={() => setIsFilterOpen(false)}
            />
          </>
        ) : (
          !isLoading.contract && <EmptyView icon={empty} />
        )}
      </>
    )
  );
};

export default ComparisonOverview;
