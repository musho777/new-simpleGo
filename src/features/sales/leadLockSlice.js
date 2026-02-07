/**
 * Lead Lock Redux Slice
 *
 * Manages lead locking state including:
 * - Current locked lead information
 * - Lock status and conflicts
 * - Heartbeat management
 * - Error handling
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import sessionManager from 'utils/sessionManager';

import { leadLockService } from './leadLockService';

// Async Thunks for lead lock operations

/**
 * Get lead with automatic lock
 */
export const getLead = createAsyncThunk(
  'leadLock/getLead',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await leadLockService.getLead(leadId);
      return { leadId, ...response };
    } catch (error) {
      // Handle 409 conflict specifically
      if (error.status === 409) {
        return rejectWithValue({
          type: 'LOCK_CONFLICT',
          message: error.message,
          lockedBy: error.lockedBy,
          leadId: error.leadId,
        });
      }
      return rejectWithValue({
        type: 'API_ERROR',
        message: error.message,
      });
    }
  }
);

/**
 * Release lead lock
 */
export const releaseLock = createAsyncThunk(
  'leadLock/releaseLock',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await leadLockService.releaseLock(leadId);
      return { leadId, ...response };
    } catch (error) {
      return rejectWithValue({
        type: 'API_ERROR',
        message: error.message,
      });
    }
  }
);

/**
 * Send heartbeat to keep lock active
 */
export const sendHeartbeat = createAsyncThunk(
  'leadLock/sendHeartbeat',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await leadLockService.sendHeartbeat(leadId);
      return { leadId, ...response };
    } catch (error) {
      return rejectWithValue({
        type: 'HEARTBEAT_ERROR',
        message: error.message,
      });
    }
  }
);

/**
 * Check lock status without attempting to lock
 */
export const checkLockStatus = createAsyncThunk(
  'leadLock/checkLockStatus',
  async (leadId, { rejectWithValue }) => {
    try {
      const response = await leadLockService.checkLockStatus(leadId);
      return { leadId, ...response };
    } catch (error) {
      return rejectWithValue({
        type: 'API_ERROR',
        message: error.message,
      });
    }
  }
);

const initialState = {
  // Current locked lead information
  lockedLead: {
    leadId: null,
    lockInfo: null,
    data: null,
  },

  // Lock status tracking
  lockStatus: {
    isLocked: false,
    lockedBy: null,
    lockedByName: null,
    lockedAt: null,
  },

  // Heartbeat management
  heartbeat: {
    isActive: false,
    lastSent: null,
    intervalId: null,
    failureCount: 0,
  },

  // Conflict information
  conflict: {
    hasConflict: false,
    lockedBy: null,
    message: null,
    leadId: null,
  },

  // Loading states
  isLoading: {
    getLead: false,
    releaseLock: false,
    heartbeat: false,
    checkStatus: false,
  },

  // Error handling
  error: null,

  // Success states
  success: {
    lockAcquired: false,
    lockReleased: false,
  },

  // UI state
  ui: {
    showConflictModal: false,
    showLeaveWarning: false,
  },
};

