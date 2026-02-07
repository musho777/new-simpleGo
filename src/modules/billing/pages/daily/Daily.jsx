import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Padding } from '@mui/icons-material';
import BasicButton from 'common-ui/filterButton';
import Card from 'modules/billing/components/card';
import DailyTable from 'modules/billing/components/dailyTable';
import OneDayCard from 'modules/billing/components/oneDayCard';
import Tag from 'modules/billing/components/tag';
import {
  getCitiesOneDay,
  getContractOneDay,
  getContractOneDayAllItemsInfo,
  getContractOneDayGroupInfo,
  getCount,
  getRegionsOneDay,
  getStatusesOneDay,
  getTariffsOneDay,
} from 'modules/billing/features/main/mainActions';
import {
  selectContractAllItemList,
  selectContractGroupedList,
  selectContractOneDay,
  selectContractOneDayAllItemsInfoSearchData,
  selectContractOneDayGroupedInfoSearchData,
  selectContractOneDaySearchData,
  selectCount,
  selectIsSecurityModalOpen,
  selectLoading,
  selectSelectedDateFrom,
  setContractOneDayAllItemsInfoSearchData,
  setContractOneDayGroupedInfoSearchData,
} from 'modules/billing/features/main/mainSlice';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';

import group from '../../assets/daily/group.svg';
import paper from '../../assets/daily/paper.svg';
import salary from '../../assets/daily/salary.svg';
import wallet from '../../assets/daily/wallet.svg';
import loading from '../../assets/loading.svg';
import {
  ButtonWrapper,
  CardStatusWrapper,
  CardWrapper,
  FilterContainer,
  FilterWrapper,
  LoadContainer,
  LoadingIcon,
  NavContainer,
  NavWrapper,
  TabButton,
  TableContainer,
  TableWrapper,
  Title,
  ViewContainer,
} from './Daily.styles';
import FilterActions from './filterActions';
import Filters from './filters';

const getFilterCount = (filters) => {
  const filterKeys = ['city', 'region', 'tariff'];

  const filterCount = filterKeys.reduce((count, key) => {
    const value = filters[key];
    return count + (Array.isArray(value) && value.length > 0 ? 1 : 0);
  }, 0);

  return { filterCount };
};

const getAllFilterCount = (filters) => {
  const filterKeys = ['city', 'region', 'tariff', 'status'];

  const filterAllCount = filterKeys.reduce((count, key) => {
    const value = filters[key];
    return count + (Array.isArray(value) && value.length > 0 ? 1 : 0);
  }, 0);

  return { filterAllCount };
};

