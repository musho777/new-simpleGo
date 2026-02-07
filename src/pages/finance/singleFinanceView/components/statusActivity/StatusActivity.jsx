import React from 'react';

import { baseURL, formatFileSize } from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import ApprovedIcon from '../../../../../assets/finance/checked.svg';
import DoneIcon from '../../../../../assets/finance/done.svg';
import PendingIcon from '../../../../../assets/finance/pending.svg';
import RejectedIcon from '../../../../../assets/finance/reject_icon.svg';
import TimeLeft from '../../../../../assets/finance/time-left.svg';
import {
  ActivityContainer,
  Column,
  FileName,
  FileSize,
  Icon,
  IconFile,
  Info,
  InfoText,
  Notes,
  Row,
  Title,
} from './StatusActivity.styles';
import fileIcon from './file.svg';

const StatusActivity = ({ data, notes }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          borderColor: '#FFA500',
          backgroundColor: 'rgba(255, 165, 0, 0.1)',
          icon: PendingIcon,
          textColor: '#FFA500',
        };
      case 'approved':
        return {
          borderColor: '#28A745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          icon: ApprovedIcon,
          textColor: '#28A745',
        };
      case 'rejected':
        return {
          borderColor: '#DC3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          icon: RejectedIcon,
          textColor: '#DC3545',
        };
      case 'done':
        return {
          borderColor: '#28A745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          icon: DoneIcon,
          textColor: '#28A745',
        };
      case 'completed':
        return {
          borderColor: '#2D6CDF',
          backgroundColor: '#2D6CDF1A',
          icon: TimeLeft,
          textColor: '#2D6CDF',
        };
      default:
        return {
          borderColor: '#2D6CDF',
          backgroundColor: '#2D6CDF1A',
          icon: TimeLeft,
          textColor: '#2D6CDF',
        };
    }
  };

  const handleFilePreview = async (file) => {
    try {
      const fileUrl = `${baseURL.slice(0, -1)}${file.path}`;
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = file.originalName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const statusConfig = getStatusConfig(data?.toStatus);
  return (
    <ActivityContainer
      $borderColor={statusConfig.borderColor}
      $backgroundColor={statusConfig.backgroundColor}
      $textColor={statusConfig.textColor}
    >
      <Icon src={statusConfig.icon} alt={data?.toStatus || 'Status'} />
      <Info>
        <Title>{data.toStatus}</Title>
        <InfoText $textColor={statusConfig.textColor}>
          {data?.toStatus} by {data.changedBy?.name} {data.changedBy?.surname} on{' '}
          {formatDateTime(data?.createdAt || data?.changedAt)}
        </InfoText>
        {data.files?.length > 0 &&
          data.files.map((elm, i) => (
            <Row onClick={() => handleFilePreview(elm)} key={i}>
              <IconFile src={fileIcon} alt="file" style={{ width: '18px', height: '22px' }} />
              <Column>
                <FileName>{elm.originalName}</FileName>
                <FileSize>{formatFileSize(elm.size)}</FileSize>
              </Column>
            </Row>
          ))}
        <Notes>{notes}</Notes>
      </Info>
    </ActivityContainer>
  );
};

export default StatusActivity;