const leadLockSlice = createSlice({
  name: 'leadLock',
  initialState,
  reducers: {
    // Clear all lock state
    clearLockState: () => {
      return { ...initialState };
    },

    // Clear specific lock
    clearLock: (state) => {
      state.lockedLead = initialState.lockedLead;
      state.lockStatus = initialState.lockStatus;
      state.success.lockAcquired = false;
    },

    // Clear conflict state
    clearConflict: (state) => {
      state.conflict = initialState.conflict;
      state.ui.showConflictModal = false;
    },

    // Clear error state
    clearError: (state) => {
      state.error = null;
    },

    // Set heartbeat interval ID
    setHeartbeatInterval: (state, action) => {
      state.heartbeat.intervalId = action.payload;
      state.heartbeat.isActive = true;
    },

    // Clear heartbeat
    clearHeartbeat: (state) => {
      state.heartbeat.isActive = false;
      state.heartbeat.intervalId = null;
      state.heartbeat.failureCount = 0;
    },

    // Update heartbeat failure count
    incrementHeartbeatFailure: (state) => {
      state.heartbeat.failureCount += 1;
    },

    // Reset heartbeat failures
    resetHeartbeatFailures: (state) => {
      state.heartbeat.failureCount = 0;
    },

    // UI state management
    showConflictModal: (state) => {
      state.ui.showConflictModal = true;
    },

    hideConflictModal: (state) => {
      state.ui.showConflictModal = false;
    },

    showLeaveWarning: (state) => {
      state.ui.showLeaveWarning = true;
    },

    hideLeaveWarning: (state) => {
      state.ui.showLeaveWarning = false;
    },

    // Update lead data while maintaining lock
    updateLeadData: (state, action) => {
      if (state.lockedLead.leadId && state.lockStatus.isLocked) {
        state.lockedLead.data = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    // Get Lead with Lock
    builder
      .addCase(getLead.pending, (state) => {
        state.isLoading.getLead = true;
        state.error = null;
        state.success.lockAcquired = false;
      })
      .addCase(getLead.fulfilled, (state, action) => {
        state.isLoading.getLead = false;
        state.lockedLead = {
          leadId: action.payload.leadId,
          lockInfo: action.payload.lockInfo,
          data: action.payload.data || action.payload,
        };
        state.lockStatus = {
          isLocked: true,
          lockedBy: sessionManager.getSessionId(),
          lockedByName: 'You',
          lockedAt: new Date().toISOString(),
        };
        state.success.lockAcquired = true;
        state.conflict.hasConflict = false;
      })
      .addCase(getLead.rejected, (state, action) => {
        state.isLoading.getLead = false;
        state.error = action.payload;

        if (action.payload?.type === 'LOCK_CONFLICT') {
          state.conflict = {
            hasConflict: true,
            lockedBy: action.payload.lockedBy,
            message: action.payload.message,
            leadId: action.payload.leadId,
          };
          state.ui.showConflictModal = true;
        }
      });

    // Release Lock
    builder
      .addCase(releaseLock.pending, (state) => {
        state.isLoading.releaseLock = true;
        state.error = null;
      })
      .addCase(releaseLock.fulfilled, (state) => {
        state.isLoading.releaseLock = false;
        state.lockedLead = initialState.lockedLead;
        state.lockStatus = initialState.lockStatus;
        state.success.lockReleased = true;
        state.success.lockAcquired = false;

        // Clear heartbeat
        state.heartbeat.isActive = false;
        state.heartbeat.intervalId = null;
      })
      .addCase(releaseLock.rejected, (state, action) => {
        state.isLoading.releaseLock = false;
        state.error = action.payload;
      });

    // Send Heartbeat
    builder
      .addCase(sendHeartbeat.pending, (state) => {
        state.isLoading.heartbeat = true;
      })
      .addCase(sendHeartbeat.fulfilled, (state) => {
        state.isLoading.heartbeat = false;
        state.heartbeat.lastSent = new Date().toISOString();
        state.heartbeat.failureCount = 0;
      })
      .addCase(sendHeartbeat.rejected, (state) => {
        state.isLoading.heartbeat = false;
        state.heartbeat.failureCount += 1;

        // If too many failures, assume lock is lost
        if (state.heartbeat.failureCount >= 3) {
          state.lockedLead = initialState.lockedLead;
          state.lockStatus = initialState.lockStatus;
          state.success.lockAcquired = false;
          state.error = {
            type: 'LOCK_LOST',
            message: 'Lock has been lost due to network issues',
          };
        }
      });

    // Check Lock Status
    builder
      .addCase(checkLockStatus.pending, (state) => {
        state.isLoading.checkStatus = true;
        state.error = null;
      })
      .addCase(checkLockStatus.fulfilled, (state, action) => {
        state.isLoading.checkStatus = false;
        state.lockStatus = {
          isLocked: action.payload.isLocked,
          lockedBy: action.payload.lockedBy,
          lockedByName: action.payload.lockedByName,
          lockedAt: action.payload.lockedAt,
        };
      })
      .addCase(checkLockStatus.rejected, (state, action) => {
        state.isLoading.checkStatus = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const {
  clearLockState,
  clearLock,
  clearConflict,
  clearError,
  setHeartbeatInterval,
  clearHeartbeat,
  incrementHeartbeatFailure,
  resetHeartbeatFailures,
  showConflictModal,
  hideConflictModal,
  showLeaveWarning,
  hideLeaveWarning,
  updateLeadData,
} = leadLockSlice.actions;

// Selectors
export const selectLockedLead = (state) => state.leadLock.lockedLead;
export const selectLockStatus = (state) => state.leadLock.lockStatus;
export const selectHeartbeatState = (state) => state.leadLock.heartbeat;
export const selectLockConflict = (state) => state.leadLock.conflict;
export const selectLockLoading = (state) => state.leadLock.isLoading;
export const selectLockError = (state) => state.leadLock.error;
export const selectLockSuccess = (state) => state.leadLock.success;
export const selectLockUI = (state) => state.leadLock.ui;

// Compound selectors
export const selectHasActiveLock = (state) =>
  state.leadLock.success.lockAcquired && state.leadLock.lockedLead.leadId;
export const selectIsHeartbeatActive = (state) => state.leadLock.heartbeat.isActive;
export const selectShouldShowConflictModal = (state) =>
  state.leadLock.ui.showConflictModal && state.leadLock.conflict.hasConflict;

export default leadLockSlice.reducer;
