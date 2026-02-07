/**
 * Standalone Lead Lock Conflict Modal Component
 *
 * A version of the conflict modal that doesn't rely on Redux state
 * Used by LeadLockGuard for route-level protection
 */
import React, { useCallback, useEffect, useState } from 'react';

import Button from 'common-ui/button';
import Modal from 'common-ui/modal';

const StandaloneConflictModal = ({
  isOpen,
  conflictInfo,
  onRetry,
  onNavigateAway,
  retryInterval = 30000, // 30 seconds
}) => {
  const [retryCountdown, setRetryCountdown] = useState(0);
  const [autoRetryEnabled, setAutoRetryEnabled] = useState(true);

  // Auto-retry countdown
  useEffect(() => {
    let countdownInterval;

    if (isOpen && autoRetryEnabled && retryCountdown > 0) {
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
  }, [isOpen, autoRetryEnabled, retryCountdown]);

  // Start countdown when modal shows
  useEffect(() => {
    if (isOpen && autoRetryEnabled) {
      setRetryCountdown(Math.floor(retryInterval / 1000));
    }
  }, [isOpen, autoRetryEnabled, retryInterval]);

  const handleClose = useCallback(() => {
    setRetryCountdown(0);
  }, []);

  const handleRetry = async () => {
    try {
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

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Lead is Currently in Use"
      size="medium"
    >
      <div style={{ marginBottom: '20px' }}>
        {conflictInfo?.message && (
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
            {conflictInfo.message}
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

export default StandaloneConflictModal;
