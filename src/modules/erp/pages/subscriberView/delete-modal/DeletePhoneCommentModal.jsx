import { useState } from 'react';

import { useDispatch } from 'react-redux';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import { updatePhoneNumbers } from '../../../features/main/mainActions';
import { Form, Row } from '../EditDeleteModal.styles';

const DeletePhoneCommentModal = ({
  isOpen,
  onClose,
  customerId,
  phoneNumbers,
  phoneIndex,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const updatedPhoneNumbers = [...(phoneNumbers || [])];
      updatedPhoneNumbers[phoneIndex] = {
        ...updatedPhoneNumbers[phoneIndex],
        comment: '',
      };

      const result = await dispatch(
        updatePhoneNumbers({
          id: customerId,
          phoneNumbers: updatedPhoneNumbers,
        })
      ).unwrap();

      notifySuccess('Phone comment deleted successfully');
      onSuccess?.(result);
      onClose();
    } catch (error) {
      console.error('Error deleting phone comment:', error);
      notifyError(error || 'Failed to delete phone comment');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="400px">
      <Form>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <p>Դուք համոզվա՞ծ եք, որ ուզում եք ջնջել հեռախոսի մեկնաբանությունը:</p>
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

export default DeletePhoneCommentModal;
