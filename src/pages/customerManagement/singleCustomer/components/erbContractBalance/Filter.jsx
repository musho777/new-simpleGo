import { useEffect, useState } from 'react';

import close from 'assets/filters/close.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import ResetButton from 'common-ui/resetButton';
import dayjs from 'dayjs';

import {
  ClearAllRow,
  ClearAllText,
  CloseIconWrapper,
  CustomDatePickerWrapper,
  FilterContainer,
  FilterRow,
  Icon,
  Line,
} from './Filter.styles';

const Filter = ({ filterData, onFilterChange }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [fieldData, setFieldData] = useState({
    dateFrom: null,
    dateTo: null,
    allTime: false,
  });

  const handleClickShowHideSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleDateChange = (field, value) => {
    const updatedData = { ...fieldData, [field]: value, allTime: false };
    setFieldData(updatedData);
    onFilterChange(updatedData);
  };

  const handleCurrentMonth = () => {
    const updatedData = {
      ...fieldData,
      allTime: false,
      dateFrom: null,
      dateTo: null,
    };
    setFieldData(updatedData);
    onFilterChange(updatedData);
  };

  const handleAllItems = () => {
    const updatedData = {
      ...fieldData,
      allTime: true,
      dateFrom: null,
      dateTo: null,
    };
    setFieldData(updatedData);
    onFilterChange(updatedData);
  };

  const handleClearSearch = () => {
    const clearedData = {
      search: '',
      dateFrom: null,
      dateTo: null,
      allTime: false,
    };
    setFieldData(clearedData);
    onFilterChange(clearedData);
  };

  const handleResetAll = () => {
    const clearedData = {
      search: '',
      dateFrom: null,
      dateTo: null,
      allTime: false,
    };
    setFieldData(clearedData);
    onFilterChange(clearedData);
  };

  useEffect(() => {
    if (filterData) {
      setFieldData({
        search: filterData.search || '',
        dateFrom: filterData.dateFrom || null,
        dateTo: filterData.dateTo || null,
        allTime: filterData.allTime ?? false,
      });
    }
  }, [filterData]);

  const Filter = !!fieldData.allTime + !!fieldData.dateFrom + !!fieldData.dateTo;

  return (
    <FilterContainer>
      <FilterRow style={{ alignItems: 'center' }}>
        <Button
          outlined
          onClick={handleClickShowHideSearch}
          className="action-button"
          active={Filter > 0}
          variant="filter"
        >
          Filter{Filter > 0 ? ` (${Filter})` : ''}
        </Button>

        {(fieldData.allTime || fieldData.dateFrom || fieldData.dateTo) && (
          <ResetButton onClick={handleResetAll} />
        )}
      </FilterRow>

      {showSearch && (
        <Line>
          <ClearAllRow>
            <CloseIconWrapper onClick={handleClickShowHideSearch}>
              <Icon src={close} />
            </CloseIconWrapper>
          </ClearAllRow>
          <FilterRow style={{ alignItems: 'center' }}>
            <Button
              outlined
              onClick={handleCurrentMonth}
              className="action-button"
              active={!fieldData.allTime && !fieldData.dateFrom && !fieldData.dateTo}
            >
              Current Month
            </Button>
            <Button
              outlined
              onClick={handleAllItems}
              className="action-button"
              active={fieldData.allTime}
            >
              All Time
            </Button>
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.dateFrom}
                onChange={(date) => handleDateChange('dateFrom', date)}
                placeholder="Date From"
                maxDate={fieldData.dateTo ? dayjs(fieldData.dateTo) : null}
              />
            </CustomDatePickerWrapper>
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.dateTo}
                onChange={(date) => handleDateChange('dateTo', date)}
                placeholder="Date To"
                minDate={fieldData.dateFrom ? dayjs(fieldData.dateFrom) : null}
              />
            </CustomDatePickerWrapper>
          </FilterRow>
          <ClearAllRow>
            <ClearAllText onClick={handleClearSearch}>Clear all</ClearAllText>
          </ClearAllRow>
        </Line>
      )}
    </FilterContainer>
  );
};

export default Filter;
