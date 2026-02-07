import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import close from 'assets/filters/close.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import ResetButton from 'common-ui/resetButton';
import { AsyncSelect } from 'common-ui/select';
import {
  FINANCE_REQUEST_ACCOUNTING_TYPE_OPTIONS,
  FINANCE_REQUEST_CURRENCY_OPTIONS,
  FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS,
  FINANCE_REQUEST_FLOW_TYPE_OPTIONS,
  FINANCE_REQUEST_PAYMENT_METHOD_OPTIONS,
  FINANCE_REQUEST_STATUS_OPTIONS,
} from 'constants/constants';
import dayjs from 'dayjs';
import { selectUserType } from 'features/auth/authSlice';
import { getUsersDropdown } from 'features/users/usersActions';
import useDebounce from 'hooks/useDebounce';

import { useFinanceRequestSearchData } from '../../useSearchData';
import {
  ClearAllRow,
  ClearAllText,
  CloseIconWrapper,
  CustomDatePickerWrapper,
  FilterContainer,
  FilterLabel,
  FilterRow,
  Icon,
  InputWrapper,
  Line,
  RangeContainer,
} from './Filter.styles';

const getSearchAndFilterCount = (fieldData) => {
  const searchKeys = ['searchId', 'search'];
  const filterKeys = [
    'flowType',
    'expenseType',
    'accountingType',
    'paymentMethod',
    'currency',
    'status',
    'startDateFrom',
    'endDateTo',
    'requestedDateFrom',
    'requestedDateTo',
    'amountFrom',
    'amountTo',
    'requester',
    'completedDateFrom',
    'completedDateTo',
    'seenStatus',
  ];
  const searchCount = searchKeys.reduce((count, key) => {
    const value = fieldData[key];
    return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
  }, 0);

  const filterCount = filterKeys.reduce((count, key) => {
    const value = fieldData[key];
    if (
      key === 'startDateFrom' ||
      key === 'endDateTo' ||
      key === 'requestedDateFrom' ||
      key === 'requestedDateTo' ||
      key === 'completedDateFrom' ||
      key === 'completedDateTo'
    ) {
      return count + (value ? 1 : 0);
    }
    return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
  }, 0);

  return { searchCount, filterCount };
};

