import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { approveEmployeeReturnRequests } from 'features/inventory/inventoryActions';
import { selectLoading } from 'features/inventory/inventorySlice';
import Success from 'pages/components/success/Success';

const ApproveModal = ({ isOpen, onClose, selectedRequests, onSuccess }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [showSuccess, setShowSuccess] = useState(false);
  const [quantities, setQuantities] = useState(
    selectedRequests.reduce((acc, request) => {
      acc[request.uuid || request.id] = request.quantityRequested || 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (requestId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [requestId]: Math.max(0, parseInt(quantity) || 0),
    }));
  };

  const handleApprove = async () => {
    const requestsWithQuantities = selectedRequests.map((request) => ({
      requestId: request.uuid || request.id,
      approvedQuantity: quantities[request.uuid || request.id],
    }));

    const approveData = {
      requests: requestsWithQuantities,
    };

    try {
      await dispatch(approveEmployeeReturnRequests(approveData)).unwrap();
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to approve requests:', error);
    }
  };

  const handleClose = () => {
    // Reset quantities when closing
    setQuantities(
      selectedRequests.reduce((acc, request) => {
        acc[request.uuid || request.id] = request.quantityRequested || 1;
        return acc;
      }, {})
    );
    setShowSuccess(false);
    onClose();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onSuccess();
    onClose();
  };

  if (showSuccess) {
    return (
      <Success
        title="Requests Approved Successfully!"
        description={`${selectedRequests.length} request${selectedRequests.length > 1 ? 's have' : ' has'} been approved successfully.`}
        buttonText="Continue"
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Approve ${selectedRequests.length} Request${selectedRequests.length > 1 ? 's' : ''}`}
      width="600px"
    >
      <div style={{ padding: '20px 0' }}>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Review and adjust quantities for the selected requests before approving:
        </p>

        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
          {selectedRequests.map((request) => (
            <div
              key={request.uuid || request.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                border: '1px solid #e1e5e9',
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: '#f8f9fa',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                  {request.itemName}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Category: {request.categoryName}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Requested: {request.quantityRequested}
                </div>
              </div>
              <div style={{ minWidth: '100px', marginLeft: '16px' }}>
                <Input
                  type="number"
                  value={quantities[request.uuid || request.id]}
                  onChange={(e) =>
                    handleQuantityChange(request.uuid || request.id, e.target.value)
                  }
                  min="0"
                  max={request.quantityRequested}
                  placeholder="Quantity"
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={loading.approveEmployeeReturnRequests}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            disabled={loading.approveEmployeeReturnRequests}
            loading={loading.approveEmployeeReturnRequests}
            secondary
          >
            Approve Request{selectedRequests.length > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveModal;
