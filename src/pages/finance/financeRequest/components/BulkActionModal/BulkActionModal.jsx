import React, { useEffect, useState } from 'react';

import checked from 'assets/finance/checked.svg';
import reject from 'assets/finance/rejectMenu.svg';
import Modal from 'common-ui/modal';
import TextArea from 'common-ui/textArea';
import PropTypes from 'prop-types';

import { Container, FormWrapper, Header, Icon, Text } from './BulkActionModal.styles';

const BulkActionModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedCount,
  loading = false,
  actionType = 'approve',
}) => {
  const [inputValue, setInputValue] = useState('');

  const isReject = actionType === 'reject';
  const config = {
    approve: {
      title: 'Bulk Approve Requests',
      icon: checked,
      iconAlt: 'approve',
      okText: 'Approve',
      label: 'Notes',
      placeholder: 'Add notes for bulk approval...',
      message: `You are about to approve ${selectedCount} finance requests.`,
    },
    reject: {
      title: 'Bulk Reject Requests',
      icon: reject,
      iconAlt: 'reject',
      okText: 'Reject',
      label: 'Rejection Reason',
      placeholder: 'Enter reason for bulk rejection...',
      message: `You are about to reject ${selectedCount} finance requests.`,
    },
  };

  const currentConfig = config[actionType] || config.approve;
  const handleSubmit = () => {
    onSubmit(isReject ? inputValue.trim() || '' : inputValue);
  };

  const handleClose = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setInputValue('');
    onClose();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      okText={currentConfig.okText}
      cancelText="Cancel"
      onOkLoading={loading}
      onOk={handleSubmit}
      footer={true}
      width="500px"
    >
      <Container>
        <Header>
          <Icon
            style={actionType !== 'approve' ? { width: 34, height: 34 } : {}}
            src={currentConfig.icon}
            alt={currentConfig.iconAlt}
          />
          <Text>Bulk Reject Requests</Text>
        </Header>
        <FormWrapper>
          <p>{currentConfig.message}</p>
          <TextArea
            label={currentConfig.label}
            placeholder={currentConfig.placeholder}
            value={inputValue}
            onChange={handleInputChange}
            rows={4}
            maxLength={isReject ? 500 : undefined}
            resizeVertical={false}
            resizeHorizontal={false}
          />
        </FormWrapper>
      </Container>
    </Modal>
  );
};

BulkActionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  actionType: PropTypes.oneOf(['approve', 'reject']).isRequired,
};

export default BulkActionModal;