const DailyReport = () => {
  const [activeTabId, setActiveTabId] = useState(1);
  const [secret, setSecret] = useState(null);
  const [showLeftFilters, setShowLeftFilters] = useState(false);
  const [showRightFilters, setShowRightFilters] = useState(false);
  const [resetGroupedFilters, setResetGroupedFilters] = useState({
    region: [],
    city: [],
    tariff: [],
  });

  const [resetAllItemsFilters, setResetAllItemsFilters] = useState({
    region: [],
    city: [],
    tariff: [],
    status: [],
  });
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);
  const searchData = useSelector(selectContractOneDaySearchData);
  const data = useSelector(selectContractOneDay);
  const groupedList = useSelector(selectContractGroupedList);
  const allItemsList = useSelector(selectContractAllItemList);
  const usersCount = useSelector(selectCount);
  const isLoading = useSelector(selectLoading);
  const selectedDate = useSelector(selectSelectedDateFrom);
  const allItemsSearchData = useSelector(selectContractOneDayAllItemsInfoSearchData);
  const groupedInfoSearchData = useSelector(selectContractOneDayGroupedInfoSearchData);
  const { filterCount } = getFilterCount(groupedInfoSearchData);
  const { filterAllCount } = getAllFilterCount(allItemsSearchData);
  const dispatch = useDispatch();
  const isTablet = useTabletView();
  const isMobile = useMobileView();

  const tabs = [
    { name: 'Նոր պայմանագրեր', id: 1 },
    { name: isMobile ? 'Մանրամասն տվյալներ' : 'Նոր պայմանագրերի մանրամասն տվյալներ', id: 2 },
  ];

  const handleResetGroupedFilters = () => {
    setResetGroupedFilters({
      region: [],
      city: [],
      tariff: [],
    });

    dispatch(
      setContractOneDayGroupedInfoSearchData({
        region: [],
        city: [],
        tariff: [],
      })
    );
  };

  const handleResetAllItemsFilters = () => {
    setResetAllItemsFilters({
      region: [],
      city: [],
      tariff: [],
      status: [],
    });

    dispatch(
      setContractOneDayAllItemsInfoSearchData({
        region: [],
        city: [],
        tariff: [],
        status: [],
      })
    );
  };

  const handleClickShowHideFilters = () => {
    setShowLeftFilters((prev) => {
      return !prev;
    });
  };

  const handleClickRightShowHideFilters = () => {
    setShowRightFilters((prev) => {
      return !prev;
    });
  };

  const sum = useMemo(
    () => Math.round(Number(data?.sum) || 0).toLocaleString('de-DE'),
    [data]
  );

  const memoizedSearchData = useMemo(() => searchData, [searchData]);

  const handleFilterGroupedChange = (key, value) => {
    const updatedSearchData = { ...groupedInfoSearchData };

    if (value.length === 0) {
      updatedSearchData[key] = [];
    } else if (value.length > 0) {
      updatedSearchData[key] = value;
    } else {
      delete updatedSearchData[key];
    }

    dispatch(setContractOneDayGroupedInfoSearchData(updatedSearchData));
  };

  const handleFilterAllItemsChange = (key, value) => {
    const updatedSearchData = { ...allItemsSearchData };

    if (value.length === 0) {
      updatedSearchData[key] = [];
    } else if (value.length > 0) {
      updatedSearchData[key] = value;
    } else {
      delete updatedSearchData[key];
    }

    dispatch(setContractOneDayAllItemsInfoSearchData(updatedSearchData));
  };

  useEffect(() => {
    if (secret) {
      dispatch(getContractOneDay({ ...memoizedSearchData, secret }));
      dispatch(getCount({}));
    }
  }, [dispatch, memoizedSearchData, secret]);

  useEffect(() => {
    if (secret) {
      dispatch(
        getContractOneDayGroupInfo({ ...groupedInfoSearchData, secret, date: selectedDate })
      );
    }
  }, [dispatch, groupedInfoSearchData, secret, selectedDate]);

  useEffect(() => {
    if (secret) {
      dispatch(
        getContractOneDayAllItemsInfo({ ...allItemsSearchData, secret, date: selectedDate })
      );
    }
  }, [dispatch, allItemsSearchData, secret, selectedDate]);

  useEffect(() => {
    if (secret) {
      dispatch(getRegionsOneDay({ secret, date: selectedDate }));
      dispatch(getTariffsOneDay({ secret, date: selectedDate }));
      dispatch(getCitiesOneDay({ secret, date: selectedDate }));
      dispatch(getStatusesOneDay({ secret, date: selectedDate }));
    }
  }, [dispatch, secret, selectedDate]);

  useEffect(() => {
    setSecret(localStorage.getItem('securityCode'));
  }, []);

  const oneDayCards = [
    { title: 'Բաժանորդների քանակ', number: usersCount, bgColor: '#1D3557', icon: group },
    {
      title: 'Նոր պայմանագրեր',
      number: data?.newContracts,
      bgColor: '#2D6CDF',
      icon: paper,
    },
    {
      title: 'Վճարումների քանակ',
      number: data?.countOfPay,
      bgColor: '#899EC8',
      icon: wallet,
    },
    {
      title: 'Վճարված ընդհանուր գումար',
      number: `${sum} դրամ`,
      bgColor: '#FE7919',
      icon: salary,
    },
  ];

  const statusCards = [
    { title: 'Ակտիվ', value: data?.active, bgColor: '#15C7A7' },
    { title: 'Անջատված', value: data?.disconnected, bgColor: '#95A5A6' },
    { title: 'Փակված', value: data?.closed, bgColor: '#AB2731' },
    { title: 'Կասեցված', value: data?.suspended, bgColor: '#FF6A00' },
    { title: 'Միացված չէ', value: data?.notConnected, bgColor: '#2D6CDF' },
    { title: 'Վճարված չէ', value: data?.notPaid, bgColor: '#2D6CDF' },
    { title: 'Վերականգնված', value: data?.restored, bgColor: '#A225D7' },
  ];

  const columns1 = [
    { key: 'tariff', label: 'ՏԱՐԻՖ' },
    { key: 'region', label: 'ՄԱՐԶԵՐ' },
    { key: 'city', label: 'ՔԱՂԱՔ' },
    { key: 'contractsCount', label: 'ԲԱԺԱՆՈՐԴՆԵՐԻ ՔԱՆԱԿ' },
  ];

  const columns2 = [
    { key: 'number', label: 'ՊԱՅՄ. ՀԱՄԱՐ' },
    { key: 'tariff', label: 'ՏԱՐԻՖ' },
    { key: 'region', label: 'ՄԱՐԶԵՐ' },
    { key: 'city', label: 'ՔԱՂԱՔ' },
    {
      key: 'status',
      label: 'ՍՏԱՏՈՒՍ',
      render: (status) => <Tag className="tags" type={status} />,
    },
  ];

  const handleTabClick = (id) => {
    setActiveTabId(id);
  };

  return (
    !securityModalOpen && (
      <ViewContainer>
        <FilterContainer>
          <FilterActions />
        </FilterContainer>
        <>
          {isLoading.contractOneDay ? (
            <LoadContainer>
              <LoadingIcon src={loading} alt="Loading..." />
            </LoadContainer>
          ) : (
            <div>
              <CardWrapper $isTablet={isTablet} $isMobile={isMobile}>
                {oneDayCards.map(({ title, number, bgColor, icon }) => (
                  <OneDayCard
                    key={title}
                    title={title}
                    number={number}
                    bgColor={bgColor}
                    icon={icon}
                  />
                ))}
              </CardWrapper>
              <Title>Բաժանորդների քանակը ըստ ստատուսների</Title>
              <CardStatusWrapper $isTablet={isTablet} $isMobile={isMobile}>
                {statusCards.map(({ title, value, bgColor }) => (
                  <Card key={title} title={title} value={value} bgColor={bgColor} />
                ))}
              </CardStatusWrapper>
            </div>
          )}
          <NavWrapper>
            <NavContainer>
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  $isActive={activeTabId === tab.id}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.name}
                </TabButton>
              ))}
            </NavContainer>
          </NavWrapper>
          <TableContainer>
            <TableWrapper $active={activeTabId === 1}>
              <FilterWrapper>
                <ButtonWrapper>
                  <Title>Նոր պայմանագրեր</Title>
                  <BasicButton
                    title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
                    onClick={handleClickShowHideFilters}
                    isActive={filterCount > 0}
                  />
                </ButtonWrapper>
                <Filters
                  searchData={groupedInfoSearchData}
                  showLeftFilters={showLeftFilters}
                  handleClickShowHideFilters={handleClickShowHideFilters}
                  handleFilterChange={handleFilterGroupedChange}
                  handleResetFilters={handleResetGroupedFilters}
                  resetFilters={resetGroupedFilters}
                />
              </FilterWrapper>
              <DailyTable
                data={groupedList}
                columns={columns1}
                loading={isLoading.contractOneDayGroupedInfo}
              />
            </TableWrapper>
            <TableWrapper $active={activeTabId === 2}>
              <FilterWrapper>
                <ButtonWrapper>
                  <Title>Նոր պայմանագրերի մանրամասն տվյալներ</Title>
                  <BasicButton
                    title={`Ֆիլտրում ${filterAllCount > 0 ? ` (${filterAllCount})` : ''}`}
                    onClick={handleClickRightShowHideFilters}
                    isActive={filterAllCount > 0}
                  />
                </ButtonWrapper>
                <Filters
                  searchData={allItemsSearchData}
                  showRightFilters={showRightFilters}
                  handleClickRightShowHideFilters={handleClickRightShowHideFilters}
                  handleFilterChange={handleFilterAllItemsChange}
                  handleResetFilters={handleResetAllItemsFilters}
                  resetFilters={resetAllItemsFilters}
                  showStatus
                />
              </FilterWrapper>
              <DailyTable
                data={allItemsList}
                columns={columns2}
                loading={isLoading.contractOneDayAllItemsInfo}
              />
            </TableWrapper>
          </TableContainer>
        </>
      </ViewContainer>
    )
  );
};

export default DailyReport;
