import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import BasicButton from 'common-ui/filterButton';
import ResetButton from 'common-ui/resetButton';
import useDebounce from 'hooks/useDebounce';
import ChartModal from 'modules/billing/components/chartModal';
import DatePicker from 'modules/billing/components/datePicker';
import MyUiInput from 'modules/billing/components/input/MyUIInput';
import { getContractDiagrams } from 'modules/billing/features/main/mainActions';
import {
  selectContractDiagrams,
  selectContractDiagramsSearchData,
  selectCount,
  selectLoading,
  selectShowFilters,
  setContractDiagramsSearchData,
  setShowFilters,
} from 'modules/billing/features/main/mainSlice';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';
import { getPreviousDate } from 'utils/dateUtils';

import SearchIcon from '../../../assets/search.svg';
import {
  ActionDesktopWrapper,
  ActionsMobileGrid,
  ActionsMobileWrapper,
  ActionsTabletGraphWrapper,
  ActionsTabletWrapper,
  ActionsWrapper,
  TabletGraph,
  Title,
} from '../Subscribers.styles';
import { useSubscribersSearchParams } from '../useSearchData';

const getFilterCount = (filters) => {
  const filterKeys = [
    'city',
    'region',
    'oldTariff',
    'currentTariff',
    'oldStatus',
    'currentStatus',
  ];

  const filterCount = filterKeys.reduce((count, key) => {
    const value = filters[key];
    return count + (Array.isArray(value) && value.length > 0 ? 1 : 0);
  }, 0);

  return { filterCount };
};

