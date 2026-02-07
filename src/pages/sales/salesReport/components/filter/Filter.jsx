import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import ResetButton from 'common-ui/resetButton';
import { AsyncSelect } from 'common-ui/select';
import dayjs from 'dayjs';
import { getLeadSources } from 'features/sales/salesActions';
import { generateOptions } from 'utils';

import { ButtonWrapper, FilterContainer, FilterWrapper, SelectWrapper } from './Filter.styles';
import { useReportSearchParams } from './useSearchData';

const getFilterCount = (searchData) => {
  const filterKeys = ['endDate', 'leadSourceId'];

  return filterKeys.reduce((count, key) => {
    const value = searchData[key];
    return count + (value !== null && value !== undefined && value !== '' ? 1 : 0);
  }, 0);
};

const Filter = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [leadSources, setLeadSources] = useState([]);

  const { searchData, setReportSearchData, resetSearchData } = useReportSearchParams();
  const searchCount = getFilterCount(searchData);

  const handleClickShowHideSearch = () => {
    setShowFilter(!showFilter);
  };

  const handleReset = () => {
    resetSearchData();
  };

  const handleLoadLeadSources = useCallback(
    async (search = '') => {
      try {
        const params = { limit: 10000 };
        if (search) params.search = search;

        const response = await dispatch(getLeadSources(params)).unwrap();
        const options = generateOptions(response.leadSources || []);
        setLeadSources(options);
        return options;
      } catch (error) {
        return [];
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (searchData.leadSourceId) {
      handleLoadLeadSources();
    }
  }, [searchData.leadSourceId]);

  return (
    <FilterContainer>
      <ButtonWrapper>
        <Button
          outlined
          onClick={handleClickShowHideSearch}
          className="action-button"
          active={searchCount > 0}
          variant="filter"
        >
          Filter{searchCount > 0 ? ` (${searchCount})` : ''}
        </Button>
      </ButtonWrapper>
      {showFilter && (
        <FilterWrapper>
          <SelectWrapper>
            <CustomDatePicker
              label="Date Range"
              placeholder="Select start date"
              value={searchData.startDate ? dayjs(searchData.startDate) : null}
              onChange={(date) => setReportSearchData({ startDate: date })}
              disableFuture
              maxDate={searchData.endDate ? dayjs(searchData.endDate) : null}
              clearable={false}
              showClearIcon={false}
            />
          </SelectWrapper>
          <SelectWrapper>
            <CustomDatePicker
              label="‎"
              placeholder="Select end date"
              value={searchData.endDate ? dayjs(searchData.endDate) : null}
              disableFuture
              onChange={(date) => setReportSearchData({ endDate: date })}
              minDate={searchData.startDate ? dayjs(searchData.startDate) : null}
              clearable
              showClearIcon
            />
          </SelectWrapper>
          <SelectWrapper>
            <AsyncSelect
              label="Lead Source"
              placeholder="Lead source"
              minHeight="38px"
              loadOptions={handleLoadLeadSources}
              onMenuOpen={handleLoadLeadSources}
              maxHeight="38px"
              defaultOptions={leadSources}
              value={
                searchData.leadSourceId
                  ? leadSources.find((source) => source.value === searchData.leadSourceId)
                  : null
              }
              onChange={(option) =>
                setReportSearchData({ leadSourceId: option?.value || null })
              }
              isClearable
            />
          </SelectWrapper>
          {searchCount > 0 && (
            <div>
              <p>‎ </p>
              <ResetButton onClick={handleReset} />
            </div>
          )}
        </FilterWrapper>
      )}
    </FilterContainer>
  );
};

export default Filter;
