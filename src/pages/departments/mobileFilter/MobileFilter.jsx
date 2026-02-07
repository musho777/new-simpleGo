import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import filter from 'assets/filter.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import search from 'assets/search.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { Select } from 'common-ui/select';
import { STATUS_OPTIONS } from 'constants/constants';
import { getDepartments } from 'features/departments/departmentsActions';
import { selectHeads } from 'features/departments/departmentsSlice';
import useDebounce from 'hooks/useDebounce';
import StatusDropdown from 'pages/components/statusDropdown';
import { generateOptions } from 'utils';

import { ClearAllText } from '../Departments.styles';
import { useDepartmentSearchParams } from '../useSearchData';
import {
  BottomSheet,
  BtnWrapper,
  Container,
  DescLabel,
  FiltersWrapper,
  Icon,
  LineWrapper,
  RowFilter,
  TitleWrapper,
} from './MobileFilter.styles';
import line from './line.svg';

const MobileFilter = () => {
  const { searchData, setDepartmentSearchData, resetSearchData } = useDepartmentSearchParams();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(searchData.status);
  const userType = localStorage.getItem('userType');
  const heads = useSelector(selectHeads);
  const dispatch = useDispatch();
  const [name, setName] = useState(searchData.name || '');
  const [description, setDescription] = useState(searchData.description || '');
  const [headId, setHeadId] = useState(searchData.headId || null);
  const head = generateOptions(heads);
  const [first, setFirst] = useState(false);

  const debouncedDescription = useDebounce(description, 500);
  const debouncedName = useDebounce(name, 500);

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

  const handleClearAll = () => {
    setName('');
    setDescription('');
    setHeadId(null);
    resetSearchData();
  };

  const handleReset = () => {
    setActiveStatus('Status');
    resetSearchData();
    setName('');
    setDescription('');
    setHeadId(null);
  };

  const handleChangeInput = (type, value) => {
    setFirst(true);
    if (type === 'name') setName(value);
    else if (type === 'description') setDescription(value);
  };

  const handleChangeInputHead = (e) => {
    setHeadId(e?.value || null);
    setDepartmentSearchData({ headId: e?.value });
  };

  const handleStatusClick = (status) => {
    if (status === 'active') setDepartmentSearchData({ disabled: false, status });
    else if (status === 'disabled') setDepartmentSearchData({ disabled: true, status });
    else setDepartmentSearchData({ disabled: '', status });
    setActiveStatus(status);
  };

  useEffect(() => {
    if (first) setDepartmentSearchData({ description: debouncedDescription });
  }, [debouncedDescription]);

  useEffect(() => {
    if (first) setDepartmentSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    dispatch(getDepartments(searchData));
  }, [JSON.stringify(searchData)]);

  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'description', 'headId'];
    const filterKeys = ['status'];

    const searchCount = searchKeys.reduce((count, key) => {
      const value = filters[key];
      return count + (value !== null && value !== undefined && value !== '' ? 1 : 0);
    }, 0);

    const filterCount = filterKeys.reduce((count, key) => {
      const value = filters[key];
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
    handleReset();
  };

  const { searchCount, filterCount } = getSearchAndFilterCount(searchData);

  return (
    <Container>
      <RowFilter>
        <BtnWrapper>
          <Button
            outlined
            onClick={toggleSearch}
            active={searchCount > 0}
            clearable={searchCount > 0}
            onClear={handleClickClearSearch}
            variant="search"
          >
            Search ({searchCount})
          </Button>
          <Button
            outlined
            onClick={toggleFilter}
            active={filterCount > 0}
            clearable={filterCount > 0}
            onClear={handleClickClearFilter}
            variant="filter"
          >
            Filter {filterCount > 0 ? `(${filterCount})` : '(0)'}
          </Button>
        </BtnWrapper>
      </RowFilter>

      {isSearchOpen && (
        <BottomSheet>
          <LineWrapper onClick={handleCloseSheet}>
            <Icon src={line} />
          </LineWrapper>
          <TitleWrapper>
            <DescLabel>Search By</DescLabel>
            <ClearAllText onClick={handleClearAll}>Clear All</ClearAllText>
          </TitleWrapper>
          {userType !== 'Department Head' && (
            <Select
              label="Department Head"
              onChange={handleChangeInputHead}
              options={head}
              value={head.find((item) => item.value === headId)}
              className="select-st m-w-138"
              isClearable
            />
          )}
          <Input
            leftIcon={SearchIcon}
            clearable
            onClear={() => setName('')}
            className="m-w-138"
            label="Name"
            value={name}
            onChange={(e) => handleChangeInput('name', e.target.value)}
          />
          <Input
            leftIcon={SearchIcon}
            clearable
            onChange={(e) => handleChangeInput('description', e.target.value)}
            label="Description"
            className="m-w-138"
            value={description}
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
            <StatusDropdown
              type="status"
              options={STATUS_OPTIONS}
              onStatusClick={handleStatusClick}
              activeStatus={activeStatus}
            />
          </FiltersWrapper>
        </BottomSheet>
      )}
    </Container>
  );
};

export default MobileFilter;
