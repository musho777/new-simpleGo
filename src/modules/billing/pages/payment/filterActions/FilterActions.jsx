import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import BasicButton from 'common-ui/filterButton';
import ResetButton from 'common-ui/resetButton';
import useDebounce from 'hooks/useDebounce';
import ChartModal from 'modules/billing/components/chartModal';
import DatePicker from 'modules/billing/components/datePicker';
import MyUiInput from 'modules/billing/components/input';
import { getContractPaymentDiagrams } from 'modules/billing/features/main/mainActions';
import {
  selectContractPaymentDiagrams,
  selectContractPaymentDiagramsSearchData,
  selectLoading,
  selectShowFilters,
  setContractPaymentDiagramsSearchData,
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
  ActionsTabletGrid,
  ActionsTabletWrapper,
  ActionsWrapper,
} from '../Payment.styles';
import { usePaymentSearchParams } from '../useSearchData';

const getFilterCount = (filters) => {
  const filterKeys = ['city', 'region', 'currentStatus', 'oldStatus', 'paymentTypeId'];

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
  const { searchData, setPaymentSearchData } = usePaymentSearchParams();
  const { filterCount } = getFilterCount(searchData);

  const securityValue = localStorage.getItem('securityCode');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAllOpen, setModalAllOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const debouncedSearchIdInputValue = useDebounce(searchIdInputValue, 500);
  const isLoading = useSelector(selectLoading);
  const showFilters = useSelector(selectShowFilters);
  const contractPaymentDiagrams = useSelector(selectContractPaymentDiagrams);
  const searchPaymentDiagramsData = useSelector(selectContractPaymentDiagramsSearchData);
  const dispatch = useDispatch();
  const isTablet = useTabletView();
  const isMobile = useMobileView();

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

  const { paymentsAmount, byRegion, byTariff } = contractPaymentDiagrams;

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

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num).replace(/,/g, '․');
  };

  const onDateChange = ({ from, to }) => {
    setDateFrom((prev) => from || prev);
    setDateTo((prev) => to || prev);
  };

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };

  const handleSearchIdInputChange = (e) => {
    setSearchIdInputValue(e.target.value);
  };

  const handleOpenModal = () => {
    if (dateFrom && dateTo) {
      dispatch(
        setContractPaymentDiagramsSearchData({
          ...searchPaymentDiagramsData,
          from: dateFrom,
          to: dateTo,
        })
      );
    } else {
      dispatch(
        setContractPaymentDiagramsSearchData({
          ...searchPaymentDiagramsData,
          from: getPreviousDate(),
          to: getPreviousDate(),
        })
      );
    }
    setModalOpen(true);
  };

  const memoizedSearchDiagramsData = useMemo(
    () => searchPaymentDiagramsData,
    [searchPaymentDiagramsData]
  );

  useEffect(() => {
    setPaymentSearchData({ ...searchData, contractId: debouncedSearchIdInputValue });
  }, [debouncedSearchIdInputValue]);

  useEffect(() => {
    securityValue &&
      dispatch(
        getContractPaymentDiagrams({ ...searchPaymentDiagramsData, secret: securityValue })
      );
  }, [memoizedSearchDiagramsData, securityValue, dispatch]);

  useEffect(() => {
    if (dateFrom && dateTo) {
      setPaymentSearchData({
        ...searchData,
        from: dateFrom,
        to: dateTo,
      });
    }
  }, [dateFrom, dateTo, dispatch]);

  return (
    <>
      {isTablet ? (
        <ActionsTabletGrid>
          <ActionsTabletGraphWrapper>
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
              YAxisWith={45}
              headerTitle={`Բաժանորդների վճարած ընդհանուր գումարը՝  ${formatNumber(paymentsAmount)} դրամ`}
              titleFirst="Բաժանորդներից գանձված գումարը ըստ մարզերի"
              titleNext="Բաժանորդներից գանձված գումարը ըստ պլանի  (դրամ)"
              isSum
            />
          </ActionsTabletGraphWrapper>
          <ActionsTabletWrapper>
            <ResetButton onClick={handleResetAllFilters} title="" />
            <DatePicker
              defaultFrom={searchData.from}
              defaultTo={searchData.to}
              onDateChange={onDateChange}
            />
            <MyUiInput
              className="input"
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
          </ActionsTabletWrapper>
        </ActionsTabletGrid>
      ) : isMobile ? (
        <ActionsMobileGrid>
          <ActionsMobileWrapper>
            <MyUiInput
              className="input"
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
            <ResetButton onClick={handleResetAllFilters} title="" />
          </ActionsMobileWrapper>
        </ActionsMobileGrid>
      ) : (
        <ActionDesktopWrapper>
          <ActionsWrapper>
            <ResetButton onClick={handleResetAllFilters} title="" />
            <MyUiInput
              className="input"
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
              defaultFrom={searchData.from}
              defaultTo={searchData.to}
              onDateChange={onDateChange}
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
              YAxisWith={45}
              headerTitle={`Բաժանորդների վճարած ընդհանուր գումարը՝  ${formatNumber(paymentsAmount)} դրամ`}
              titleFirst="Բաժանորդներից գանձված գումարը ըստ մարզերի"
              titleNext="Բաժանորդներից գանձված գումարը ըստ պլանի  (դրամ)"
              isSum
            />
          </ActionsWrapper>
        </ActionDesktopWrapper>
      )}
    </>
  );
};

export default FilterActions;
