import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import calendar from 'assets/calendar.svg';
import edit from 'assets/edit.svg';
import graph from 'assets/graph.svg';
import history from 'assets/history.svg';
import offer from 'assets/offer.svg';
import price from 'assets/price.svg';
import product from 'assets/product.svg';
import Modal from 'common-ui/modal';
import { getOrderHistory } from 'features/sales/salesActions';
import { formatDateTime } from 'utils/dateUtils';

import { Icon, TableWrapper } from '../SalesLead.styles';
import { AddOrder } from './AddOrder';
import OrderHistoryModal from './OrderHistoryModal';
import Table from './Table';

export const ViewOrder = ({ isModalOpen, data, onClose, onOrderUpdate, leadId, offers }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyLength, setHistoryLength] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const dispatch = useDispatch();
  const handleEdit = (item) => {
    setEditingItem(item);
    setEditModalOpen(true);
  };

  const handleHistory = (item) => {
    setSelectedOrderId(item.uuid);
    setHistoryModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalOpen(false);
  };

  const hasOrderHistory = (orderId) => {
    return historyData.filter((item) => item.orderId === orderId).length > 1;
  };

  const columns = [
    {
      title: 'Offer Name',
      icon: <Icon src={offer} alt="export" />,
      dataIndex: 'offerName',
      key: 'offerName',
    },
    {
      title: 'Product Name',
      icon: <Icon src={product} alt="export" />,
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Count',
      icon: <Icon src={graph} alt="export" />,
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Price',
      icon: <Icon src={price} alt="export" />,
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (value) => {
        if (value === 'NaN' || value === null || value === undefined || value === '') {
          return '-';
        }
        return value;
      },
    },
    {
      title: 'Total Price',
      icon: <Icon src={price} alt="export" />,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (value) => {
        if (value === 'NaN' || value === null || value === undefined || value === '') {
          return '-';
        }
        return value;
      },
    },
    {
      title: 'Created By',
      dataIndex: 'createdByName',
      key: 'createdByName',
      render: (value) => {
        if (value === 'NaN' || value === null || value === undefined || value === '') {
          return '-';
        }
        return value;
      },
    },
    {
      title: 'Preferred Date',
      icon: <Icon src={calendar} alt="export" />,
      dataIndex: 'preferredDate',
      key: 'preferredDate',
      render: (value) => formatDateTime(value),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, item) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Icon
            src={edit}
            alt="edit"
            style={{ cursor: 'pointer' }}
            onClick={() => handleEdit(item)}
          />
          {hasOrderHistory(item.uuid) && (
            <Icon
              src={history}
              alt="history"
              style={{ cursor: 'pointer' }}
              onClick={() => handleHistory(item)}
            />
          )}
        </div>
      ),
    },
  ];

  const fetchOrderHistory = async () => {
    if (!leadId || leadId === 'not-found') return;
    try {
      const response = await dispatch(getOrderHistory(leadId)).unwrap();
      if (response.history) {
        setHistoryData(response.history);
        setHistoryLength(response.count);
      }
    } catch (error) {
      setHistoryData([]);
    }
  };

  const handelUpdate = () => {
    fetchOrderHistory();
    onOrderUpdate();
  };

  useEffect(() => {
    if (leadId) {
      fetchOrderHistory();
    }
  }, [leadId]);

  return (
    <>
      <Modal
        width={'fit-content'}
        isOpen={isModalOpen}
        onClose={onClose}
        title={'Order View'}
        closeIcon
        maxHeight={'80%'}
      >
        <TableWrapper>
          <Table data={data} columns={columns} />
        </TableWrapper>
      </Modal>

      <AddOrder
        isModalOpen={editModalOpen}
        handleCloseModal={handleCloseEditModal}
        leadId={leadId}
        offers={offers}
        isEdit={true}
        editData={editingItem}
        onOrderUpdate={handelUpdate}
      />

      <OrderHistoryModal
        isOpen={historyModalOpen}
        historyData={historyData}
        onClose={handleCloseHistoryModal}
        leadId={leadId}
        orderId={selectedOrderId}
      />
    </>
  );
};
