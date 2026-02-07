/**
 * Example Lead Detail Page with Lead Locking
 *
 * Demonstrates how to integrate the lead locking system into a lead detail page
 * Shows different integration approaches: HOC, hooks, and manual integration
 */
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { LeadLockStatus, useLeadLock, withLeadLockStandard } from 'components/LeadLock';

// Example 1: Using HOC (Recommended for full pages)
const LeadDetailWithHOC = ({ leadLock, isLocked, canEdit, readOnlyMode }) => {
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Load lead data when component mounts
    if (leadLock.lockedLead.data) {
      setLeadData(leadLock.lockedLead.data);
    }
  }, [leadLock.lockedLead.data]);

  const handleFieldChange = (field, value) => {
    if (!canEdit) return; // Prevent editing if no lock

    setLeadData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!canEdit) return;

    try {
      // Save logic here
      console.log('Saving lead data:', leadData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save lead:', error);
    }
  };

  const handleCancel = () => {
    // Reset to original data
    if (leadLock.lockedLead.data) {
      setLeadData(leadLock.lockedLead.data);
      setHasUnsavedChanges(false);
    }
  };

  if (leadLock.isLoading) {
    return <div>Loading lead...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>Lead Details</h1>

      {/* Lock status is automatically shown by HOC */}

      {/* Read-only mode warning */}
      {readOnlyMode && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            marginBottom: '20px',
            color: '#856404',
          }}
        >
          <strong>Read-Only Mode:</strong> This lead is locked by another user. Changes cannot
          be saved.
        </div>
      )}

      {/* Form fields */}
      <div style={{ display: 'grid', gap: '15px' }}>
        <Input
          label="Name"
          value={leadData.name}
          onChange={(value) => handleFieldChange('name', value)}
          disabled={!canEdit}
        />

        <Input
          label="Email"
          value={leadData.email}
          onChange={(value) => handleFieldChange('email', value)}
          disabled={!canEdit}
          type="email"
        />

        <Input
          label="Phone"
          value={leadData.phone}
          onChange={(value) => handleFieldChange('phone', value)}
          disabled={!canEdit}
          type="tel"
        />

        <Input
          label="Notes"
          value={leadData.notes}
          onChange={(value) => handleFieldChange('notes', value)}
          disabled={!canEdit}
          multiline
          rows={4}
        />
      </div>

      {/* Action buttons */}
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={!canEdit || !hasUnsavedChanges}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!canEdit || !hasUnsavedChanges}
        >
          Save Changes
        </Button>
      </div>

      {/* Debug info */}
      <div
        style={{
          marginTop: '40px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'monospace',
        }}
      >
        <strong>Lock Debug Info:</strong>
        <br />
        Is Locked: {isLocked ? 'Yes' : 'No'}
        <br />
        Can Edit: {canEdit ? 'Yes' : 'No'}
        <br />
        Read Only: {readOnlyMode ? 'Yes' : 'No'}
        <br />
        Has Changes: {hasUnsavedChanges ? 'Yes' : 'No'}
        <br />
        Lead ID: {leadLock.leadId}
        <br />
        Locked By: {leadLock.lockedByName}
      </div>
    </div>
  );
};

// Wrap with HOC for automatic lock management
const LeadDetailWithHOCWrapped = withLeadLockStandard(LeadDetailWithHOC);

// Example 2: Using Hook Directly (for more control)
const LeadDetailWithHook = () => {
  const { leadId } = useParams();
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' });

  const leadLock = useLeadLock(leadId, {
    onLockAcquired: (result) => {
      console.log('Lock acquired!', result);
      // Load lead data
      if (result.data) {
        setLeadData(result.data);
      }
    },
    onLockConflict: (error) => {
      console.warn('Lock conflict!', error);
      // Handle conflict - maybe show a toast or redirect
    },
    onLockLost: (error) => {
      console.error('Lock lost!', error);
      // Handle lock loss - save data locally, show warning
    },
  });

  const handleSave = async () => {
    if (!leadLock.canEdit) {
      alert("Cannot save - you don't have the lock on this lead");
      return;
    }

    try {
      // Save logic
      console.log('Saving with hook approach:', leadData);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lead Details (Hook Approach)</h1>

      {/* Manual lock status display */}
      {/* <LeadLockStatus
        isLocked={leadLock.lockStatus.isLocked}
        lockedBy={leadLock.lockStatus.lockedBy}
        lockedByName={leadLock.lockStatus.lockedByName}
        lockedAt={leadLock.lockStatus.lockedAt}
      /> */}

      {leadLock.isLoading.getLead && <div>Loading...</div>}

      {leadLock.lockError && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error: {leadLock.lockError.message}
        </div>
      )}

      <Input
        label="Lead Name"
        value={leadData.name}
        onChange={(value) => setLeadData((prev) => ({ ...prev, name: value }))}
        disabled={!leadLock.canEdit}
      />

      <div style={{ marginTop: '20px' }}>
        <Button onClick={handleSave} disabled={!leadLock.canEdit} variant="primary">
          Save
        </Button>

        <Button
          onClick={leadLock.releaseLock}
          style={{ marginLeft: '10px' }}
          variant="outline"
        >
          Release Lock
        </Button>
      </div>
    </div>
  );
};

// Example 3: Manual Integration (for specific use cases)
const LeadDetailManual = () => {
  const { leadId } = useParams();
  // Manual integration would use the Redux actions directly
  // This is more complex but gives full control

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lead Details (Manual Integration)</h1>
      <p>For manual integration, use the Redux actions directly:</p>
      <pre
        style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '4px',
          fontSize: '12px',
        }}
      >
        {`import { useDispatch, useSelector } from 'react-redux';
import { 
  getLead, 
  releaseLock, 
  selectHasActiveLock 
} from 'components/LeadLock';

const MyComponent = () => {
  const dispatch = useDispatch();
  const hasLock = useSelector(selectHasActiveLock);
  
  useEffect(() => {
    dispatch(getLead('${leadId}'));
    return () => {
      dispatch(releaseLock('${leadId}'));
    };
  }, []);
  
  // ... rest of component
};`}
      </pre>
    </div>
  );
};

// Main example component with tabs
const LeadDetailExample = () => {
  const [activeTab, setActiveTab] = useState('hoc');

  const tabs = [
    { id: 'hoc', label: 'HOC Approach', component: LeadDetailWithHOCWrapped },
    { id: 'hook', label: 'Hook Approach', component: LeadDetailWithHook },
    { id: 'manual', label: 'Manual Integration', component: LeadDetailManual },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || LeadDetailWithHOCWrapped;

  return (
    <div>
      {/* Tab navigation */}
      <div
        style={{
          borderBottom: '1px solid #ddd',
          marginBottom: '20px',
          padding: '0 20px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              border: 'none',
              borderBottom:
                activeTab === tab.id ? '2px solid #007bff' : '2px solid transparent',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              color: activeTab === tab.id ? '#007bff' : '#666',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active component */}
      <ActiveComponent />
    </div>
  );
};

export default LeadDetailExample;
