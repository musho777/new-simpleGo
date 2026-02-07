import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import WarningIcon from 'assets/warning.svg';
import { Table } from 'common-ui/table';
import { getLeadVisibility } from 'features/sales/salesActions';
import { selectLeadVisibility, selectLeadVisibilityLoading } from 'features/sales/salesSlice';

import Create from './Create';
import { NotesWrapper, Nots, Row, Tag, TooltipIcon } from './LeadVisibility.styles';

const LeadVisibility = () => {
  const dispatch = useDispatch();
  const leadVisibility = useSelector(selectLeadVisibility);
  const isLoading = useSelector(selectLeadVisibilityLoading);
  const userType = localStorage.getItem('userType');
  const access = userType === 'Super Admin' || userType === 'General Manager';

  const COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'durationDisplay',
      key: 'durationDisplay',
      render: (durationDisplay) => {
        return <Tag>{durationDisplay}</Tag>;
      },
    },
    ...(access
      ? [
          {
            title: 'Edit',
            key: 'edit',
            width: '100',
            render: (_, row) => <Create isEdit={true} initialData={row} />,
          },
        ]
      : []),
  ];

  useEffect(() => {
    dispatch(getLeadVisibility());
  }, [dispatch]);

  const tableData = leadVisibility?.data ? [leadVisibility.data] : [];

  return (
    <>
      <NotesWrapper>
        <Row>
          <TooltipIcon src={WarningIcon} alt="warning" />
          <Nots>
            This setting controls how long a lead remains exclusively assigned to an employee
            before becoming available to others.
          </Nots>
        </Row>
        <Nots>
          <span>Note: </span>
          Imported leads are excluded from auto-release and will remain permanently assigned.
        </Nots>
      </NotesWrapper>
      <Table
        data={tableData}
        columns={COLUMNS}
        loading={isLoading}
        pagination={false}
        emptyText="No lead visibility settings found"
      />
    </>
  );
};

export default LeadVisibility;
