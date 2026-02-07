import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SearchIcon from 'assets/filters/searchIcon.svg';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import Switch from 'common-ui/switch';
import { Table } from 'common-ui/table';
import { STATUS_OPTIONS } from 'constants/constants';
import {
  editProject,
  editSubproject,
  getProjects,
  getSubprojects,
} from 'features/projects/projectsActions';
import {
  selectLoading,
  selectPagesCount,
  selectProjects,
  selectSubProjects,
  selectSuccess,
} from 'features/projects/projectsSlice';
import useDebounce from 'hooks/useDebounce';
import Navigation from 'pages/components/navigation';
import StatusDropdown from 'pages/components/statusDropdown';
import Tag from 'pages/components/tag';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  MobileActionsWrapper,
} from 'pages/userManagement/UserManagement.styles';

import {
  ActionsWrapper,
  Container,
  ExpandableRowWrapper,
  FilterContainer,
  MobileStatus,
  NavWrapper,
  NavWrapperGeneral,
  ProjectLimitSpan,
  Row,
} from './Projects.styles';
import Create from './create';
import Edit from './edit';
import { useProjectSearchParams } from './useSearchData';

const TABS = [
  { name: 'Projects', path: `/project/projects` },
  { name: 'Subprojects', path: `/project/projects/sub` },
];

const ASSIGN_SUBPROJECT = [
  { name: 'Assign subproject to project', path: '/project/projects/assign' },
];

const ASSIGN_TEAM = [
  { name: 'Assign team to subproject', path: '/project/projects/sub/assign' },
];