const Filter = ({ searchData, setSearchData }) => {
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const [users, setUsers] = useState([]);
  const [selectedRequester, setSelectedRequester] = useState(null);
  const { resetSearchData } = useFinanceRequestSearchData();
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [first, setFirst] = useState(false);
  const [fieldData, setFieldData] = useState({
    searchId: '',
    search: '',
    flowType: '',
    expenseType: '',
    accountingType: '',
    paymentMethod: '',
    currency: '',
    status: '',
    startDateFrom: null,
    endDateTo: null,
    requestedDateFrom: null,
    requestedDateTo: null,
    amountFrom: '',
    amountTo: '',
    requester: '',
    completedDateFrom: null,
    completedDateTo: null,
    seenStatus: '',
  });

  const { searchCount, filterCount } = getSearchAndFilterCount(fieldData);

  const isTeamMember = userType === 'Team Member';

  const debouncedSearchId = useDebounce(fieldData.searchId, 500);
  const debouncedSearch = useDebounce(fieldData.search, 500);
  const debouncedAmountFrom = useDebounce(fieldData.amountFrom, 500);
  const debouncedAmountTo = useDebounce(fieldData.amountTo, 500);

  useEffect(() => {
    if (first) setSearchData({ ...fieldData, searchId: debouncedSearchId });
  }, [debouncedSearchId]);

  useEffect(() => {
    if (first) setSearchData({ ...fieldData, search: debouncedSearch });
  }, [debouncedSearch]);

  useEffect(() => {
    if (first) setSearchData({ ...fieldData, amountFrom: debouncedAmountFrom });
  }, [debouncedAmountFrom]);

  useEffect(() => {
    if (first) setSearchData({ ...fieldData, amountTo: debouncedAmountTo });
  }, [debouncedAmountTo]);
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
    setFirst(true);
    setFieldData({ ...fieldData, [field]: value });
    setSearchData({ ...fieldData, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setFirst(true);
    setFieldData({ ...fieldData, [field]: value });
  };

  const handleClearSearch = () => {
    const clearedSearchData = {
      ...fieldData,
      searchId: '',
      search: '',
    };
    setFieldData(clearedSearchData);
    setSearchData(clearedSearchData);
  };

  const handleClearFilters = () => {
    const clearedFilterData = {
      ...fieldData,
      flowType: '',
      expenseType: '',
      accountingType: '',
      paymentMethod: '',
      currency: '',
      status: '',
      startDateFrom: null,
      endDateTo: null,
      requestedDateFrom: null,
      requestedDateTo: null,
      amountFrom: '',
      amountTo: '',
      requester: '',
      completedDateFrom: null,
      completedDateTo: null,
      seenStatus: '',
    };
    setFieldData(clearedFilterData);
    setSearchData(clearedFilterData);
    setSelectedRequester(null);
  };

  const handleResetAll = () => {
    resetSearchData();
    setSelectedRequester(null);
  };

  const loadRequesters = useCallback(
    async (inputValue = '') => {
      try {
        const searchTerm = inputValue.trim();
        const response = await dispatch(
          getUsersDropdown({ search: searchTerm, offset: 0, limit: 10000 })
        );
        const users = response.payload.users || [];
        const options = users.map((user) => ({
          value: user.uuid || user.id,
          label:
            user.name && user.surname
              ? `${user.name} ${user.surname}`
              : user.name || user.surname || user.email,
          userType: user.userType,
          canDelete: user.canDelete ?? true,
          id: user.id ?? null,
        }));

        if (!inputValue && fieldData.requester && !selectedRequester && options.length > 0) {
          const foundUser = options.find((option) => option.value === fieldData.requester);
          if (foundUser) {
            setSelectedRequester(foundUser);
          }
        }

        if (!inputValue) {
          setUsers(options);
        }

        return options;
      } catch (error) {
        console.error('Error loading requesters:', error);
        return [];
      }
    },
    [dispatch, fieldData.requester, selectedRequester]
  );

  useEffect(() => {
    loadRequesters();
  }, []);

  useEffect(() => {
    setFieldData({
      searchId: searchData.searchId || '',
      search: searchData.search || '',
      flowType: searchData.flowType || '',
      expenseType: searchData.expenseType || '',
      accountingType: searchData.accountingType || '',
      paymentMethod: searchData.paymentMethod || '',
      currency: searchData.currency || '',
      status: searchData.status || '',
      startDateFrom: searchData.startDateFrom || null,
      endDateTo: searchData.endDateTo || null,
      requestedDateFrom: searchData.requestedDateFrom || null,
      requestedDateTo: searchData.requestedDateTo || null,
      amountFrom: searchData.amountFrom || '',
      amountTo: searchData.amountTo || '',
      requester: searchData.requester || '',
      completedDateFrom: searchData.completedDateFrom || null,
      completedDateTo: searchData.completedDateTo || null,
      seenStatus: searchData.seenStatus || '',
    });
    setSelectedRequester(null);
  }, [searchData]);

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
                placeholder="Enter Request ID..."
                type="number"
                value={fieldData.searchId}
                onChange={(e) => handleInputChange('searchId', e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Enter title or reason..."
                value={fieldData.search}
                onChange={(e) => handleInputChange('search', e.target.value)}
              />
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
              minHeight="38px"
              defaultOptions={FINANCE_REQUEST_FLOW_TYPE_OPTIONS}
              value={
                fieldData.flowType
                  ? FINANCE_REQUEST_FLOW_TYPE_OPTIONS.find(
                      (opt) => opt.value === fieldData.flowType
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSearchChange('flowType', selectedOption?.value);
              }}
              placeholder="Flow Types"
              isClearable
            />
            <AsyncSelect
              minHeight="38px"
              maxHeight="38px"
              defaultOptions={FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS}
              value={
                fieldData.expenseType
                  ? FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS.find(
                      (opt) => opt.value === fieldData.expenseType
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSearchChange('expenseType', selectedOption?.value);
              }}
              isSearchable={false}
              placeholder="Expense Types"
              isClearable
            />
            <AsyncSelect
              minHeight="38px"
              maxHeight="38px"
              isSearchable={false}
              defaultOptions={FINANCE_REQUEST_ACCOUNTING_TYPE_OPTIONS}
              value={
                fieldData.accountingType
                  ? FINANCE_REQUEST_ACCOUNTING_TYPE_OPTIONS.find(
                      (opt) => opt.value === fieldData.accountingType
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSearchChange('accountingType', selectedOption?.value);
              }}
              placeholder="Accounting type"
              isClearable
            />
            <AsyncSelect
              minHeight="38px"
              maxHeight="38px"
              defaultOptions={FINANCE_REQUEST_PAYMENT_METHOD_OPTIONS}
              isSearchable={false}
              value={
                fieldData.paymentMethod
                  ? FINANCE_REQUEST_PAYMENT_METHOD_OPTIONS.find(
                      (opt) => opt.value === fieldData.paymentMethod
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSearchChange('paymentMethod', selectedOption?.value);
              }}
              placeholder="Payment Method"
              isClearable
            />
            <RangeContainer>
              <FilterLabel>Amount Range</FilterLabel>
              <InputWrapper>
                <Input
                  label=""
                  placeholder="From"
                  type="number"
                  className="quantity-input"
                  value={fieldData.amountFrom}
                  onChange={(e) => handleInputChange('amountFrom', e.target.value)}
                />
                <Input
                  label=""
                  placeholder="To"
                  type="number"
                  className="quantity-input"
                  value={fieldData.amountTo}
                  onChange={(e) => handleInputChange('amountTo', e.target.value)}
                />
              </InputWrapper>
            </RangeContainer>
            <AsyncSelect
              minHeight="38px"
              maxHeight="38px"
              isSearchable={false}
              defaultOptions={FINANCE_REQUEST_CURRENCY_OPTIONS}
              value={
                fieldData.currency
                  ? FINANCE_REQUEST_CURRENCY_OPTIONS.find(
                      (opt) => opt.value === fieldData.currency
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSearchChange('currency', selectedOption?.value);
              }}
              placeholder="Currency"
              isClearable
            />

            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.requestedDateFrom}
                onChange={(date) => handleSearchChange('requestedDateFrom', date)}
                placeholder="Requested from"
                disableFuture
                maxDate={fieldData.requestedDateTo ? dayjs(fieldData.requestedDateTo) : null}
              />
            </CustomDatePickerWrapper>
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.requestedDateTo}
                onChange={(date) => handleSearchChange('requestedDateTo', date)}
                placeholder="Requested to"
                disableFuture
                minDate={
                  fieldData.requestedDateFrom ? dayjs(fieldData.requestedDateFrom) : null
                }
              />
            </CustomDatePickerWrapper>

            {!isTeamMember && (
              <AsyncSelect
                minHeight="38px"
                maxHeight="38px"
                loadOptions={loadRequesters}
                onMenuOpen={() => loadRequesters()}
                onInputChange={loadRequesters}
                value={
                  fieldData.requester
                    ? selectedRequester ||
                      users?.find((option) => option.value === fieldData.requester)
                    : null
                }
                onChange={(selectedOption) => {
                  setSelectedRequester(selectedOption);
                  handleSearchChange('requester', selectedOption?.value || '');
                }}
                defaultOptions={users}
                placeholder="Requester"
                isClearable
                isSearchable
              />
            )}
            <AsyncSelect
              minHeight="38px"
              maxHeight="38px"
              defaultOptions={FINANCE_REQUEST_STATUS_OPTIONS}
              value={
                fieldData.status
                  ? FINANCE_REQUEST_STATUS_OPTIONS.find(
                      (opt) => opt.value === fieldData.status
                    )
                  : null
              }
              onChange={(selectedOption) => {
                handleSearchChange('status', selectedOption?.value);
              }}
              placeholder="Status"
              isSearchable={false}
              isClearable
            />
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.startDateFrom}
                onChange={(date) => handleSearchChange('startDateFrom', date)}
                placeholder="Start Date"
              />
            </CustomDatePickerWrapper>
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.endDateTo}
                onChange={(date) => handleSearchChange('endDateTo', date)}
                placeholder="End Date"
              />
            </CustomDatePickerWrapper>

            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.completedDateFrom}
                onChange={(date) => handleSearchChange('completedDateFrom', date)}
                placeholder="Completed Date From"
                maxDate={fieldData.completedDateTo ? dayjs(fieldData.completedDateTo) : null}
              />
            </CustomDatePickerWrapper>
            <CustomDatePickerWrapper>
              <CustomDatePicker
                value={fieldData.completedDateTo}
                onChange={(date) => handleSearchChange('completedDateTo', date)}
                placeholder="Completed Date To"
                minDate={
                  fieldData.completedDateFrom ? dayjs(fieldData.completedDateFrom) : null
                }
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
