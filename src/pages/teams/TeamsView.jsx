import { useEffect, useMemo, useState } from 'react';

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
import { selectUuidBranchName } from 'features/branches/branchesSlice';
import { selectDistricts } from 'features/regions/regionsSlice';
import { getTeams } from 'features/teams/teamsActions';
import {
  selectHeads,
  selectLoading,
  selectPagesCount,
  selectShowFilters,
  selectTeams,
  selectUpdateSuccess,
  setShowFilters,
} from 'features/teams/teamsSlice';
import useDebounce from 'hooks/useDebounce';
import AvatarGroup from 'pages/components/avatarGroup';
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

import Create from './Create';
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
  ViewContainer,
} from './Teams.styles';
import Actions from './actions';
import MobileFilter from './mobileFilter';
import { useTeamsSearchParams } from './useSearchData';

const TeamsView = () => {
  const { searchData, defaultSearchData, setTeamsSearchData, resetSearchData } =
    useTeamsSearchParams();
  const [activeStatus, setActiveStatus] = useState(searchData.status || '');
  const [resetRegions, setResetRegions] = useState([]);
  const showFilters = useSelector(selectShowFilters);
  const teams = useSelector(selectTeams);
  const [first, setFirst] = useState(false);
  const heads = useSelector(selectHeads);
  const head = generateOptions(heads);
  const isLoading = useSelector(selectLoading);
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);
  const pagesCount = useSelector(selectPagesCount);
  const uuidBranchName = useSelector(selectUuidBranchName);
  const userType = localStorage.getItem('userType');
  const updateTeamsSuccess = useSelector(selectUpdateSuccess);
  const districts = useSelector(selectDistricts);
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'description', 'leadId'];

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

  const [filterData, setFilterData] = useState({
    name: searchData.name || '',
    description: searchData.description || '',
    memberName: searchData.memberName || '',
    leadId: searchData.leadId || '',
  });
  const columns = useMemo(
    () => [
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
              <DescriptionLimitSpan>{description}</DescriptionLimitSpan>{' '}
            </LightTooltip>
          ) : (
            '-'
          ),
      },
      {
        title: 'Head',
        dataIndex: 'lead',
        key: 'lead',
        render: (lead) =>
          lead?.name || lead?.surname ? (
            <>
              {lead?.name} {lead?.surname}
            </>
          ) : (
            '-'
          ),
      },
      {
        title: 'Members',
        dataIndex: 'members',
        key: 'members',
        render: (members = [], _, index) =>
          members.length > 0 ? (
            <AvatarGroup data={members} maxVisible={4} index={index} />
          ) : (
            '-'
          ),
      },
      {
        title: 'Locations',
        dataIndex: 'districts',
        key: 'districts',
        render: (districts, r, index) => (
          <TableTooltip index={index} data={districts}>
            {districts?.length} addresses
          </TableTooltip>
        ),
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
      ...(userType === 'Branch Head'
        ? [
            {
              title: '',
              width: 50,
              dataIndex: 'uuid',
              key: 'uuid',
              render: (uuid) => <Actions id={uuid} />,
            },
          ]
        : []),
    ],
    [userType]
  );

  const debouncedName = useDebounce(filterData.name, 500);
  const debouncedDescription = useDebounce(filterData.description, 500);
  const debouncedMembers = useDebounce(filterData.memberName, 500);
  const debouncedLead = useDebounce(filterData.leadId, 500);

  const handleStatusClick = (status) => {
    if (status === 'active') setTeamsSearchData({ disabled: false, status: status });
    else if (status === 'disabled') setTeamsSearchData({ disabled: true, status: status });
    else setTeamsSearchData({ disabled: '', status: status });
    setActiveStatus(status);
  };

  const onPaginationChange = (page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    setTeamsSearchData({ offset });
  };

  const handleResetAllFilters = () => {
    setActiveStatus('All statuses');
    setResetRegions([]);
    resetSearchData();
    setFilterData({
      name: '',
      description: '',
      memberName: '',
      leadId: '',
    });
  };

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };
  const handleChangeInput = (value, key) => {
    setFirst(true);
    setFilterData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleClearInput = (fieldName) => {
    setFirst(true);
    setFilterData({
      ...filterData,
      [fieldName]: '',
    });
  };

  const handleClearAll = () => {
    setFilterData({
      name: '',
      description: '',
      memberName: '',
      leadId: '',
    });
    setTeamsSearchData({ name: '', description: '', memberName: '', leadId: '' });
  };

  const handleFilterSelect = (district) => {
    setTeamsSearchData({ districtIds: district });
  };

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
        title: 'Head',
        dataIndex: 'lead',
        render: (lead) => {
          return (
            <Name>
              {lead?.name} {lead?.surname}
            </Name>
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

  const districtValue = searchData.districtIds.map((value) => {
    const matched = districts.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });

  const handleChangeInputHead = (e) => {
    setFirst(true);
    setFilterData((prev) => ({
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

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <ExpandedLabel>{row.description}</ExpandedLabel>
        <Row>
          <ExpandedLabel>{`(${row.districts?.length ?? 0}) Districts`}</ExpandedLabel>
          <ExpandedValue>{row.districts?.map((item) => item?.name).join(', ')}</ExpandedValue>
        </Row>
      </ExpandableWrapper>
      {userType === 'Branch Head' && (
        <MobileActionsWrapper>
          <Actions hideTrigger disabled={row.deletedAt !== null} id={row.uuid} />
        </MobileActionsWrapper>
      )}
    </>
  );

  return (
    <ViewContainer>
      <Header>
        <Name>
          {userType !== 'Branch Head' && userType !== 'Team Lead' && (
            <>
              <SubName className="disable">Departments</SubName>
              <Separator>|</Separator>
            </>
          )}
          {userType !== 'Team Lead' && (
            <>
              <SubName onClick={() => navigate(-1)}>Branches</SubName>
              <Separator>|</Separator>
            </>
          )}
          Teams
        </Name>
        {userType === 'Branch Head' ? <Create /> : <div className="h-38" />}
      </Header>

      {JSON.stringify(defaultSearchData) === JSON.stringify(searchData) &&
      teams?.length === 0 ? null : (
        <FilterContainer>
          <FilterActions>
            <Name>{uuid && uuidBranchName}</Name>
            <ActionsWrapper>
              <Button
                outlined
                onClick={handleClickShowHideFilters}
                className="action-button"
                variant="search"
                active={searchCount > 0}
                clearable={searchCount > 0}
                onClear={handleClickClearSearch}
              >
                Search {searchCount > 0 && ` (${searchCount})`}
              </Button>
              {userType !== 'Team Lead' && (
                <StatusDropdown
                  type="status"
                  options={STATUS_OPTIONS}
                  onStatusClick={handleStatusClick}
                  activeStatus={activeStatus}
                />
              )}
              <FilterSelect
                title="District"
                options={districts}
                onSelect={handleFilterSelect}
                resetRegions={resetRegions}
                defaultValue={districtValue}
              />
              <ResetButton onClick={handleResetAllFilters} />
            </ActionsWrapper>
          </FilterActions>

          <Filters $showFilters={showFilters}>
            <FormRow>
              <Input
                leftIcon={SearchIcon}
                clearable
                onClear={() => handleClearInput('name')}
                label="Name"
                maxLength={50}
                className="m-w-123"
                onChange={(e) => handleChangeInput(e.target.value, 'name')}
                value={filterData.name}
              />
              <Input
                leftIcon={SearchIcon}
                clearable
                onClear={() => handleClearInput('description')}
                maxLength={100}
                label="Description"
                className="m-w-123"
                onChange={(e) => handleChangeInput(e.target.value, 'description')}
                value={filterData.description}
              />

              <Input
                leftIcon={SearchIcon}
                clearable
                onClear={() => handleClearInput('memberName')}
                onChange={(e) => handleChangeInput(e.target.value, 'memberName')}
                value={filterData.memberName}
                className="m-w-123"
                label="Members"
              />
              {userType !== 'Team Lead' && (
                <Select
                  label="Head"
                  value={head.find((item) => item.value === filterData.leadId)}
                  onChange={(e) => handleChangeInputHead(e)}
                  options={head}
                  className="select-st m-w-123"
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
        data={teams}
        columns={columns}
        loading={isLoading}
        onPaginationChange={onPaginationChange}
        emptyText="There are no teams yet"
      />
      <MobileFilter />
      <MobileList
        onPaginationChange={onPaginationChange}
        columns={mobileColumns}
        loading={isLoading}
        data={teams}
        expandable={renderExpandableContent}
      />
    </ViewContainer>
  );
};

export default TeamsView;
