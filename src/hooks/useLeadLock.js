/**
 * Lead Lock Custom Hook
 *
 * Provides comprehensive lead locking functionality including:
 * - Automatic lock acquisition and release
 * - Heartbeat management
 * - Conflict handling
 * - Cleanup on unmount
 */
import { useCallback, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  checkLockStatus,
  clearHeartbeat,
  clearLockState,
  getLead,
  releaseLock,
  selectHasActiveLock,
  selectLockConflict,
  selectLockError,
  selectLockLoading,
  selectLockStatus,
  selectLockedLead,
  sendHeartbeat,
  setHeartbeatInterval,
} from 'features/sales/leadLockSlice';
import { buildQueryString } from 'utils';
import sessionManager from 'utils/sessionManager';

// Heartbeat interval in milliseconds (5 minutes)
const HEARTBEAT_INTERVAL = 5 * 60 * 1000;

/**
 * Main lead lock hook
 * @param {string} leadId - Lead ID to manage lock for
 * @param {Object} options - Configuration options
 * @returns {Object} Lock state and control functions
 */
export const useLeadLock = (leadId, options = {}) => {
  const {
    autoLock = true,
    enableHeartbeat = true,
    onLockAcquired,
    onLockReleased,
    onLockConflict,
    onLockLost,
  } = options;

  const dispatch = useDispatch();
  const heartbeatIntervalRef = useRef(null);
  const isUnmountedRef = useRef(false);

  // Selectors
  const lockedLead = useSelector(selectLockedLead);
  const lockStatus = useSelector(selectLockStatus);
  const hasActiveLock = useSelector(selectHasActiveLock);
  const lockConflict = useSelector(selectLockConflict);
  const lockError = useSelector(selectLockError);
  const lockLoading = useSelector(selectLockLoading);

  // Check if we have lock on this specific lead
  const hasLockOnLead = hasActiveLock && lockedLead.leadId === leadId;

  /**
   * Acquire lock on lead
   */
  const acquireLock = useCallback(async () => {
    if (isUnmountedRef.current || leadId === 'not-found') return;
    try {
      const result = await dispatch(getLead(leadId)).unwrap();
      if (onLockAcquired) {
        onLockAcquired(result);
      }
      return result;
    } catch (error) {
      if (error.type === 'LOCK_CONFLICT' && onLockConflict) {
        onLockConflict(error);
        // Don't re-throw conflict errors, let the modal handle it
        return null;
      }
      throw error;
    }
  }, [leadId, dispatch, onLockAcquired, onLockConflict]);

  /**
   * Release lock on lead
   */
  const releaseLockOnLead = useCallback(async () => {
    if (!hasLockOnLead || isUnmountedRef.current) return;

    try {
      const result = await dispatch(releaseLock(leadId)).unwrap();
      if (onLockReleased) {
        onLockReleased(result);
      }
      return result;
    } catch (error) {
      console.error('Failed to release lock:', error);
      throw error;
    }
  }, [hasLockOnLead, leadId, dispatch, onLockReleased]);

  /**
   * Start heartbeat mechanism
   */
  const startHeartbeat = useCallback(() => {
    if (!enableHeartbeat || heartbeatIntervalRef.current || isUnmountedRef.current) {
      return;
    }

    const intervalId = setInterval(async () => {
      if (isUnmountedRef.current || !hasLockOnLead) {
        clearInterval(intervalId);
        return;
      }

      try {
        await dispatch(sendHeartbeat(leadId)).unwrap();
      } catch (error) {
        console.error('Heartbeat failed:', error);
        // The Redux slice will handle failure counting and lock loss
        if (error.type === 'LOCK_LOST' && onLockLost) {
          onLockLost(error);
        }
      }
    }, HEARTBEAT_INTERVAL);

    heartbeatIntervalRef.current = intervalId;
    dispatch(setHeartbeatInterval(intervalId));
  }, [enableHeartbeat, hasLockOnLead, leadId, dispatch, onLockLost]);

  /**
   * Stop heartbeat mechanism
   */
  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
      dispatch(clearHeartbeat());
    }
  }, [dispatch]);

  /**
   * Force clear all lock state
   */
  const clearAllLocks = useCallback(() => {
    stopHeartbeat();
    dispatch(clearLockState());
  }, [dispatch, stopHeartbeat]);

  // Auto-acquire lock on mount if enabled
  useEffect(() => {
    if (autoLock && leadId && !hasLockOnLead) {
      acquireLock();
    }
  }, [autoLock, leadId, hasLockOnLead, acquireLock]);

  // Start heartbeat when lock is acquired
  useEffect(() => {
    if (hasLockOnLead && enableHeartbeat) {
      startHeartbeat();
    } else {
      stopHeartbeat();
    }

    return () => {
      stopHeartbeat();
    };
  }, [hasLockOnLead, enableHeartbeat, startHeartbeat, stopHeartbeat]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      stopHeartbeat();

      // Release lock on unmount if we have it
      if (hasLockOnLead) {
        dispatch(releaseLock(leadId));
      }
    };
  }, [hasLockOnLead, leadId, dispatch, stopHeartbeat]);

  // Browser close/refresh handling
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (hasLockOnLead) {
        // Use navigator.sendBeacon for reliable cleanup on page unload
        const queryParams = sessionManager.getQueryParams();
        const queryString = buildQueryString(queryParams);
        navigator.sendBeacon(
          `${process.env.REACT_APP_BASE_URL}/sales/leads/${leadId}/release?${queryString}`,
          JSON.stringify({})
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasLockOnLead, leadId]);

  return {
    // State
    lockedLead,
    lockStatus,
    hasActiveLock: hasLockOnLead,
    lockConflict,
    lockError,
    isLoading: lockLoading,

    // Actions
    acquireLock,
    releaseLock: releaseLockOnLead,
    startHeartbeat,
    stopHeartbeat,
    clearAllLocks,

    // Computed values
    isLocked: hasLockOnLead,
    canEdit: hasLockOnLead,
    lockedBy: lockStatus.lockedBy,
    lockedByName: lockStatus.lockedByName,
    lockedAt: lockStatus.lockedAt,
  };
};

/**
 * Simplified hook for basic lead locking
 * @param {string} leadId - Lead ID to lock
 * @returns {Object} Basic lock state and controls
 */
export const useLeadLockSimple = (leadId) => {
  const { hasActiveLock, lockConflict, acquireLock, releaseLock, isLoading } =
    useLeadLock(leadId);

  return {
    isLocked: hasActiveLock,
    conflict: lockConflict,
    lock: acquireLock,
    unlock: releaseLock,
    loading: isLoading.getLead || isLoading.releaseLock,
  };
};

/**
 * Hook for checking lock status without acquiring
 * @param {string} leadId - Lead ID to check
 * @returns {Object} Lock status information
 */
export const useLeadLockStatus = (leadId) => {
  const dispatch = useDispatch();
  const lockStatus = useSelector(selectLockStatus);
  const isLoading = useSelector((state) => state.leadLock.isLoading.checkStatus);

  const checkStatus = useCallback(async () => {
    if (!leadId) return;

    try {
      return await dispatch(checkLockStatus(leadId)).unwrap();
    } catch (error) {
      console.error('Failed to check lock status:', error);
      throw error;
    }
  }, [leadId, dispatch]);

  useEffect(() => {
    if (leadId) {
      checkStatus();
    }
  }, [leadId, checkStatus]);

  return {
    lockStatus,
    checkStatus,
    isLoading,
    isLocked: lockStatus.isLocked,
    lockedBy: lockStatus.lockedBy,
    lockedByName: lockStatus.lockedByName,
  };
};

export default useLeadLock;
