import React, { useCallback, useMemo, useState } from 'react';

import historyIcon from 'assets/history.svg';
import MobileList from 'common-ui/mobileList/MobileList';
import { Table } from 'common-ui/table';

import { CloseButton, HistoryIcon, MonthBadge, NestedTable } from './Components.styles';
import { ExpandableWrapper, ExpandedLabel, ExpandedValue, Row } from './SimpleGoOffers.styles';

const SimpleGoOffers = ({ data }) => {
  const [openNestedTable, setOpenNestedTable] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    {
      title: 'Offer Name',
      dataIndex: 'offerName',
      key: 'offerName',
      render: (id) => <MonthBadge>{id}</MonthBadge>,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (data) => <p>{data?.name}</p>,
    },
    {
      title: 'History',
      dataIndex: 'History',
      key: 'History',
      render: (_, row) => (
        <HistoryIcon
          src={historyIcon}
          alt="history"
          onClick={() => {
            setOpenNestedTable(row?.orderHistory || []);
            setSelectedRow(row);
          }}
        />
      ),
    },
  ];

  const nestedColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action) => <MonthBadge>{action}</MonthBadge>,
    },
    {
      title: 'Changed By',
      dataIndex: 'changedByName',
      key: 'changedByName',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'New Value',
      dataIndex: 'newValue',
      key: 'newValue',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  const mobileColumns = useMemo(
    () => [
      {
        title: 'Offer Name',
        dataIndex: 'offerName',
        key: 'offerName',
        render: (id) => <MonthBadge>{id}</MonthBadge>,
      },
      {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
      },
    ],
    []
  );

  const nestedMobileColumns = useMemo(
    () => [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (action) => <MonthBadge>{action}</MonthBadge>,
      },
      {
        title: 'Changed By',
        dataIndex: 'changedByName',
        key: 'changedByName',
      },
    ],
    []
  );

  const renderNestedExpandableContent = useCallback((row) => {
    return (
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Comment</ExpandedLabel>
          <ExpandedValue>{row.comment || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>New Value</ExpandedLabel>
          <ExpandedValue>{row.newValue || '-'}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Created At</ExpandedLabel>
          <ExpandedValue>{new Date(row.createdAt).toLocaleString()}</ExpandedValue>
        </Row>
      </ExpandableWrapper>
    );
  }, []);

  const renderExpandableContent = useCallback((row) => {
    return (
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Count</ExpandedLabel>
          <ExpandedValue>{row.count}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Price</ExpandedLabel>
          <ExpandedValue>{row.unitPrice}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Created by</ExpandedLabel>
          <ExpandedValue>{row.createdBy?.name}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>History</ExpandedLabel>
          <ExpandedValue>
            <HistoryIcon
              src={historyIcon}
              alt="history"
              onClick={() => {
                setOpenNestedTable(row?.orderHistory || []);
                setSelectedRow(row);
              }}
            />
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    );
  }, []);

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        data={data}
        getRowColor={(row) => (selectedRow?.uuid === row.uuid ? '#E8F4FD' : undefined)}
      />
      <MobileList columns={mobileColumns} data={data} expandable={renderExpandableContent} />
      {openNestedTable?.length !== 0 && (
        <NestedTable>
          <CloseButton
            onClick={() => {
              setSelectedRow(null);
              setOpenNestedTable([]);
            }}
          >
            ×
          </CloseButton>
          <Table pagination={false} columns={nestedColumns} data={openNestedTable} />
          <MobileList
            columns={nestedMobileColumns}
            data={openNestedTable}
            expandable={renderNestedExpandableContent}
          />
        </NestedTable>
      )}
    </>
  );
};

export default SimpleGoOffers;
