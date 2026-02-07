import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import filter from 'assets/filter.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import search from 'assets/search.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { Select } from 'common-ui/select';
import { STATUS_OPTIONS } from 'constants/constants';
import { selectDistricts } from 'features/regions/regionsSlice';
import { getTeams } from 'features/teams/teamsActions';
import { selectHeads, selectUpdateSuccess } from 'features/teams/teamsSlice';
import useDebounce from 'hooks/useDebounce';
import FilterSelect from 'pages/components/filterSelect';
import StatusDropdown from 'pages/components/statusDropdown';
import { generateOptions } from 'utils';

import { ClearAllText } from '../Teams.styles';
import { useTeamsSearchParams } from '../useSearchData';
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
  const { searchData, setTeamsSearchData, resetSearchData } = useTeamsSearchParams();
  const [activeStatus, setActiveStatus] = useState(searchData.status || '');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [resetRegions, setResetRegions] = useState([]);
  const districts = useSelector(selectDistricts);
  const updateTeamsSuccess = useSelector(selectUpdateSuccess);

  const { uuid } = useParams();
  const [first, setFirst] = useState(false);
  const [filtrData, setFiltrData] = useState({
    name: searchData.name || '',
    description: searchData.description || '',
    memberName: searchData.memberName || '',
    leadId: searchData.leadId || '',
  });
  const userType = localStorage.getItem('userType');
  const heads = useSelector(selectHeads);
  const head = generateOptions(heads);

  const dispatch = useDispatch();

  const debouncedName = useDebounce(filtrData.name, 500);
  const debouncedDescription = useDebounce(filtrData.description, 500);
  const debouncedMembers = useDebounce(filtrData.memberName, 500);
  const debouncedLead = useDebounce(filtrData.leadId, 500);

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
    setFiltrData({
      ...filtrData,
      [fieldName]: '',
    });
  };

  const handleReset = () => {
    setActiveStatus('');
    setResetRegions([]);
    setTeamsSearchData({
      name: '',
      description: '',
      memberName: '',
      leadId: '',
      status: '',
      disabled: '',
      districtIds: [],
    });
  };

  const handleChangeInput = (value, key) => {
    setFirst(true);
    setFiltrData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleStatusClick = (status) => {
    if (status === 'active') setTeamsSearchData({ disabled: false, status: status });
    else if (status === 'disabled') setTeamsSearchData({ disabled: true, status: status });
    else setTeamsSearchData({ disabled: '', status: status });
    setActiveStatus(status);
  };

  const handleFilterSelect = (district) => {
    setTeamsSearchData({ districtIds: district });
  };

  const districtValue = searchData.districtIds.map((value) => {
    const matched = districts.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });

  const handleChangeInputHead = (e) => {
    setFirst(true);
    setFiltrData((prev) => ({
      ...prev,
      leadId: e?.value,
    }));
  };

  useEffect(() => {
    dispatch(getTeams({ ...searchData, branchId: uuid }));
  }, [dispatch, updateTeamsSuccess, JSON.stringify(searchData)]);

  useEffect(() => {
    if (first) setTeamsSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setTeamsSearchData({ description: debouncedDescription });
  }, [debouncedDescription]);

  useEffect(() => {
    if (first) setTeamsSearchData({ memberName: debouncedMembers });
  }, [debouncedMembers]);

  useEffect(() => {
    if (first) setTeamsSearchData({ leadId: debouncedLead });
  }, [debouncedLead]);

  const handleClearAll = () => {
    setFiltrData({
      name: '',
      description: '',
      memberName: '',
      leadId: '',
    });
    setTeamsSearchData({ name: '', description: '', memberName: '', leadId: '' });
  };

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

    if (activeStatus && activeStatus !== 'active') {
      count++;
    }

    const hasDistricts =
      Array.isArray(searchData.districtIds) && searchData.districtIds.length > 0;
    if (hasDistricts) {
      count++;
    }

    return count;
  };

  const filterCount = getFilterCount();

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
          {userType !== 'Team Lead' && (
            <Select
              value={head.find((item) => item.value === filtrData.leadId)}
              onChange={(e) => handleChangeInputHead(e)}
              label="Head"
              options={generateOptions(heads)}
              className="select-st m-w-123"
              isClearable
            />
          )}
          <Input
            leftIcon={SearchIcon}
            clearable
            onClear={() => handleClearInput('name')}
            label="Name"
            className="m-w-123"
            onChange={(e) => handleChangeInput(e.target.value, 'name')}
            value={filtrData.name}
          />
          <Input
            leftIcon={SearchIcon}
            clearable
            onClear={() => handleClearInput('description')}
            label="Description"
            onChange={(e) => handleChangeInput(e.target.value, 'description')}
            value={filtrData.description}
            className="m-w-123"
          />
          <Input
            leftIcon={SearchIcon}
            clearable
            onClear={() => handleClearInput('memberName')}
            className="m-w-123"
            label="Members"
            onChange={(e) => handleChangeInput(e.target.value, 'memberName')}
            value={filtrData.memberName}
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
            {userType !== 'Team Lead' && (
              <StatusDropdown
                type="status"
                options={STATUS_OPTIONS}
                onStatusClick={handleStatusClick}
                activeStatus={activeStatus}
                defaultValue="All statuses"
              />
            )}
            <FilterSelect
              title="District"
              options={districts}
              onSelect={handleFilterSelect}
              resetRegions={resetRegions}
              defaultValue={districtValue}
            />
          </FiltersWrapper>
        </BottomSheet>
      )}
    </Container>
  );
};

export default MobileFilter;
