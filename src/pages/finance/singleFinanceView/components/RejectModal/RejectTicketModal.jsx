import React, { useState } from 'react';

import close from 'assets/finance/close.svg';
import reject from 'assets/finance/rejectMenu.svg';
import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import TextArea from 'common-ui/textArea';
import PropTypes from 'prop-types';

import {
  ButtonWrapper,
  Container,
  ErrorButton,
  Header,
  Icon,
  Text,
} from './RejectTicketModal.styles';

const RejectTicketModal = ({ isOpen, onClose, onReject, loading }) => {
  const [rejectionReason, setRejectionReason] = useState('');

  const handleSubmit = () => {
    onReject(rejectionReason);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setRejectionReason('');
    onClose();
  };

  const handleTextAreaChange = (e) => {
    setRejectionReason(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      okText="Reject Ticket"
      cancelText="Cancel"
      onOkLoading={loading}
      disabled={!rejectionReason.trim()}
      width="500px"
    >
      <Container>
        <Header>
          <Icon src={reject} alt="reject" />
          <Text>Reject Ticket</Text>
        </Header>
        <TextArea
          value={rejectionReason}
          onChange={handleTextAreaChange}
          placeholder="Enter reason for rejection"
          maxLength={500}
          resizeVertical={false}
          resizeHorizontal={false}
        />
        <ButtonWrapper>
          <Button onClick={handleClose} outlined>
            Cancel
          </Button>
          <ErrorButton>
            <Button onClick={handleSubmit} loading={loading}>
              <Icon src={close} alt="reject" />
              Reject Ticket
            </Button>
          </ErrorButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

RejectTicketModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default RejectTicketModal;
