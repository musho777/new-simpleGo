import { useEffect, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CloseSvg from 'assets/filters/close.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import { Table } from 'common-ui/table';
import Tooltip from 'common-ui/tooltip';
import { ARCHIVE_PATHS } from 'constants/constants';
import dayjs from 'dayjs';
import { getArchive } from 'features/archive/archiveActions';
import {
  selectArchive,
  selectArchiveCount,
  selectShowFilters,
  setShowFilters,
} from 'features/archive/archiveSlice';
import useDebounce from 'hooks/useDebounce';
import Tag from 'pages/components/tag';
import {
  EmailLimitSpan,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';
import { formatDateTime } from 'utils/dateUtils';

import {
  ActionsWrapper,
  CalendarWrapper,
  ClearAllText,
  Container,
  FilterActions,
  FilterContainer,
  Filters,
  FormRow,
  Icon,
  Name,
  RightSideContainer,
  Row,
} from './Archive.styles';
import MobileFilter from './mobileFilter';
import { useArchiveSearchParams } from './useSearchData';

const mobileColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (_, e) => {
      return (
        <Name>
          {e.name} {e.surname}
        </Name>
      );
    },
  },
  {
    title: 'Role',
    dataIndex: 'userType',
    render: (userType) => <Tag type="roles" variant={userType} />,
  },
  {
    title: 'Archived Date',
    dataIndex: 'deletedAt',
    key: 'deletedAt',
    render: (deletedAt) => formatDateTime(deletedAt, false),
    sortable: true,
  },
];

const allColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Surname', dataIndex: 'surname', key: 'surname' },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (description) => <EmailLimitSpan>{description}</EmailLimitSpan>,
  },
  { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  {
    title: 'Role',
    dataIndex: 'userType',
    key: 'userType',
    align: 'left',
    render: (userType) => <Tag type="roles" variant={userType} />,
  },
  {
    title: 'Occupation',
    dataIndex: 'occupation',
    key: 'occupation',
    render: (occupation) =>
      occupation ? <Tag type="occupation" variant={occupation} /> : <span>-</span>,
  },
  {
    title: 'Archived by',
    dataIndex: 'disabledBy',
    key: 'disabledBy',
    sortable: true,
    render: (disabledBy) => (
      <>
        {disabledBy?.name} {disabledBy?.surname}
      </>
    ),
  },
  {
    title: 'Archived Date',
    dataIndex: 'deletedAt',
    key: 'deletedAt',
    render: (deletedAt) => formatDateTime(deletedAt, false),
    sortable: true,
  },
];

const compactColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Surname', dataIndex: 'surname', key: 'surname' },
  {
    title: 'Role',
    dataIndex: 'userType',
    key: 'userType',
    render: (userType) => <Tag type="roles" variant={userType} />,
  },
  {
    title: 'Archived Date',
    dataIndex: 'deletedAt',
    key: 'deletedAt',
    render: (deletedAt) => formatDateTime(deletedAt, false),
    sortable: true,
  },
];

const Archive = () => {
  const { searchData, setArchiveSearchData, resetSearchData } = useArchiveSearchParams();

  const [createdAtDate, setCreatedAtDate] = useState(searchData.startDate);
  const [toDate, setToDate] = useState(searchData.endDate);
  const [first, setFirst] = useState(false);
  const [columns, setColumns] = useState([]);
  const showFilters = useSelector(selectShowFilters);
  const data = useSelector(selectArchive);
  const count = useSelector(selectArchiveCount);
  const pagesCount = Math.ceil(count / (searchData.limit || 10));
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      limit: 10,
      offset: 0,
      startDate: '',
      endDate: '',
    },
  });

  const [fildData, setFildData] = useState({
    name: searchData.name || '',
    disabledByName: searchData.disabledByName || '',
  });

  const debouncedName = useDebounce(fildData.name, 500);
  const debouncedArchivedByName = useDebounce(fildData.disabledByName, 500);

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };
  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'disabledByName'];

    const searchCount = searchKeys.reduce((count, key) => {
      const value = filters[key];
      return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
    }, 0);

    return { searchCount };
  };

  const handleClickClearSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleResetAllFilters();
  };

  const { searchCount } = getSearchAndFilterCount(searchData);

  const handleClearInput = (fieldName) => {
    setFirst(true);
    setFildData({
      ...fildData,
      [fieldName]: '',
    });
  };
  const handleChangeInput = (e, key) => {
    setFildData({
      ...fildData,
      [key]: e.target.value,
    });
    setFirst(true);
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

  const onPaginationChange = (page) => {
    const offset = (page - 1) * (searchData.limit || 10);
    setArchiveSearchData({ offset });
  };

  const handleResetAllFilters = () => {
    resetSearchData();
    setFildData({
      name: '',
      disabledByName: '',
    });
    if (path !== '/archive') {
      setCreatedAtDate(null);
      setToDate(null);
      reset({
        name: '',
        disabledByName: '',
        startDate: '',
        endDate: '',
        limit: 10,
        offset: 0,
      });
    }
  };

  const onSubmit = (data) => {
    if (path !== '/archive') {
      dispatch(
        getArchive({
          path: ARCHIVE_PATHS[path],
          params: { ...data },
        })
      );
    }
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
      handleResetAllFilters();
    }
  }, [path]);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1440) {
        setColumns(allColumns);
      } else {
        setColumns(compactColumns);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Email</ExpandedLabel>
          <ExpandedValue>{row?.email}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Phone Number</ExpandedLabel>
          <ExpandedValue>{row?.phoneNumber}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Role</ExpandedLabel>
          <ExpandedValue>
            <Tag type="roles" variant={row?.userType} />
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Occupation</ExpandedLabel>
          <ExpandedValue>
            {row?.occupation ? <Tag type="occupation" variant={row?.occupation} /> : '-'}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Archived by</ExpandedLabel>
          <ExpandedValue>
            {row?.disabledBy?.name} {row?.disabledBy?.surname}
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );
  return (
    <Container>
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
                minDate={createdAtDate ? dayjs(createdAtDate) : null}
                value={toDate ? dayjs(toDate) : null}
                onChange={(date) => handleDateChange('to', date)}
              />
            </CalendarWrapper>
            <ResetButton onClick={handleResetAllFilters} />
          </ActionsWrapper>
        </FilterActions>

        <Filters $showFilters={showFilters}>
          <FormRow onSubmit={handleSubmit(onSubmit)}>
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
              value={fildData.disabledByName}
              onChange={(e) => handleChangeInput(e, 'disabledByName')}
              onClear={() => handleClearInput('disabledByName')}
              label="Archived by"
            />
          </FormRow>
          <RightSideContainer>
            <Icon src={CloseSvg} alt="close" onClick={handleClickShowHideFilters} />
            <ClearAllText onClick={handleClearAll}>Clear All</ClearAllText>
          </RightSideContainer>
        </Filters>
      </FilterContainer>
      <MobileFilter />
      <MobileList columns={mobileColumns} data={data} expandable={renderExpandableContent} />
      <Table
        currentPage={currentPage}
        onPaginationChange={onPaginationChange}
        columns={columns}
        data={data}
        count={count}
        totalPages={pagesCount}
      />
    </Container>
  );
};

export default Archive;
