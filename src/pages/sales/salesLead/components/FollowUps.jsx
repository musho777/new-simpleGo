import React, { useEffect, useRef, useState } from 'react';

import ApiClient from 'api/axiosClient';
import calendar from 'assets/salesReports/calendar.svg';
import close from 'assets/salesReports/close.svg';
import reschedule from 'assets/salesReports/reschedule.svg';
import loadIcon from 'common-ui/table/loading.svg';

import {
  ActionColumn,
  ActionContainer,
  ClickableIcon,
  EmptyHistoryMessage,
  FollowUpContent,
  FollowUpDate,
  FollowUpDescription,
  FollowUpIcon,
  FollowUpItem,
  FollowUpType,
  FollowUpTypeWrapper,
  FollowUpWrapper,
  FollowUpsListContainer,
  HistoryContainer,
  HistorySeparator,
  LoadingIcon,
  LoadingWrapper,
  NextContactInfo,
  UpdatedHistoryInfo,
  UpdatedHistoryInfoColumn,
} from './Components.styles';
import ContactDate from './ContactDate';

const FollowUps = ({ followUps, loading, leadId }) => {
  const [expandedItem, setExpandedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFollowUp, setEditingFollowUp] = useState(null);
  const [historyData, setHistoryData] = useState({});
  const [historyLoading, setHistoryLoading] = useState({});
  const detailsRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    if (showDetails && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [showDetails]);

  useEffect(() => {
    if (showHistory && historyRef.current) {
      historyRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [showHistory]);

  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingIcon src={loadIcon} alt="Loading..." />
      </LoadingWrapper>
    );
  }

  const formatType = (value) =>
    value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  const fetchHistoryData = async (followUpUuid) => {
    setHistoryLoading((prev) => ({ ...prev, [followUpUuid]: true }));

    try {
      const response = await ApiClient.get(
        `/sales/follow-ups/${followUpUuid}/history/formatted`
      );
      setHistoryData((prev) => ({ ...prev, [followUpUuid]: response }));
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setHistoryLoading((prev) => ({ ...prev, [followUpUuid]: false }));
    }
  };

  const handleItemClick = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    if (index !== expandedItem) {
      setExpandedItem(expandedItem === index ? null : index);
    }
    setShowHistory(!showHistory);

    if (!showHistory && followUps[index]?.uuid) {
      fetchHistoryData(followUps[index].uuid);
    }
  };
  const handleShowDetails = (index) => {
    setExpandedItem((prev) => (prev === index ? null : index));
    setShowHistory(false);
  };

  const handleCloseClick = (e, type) => {
    e.stopPropagation();
    e.preventDefault();
    if (type === 'details') setShowDetails(false);
    if (type === 'history') setShowHistory(false);
    if ((type === 'details' && !showHistory) || (type === 'history' && !showDetails)) {
      setExpandedItem(null);
    }
  };

  const handleEditClick = (e, followUp) => {
    e.stopPropagation();
    e.preventDefault();
    setShowHistory(false);
    setEditingFollowUp(followUp);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditingFollowUp(null);
  };
  if (followUps?.length !== 0 && followUps) {
    return (
      <>
        <FollowUpsListContainer>
          {followUps?.map((followUp, index) => (
            <FollowUpWrapper key={followUp.uuid || index}>
              <FollowUpItem onClick={() => handleShowDetails(index)}>
                <FollowUpContent>
                  <FollowUpIcon src={calendar} alt="calendar" />
                  <div>
                    <FollowUpType>
                      {followUp.type ? formatType(followUp.type) : 'Follow-up'}
                    </FollowUpType>
                    <FollowUpDate>
                      {followUp.createdAt
                        ? new Date(followUp.createdAt).toLocaleString()
                        : 'Unknown'}
                    </FollowUpDate>
                  </div>
                </FollowUpContent>
                <ActionContainer>
                  <ClickableIcon onClick={(e) => handleItemClick(e, index)}>
                    <FollowUpIcon src={reschedule} alt="reschedule" />
                  </ClickableIcon>
                  <ClickableIcon onClick={(e) => handleEditClick(e, followUp)}>
                    <FollowUpIcon src={calendar} alt="calendar" />
                  </ClickableIcon>
                </ActionContainer>
              </FollowUpItem>
              {expandedItem === index && (
                <>
                  {showDetails && (
                    <NextContactInfo ref={detailsRef}>
                      <FollowUpTypeWrapper>
                        <FollowUpIcon src={calendar} alt="calendar" />
                        <div>
                          <FollowUpType>Next Contact Date</FollowUpType>
                          <FollowUpDate>
                            Scheduled for{' '}
                            {followUp.scheduledDateTime
                              ? new Date(followUp.scheduledDateTime).toLocaleString()
                              : 'Unknown'}
                          </FollowUpDate>
                          <FollowUpDescription>
                            Recipient(s):{' '}
                            {followUp?.recipientUsers?.length > 0
                              ? followUp.recipientUsers
                                  .map((user) => `${user.name} ${user.surname}`)
                                  .join(', ')
                              : followUp?.recipientUser
                                ? `${followUp.recipientUser.name} ${followUp.recipientUser.surname}`
                                : 'Unknown'}
                          </FollowUpDescription>
                          <FollowUpDescription>Notes: {followUp?.notes}</FollowUpDescription>
                        </div>
                      </FollowUpTypeWrapper>
                      <ActionColumn>
                        <div onClick={(e) => handleCloseClick(e, 'details')}>
                          <FollowUpIcon src={close} alt="calendar" />
                        </div>
                        <div>
                          <FollowUpType>
                            by {followUp.creator?.name} {followUp.creator?.surname}
                          </FollowUpType>
                          <FollowUpDate>
                            {followUp.createdAt
                              ? new Date(followUp.createdAt).toLocaleString()
                              : 'Unknown'}
                          </FollowUpDate>
                        </div>
                      </ActionColumn>
                    </NextContactInfo>
                  )}

                  {showHistory && (
                    <UpdatedHistoryInfo ref={historyRef}>
                      {historyLoading[followUp.uuid] ? (
                        <LoadingWrapper>
                          <LoadingIcon src={loadIcon} alt="Loading..." />
                        </LoadingWrapper>
                      ) : (
                        <>
                          {historyData[followUp.uuid]?.length <= 1 ? (
                            <EmptyHistoryMessage>
                              No history updates available
                            </EmptyHistoryMessage>
                          ) : (
                            <HistoryContainer>
                              {historyData[followUp.uuid]?.slice(0, -1).map((item, index) => (
                                <React.Fragment key={item.id}>
                                  <UpdatedHistoryInfoColumn>
                                    <FollowUpTypeWrapper>
                                      <FollowUpIcon src={calendar} alt="calendar" />
                                      <div>
                                        <FollowUpType>Updated History</FollowUpType>
                                        <FollowUpDate
                                          style={
                                            item.fieldChanges.scheduledDateTime?.changed
                                              ? { color: '#FF6A00' }
                                              : {}
                                          }
                                        >
                                          Scheduled for {item.currentVersion.scheduledDateTime}
                                        </FollowUpDate>
                                        <FollowUpDescription
                                          style={
                                            item.fieldChanges.recipient?.changed
                                              ? { color: '#FF6A00' }
                                              : {}
                                          }
                                        >
                                          Recipient(s): {item.currentVersion.recipient}
                                        </FollowUpDescription>
                                        <FollowUpDescription
                                          style={
                                            item.fieldChanges.notes?.changed
                                              ? { color: '#FF6A00' }
                                              : {}
                                          }
                                        >
                                          Notes: {item.currentVersion.notes}
                                        </FollowUpDescription>
                                        <FollowUpDescription
                                          style={
                                            item.fieldChanges.performedBy?.changed
                                              ? { color: '##FF6A00' }
                                              : {}
                                          }
                                        >
                                          by {item.currentVersion.performedBy}
                                        </FollowUpDescription>
                                        <FollowUpDate
                                          style={
                                            item.fieldChanges.performedAt?.changed
                                              ? { color: '##FF6A00' }
                                              : {}
                                          }
                                        >
                                          {item.currentVersion.performedAt}
                                        </FollowUpDate>
                                      </div>
                                    </FollowUpTypeWrapper>

                                    {item.previousVersion && (
                                      <div>
                                        <FollowUpType>Old History</FollowUpType>
                                        <FollowUpDate>
                                          Scheduled for{' '}
                                          {item.previousVersion.scheduledDateTime}
                                        </FollowUpDate>
                                        <FollowUpDescription>
                                          Recipient(s): {item.previousVersion.recipient}
                                        </FollowUpDescription>
                                        <FollowUpDescription>
                                          Notes: {item.previousVersion.notes}
                                        </FollowUpDescription>
                                        <FollowUpDescription>
                                          by {item.previousVersion.performedBy}
                                        </FollowUpDescription>
                                        <FollowUpDate>
                                          {item.previousVersion.performedAt}
                                        </FollowUpDate>
                                      </div>
                                    )}
                                  </UpdatedHistoryInfoColumn>
                                  {index <
                                    historyData[followUp.uuid].slice(0, -1).length - 1 && (
                                    <HistorySeparator />
                                  )}
                                </React.Fragment>
                              ))}
                            </HistoryContainer>
                          )}
                        </>
                      )}
                      <div onClick={(e) => handleCloseClick(e, 'history')}>
                        <FollowUpIcon src={close} alt="close" />
                      </div>
                    </UpdatedHistoryInfo>
                  )}
                </>
              )}
            </FollowUpWrapper>
          ))}
        </FollowUpsListContainer>

        <ContactDate
          leadId={leadId}
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          editingFollowUp={editingFollowUp}
          isEditMode={!!editingFollowUp}
        />
      </>
    );
  }
  return null;
};

export default FollowUps;
