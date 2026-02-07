/**
 * Session Manager Utility
 *
 * Manages unique session IDs for lead locking system
 * Generates and persists session IDs across browser sessions
 */
import { v4 as uuidv4 } from 'uuid';

const SESSION_ID_KEY = 'lead_session_id';
const PROJECT_ID_KEY = 'sales_project_id';

class SessionManager {
  constructor() {
    this.sessionId = null;
    this.projectId = null;
    this.init();
  }

  /**
   * Initialize session manager
   * Creates or retrieves existing session ID and projectId
   */
  init() {
    // Try to get existing session ID from sessionStorage (clears on tab close)
    // Fall back to localStorage for persistence across browser restarts
    this.sessionId =
      sessionStorage.getItem(SESSION_ID_KEY) || localStorage.getItem(SESSION_ID_KEY);

    if (!this.sessionId) {
      this.generateNewSession();
    } else {
      // Store in sessionStorage for this tab session
      sessionStorage.setItem(SESSION_ID_KEY, this.sessionId);
    }

    // Retrieve projectId from sessionStorage
    this.projectId = sessionStorage.getItem(PROJECT_ID_KEY);
  }

  /**
   * Generate a new unique session ID
   */
  generateNewSession() {
    this.sessionId = uuidv4();
    // Store in both sessionStorage (priority) and localStorage (fallback)
    sessionStorage.setItem(SESSION_ID_KEY, this.sessionId);
    localStorage.setItem(SESSION_ID_KEY, this.sessionId);
  }

  /**
   * Get current session ID
   * @returns {string} Current session ID
   */
  getSessionId() {
    if (!this.sessionId) {
      this.init();
    }
    return this.sessionId;
  }

  /**
   * Force regenerate session ID (useful for testing or after logout)
   */
  regenerateSession() {
    this.generateNewSession();
  }

  /**
   * Clear session data
   */
  clearSession() {
    sessionStorage.removeItem(SESSION_ID_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    sessionStorage.removeItem(PROJECT_ID_KEY);
    this.sessionId = null;
    this.projectId = null;
  }

  /**
   * Get session headers for API requests
   * @returns {Object} Headers object with session ID
   * @deprecated Use getQueryParams() instead - session ID now sent as query parameter
   */
  getHeaders() {
    return {
      'x-session-id': this.getSessionId(),
    };
  }

  /**
   * Get session query parameters for API requests
   * @returns {Object} Query parameters object with session ID and projectId (if set)
   */
  getQueryParams() {
    const params = {
      sessionId: this.getSessionId(),
    };

    if (this.projectId) {
      params.projectId = this.projectId;
    }

    return params;
  }

  /**
   * Set project ID for current session
   * @param {string} projectId - The project ID to store
   */
  setProjectId(projectId) {
    this.projectId = projectId;
    if (projectId) {
      sessionStorage.setItem(PROJECT_ID_KEY, projectId);
    } else {
      sessionStorage.removeItem(PROJECT_ID_KEY);
    }
  }

  /**
   * Get current project ID
   * @returns {string|null} Current project ID or null if not set
   */
  getProjectId() {
    return this.projectId;
  }

  /**
   * Clear project ID from session
   */
  clearProjectId() {
    this.projectId = null;
    sessionStorage.removeItem(PROJECT_ID_KEY);
  }
}

// Create singleton instance
const sessionManager = new SessionManager();

export default sessionManager;
