import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import { AsyncSelect } from 'common-ui/select';
import {
  FINANCE_REQUEST_CURRENCY_OPTIONS,
  FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS,
  FINANCE_REQUEST_PAYMENT_METHOD_OPTIONS,
  FINANCE_REQUEST_STATUS_OPTIONS,
} from 'constants/constants';
import dayjs from 'dayjs';
import { selectUserType } from 'features/auth/authSlice';
import { getUsersDropdown } from 'features/users/usersActions';
import useDebounce from 'hooks/useDebounce';
import { generateOptions } from 'utils';

import {
  ClearAllRow,
  ClearAllText,
  CustomDatePickerWrapper,
  FilterContainer,
  FilterRow,
  InputWrapper,
  Line,
} from './Filter.styles';

const Filter = ({ searchData, setSearchData }) => {
  const dispatch = useDispatch();
  const userType = useSelector(selectUserType);
  const [users, setUsers] = useState([]);

  const isTeamMember = userType === 'Team Member';

  const [selectedRequester, setSelectedRequester] = useState(null);
  const [first, setFirst] = useState(false);
  const [fieldData, setFieldData] = useState({
    startDate: searchData?.startDate || null,
    endDate: searchData?.endDate || null,
    requestedDateFrom: searchData?.requestedDateFrom || null,
    requestedDateTo: searchData?.requestedDateTo || null,
    currency: searchData?.currency || '',
    minAmount: searchData?.minAmount || '',
    maxAmount: searchData?.maxAmount || '',
    expenseType: searchData?.expenseType || '',
    paymentMethod: searchData?.paymentMethod || '',
    requesterUuid: searchData?.requesterUuid || '',
    status: searchData?.status || '',
    missingStatus: searchData?.missingStatus || '',
    completedDateFrom: searchData?.completedDateFrom || null,
    completedDateTo: searchData?.completedDateTo || null,
  });

  const debouncedMinAmount = useDebounce(fieldData.minAmount, 500);
  const debouncedMaxAmount = useDebounce(fieldData.maxAmount, 500);

  useEffect(() => {
    if (first) setSearchData({ ...fieldData, minAmount: debouncedMinAmount });
  }, [debouncedMinAmount]);

  useEffect(() => {
    if (first) setSearchData({ ...fieldData, maxAmount: debouncedMaxAmount });
  }, [debouncedMaxAmount]);

  const handleSearchChange = (field, value) => {
    setFirst(true);
    setFieldData({ ...fieldData, [field]: value });
    setSearchData({ ...fieldData, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setFirst(true);
    setFieldData({ ...fieldData, [field]: value });
  };

  const handleClearFilters = () => {
    const clearedFilterData = {
      startDate: null,
      endDate: null,
      requestedDateFrom: null,
      requestedDateTo: null,
      currency: '',
      minAmount: '',
      maxAmount: '',
      expenseType: '',
      paymentMethod: '',
      requesterUuid: '',
      status: '',
      missingStatus: '',
      completedDateFrom: null,
      completedDateTo: null,
    };
    setFieldData(clearedFilterData);
    setSearchData(clearedFilterData);
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

  return (
    <FilterContainer>
      <Line>
        <FilterRow>
          <CustomDatePickerWrapper>
            <CustomDatePicker
              value={fieldData.startDate}
              onChange={(date) => handleSearchChange('startDate', date)}
              placeholder="Start date"
            />
          </CustomDatePickerWrapper>
          <CustomDatePickerWrapper>
            <CustomDatePicker
              value={fieldData.endDate}
              onChange={(date) => handleSearchChange('endDate', date)}
              placeholder="End date"
            />
          </CustomDatePickerWrapper>
          <CustomDatePickerWrapper>
            <CustomDatePicker
              value={fieldData.requestedDateFrom}
              onChange={(date) => handleSearchChange('requestedDateFrom', date)}
              placeholder="Requested From"
              disableFuture
              maxDate={fieldData.requestedDateTo ? dayjs(fieldData.requestedDateTo) : null}
            />
          </CustomDatePickerWrapper>
          <CustomDatePickerWrapper>
            <CustomDatePicker
              value={fieldData.requestedDateTo}
              onChange={(date) => handleSearchChange('requestedDateTo', date)}
              placeholder="Requested To"
              disableFuture
              minDate={fieldData.requestedDateFrom ? dayjs(fieldData.requestedDateFrom) : null}
            />
          </CustomDatePickerWrapper>
          <AsyncSelect
            minHeight="38px"
            maxHeight="38px"
            defaultOptions={FINANCE_REQUEST_EXPENSE_TYPE_OPTIONS}
            isSearchable={false}
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
            placeholder="Expense Type"
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
          {!isTeamMember && (
            <AsyncSelect
              minHeight="38px"
              maxHeight="38px"
              loadOptions={loadRequesters}
              onMenuOpen={loadRequesters}
              onInputChange={loadRequesters}
              value={
                fieldData.requesterUuid
                  ? selectedRequester ||
                    users?.find((option) => option.value === fieldData.requesterUuid)
                  : null
              }
              onChange={(selectedOption) => {
                setSelectedRequester(selectedOption);
                handleSearchChange('requesterUuid', selectedOption?.value || '');
              }}
              defaultOptions={generateOptions(users)}
              placeholder="Requester"
              isClearable
            />
          )}
          <AsyncSelect
            minHeight="38px"
            maxHeight="38px"
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
            isSearchable={false}
            isClearable
          />
          <AsyncSelect
            minHeight="38px"
            maxHeight="38px"
            defaultOptions={FINANCE_REQUEST_STATUS_OPTIONS}
            value={
              fieldData.status
                ? FINANCE_REQUEST_STATUS_OPTIONS.find((opt) => opt.value === fieldData.status)
                : null
            }
            onChange={(selectedOption) => {
              handleSearchChange('status', selectedOption?.value);
            }}
            placeholder="Status"
            isSearchable={false}
            isClearable
          />
          <AsyncSelect
            minHeight="38px"
            maxHeight="38px"
            defaultOptions={FINANCE_REQUEST_STATUS_OPTIONS}
            value={
              fieldData.missingStatus
                ? FINANCE_REQUEST_STATUS_OPTIONS.find(
                    (opt) => opt.value === fieldData.missingStatus
                  )
                : null
            }
            onChange={(selectedOption) => {
              handleSearchChange('missingStatus', selectedOption?.value);
            }}
            placeholder="Missing Status"
            isSearchable={false}
            isClearable
          />
          <InputWrapper>
            <Input
              label=""
              placeholder="Min Amount"
              type="number"
              className="quantity-input"
              value={fieldData.minAmount}
              onChange={(e) => handleInputChange('minAmount', e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label=""
              placeholder="Max Amount"
              type="number"
              className="quantity-input"
              value={fieldData.maxAmount}
              onChange={(e) => handleInputChange('maxAmount', e.target.value)}
            />
          </InputWrapper>
          <CustomDatePicker
            value={fieldData.completedDateFrom}
            onChange={(date) => handleSearchChange('completedDateFrom', date)}
            placeholder="Completed Date From"
            maxDate={fieldData.completedDateTo ? dayjs(fieldData.completedDateTo) : null}
          />
          <CustomDatePicker
            value={fieldData.completedDateTo}
            onChange={(date) => handleSearchChange('completedDateTo', date)}
            placeholder="Completed Date To"
            minDate={fieldData.completedDateFrom ? dayjs(fieldData.completedDateFrom) : null}
          />
        </FilterRow>
        <ClearAllRow>
          <ClearAllText onClick={handleClearFilters}>Clear all</ClearAllText>
        </ClearAllRow>
      </Line>
    </FilterContainer>
  );
};

export default Filter;
