import Modal from 'common-ui/modal';

import { ConfirmMessage, ModalContent } from '../shared/FormStyles';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, categoryName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOk={onConfirm}
      title="Confirm Deletion"
      okText="Delete"
      cancelText="Cancel"
      footer
      closeIcon
      width="450px"
    >
      <ModalContent>
        <ConfirmMessage>
          Are you sure you want to delete <strong>{categoryName}</strong>?
        </ConfirmMessage>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
