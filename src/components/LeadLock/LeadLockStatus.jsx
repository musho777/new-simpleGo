/**
 * Lead Lock Status Component
 *
 * Displays current lock status and provides user feedback
 * Shows different states: locked by user, locked by others, unlocked
 */
import React from 'react';

import styled from 'styled-components';

const StatusContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['status'].includes(prop),
})`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  margin: 20px 20px 0 20px;

  ${(props) => {
    switch (props.status) {
      case 'locked-by-user':
        return `
          background-color: #e8f5e8;
          border: 1px solid #4caf50;
          color: #2e7d32;
        `;
      case 'locked-by-other':
        return `
          background-color: #fff3e0;
          border: 1px solid #ff9800;
          color: #e65100;
        `;
      case 'unlocked':
        return `
          background-color: #f5f5f5;
          border: 1px solid #ccc;
          color: #666;
        `;
      default:
        return `
          background-color: #f5f5f5;
          border: 1px solid #ccc;
          color: #666;
        `;
    }
  }}
`;

const StatusIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

const StatusText = styled.span`
  flex: 1;
`;

const Timestamp = styled.span`
  font-size: 12px;
  opacity: 0.7;
  margin-left: 8px;
`;

const LeadLockStatus = ({
  isLocked,
  lockedBy,
  lockedByName,
  lockedAt,
  currentUser,
  className,
}) => {
  const getStatusType = () => {
    if (!isLocked) return 'unlocked';
    if (lockedByName === 'You' || lockedBy === currentUser) return 'locked-by-user';
    return 'locked-by-other';
  };

  const getStatusIcon = () => {
    const statusType = getStatusType();
    switch (statusType) {
      case 'locked-by-user':
        return '🔒';
      case 'locked-by-other':
        return '⚠️';
      case 'unlocked':
        return '🔓';
      default:
        return '❓';
    }
  };

  const getStatusText = () => {
    const statusType = getStatusType();
    switch (statusType) {
      case 'locked-by-user':
        return 'You are currently viewing this lead';
      case 'locked-by-other':
        return `${lockedByName || 'Another user'} is currently viewing this lead`;
      case 'unlocked':
        return 'Lead is available for editing';
      default:
        return 'Lock status unknown';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';

    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));

      if (diffInMinutes < 1) {
        return 'just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      }
    } catch (error) {
      return '';
    }
  };

  return (
    <StatusContainer status={getStatusType()} className={className}>
      <StatusIcon>{getStatusIcon()}</StatusIcon>
      <StatusText>{getStatusText()}</StatusText>
      {lockedAt && <Timestamp>{formatTimestamp(lockedAt)}</Timestamp>}
    </StatusContainer>
  );
};

export default LeadLockStatus;
