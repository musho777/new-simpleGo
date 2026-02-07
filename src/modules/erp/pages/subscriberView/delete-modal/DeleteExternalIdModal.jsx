import { useState } from 'react';

import { useDispatch } from 'react-redux';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updateExternalId } from '../../../features/main/mainActions';
import { Form, Row } from '../EditDeleteModal.styles';

const DeleteExternalIdModal = ({ isOpen, onClose, customerId, onSuccess }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const result = await dispatch(
        updateExternalId({
          id: customerId,
          externalId: '',
        })
      ).unwrap();

      notifySuccess('External ID deleted successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error deleting external ID:', error);
      notifyError(error || 'Failed to delete external ID');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <p>Դուք համոզվա՞ծ եք, որ ուզում եք ջնջել ERP External Id-ն:</p>
        </div>

        <Row>
          <Button outlined onClick={onClose} disabled={isDeleting}>
            Չեղարկել
          </Button>
          <Button secondary onClick={handleDelete} loading={isDeleting}>
            Ջնջել
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default DeleteExternalIdModal;
