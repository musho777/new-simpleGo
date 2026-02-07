import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import { DetailsTableWrapper } from 'pages/personalInventory/Inventory.styles';
import { formatDateTime } from 'utils/dateUtils';

const ItemDetails = ({ isOpen, onClose, data = [] }) => {
  const { items } = data;
  const COLUMNS = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
    {
      title: 'Inserted date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 130,
      render: (createdAt) => formatDateTime(createdAt) ?? '-',
    },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeIcon height={'350px'}>
        <DetailsTableWrapper>
          <Table data={items} columns={COLUMNS} />
        </DetailsTableWrapper>
      </Modal>
    </>
  );
};

export default ItemDetails;
