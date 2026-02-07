import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CustomDatePicker from 'common-ui/customDatePicker';
import {
  selectSelectedDateFrom,
  setContractOneDaySearchData,
  setSelectedDateFrom,
} from 'modules/billing/features/main/mainSlice';
import { formatDateTime, getPreviousDate } from 'utils/dateUtils';

import { FilterActionsWrapper } from '../Daily.styles';

const FilterActions = ({ searchData }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDateFrom);

  useEffect(() => {
    if (selectedDate) {
      dispatch(
        setContractOneDaySearchData({
          ...searchData,
          date: selectedDate,
        })
      );
    }
  }, [selectedDate, dispatch]);

  return (
    <FilterActionsWrapper>
      <CustomDatePicker
        disableFuture={true}
        className="calendar"
        value={selectedDate || getPreviousDate()}
        onChange={(newDate) => dispatch(setSelectedDateFrom(formatDateTime(newDate, true)))}
      />
    </FilterActionsWrapper>
  );
};

export default FilterActions;
