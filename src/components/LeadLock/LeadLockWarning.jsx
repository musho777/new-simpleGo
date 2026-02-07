/**
 * Lead Lock Warning Component
 *
 * Shows warning before user leaves page while having an active lock
 * Prevents accidental navigation away from locked leads
 */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import {
  hideLeaveWarning,
  releaseLock,
  selectHasActiveLock,
  selectLockUI,
  selectLockedLead,
} from 'features/sales/leadLockSlice';

const LeadLockWarning = ({ onConfirmLeave, onCancelLeave }) => {
  const dispatch = useDispatch();
  const hasActiveLock = useSelector(selectHasActiveLock);
  const lockUI = useSelector(selectLockUI);
  const lockedLead = useSelector(selectLockedLead);

  const [isReleasing, setIsReleasing] = useState(false);

  // Browser beforeunload warning
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasActiveLock) {
        const message =
          'You have an active lock on a lead. Leaving will release the lock. Are you sure?';
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    if (hasActiveLock) {
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [hasActiveLock]);

  const handleConfirmLeave = async () => {
    setIsReleasing(true);

    try {
      // Release the lock before leaving
      if (lockedLead.leadId) {
        await dispatch(releaseLock(lockedLead.leadId)).unwrap();
      }

      dispatch(hideLeaveWarning());

      if (onConfirmLeave) {
        onConfirmLeave();
      }
    } catch (error) {
      console.error('Failed to release lock before leaving:', error);
      // Even if release fails, allow navigation
      dispatch(hideLeaveWarning());
      if (onConfirmLeave) {
        onConfirmLeave();
      }
    } finally {
      setIsReleasing(false);
    }
  };

  const handleCancelLeave = () => {
    dispatch(hideLeaveWarning());
    if (onCancelLeave) {
      onCancelLeave();
    }
  };

  if (!lockUI.showLeaveWarning) return null;

  return (
    <Modal
      isOpen={lockUI.showLeaveWarning}
      onClose={handleCancelLeave}
      title="Confirm Navigation"
      size="medium"
    >
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '16px', marginBottom: '15px' }}>
            You are currently viewing a lead and have an active lock.
          </div>

          <div
            style={{
              color: '#666',
              fontSize: '14px',
              marginBottom: '15px',
              padding: '15px',
              backgroundColor: '#fff8e1',
              borderRadius: '4px',
              border: '1px solid #ffb74d',
            }}
          >
            <strong>⚠️ Warning:</strong> Leaving this page will release your lock on the lead,
            allowing other users to edit it. Any unsaved changes may be lost.
          </div>

          <div style={{ color: '#666', fontSize: '14px' }}>
            Are you sure you want to leave this page?
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            marginTop: '30px',
          }}
        >
          <Button variant="outline" onClick={handleCancelLeave} disabled={isReleasing}>
            Stay on Page
          </Button>

          <Button
            variant="primary"
            onClick={handleConfirmLeave}
            disabled={isReleasing}
            loading={isReleasing}
          >
            {isReleasing ? 'Releasing Lock...' : 'Leave Page'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LeadLockWarning;
