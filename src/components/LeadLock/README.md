# Lead Locking System Documentation

A comprehensive lead locking system for React/Redux applications that prevents concurrent editing conflicts by implementing automatic lead locking, heartbeat management, and user-friendly conflict resolution.

## Features

- ✅ **Automatic Lock Management**: Locks leads when users open them, releases on navigation away
- ✅ **Heartbeat System**: Keeps locks active with periodic API calls (5-minute intervals)
- ✅ **Conflict Resolution**: User-friendly modals when leads are locked by others
- ✅ **Session Management**: Unique session IDs for lock identification
- ✅ **Browser Integration**: Handles page refresh, close, and navigation events
- ✅ **Redux Integration**: Full state management with actions and selectors
- ✅ **React Hooks**: Easy-to-use custom hooks for component integration
- ✅ **HOC Support**: Higher-order components for automatic page protection
- ✅ **TypeScript Ready**: Fully typed implementation
- ✅ **Error Handling**: Comprehensive error handling and retry mechanisms

## Quick Start

### 1. Basic Integration with HOC (Recommended)

```jsx
import React from 'react';

import { withLeadLockStandard } from 'components/LeadLock';

const LeadDetailPage = ({ leadLock, isLocked, canEdit, readOnlyMode }) => {
  return (
    <div>
      <h1>Lead Details</h1>

      {/* Form fields - automatically disabled if no lock */}
      <input
        disabled={!canEdit}
        value={leadData.name}
        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
      />

      {/* Save button - only enabled if user has lock */}
      <button disabled={!canEdit} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

// Wrap with HOC for automatic lock management
export default withLeadLockStandard(LeadDetailPage);
```

### 2. Using Hooks for More Control

```jsx
import React from 'react';

import { LeadLockStatus, useLeadLock } from 'components/LeadLock';

const LeadDetailPage = () => {
  const { leadId } = useParams();

  const leadLock = useLeadLock(leadId, {
    onLockAcquired: (result) => console.log('Got lock!', result),
    onLockConflict: (error) => console.warn('Lock conflict!', error),
    onLockLost: (error) => console.error('Lost lock!', error),
  });

  return (
    <div>
      <LeadLockStatus {...leadLock.lockStatus} />

      {leadLock.isLocked ? (
        <div>You can edit this lead</div>
      ) : (
        <div>This lead is locked by another user</div>
      )}
    </div>
  );
};
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Components                     │
├─────────────────┬───────────────┬───────────────────────────┤
│   HOC Wrapper   │  React Hooks  │      UI Components        │
│  withLeadLock   │  useLeadLock  │  Status, Modal, Warning   │
├─────────────────┼───────────────┼───────────────────────────┤
│                 Redux Store (leadLockSlice)                │
├─────────────────────────────────────────────────────────────┤
│                   API Service Layer                        │
│              (leadLockService.js)                         │
├─────────────────────────────────────────────────────────────┤
│              Session Management                           │
│             (sessionManager.js)                          │
├─────────────────────────────────────────────────────────────┤
│                    Backend APIs                            │
│  GET /leads/:id  │  POST /leads/:id/release  │  etc.       │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Redux Slice (`leadLockSlice.js`)

Manages all lead lock state including:

```javascript
const state = {
  lockedLead: { leadId, lockInfo, data },
  lockStatus: { isLocked, lockedBy, lockedByName, lockedAt },
  heartbeat: { isActive, lastSent, intervalId, failureCount },
  conflict: { hasConflict, lockedBy, message, leadId },
  isLoading: {
    /* various loading states */
  },
  error: null,
  success: { lockAcquired, lockReleased },
  ui: { showConflictModal, showLeaveWarning },
};
```

**Key Actions:**

- `getLead(leadId)` - Get lead with automatic lock
- `releaseLock(leadId)` - Release lead lock
- `sendHeartbeat(leadId)` - Keep lock active
- `checkLockStatus(leadId)` - Check lock without acquiring

### 2. API Service (`leadLockService.js`)

Handles all backend communication:

```javascript
const leadLockService = {
  async getLead(leadId),        // GET /sales/leads/:leadId (with session header)
  async releaseLock(leadId),    // POST /sales/leads/:leadId/release
  async sendHeartbeat(leadId),  // POST /sales/leads/:leadId/activity
  async checkLockStatus(leadId) // GET /sales/leads/:leadId/lock-status
}
```

### 3. Session Manager (`sessionManager.js`)

Manages unique session identifiers:

```javascript
const sessionManager = {
  getSessionId(),      // Get current session ID
  getHeaders(),        // Get headers with session ID
  regenerateSession(), // Create new session
  clearSession()       // Clear session data
}
```

### 4. Custom Hooks

**`useLeadLock(leadId, options)`** - Main hook with full functionality
**`useLeadLockSimple(leadId)`** - Simplified version for basic use cases
**`useLeadLockStatus(leadId)`** - Status checking only

### 5. UI Components

**`LeadLockStatus`** - Shows current lock status
**`LeadLockConflictModal`** - Handles lock conflicts
**`LeadLockWarning`** - Warns before leaving with active lock

### 6. Higher-Order Components

**`withLeadLock`** - Generic HOC with full options
**`withLeadLockStandard`** - Preset for typical lead pages
**`withLeadLockReadOnly`** - Preset for read-only views

## Integration Patterns

### Pattern 1: Full Page Protection (Recommended)

```jsx
import { withLeadLockStandard } from 'components/LeadLock';

