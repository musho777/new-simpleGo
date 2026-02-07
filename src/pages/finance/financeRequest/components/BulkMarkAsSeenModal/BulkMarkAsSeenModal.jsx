import React, { useEffect, useState } from 'react';

import seen from 'assets/finance/done.svg';
import Modal from 'common-ui/modal';
import PropTypes from 'prop-types';

import { Container, FormWrapper, Header, Icon, Text } from './BulkMarkAsSeenModal.styles';

const BulkMarkAsSeenModal = ({
  isOpen,
  onClose,
  onMarkAsSeen,
  selectedCount,
  loading = false,
}) => {
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onMarkAsSeen(notes);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setNotes('');
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setNotes('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      okText={`Mark as Seen`}
      cancelText="Cancel"
      onOkLoading={loading}
      onOk={handleSubmit}
      footer={true}
      width="500px"
    >
      <Container>
        <Header>
          <Icon src={seen} alt="mark as seen" />
          <Text>Bulk Mark as Seen</Text>
        </Header>
        <FormWrapper>
          <p>You are about to mark {selectedCount} finance requests as seen.</p>
        </FormWrapper>
      </Container>
    </Modal>
  );
};

BulkMarkAsSeenModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMarkAsSeen: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  loading: PropTypes.bool,
};

export default BulkMarkAsSeenModal;
