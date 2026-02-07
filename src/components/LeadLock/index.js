/**
 * Lead Lock Components Export Index
 *
 * Centralized exports for all lead locking components and utilities
 */

// Components
export { default as LeadLockStatus } from './LeadLockStatus';
export { default as LeadLockConflictModal } from './LeadLockConflictModal';
export { default as LeadLockWarning } from './LeadLockWarning';

// HOCs
export {
  default as withLeadLock,
  withLeadLockStandard,
  withLeadLockReadOnly,
  withLeadLockStatusOnly,
} from './withLeadLock';

// Hooks
export {
  useLeadLock,
  useLeadLockSimple,
  useLeadLockStatus,
  default as useLeadLockHook,
} from '../../hooks/useLeadLock';

// Redux
export {
  // Actions
  getLead,
  releaseLock,
  sendHeartbeat,
  checkLockStatus,
  clearLockState,
  clearLock,
  clearConflict,
  clearError,
  setHeartbeatInterval,
  clearHeartbeat,
  showConflictModal,
  hideConflictModal,
  showLeaveWarning,
  hideLeaveWarning,

  // Selectors
  selectLockedLead,
  selectLockStatus,
  selectHeartbeatState,
  selectLockConflict,
  selectLockLoading,
  selectLockError,
  selectLockSuccess,
  selectLockUI,
  selectHasActiveLock,
  selectIsHeartbeatActive,
  selectShouldShowConflictModal,
} from '../../features/sales/leadLockSlice';

// Services
export {
  leadLockService,
  default as LeadLockService,
} from '../../features/sales/leadLockService';

// Utilities
export { default as sessionManager } from '../../utils/sessionManager';
