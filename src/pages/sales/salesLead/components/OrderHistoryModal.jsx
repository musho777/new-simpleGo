import calendar from 'assets/calendar.svg';
import graph from 'assets/graph.svg';
import offer from 'assets/offer.svg';
import price from 'assets/price.svg';
import product from 'assets/product.svg';
import Modal from 'common-ui/modal';
import { CustomTooltip } from 'common-ui/table/CustomTooltip';
import { formatDateTime } from 'utils/dateUtils';

import { Icon, TableWrapper } from '../SalesLead.styles';
import Table from './Table';

const OrderHistoryModal = ({ isOpen, onClose, historyData, orderId }) => {
  // Filter history data for the specific order
  const filteredHistory =
    Array.isArray(historyData) && historyData.length > 0
      ? historyData.filter((item) => item.orderId === orderId)
      : [];

  const lastHistoryItem = filteredHistory.length > 0 ? filteredHistory.slice(0, -1) : [];
  const createColumns = () => {
    if (!lastHistoryItem.length) return [];

    const firstRecord = lastHistoryItem[0];
    if (!firstRecord.allFields) return [];
    const fieldIconMap = {
      offerId: offer,
      count: graph,
      unitPrice: price,
      totalPrice: price,
      currency: price,
      preferredDate: calendar,
      description: product,
    };

    const customDisplayNames = {
      unitPrice: 'Price',
      count: 'Count',
      changedByName: 'Changed By',
    };

    const excludedFields = ['offerId', 'editedBy', 'editedAt'];
    const dynamicColumns = firstRecord.allFields
      .filter((field) => !excludedFields.includes(field.field))
      .map((field) => ({
        title: customDisplayNames[field.field] || field.displayName,
        icon: <Icon src={fieldIconMap[field.field] || product} alt={field.field} />,
        dataIndex: field.field,
        key: field.field,
        render: (_, record) => {
          const fieldData = record.allFields?.find((f) => f.field === field.field);
          if (!fieldData) return '-';

          if (field.field === 'preferredDate' && fieldData.currentValue) {
            return formatDateTime(fieldData.currentValue);
          }

          const currentValue = fieldData.currentValue;
          if (
            currentValue === 'NaN' ||
            currentValue === null ||
            currentValue === undefined ||
            currentValue === ''
          ) {
            return '-';
          }

          if (field.field === 'description' && typeof currentValue === 'string') {
            const maxLength = 40;
            if (currentValue.length > maxLength) {
              return (
                <CustomTooltip
                  followCursor={true}
                  arrow={true}
                  title={currentValue}
                  placement="top"
                >
                  <span style={{ cursor: 'pointer' }}>
                    {currentValue.substring(0, maxLength)}...
                  </span>
                </CustomTooltip>
              );
            }
          }

          return currentValue;
        },
      }));

    const changedByColumn = {
      title: 'Changed By',
      icon: <Icon src={product} alt="changedByName" />,
      dataIndex: 'changedByName',
      key: 'changedByName',
      render: (_, record) => {
        return record.changedByName || '-';
      },
    };

    return [...dynamicColumns, changedByColumn];
  };

  const columns = createColumns();

  return (
    <Modal
      width="fit-content"
      isOpen={isOpen}
      onClose={onClose}
      title="Order History"
      closeIcon
      maxHeight="80%"
    >
      <TableWrapper>
        <Table data={lastHistoryItem} columns={columns} />
      </TableWrapper>
    </Modal>
  );
};

export default OrderHistoryModal;
