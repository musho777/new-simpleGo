import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import enable from 'assets/view.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import TextArea from 'common-ui/textArea';
import { requestItemBack } from 'features/inventory/inventoryActions';
import {
  selectLoading,
  selectSuccess,
  setResetRequestItemBackSuccess,
} from 'features/inventory/inventorySlice';
import Tag from 'pages/components/tag';

import {
  ButtonWrapper,
  Container,
  Dropdown,
  Icon,
  InfoLabel,
  InfoSection,
  InfoValue,
  InputWrapper,
  Option,
  TableWrapper,
} from './Actions.styles';
import more from './assets/more.svg';
import reset from './assets/reset.svg';

const Actions = ({ isMobile = false, row, employeeInventory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const { employeeId } = useParams();
  const loading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const inventoryColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (itemType) => (
        <Tag
          type="profileStatus"
          variant={itemType?.available ? 'Available' : 'Unavailable'}
        />
      ),
    },
    {
      title: 'Lifespan',
      dataIndex: 'lifespan',
      key: 'lifespan',
      render: () => (
        <Tag
          type="lifespan"
          variant={row.lifespan === 'single-use' ? 'Single use' : 'Reusable'}
        />
      ),
    },
    {
      title: 'Lifespan Time',
      dataIndex: 'lifespanTime',
      key: 'lifespanTime',
    },
  ];

  const handleOpenViewModal = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentPage(1);
    setPageSize(10);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setQuantity('');
      setReason('');
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    if (!quantity.trim()) return;
    dispatch(
      requestItemBack({
        employeeId: employeeId,
        itemTypeId: row.itemTypeUuid,
        quantity: +quantity,
        reason: reason,
      })
    );
  };

  const isButtonDisabled = !quantity.trim() || loading.requestItemBack;

  useEffect(() => {
    if (success.requestItemBack) {
      setIsModalOpen(false);
      setQuantity('');
      setReason('');
      dispatch(setResetRequestItemBackSuccess());
    }
  }, [success.requestItemBack, dispatch]);
  return (
    <Container
      className="container"
      $isOpen={isOpen && !isMobile}
      $relative={isOpen}
      $isMobile={isMobile}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {!isMobile && <Icon src={more} alt="more options" />}
      {isOpen && !isMobile && (
        <Dropdown className="dropdown">
          <Option onClick={handleOpenModal}>
            <Icon src={reset} alt="Disable" />
            Request item back
          </Option>
          <Option onClick={handleOpenViewModal}>
            <Icon src={enable} alt="Enable" />
            View
          </Option>
        </Dropdown>
      )}
      <Modal
        closeIcon
        title={'Request'}
        isOpen={isModalOpen}
        onClose={handleOpenModal}
        width="360px"
      >
        <InfoSection>
          <InfoLabel>
            Employee name: <InfoValue>{employeeInventory.employeeName}</InfoValue>
          </InfoLabel>
          <InfoLabel>
            Item name: <InfoValue>{row.itemTypeName}</InfoValue>
          </InfoLabel>
          <InfoLabel>
            Available quantity to be returned: <InfoValue>{row.quantityAvailable}</InfoValue>
          </InfoLabel>
        </InfoSection>
        <InputWrapper>
          <Input
            placeholder="Quantity"
            label="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            min="1"
            max={row.quantityAvailable}
          />
          <TextArea
            placeholder="Reason"
            label="Reason"
            value={reason}
            onChange={handleReasonChange}
            resizeHorizontal={false}
            resizeVertical={false}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            secondary
            disabled={isButtonDisabled}
            loading={loading.requestItemBack}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ButtonWrapper>
      </Modal>
      <Modal closeIcon isOpen={isViewModalOpen} onClose={handleCloseViewModal} width="600px">
        <TableWrapper>
          <Table
            columns={inventoryColumns}
            data={(row.details || []).slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            currentPage={currentPage}
            totalPages={Math.ceil((row.details?.length || 0) / pageSize)}
            onPaginationChange={(page) => {
              setCurrentPage(page);
            }}
            pagination={{
              pageSize: pageSize,
              total: row.details?.length || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </Modal>
    </Container>
  );
};

export default Actions;
