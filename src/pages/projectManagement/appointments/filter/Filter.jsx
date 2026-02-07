import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import close from 'assets/filters/close.svg';
import userActive from 'assets/tickets/user-active.svg';
import user from 'assets/tickets/user.svg';
import usersActive from 'assets/tickets/users-active.svg';
import users from 'assets/tickets/users.svg';
import watchActive from 'assets/tickets/watch-active.svg';
import watch from 'assets/tickets/watch.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import ResetButton from 'common-ui/resetButton';
import { TooltipText } from 'common-ui/tooltip/Tooltip.styles';
import {
  TICKET_PRIORITY_OPTIONS,
  TICKET_STATUS_OPTIONS,
  TICKET_TRACKER_OPTIONS,
} from 'constants/constants';
import dayjs from 'dayjs';
import {
  getAssigneesForFilter,
  getCreatedByForFilter,
  getProjectsForFilter,
  getSubprojectsForFilter,
} from 'features/projectManagement/ProjectManagementActions';
import {
  selectAssigneesForFilter,
  selectCreatedByForFilter,
  selectProjectsForFilter,
  selectSubprojectsForFilter,
  selectTicketAssignTypes,
} from 'features/projectManagement/ProjectManagementSlice';
import useDebounce from 'hooks/useDebounce';
import FilterSelect from 'pages/components/filterSelect';
import { ClearAllText } from 'pages/userManagement/UserManagement.styles';

import {
  ActionsWrapper,
  BottomSheet,
  CalendarTypeWrapper,
  CalendarWrapper,
  CloseIconWrapper,
  Column,
  FilterActionsWrapper,
  FilterAllWrapper,
  FilterContainer,
  Icon,
  IconCircle,
  IconCircleNewCount,
  Line,
  LineWrapper,
  MobileCreateSwitchWrapperShow,
  MobileFilterRow,
  Row,
  SearchArea,
  TicketTypeWrapper,
} from './Filter.styles';
import line from './line.svg';
import { useTicketSearchParams } from './useSearchData';

const getSearchAndFilterCount = (filters) => {
  const searchKeys = ['taskId', 'search', 'customerId'];
  const filterKeys = [
    'projectIds',
    'subprojectIds',
    'teamIds',
    'assigneeIds',
    'priorities',
    'createdByIds',
    'status',
    'trackers',
  ];

  const searchCount = searchKeys.reduce((count, key) => {
    const value = filters[key];
    return count + (typeof value === 'string' && value.trim() !== '' ? 1 : 0);
  }, 0);

  const filterCount = filterKeys.reduce((count, key) => {
    const value = filters[key];
    return count + (Array.isArray(value) && value.length > 0 ? 1 : 0);
  }, 0);

  return { searchCount, filterCount };
};

