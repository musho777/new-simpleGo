import { useEffect, useState } from 'react';

import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import ResetButton from 'common-ui/resetButton';
import { Select } from 'common-ui/select';
import dayjs from 'dayjs';
import useDebounce from 'hooks/useDebounce';
import { formatDateTime } from 'utils/dateUtils';

import { LIFESPAN_OPTIONS, USAGE_OPTIONS } from '../../../../constants/constants';
import {
  DateBox,
  FilterBox,
  ItemFilterAndSearch,
  ResetBox,
  SelectWrapper,
} from './Filter.styles';
import { useCategoryItemSearchData } from './useSearchData';

const Filter = () => {
  const { searchData, setCategorySingleSearchData } = useCategoryItemSearchData();
  const [first, setFirst] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchData.name || '');
  const debouncedSearchValue = useDebounce(searchTerm, 500);

  const handleDateChange = (date) => {
    setFirst(true);
    if (!date) {
      handleResetFilters();
      return;
    }
    setCategorySingleSearchData({ insertedDate: formatDateTime(date, true) });
  };

  const handleSearchChange = (e) => {
    setFirst(true);
    setSearchTerm(e.target.value);
  };

  const handleChange = (field) => (option) => {
    setFirst(true);
    setCategorySingleSearchData({ [field]: option?.value || '' });
  };

  const handleResetFilters = () => {
    setFirst(true);
    setCategorySingleSearchData({
      usage: '',
      lifespan: '',
      insertedDate: '',
      name: '',
    });
    setSearchTerm('');
  };
  useEffect(() => {
    if (first) {
      setCategorySingleSearchData({ name: debouncedSearchValue });
    }
  }, [debouncedSearchValue]);

  return (
    <ItemFilterAndSearch>
      <SelectWrapper>
        <Select
          options={USAGE_OPTIONS}
          value={USAGE_OPTIONS.find((option) => option.value === searchData.usage) || null}
          onChange={handleChange('usage')}
          placeholder="Usage"
          isClearable
        />
      </SelectWrapper>

      <SelectWrapper>
        <Select
          options={LIFESPAN_OPTIONS}
          value={
            LIFESPAN_OPTIONS.find((option) => option.value === searchData.lifespan) || null
          }
          onChange={handleChange('lifespan')}
          placeholder="Lifespan"
          isClearable
        />
      </SelectWrapper>

      <DateBox>
        <CustomDatePicker
          onClear={handleResetFilters}
          height="44px"
          placeholder="Inserted date"
          onChange={handleDateChange}
          value={searchData.insertedDate ? dayjs(searchData.insertedDate) : null}
        />
      </DateBox>

      <FilterBox>
        <Input
          placeholder="Search..."
          maxLength="50"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </FilterBox>

      <ResetBox>
        <ResetButton onClick={handleResetFilters} />
      </ResetBox>
    </ItemFilterAndSearch>
  );
};

export default Filter;