const FilterActions = ({
  toggleFilter,
  searchIdInputValue,
  setSearchIdInputValue,
  handleResetAllFilters,
}) => {
  const { searchData, setSubscribersSearchData } = useSubscribersSearchParams();
  const { filterCount } = getFilterCount(searchData);
  const securityValue = localStorage.getItem('securityCode');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAllOpen, setModalAllOpen] = useState(false);
  const searchDiagramsData = useSelector(selectContractDiagramsSearchData);
  const debouncedSearchIdInputValue = useDebounce(searchIdInputValue, 500);
  const isLoading = useSelector(selectLoading);
  const showFilters = useSelector(selectShowFilters);
  const dispatch = useDispatch();
  const isTablet = useTabletView();
  const isMobile = useMobileView();
  const usersCount = useSelector(selectCount);
  const contractDiagrams = useSelector(selectContractDiagrams);

  const { activeSubscribersCount, byRegion, byTariff } = contractDiagrams;

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };

  const handleSearchIdInputChange = (e) => {
    setSearchIdInputValue(e.target.value);
  };

  const onDateChange = ({ from, to }) => {
    setDateFrom((prev) => from || prev);
    setDateTo((prev) => to || prev);
  };

  const handleOpenModal = () => {
    if (dateFrom && dateTo) {
      dispatch(
        setContractDiagramsSearchData({
          ...searchDiagramsData,
          from: dateFrom,
          to: dateTo,
        })
      );
    } else {
      dispatch(
        setContractDiagramsSearchData({
          ...searchDiagramsData,
          from: getPreviousDate(),
          to: getPreviousDate(),
        })
      );
    }
    setModalOpen(true);
  };

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

  const memoizedSearchDiagramsData = useMemo(() => searchDiagramsData, [searchDiagramsData]);

  useEffect(() => {
    securityValue &&
      dispatch(getContractDiagrams({ ...searchDiagramsData, secret: securityValue }));
  }, [memoizedSearchDiagramsData, securityValue, dispatch]);

  useEffect(() => {
    if (dateFrom && dateTo) {
      setSubscribersSearchData({
        ...searchData,
        from: dateFrom,
        to: dateTo,
      });
    }
  }, [dateFrom, dateTo, dispatch]);

  useEffect(() => {
    setSubscribersSearchData({ ...searchData, contractId: debouncedSearchIdInputValue });
  }, [debouncedSearchIdInputValue, dispatch]);

  return (
    <>
      {isTablet ? (
        <ActionsTabletWrapper>
          <ResetButton onClick={handleResetAllFilters} title="" />
          <MyUiInput
            leftIcon={SearchIcon}
            value={searchIdInputValue}
            onClear={() => setSearchIdInputValue('')}
            onChange={handleSearchIdInputChange}
            placeholder="Որոնում ըստ բաժանորդի ID-ի"
          />
          <DatePicker
            defaultFrom={searchData.from}
            defaultTo={searchData.to}
            onDateChange={onDateChange}
          />
          <BasicButton
            title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
            onClick={handleClickShowHideFilters}
            isActive={filterCount > 0}
          />
          <ActionsTabletGraphWrapper>
            <TabletGraph>
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
                loading={isLoading.contractDiagrams}
                activeSubscribersCount={activeSubscribersCount}
              />
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
                isOpen={modalAllOpen}
                onClose={() => setModalAllOpen(false)}
                barData={barData}
                barCategoryData={barCategoryData}
                maxCount={maxCount}
                activeSubscribersCount={activeSubscribersCount}
                loading={isLoading.contractDiagrams}
              />
            </TabletGraph>
          </ActionsTabletGraphWrapper>
        </ActionsTabletWrapper>
      ) : isMobile ? (
        <ActionsMobileGrid>
          <ActionsMobileWrapper>
            <MyUiInput
              leftIcon={SearchIcon}
              value={searchIdInputValue}
              onClear={() => setSearchIdInputValue('')}
              onChange={handleSearchIdInputChange}
              placeholder="Որոնում ըստ բաժանորդի ID-ի"
            />
            <div className="filter">
              <BasicButton
                title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
                onClick={toggleFilter}
                isActive={filterCount > 0}
              />
            </div>
          </ActionsMobileWrapper>
          <ActionsMobileWrapper>
            <DatePicker
              defaultFrom={searchData.from}
              defaultTo={searchData.to}
              onDateChange={onDateChange}
            />
          </ActionsMobileWrapper>
          <ResetButton onClick={handleResetAllFilters} title="" />
          <Title className="text">Ընդհանուր բաժանորդների քանակ՝ {usersCount}</Title>
        </ActionsMobileGrid>
      ) : (
        <ActionDesktopWrapper>
          <ActionsWrapper>
            <ResetButton onClick={handleResetAllFilters} title="" />
            <MyUiInput
              leftIcon={SearchIcon}
              value={searchIdInputValue}
              onClear={() => setSearchIdInputValue('')}
              onChange={handleSearchIdInputChange}
              placeholder="Որոնում ըստ բաժանորդի ID-ի"
            />
            <BasicButton
              title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
              onClick={handleClickShowHideFilters}
              isActive={filterCount > 0}
            />
            <DatePicker
              onDateChange={onDateChange}
              defaultFrom={searchData.from}
              defaultTo={searchData.to}
            />
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
              loading={isLoading.contractDiagrams}
              headerTitle={`Բաժանորդների քանակը ըստ մարզերի՝ ${activeSubscribersCount}`}
              titleFirst="Բաժանորդների քանակը ըստ մարզերի"
              titleNext="Բաժանորդների քանակ ըստ պլանի"
            />
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
              isOpen={modalAllOpen}
              onClose={() => setModalAllOpen(false)}
              barData={barData}
              barCategoryData={barCategoryData}
              maxCount={maxCount}
              loading={isLoading.contractDiagrams}
              headerTitle={`Բաժանորդների քանակը ըստ մարզերի՝ ${activeSubscribersCount}`}
              titleFirst="Բաժանորդների քանակը ըստ մարզերի"
              titleNext="Բաժանորդների քանակ ըստ պլանի"
            />
          </ActionsWrapper>
        </ActionDesktopWrapper>
      )}
    </>
  );
};

export default FilterActions;
