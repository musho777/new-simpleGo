import { memo, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import active from 'assets/active.svg';
import disabled from 'assets/disabled.svg';
import CloseSvg from 'assets/filters/close.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import { Select } from 'common-ui/select';
import { Table } from 'common-ui/table';
import Tooltip from 'common-ui/tooltip';
import { STATUS_OPTIONS } from 'constants/constants';
import { getBranches } from 'features/branches/branchesActions';
import {
  selectBranches,
  selectHeads,
  selectLoading,
  selectPagesCount,
  selectShowFilters,
  selectUpdateSuccess,
  setShowFilters,
} from 'features/branches/branchesSlice';
import { selectSingleDepName } from 'features/departments/departmentsSlice';
import { selectRegions } from 'features/regions/regionsSlice';
import useDebounce from 'hooks/useDebounce';
import FilterSelect from 'pages/components/filterSelect';
import StatusDropdown from 'pages/components/statusDropdown';
import TableTooltip from 'pages/components/tableTooltip';
import Tag from 'pages/components/tag';
import { DescriptionLimitSpan, StatusIcon } from 'pages/departments/Departments.styles';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  MobileActionsWrapper,
} from 'pages/userManagement/UserManagement.styles';
import { generateOptions } from 'utils';

import {
  ActionsWrapper,
  ClearAllText,
  FilterActions,
  FilterContainer,
  Filters,
  FormRow,
  Header,
  Icon,
  LightTooltip,
  Name,
  RightSideContainer,
  Row,
  Separator,
  StatusWrapper,
  SubName,
  TeamsNavigationLink,
  ViewContainer,
} from './Branches.styles';
import Create from './Create';
import Actions from './actions';
import MobileFilter from './mobileFilter';
import { useBranchesSearchParams } from './useSearchData';

