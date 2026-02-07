import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ApiClient from 'api/axiosClient';
import CloseSvg from 'assets/filters/close.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import { AsyncSelect } from 'common-ui/select';
import dayjs from 'dayjs';
import { getRandomLead, getWorkflowStatusesByPrivilege } from 'features/sales/salesActions';
import { selectWorkflowStatusesByPrivilege } from 'features/sales/salesSlice';
import useDebounce from 'hooks/useDebounce';
import { generateOptions } from 'utils';

import {
  AsyncSelectWrapper,
  CalendarWrapper,
  CheckboxBox,
  CheckboxInput,
  CheckboxLabel,
  FilterActions,
  FilterContainer,
  FilterRightAndLeft,
  FilterWrapper,
  Filters,
  FiltersRow,
  FormRow,
  Icon,
} from './Filter.styles';

const Filter = ({ searchData = {}, setSearchData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subprojectId } = useParams();

  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const [showFilterFilters, setShowFilterFilters] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState(searchData.direction || 'all');

  const [formData, setFormData] = useState({
    companyName: searchData.companyName || '',
    communicationMethod: searchData.communicationMethod || '',
    fullName: searchData.fullName || '',
    address: searchData.address || '',
    dateFrom: searchData.dateFrom || null,
    dateTo: searchData.dateTo || null,
  });

  const [first, setFirst] = useState(false);
  const workflowStatusesByPrivilege = useSelector(selectWorkflowStatusesByPrivilege);
  const [workflowStatus, setWorkflowStatus] = useState([]);
  const [creators, setCreators] = useState([]);
  const [sources, setSources] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);

  const debouncedCompanyName = useDebounce(formData.companyName, 500);
  const debouncedCommunicationMethod = useDebounce(formData.communicationMethod, 500);
  const debouncedFullName = useDebounce(formData.fullName, 500);
  const debouncedAddress = useDebounce(formData.address, 500);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setFirst(true);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (type, date) => {
    const parsedDate = new Date(date);
    if (type === 'dateFrom') {
      parsedDate.setHours(0, 0, 0, 0);
    } else {
      parsedDate.setHours(23, 59, 59, 999);
    }
    const isoDate = date ? parsedDate.toISOString() : null;
    handleInputChange(type, isoDate);
  };

  const handleResetSearch = () => {
    const resetData = {
      ...searchData,
      companyName: '',
      communicationMethod: '',
      fullName: '',
      address: '',
    };
    setFormData(resetData);
    setSearchData(resetData);
    setShowSearchFilters(false);
    setShowFilterFilters(false);
  };

  const handleResetFilters = () => {
    const resetData = {
      ...searchData,
      dateFrom: null,
      dateTo: null,
      statusId: '',
      createdBy: '',
      sourceId: '',
    };
    setFormData(resetData);
    setSearchData(resetData);
    setSelectedDirection('all');
    setSelectedStatus(null);
    setSelectedCreator(null);
    setSelectedSource(null);
    setShowSearchFilters(false);
    setShowFilterFilters(false);
  };
  const handleDirectionChange = (contactType) => {
    setSelectedDirection(contactType);
    setSearchData({ ...searchData, direction: contactType });
  };

  const handelClose = () => {
    setShowSearchFilters(false);
    setShowFilterFilters(false);
  };

  const getSearchCount = (data = {}) => {
    const keys = ['companyName', 'communicationMethod', 'fullName', 'address'];
    return keys.reduce((acc, key) => acc + (data[key]?.toString().trim() ? 1 : 0), 0);
  };

  const getFilterCount = (data = {}) => {
    const keys = ['dateFrom', 'dateTo', 'statusId', 'createdBy', 'sourceId'];
    return keys.reduce((acc, key) => acc + (data[key]?.toString().trim() ? 1 : 0), 0);
  };

  const searchCount = getSearchCount(searchData);
  const filterCount = getFilterCount(searchData);

  const toggleSearchFilters = () => {
    setShowSearchFilters((prev) => !prev);
    setShowFilterFilters(false);
  };

  const toggleFilterFilters = () => {
    setShowFilterFilters((prev) => !prev);
    setShowSearchFilters(false);
  };

  const handleGetRandomLead = async () => {
    setLoading(true);
    const resultAction = await dispatch(getRandomLead({ params: { subprojectId } }));
    setLoading(false);
    if (getRandomLead.fulfilled.match(resultAction)) {
      const uuid = resultAction.payload.uuid;
      navigate(`/leads/${uuid}`);
    }
  };

  const handleFilterSelect = (status) => {
    setFirst(true);
    setSelectedStatus(status);
    setSearchData({ statusId: status?.value || status });
  };

  const handleLoadOptions = useCallback(
    async (search = '') => {
      try {
        const resultAction = await dispatch(getWorkflowStatusesByPrivilege({ search }));
        const options = generateOptions(resultAction.payload);
        setWorkflowStatus(options);
        return options;
      } catch (error) {
        console.error('Error fetching options:', error);
        return [];
      }
    },
    [dispatch]
  );

  const handleLoadCreators = useCallback(async (search = '') => {
    try {
      const response = await ApiClient.get(`/sales/leads/creators?search=${search}`);
      const options = generateOptions(response);
      setCreators(options);
      return options;
    } catch (error) {
      console.error('Error fetching creators:', error);
      return [];
    }
  }, []);

  const handleLoadSources = useCallback(async (search = '') => {
    try {
      const response = await ApiClient.get(`/sales/leads/sources/filter?search=${search}`);
      const options = generateOptions(response);
      setSources(options);
      return options;
    } catch (error) {
      console.error('Error fetching sources:', error);
      return [];
    }
  }, []);

  const handleCreatorSelect = (creator) => {
    setFirst(true);
    setSelectedCreator(creator);
    setSearchData({ createdBy: creator?.value || creator });
  };

  const handleSourceSelect = (source) => {
    setFirst(true);
    setSelectedSource(source);
    setSearchData({ sourceId: source?.value || source });
  };

  useEffect(() => {
    handleLoadOptions();
    handleLoadCreators();
    handleLoadSources();
  }, [dispatch, handleLoadOptions, handleLoadCreators, handleLoadSources]);

  useEffect(() => {
    if (searchData.statusId && workflowStatus.length > 0) {
      const foundStatus = workflowStatus.find(
        (option) => option.value === searchData.statusId || option.uuid === searchData.statusId
      );
      setSelectedStatus(foundStatus || null);
    } else if (!searchData.statusId) {
      setSelectedStatus(null);
    }
  }, [searchData.statusId, workflowStatus]);

  useEffect(() => {
    if (searchData.createdBy && creators.length > 0) {
      const foundCreator = creators.find((option) => option.value === searchData.createdBy);
      setSelectedCreator(foundCreator || null);
    } else if (!searchData.createdBy) {
      setSelectedCreator(null);
    }
  }, [searchData.createdBy, creators]);

  useEffect(() => {
    if (searchData.sourceId && sources.length > 0) {
      const foundSource = sources.find((option) => option.value === searchData.sourceId);
      setSelectedSource(foundSource || null);
    } else if (!searchData.sourceId) {
      setSelectedSource(null);
    }
  }, [searchData.sourceId, sources]);

  useEffect(() => {
    if (first) {
      setSearchData({
        companyName: debouncedCompanyName,
        communicationMethod: debouncedCommunicationMethod,
        fullName: debouncedFullName,
        address: debouncedAddress,
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo,
        direction: selectedDirection,
        statusId: searchData.statusId || '',
        createdBy: searchData.createdBy || '',
        sourceId: searchData.sourceId || '',
      });
    }
  }, [
    debouncedCompanyName,
    debouncedCommunicationMethod,
    debouncedFullName,
    debouncedAddress,
    formData.dateFrom,
    formData.dateTo,
    selectedDirection,
  ]);

  return (
    <FilterContainer>
      <FilterRightAndLeft>
        <CheckboxBox>
          <CheckboxLabel
            $active={selectedDirection === 'all'}
            onClick={() => handleDirectionChange('all')}
          >
            <CheckboxInput type="checkbox" checked={selectedDirection === 'all'} readOnly />
            All
          </CheckboxLabel>

          <CheckboxLabel
            $active={selectedDirection === 'inbound'}
            onClick={() => handleDirectionChange('inbound')}
          >
            <CheckboxInput
              type="checkbox"
              checked={selectedDirection === 'inbound'}
              readOnly
            />
            Inbound
          </CheckboxLabel>

          <CheckboxLabel
            $active={selectedDirection === 'outbound'}
            onClick={() => handleDirectionChange('outbound')}
          >
            <CheckboxInput
              type="checkbox"
              checked={selectedDirection === 'outbound'}
              readOnly
            />
            Outbound
          </CheckboxLabel>
        </CheckboxBox>

        <FilterActions>
          <FilterWrapper>
            <Button
              variant="filter"
              outlined
              active={filterCount > 0}
              clearable={filterCount > 0}
              onClick={toggleFilterFilters}
              onClear={handleResetFilters}
              className="filter-trigger-button"
            >
              Filter {filterCount > 0 ? `(${filterCount})` : ''}
            </Button>
            <Button
              variant="search"
              outlined
              active={searchCount > 0}
              clearable={searchCount > 0}
              onClick={toggleSearchFilters}
              onClear={handleResetSearch}
              className="search-trigger-button"
            >
              Search {searchCount > 0 ? `(${searchCount})` : ''}
            </Button>
          </FilterWrapper>
          <Button loading={loading} onClick={handleGetRandomLead} width="90px" secondary>
            Open random lead
          </Button>
        </FilterActions>
      </FilterRightAndLeft>
      {(showSearchFilters || showFilterFilters) && (
        <FiltersRow>
          <Filters>
            {showSearchFilters && (
              <FormRow>
                <Input
                  leftIcon={SearchIcon}
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  onClear={() => handleInputChange('companyName', '')}
                  label="Lead Company Name"
                  clearable
                  className="m-w-138"
                />
                <Input
                  leftIcon={SearchIcon}
                  value={formData.communicationMethod}
                  onChange={(e) => handleInputChange('communicationMethod', e.target.value)}
                  onClear={() => handleInputChange('communicationMethod', '')}
                  label="Communication Method"
                  clearable
                  className="m-w-138"
                />
                <Input
                  leftIcon={SearchIcon}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  onClear={() => handleInputChange('fullName', '')}
                  label="Lead Full Name"
                  clearable
                  className="m-w-138"
                />
                <Input
                  leftIcon={SearchIcon}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  onClear={() => handleInputChange('address', '')}
                  label="Address"
                  clearable
                  className="m-w-138"
                />
              </FormRow>
            )}
            {showFilterFilters && (
              <FormRow>
                <CalendarWrapper>
                  <CustomDatePicker
                    minHeight="38px"
                    placeholder="From date"
                    value={formData.dateFrom ? dayjs(formData.dateFrom) : null}
                    maxDate={formData.dateTo ? dayjs(formData.dateTo) : null}
                    onChange={(date) => handleDateChange('dateFrom', date)}
                  />
                </CalendarWrapper>
                <CalendarWrapper>
                  <CustomDatePicker
                    minHeight="38px"
                    placeholder="To date"
                    value={formData.dateTo ? dayjs(formData.dateTo) : null}
                    minDate={formData.dateFrom ? dayjs(formData.dateFrom) : null}
                    onChange={(date) => handleDateChange('dateTo', date)}
                  />
                </CalendarWrapper>
                <AsyncSelectWrapper>
                  <AsyncSelect
                    minHeight="38px"
                    placeholder="Lead Status"
                    loadOptions={handleLoadOptions}
                    value={selectedStatus}
                    onChange={handleFilterSelect}
                    defaultOptions={generateOptions(workflowStatusesByPrivilege?.items)}
                    isClearable
                  />
                </AsyncSelectWrapper>
                <AsyncSelectWrapper>
                  <AsyncSelect
                    minHeight="38px"
                    placeholder="Created By"
                    onMenuOpen={handleLoadCreators}
                    loadOptions={handleLoadCreators}
                    value={selectedCreator}
                    onChange={handleCreatorSelect}
                    defaultOptions={creators}
                    isClearable
                  />
                </AsyncSelectWrapper>
                <AsyncSelectWrapper>
                  <AsyncSelect
                    minHeight="38px"
                    placeholder="Source"
                    onMenuOpen={handleLoadSources}
                    loadOptions={handleLoadSources}
                    value={selectedSource}
                    onChange={handleSourceSelect}
                    defaultOptions={sources}
                    isClearable
                  />
                </AsyncSelectWrapper>
              </FormRow>
            )}

            <Icon src={CloseSvg} alt="close" onClick={handelClose} />
          </Filters>
        </FiltersRow>
      )}
    </FilterContainer>
  );
};

export default Filter;
