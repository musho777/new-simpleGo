import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import filter from 'assets/filter.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import search from 'assets/search.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import { ARCHIVE_PATHS } from 'constants/constants';
import dayjs from 'dayjs';
import { getArchive } from 'features/archive/archiveActions';
import useDebounce from 'hooks/useDebounce';

import { ClearAllText } from '../Archive.styles';
import { useArchiveSearchParams } from '../useSearchData';
import {
  BottomSheet,
  BtnWrapper,
  CalendarWrapper,
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
  const { searchData, setArchiveSearchData, resetSearchData } = useArchiveSearchParams();
  const [createdAtDate, setCreatedAtDate] = useState(searchData.startDate);
  const [toDate, setToDate] = useState(searchData.endDate);
  const [first, setFirst] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();

  const path = location.pathname;

  const dispatch = useDispatch();

  const [fildData, setFildData] = useState({
    name: searchData.name || '',
    disabledByName: searchData.disabledByName || '',
  });
  const { reset, setValue } = useForm({
    defaultValues: {
      name: '',
      disabledByName: '',
      limit: 10,
      offset: 0,
      startDate: '',
      endDate: '',
    },
  });

  const debouncedName = useDebounce(fildData.name, 500);
  const debouncedArchivedByName = useDebounce(fildData.disabledByName, 500);
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
    setFildData({
      ...fildData,
      [fieldName]: '',
    });
    setFirst(true);
  };
  const handleChangeInput = (e, key) => {
    setFildData({
      ...fildData,
      [key]: e.target.value,
    });
    setFirst(true);
  };

  const handleDateChange = (type, date) => {
    const parsedDate = new Date(date);
    if (type === 'from') {
      parsedDate.setHours(0, 0, 0, 0);
      const iso = date ? parsedDate.toISOString() : null;
      setCreatedAtDate(iso);
      setArchiveSearchData({ startDate: iso });
    } else {
      parsedDate.setHours(23, 59, 59, 999);
      const iso = date ? parsedDate.toISOString() : null;
      setToDate(iso);
      setArchiveSearchData({ endDate: iso });
    }
  };
  const handleClearAll = () => {
    setFirst(true);
    setFildData({
      name: '',
      disabledByName: '',
    });
    setArchiveSearchData({ disabledByName: '' });
    setArchiveSearchData({ name: '' });
  };

  const handleReset = () => {
    if (path !== '/archive') {
      setCreatedAtDate(null);
      setToDate(null);
      resetSearchData();
      setFildData({
        name: '',
        disabledByName: '',
      });
      reset({
        name: '',
        disabledByName: '',
        startDate: '',
        endDate: '',
        limit: 10,
        offset: 0,
      });

      setValue('startDate', '');
      setValue('endDate', '');
    }
  };

  useEffect(() => {
    reset(searchData);
  }, [reset]);

  useEffect(() => {
    if (first) setArchiveSearchData({ name: debouncedName });
  }, [debouncedName, first]);

  useEffect(() => {
    if (first) setArchiveSearchData({ disabledByName: debouncedArchivedByName });
  }, [debouncedArchivedByName, first]);

  useEffect(() => {
    setFirst(true);
    if (path !== '/archive') {
      dispatch(getArchive({ path: ARCHIVE_PATHS[path], params: searchData }));
    }
  }, [JSON.stringify(searchData), path]);

  useEffect(() => {
    if (first) {
      handleReset();
    }
  }, [path]);

  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'disabledByName', 'memberName', 'leadId'];
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
          <Button outlined icon={filter} onClick={toggleFilter}>
            Filter
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
          <Input
            leftIcon={SearchIcon}
            clearable
            onClear={() => handleClearInput('name')}
            label="Name"
            value={fildData.name}
            onChange={(e) => handleChangeInput(e, 'name')}
          />
          <Input
            leftIcon={SearchIcon}
            clearable
            onClear={() => handleClearInput('disabledByName')}
            label="Archived by"
            value={fildData.disabledByName}
            onChange={(e) => handleChangeInput(e, 'disabledByName')}
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
            <CalendarWrapper>
              <CustomDatePicker
                height="38px"
                placeholder="Created date from"
                onChange={(date) => handleDateChange('from', date)}
                value={createdAtDate ? dayjs(createdAtDate) : null}
                maxDate={toDate ? dayjs(toDate) : null}
              />
              <CustomDatePicker
                height="38px"
                placeholder="Created date to"
                value={toDate ? dayjs(toDate) : null}
                minDate={createdAtDate ? dayjs(createdAtDate) : null}
                onChange={(date) => handleDateChange('to', date)}
              />
            </CalendarWrapper>
          </FiltersWrapper>
        </BottomSheet>
      )}
    </Container>
  );
};

export default MobileFilter;
