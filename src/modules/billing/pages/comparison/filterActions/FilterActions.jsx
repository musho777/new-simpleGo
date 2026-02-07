import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import BasicButton from 'common-ui/filterButton';
import dayjs from 'dayjs';
import Calendar from 'modules/billing/components/calendar';
import DatePicker from 'modules/billing/components/datePicker';
import {
  selectComparisonDateFromEnd,
  selectComparisonDateFromStart,
  selectComparisonDateToEnd,
  selectComparisonDateToStart,
  selectShowFilters,
  setComparisonDateFromEnd,
  setComparisonDateFromStart,
  setComparisonDateToEnd,
  setComparisonDateToStart,
  setContractSearchData,
  setShowFilters,
} from 'modules/billing/features/main/mainSlice';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';

import { DatePickerWrapper, FilterActionsWrapper } from '../Comparison.styles';

const getFilterCount = (filters) => {
  const filterKeys = ['city', 'region', 'currentTariff'];

  const filterCount = filterKeys.reduce((count, key) => {
    const value = filters[key];
    return count + (Array.isArray(value) && value.length > 0 ? 1 : 0);
  }, 0);

  return { filterCount };
};

const FilterActions = ({ searchData, toggleFilter }) => {
  const { filterCount } = getFilterCount(searchData);
  const secret = localStorage.getItem('securityCode');
  const [dateFromStart, setDateFromStart] = useState('');
  const [dateToStart, setDateToStart] = useState('');
  const [dateFromEnd, setDateFromEnd] = useState('');
  const [dateToEnd, setDateToEnd] = useState('');
  const isTablet = useTabletView();
  const isMobile = useMobileView();
  const showFilters = useSelector(selectShowFilters);
  const fromStart = useSelector(selectComparisonDateFromStart);
  const fromEnd = useSelector(selectComparisonDateFromEnd);
  const toStart = useSelector(selectComparisonDateToStart);
  const toEnd = useSelector(selectComparisonDateToEnd);
  const dispatch = useDispatch();

  const onDateChangeFrom = ({ from, to }) => {
    setDateFromStart((prev) => from || prev);
    setDateToStart((prev) => to || prev);
  };

  const onDateChangeTo = ({ from, to }) => {
    setDateFromEnd((prev) => from || prev);
    setDateToEnd((prev) => to || prev);
  };

  const handleDateChangeFrom = (date) => {
    if (date) {
      dispatch(setComparisonDateFromStart(dayjs(date).startOf('month').format('YYYY-MM-DD')));
      dispatch(setComparisonDateFromEnd(dayjs(date).endOf('month').format('YYYY-MM-DD')));
    }
  };

  const handleDateChangeTo = (date) => {
    if (date) {
      dispatch(setComparisonDateToStart(dayjs(date).startOf('month').format('YYYY-MM-DD')));
      dispatch(setComparisonDateToEnd(dayjs(date).endOf('month').format('YYYY-MM-DD')));
    }
  };

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };

  const onGetContract = () => {
    if (fromStart && fromEnd && toStart && toEnd) {
      dispatch(
        setContractSearchData({
          ...searchData,
          secret,
          fromStart,
          fromEnd,
          toStart,
          toEnd,
        })
      );
    } else {
      console.warn('All date fields are required.');
    }
  };

  useEffect(() => {
    dispatch(setComparisonDateFromStart(dateFromStart));
    dispatch(setComparisonDateFromEnd(dateToStart));
  }, [dateFromStart, dateToStart]);

  useEffect(() => {
    dispatch(setComparisonDateToStart(dateFromEnd));
    dispatch(setComparisonDateToEnd(dateToEnd));
  }, [dateFromEnd, dateToEnd]);

  return (
    <FilterActionsWrapper $isTablet={isMobile}>
      <DatePickerWrapper>
        {isTablet || isMobile ? (
          <>
            <Calendar placeholder="Առաջին միջակայք" onDateChange={handleDateChangeFrom} />
            <Calendar placeholder="Երկրորդ միջակայք" onDateChange={handleDateChangeTo} />
          </>
        ) : (
          <>
            <DatePicker label="Առաջին միջակայք" onDateChange={onDateChangeFrom} />
            <DatePicker label="Երկրորդ միջակայք" onDateChange={onDateChangeTo} />
          </>
        )}
        {!isMobile && (
          <Button width="118" secondary className="button" onClick={onGetContract}>
            Համեմատել
          </Button>
        )}
      </DatePickerWrapper>
      {isMobile ? (
        <>
          <Button width="100%" secondary className="button" onClick={onGetContract}>
            Համեմատել
          </Button>
          <BasicButton
            title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
            onClick={toggleFilter}
            isActive={filterCount > 0}
          />
        </>
      ) : (
        <BasicButton
          title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
          onClick={handleClickShowHideFilters}
          isActive={filterCount > 0}
        />
      )}
    </FilterActionsWrapper>
  );
};

export default FilterActions;
