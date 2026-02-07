import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CloseSvg from 'assets/filters/close.svg';
import Profile from 'assets/filters/profile.svg';
import SearchIcon from 'assets/filters/searchIcon.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import ResetButton from 'common-ui/resetButton';
import { Table } from 'common-ui/table';
import Tooltip from 'common-ui/tooltip';
import {
  OCCUPATION_OPTIONS,
  SYSTEM_USERS,
  USERS,
  USER_STATUS_OPTIONS,
} from 'constants/constants';
import { getUsers } from 'features/users/usersActions';
import {
  selectFilterRoles,
  selectIsContactViewModalOpen,
  selectLoading,
  selectShowFilters,
  selectUsers,
  selectUsersCount,
  setIsContactViewModalOpen,
  setShowFilters,
} from 'features/users/usersSlice';
import useDebounce from 'hooks/useDebounce';
import FilterSelect from 'pages/components/filterSelect';
import StatusDropdown from 'pages/components/statusDropdown';
import Switch from 'pages/components/switch';
import Tag from 'pages/components/tag';
import UserCard from 'pages/components/userCard';
import { daysLeftUntil30Days } from 'utils/dateUtils';

import Create from './Create';
import {
  ActionIcon,
  ActionsWrapper,
  ClearAllText,
  CloseIcon,
  ContactLabel,
  ContactValue,
  EmailLimitSpan,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  FilterActions,
  FilterContainer,
  Filters,
  FormRow,
  InfoWrapper,
  MobileActions,
  MobileActionsWrapper,
  MobileCreateSwitchWrapperHide,
  MobileCreateSwitchWrapperShow,
  Name,
  RightSideContainer,
  Row,
  StatusWrapper,
  ViewContacts,
  ViewContainer,
} from './UserManagement.styles';
import Actions from './actions';
import viewEye from './actions/assets/view.svg';
import MobileFilter from './mobileFilter/';
import { useUserSearchParams } from './useSearchData';

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
    title: 'Status',
    dataIndex: 'isVerified',
    render: (isVerified, record) => (
      <StatusWrapper>
        {record.deletedAt && (
          <Tooltip
            text={`It will disappear from the list after ${daysLeftUntil30Days(record.deletedAt)} days`}
            isMobile={true}
          />
        )}
        <Tag
          type="statuses"
          variant={
            record.deletedAt !== null ? 'Disabled' : isVerified === true ? 'Active' : 'Pending'
          }
        />
      </StatusWrapper>
    ),
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
    title: 'Status',
    dataIndex: 'isVerified',
    key: 'isVerified',
    render: (isVerified, record) => (
      <StatusWrapper>
        {record.deletedAt && (
          <Tooltip
            text={`It will disappear from the list after ${daysLeftUntil30Days(record.deletedAt)} days`}
          />
        )}
        <Tag
          type="statuses"
          variant={
            record.deletedAt !== null ? 'Disabled' : isVerified === true ? 'Active' : 'Pending'
          }
        />
      </StatusWrapper>
    ),
  },
  {
    title: '',
    dataIndex: 'uuid',
    key: 'uuid',
    render: (uuid, e) => {
      const userType = localStorage.getItem('userType');
      const isSystemUsers = SYSTEM_USERS.includes(e.userType) && userType === 'Super Admin';
      const isUsers = USERS.includes(e.userType) && userType === 'Hr Manager';

      if (isSystemUsers || isUsers || (e.deletedAt === null && e.isVerified))
        return (
          <>
            <Actions isVerified={e.isVerified} id={uuid} role={e.userType} row={e} />
          </>
        );
    },
  },
];

