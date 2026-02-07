import { useCallback, useEffect, useState } from 'react';

import billingClient from 'api/billingApiClient';
import close from 'assets/filters/close.svg';
import searchIcon from 'assets/filters/searchWhite.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import ResetButton from 'common-ui/resetButton';
import { AsyncSelect } from 'common-ui/select';
import { BILLING_STATUS } from 'constants/constants';
import dayjs from 'dayjs';
import { generateOptions } from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import { useCustomerManagementSearchData } from '../../useSearchData';
import {
  ClearAllRow,
  ClearAllText,
  CloseIconWrapper,
  CustomDatePickerWrapper,
  FilterContainer,
  FilterRow,
  Icon,
  InputWrapper,
  Line,
} from './Filter.styles';

const Filter = ({ searchData, setSearchData, searchCount, filterCount }) => {
  const { resetSearchData } = useCustomerManagementSearchData();
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [offerOptions, setOfferOptions] = useState([]);
  const [fieldData, setFieldData] = useState({
    customerId: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    tariffs: [],
    statuses: [],
    dateFrom: null,
    dateTo: null,
  });

  const handleClickShowHideFilters = () => {
    setShow(!show);
    if (!show) {
      setShowSearch(false);
    }
  };

  const handleClickShowHideSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setShow(false);
    }
  };

  const handleSearchChange = (field, value) => {
    setFieldData({ ...fieldData, [field]: value });
    setSearchData({ ...fieldData, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setFieldData({ ...fieldData, [field]: value });
  };

  const handleSearch = () => {
    setSearchData(fieldData);
  };

  const handleDateChange = (type, date) => {
    if (!date) {
      handleSearchChange(type, null);
      return;
    }
    const formattedDate = formatDateTime(date, true);
    handleSearchChange(type, formattedDate);
  };

  const handleClearSearch = () => {
    const clearedSearchData = {
      ...fieldData,
      customerId: '',
      fullName: '',
      address: '',
      phoneNumber: '',
    };
    setFieldData(clearedSearchData);
    setSearchData(clearedSearchData);
  };

  const handleClearFilters = () => {
    const clearedFilterData = {
      ...fieldData,
      tariffs: [],
      statuses: [],
      dateFrom: null,
      dateTo: null,
    };
    setFieldData(clearedFilterData);
    setSearchData(clearedFilterData);
  };

  const handleResetAll = () => {
    resetSearchData();
  };

  const handleLoadOffers = useCallback(async (search = '') => {
    try {
      const encodedSearch = encodeURIComponent(search);
      const response = await billingClient.get(`/tariff/all?name=${encodedSearch}`);
      const options = generateOptions(response.data);
      setOfferOptions(options);
      return options;
    } catch (error) {
      return [];
    }
  }, []);

  useEffect(() => {
    setFieldData({
      customerId: searchData.customerId || '',
      fullName: searchData.fullName || '',
      address: searchData.address || '',
      phoneNumber: searchData.phoneNumber || '',
      tariffs: searchData.tariffs || [],
      statuses: searchData.statuses || [],
      dateFrom: searchData.dateFrom || null,
      dateTo: searchData.dateTo || null,
    });
  }, [searchData]);

  useEffect(() => {
    if (searchData.tariffs) {
      handleLoadOffers();
    }
  }, [handleLoadOffers]);

  return (
    <FilterContainer>
      <FilterRow style={{ alignItems: 'center' }}>
        <Button
          outlined
          onClick={handleClickShowHideSearch}
          className="action-button"
          active={searchCount > 0}
          variant="search"
        >
          Search{searchCount > 0 ? ` (${searchCount})` : ''}
        </Button>
        <Button
          outlined
          onClick={handleClickShowHideFilters}
          className="action-button"
          active={filterCount > 0}
          variant="filter"
        >
          Filter{filterCount > 0 ? ` (${filterCount})` : ''}
        </Button>
        {(searchCount > 0 || filterCount > 0) && <ResetButton onClick={handleResetAll} />}
      </FilterRow>
      {showSearch && (
        <Line>
          <ClearAllRow>
            <CloseIconWrapper onClick={handleClickShowHideSearch}>
              <Icon src={close} />
            </CloseIconWrapper>
          </ClearAllRow>
          <FilterRow>
            <InputWrapper>
              <Input
                placeholder="Search by ID"
                value={fieldData.customerId}
                onChange={(e) => handleInputChange('customerId', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                type="number"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Search by full name"
                value={fieldData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Search by address"
                value={fieldData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Search by phone"
                value={fieldData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                type="number"
              />
            </InputWrapper>
            <InputWrapper>
              <Button onClick={handleSearch}>
                <Icon src={searchIcon} />
              </Button>
            </InputWrapper>
          </FilterRow>
          <ClearAllRow>
            <ClearAllText onClick={handleClearSearch}>Clear all</ClearAllText>
          </ClearAllRow>
        </Line>
      )}
      {show && (
        <Line>
          <ClearAllRow>
            <CloseIconWrapper onClick={handleClickShowHideFilters}>
              <Icon src={close} />
            </CloseIconWrapper>
          </ClearAllRow>
          <FilterRow>
            <AsyncSelect
              showItemsContainer={false}
              value={
                Array.isArray(fieldData.tariffs)
                  ? offerOptions.filter((opt) => fieldData.tariffs.includes(opt.value))
                  : []
              }
              defaultOptions={offerOptions}
              onChange={(selectedOptions) => {
                handleSearchChange(
                  'tariffs',
                  selectedOptions ? selectedOptions.map((opt) => opt.value) : []
                );
              }}
              loadOptions={handleLoadOffers}
              onMenuOpen={handleLoadOffers}
              onInputChange={handleLoadOffers}
              placeholder="Offer"
              isClearable
              isSearchable
              isMulti={true}
              hideSelectedOptions={false}
            />
            <AsyncSelect
              showItemsContainer={false}
              defaultOptions={BILLING_STATUS.filter((opt) => opt.value !== 'All statuses')}
              value={
                Array.isArray(fieldData.statuses)
                  ? BILLING_STATUS.filter((opt) => fieldData.statuses.includes(opt.value))
                  : []
              }
              onChange={(selectedOptions) => {
                handleSearchChange(
                  'statuses',
                  selectedOptions ? selectedOptions.map((opt) => opt.value) : []
                );
              }}
              placeholder="Status"
              isClearable
              isSearchable={false}
              isMulti={true}
              hideSelectedOptions={false}
            />
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.dateFrom}
                onChange={(date) => handleDateChange('dateFrom', date)}
                placeholder="Created from"
                disableFuture
                maxDate={fieldData.dateTo ? dayjs(fieldData.dateTo) : null}
              />
            </CustomDatePickerWrapper>
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.dateTo}
                onChange={(date) => handleDateChange('dateTo', date)}
                placeholder="Created to"
                disableFuture
                minDate={fieldData.dateFrom ? dayjs(fieldData.dateFrom) : null}
              />
            </CustomDatePickerWrapper>
          </FilterRow>
          <ClearAllRow>
            <ClearAllText onClick={handleClearFilters}>Clear all</ClearAllText>
          </ClearAllRow>
        </Line>
      )}
    </FilterContainer>
  );
};

export default Filter;
