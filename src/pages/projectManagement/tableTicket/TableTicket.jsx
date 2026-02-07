import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import edit from 'assets/tickets/edit.svg';
import LinearProgressBar from 'common-ui/linearProgress';
import { Table } from 'common-ui/table';
import { TICKET_STATUS_OPTIONS } from 'constants/constants';
import { getTicketsGrid } from 'features/projectManagement/ProjectManagementActions';
import {
  projectManagementError,
  selectCountList,
  selectCurrentPage,
  selectLoading,
  selectTicketType,
  selectTotalPagesList,
} from 'features/projectManagement/ProjectManagementSlice';
import AvatarGroup from 'pages/components/avatarGroup';
import Tag from 'pages/components/tag';
import { formatDateTime } from 'utils/dateUtils';

import ExpandedChildTicket from '../tickets/ExpandedChildTicket';
import { useTicketSearchParams } from '../tickets/filter/useSearchData';
import {
  Container,
  Icon,
  IconCursor,
  ProgressRow,
  TableContainer,
  Title,
} from './TableTicket.styles';
import parent from './parent.svg';

const TableTicket = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector(selectTicketType);
  const errors = useSelector(projectManagementError);
  const isLoading = useSelector(selectLoading);
  const { searchData, setTicketSearchData } = useTicketSearchParams();

  const currentPage = useSelector(selectCurrentPage);
  const count = useSelector(selectCountList);
  const totalPages = useSelector(selectTotalPagesList);
  const projectUuid = location.state?.projectUuid;
  const { uuid } = useParams();
  const [pages, setPages] = useState({
    'To Do': 0,
    'In Progress': 0,
    Waiting: 0,
    Resolved: 0,
    Closed: 0,
    Rejected: 0,
    Reopen: 0,
  });
  const navigate = useNavigate();

  const onPaginationChange = (page, type) => {
    const nextOffset = pages[type] + 10;
    const newPages = { ...pages, [type]: nextOffset };
    setPages(newPages);
    dispatch(getTicketsGrid({ ...searchData, status: [type], offset: nextOffset, uuid }));
  };

  const handleRowCountChange = (rowCount) => {
    setTicketSearchData({ limit: rowCount, offset: 0 });
  };

  const handleNavigateSingleTicket = (uuid) => {
    navigate(`/project-management/ticket/${uuid}`, { state: { projectUuid } });
  };

  const handleNavigateEdit = (id) => {
    navigate(`/project-management/tickets/create-edit/${id}`, { state: { projectUuid } });
  };

  const type = {
    title: 'TYPE',
    dataIndex: 'type',
    key: 'type',
    width: 50,
    render: (id, r) => (
      <div style={{ display: 'flex' }}>
        {r.subtasks > 0 && <Icon src={parent} alt="p" style={{ marginRight: '5px' }} />}
      </div>
    ),
  };
  const MainColumns = [
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, r) => (
        <>{<Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{title}</Title> || '-'}</>
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
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => <>{<Tag type="ticketPriority" variant={priority} /> || '-'}</>,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => (
        <ProgressRow>
          <LinearProgressBar value={progress} />
          {progress}%
        </ProgressRow>
      ),
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate) => <>{formatDateTime(startDate, true) || '-'}</>,
    },
    {
      title: 'End date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate) => {
        const today = new Date();
        const dueDateOnly = new Date(dueDate).setHours(0, 0, 0, 0);
        const todayOnly = today.setHours(0, 0, 0, 0);

        const isOverdue = dueDateOnly < todayOnly;

        return (
          <div style={{ color: dueDate ? (isOverdue ? '#E63946' : 'inherit') : 'inherit' }}>
            {formatDateTime(dueDate, true) || '-'}
          </div>
        );
      },
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
  ];

  const additionalData = [
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (createdBy) => <>{createdBy.name || '-'}</>,
      additional: true,
    },
    {
      title: 'Estimated Time',
      dataIndex: 'estimatedTime',
      key: 'estimatedTime',
      render: (estimatedTime) => <>{estimatedTime || '-'}</>,
      additional: true,
    },
    {
      title: 'Tracker',
      dataIndex: 'tracker',
      key: 'tracker',
      additional: true,
      render: (tracker) => (
        <>
          {(
            <Tag type="tracker" variant={tracker}>
              {tracker}
            </Tag>
          ) || '-'}
        </>
      ),
    },
  ];

  const [columns, setColumns] = useState({
    'In Progress': { columns: MainColumns, additionalData: additionalData },
    'To Do': { columns: MainColumns, additionalData: additionalData },
    Waiting: { columns: MainColumns, additionalData: additionalData },
    Resolved: { columns: MainColumns, additionalData: additionalData },
    Closed: { columns: MainColumns, additionalData: additionalData },
    Rejected: { columns: MainColumns, additionalData: additionalData },
    Reopen: { columns: MainColumns, additionalData: additionalData },
  });

  const addRow = (data, type) => {
    setColumns((prev) => {
      const current = prev[type];

      const newAdditionalData = current.additionalData.filter((col) => col.key !== data.key);

      const newColumns = [...current.columns];
      newColumns.splice(newColumns.length - 1, 0, data);

      return {
        ...prev,
        [type]: {
          columns: newColumns,
          additionalData: newAdditionalData,
        },
      };
    });
  };

  const removeRow = (data, type) => {
    setColumns((prev) => {
      const current = prev[type];
      const item = current.columns.find((elm) => elm.key == data.key);
      const newColumns = current.columns.filter((col) => col.key !== data.key);
      const newAdditionalData = [...current.additionalData, item];
      return {
        ...prev,
        [type]: {
          columns: newColumns,
          additionalData: newAdditionalData,
        },
      };
    });
  };

  const loadMoreTickets = (type) => {
    const nextPage = currentPage[type];
    if (nextPage <= totalPages[type]) {
      onPaginationChange(nextPage, type);
    }
  };

  const handleScroll = (e, type) => {
    const bottom = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight + 5;
    if (bottom && !isLoading.tickets) {
      loadMoreTickets(type);
    }
  };

  useEffect(() => {
    if (isLoading.tickets) {
      return;
    }
    TICKET_STATUS_OPTIONS.forEach((elm) => {
      dispatch(getTicketsGrid({ ...searchData, status: [elm.label], uuid, restart: true }));
    });
  }, [uuid, JSON.stringify(searchData)]);

  useEffect(() => {
    if (errors === 'Project id must be uuid') {
      navigate('/not-found', { replace: true });
    }
  }, [errors]);
  return (
    <Container>
      {TICKET_STATUS_OPTIONS.map((elm, i) => {
        const subtasks = Array.isArray(data[elm.label])
          ? data[elm.label].filter((item) => item.subtasks).length
          : 0;

        let col = [...columns[elm.label].columns];
        if (subtasks) {
          if (col) {
            col = [type, ...columns[elm.label].columns];
          }
        }

        if (data[elm.label].length > 0)
          return (
            <div key={`table-${elm.value}-${i}`}>
              <div style={{ display: 'flex' }}>
                <Tag type="tableStatuses" variant={elm.label} />
              </div>
              <TableContainer onScroll={(e) => handleScroll(e, elm.label)}>
                <Table
                  editableRowCount
                  emptyText="No results found."
                  data={data[elm.label]}
                  scrollable={true}
                  hover={true}
                  dataCount={count[elm.label]}
                  isExpandable={true}
                  count={searchData.limit}
                  pagination={false}
                  columns={col}
                  onAdd={(e) => addRow(e, elm.label)}
                  additionalColumns={columns[elm.label].additionalData}
                  totalPages={totalPages[elm.label]}
                  currentPage={currentPage[elm.label]}
                  removeRow={(e) => removeRow(e, elm.label)}
                  onPaginationChange={(e) => onPaginationChange(e, elm.label)}
                  handleRowCountChange={handleRowCountChange}
                  expandedContentRenderer={(row, expanded) => (
                    <ExpandedChildTicket row={row} expanded={expanded} />
                  )}
                />
              </TableContainer>
            </div>
          );
      })}
    </Container>
  );
};

export default TableTicket;
