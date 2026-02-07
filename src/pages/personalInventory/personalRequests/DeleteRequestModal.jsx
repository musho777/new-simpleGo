import React from 'react';

import Modal from 'common-ui/modal';

import { ModalText } from './PersonalRequests.styles';

const DeleteRequestModal = ({ isOpen, onClose, request, onConfirm }) => {
  if (!request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOk={onConfirm}
      title="Delete request"
      footer
      width={'550px'}
      maxHeight={'200px'}
    >
      <ModalText>
        Are you sure you want to delete this request? It will be deleted immediately.
      </ModalText>
    </Modal>
  );
};

export default DeleteRequestModal;