const Projects = () => {
  const { searchData, setProjectSearchData, resetSearchData } = useProjectSearchParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const projects = useSelector(selectProjects);
  const subProjects = useSelector(selectSubProjects);
  const pagesCount = useSelector(selectPagesCount);
  const [search, setSearch] = useState(searchData.name || '');
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);
  const userType = localStorage.getItem('userType');
  const [first, setFirst] = useState(false);
  const [activeStatus, setActiveStatus] = useState(searchData.status);
  const { pathname } = useLocation();
  const isProject = pathname === '/project/projects';

  const assign = pathname === '/project/projects' ? ASSIGN_SUBPROJECT : ASSIGN_TEAM;

  const debouncedName = useDebounce(search, 500);

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    if (status === 'disabled') setProjectSearchData({ disabled: true, status });
    else if (status === 'active') setProjectSearchData({ disabled: false, status });
    else setProjectSearchData({ disabled: '', status });
  };

  const handleClearInput = () => {
    setSearch('');
    setFirst(true);
  };

  const onPaginationChange = (page) => {
    const offset = (page - 1) * 10;
    setProjectSearchData({ offset });
  };

  const handleSwitchProjectToggle = (record) => {
    const params = {
      uuid: record.uuid,
      disabled: !record.disabled,
    };

    dispatch(editProject(params));
  };

  const handleSwitchSubprojectToggle = (record) => {
    const params = {
      uuid: record.uuid,
      disabled: !record.disabled,
    };

    dispatch(editSubproject(params));
  };

  const handleResetAllFilters = () => {
    setSearch('');
    setActiveStatus('active');
    resetSearchData();
  };

  const handlChange = (e) => {
    setFirst(true);
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (first) setProjectSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    setFirst(true);
    pathname === '/project/projects'
      ? dispatch(getProjects(searchData))
      : dispatch(getSubprojects(searchData));
  }, [JSON.stringify(searchData), success, pathname]);

  useEffect(() => {
    if (first) handleResetAllFilters();
  }, [pathname]);

  const PROJECT_COLUMNS = useMemo(
    () => [
      {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) => <ProjectLimitSpan>{name}</ProjectLimitSpan>,
        width: 350,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description) => <ProjectLimitSpan>{description ?? '-'}</ProjectLimitSpan>,
      },
      {
        title: 'Project Type',
        dataIndex: 'projectType',
        key: 'projectType',
        width: 500,
        render: (projectType) => (
          <ProjectLimitSpan>{projectType?.name || '-'}</ProjectLimitSpan>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'disabled',
        key: 'disabled',
        width: 120,
        render: (disabled, record) => (
          <>
            {userType === 'General Manager' ? (
              <Switch
                isOn={!disabled}
                onToggle={
                  isProject
                    ? () => handleSwitchProjectToggle(record)
                    : () => handleSwitchSubprojectToggle(record)
                }
                disabled={record.hasActiveSubprojects}
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
              width: 70,
              key: 'uuid',
              render: (_, r) => <Edit data={r} />,
            },
          ]
        : []),
    ],
    [userType, isProject]
  );

  const SUBPROJECT_COLUMNS = useMemo(
    () => [
      {
        title: 'Subproject Name',
        dataIndex: 'name',
        key: 'name',
        width: 350,
        render: (name) => <ProjectLimitSpan>{name}</ProjectLimitSpan>,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description) => <ProjectLimitSpan>{description ?? '-'}</ProjectLimitSpan>,
      },
      {
        title: 'Subproject Type',
        dataIndex: 'subprojectType',
        key: 'subprojectType',
        width: 500,
        render: (subprojectType) => (
          <ProjectLimitSpan>{subprojectType || '-'}</ProjectLimitSpan>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'disabled',
        key: 'disabled',
        width: 120,
        render: (disabled, record) => (
          <>
            {userType === 'General Manager' ? (
              <Switch
                isOn={!disabled}
                onToggle={
                  isProject
                    ? () => handleSwitchProjectToggle(record)
                    : () => handleSwitchSubprojectToggle(record)
                }
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
              width: 70,
              render: (_, r) => <Edit data={r} />,
            },
          ]
        : []),
    ],
    [userType, isProject]
  );

  const MOBILE_PROJECT_COLUMNS = useMemo(
    () => [
      {
        title: 'Project Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) => <ProjectLimitSpan>{name}</ProjectLimitSpan>,
      },
      {
        title: 'Status',
        dataIndex: 'disabled',
        key: 'disabled',
        render: (disabled, record) => (
          <MobileStatus>
            {userType === 'General Manager' ? (
              <Switch
                isOn={!disabled}
                onToggle={
                  isProject
                    ? () => handleSwitchProjectToggle(record)
                    : () => handleSwitchSubprojectToggle(record)
                }
                disabled={false}
              />
            ) : (
              <Tag type="statuses" variant={disabled ? 'Disabled' : 'Active'} />
            )}
          </MobileStatus>
        ),
      },
    ],
    [userType, isProject]
  );

  const MOBILE_SUBPROJECT_COLUMNS = useMemo(
    () => [
      {
        title: 'Subproject Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) => <ProjectLimitSpan>{name}</ProjectLimitSpan>,
      },
      {
        title: 'Status',
        dataIndex: 'disabled',
        key: 'disabled',
        render: (disabled, record) => (
          <MobileStatus>
            {userType === 'General Manager' ? (
              <Switch
                isOn={!disabled}
                onToggle={
                  isProject
                    ? () => handleSwitchProjectToggle(record)
                    : () => handleSwitchSubprojectToggle(record)
                }
                disabled={false}
              />
            ) : (
              <Tag type="statuses" variant={disabled ? 'Disabled' : 'Active'} />
            )}
          </MobileStatus>
        ),
      },
    ],
    [userType, isProject]
  );

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <ExpandedLabel>{row.description ?? '-'}</ExpandedLabel>
        <ExpandableRowWrapper>
          <ExpandedLabel>
            {row.projectType?.name ? 'Project Type' : 'Subproject type'}
          </ExpandedLabel>
          <ExpandedValue>{row.projectType?.name ?? row?.subprojectType}</ExpandedValue>
        </ExpandableRowWrapper>
      </ExpandableWrapper>
      {userType === 'General Manager' && (
        <MobileActionsWrapper>
          <Edit data={row} />
        </MobileActionsWrapper>
      )}
    </>
  );

  return (
    <Container>
      <Row>
        <NavWrapper>
          <Navigation className="nav" tabs={TABS} />
        </NavWrapper>
        {userType === 'General Manager' && (
          <NavWrapperGeneral>
            <Navigation tabs={assign} />
          </NavWrapperGeneral>
        )}
      </Row>
      <FilterContainer>
        <ActionsWrapper>
          <Input
            leftIcon={SearchIcon}
            clearable
            value={search}
            onChange={(e) => handlChange(e)}
            onClear={() => handleClearInput('name')}
            className="m-w-173 h-38"
            placeholder="Search..."
            maxLength={50}
          />
          <StatusDropdown
            type="status"
            options={STATUS_OPTIONS}
            onStatusClick={handleStatusClick}
            activeStatus={activeStatus}
          />
          <ResetButton onClick={handleResetAllFilters} />
        </ActionsWrapper>
        {userType === 'General Manager' && <Create />}
      </FilterContainer>
      <Table
        data={pathname === '/project/projects' ? projects : subProjects}
        columns={pathname === '/project/projects' ? PROJECT_COLUMNS : SUBPROJECT_COLUMNS}
        loading={pathname === '/project/projects' ? isLoading.projects : isLoading.subProjects}
        hover={true}
        onPaginationChange={onPaginationChange}
        totalPages={pagesCount}
        currentPage={currentPage}
      />

      <MobileList
        data={pathname === '/project/projects' ? projects : subProjects}
        columns={
          pathname === '/project/projects' ? MOBILE_PROJECT_COLUMNS : MOBILE_SUBPROJECT_COLUMNS
        }
        loading={pathname === '/project/projects' ? isLoading.projects : isLoading.subProjects}
        onPaginationChange={onPaginationChange}
        totalPages={pagesCount}
        currentPage={currentPage}
        expandable={renderExpandableContent}
      />
    </Container>
  );
};

export default Projects;
