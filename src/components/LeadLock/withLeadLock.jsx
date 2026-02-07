/**
 * Higher-Order Component for Lead Lock Protection
 *
 * Wraps components that need lead locking functionality
 * Provides automatic lock management, conflict handling, and UI components
 */
import React, { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useLeadLock } from 'hooks/useLeadLock';

import LeadLockConflictModal from './LeadLockConflictModal';
import LeadLockStatus from './LeadLockStatus';
import LeadLockWarning from './LeadLockWarning';

/**
 * HOC that adds lead locking functionality to a component
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {Object} options - Configuration options
 * @returns {React.Component} Enhanced component with lock functionality
 */
const withLeadLock = (WrappedComponent, options = {}) => {
  const {
    // Extract leadId from different sources
    leadIdParam = 'leadId', // URL parameter name
    leadIdProp = 'leadId', // Component prop name

    // Lock behavior options
    autoLock = true,
    enableHeartbeat = true,
    showLockStatus = true,
    showConflictModal = true,
    showLeaveWarning = true,

    // Navigation options
    redirectOnConflict = null, // Route to redirect to on conflict
    redirectOnLockLost = null, // Route to redirect to on lock loss

    // Custom handlers
    onLockAcquired = null,
    onLockReleased = null,
    onLockConflict = null,
    onLockLost = null,
  } = options;

  const LeadLockWrapper = (props) => {
    const navigate = useNavigate();
    const params = useParams();

    // Extract leadId from URL params or props
    const leadId = params[leadIdParam] || props[leadIdProp];

    // Lead lock hook with all the functionality
    const leadLock = useLeadLock(leadId, {
      autoLock,
      enableHeartbeat,
      onLockAcquired: useCallback(
        (result) => {
          console.log('Lock acquired for lead:', leadId);
          if (onLockAcquired) {
            onLockAcquired(result);
          }
        },
        [leadId]
      ),

      onLockReleased: useCallback(
        (result) => {
          if (onLockReleased) {
            onLockReleased(result);
          }
        },
        [leadId]
      ),

      onLockConflict: useCallback(
        (error) => {
          console.warn('Lock conflict for lead:', leadId, error.message || error);
          if (onLockConflict) {
            onLockConflict(error);
          }
          if (redirectOnConflict) {
            navigate(redirectOnConflict);
          }
        },
        [leadId, navigate]
      ),

      onLockLost: useCallback(
        (error) => {
          console.error('Lock lost for lead:', leadId, error);
          if (onLockLost) {
            onLockLost(error);
          }
          if (redirectOnLockLost) {
            navigate(redirectOnLockLost);
          }
        },
        [leadId, navigate]
      ),
    });

    // Conflict modal handlers
    const handleRetry = useCallback(async () => {
      try {
        await leadLock.acquireLock();
      } catch (error) {
        console.error('Retry lock acquisition failed:', error);
        throw error;
      }
    }, [leadLock]);

    const handleViewReadOnly = useCallback(() => {
      // Pass read-only mode to wrapped component
      // Component can check props.readOnlyMode
    }, []);

    const handleNavigateAway = useCallback(() => {
      if (redirectOnConflict) {
        navigate(redirectOnConflict);
      } else {
        // Go back to previous page
        navigate(-1);
      }
    }, [navigate]);

    // Leave warning handlers
    const handleConfirmLeave = useCallback(() => {
      navigate(-1);
    }, [navigate]);

    const handleCancelLeave = useCallback(() => {
      // User chose to stay, nothing to do
    }, []);

    // Enhanced props to pass to wrapped component
    const enhancedProps = {
      ...props,

      // Lead lock state
      leadLock: {
        ...leadLock,
        leadId,
      },

      // Convenience props
      isLocked: leadLock.isLocked,
      canEdit: leadLock.canEdit,
      isLoading: leadLock.isLoading.getLead,
      lockError: leadLock.lockError,

      // Read-only mode (set by conflict modal)
      readOnlyMode: leadLock.lockConflict.hasConflict && !leadLock.isLocked,
    };

    if (!leadId) {
      console.warn('withLeadLock: No leadId found in params or props');
      return <WrappedComponent {...enhancedProps} />;
    }

    return (
      <>
        {/* Lock Status Display */}
        {/* {showLockStatus && (
          <LeadLockStatus
            isLocked={leadLock.lockStatus.isLocked}
            lockedBy={leadLock.lockStatus.lockedBy}
            lockedByName={leadLock.lockStatus.lockedByName}
            lockedAt={leadLock.lockStatus.lockedAt}
            currentUser={leadLock.lockStatus.lockedBy} // Assuming current session
          />
        )} */}

        {/* Main Component */}
        <WrappedComponent {...enhancedProps} />

        {/* Conflict Modal */}
        {showConflictModal && (
          <LeadLockConflictModal
            onRetry={handleRetry}
            onViewReadOnly={handleViewReadOnly}
            onNavigateAway={handleNavigateAway}
            retryInterval={30000}
          />
        )}

        {/* Leave Warning Modal */}
        {showLeaveWarning && (
          <LeadLockWarning
            onConfirmLeave={handleConfirmLeave}
            onCancelLeave={handleCancelLeave}
          />
        )}
      </>
    );
  };

  // Set display name for debugging
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  LeadLockWrapper.displayName = `withLeadLock(${wrappedComponentName})`;

  return LeadLockWrapper;
};

/**
 * Preset HOC for standard lead detail pages
 */
export const withLeadLockStandard = (Component) =>
  withLeadLock(Component, {
    autoLock: true,
    enableHeartbeat: true,
    showLockStatus: true,
    showConflictModal: true,
    showLeaveWarning: true,
    redirectOnConflict: '/sales/leads',
  });

/**
 * Preset HOC for read-only lead views
 */
export const withLeadLockReadOnly = (Component) =>
  withLeadLock(Component, {
    autoLock: false,
    enableHeartbeat: false,
    showLockStatus: true,
    showConflictModal: false,
    showLeaveWarning: false,
  });

/**
 * Preset HOC for lead list views (status only)
 */
export const withLeadLockStatusOnly = (Component) =>
  withLeadLock(Component, {
    autoLock: false,
    enableHeartbeat: false,
    showLockStatus: true,
    showConflictModal: false,
    showLeaveWarning: false,
  });

export default withLeadLock;
