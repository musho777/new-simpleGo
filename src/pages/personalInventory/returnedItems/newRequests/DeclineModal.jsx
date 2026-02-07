import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { declineEmployeeReturnRequests } from 'features/inventory/inventoryActions';
import { selectLoading } from 'features/inventory/inventorySlice';

import { ButtonWrapper } from './NewRequests.styles';

const DeclineModal = ({ isOpen, onClose, selectedRequests, onSuccess }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [declineReason, setDeclineReason] = useState('');

  const handleDecline = async () => {
    if (!declineReason.trim()) {
      return;
    }
    const formattedData = {
      requests: selectedRequests.map((item) => ({
        requestUuid: item.uuid || item.id,
        declineReason: declineReason,
      })),
    };
    try {
      await dispatch(declineEmployeeReturnRequests(formattedData)).unwrap();

      onSuccess();
    } catch (error) {
      console.error('Failed to decline requests:', error);
    }
  };

  const handleClose = () => {
    setDeclineReason('');
    onClose();
  };

  return (
    <Modal
      closeIcon
      isOpen={isOpen}
      onClose={handleClose}
      title={`Decline Reason`}
      width="500px"
    >
      <Input
        placeholder="Fill the reason"
        label="Decline Reason"
        required
        value={declineReason}
        onChange={(e) => setDeclineReason(e.target.value)}
        multiline
        rows={3}
        style={{ marginBottom: '20px' }}
      />
      <ButtonWrapper>
        <Button
          onClick={handleDecline}
          disabled={!declineReason.trim() || loading.declineEmployeeReturnRequests}
          loading={loading.declineEmployeeReturnRequests}
          secondary
        >
          Decline
        </Button>
      </ButtonWrapper>
    </Modal>
  );
};

export default DeclineModal;
