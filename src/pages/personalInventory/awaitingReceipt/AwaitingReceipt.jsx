import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import { Row } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import MyCheckbox from 'common-ui/myCheckbox/MyCheckbox';
import { Table } from 'common-ui/table';
import { confirmReceipt, getAwaitingReceiptData } from 'features/inventory/inventoryActions';
import {
  selectAwaitingConfirmReceipt,
  selectAwaitingReceiptData,
  selectLoading,
  setResetAwaitingReceiptConfirm,
} from 'features/inventory/inventorySlice';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';

import {
  ButtonsContainer,
  Container,
  ModalContent,
  ModalLabel,
  ModalRow,
} from './AwaitingReceipt.styles';
import { useAwaitingSearch } from './useSearchData';

const AwaitingReceipt = () => {
  const dispatch = useDispatch();
  const awaitingData = useSelector(selectAwaitingReceiptData);
  const loading = useSelector(selectLoading);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  const [itemQuantities, setItemQuantities] = useState({});
  const { searchData, setSearchData } = useAwaitingSearch();
  const successConfirmReceipt = useSelector(selectAwaitingConfirmReceipt);
  const isLoading = loading.awaitingReceiptData;
  const data = awaitingData?.items || [];
  const tableColumns = useMemo(() => [
    {
      title: '',
      key: 'select',
      width: 50,
      render: (_, record) => (
        <MyCheckbox
          selected={selectedRows.includes(record.requestUuid)}
          onClick={() =>
            handleRowSelect(record.requestUuid, !selectedRows.includes(record.requestUuid))
          }
          uuid={record.requestUuid}
        />
      ),
    },
    {
      title: 'Category Name',
      key: 'categoryName',
      dataIndex: 'categoryName',
    },
    {
      title: 'Item Name',
      key: 'itemName',
      dataIndex: 'itemName',
    },
    {
      title: 'Requested Quantity',
      key: 'quantityRequested',
      dataIndex: 'quantityRequested',
      render: (quantityRequested, data) => (
        <p>
          {quantityRequested} {data.unitOfMeasurement}
        </p>
      ),
    },
    {
      title: 'Provided Quantity',
      key: 'quantityProvided',
      dataIndex: 'quantityProvided',
      render: (quantityProvided, data) => (
        <p>
          {quantityProvided} {data.unitOfMeasurement}
        </p>
      ),
    },
  ]);

  const mobileColumns = useMemo(() => [
    {
      title: '',
      key: 'select',
      width: '20',
      render: (_, record) => (
        <MyCheckbox
          selected={selectedRows.includes(record.requestUuid)}
          onClick={() =>
            handleRowSelect(record.requestUuid, !selectedRows.includes(record.requestUuid))
          }
          uuid={record.requestUuid}
        />
      ),
    },
    {
      title: 'Category Name',
      key: 'categoryName',
      dataIndex: 'categoryName',
    },
    {
      title: 'Item Name',
      key: 'itemName',
      dataIndex: 'itemName',
    },
  ]);

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Requested Quantity</ExpandedLabel>
          <ExpandedValue>
            {row.quantityRequested} {row.unitOfMeasurement}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Provided Quantity</ExpandedLabel>
          <ExpandedValue>
            {row.quantityProvided} {row.unitOfMeasurement}
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );

  const handleRowSelect = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleApprove = () => {
    if (selectedRows.length > 0) {
      const quantities = {};
      selectedRows.forEach((requestUuid) => {
        const item = data.find((item) => item.requestUuid === requestUuid);
        if (item) {
          quantities[requestUuid] = item.quantityProvided || item.requestedQuantity || '';
        }
      });
      setItemQuantities(quantities);
      setIsApproveModalOpen(true);
    }
  };

  const handleDecline = () => {
    if (selectedRows.length > 0) {
      const quantities = {};
      selectedRows.forEach((requestUuid) => {
        const item = data.find((item) => item.requestUuid === requestUuid);
        if (item) {
          quantities[requestUuid] = item.quantityProvided || item.requestedQuantity || '';
        }
      });
      setItemQuantities(quantities);
      setIsDeclineModalOpen(true);
    }
  };

  const handleConfirmApprove = () => {
    const confirmData = {
      receipts: selectedRows.map((requestUuid) => ({
        requestUuid: requestUuid,
        quantityReceived: Number(itemQuantities[requestUuid] || 0),
      })),
    };

    dispatch(confirmReceipt(confirmData));
  };

  const handleConfirmDecline = () => {
    const confirmData = {
      receipts: selectedRows.map((requestUuid) => ({
        requestUuid: requestUuid,
        quantityReceived: 0,
      })),
    };

    dispatch(confirmReceipt(confirmData)).then(() => {
      setIsDeclineModalOpen(false);
      setSelectedRows([]);
      dispatch(getAwaitingReceiptData(searchData));
    });
  };

  const handleCloseModal = () => {
    setIsApproveModalOpen(false);
    setIsDeclineModalOpen(false);
    setItemQuantities({});
  };

  const onPaginationChange = (p) => {
    setSearchData({
      page: p,
      limit: 10,
    });
  };

  useEffect(() => {
    dispatch(getAwaitingReceiptData(searchData));
  }, [dispatch, searchData]);

  useEffect(() => {
    if (successConfirmReceipt) {
      dispatch(setResetAwaitingReceiptConfirm());
      setIsApproveModalOpen(false);
      setSelectedRows([]);
      setItemQuantities({});
      dispatch(getAwaitingReceiptData(searchData));
    }
  }, [successConfirmReceipt]);

  useEffect(() => {
    if (searchData.page > (awaitingData?.totalPages || 1)) {
      setSearchData({ ...searchData, page: awaitingData?.totalPages });
    }
  }, [awaitingData]);
  return (
    <Container>
      <Table
        columns={tableColumns}
        data={data}
        loading={isLoading}
        emptyMessage="No awaiting receipt confirmations"
        totalPages={awaitingData?.totalPages}
        currentPage={awaitingData?.currentPage}
        onPaginationChange={onPaginationChange}
      />

      <MobileList
        columns={mobileColumns}
        data={data}
        expandable={renderExpandableContent}
        currentPage={awaitingData?.currentPage}
        totalPages={awaitingData?.totalPages}
        onPaginationChange={onPaginationChange}
      />

      {data?.length > 0 && (
        <ButtonsContainer>
          <div>
            <Button
              onClick={handleDecline}
              disabled={selectedRows.length === 0}
              variant="danger"
            >
              Decline
            </Button>
          </div>
          <div>
            <Button
              onClick={handleApprove}
              disabled={selectedRows.length === 0}
              variant="primary"
              secondary
            >
              Approve
            </Button>
          </div>
        </ButtonsContainer>
      )}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={handleCloseModal}
        title="Approve Receipt"
        footer={false}
        width="360px"
        closeIcon
        maxHeight={'70%'}
      >
        <ModalContent>
          {selectedRows.map((requestUuid) => {
            const item = data.find((item) => item.requestUuid === requestUuid);
            if (!item) return null;

            return (
              <ModalContent key={requestUuid}>
                <ModalLabel>
                  Category Name: <span>{item.categoryName}</span>
                </ModalLabel>
                <ModalLabel>
                  Item Name: <span>{item.itemName}</span>
                </ModalLabel>
                <ModalRow>
                  <Input
                    label="Provided Quantity:"
                    type="number"
                    value={itemQuantities[requestUuid] || ''}
                    onChange={(e) =>
                      setItemQuantities({
                        ...itemQuantities,
                        [requestUuid]: e.target.value,
                      })
                    }
                    placeholder="Enter provided quantity"
                  />
                </ModalRow>
              </ModalContent>
            );
          })}
          <ButtonsContainer>
            <Button onClick={handleCloseModal} variant="secondary">
              Cancel
            </Button>
            <Button secondary onClick={handleConfirmApprove} variant="primary">
              Approve
            </Button>
          </ButtonsContainer>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeclineModalOpen}
        onClose={handleCloseModal}
        title="Decline Receipt"
        footer={false}
        width="360px"
        closeIcon
        maxHeight={'70%'}
      >
        <ModalContent>
          {selectedRows.map((requestUuid) => {
            const item = data.find((item) => item.requestUuid === requestUuid);
            if (!item) return null;

            return (
              <ModalContent key={requestUuid}>
                <ModalLabel>
                  Category Name: <span>{item.categoryName}</span>
                </ModalLabel>
                <ModalLabel>
                  Item Name: <span>{item.itemName}</span>
                </ModalLabel>
                <ModalRow>
                  <Input
                    label="Provided Quantity:"
                    type="number"
                    value={itemQuantities[requestUuid] || ''}
                    onChange={(e) =>
                      setItemQuantities({
                        ...itemQuantities,
                        [requestUuid]: e.target.value,
                      })
                    }
                    placeholder="Enter provided quantity"
                  />
                </ModalRow>
              </ModalContent>
            );
          })}
          <ButtonsContainer>
            <Button onClick={handleCloseModal} variant="secondary">
              Cancel
            </Button>
            <Button secondary onClick={handleConfirmDecline} variant="danger">
              Decline
            </Button>
          </ButtonsContainer>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AwaitingReceipt;
