import { useEffect, useState } from 'react';
import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SearchIcon from 'assets/filters/searchIcon.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { Select } from 'common-ui/select';
import { STATUS_OPTIONS } from 'constants/constants';
import { getBranches } from 'features/branches/branchesActions';
import { selectHeads, selectUpdateSuccess } from 'features/branches/branchesSlice';
import { selectRegions } from 'features/regions/regionsSlice';
import useDebounce from 'hooks/useDebounce';
import FilterSelect from 'pages/components/filterSelect';
import StatusDropdown from 'pages/components/statusDropdown';
import { generateOptions } from 'utils';

import { ClearAllText } from '../Branches.styles';
import { useBranchesSearchParams } from '../useSearchData';
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
  const { searchData, setBranchesSearchData, resetSearchData } = useBranchesSearchParams();
  const [first, setFirst] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [resetRegions, setResetRegions] = useState([]);
  const [activeStatus, setActiveStatus] = useState('All statuses');
  const userType = localStorage.getItem('userType');
  const regions = useSelector(selectRegions);
  const updateBranchesSuccess = useSelector(selectUpdateSuccess);
  const heads = useSelector(selectHeads);
  const { uuid } = useParams();
  const [fildData, setFildData] = useState({
    name: searchData.name,
    description: searchData.description,
    head: searchData.headId,
  });
  const head = generateOptions(heads);

  const dispatch = useDispatch();

  const debouncedName = useDebounce(fildData.name, 500);
  const debouncedDescription = useDebounce(fildData.description, 500);
  const debouncedHeadId = useDebounce(fildData.head, 500);

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

  const handleClearInput = (fieldName) => {
    setFirst(true);
    setFildData((prev) => ({
      ...prev,
      [fieldName]: '',
    }));
  };
  const handleChangeInput = (value, key) => {
    setFirst(true);
    setFildData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearAll = () => {
    setFirst(true);
    setBranchesSearchData({ name: '', description: '', head: '' });
    setFildData({
      name: '',
      description: '',
      head: '',
    });
  };

  const handleReset = () => {
    setActiveStatus('Status');
    setResetRegions([]);
    setBranchesSearchData({
      name: '',
      description: '',
      head: '',
      disabled: '',
      regionIds: [],
      status: '',
    });
    resetSearchData();
    handleCloseSheet();
  };

  const handleStatusClick = (status) => {
    if (status === 'active') setBranchesSearchData({ disabled: false, status: status });
    else if (status === 'disabled') setBranchesSearchData({ disabled: true, status: status });
    else setBranchesSearchData({ disabled: '', status: status });
    setActiveStatus(status);
  };

  const handleFilterSelect = (regions) => {
    setBranchesSearchData({ regionIds: regions });
  };

  const handleChangeInputHead = (e) => {
    setFirst(true);
    setFildData((prev) => ({
      ...prev,
      head: e?.value,
    }));
  };
  useEffect(() => {
    if (first) setBranchesSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setBranchesSearchData({ description: debouncedDescription });
  }, [debouncedDescription]);

  useEffect(() => {
    if (first) setBranchesSearchData({ headId: debouncedHeadId });
  }, [debouncedHeadId]);
  useEffect(() => {
    if (updateBranchesSuccess) {
      dispatch(getBranches({ ...searchData, departmentId: uuid }));
    }
  }, [dispatch, updateBranchesSuccess]);

  useEffect(() => {
    dispatch(getBranches({ ...searchData, departmentId: uuid }));
  }, [JSON.stringify(searchData)]);

  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'description', 'memberName', 'leadId'];
    const searchCount = searchKeys.reduce((count, key) => {
      const value = filters[key];
      return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
    }, 0);

    return { searchCount };
  };

  const handleClickClearSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleClearAll();
  };

  const getFilterCount = () => {
    let count = 0;

    if (activeStatus && activeStatus !== 'Status') {
      count++;
    }

    const hasRegions =
      Array.isArray(searchData.regionIds) &&
      !(searchData.regionIds.length === 1 && searchData.regionIds[0] === 'regions') &&
      searchData.regionIds.length > 0;

    if (hasRegions) {
      count++;
    }

    return count;
  };

  const filterCount = useMemo(() => getFilterCount(), [searchData, activeStatus]);
  const { searchCount } = getSearchAndFilterCount(searchData);

  return (
    <Container>
      <RowFilter>
        <BtnWrapper>
          <Button
            outlined
            onClick={toggleSearch}
            variant="search"
            onClear={handleClickClearSearch}
            active={searchCount > 0}
            clearable={searchCount > 0}
          >
            Search ({searchCount})
          </Button>
          <Button
            outlined
            onClick={toggleFilter}
            variant="filter"
            onClear={handleReset}
            active={filterCount > 0}
            clearable={filterCount > 0}
          >
            Filter ({filterCount})
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
          {userType !== 'Branch Head' && (
            <Select
              label="Head"
              value={head.find((item) => item.value === fildData.head)}
              onChange={(e) => handleChangeInputHead(e)}
              options={generateOptions(heads)}
              className="select-st m-w-138"
              isClearable
            />
          )}
          <Input
            label="Branch Name"
            onChange={(e) => handleChangeInput(e.target.value, 'name')}
            value={fildData.name}
            leftIcon={SearchIcon}
            clearable
            onClear={() => handleClearInput('name')}
            className="m-w-138"
          />
          <Input
            label="Description"
            clearable
            onChange={(e) => handleChangeInput(e.target.value, 'description')}
            value={fildData.description}
            leftIcon={SearchIcon}
            onClear={() => handleClearInput('description')}
            className="m-w-187"
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
            <FilterSelect
              title="Regions"
              options={regions}
              onSelect={handleFilterSelect}
              resetRegions={resetRegions}
              defaultValue={[]}
            />
            {userType !== 'Branch Head' && (
              <StatusDropdown
                type="status"
                options={STATUS_OPTIONS}
                onStatusClick={handleStatusClick}
                activeStatus={activeStatus}
              />
            )}
          </FiltersWrapper>
        </BottomSheet>
      )}
    </Container>
  );
};

export default MobileFilter;