const UsersView = () => {
  const { searchData, setUserSearchData, resetSearchData } = useUserSearchParams();
  const [activeStatus, setActiveStatus] = useState(searchData.status || 'Status');
  const [activeRole, setActiveRole] = useState([]);
  const [activeOccupation, setActiveOccupation] = useState([]);
  const [columns, setColumns] = useState([]);
  const [viewDetailsData, setViewDetailsData] = useState({});
  const userType = localStorage.getItem('userType');
  const showFilters = useSelector(selectShowFilters);
  const users = useSelector(selectUsers);
  const count = useSelector(selectUsersCount);
  const pagesCount = Math.ceil(count / searchData.limit);

  const isLoading = useSelector(selectLoading);
  const [first, setFirst] = useState(false);
  const [name, setName] = useState(searchData.name || '');
  const [surname, setSurname] = useState(searchData.surname || '');
  const [email, setEmail] = useState(searchData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(searchData.phoneNumber || '');

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const currentCardsPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 12)) + 1;
  }, [searchData.offset, searchData.limit]);

  const roles = useSelector(selectFilterRoles);
  const isContactViewModalOpen = useSelector(selectIsContactViewModalOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debouncedName = useDebounce(name, 500);
  const debouncedSurname = useDebounce(surname, 500);
  const debouncedEmail = useDebounce(email, 500);
  const debouncedPhoneNumber = useDebounce(phoneNumber, 500);

  const roleValue = searchData.roleIds.map((value) => {
    const matched = roles.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });
  const occupationValue = searchData.occupations.map((value) => {
    const matched = roles.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });

  const getSearchAndFilterCount = (filters) => {
    const searchKeys = ['name', 'surname', 'email', 'phoneNumber'];

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
  const handleViewClick = (e) => {
    setViewDetailsData({
      email: e.email,
      phone: e.phoneNumber,
      role: e.userType,
      occupation: e.occupation,
    });

    dispatch(setIsContactViewModalOpen(true));
  };

  const compactColumns = useMemo(
    () => [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Surname', dataIndex: 'surname', key: 'surname' },
      {
        title: 'Status',
        dataIndex: 'isVerified',
        key: 'isVerified',
        render: (isVerified, record) => (
          <StatusWrapper>
            <Tag
              type="statuses"
              variant={
                record.deletedAt !== null
                  ? 'Disabled'
                  : isVerified === true
                    ? 'Active'
                    : 'Pending'
              }
            />

            {record.deletedAt && (
              <Tooltip
                text={`It will disappear from the list after ${daysLeftUntil30Days(record.deletedAt)} days`}
              />
            )}
          </StatusWrapper>
        ),
      },
      {
        title: 'Details',
        dataIndex: 'email',
        key: 'email',
        render: (_, e) => (
          <>
            <ViewContacts onClick={() => handleViewClick(e)}>View</ViewContacts>
          </>
        ),
      },
      {
        title: '',
        dataIndex: 'uuid',
        width: 50,
        key: 'uuid',
        render: (uuid, e) => {
          const userType = localStorage.getItem('userType');
          const isSystemUsers =
            SYSTEM_USERS.includes(e.userType) && userType === 'Super Admin';
          const isUsers = USERS.includes(e.userType) && userType === 'Hr Manager';
          if (isSystemUsers || isUsers || (e.deletedAt === null && e.isVerified))
            return (
              <>
                <Actions isVerified={e.isVerified} id={uuid} role={e.userType} row={e} />
              </>
            );
        },
      },
    ],
    [handleViewClick]
  );

  const handleStatusClick = (status) => {
    if (status === 'active')
      setUserSearchData({ disabled: '', isVerified: true, status: status });
    else if (status === 'pending')
      setUserSearchData({ disabled: '', isVerified: false, status: status });
    else if (status === 'disable')
      setUserSearchData({ isVerified: '', disabled: true, status: status });
    else setUserSearchData({ disabled: '', isVerified: '', status: status });
    setActiveStatus(status);
  };

  const handleRoleClick = (role) => {
    setUserSearchData({ roleIds: role });
  };

  const handleOccupationClick = (occupations) => {
    setUserSearchData({ occupations });
  };

  const handleClearAll = () => {
    setName('');
    setPhoneNumber('');
    setEmail('');
    setSurname('');
    setUserSearchData({ name: '', surname: '', email: '', phoneNumber: '' });
  };

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };

  const handleChange = (type, value) => {
    setFirst(true);
    if (type === 'name') setName(value);
    else if (type === 'surname') setSurname(value);
    else if (type === 'email') setEmail(value);
    else if (type === 'phoneNumber') setPhoneNumber(value);
  };

  const onPaginationChange = (page) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    setUserSearchData({ offset });
  };

  const onCardsPaginationChange = (page) => {
    const limit = 8;
    const offset = (page - 1) * limit;
    setUserSearchData({ offset });
  };

  const handleResetAllFilters = () => {
    resetSearchData();
    setActiveStatus('Status');
    setName('');
    setPhoneNumber('');
    setEmail('');
    setSurname('');
    setActiveRole([]);
    setActiveOccupation([]);
  };

  const handleNavigatePageView = (uuid) => {
    navigate(`/profile/contacts/${uuid}`);
  };

  useEffect(() => {
    if (first) setUserSearchData({ name: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    if (first) setUserSearchData({ surname: debouncedSurname });
  }, [debouncedSurname]);

  useEffect(() => {
    if (first) setUserSearchData({ email: debouncedEmail });
  }, [debouncedEmail]);

  useEffect(() => {
    if (first) setUserSearchData({ phoneNumber: debouncedPhoneNumber });
  }, [debouncedPhoneNumber]);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 1440) {
        setColumns(compactColumns);
      } else {
        setColumns(allColumns);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  useEffect(() => {
    setActiveStatus(searchData.status || 'Status');
    setName(searchData.name || '');
    setSurname(searchData.surname || '');
    setEmail(searchData.email || '');
    setPhoneNumber(searchData.phoneNumber || '');
    setActiveRole(roleValue);
    setActiveOccupation(occupationValue);
    dispatch(getUsers(searchData));
  }, [JSON.stringify(searchData)]);

  const renderExpandableContent = (row) => {
    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>E-mail</ExpandedLabel>
            <ExpandedValue>{row.email}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Phone</ExpandedLabel>
            <ExpandedValue>{row.phoneNumber}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Occupation</ExpandedLabel>
            <ExpandedValue>{row.occupation}</ExpandedValue>
          </Row>
        </ExpandableWrapper>
        <MobileActionsWrapper>
          <MobileActions>
            <div>
              <Actions id={row.uuid} role={row.userType} row={row} isMobile />
            </div>
            {row.deletedAt === null && (
              <div onClick={() => handleNavigatePageView(row.uuid)}>
                <ActionIcon src={viewEye} />
              </div>
            )}
          </MobileActions>
        </MobileActionsWrapper>
      </>
    );
  };
  return (
    <ViewContainer>
      <Modal
        closeIcon
        isOpen={isContactViewModalOpen}
        onClose={() => dispatch(setIsContactViewModalOpen(false))}
      >
        <InfoWrapper>
          <div>
            <ContactLabel>Email address</ContactLabel>
            <ContactValue>{viewDetailsData.email}</ContactValue>
          </div>
          <div>
            <ContactLabel>Phone number</ContactLabel>
            <ContactValue>{viewDetailsData.phone}</ContactValue>
          </div>
          <div>
            <ContactLabel>Role</ContactLabel>
            <ContactValue>{viewDetailsData.role}</ContactValue>
          </div>

          {viewDetailsData.occupation && (
            <div>
              <ContactLabel>Occupation</ContactLabel>
              <ContactValue>{viewDetailsData.occupation}</ContactValue>
            </div>
          )}
        </InfoWrapper>
      </Modal>
      <MobileCreateSwitchWrapperShow>
        <Switch
          page="users"
          onSwitch={(view) => {
            setUserSearchData({ limit: view === 'grid' ? 8 : 10, view });
          }}
        />
        {(userType === 'Hr Manager' || userType === 'Super Admin') && <Create />}
      </MobileCreateSwitchWrapperShow>
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
            <StatusDropdown
              type="status"
              options={USER_STATUS_OPTIONS}
              onStatusClick={handleStatusClick}
              activeStatus={activeStatus}
            />
            <FilterSelect
              title="Roles"
              options={roles}
              onSelect={handleRoleClick}
              resetRegions={activeRole}
              icon={Profile}
              defaultValue={roleValue}
            />
            <FilterSelect
              title="Occupations"
              options={OCCUPATION_OPTIONS}
              onSelect={handleOccupationClick}
              resetRegions={activeOccupation}
              icon={Profile}
              defaultValue={occupationValue}
            />
            <ResetButton onClick={handleResetAllFilters} />
          </ActionsWrapper>
          <ActionsWrapper>
            <MobileCreateSwitchWrapperHide>
              <Switch
                page="users"
                value={searchData.view}
                onSwitch={(view) => {
                  setUserSearchData({ limit: view === 'grid' ? 8 : 10, view });
                }}
              />

              {(userType === 'Hr Manager' || userType === 'Super Admin') && <Create />}
            </MobileCreateSwitchWrapperHide>
          </ActionsWrapper>
        </FilterActions>

        <Filters $showFilters={showFilters}>
          <FormRow>
            <Input
              label="Name"
              leftIcon={SearchIcon}
              clearable
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
              onClear={() => {
                handleChange('name', '');
              }}
              className="m-w-123"
            />
            <Input
              label="Surname"
              leftIcon={SearchIcon}
              clearable
              value={surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              onClear={() => handleChange('surname', '')}
              className="m-w-123"
            />
            <Input
              label="Email"
              leftIcon={SearchIcon}
              clearable
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
              onClear={() => handleChange('email', '')}
              className="m-w-187"
            />
            <Input
              label="Phone number"
              leftIcon={SearchIcon}
              clearable
              type="number"
              value={phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              onClear={() => handleChange('phoneNumber', '')}
              className="m-w-123"
            />
          </FormRow>
          <RightSideContainer>
            <CloseIcon src={CloseSvg} alt="close" onClick={handleClickShowHideFilters} />
            <ClearAllText onClick={handleClearAll}>Clear All</ClearAllText>
          </RightSideContainer>
        </Filters>
      </FilterContainer>
      <MobileFilter />

      {searchData.view === 'list' ? (
        <>
          <Table
            data={users}
            columns={columns}
            emptyText="No results found."
            totalPages={pagesCount}
            loading={isLoading}
            onPaginationChange={onPaginationChange}
            currentPage={currentPage}
          />
          <MobileList
            columns={mobileColumns}
            data={users}
            expandable={renderExpandableContent}
            onPaginationChange={onPaginationChange}
            currentPage={currentPage}
            loading={isLoading}
            totalPages={pagesCount}
          />
        </>
      ) : (
        <UserCard
          users={users}
          onPaginationChange={onCardsPaginationChange}
          currentPage={currentCardsPage}
          loading={isLoading}
          totalPages={pagesCount}
        />
      )}
    </ViewContainer>
  );
};

export default UsersView;
