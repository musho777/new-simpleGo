import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import filter from 'assets/filter.svg';
import Profile from 'assets/filters/profile.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import search from 'assets/search.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { OCCUPATION_OPTIONS, USER_STATUS_OPTIONS } from 'constants/constants';
import { getUsers } from 'features/users/usersActions';
import { selectCurrentPage, selectFilterRoles } from 'features/users/usersSlice';
import useDebounce from 'hooks/useDebounce';
import FilterSelect from 'pages/components/filterSelect';
import StatusDropdown from 'pages/components/statusDropdown';

import Create from '../Create';
import { ClearAllText } from '../UserManagement.styles';
import { useUserSearchParams } from '../useSearchData';
import {
  BottomSheet,
  BtnWrapper,
  Container,
  DescLabel,
  FiltersWrapper,
  Icon,
  InpWrapper,
  LineWrapper,
  Row,
  RowFilter,
  TitleWrapper,
} from './MobileFilter.styles';
import line from './line.svg';

const MobileFilter = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState('Status');
  const [activeRole, setActiveRole] = useState([]);
  const [activeOccupation, setActiveOccupation] = useState([]);
  const userType = localStorage.getItem('userType');
  const { searchData, setUserSearchData, resetSearchData } = useUserSearchParams();
  const [first, setFirst] = useState(false);

  const [name, setName] = useState(searchData.name || '');
  const [surname, setSurname] = useState(searchData.surname || '');
  const [email, setEmail] = useState(searchData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(searchData.phoneNumber || '');

  const roles = useSelector(selectFilterRoles);
  const dispatch = useDispatch();

  const debouncedName = useDebounce(name, 500);
  const debouncedSurname = useDebounce(surname, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedPhoneNumber = useDebounce(phoneNumber, 500);

  const roleValue = searchData.roleIds.map((value) => {
    const matched = roles.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });
  const occupationValue = searchData.occupations.map((value) => {
    const matched = roles.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsFilterOpen(false);
  };
  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
    setIsSearchOpen(false);
  };

  const handleCloseSheet = () => {
    setIsFilterOpen(false);
    setIsSearchOpen(false);
  };

  const handleReset = () => {
    resetSearchData();
    setActiveStatus('Status');
    setActiveRole([]);
    setActiveOccupation([]);
  };

  const handleStatusClick = (status) => {
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
    setUserSearchData({ roleIds: role });
  };

  const handleChange = (type, value) => {
    setFirst(true);
    if (type === 'name') setName(value);
    else if (type === 'surname') setSurname(value);
    else if (type === 'email') setEmail(value);
    else if (type === 'phoneNumber') setPhoneNumber(value);
  };

  const handleOccupationClick = (occupations) => {
    setUserSearchData({ occupations });
  };

  useEffect(() => {
    if (first) setUserSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setUserSearchData({ surname: debouncedSurname });
  }, [debouncedSurname]);

  useEffect(() => {
    if (first) setUserSearchData({ email: debouncedEmail });
  }, [debouncedEmail]);

  useEffect(() => {
    if (first) setUserSearchData({ phoneNumber: debouncedPhoneNumber });
  }, [debouncedPhoneNumber]);

  useEffect(() => {
    dispatch(getUsers(searchData));
  }, [JSON.stringify(searchData)]);

  const handleClearAll = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPhoneNumber('');

    resetSearchData();
  };

  const handleClearAllFilters = () => {
    resetSearchData();

    setActiveStatus('Status');
    setActiveRole([]);
    setActiveOccupation([]);
  };

  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'surname', 'email', 'phoneNumber'];
    const filterKeys = ['status', 'roleIds', 'occupations'];

    const searchCount = searchKeys.reduce((count, key) => {
      const value = filters[key];
      return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
    }, 0);

    const filterCount = filterKeys.reduce((count, key) => {
      const value = filters[key];
      if (Array.isArray(value)) return count + (value.length > 0 ? 1 : 0);
      return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
    }, 0);

    return { searchCount, filterCount };
  };

  const handleClickClearSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleClearAll();
  };

  const handleClickClearFilter = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleClearAllFilters();
  };

  const { searchCount, filterCount } = getSearchAndFilterCount(searchData);
  return (
    <Container>
      <Row>
        {(userType === 'Hr Manager' || userType === 'Super Admin') && <Create />}

        <BtnWrapper>
          <Button
            outlined
            onClick={toggleSearch}
            onClear={handleClickClearSearch}
            active={searchCount > 0}
            clearable={searchCount > 0}
            variant="search"
          >
            Search ({searchCount})
          </Button>
          <Button
            outlined
            variant="filter"
            onClick={toggleFilter}
            active={filterCount > 0}
            onClear={handleClickClearFilter}
            clearable={filterCount > 0}
          >
            Filter {filterCount > 0 ? `(${filterCount})` : '(0)'}
          </Button>
        </BtnWrapper>
      </Row>

      {isSearchOpen && (
        <BottomSheet>
          <LineWrapper onClick={handleCloseSheet}>
            <Icon src={line} />
          </LineWrapper>
          <TitleWrapper>
            <DescLabel>Search By</DescLabel>
            <ClearAllText onClick={handleClearAll}>Clear All</ClearAllText>
          </TitleWrapper>
          <InpWrapper>
            <Input
              label="Name"
              leftIcon={SearchIcon}
              clearable
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
              onClear={() => setName('')}
              className="m-w-123"
            />
            <Input
              label="Surname"
              leftIcon={SearchIcon}
              clearable
              value={surname}
              onClear={() => setSurname('')}
              onChange={(e) => handleChange('surname', e.target.value)}
              className="m-w-123"
            />
          </InpWrapper>
          <Input
            label="Email"
            leftIcon={SearchIcon}
            clearable
            value={email}
            onClear={() => setEmail('')}
            onChange={(e) => handleChange('email', e.target.value)}
            className="m-w-187"
          />
          <Input
            label="Phone number"
            leftIcon={SearchIcon}
            clearable
            value={phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            onClear={() => setPhoneNumber('')}
            className="m-w-123"
          />
        </BottomSheet>
      )}

      {isFilterOpen && (
        <BottomSheet>
          <LineWrapper onClick={handleCloseSheet}>
            <Icon src={line} />
          </LineWrapper>
          <TitleWrapper>
            <DescLabel>Filters</DescLabel>
            <ClearAllText onClick={handleReset}>Reset</ClearAllText>
          </TitleWrapper>
          <FiltersWrapper>
            <RowFilter>
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
                resetRegions={activeRole}
                icon={Profile}
                defaultValue={roleValue}
              />
            </RowFilter>
            <FilterSelect
              title="Occupations"
              options={OCCUPATION_OPTIONS}
              onSelect={handleOccupationClick}
              resetRegions={activeOccupation}
              icon={Profile}
              defaultValue={occupationValue}
            />
          </FiltersWrapper>
        </BottomSheet>
      )}
    </Container>
  );
};

export default MobileFilter;
