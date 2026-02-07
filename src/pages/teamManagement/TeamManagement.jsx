import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchIcon from 'assets/filters/searchIcon.svg';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import Switch from 'common-ui/switch';
import { Table } from 'common-ui/table';
import { STATUS_OPTIONS } from 'constants/constants';
import { editTeam, getTeams } from 'features/teamManagement/teamManagementActions';
import {
  selectLoading,
  selectPagesCount,
  selectSuccess,
  selectTeams,
} from 'features/teamManagement/teamManagementSlice';
import useDebounce from 'hooks/useDebounce';
import Navigation from 'pages/components/navigation';
import StatusDropdown from 'pages/components/statusDropdown';
import Tag from 'pages/components/tag';
import {
  ActionsWrapper,
  ExpandableRowWrapper,
  FilterContainer,
} from 'pages/project/projects/Projects.styles';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  MobileActionsWrapper,
} from 'pages/userManagement/UserManagement.styles';

import { Container } from './TeamManagement.styles';
import CreateEdit from './createEdit';
import { useTeamsSearchParams } from './useSearchData';

const TABS = [
  { path: '/team-management', name: 'Team' },
  { path: '/team-management/membership', name: 'Team membership' },
];

const truncateText = (text, maxLength = 40) => {
  if (!text) return '-';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const TeamManagement = () => {
  const { searchData, setTeamsSearchData, resetSearchData } = useTeamsSearchParams();

  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const success = useSelector(selectSuccess);
  const pagesCount = useSelector(selectPagesCount);
  const [first, setFirst] = useState(false);
  const [search, setSearch] = useState(searchData.name || '');
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);
  const isLoading = useSelector(selectLoading);
  const [activeStatus, setActiveStatus] = useState(searchData.status);
  const userType = localStorage.getItem('userType');

  const debouncedName = useDebounce(search, 500);

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    if (status === 'disabled') setTeamsSearchData({ disabled: true, status });
    else if (status === 'active') setTeamsSearchData({ disabled: false, status });
    else setTeamsSearchData({ disabled: '', status });
  };

  const handleClearInput = () => {
    setFirst(true);
    setSearch('');
  };

  const onPaginationChange = (page) => {
    const offset = (page - 1) * 10;
    setTeamsSearchData({ offset });
  };

  const handleSwitchToggle = (record) => {
    const params = {
      uuid: record.uuid,
      disabled: !record.disabled,
    };

    dispatch(editTeam(params));
  };

  const handleResetFilters = () => {
    setSearch('');
    setActiveStatus('active');
    resetSearchData();
  };
  const handleChange = (e) => {
    setFirst(true);
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(getTeams(searchData));
  }, [JSON.stringify(searchData), success]);

  useEffect(() => {
    if (first) setTeamsSearchData({ name: debouncedName });
  }, [debouncedName]);

  const COLUMNS = useMemo(
    () => [
      {
        title: 'Team Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) => <>{truncateText(name)}</>,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description) => <>{truncateText(description || '-')}</>,
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (department) => <>{department?.name || '-'}</>,
      },
      {
        title: 'Team Lead',
        dataIndex: 'lead',
        key: 'lead',
        render: (lead) => {
          const fullName = [lead?.name, lead?.surname].filter(Boolean).join(' ');
          return <>{fullName || '-'}</>;
        },
      },
      {
        title: 'Status',
        dataIndex: 'disabled',
        key: 'disabled',
        render: (disabled, record) => (
          <>
            {userType === 'General Manager' ? (
              <Switch
                isOn={!disabled}
                onToggle={() => handleSwitchToggle(record)}
                disabled={false}
              />
            ) : (
              <Tag type="statuses" variant={disabled ? 'Disabled' : 'Active'} />
            )}
          </>
        ),
      },
      ...(userType === 'General Manager'
        ? [
            {
              title: '',
              dataIndex: 'uuid',
              key: 'uuid',
              render: (_, r) => <CreateEdit editMode data={r} />,
            },
          ]
        : []),
    ],
    [userType]
  );

  const MOBILE_COLUMNS = useMemo(
    () => [
      {
        title: 'Team Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) => <>{truncateText(name)}</>,
      },
      {
        title: 'Status',
        dataIndex: 'disabled',
        key: 'disabled',
        render: (disabled, record) => (
          <>
            {userType === 'General Manager' ? (
              <Switch
                isOn={!disabled}
                onToggle={() => handleSwitchToggle(record)}
                disabled={false}
              />
            ) : (
              <Tag type="statuses" variant={disabled ? 'Disabled' : 'Active'} />
            )}
          </>
        ),
      },
    ],
    [userType]
  );

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <ExpandedLabel>{truncateText(row.description)}</ExpandedLabel>
        <ExpandableRowWrapper>
          <ExpandedLabel>Team Lead</ExpandedLabel>
          <ExpandedValue>
            {row?.lead?.name} {row?.lead?.surname}
          </ExpandedValue>
        </ExpandableRowWrapper>
        <ExpandableRowWrapper>
          <ExpandedLabel>Department</ExpandedLabel>
          <ExpandedValue>{row?.department?.name}</ExpandedValue>
        </ExpandableRowWrapper>
      </ExpandableWrapper>
      {userType === 'General Manager' && (
        <MobileActionsWrapper>
          <CreateEdit data={row} />
        </MobileActionsWrapper>
      )}
    </>
  );

  return (
    <Container>
      {userType === 'General Manager' && <Navigation tabs={TABS} />}
      <FilterContainer>
        <ActionsWrapper>
          <Input
            maxLength={50}
            leftIcon={SearchIcon}
            clearable
            value={search}
            onClear={() => handleClearInput('name')}
            className="m-w-173 h-38"
            placeholder="search"
            onChange={(e) => handleChange(e)}
          />
          <StatusDropdown
            type="status"
            options={STATUS_OPTIONS}
            onStatusClick={handleStatusClick}
            activeStatus={activeStatus}
          />
          <ResetButton onClick={handleResetFilters} />
        </ActionsWrapper>
        {userType === 'General Manager' && <CreateEdit />}
      </FilterContainer>
      <Table
        data={teams}
        columns={COLUMNS}
        totalPages={pagesCount}
        currentPage={currentPage}
        loading={isLoading.teams}
        hover={true}
        onPaginationChange={onPaginationChange}
      />

      <MobileList
        data={teams}
        columns={MOBILE_COLUMNS}
        totalPages={pagesCount}
        currentPage={currentPage}
        loading={isLoading.teams}
        onPaginationChange={onPaginationChange}
        expandable={renderExpandableContent}
      />
    </Container>
  );
};

export default TeamManagement;
