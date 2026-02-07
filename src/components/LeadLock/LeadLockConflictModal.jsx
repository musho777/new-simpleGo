/**
 * Lead Lock Conflict Modal Component
 *
 * Displays when a lead is locked by another user
 * Provides options to retry, view in read-only mode, or navigate away
 */
import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';
import {
  checkLockStatus,
  clearConflict,
  hideConflictModal,
  selectLockConflict,
  selectShouldShowConflictModal,
} from 'features/sales/leadLockSlice';

const LeadLockConflictModal = ({
  onRetry,
  onNavigateAway,
  retryInterval = 30000, // 30 seconds
}) => {
  const dispatch = useDispatch();
  const conflict = useSelector(selectLockConflict);
  const shouldShow = useSelector(selectShouldShowConflictModal);

  const [retryCountdown, setRetryCountdown] = useState(0);
  const [autoRetryEnabled, setAutoRetryEnabled] = useState(true);

  // Auto-retry countdown
  useEffect(() => {
    let countdownInterval;

    if (shouldShow && autoRetryEnabled && retryCountdown > 0) {
      countdownInterval = setInterval(() => {
        setRetryCountdown((prev) => {
          if (prev <= 1) {
            handleAutoRetry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [shouldShow, autoRetryEnabled, retryCountdown]);

  // Start countdown when modal shows
  useEffect(() => {
    if (shouldShow && autoRetryEnabled) {
      setRetryCountdown(Math.floor(retryInterval / 1000));
    }
  }, [shouldShow, autoRetryEnabled, retryInterval]);

  const handleClose = useCallback(() => {
    dispatch(hideConflictModal());
    dispatch(clearConflict());
    setRetryCountdown(0);
  }, [dispatch]);

  const handleRetry = async () => {
    try {
      // First check if the lock is still active
      if (conflict.leadId) {
        await dispatch(checkLockStatus(conflict.leadId)).unwrap();
      }

      if (onRetry) {
        await onRetry();
      }

      handleClose();
    } catch (error) {
      console.error('Retry failed:', error);
      // Keep modal open if retry fails
    }
  };

  const handleAutoRetry = async () => {
    try {
      await handleRetry();
    } catch (error) {
      // If auto-retry fails, reset countdown for another attempt
      setRetryCountdown(Math.floor(retryInterval / 1000));
    }
  };

  const handleNavigateAway = () => {
    if (onNavigateAway) {
      onNavigateAway();
    }
    handleClose();
  };

  if (!shouldShow) return null;

  return (
    <Modal
      isOpen={shouldShow}
      onClose={handleClose}
      title="Lead is Currently in Use"
      size="medium"
    >
      <div style={{ marginBottom: '20px' }}>
        {conflict.message && (
          <div
            style={{
              color: '#666',
              fontSize: '14px',
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            {conflict.message}
          </div>
        )}

        <div style={{ color: '#666', fontSize: '14px' }}>
          The lead is locked to prevent conflicts while being edited. You can wait for it to
          become available or view it in read-only mode.
        </div>
      </div>

      <Button primary onClick={handleNavigateAway}>
        Go Back
      </Button>
    </Modal>
  );
};

export default LeadLockConflictModal;
