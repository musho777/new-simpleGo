import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import BasicButton from 'common-ui/filterButton';
import ResetButton from 'common-ui/resetButton';
import DatePicker from 'modules/billing/components/datePicker';
import { selectShowFilters, setShowFilters } from 'modules/billing/features/main/mainSlice';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';

import {
  ActionsCalendar,
  ActionsMobileGrid,
  ActionsMobileWrapper,
  ActionsTabletWrapper,
  ActionsWrapper,
  CalendarWrapper,
  FilterActionsWrapper,
} from '../Request.styles';
import { useRequestSearchParams } from '../useSearchData';

const getFilterCount = (filters) => {
  const filterKeys = ['city', 'region', 'statusIds', 'typeIds'];

  const filterCount = filterKeys.reduce((count, key) => {
    const value = filters[key];
    return count + (Array.isArray(value) && value.length > 0 ? 1 : 0);
  }, 0);

  return { filterCount };
};

const FilterActions = ({ toggleFilter, handleResetAllFilters }) => {
  const { searchData, setRequestSearchData } = useRequestSearchParams();
  const { filterCount } = getFilterCount(searchData);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const showFilters = useSelector(selectShowFilters);
  const dispatch = useDispatch();
  const isTablet = useTabletView();
  const isMobile = useMobileView();

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };

  const onDateChange = ({ from, to }) => {
    setDateFrom((prev) => from || prev);
    setDateTo((prev) => to || prev);
  };

  useEffect(() => {
    if (dateFrom && dateTo) {
      setRequestSearchData({
        ...searchData,
        from: dateFrom,
        to: dateTo,
      });
    }
  }, [dateFrom, dateTo, dispatch]);

  return (
    <FilterActionsWrapper>
      {isTablet ? (
        <ActionsTabletWrapper>
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
          <ResetButton onClick={handleResetAllFilters} title="" />
        </ActionsTabletWrapper>
      ) : isMobile ? (
        <ActionsMobileGrid>
          <ActionsMobileWrapper>
            <ActionsCalendar>
              <DatePicker
                defaultFrom={searchData.from}
                defaultTo={searchData.to}
                onDateChange={onDateChange}
              />
            </ActionsCalendar>
          </ActionsMobileWrapper>
          <ActionsMobileWrapper>
            <div className="filter">
              <BasicButton
                title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
                onClick={toggleFilter}
                isActive={filterCount > 0}
              />
            </div>
          </ActionsMobileWrapper>
          <ResetButton onClick={handleResetAllFilters} title="" />
        </ActionsMobileGrid>
      ) : (
        <ActionsWrapper>
          <ResetButton onClick={handleResetAllFilters} title="" />
          <CalendarWrapper>
            <DatePicker
              defaultFrom={searchData.from}
              defaultTo={searchData.to}
              onDateChange={onDateChange}
            />
          </CalendarWrapper>
          <BasicButton
            title={`Ֆիլտրում ${filterCount > 0 ? ` (${filterCount})` : ''}`}
            onClick={handleClickShowHideFilters}
            isActive={filterCount > 0}
          />
        </ActionsWrapper>
      )}
    </FilterActionsWrapper>
  );
};

export default FilterActions;
