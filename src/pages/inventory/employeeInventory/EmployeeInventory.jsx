import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CloseSvg from 'assets/filters/close.svg';
import Profile from 'assets/filters/profile.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import { CloseIcon } from 'common-ui/modal/Modal.styles';
import ResetButton from 'common-ui/resetButton';
import { Table } from 'common-ui/table';
import { OCCUPATION_OPTIONS, USER_STATUS_OPTIONS } from 'constants/constants';
import { searchEmployees } from 'features/inventory/inventoryActions';
import {
  selectEmployees,
  selectLoading,
  setResetEmployee,
} from 'features/inventory/inventorySlice';
import { getFilterRoles } from 'features/users/usersActions';
import { selectFilterRoles } from 'features/users/usersSlice';
import useDebounce from 'hooks/useDebounce';
import FilterSelect from 'pages/components/filterSelect';
import StatusDropdown from 'pages/components/statusDropdown';
import Tag from 'pages/components/tag';

import { Row } from '../Inventory.styles';
import {
  ActionsWrapper,
  ClearAllText,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  FilterActions,
  FilterContainer,
  Filters,
  FormRow,
  RightSideContainer,
  ViewContainer,
} from './EmployeeInventory.styles';
import { useEmployeeParams } from './useSearchData';

const allColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Surname', dataIndex: 'surname', key: 'surname' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  {
    title: 'Role',
    dataIndex: 'userType',
    key: 'userType',
    render: (userType) => <Tag type="roles" variant={userType} />,
  },
];

const mobileColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Surname', dataIndex: 'surname', key: 'surname' },
];

const EmployeeInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectLoading);
  const roles = useSelector(selectFilterRoles);
  const [showFilters, setShowFilters] = useState(false);
  const { searchData, setUserSearchData, resetSearchData } = useEmployeeParams();

  const [name, setName] = useState(searchData.name || '');
  const [email, setEmail] = useState(searchData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(searchData.phoneNumber || '');
  const [surname, setSurname] = useState(searchData.surname || '');
  const [activeStatus, setActiveStatus] = useState(searchData.status || 'Status');
  const [first, setFirst] = useState(false);
  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'surname', 'email', 'phoneNumber'];

    const searchCount = searchKeys.reduce((count, key) => {
      const value = filters[key];
      return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
    }, 0);

    return { searchCount };
  };

  const hasAnyFilter = (filters) => {
    const searchFields = ['name', 'surname', 'email', 'phoneNumber'];
    const hasSearchFilter = searchFields.some(
      (key) => filters[key] && filters[key].trim() !== ''
    );

    const hasStatusFilter =
      filters.status && filters.status !== '' && filters.status !== 'Status';
    const hasRoleFilter = filters.roleIds && filters.roleIds.length > 0;
    const hasOccupationFilter = filters.occupations && filters.occupations.length > 0;
    const hasDisabledFilter = filters.disabled !== '';
    const hasVerifiedFilter = filters.isVerified !== '';

    return (
      hasSearchFilter ||
      hasStatusFilter ||
      hasRoleFilter ||
      hasOccupationFilter ||
      hasDisabledFilter ||
      hasVerifiedFilter
    );
  };
  const debouncedName = useDebounce(name, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedPhoneNumber = useDebounce(phoneNumber, 500);
  const debouncedSurname = useDebounce(surname, 500);

  const pagesCount = Math.ceil(employees.pagination?.totalCount / searchData.limit);

  const roleValue = searchData.roleIds.map((value) => {
    const matched = roles.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });

  const occupationValue = searchData.occupations.map((value) => {
    const matched = roles.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const { searchCount } = getSearchAndFilterCount(searchData);

  const handleStatusClick = (status) => {
    setFirst(true);

    if (status === 'active')
      setUserSearchData({ disabled: '', isVerified: true, status: status });
    else if (status === 'pending')
      setUserSearchData({ disabled: '', isVerified: false, status: status });
    else if (status === 'disable')
      setUserSearchData({ isVerified: '', disabled: true, status: status });
    else setUserSearchData({ disabled: '', isVerified: '', status: status });
    setActiveStatus(status);
  };

  const handleRoleClick = (role) => {
    setFirst(true);

    setUserSearchData({ roleIds: role });
  };

  const handleOccupationClick = (occupations) => {
    setFirst(true);

    setUserSearchData({ occupations });
  };

  const onPaginationChange = (page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    setUserSearchData({ offset });
  };

  const handleClearAll = () => {
    setFirst(true);
    setName('');
    setEmail('');
    setPhoneNumber('');
    setSurname('');
    setUserSearchData({ name: '', email: '', phoneNumber: '', surname: '' });
  };

  const handleResetAllFilters = () => {
    setFirst(true);
    resetSearchData();
    setName('');
    setEmail('');
    setPhoneNumber('');
    setSurname('');
    setActiveStatus('Status');
  };
  const handleClickClearSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleResetAllFilters();
    setFirst(true);
  };
  const handleRowClick = (record) => {
    navigate(`/inventory/employee-inventory/${record.uuid || record.id}`);
  };
  const handleClickShowHideFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleChange = (type, value) => {
    setFirst(true);
    if (type === 'name') setName(value);
    else if (type === 'surname') setSurname(value);
    else if (type === 'email') setEmail(value);
    else if (type === 'phoneNumber') setPhoneNumber(value);
  };

  useEffect(() => {
    if (first) setUserSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setUserSearchData({ email: debouncedEmail });
  }, [debouncedEmail]);

  useEffect(() => {
    if (first) setUserSearchData({ phoneNumber: debouncedPhoneNumber });
  }, [debouncedPhoneNumber]);

  useEffect(() => {
    if (first) setUserSearchData({ surname: debouncedSurname });
  }, [debouncedSurname]);

  useEffect(() => {
    if (hasAnyFilter(searchData)) {
      dispatch(searchEmployees(searchData));
    } else {
      dispatch(setResetEmployee());
    }
  }, [dispatch, searchData]);

  useEffect(() => {
    dispatch(getFilterRoles());
  }, [dispatch]);

  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>E-mail</ExpandedLabel>
            <ExpandedValue>{row.email}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Phone</ExpandedLabel>
            <ExpandedValue>{row.phoneNumber}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Role</ExpandedLabel>
            <ExpandedValue>
              <Tag type="roles" variant={row.userType} />
            </ExpandedValue>
          </Row>
        </ExpandableWrapper>
      </>
    );
  };

  return (
    <ViewContainer>
      <FilterContainer>
        <FilterActions>
          <ActionsWrapper>
            <Button
              outlined
              onClick={handleClickShowHideFilters}
              className="action-button"
              onClear={handleClickClearSearch}
              active={searchCount > 0}
              clearable={searchCount > 0}
              variant="search"
            >
              Search {searchCount > 0 ? ` (${searchCount})` : ''}
            </Button>
            <StatusDropdown
              type="status"
              options={USER_STATUS_OPTIONS}
              onStatusClick={handleStatusClick}
              activeStatus={activeStatus}
            />
            <FilterSelect
              title="Roles"
              options={roles}
              onSelect={handleRoleClick}
              resetRegions={searchData.roleIds}
              icon={Profile}
              defaultValue={roleValue}
            />
            <FilterSelect
              title="Occupations"
              options={OCCUPATION_OPTIONS}
              onSelect={handleOccupationClick}
              resetRegions={searchData.occupations}
              icon={Profile}
              defaultValue={occupationValue}
            />
            <ResetButton onClick={handleResetAllFilters} />
          </ActionsWrapper>
        </FilterActions>

        <Filters $showFilters={showFilters}>
          <FormRow>
            <Input
              label="Name"
              leftIcon={SearchIcon}
              clearable
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
              onClear={() => {
                handleChange('name', '');
              }}
              className="m-w-123"
            />
            <Input
              label="Surname"
              leftIcon={SearchIcon}
              clearable
              value={surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              onClear={() => handleChange('surname', '')}
              className="m-w-123"
            />
            <Input
              label="Email"
              leftIcon={SearchIcon}
              clearable
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
              onClear={() => handleChange('email', '')}
              className="m-w-187"
            />
            <Input
              label="Phone number"
              leftIcon={SearchIcon}
              clearable
              type="text"
              value={phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              onClear={() => handleChange('phoneNumber', '')}
              className="m-w-123"
            />
          </FormRow>
          <RightSideContainer>
            <CloseIcon src={CloseSvg} alt="close" onClick={handleClickShowHideFilters} />
            <ClearAllText onClick={handleClearAll}>Clear All</ClearAllText>
          </RightSideContainer>
        </Filters>
      </FilterContainer>
      <Table
        columns={allColumns}
        data={employees.data}
        loading={loading.searchEmployees}
        onRowClick={handleRowClick}
        onPaginationChange={onPaginationChange}
        rowStyle={{ cursor: 'pointer' }}
        currentPage={currentPage}
        totalPages={pagesCount}
      />
      <MobileList
        columns={mobileColumns}
        data={employees.data}
        expandable={renderExpandableContent}
        onPaginationChange={onPaginationChange}
        currentPage={currentPage}
        totalPages={pagesCount}
      />
    </ViewContainer>
  );
};

export default EmployeeInventory;
