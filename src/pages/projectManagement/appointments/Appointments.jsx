import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import edit from 'assets/tickets/edit.svg';
import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { getAppointments } from 'features/projectManagement/ProjectManagementActions';
import {
  projectManagementError,
  selectAppointment,
  selectCount,
  selectLoading,
  selectTotalPages,
} from 'features/projectManagement/ProjectManagementSlice';
import AvatarGroup from 'pages/components/avatarGroup';
import EmptyView from 'pages/components/emptyView';
import Tag from 'pages/components/tag';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  MobileActions,
  MobileActionsWrapper,
  Row,
} from 'pages/userManagement/UserManagement.styles';
import { formatDateTime } from 'utils/dateUtils';

import {
  Container,
  CreateContainer,
  CreateWrapper,
  Icon,
  IconCursor,
  LightTooltip,
  Title,
  Tracker,
} from './Appointments';
import Actions from './actions';
import Filter from './filter';
import { useTicketSearchParams } from './filter/useSearchData';

const TICKET_VIEW_STORAGE_KEY = 'ticketViewType';

const Appointments = () => {
  const { searchData, setTicketSearchData, defaultSearchData } = useTicketSearchParams();
  const dispatch = useDispatch();
  const appointment = useSelector(selectAppointment);
  console.log(appointment);
  const location = useLocation();
  const [columns, setColumns] = useState([]);

  const getStoredViewType = () => {
    try {
      const storedView = localStorage.getItem(TICKET_VIEW_STORAGE_KEY);
      return storedView || searchData.type || 'list';
    } catch (error) {
      return searchData.type || 'list';
    }
  };

  const [view, setViewState] = useState(getStoredViewType());

  useEffect(() => {
    const storedView = getStoredViewType();
    setViewState(storedView);
  }, []);

  const saveViewType = (viewType) => {
    try {
      localStorage.setItem(TICKET_VIEW_STORAGE_KEY, viewType);
    } catch (error) {
      console.warn('Failed to save view type to localStorage:', error);
    }
  };

  const setView = (viewType) => {
    setViewState(viewType);
    saveViewType(viewType);
    setTicketSearchData({ type: viewType });
  };
  const errors = useSelector(projectManagementError);

  const isLoading = useSelector(selectLoading);
  const totalPages = useSelector(selectTotalPages);

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const count = useSelector(selectCount);
  const projectUuid = location.state?.projectUuid;
  const { uuid } = useParams();
  const navigate = useNavigate();
  const onPaginationChange = (page) => {
    const offset = (page - 1) * searchData.limit;
    setTicketSearchData({ offset });
  };

  const handleRowCountChange = (rowCount) => {
    setTicketSearchData({ limit: rowCount, offset: 0 });
  };

  const handleNavigateSingleTicket = (uuid) => {
    navigate(`/project-management/appointment/${uuid}`, { state: { projectUuid } });
  };

  const handleNavigateEdit = (id) => {
    navigate(`/project-management/tickets/create-edit/${id}`, { state: { projectUuid } });
  };

  const COLUMNS = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id, r) => (
          <div style={{ display: 'flex' }}>
            {<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{id}</Title> || '-'}
          </div>
        ),
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        width: 120,
        render: (title, r) => (
          <>
            {<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{title}</Title> || '-'}
          </>
        ),
      },
      {
        title: 'Offer',
        dataIndex: 'location',
        key: 'location',
        width: 120,
        render: (title, r) => (
          <>
            {<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{title}</Title> || '-'}
          </>
        ),
      },
      {
        title: 'Assignee',
        dataIndex: 'assignees',
        key: 'assignees',
        render: (assignees = [], _, index) => (
          <AvatarGroup data={assignees} maxVisible={4} index={index} />
        ),
      },

      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'TIME',
        dataIndex: 'time',
        key: 'time',
      },

      {
        title: 'Created by',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (createdBy) => (
          <>
            {createdBy.name || '-'} {createdBy.surname || '-'}{' '}
          </>
        ),
      },
      {
        title: '',
        dataIndex: 'uuid',
        key: 'uuid',
        render: (uuid) => (
          <>
            {
              <IconCursor onClick={() => handleNavigateEdit(uuid)}>
                <Icon src={edit} alt="edit" />
              </IconCursor>
            }
          </>
        ),
      },
    ],
    [handleNavigateSingleTicket, handleNavigateEdit]
  );

  const COMPACT_COLUMNS = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id, r) => (
          <div style={{ display: 'flex' }}>
            {<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{id}</Title> || '-'}
          </div>
        ),
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        width: 120,
        render: (title, r) => (
          <>
            {<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{title}</Title> || '-'}
          </>
        ),
      },
      {
        title: 'Offer',
        dataIndex: 'location',
        key: 'location',
        width: 120,
        render: (title, r) => (
          <>
            {<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{title}</Title> || '-'}
          </>
        ),
      },
      {
        title: 'Assignee',
        dataIndex: 'assignees',
        key: 'assignees',
        render: (assignees = [], _, index) => (
          <AvatarGroup data={assignees} maxVisible={4} index={index} />
        ),
      },

      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'TIME',
        dataIndex: 'TIME',
        key: 'TIME',
      },

      {
        title: '',
        dataIndex: 'uuid',
        key: 'uuid',
        width: 80,
        render: (uuid, row) => <Actions id={uuid} row={row} />,
      },
    ],
    [handleNavigateSingleTicket, handleNavigateEdit, formatDateTime]
  );

  const mobileColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id, r) => (
        <>{<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{id}</Title> || '-'}</>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      render: (title, r) => (
        <>{<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{title}</Title> || '-'}</>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <>{<Tag type="ticketStatuses" variant={status} /> || '-'}</>,
    },
  ];

  const renderExpandableContent = (row) => {
    const isDueBeforeStart =
      new Date(row.dueDate).setHours(0, 0, 0, 0) <
      new Date(row.startDate).setHours(0, 0, 0, 0);

    const isOverdue =
      new Date(row.dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

    const isResolvedOrClosed = row.status === 'Resolved' || row.status === 'Closed';

    const shouldHighlight =
      row.dueDate && (isDueBeforeStart || isOverdue) && !isResolvedOrClosed;

    return (
      <>
        <ExpandableWrapper>
          <Row>
            <ExpandedLabel>Assignee</ExpandedLabel>
            <ExpandedValue>
              {row?.assignees?.length === 1 ? row.assignees[0].name : '-'}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Priority</ExpandedLabel>
            <ExpandedValue>
              <Tag type="ticketPriority" variant={row.priority} />
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Start date</ExpandedLabel>
            <ExpandedValue>{formatDateTime(row.startDate)}</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>End date</ExpandedLabel>
            <ExpandedValue $highlight={shouldHighlight}>
              {formatDateTime(row.dueDate)}
            </ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Progress</ExpandedLabel>
            <ExpandedValue>{row.progress ?? 0}%</ExpandedValue>
          </Row>
          <Row>
            <ExpandedLabel>Tracker</ExpandedLabel>
            <Tracker $color={row.tracker}>{row.tracker}</Tracker>
          </Row>
          <Row>
            <ExpandedLabel>Created by</ExpandedLabel>
            <ExpandedValue>{row.createdBy?.name}</ExpandedValue>
          </Row>
        </ExpandableWrapper>
        <MobileActionsWrapper>
          <MobileActions>
            <Actions id={row.uuid} role={row.userType} row={row} isMobile />
          </MobileActions>
        </MobileActionsWrapper>
      </>
    );
  };

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 1600) {
        setColumns(COMPACT_COLUMNS);
      } else {
        setColumns(COLUMNS);
      }
    };

    updateColumns();

    window.addEventListener('resize', updateColumns);

    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  useEffect(() => {
    dispatch(getAppointments({ ...searchData, uuid }));
  }, [JSON.stringify(searchData)]);

  useEffect(() => {
    if (errors === 'Project id must be uuid') {
      navigate('/not-found', { replace: true });
    }
  }, [errors]);

  const handleCreateNavigate = () => {
    navigate('/project-management/tickets/create-edit', { state: { projectUuid: uuid } });
  };
  return (
    <Container>
      {JSON.stringify(defaultSearchData) === JSON.stringify(searchData) &&
      appointment?.length === 0 ? (
        <>
          <CreateContainer>
            <CreateWrapper>
              <Button secondary onClick={handleCreateNavigate} className="create-button">
                + Create ticket
              </Button>
            </CreateWrapper>
          </CreateContainer>
          <EmptyView />
        </>
      ) : (
        <>
          <Filter view={view} setView={setView} />
          {(searchData.type === 'list' || searchData.type === '') && (
            <>
              <Table
                editableRowCount
                emptyText="No results found."
                data={appointment}
                hover={true}
                dataCount={count}
                isExpandable={true}
                count={searchData.limit}
                columns={columns}
                totalPages={totalPages}
                currentPage={currentPage}
                loading={isLoading.tickets}
                onPaginationChange={onPaginationChange}
                handleRowCountChange={handleRowCountChange}
              />
              <MobileList
                columns={mobileColumns}
                data={appointment}
                expandable={renderExpandableContent}
                onPaginationChange={onPaginationChange}
                currentPage={currentPage}
                loading={isLoading.tickets}
                totalPages={totalPages}
                forceShow={true}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Appointments;
