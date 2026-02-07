import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ProgressBar from 'common-ui/progressBar';
import { Table } from 'common-ui/table';
import { getSubtasks } from 'features/projectManagement/ProjectManagementActions';
import {
  selectSubtaskPageByUUID,
  selectSubtasksByUUID,
  selectSubtasksLoading,
  setSubtasksPage,
} from 'features/projectManagement/ProjectManagementSlice';
import TableTooltip from 'pages/components/tableTooltip';
import Tag from 'pages/components/tag';

import { Icon, ProgressRow, Title } from './Tickets.styles';
import nested from './nested.svg';

const ExpandedChildTicket = ({ row, depth = 1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();

  const limit = 5;
  const currentPage = useSelector((state) => selectSubtaskPageByUUID(state, row.uuid));
  const data = useSelector((state) => selectSubtasksByUUID(state, row.uuid));
  const isLoading = useSelector((state) => selectSubtasksLoading(state, row.uuid));
  const totalPages = Math.ceil(row.subtasks / limit);

  const handleNavigateSingleTicket = (id) => {
    navigate(`/project-management/ticket/${id}`, { state: { projectUuid: uuid } });
  };

  const onPaginationChange = (page) => {
    dispatch(setSubtasksPage({ uuid: row.uuid, page, limit }));
    const offset = (page - 1) * limit;
    dispatch(getSubtasks({ uuid: row.uuid, params: { limit, offset } }));
  };

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    dispatch(getSubtasks({ uuid: row.uuid, params: { limit, offset } }));
  }, [row.uuid, currentPage, dispatch]);

  const COLUMNS = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id, r) => (
        <div style={{ display: 'flex' }}>
          {r.subtasks > 0 && <Icon src={nested} alt="p" style={{ marginRight: '5px' }} />}
          <Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{id}</Title>
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, r) => (
        <Title onClick={() => handleNavigateSingleTicket(r.uuid)}>{title}</Title>
      ),
    },
    {
      title: 'Assignee',
      dataIndex: 'assignees',
      key: 'assignees',
      render: (assignees, r, index) =>
        assignees?.length === 1
          ? assignees[0].name
          : (
              <TableTooltip data={assignees} index={index} type="assignee">
                {assignees?.length} Assignees
              </TableTooltip>
            ) || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag type="ticketStatuses" variant={status} widthParent={110} />,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => (
        <ProgressRow>
          <ProgressBar variant="determinate" value={progress} />
          {progress}%
        </ProgressRow>
      ),
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (createdBy) => createdBy.name || '-',
    },
  ];

  return (
    <Table
      data={data}
      columns={COLUMNS}
      hover
      totalPages={totalPages}
      currentPage={currentPage}
      loading={isLoading}
      onPaginationChange={onPaginationChange}
      isExpandable={depth < 5}
      expandedContentRenderer={(subRow) => (
        <ExpandedChildTicket row={subRow} depth={depth + 1} />
      )}
    />
  );
};

export default ExpandedChildTicket;
