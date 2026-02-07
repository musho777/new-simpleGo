import { memo, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
import { getDepartments } from 'features/departments/departmentsActions';
import {
  selectDepartments,
  selectHeads,
  selectLoading,
  selectPagesCount,
  selectShowFilters,
  selectUpdateSuccess,
  setCurrentPage,
  setShowFilters,
} from 'features/departments/departmentsSlice';
import useDebounce from 'hooks/useDebounce';
import StatusDropdown from 'pages/components/statusDropdown';
import Tag from 'pages/components/tag';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  MobileActionsWrapper,
  Row,
} from 'pages/userManagement/UserManagement.styles';
import { generateOptions } from 'utils';

import Create from './Create';
import {
  ActionsWrapper,
  BranchesNavigationLink,
  ClearAllText,
  DescriptionLimitSpan,
  FilterActions,
  FilterContainer,
  Filters,
  FormRow,
  Header,
  Icon,
  LightTooltip,
  Name,
  RightSideContainer,
  StatusIcon,
  StatusWrapper,
  ViewContainer,
} from './Departments.styles';
import Actions from './actions/Actions';
import MobileFilter from './mobileFilter';
import { useDepartmentSearchParams } from './useSearchData';

const DepartmentsView = () => {
  const { searchData, setDepartmentSearchData, resetSearchData, defaultSearchData } =
    useDepartmentSearchParams();
  const userType = localStorage.getItem('userType');
  const showFilters = useSelector(selectShowFilters);
  const [activeStatus, setActiveStatus] = useState(searchData.status || 'Status');
  const departments = useSelector(selectDepartments);
  const heads = useSelector(selectHeads);
  const head = generateOptions(heads);
  const updateDepartmentsSuccess = useSelector(selectUpdateSuccess);

  const [fildData, setFildData] = useState({
    name: searchData.name || '',
    description: searchData.description,
    headId: searchData.headId,
  });

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const isLoading = useSelector(selectLoading);
  const pagesCount = useSelector(selectPagesCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debouncedDescription = useDebounce(fildData.description, 500);
  const debouncedName = useDebounce(fildData.name, 500);
  const debouncedheadId = useDebounce(fildData.headId, 500);

  const [first, setFirst] = useState(false);

  const handleStatusClick = (status) => {
    if (status === 'active') setDepartmentSearchData({ disabled: false, status: status });
    else if (status === 'disabled')
      setDepartmentSearchData({ disabled: true, status: status });
    else setDepartmentSearchData({ disabled: '', status: status });
    setActiveStatus(status);
  };

  const handleClickClearSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleResetAllFilters();
  };

  const onPaginationChange = (page) => {
    dispatch(setCurrentPage(page));
    const limit = 10;
    const offset = (page - 1) * limit;
    setDepartmentSearchData({ offset });
  };

  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'description'];

    const searchCount = searchKeys.reduce((count, key) => {
      const value = filters[key];
      return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
    }, 0);

    return { searchCount };
  };

  const { searchCount } = getSearchAndFilterCount(searchData);

  const handleResetAllFilters = () => {
    setActiveStatus('Status');
    resetSearchData();
    setFildData({
      name: '',
      description: '',
      headId: '',
    });
  };

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };

  const handleClearAll = () => {
    setFildData({
      name: '',
      description: '',
      headId: '',
    });
    setDepartmentSearchData({ name: '', description: '', headId: '' });
  };

  const handleChangeInput = (key, value) => {
    setFirst(true);
    setFildData({
      ...fildData,
      [key]: value,
    });
  };

  const handleChangeInputHead = (e) => {
    setFirst(true);
    setFildData({
      ...fildData,
      headId: e?.value,
    });
  };

  useEffect(() => {
    if (first) setDepartmentSearchData({ description: debouncedDescription });
  }, [debouncedDescription]);

  useEffect(() => {
    if (first) setDepartmentSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setDepartmentSearchData({ headId: debouncedheadId });
  }, [debouncedheadId]);

  useEffect(() => {
    if (updateDepartmentsSuccess && userType === 'Super Admin') {
      dispatch(getDepartments(searchData));
    }
  }, [updateDepartmentsSuccess]);

  useEffect(() => {
    dispatch(getDepartments(searchData));
  }, [JSON.stringify(searchData)]);

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
        title: 'Branches',
        dataIndex: 'uuid',
        key: 'branches',
        render: (uuid, e) => {
          const branchesCount = e?.branches ?? 0;
          const isClickable = !(userType !== 'Department Head' && branchesCount === 0);
          return (
            <BranchesNavigationLink
              onClick={() => {
                if (isClickable) {
                  navigate(`/departments/branches/${uuid}`);
                }
              }}
              $active={branchesCount !== 0}
              $isClickable={isClickable}
            >
              {branchesCount === 0 ? 'No Branches' : `${branchesCount} branches`}
            </BranchesNavigationLink>
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
        render: (description) => (
          <LightTooltip
            title={description.length > 20 ? description : ''}
            placement="top-start"
          >
            <DescriptionLimitSpan>{description || '-'}</DescriptionLimitSpan>
          </LightTooltip>
        ),
      },
      {
        title: 'Head',
        dataIndex: 'head',
        key: 'head',
        render: (head) =>
          head?.name || head?.surname
            ? `${head?.name || ''} ${head?.surname || ''}`.trim()
            : '-',
      },
      {
        title: 'Branches',
        dataIndex: 'uuid',
        key: 'branches',
        render: (uuid, e) => {
          const branchesCount = e?.branches ?? 0;
          const isClickable = !(userType !== 'Department Head' && branchesCount === 0);
          return (
            <BranchesNavigationLink
              onClick={() => {
                if (isClickable) {
                  navigate(`/departments/branches/${uuid}`);
                }
              }}
              $active={branchesCount !== 0}
              $isClickable={isClickable}
            >
              {branchesCount === 0 ? 'No Branches' : `${branchesCount} branches`}
            </BranchesNavigationLink>
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
      ...(userType === 'Super Admin'
        ? [
            {
              title: '',
              dataIndex: 'uuid',
              width: 50,
              key: 'uuid',
              render: (uuid) => <Actions id={uuid} />,
            },
          ]
        : []),
    ],
    [userType, navigate]
  );

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Head</ExpandedLabel>
          <ExpandedValue>
            {row.head?.name} {row.head?.surname}
          </ExpandedValue>
        </Row>
        <ExpandedLabel>{row.description}</ExpandedLabel>
      </ExpandableWrapper>
      {userType === 'Super Admin' && (
        <MobileActionsWrapper>
          <Actions hideTrigger disabled={row.deletedAt !== null} id={row.uuid} />
        </MobileActionsWrapper>
      )}
    </>
  );
  return (
    <ViewContainer>
      <Header>
        <Name>Departments</Name>
        {userType === 'Super Admin' ? <Create /> : <div className="h-38" />}
      </Header>
      {JSON.stringify(defaultSearchData) === JSON.stringify(searchData) &&
      departments?.length === 0 ? null : (
        <FilterContainer>
          <FilterActions>
            <Name />
            <ActionsWrapper>
              <Button
                variant="search"
                outlined
                onClick={handleClickShowHideFilters}
                onClear={handleClickClearSearch}
                active={searchCount > 0}
                clearable={searchCount > 0}
                className="action-button"
              >
                Search {searchCount > 0 ? ` (${searchCount})` : ''}
              </Button>
              {userType !== 'Department Head' && (
                <StatusDropdown
                  type="status"
                  options={STATUS_OPTIONS}
                  onStatusClick={handleStatusClick}
                  activeStatus={activeStatus}
                />
              )}
              <ResetButton onClick={handleResetAllFilters} />
            </ActionsWrapper>
          </FilterActions>
          <Filters $showFilters={showFilters}>
            <FormRow>
              <Input
                leftIcon={SearchIcon}
                clearable
                value={fildData.name}
                onChange={(e) => handleChangeInput('name', e.target.value)}
                onClear={() => handleChangeInput('name', '')}
                className="m-w-138"
                label="Name"
                maxLength={50}
              />
              <Input
                leftIcon={SearchIcon}
                clearable
                value={fildData.description}
                onChange={(e) => handleChangeInput('description', e.target.value)}
                onClear={() => handleChangeInput('description', '')}
                label="Description"
                className="m-w-138"
                maxLength={100}
              />
              {userType !== 'Department Head' && (
                <Select
                  label="Department Head"
                  value={head.find((item) => item.value === fildData.headId)}
                  onChange={(e) => handleChangeInputHead(e)}
                  options={head}
                  className="select-st m-w-138"
                  isClearable
                  maxLength={50}
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
        loading={isLoading}
        data={departments}
        columns={columns}
        hover={true}
        onPaginationChange={onPaginationChange}
      />
      <MobileFilter />
      <MobileList
        columns={mobileColumns}
        data={departments}
        onPaginationChange={onPaginationChange}
        expandable={renderExpandableContent}
        totalPages={pagesCount}
        currentPage={currentPage}
        loading={isLoading}
      />
    </ViewContainer>
  );
};

export default memo(DepartmentsView);
