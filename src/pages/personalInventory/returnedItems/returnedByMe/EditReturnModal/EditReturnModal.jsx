import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { updateEmployeeReturn } from 'features/inventory/inventoryActions';
import { selectLoading } from 'features/inventory/inventorySlice';
import { formatDateTime } from 'utils/dateUtils';

import { FormContainer } from '../ReturnItemModal/ReturnItemModal.styles';
import {
  InfoLabel,
  InfoRow,
  InfoSection,
  InfoValue,
  InputSection,
} from './EditReturnModal.styles';

const EditReturnModal = ({ isOpen, onClose, onSuccess, returnData }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [formData, setFormData] = useState({
    quantity: '',
  });

  useEffect(() => {
    if (returnData && isOpen) {
      setFormData({
        quantity: returnData.quantityRequested || '',
      });
    }
  }, [returnData, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.quantity) {
      return;
    }

    try {
      await dispatch(
        updateEmployeeReturn({
          returnUuid: returnData.uuid,
          data: {
            quantity: parseInt(formData.quantity),
          },
        })
      ).unwrap();

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error updating return:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      quantity: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit"
      footer={true}
      width="360px"
      onOk={handleSubmit}
      okText="Save"
      okButtonProps={{ loading: loading.updateEmployeeReturn }}
      cancelText="Cancel"
    >
      <FormContainer>
        <InfoSection>
          <InfoRow>
            <InfoLabel>
              Category name: <InfoValue>{returnData?.categoryName || ''}</InfoValue>
            </InfoLabel>
          </InfoRow>

          <InfoRow>
            <InfoLabel>
              Item name: <InfoValue>{returnData?.itemName || ''}</InfoValue>
            </InfoLabel>
          </InfoRow>

          <InputSection>
            <Input
              label="Requested quantity"
              width={'60px'}
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
            />
          </InputSection>

          <InfoRow>
            <InfoLabel>
              Timestamp:{' '}
              <InfoValue>{formatDateTime(returnData?.requestedDate) || ''}</InfoValue>
            </InfoLabel>
          </InfoRow>
        </InfoSection>
      </FormContainer>
    </Modal>
  );
};

export default EditReturnModal;
