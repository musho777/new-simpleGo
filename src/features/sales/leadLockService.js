/**
 * Lead Lock API Service
 *
 * Provides API methods for lead locking operations:
 * - Get lead with automatic lock
 * - Release lead lock
 * - Send heartbeat to keep lock active
 * - Check lock status
 */
import ApiClient from 'api/axiosClient';
import { buildQueryString } from 'utils';
import sessionManager from 'utils/sessionManager';

class LeadLockService {
  /**
   * Get lead data with automatic lock acquisition
   * @param {string} leadId - Lead ID to lock and retrieve
   * @returns {Promise<Object>} Lead data with lock information
   * @throws {Object} Error with status 409 for lock conflicts
   */
  async getLead(leadId) {
    if (leadId !== 'not-found')
      try {
        const queryParams = sessionManager.getQueryParams();
        const queryString = buildQueryString(queryParams);
        const response = await ApiClient.get(`/sales/leads/${leadId}?${queryString}`);

        // The API response structure should match the existing lead data structure
        // Convert the response to match the expected format
        return {
          // Transform the response to match existing lead structure
          leadInformation: response.leadInformation || response,
          availableOffers: response.availableOffers || [],
          availableStatuses: response.availableStatuses || [],
          currentStatus: response.currentStatus,
          orders: response.orders || [],
          notes: response.notes || [],
          statusHistory: response.statusHistory || [],

          lockInfo: response.lockInfo || {
            lockedBy: sessionManager.getSessionId(),
            lockedAt: new Date().toISOString(),
            message: 'Lead locked successfully',
          },
        };
      } catch (error) {
        // Handle 409 conflict specifically for lock conflicts
        if (error.status === 409) {
          const conflictError = new Error(error.message);
          conflictError.status = 409;
          conflictError.lockedBy = error.lockedBy;
          conflictError.leadId = leadId;
          throw conflictError;
        }

        // Re-throw other errors with proper structure
        const apiError = new Error(error.message || 'Failed to get lead');
        apiError.status = error.status || 500;
        throw apiError;
      }
  }

  /**
   * Release lock on a lead
   * @param {string} leadId - Lead ID to release lock for
   * @returns {Promise<Object>} Success response
   */
  async releaseLock(leadId) {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.post(
        `/sales/leads/${leadId}/release?${queryString}`,
        {}
      );

      return {
        message: response.message || 'Lead released successfully',
        releasedAt: new Date().toISOString(),
      };
    } catch (error) {
      const apiError = new Error(error.message || 'Failed to release lead lock');
      apiError.status = error.status || 500;
      throw apiError;
    }
  }

  /**
   * Send heartbeat to keep lock active
   * @param {string} leadId - Lead ID to send heartbeat for
   * @returns {Promise<Object>} Heartbeat response
   */
  async sendHeartbeat(leadId) {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.post(
        `/sales/leads/${leadId}/activity?${queryString}`,
        {}
      );

      return {
        message: response.message || 'Lead activity updated',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const apiError = new Error(error.message || 'Failed to send heartbeat');
      apiError.status = error.status || 500;
      throw apiError;
    }
  }

  /**
   * Check lock status without attempting to acquire lock
   * @param {string} leadId - Lead ID to check lock status for
   * @returns {Promise<Object>} Lock status information
   */
  async checkLockStatus(leadId) {
    try {
      const queryParams = sessionManager.getQueryParams();
      const queryString = buildQueryString(queryParams);
      const response = await ApiClient.get(
        `/sales/leads/${leadId}/lock-status?${queryString}`
      );

      return {
        isLocked: response.isLocked || false,
        lockedBy: response.lockedBy || null,
        lockedByName: response.lockedByName || null,
        lockedAt: response.lockedAt || null,
      };
    } catch (error) {
      const apiError = new Error(error.message || 'Failed to check lock status');
      apiError.status = error.status || 500;
      throw apiError;
    }
  }

  /**
   * Batch release multiple locks (utility method)
   * @param {string[]} leadIds - Array of lead IDs to release
   * @returns {Promise<Object>} Batch release results
   */
  async batchReleaseLocks(leadIds) {
    const results = {
      successful: [],
      failed: [],
    };

    const promises = leadIds.map(async (leadId) => {
      try {
        await this.releaseLock(leadId);
        results.successful.push(leadId);
      } catch (error) {
        results.failed.push({ leadId, error: error.message });
      }
    });

    await Promise.allSettled(promises);
    return results;
  }

  /**
   * Check if current session has lock on lead
   * @param {string} leadId - Lead ID to check
   * @returns {Promise<boolean>} Whether current session has the lock
   */
  async hasLock(leadId) {
    try {
      const status = await this.checkLockStatus(leadId);
      const currentSessionId = sessionManager.getSessionId();
      return status.isLocked && status.lockedBy === currentSessionId;
    } catch (error) {
      // If we can't check, assume we don't have lock
      return false;
    }
  }
}

// Create singleton instance
export const leadLockService = new LeadLockService();

export default leadLockService;
