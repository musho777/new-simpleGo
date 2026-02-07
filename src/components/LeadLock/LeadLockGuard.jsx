/**
 * Lead Lock Route Guard Component
 *
 * Checks lead lock status before allowing navigation to lead page
 * Shows conflict modal if lead is locked, prevents page load
 */
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Loading from 'common-ui/loading';
import { leadLockService } from 'features/sales/leadLockService';

import StandaloneConflictModal from './StandaloneConflictModal';

const LeadLockGuard = ({ children }) => {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const [lockCheckStatus, setLockCheckStatus] = useState('checking'); // 'checking', 'allowed', 'blocked'
  const [conflictInfo, setConflictInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check lock status on mount
  useEffect(() => {
    const checkLeadLockStatus = async () => {
      if (!leadId) {
        setLockCheckStatus('allowed');
        return;
      }

      try {
        // Try to get the lead with locking
        await leadLockService.getLead(leadId);
        // If successful, allow navigation
        setLockCheckStatus('allowed');
      } catch (error) {
        if (error.status === 409) {
          // Lead is locked by another user
          setConflictInfo({
            message: error.message,
            lockedBy: error.lockedBy,
            leadId: error.leadId,
          });
          setShowModal(true);
          setLockCheckStatus('blocked');
        } else {
          // Other errors, allow navigation (will be handled by the page)
          setLockCheckStatus('allowed');
        }
      }
    };

    checkLeadLockStatus();
  }, [leadId]);

  // Modal handlers
  const handleRetry = async () => {
    setLockCheckStatus('checking');
    setShowModal(false);

    // Try again
    try {
      await leadLockService.getLead(leadId);
      setLockCheckStatus('allowed');
    } catch (error) {
      if (error.status === 409) {
        setConflictInfo({
          message: error.message,
          lockedBy: error.lockedBy,
          leadId: error.leadId,
        });
        setShowModal(true);
        setLockCheckStatus('blocked');
      } else {
        setLockCheckStatus('allowed');
      }
    }
  };

  const handleGoBack = () => {
    setShowModal(false);
    navigate(-1); // Go back to previous page
  };

  const handleViewReadOnly = () => {
    setShowModal(false);
    // Allow navigation but in read-only mode
    setLockCheckStatus('allowed');
  };

  // Show loading while checking
  if (lockCheckStatus === 'checking') {
    return <Loading />;
  }

  // Show conflict modal if blocked
  if (lockCheckStatus === 'blocked' && showModal) {
    return (
      <>
        <StandaloneConflictModal
          isOpen={showModal}
          conflictInfo={conflictInfo}
          onRetry={handleRetry}
          onViewReadOnly={handleViewReadOnly}
          onNavigateAway={handleGoBack}
          primaryAction="goBack" // Make "Go Back" the primary button
          retryInterval={30000}
        />
      </>
    );
  }

  // Allow navigation if status is allowed
  if (lockCheckStatus === 'allowed') {
    return children;
  }

  // Fallback (shouldn't reach here)
  return <Loading />;
};

export default LeadLockGuard;