const BranchesView = () => {
  const { searchData, setBranchesSearchData, resetSearchData, defaultSearchData } =
    useBranchesSearchParams();
  const [first, setFirst] = useState(false);
  const [activeStatus, setActiveStatus] = useState(searchData.status);
  const [resetRegions, setResetRegions] = useState([]);
  const userType = localStorage.getItem('userType');
  const showFilters = useSelector(selectShowFilters);
  const branches = useSelector(selectBranches);
  const heads = useSelector(selectHeads);
  const head = generateOptions(heads);
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);
  const isLoading = useSelector(selectLoading);
  const regions = useSelector(selectRegions);
  const pagesCount = useSelector(selectPagesCount);
  const departmentName = useSelector(selectSingleDepName);
  const updateBranchesSuccess = useSelector(selectUpdateSuccess);
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fildData, setFildData] = useState({
    name: searchData.name,
    description: searchData.description,
    head: searchData.headId,
  });
  const debouncedName = useDebounce(fildData.name, 500);
  const debouncedDescription = useDebounce(fildData.description, 500);
  const debouncedHeadId = useDebounce(fildData.head, 500);

  const handleStatusClick = (status) => {
    if (status === 'active') setBranchesSearchData({ disabled: false, status: status });
    else if (status === 'disabled') setBranchesSearchData({ disabled: true, status: status });
    else setBranchesSearchData({ disabled: '', status: status });
    setActiveStatus(status);
  };

  const onPaginationChange = (page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    setBranchesSearchData({ offset });
  };

  const handleResetAllFilters = () => {
    setActiveStatus('Status');
    setFildData({
      name: '',
      description: '',
      head: '',
    });
    resetSearchData();
    setResetRegions([]);
  };

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
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

  const handleFilterSelect = (r) => {
    if (r?.length === regions?.length) setResetRegions([]);
    setBranchesSearchData({ regionIds: r?.length === regions?.length ? [] : r });
  };

  const handleNavigateDepartments = () => {
    navigate(-1);
  };

  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'description', 'headId'];

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

  const regionvalue = searchData.regionIds.map((value) => {
    const matched = regions.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });

  const mobileColumns = useMemo(() => {
    return [
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
        title: 'Teams',
        dataIndex: 'uuid',
        render: (uuid, record) => {
          const teamsCount = record?.teams ?? 0;
          const isClickable = !(userType !== 'Branch Head' && teamsCount === 0);

          return (
            <TeamsNavigationLink
              id={uuid}
              onClick={() => {
                if (isClickable) {
                  navigate(`/departments/branches/teams/${uuid}`);
                }
              }}
              $active={teamsCount !== 0}
              $isClickable={isClickable}
            >
              {teamsCount === 0 ? 'No Teams' : `${teamsCount} teams`}
            </TeamsNavigationLink>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'deletedAt',
        render: (deletedAt) => <StatusIcon src={deletedAt === null ? active : disabled} />,
      },
    ];
  }, [navigate]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) =>
          name ? (
            <LightTooltip title={name.length > 20 ? name : ''} placement="top-start">
              <DescriptionLimitSpan>{name}</DescriptionLimitSpan>
            </LightTooltip>
          ) : (
            '-'
          ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description) =>
          description ? (
            <LightTooltip
              title={description.length > 20 ? description : ''}
              placement="top-start"
            >
              <DescriptionLimitSpan>{description}</DescriptionLimitSpan>
            </LightTooltip>
          ) : (
            '-'
          ),
      },
      {
        title: 'Head',
        dataIndex: 'head',
        key: 'head',
        render: (head) =>
          head ? (
            <DescriptionLimitSpan>
              {head?.name} {head?.surname}
            </DescriptionLimitSpan>
          ) : (
            '-'
          ),
      },
      {
        title: 'Regions',
        dataIndex: 'regions',
        key: 'regions',
        render: (regions, r, index) => (
          <TableTooltip index={index} data={regions}>
            {regions?.length} Regions
          </TableTooltip>
        ),
      },
      {
        title: 'Teams',
        dataIndex: 'uuid',
        key: 'teams',
        render: (uuid, record) => {
          const teamsCount = record?.teams ?? 0;

          const isClickable = !(userType !== 'Branch Head' && teamsCount === 0);
          return (
            <TeamsNavigationLink
              id={uuid}
              onClick={() => {
                if (isClickable) {
                  navigate(`/departments/branches/teams/${uuid}`);
                }
              }}
              $active={teamsCount !== 0}
              $isClickable={isClickable}
            >
              {teamsCount === 0 ? 'No Teams' : `${teamsCount} teams`}
            </TeamsNavigationLink>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'deletedAt',
        key: 'deletedAt',
        render: (deletedAt) => (
          <StatusWrapper>
            {deletedAt && <Tooltip text={`It will disappear from the list after 30 days.`} />}
            <Tag type="statuses" variant={deletedAt === null ? 'Active' : 'Disabled'} />
          </StatusWrapper>
        ),
      },
    ];

    if (userType === 'Department Head') {
      baseColumns.push({
        title: '',
        dataIndex: 'uuid',
        key: 'uuid',
        width: 50,
        render: (uuid) => <Actions id={uuid} />,
      });
    }

    return baseColumns;
  }, [branches, navigate, userType]);

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

  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>Head</ExpandedLabel>
            <ExpandedValue>
              {row.head?.name} {row.head?.surname}
            </ExpandedValue>
          </Row>
          <ExpandedLabel>{row.description}</ExpandedLabel>
          <Row>
            <ExpandedLabel>{`(${row.regions?.length ?? 0})`} Regions</ExpandedLabel>
            <ExpandedValue>{row.regions?.map((item) => item.name).join(', ')}</ExpandedValue>
          </Row>
        </ExpandableWrapper>
        {userType === 'Department Head' && (
          <MobileActionsWrapper>
            <Actions hideTrigger id={row.uuid} disabled={row.deletedAt !== null} />
          </MobileActionsWrapper>
        )}
      </>
    );
  };

  return (
    <ViewContainer>
      <Header>
        <Name>
          {userType !== 'Branch Head' && userType !== 'Team Lead' && (
            <>
              <SubName onClick={handleNavigateDepartments}>Departments</SubName>
              <Separator>|</Separator>
            </>
          )}
          Branches
        </Name>
        {userType === 'Department Head' ? <Create /> : <div className="h-38" />}
      </Header>
      {JSON.stringify(defaultSearchData) === JSON.stringify(searchData) &&
      branches?.length === 0 ? null : (
        <FilterContainer>
          <FilterActions>
            <Name>{uuid && departmentName}</Name>
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
              {userType !== 'Branch Head' && (
                <StatusDropdown
                  type="status"
                  options={STATUS_OPTIONS}
                  onStatusClick={handleStatusClick}
                  activeStatus={activeStatus}
                />
              )}
              <FilterSelect
                title="Regions"
                options={regions}
                onSelect={handleFilterSelect}
                resetRegions={resetRegions}
                defaultValue={regionvalue}
              />
              <ResetButton onClick={handleResetAllFilters} />
            </ActionsWrapper>
          </FilterActions>

          <Filters $showFilters={showFilters}>
            <FormRow>
              <Input
                label="Branch Name"
                leftIcon={SearchIcon}
                clearable
                onChange={(e) => handleChangeInput(e.target.value, 'name')}
                value={fildData.name}
                onClear={() => handleClearInput('name')}
                className="m-w-187"
                maxLength={50}
              />

              <Input
                label="Description"
                clearable
                leftIcon={SearchIcon}
                onChange={(e) => handleChangeInput(e.target.value, 'description')}
                value={fildData.description}
                onClear={() => handleClearInput('description')}
                className="m-w-187"
                maxLength={100}
              />
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
            </FormRow>
            <RightSideContainer>
              <Icon src={CloseSvg} alt="close" onClick={handleClickShowHideFilters} />
              <ClearAllText onClick={handleClearAll}>Clear All</ClearAllText>
            </RightSideContainer>
          </Filters>
        </FilterContainer>
      )}
      <Table
        totalPages={pagesCount}
        currentPage={currentPage}
        data={branches}
        columns={columns}
        onPaginationChange={onPaginationChange}
        loading={isLoading}
        emptyText={
          !first &&
          !searchData.name &&
          !searchData.description &&
          !searchData.headId &&
          searchData.regionIds.length === 0 &&
          (searchData.status === '' || searchData.status === 'All statuses')
            ? 'There are no branches yet'
            : 'No Results found'
        }
      />
      <MobileFilter />
      <MobileList
        columns={mobileColumns}
        totalPages={pagesCount}
        loading={isLoading}
        currentPage={currentPage}
        data={branches}
        onPaginationChange={onPaginationChange}
        expandable={renderExpandableContent}
        emptyText={
          !first &&
          !searchData.name &&
          !searchData.description &&
          !searchData.headId &&
          searchData.regionIds.length === 0 &&
          (searchData.status === '' || searchData.status === 'All statuses')
            ? 'There are no branches yet'
            : 'No Results found'
        }
      />
    </ViewContainer>
  );
};

export default memo(BranchesView);
