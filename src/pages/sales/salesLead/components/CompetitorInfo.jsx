import changedBy from 'assets/changedBy.svg';
import calendar from 'assets/historyCalendar.svg';
import offer from 'assets/offer.svg';
import price from 'assets/price.svg';
import Modal from 'common-ui/modal';
import { formatDateTime } from 'utils/dateUtils';

import { Icon, TableWrapper } from '../SalesLead.styles';
import Table from './Table';

export const CompetitorInfo = ({ isModalOpen, data, onClose }) => {
  const allColumns = [
    {
      title: 'Competitor',
      icon: <Icon src={changedBy} alt="export" />,
      dataIndex: 'competitor',
      key: 'competitor',
    },
    {
      title: 'Tariff',
      icon: <Icon src={price} alt="export" />,
      dataIndex: 'tariff',
      key: 'tariff',
    },
    {
      title: 'Included Services',
      icon: <Icon src={offer} alt="export" />,
      dataIndex: 'includedServices',
      key: 'includedServices',
    },
    {
      title: 'Contract End Date',
      icon: <Icon src={calendar} alt="export" />,
      dataIndex: 'contractEndDate',
      key: 'contractEndDate',
    },
    {
      title: 'Contact Date',
      icon: <Icon src={calendar} alt="export" />,
      dataIndex: 'contactDate',
      key: 'contactDate',
      render: (value) => formatDateTime(value),
    },
    {
      title: 'Next Contact Date',
      icon: <Icon src={calendar} alt="export" />,
      dataIndex: 'nextContactDate',
      key: 'nextContactDate',
      render: (value) => formatDateTime(value),
    },
  ];

  return (
    <Modal
      width={'fit-content'}
      isOpen={isModalOpen}
      onClose={onClose}
      title={'Competitor Info'}
      closeIcon
      maxHeight={'80%'}
    >
      <TableWrapper>
        <Table data={data} columns={allColumns} />
      </TableWrapper>
    </Modal>
  );
};
