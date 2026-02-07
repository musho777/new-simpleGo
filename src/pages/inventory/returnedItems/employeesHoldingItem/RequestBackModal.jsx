import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import TextArea from 'common-ui/textArea';
import { createReturnRequest } from 'features/inventory/inventoryActions';

import {
  Box,
  EmployeeInfo,
  EmployeeName,
  EmployeeRole,
  FieldLabel,
  InputWrapper,
  ModalButtonWrapper,
  ModalItemContainer,
  ModalItemRow,
  QuantityField,
  QuantityWrapper,
  ReasonSection,
  TextAreaWrapper,
} from '../ReturnedItems.styles';

const RequestBackModal = ({
  isOpen,
  onClose,
  selectedRows,
  selectedItemTypeUuid,
  selectedCategory,
  onClearSelectedRows,
  mode = 'create',
  onApprove = null,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    quantities: {},
    reasons: {},
  });

  useEffect(() => {
    if (isOpen && mode === 'approve' && selectedRows.length > 0) {
      const initialQuantities = {};
      selectedRows.forEach((row) => {
        initialQuantities[row.employeeuuid ?? row.employeeUuid] = row.quantityAvailable;
      });
      setFormData((prev) => ({
        ...prev,
        quantities: initialQuantities,
      }));
    }
  }, [isOpen, mode, selectedRows]);

  const handleQuantityChange = (employeeUuid, value) => {
    setFormData((prev) => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [employeeUuid]: value,
      },
    }));
  };

  const handleReasonChange = (employeeUuid, value) => {
    setFormData((prev) => ({
      ...prev,
      reasons: {
        ...prev.reasons,
        [employeeUuid]: value,
      },
    }));
  };

  const handleCloseModal = () => {
    setFormData({ quantities: {}, reasons: {} });
    onClose();
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleApprove = () => {
    if (selectedRows.length === 0) return;

    if (mode === 'approve' && onApprove) {
      const approvalData = selectedRows.map((row) => ({
        id: row.employeeuuid ?? row.employeeUuid,
        approvedQuantity:
          parseInt(formData.quantities[row.employeeuuid ?? row.employeeUuid]) ||
          row.quantityAvailable,
        reason:
          formData.reasons[row.employeeuuid ?? row.employeeUuid] || 'Approved for return',
      }));

      onApprove(approvalData).then((result) => {
        if (result && result.meta && result.meta.requestStatus === 'fulfilled') {
          handleCloseModal();
          onClearSelectedRows();
        }
      });
    } else {
      if (!selectedCategory) return;

      const requestData = {
        categoryUuid: selectedCategory.value,
        itemTypeUuid: selectedItemTypeUuid,
        employees: selectedRows.map((row) => ({
          employeeUuid: row.employeeuuid ?? row.employeeUuid,
          quantity: parseInt(formData.quantities[row.employeeuuid ?? row.employeeUuid]) || 1,
          reason: formData.reasons[row.employeeuuid ?? row.employeeUuid],
        })),
      };
      dispatch(createReturnRequest(requestData)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          handleCloseModal();
          onClearSelectedRows();
        }
      });
    }
  };
  return (
    <Modal
      closeIcon
      title={mode === 'approve' ? 'Return Approval' : 'Request Back Items'}
      isOpen={isOpen}
      onClose={handleCloseModal}
      width="700px"
    >
      {selectedRows.map((row, index) => (
        <Box key={index}>
          <ModalItemContainer>
            <ModalItemRow>
              <EmployeeInfo>
                <EmployeeName>{row.employeename ?? row.employeeName}</EmployeeName>
                <EmployeeRole>{row.role}</EmployeeRole>
              </EmployeeInfo>

              <QuantityWrapper>
                <QuantityField>
                  <FieldLabel>
                    {mode === 'approve' ? 'requested quantity' : 'available quantity'}
                  </FieldLabel>
                  <InputWrapper>
                    <Input
                      value={row.quantityavailable ?? row.quantityAvailable}
                      readOnly
                      width={'40px'}
                    />
                  </InputWrapper>
                </QuantityField>
                <QuantityField>
                  <FieldLabel>
                    {mode === 'approve' ? 'approved quantity' : 'requested quantity'}
                  </FieldLabel>
                  <InputWrapper>
                    <Input
                      width={'40px'}
                      type="number"
                      value={formData.quantities[row.employeeuuid ?? row.employeeUuid] || ''}
                      onChange={(e) =>
                        handleQuantityChange(
                          row.employeeuuid ?? row.employeeUuid,
                          e.target.value
                        )
                      }
                      min="0"
                      max={mode === 'approve' ? row.quantityAvailable : undefined}
                    />
                  </InputWrapper>
                </QuantityField>
              </QuantityWrapper>
            </ModalItemRow>
            <ReasonSection>
              <FieldLabel>
                {mode === 'approve' ? 'Approval Notes' : 'Reason of request'}
              </FieldLabel>
              <TextAreaWrapper>
                <TextArea
                  resizeHorizontal={false}
                  value={formData.reasons[row.employeeuuid] || ''}
                  onChange={(e) => handleReasonChange(row.employeeuuid, e.target.value)}
                  placeholder={
                    mode === 'approve'
                      ? 'Add any notes for this approval (optional)'
                      : undefined
                  }
                />
              </TextAreaWrapper>
            </ReasonSection>
            {mode === 'approve' && row.requestReason && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                }}
              >
                <FieldLabel>Original Request Reason</FieldLabel>
                <div style={{ fontSize: '14px', color: '#6c757d', marginTop: '4px' }}>
                  {row.requestReason}
                </div>
              </div>
            )}
          </ModalItemContainer>
        </Box>
      ))}
      <ModalButtonWrapper>
        <Button outlined width={150} onClick={handleCancel}>
          Cancel
        </Button>
        <Button secondary width={150} onClick={handleApprove}>
          Approve
        </Button>
      </ModalButtonWrapper>
    </Modal>
  );
};

export default RequestBackModal;
