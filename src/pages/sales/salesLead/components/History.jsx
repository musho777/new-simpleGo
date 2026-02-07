import changedBy from 'assets/changedBy.svg';
import fromSvg from 'assets/from.svg';
import role from 'assets/role.svg';
import timestap from 'assets/timestap.svg';
import tosvg from 'assets/to.svg';
import Modal from 'common-ui/modal';
import { formatDateTime } from 'utils/dateUtils';

import { Icon, TableWrapper } from '../SalesLead.styles';
import Table from './Table';

export const History = ({ isModalOpen, data, onClose }) => {
  const columns = [
    {
      title: 'Changed by',
      icon: <Icon src={changedBy} alt="export" />,
      dataIndex: 'changedBy',
      key: 'changedBy',
    },
    {
      title: 'Role',
      icon: <Icon src={role} alt="export" />,
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'From',
      icon: <Icon src={fromSvg} alt="export" />,
      dataIndex: 'fromStatus',
      key: 'fromStatus',
    },
    {
      title: 'To',
      icon: <Icon src={tosvg} alt="export" />,
      dataIndex: 'toStatus',
      key: 'toStatus',
    },
    {
      title: 'Timestap',
      icon: <Icon src={timestap} alt="export" />,
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (value) => formatDateTime(value),
    },
  ];

  return (
    <Modal
      width={'fit-content'}
      isOpen={isModalOpen}
      onClose={onClose}
      title={'Lead History'}
      closeIcon
      maxHeight={'80%'}
    >
      <TableWrapper>
        <Table data={data} columns={columns} />
      </TableWrapper>
    </Modal>
  );
};
