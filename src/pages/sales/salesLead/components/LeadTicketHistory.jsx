import React from 'react';

import { useNavigate } from 'react-router-dom';

import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { formatDateTime } from 'utils/dateUtils';

import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  Row,
} from '../../../userManagement/UserManagement.styles';
import { ClickableTicketId, CreatedDateBadge, UpdatedDateBadge } from './Components.styles';

const LeadTicketHistory = ({ data }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, data) => (
        <ClickableTicketId
          onClick={() => navigate(`/project-management/ticket/${data?.uuid}`)}
        >
          <p>{data?.id}</p>
        </ClickableTicketId>
      ),
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (_, data) => (
        <div>
          <p>{data?.createdBy?.name}</p>
        </div>
      ),
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, data) => (
        <CreatedDateBadge>
          <p>{formatDateTime(data?.createdAt)}</p>
        </CreatedDateBadge>
      ),
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, data) => (
        <UpdatedDateBadge>
          <p>{formatDateTime(data?.updatedAt)}</p>
        </UpdatedDateBadge>
      ),
    },
  ];

  const mobileColumns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, data) => (
        <ClickableTicketId
          onClick={() => navigate(`/project-management/ticket/${data?.uuid}`)}
        >
          <p>{data?.id}</p>
        </ClickableTicketId>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const renderExpandableContent = (row) => {
    return (
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Priority</ExpandedLabel>
          <ExpandedValue>{row?.priority || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Creator</ExpandedLabel>
          <ExpandedValue>{row?.createdBy?.name || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Assignee</ExpandedLabel>
          <ExpandedValue>{row?.assignee || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Created Date</ExpandedLabel>
          <ExpandedValue>
            <CreatedDateBadge>
              <p>{formatDateTime(row?.createdAt)}</p>
            </CreatedDateBadge>
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Updated Date</ExpandedLabel>
          <ExpandedValue>
            <UpdatedDateBadge>
              <p>{formatDateTime(row?.updatedAt)}</p>
            </UpdatedDateBadge>
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    );
  };

  return (
    <>
      <Table pagination={false} columns={columns} data={data} />
      <MobileList columns={mobileColumns} data={data} expandable={renderExpandableContent} />
    </>
  );
};

export default LeadTicketHistory;
