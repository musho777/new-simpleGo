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
import { editProjectType, getProjectTypes } from 'features/projects/projectsActions';
import {
  selectLoading,
  selectPagesCount,
  selectProjectTypes,
  selectSuccess,
} from 'features/projects/projectsSlice';
import useDebounce from 'hooks/useDebounce';
import StatusDropdown from 'pages/components/statusDropdown';
import Tag from 'pages/components/tag';
import {
  ExpandableWrapper,
  ExpandedLabel,
  MobileActionsWrapper,
} from 'pages/userManagement/UserManagement.styles';

import { ActionsWrapper, FilterContainer } from '../projects/Projects.styles';
import { Container, MobileStatus, TypeLimitSpan } from './Types.styles';
import Create from './create';
import Edit from './edit';
import { useProjectTypeSearchParams } from './useSearchData';

const Types = () => {
  const { searchData, setTypeSearchData, resetSearchData } = useProjectTypeSearchParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const types = useSelector(selectProjectTypes);
  const [firstPage, setFirstPage] = useState(false);
  const [name, setName] = useState(searchData?.name || '');
  const [activeStatus, setActiveStatus] = useState(searchData.status || 'Status');
  const pagesCount = useSelector(selectPagesCount);
  const userType = localStorage.getItem('userType');
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const debouncedName = useDebounce(name, 500);

  const handleStatusClick = (status) => {
    setActiveStatus(status);
    if (status === 'disabled') setTypeSearchData({ disabled: true, status });
    else if (status === 'active') setTypeSearchData({ disabled: false, status });
    else setTypeSearchData({ disabled: '', status });
  };

  const handleClearInput = () => {
    setTypeSearchData({ name: '' });
    setName('');
  };
  const handlChange = (value) => {
    setFirstPage(true);
    setName(value);
  };

  const onPaginationChange = (page) => {
    const offset = (page - 1) * 10;
    setTypeSearchData({ offset });
  };

  const handleSwitchToggle = (record) => {
    const params = {
      uuid: record.uuid,
      disabled: !record.disabled,
    };

    dispatch(editProjectType(params));
  };

  const handleResetAllFilters = () => {
    resetSearchData();
    setName('');
    setActiveStatus('active');
  };

  useEffect(() => {
    if (firstPage) {
      setTypeSearchData({ name: debouncedName });
    }
  }, [debouncedName, firstPage]);

  useEffect(() => {
    dispatch(getProjectTypes(searchData));
  }, [JSON.stringify(searchData), success, pathname]);

  const COLUMNS = useMemo(
    () => [
      {
        title: 'Type Name',
        dataIndex: 'name',
        key: 'name',
        render: (description) => <TypeLimitSpan>{description}</TypeLimitSpan>,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description) => <TypeLimitSpan>{description || '-'}</TypeLimitSpan>,
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
              width: 70,
              render: (uuid, r) => (
                <Edit
                  name={r.name}
                  description={r.description}
                  disabled={r.disabled}
                  uuid={uuid}
                />
              ),
            },
          ]
        : []),
    ],
    [userType]
  );

  const MOBILE_COLUMNS = useMemo(
    () => [
      {
        title: 'Type Name',
        dataIndex: 'name',
        key: 'name',
        render: (description) => <TypeLimitSpan>{description}</TypeLimitSpan>,
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
                onToggle={() => handleSwitchToggle(record)}
                disabled={false}
              />
            ) : (
              <Tag type="statuses" variant={disabled ? 'Disabled' : 'Active'} />
            )}
          </MobileStatus>
        ),
      },
    ],
    [userType]
  );

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <ExpandedLabel>{row.description}</ExpandedLabel>
      </ExpandableWrapper>
      {userType === 'General Manager' && (
        <MobileActionsWrapper>
          <Edit
            name={row.name}
            description={row.description}
            disabled={row.disabled}
            uuid={row.uuid}
          />
        </MobileActionsWrapper>
      )}
    </>
  );

  return (
    <Container>
      <FilterContainer>
        <ActionsWrapper>
          <Input
            leftIcon={SearchIcon}
            onChange={(e) => handlChange(e.target.value)}
            value={name}
            clearable
            onClear={() => handleClearInput('name')}
            className="m-w-173 h-38"
            placeholder="Search by name..."
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
        data={types}
        columns={COLUMNS}
        loading={isLoading.projectTypes}
        hover={true}
        onPaginationChange={onPaginationChange}
        totalPages={pagesCount}
        currentPage={currentPage}
      />

      <MobileList
        data={types}
        columns={MOBILE_COLUMNS}
        loading={isLoading.projectTypes}
        onPaginationChange={onPaginationChange}
        totalPages={pagesCount}
        currentPage={currentPage}
        expandable={renderExpandableContent}
      />
    </Container>
  );
};

export default Types;