const LeadPage = ({ leadLock, isLocked, canEdit }) => {
  // Component automatically gets lock on mount
  // UI components (status, modals) are automatically included
  // Lock is released on unmount
};

export default withLeadLockStandard(LeadPage);
```

### Pattern 2: Manual Hook Integration

```jsx
const LeadPage = () => {
  const { leadId } = useParams();
  const leadLock = useLeadLock(leadId);

  // Manual control over when to acquire/release locks
  // Custom conflict and error handling
  // Custom UI integration
};
```

### Pattern 3: Redux Direct Integration

```jsx
const LeadPage = () => {
  const dispatch = useDispatch();
  const lockState = useSelector(selectLockStatus);

  useEffect(() => {
    dispatch(getLead(leadId));
    return () => dispatch(releaseLock(leadId));
  }, [leadId]);
};
```

## Configuration Options

### HOC Options

```jsx
withLeadLock(Component, {
  leadIdParam: 'leadId', // URL parameter name
  leadIdProp: 'leadId', // Component prop name
  autoLock: true, // Auto-acquire lock on mount
  enableHeartbeat: true, // Enable heartbeat system
  showLockStatus: true, // Show status component
  showConflictModal: true, // Show conflict modal
  showLeaveWarning: true, // Show leave warning
  redirectOnConflict: '/leads', // Redirect route on conflict
  redirectOnLockLost: '/leads', // Redirect route on lock loss
  onLockAcquired: (result) => {},
  onLockReleased: (result) => {},
  onLockConflict: (error) => {},
  onLockLost: (error) => {},
});
```

### Hook Options

```jsx
useLeadLock(leadId, {
  autoLock: true, // Auto-acquire lock
  enableHeartbeat: true, // Enable heartbeat
  onLockAcquired: (result) => {},
  onLockReleased: (result) => {},
  onLockConflict: (error) => {},
  onLockLost: (error) => {},
});
```

## API Requirements

Your backend must implement these endpoints:

### GET /sales/leads/:leadId

- **Headers**: `x-session-id: <unique-session-id>`
- **Success (200)**: `{ data: {...}, lockInfo: { lockedBy, lockedAt, message } }`
- **Conflict (409)**: `{ message, lockedBy, leadId }`

### POST /sales/leads/:leadId/release

- **Headers**: `x-session-id: <unique-session-id>`
- **Success (200)**: `{ message: "Lead released successfully" }`

### POST /sales/leads/:leadId/activity

- **Headers**: `x-session-id: <unique-session-id>`
- **Success (200)**: `{ message: "Lead activity updated" }`

### GET /sales/leads/:leadId/lock-status

- **Success (200)**: `{ isLocked: boolean, lockedBy?: string, lockedByName?: string, lockedAt?: Date }`

## Error Handling

The system handles various error scenarios:

1. **Network Errors**: Automatic retries with exponential backoff
2. **Lock Conflicts**: User-friendly modal with retry options
3. **Heartbeat Failures**: Automatic lock loss detection
4. **Session Expiry**: Automatic session regeneration
5. **Browser Events**: Graceful cleanup on page close/refresh

## Testing

### Unit Tests

```javascript
import { renderHook } from '@testing-library/react-hooks';
import { useLeadLock } from 'components/LeadLock';

test('should acquire lock on mount', async () => {
  const { result } = renderHook(() => useLeadLock('test-lead-id'));

  await waitFor(() => {
    expect(result.current.isLocked).toBe(true);
  });
});
```

### Integration Tests

```javascript
import { render } from '@testing-library/react';
import { withLeadLockStandard } from 'components/LeadLock';

const TestComponent = withLeadLockStandard(({ isLocked }) => (
  <div data-testid="lock-status">{isLocked ? 'Locked' : 'Unlocked'}</div>
));

test('should show lock status', () => {
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId('lock-status')).toHaveTextContent('Locked');
});
```

## Performance Considerations

1. **Heartbeat Frequency**: Default 5 minutes balances responsiveness vs. server load
2. **Session Management**: Uses sessionStorage for tab isolation
3. **Component Optimization**: Memoized selectors prevent unnecessary re-renders
4. **Cleanup**: Proper cleanup prevents memory leaks

## Security Considerations

1. **Session IDs**: Unique per browser session, not persistent across logins
2. **Lock Expiry**: Server-side timeout prevents orphaned locks
3. **Headers**: Session ID in headers, not URL parameters
4. **Validation**: All lock operations validated server-side

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+

Required APIs:

- `sessionStorage`
- `localStorage`
- `navigator.sendBeacon`
- `beforeunload` event

## Troubleshooting

### Common Issues

**Lock not acquired:**

- Check network connectivity
- Verify API endpoints are working
- Check browser console for errors

**Heartbeat failures:**

- Check server-side lock timeout settings
- Verify network stability
- Check for browser tab throttling

**Modal not showing:**

- Check Redux store connection
- Verify conflict state in Redux DevTools
- Check component mounting

**Session issues:**

- Clear browser storage
- Check for multiple tabs with same lead
- Verify session manager initialization

### Debug Information

Enable debug logging:

```javascript
// In browser console
localStorage.setItem('leadLock:debug', 'true');
```

View Redux state:

```javascript
// In browser console
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
```

## License

This lead locking system is part of the CRM application. All rights reserved.