const Filter = ({ setView }) => {
  const { uuid } = useParams();
  const { searchData, setTicketSearchData, resetSearchData } = useTicketSearchParams();
  const { searchCount, filterCount } = getSearchAndFilterCount(searchData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ticketId, setTicketId] = useState(searchData.taskId || '');
  const [ticketTitleDescription, setTicketTitleDescription] = useState(
    searchData.search || ''
  );
  const [customerId, setCustomerId] = useState(searchData.customerId || '');
  const [createdAtDate, setCreatedAtDate] = useState(searchData.fromDate);
  const [toDate, setToDate] = useState(searchData.toDate);
  const [assignToMeActive, setAssignToMeActive] = useState(searchData.onlyAssignee);
  const [assignToMeNewActive, setAssignToMeNewActive] = useState(searchData.onlyAssigneeNew);
  const [assignToTeamActive, setAssignToTeamActive] = useState(searchData.onlyTeam);
  const [assignToTeamNewActive, setAssignToTeamNewActive] = useState(searchData.onlyTeamNew);
  const [watcherActive, setWatcherActive] = useState(searchData.onlyWatcher);
  const [watcherNewActive, setWatcherNewActive] = useState(searchData.onlyWatcherNew);
  const [filterShowHide, setFilterShowHide] = useState(false);
  const [searchShowHide, setSearchShowHide] = useState(false);
  const [showTooltipMe, setShowTooltipMe] = useState(false);
  const [showTooltipTeam, setShowTooltipTeam] = useState(false);
  const [showTooltipWatcher, setShowTooltipWatcher] = useState(false);

  const [resetAllFilters, setResetAllFilters] = useState([]);
  const [first, setFirst] = useState(false);
  const debouncedTicketId = useDebounce(ticketId, 500);
  const debouncedTicketTitleDescription = useDebounce(ticketTitleDescription, 500);
  const debouncedCustomerId = useDebounce(customerId, 500);

  const createdByForFilter = useSelector(selectCreatedByForFilter);
  const subprojectsForFilter = useSelector(selectSubprojectsForFilter);
  const projectsForFilter = useSelector(selectProjectsForFilter);
  const assigneesForFilter = useSelector(selectAssigneesForFilter);
  const ticketAssignTypes = useSelector(selectTicketAssignTypes);

  const handleTicketTitleDescriptionChange = (e) => {
    const value = e.target.value;
    setTicketTitleDescription(value);
    setFirst(true);
  };
  const handleTicketCustomerIdChange = (e) => {
    const value = e.target.value;
    setCustomerId(value);
    setFirst(true);
  };

  const handleTicketTitleIdChange = (e) => {
    const value = e.target.value;
    setTicketId(value);
    setFirst(true);
  };

  const handleDateChange = (type, date) => {
    const parsedDate = new Date(date);
    if (type === 'from') {
      parsedDate.setHours(0, 0, 0, 0);
      const iso = date ? parsedDate.toISOString() : null;
      setCreatedAtDate(iso);
      setTicketSearchData({ fromDate: iso });
    } else {
      parsedDate.setHours(23, 59, 59, 999);
      const iso = date ? parsedDate.toISOString() : null;
      setToDate(iso);
      setTicketSearchData({ toDate: iso });
    }
  };

  const toggleActiveState = (setter, relatedSetter, fieldName, relatedFieldName) => {
    setter((prev) => {
      const newVal = !prev;

      const newSearchData = { [fieldName]: newVal };

      if (newVal && relatedSetter && relatedFieldName) {
        relatedSetter(false);
        newSearchData[relatedFieldName] = false;
      }

      setTicketSearchData(newSearchData);
      return newVal;
    });
  };

  const handleFilterChange = (key, value) => {
    if (value.length > 0) {
      setTicketSearchData({ [key]: value });
    } else {
      setTicketSearchData({ [key]: undefined });
    }
  };

  const handleProjectSelect = (project) => handleFilterChange('projectIds', project);

  const handleSubprojectSelect = (subproject) =>
    handleFilterChange('subprojectIds', subproject);

  const handleCreatedBySelect = (createdByIds) =>
    handleFilterChange('createdByIds', createdByIds);

  const handleAssigneeSelect = (ids, selectedOptions) => {
    const teamIds = selectedOptions.filter((o) => o.isTeam).map((o) => o.id);
    const assigneeIds = selectedOptions.filter((o) => !o.isTeam).map((o) => o.id);
    setTicketSearchData({
      teamIds: teamIds.length > 0 ? teamIds : [],
      assigneeIds: assigneeIds.length > 0 ? assigneeIds : [],
    });
  };

  const handlePrioritySelect = (priority) => handleFilterChange('priorities', priority);

  const handleStatusSelect = (status) => handleFilterChange('status', status);

  const handleTrackerSelect = (tracker) => handleFilterChange('trackers', tracker);

  const handleCreateNavigate = () => {
    navigate('/project-management/tickets/create-edit', { state: { projectUuid: uuid } });
  };

  const handleFilterSearchShowHide = (type) => {
    if (type === 'filter') {
      setSearchShowHide(false);
      setFilterShowHide((prev) => !prev);
    } else if (type === 'search') {
      setFilterShowHide(false);
      setSearchShowHide((prev) => !prev);
    }
  };

  const resetAllFiltersHandler = () => {
    setSearchShowHide(false);
    setFilterShowHide(false);
    resetSearchData();
    setResetAllFilters([]);
    setCustomerId('');
    setTicketId('');
    setTicketTitleDescription('');
    setCreatedAtDate(null);
    setToDate(null);
    setAssignToMeActive(false);
    setAssignToMeNewActive(false);
    setAssignToTeamActive(false);
    setAssignToTeamNewActive(false);
    setWatcherActive(false);
    setWatcherNewActive(false);
  };

  useEffect(() => {
    if (first) {
      setTicketSearchData({ taskId: debouncedTicketId });
    }
  }, [debouncedTicketId, first]);

  useEffect(() => {
    if (first) setTicketSearchData({ search: debouncedTicketTitleDescription });
  }, [debouncedTicketTitleDescription, first]);

  useEffect(() => {
    if (first) setTicketSearchData({ customerId: debouncedCustomerId });
  }, [debouncedCustomerId, first]);

  useEffect(() => {
    dispatch(getProjectsForFilter());
    dispatch(getSubprojectsForFilter());
    dispatch(getAssigneesForFilter());
    dispatch(getCreatedByForFilter());
  }, [dispatch]);

  const projectValue = searchData.projectIds.map((value) => {
    const matched = projectsForFilter.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });
  const subprojectValue = searchData.subprojectIds.map((value) => {
    const matched = subprojectsForFilter.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });
  const createdByIdsValue = searchData.createdByIds.map((value) => {
    const matched = createdByForFilter.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });
  const assigneeValue = searchData.assigneeIds.map((value) => {
    const matched = assigneesForFilter.find((option) => option.uuid === value);
    return { id: matched ? matched.uuid : value, label: matched ? matched.name : value };
  });
  const statusValue = searchData.status.map((value) => ({ id: value, label: value }));
  const priorityValue = searchData.priorities.map((value) => {
    const matched = TICKET_PRIORITY_OPTIONS.find((option) => option.value === value);
    return { id: value, label: matched ? matched.label : value };
  });
  const trackerValue = searchData.trackers.map((value) => ({ id: value, label: value }));

  const handleClickClearSearch = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setTicketId('');
    setTicketTitleDescription('');
    setCustomerId('');

    setTicketSearchData({
      taskId: '',
      search: '',
      customerId: '',
    });
  };

  const handleClickClearFilter = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setResetAllFilters([]);

    setTicketSearchData({
      projectIds: [],
      subprojectIds: [],
      teamIds: [],
      assigneeIds: [],
      priorities: [],
      createdByIds: [],
      status: [],
      trackers: [],
    });
  };

  const handleSwitch = useCallback(
    (e) => {
      setFirst(true);
      setView(e);
    },
    [setView]
  );

  const handleClearAll = () => {
    setTicketSearchData({ taskId: '', search: '', customerId: '' });
    setTicketId('');
    setTicketTitleDescription('');
    setCustomerId('');
  };

  return (
    <FilterContainer>
      <ActionsWrapper>
        <CalendarTypeWrapper>
          <CalendarWrapper>
            <CustomDatePicker
              height="38px"
              placeholder="Created date to"
              value={toDate ? dayjs(toDate) : null}
              minDate={createdAtDate ? dayjs(createdAtDate) : null}
              onChange={(date) => handleDateChange('to', date)}
            />
          </CalendarWrapper>

          <TicketTypeWrapper>
            <Row>
              <IconCircle
                $isActive={assignToMeActive}
                onClick={() =>
                  toggleActiveState(
                    setAssignToMeActive,
                    setAssignToMeNewActive,
                    'onlyAssignee',
                    'onlyAssigneeNew'
                  )
                }
                onMouseEnter={() => setShowTooltipMe(true)}
                onMouseLeave={() => setShowTooltipMe(false)}
              >
                <TooltipText $isVisible={showTooltipMe}>Assigned to me</TooltipText>
                <Icon src={assignToMeActive ? userActive : user} alt="user" />
                {ticketAssignTypes.myAssigned > 0 && (
                  <IconCircleNewCount>
                    {ticketAssignTypes.myAssigned > 9 ? '9+' : ticketAssignTypes.myAssigned}
                  </IconCircleNewCount>
                )}
              </IconCircle>
              <Line />
              <IconCircle
                $isNew
                $isActive={assignToMeNewActive}
                onClick={() =>
                  toggleActiveState(
                    setAssignToMeNewActive,
                    setAssignToMeActive,
                    'onlyAssigneeNew',
                    'onlyAssignee'
                  )
                }
              >
                New
                {ticketAssignTypes.myAssignedNew > 0 && (
                  <IconCircleNewCount $type="new">
                    {ticketAssignTypes.myAssignedNew > 9
                      ? '9+'
                      : ticketAssignTypes.myAssignedNew}
                  </IconCircleNewCount>
                )}
              </IconCircle>
            </Row>
            <Row>
              <IconCircle
                $isActive={assignToTeamActive}
                onClick={() =>
                  toggleActiveState(
                    setAssignToTeamActive,
                    setAssignToTeamNewActive,
                    'onlyTeam',
                    'onlyTeamNew'
                  )
                }
                onMouseEnter={() => setShowTooltipTeam(true)}
                onMouseLeave={() => setShowTooltipTeam(false)}
              >
                <TooltipText $isVisible={showTooltipTeam}>Assigned to team</TooltipText>
                <Icon src={assignToTeamActive ? usersActive : users} alt="users" />
                {ticketAssignTypes.myTeamTickets > 0 && (
                  <IconCircleNewCount>
                    {ticketAssignTypes.myTeamTickets > 9
                      ? '9+'
                      : ticketAssignTypes.myTeamTickets}
                  </IconCircleNewCount>
                )}
              </IconCircle>
              <Line />
              <IconCircle
                $isNew
                $isActive={assignToTeamNewActive}
                onClick={() =>
                  toggleActiveState(
                    setAssignToTeamNewActive,
                    setAssignToTeamActive,
                    'onlyTeamNew',
                    'onlyTeam'
                  )
                }
              >
                New
                {ticketAssignTypes.myTeamNewTickets > 0 && (
                  <IconCircleNewCount $type="new">
                    {ticketAssignTypes.myTeamNewTickets > 9
                      ? '9+'
                      : ticketAssignTypes.myTeamNewTickets}
                  </IconCircleNewCount>
                )}
              </IconCircle>
            </Row>
            <Row>
              <IconCircle
                $isActive={watcherActive}
                onClick={() =>
                  toggleActiveState(
                    setWatcherActive,
                    setWatcherNewActive,
                    'onlyWatcher',
                    'onlyWatcherNew'
                  )
                }
                onMouseEnter={() => setShowTooltipWatcher(true)}
                onMouseLeave={() => setShowTooltipWatcher(false)}
              >
                <TooltipText $isVisible={showTooltipWatcher}>Watcher</TooltipText>
                <Icon src={watcherActive ? watchActive : watch} alt="watch" />
                {ticketAssignTypes.myWatcher > 0 && (
                  <IconCircleNewCount>
                    {ticketAssignTypes.myWatcher > 9 ? '9+' : ticketAssignTypes.myWatcher}
                  </IconCircleNewCount>
                )}
              </IconCircle>
              <Line />
              <IconCircle
                $isNew
                $isActive={watcherNewActive}
                onClick={() =>
                  toggleActiveState(
                    setWatcherNewActive,
                    setWatcherActive,
                    'onlyWatcherNew',
                    'onlyWatcher'
                  )
                }
              >
                New
                {ticketAssignTypes.myWatcherNew > 0 && (
                  <IconCircleNewCount $type="new">
                    {ticketAssignTypes.myWatcherNew > 9
                      ? '9+'
                      : ticketAssignTypes.myWatcherNew}
                  </IconCircleNewCount>
                )}
              </IconCircle>
            </Row>
          </TicketTypeWrapper>
        </CalendarTypeWrapper>
        <FilterAllWrapper>
          <FilterActionsWrapper>
            <Button
              outlined
              variant="filter"
              active={filterCount > 0}
              clearable={filterCount > 0}
              onClear={handleClickClearFilter}
              onClick={() => handleFilterSearchShowHide('filter')}
              className="filter-trigger-button"
            >
              Filter {filterCount > 0 ? ` (${filterCount})` : ''}
            </Button>

            <Button
              outlined
              variant="search"
              active={searchCount > 0}
              clearable={searchCount > 0}
              onClear={handleClickClearSearch}
              onClick={() => handleFilterSearchShowHide('search')}
              className="search-trigger-button"
            >
              Search {searchCount > 0 ? ` (${searchCount})` : ''}
            </Button>
            <Button secondary onClick={handleCreateNavigate} className="create-button">
              + Create ticket
            </Button>
          </FilterActionsWrapper>
          <MobileCreateSwitchWrapperShow>
            <ResetButton onClick={resetAllFiltersHandler} />
          </MobileCreateSwitchWrapperShow>
        </FilterAllWrapper>
      </ActionsWrapper>

      {searchShowHide && (
        <>
          <SearchArea>
            <Input
              type="number"
              onChange={handleTicketTitleIdChange}
              label="Ticket ID"
              value={ticketId}
            />
            <Input
              label="Ticket title or description"
              value={ticketTitleDescription}
              onChange={handleTicketTitleDescriptionChange}
            />
            <Input
              label="Customer ID"
              type="number"
              value={customerId}
              onChange={handleTicketCustomerIdChange}
            />
            <Column>
              <CloseIconWrapper onClick={() => handleFilterSearchShowHide('search')}>
                <Icon src={close} />
              </CloseIconWrapper>
              <ClearAllText onClick={handleClearAll}>Clear All</ClearAllText>
            </Column>
          </SearchArea>
          <BottomSheet>
            <LineWrapper onClick={() => handleFilterSearchShowHide('search')}>
              <Icon src={line} />
            </LineWrapper>
            <Input
              onChange={handleTicketTitleIdChange}
              label="Ticket ID"
              value={ticketId}
              type="number"
            />
            <Input
              label="Ticket title or description"
              value={ticketTitleDescription}
              onChange={handleTicketTitleDescriptionChange}
            />
            <Input
              label="Customer ID"
              type="number"
              value={customerId}
              onChange={handleTicketCustomerIdChange}
            />
            <CalendarWrapper className="showBelow767px">
              <CustomDatePicker
                height="38px"
                placeholder="Created date from"
                onChange={(date) => handleDateChange('from', date)}
              />
              <CustomDatePicker
                className="dateTo767"
                height="38px"
                placeholder="Created date to"
                onChange={(date) => handleDateChange('to', date)}
              />
            </CalendarWrapper>
          </BottomSheet>
        </>
      )}

      {filterShowHide && (
        <>
          <BottomSheet>
            <LineWrapper onClick={() => handleFilterSearchShowHide('filter')}>
              <Icon src={line} />
            </LineWrapper>
            <FilterSelect
              title="Project"
              allTitle="All projects"
              options={projectsForFilter}
              onSelect={handleProjectSelect}
              resetRegions={resetAllFilters}
              defaultValue={projectValue}
              isActive={!!projectValue.length}
              showSearch
            />
            <FilterSelect
              title="Subproject"
              allTitle="All subprojects"
              options={subprojectsForFilter}
              onSelect={handleSubprojectSelect}
              resetRegions={resetAllFilters}
              defaultValue={subprojectValue}
              isActive={!!subprojectValue.length}
              showSearch
            />
            <MobileFilterRow className="double-select-wrapper">
              <FilterSelect
                title="Assignee"
                allTitle="All assignees"
                options={assigneesForFilter}
                onSelect={handleAssigneeSelect}
                resetRegions={resetAllFilters}
                defaultValue={assigneeValue}
                isActive={!!assigneeValue.length}
                showSearch
              />
              <FilterSelect
                title="Created by"
                allTitle="All"
                options={createdByForFilter}
                onSelect={handleCreatedBySelect}
                resetRegions={resetAllFilters}
                defaultValue={createdByIdsValue}
                isActive={!!createdByIdsValue.length}
                showSearch
              />
            </MobileFilterRow>
            <MobileFilterRow className="multiple-select-wrapper">
              <FilterSelect
                title="Priority"
                allTitle="All"
                options={TICKET_PRIORITY_OPTIONS}
                onSelect={handlePrioritySelect}
                resetRegions={resetAllFilters}
                defaultValue={priorityValue}
                isActive={!!priorityValue.length}
              />
              <FilterSelect
                title="Status"
                allTitle="All"
                options={TICKET_STATUS_OPTIONS}
                onSelect={handleStatusSelect}
                resetRegions={resetAllFilters}
                defaultValue={statusValue}
                isActive={!!statusValue.length}
              />
              <FilterSelect
                title="Tracker"
                allTitle="All"
                options={TICKET_TRACKER_OPTIONS}
                onSelect={handleTrackerSelect}
                resetRegions={resetAllFilters}
                defaultValue={trackerValue}
                isActive={!!trackerValue.length}
              />
            </MobileFilterRow>
          </BottomSheet>
          <SearchArea>
            <FilterSelect
              title="Project"
              allTitle="All projects"
              options={projectsForFilter}
              onSelect={handleProjectSelect}
              resetRegions={resetAllFilters}
              defaultValue={projectValue}
              isActive={!!projectValue.length}
              showSearch
            />
            <FilterSelect
              title="Subproject"
              allTitle="All subprojects"
              options={subprojectsForFilter}
              onSelect={handleSubprojectSelect}
              resetRegions={resetAllFilters}
              defaultValue={subprojectValue}
              isActive={!!subprojectValue.length}
              showSearch
            />
            <FilterSelect
              title="Assignee"
              allTitle="All assignees"
              options={assigneesForFilter}
              onSelect={handleAssigneeSelect}
              resetRegions={resetAllFilters}
              defaultValue={assigneeValue}
              isActive={!!assigneeValue.length}
              showSearch
            />
            <FilterSelect
              title="Created by"
              allTitle="All"
              options={createdByForFilter}
              onSelect={handleCreatedBySelect}
              resetRegions={resetAllFilters}
              defaultValue={createdByIdsValue}
              isActive={!!createdByIdsValue.length}
              showSearch
            />
            <FilterSelect
              title="Priority"
              allTitle="All"
              options={TICKET_PRIORITY_OPTIONS}
              onSelect={handlePrioritySelect}
              resetRegions={resetAllFilters}
              defaultValue={priorityValue}
              isActive={!!priorityValue.length}
            />
            <FilterSelect
              title="Status"
              allTitle="All"
              options={TICKET_STATUS_OPTIONS}
              onSelect={handleStatusSelect}
              resetRegions={resetAllFilters}
              defaultValue={statusValue}
              isActive={!!statusValue.length}
            />
            <FilterSelect
              title="Tracker"
              allTitle="All"
              options={TICKET_TRACKER_OPTIONS}
              onSelect={handleTrackerSelect}
              resetRegions={resetAllFilters}
              defaultValue={trackerValue}
              isActive={!!trackerValue.length}
            />
            <Column>
              <CloseIconWrapper onClick={() => handleFilterSearchShowHide('filter')}>
                <Icon src={close} />
              </CloseIconWrapper>
              <ClearAllText onClick={resetAllFiltersHandler}>Clear All</ClearAllText>
            </Column>
          </SearchArea>
        </>
      )}
    </FilterContainer>
  );
};

export default Filter;
