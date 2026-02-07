import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import bubble from 'assets/finance/bubble-chat.svg';
import done from 'assets/finance/checked.svg';
import markAsDone from 'assets/finance/mark_as_done.svg';
import rejectMenu from 'assets/finance/rejectMenu.svg';
import seenIcon from 'assets/finance/seen.svg';
import approve from 'assets/finance/split.svg';
import arrowRight from 'assets/right-black.svg';
import fileIcon from 'assets/tickets/file.svg';
import Button from 'common-ui/button';
import { Column } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import {
  approveFinanceRequest,
  getFinanceRequestById,
  getFinanceRequestHistory,
  getFinanceRequestStatusHistory,
  markFinanceRequestAsDone,
  markFinanceRequestAsSeen,
  rejectFinanceRequest,
} from 'features/financeRequest/financeRequestActions';
import {
  selectFinanceRequestApproveLoading,
  selectFinanceRequestLoading,
  selectFinanceRequestMarkAsDoneLoading,
  selectFinanceRequestRejectLoading,
  selectFinanceRequestStatusHistory,
  selectSelectedFinanceRequest,
} from 'features/financeRequest/financeRequestSlice';
import Tag from 'pages/components/tag';
import StatusActivity from 'pages/finance/singleFinanceView/components/statusActivity';
import { baseURL, formatFileSize } from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import {
  Amount,
  AmountInfoWrapper,
  AttachmentWrapper,
  BackToListBtn,
  ColumnContainer,
  CommentArea,
  Container,
  Content,
  DetailHeaderTitle,
  DetailInfo,
  DetailsRow,
  FieldItemRow,
  HeaderContent,
  Icon,
  LinkedTicket,
  LinkedTicketWrapper,
  NavigationWrapper,
  ParentTaskNavigationWrapper,
  ReasonWrapper,
  ReturnsText,
  RowBox,
  RowWithSpace,
  StatusActivityText,
  StatusActivityWrapper,
  StatusButton,
  StatusWrapper,
  TabButton,
  TabContainer,
  Title,
  TruncatedFileName,
} from './SingleFinanceView.styles';
import ApproveModal from './components/ApproveModal/ApproveModal';
import MarkAsDoneModal from './components/MarkAsDoneModal/MarkAsDoneModal';
import RejectTicketModal from './components/RejectModal/RejectTicketModal';
import SplitExpenseModal from './components/splitExpenseModal/SplitExpenseModal';
import FinanceHistory from './history';

const SingleFinanceView = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('details');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSplitExpenseModalOpen, setIsSplitExpenseModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isMarkAsDoneModalOpen, setIsMarkAsDoneModalOpen] = useState(false);

  const dispatch = useDispatch();
  const financeRequest = useSelector(selectSelectedFinanceRequest);
  const isLoading = useSelector(selectFinanceRequestLoading);
  const rejectLoading = useSelector(selectFinanceRequestRejectLoading);
  const approveLoading = useSelector(selectFinanceRequestApproveLoading);
  const markAsDoneLoading = useSelector(selectFinanceRequestMarkAsDoneLoading);
  const statusHistory = useSelector(selectFinanceRequestStatusHistory);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

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

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/finance/finance-request');
    }
  };

  const handleRejectClick = () => {
    setIsRejectModalOpen(true);
  };

  const handleRejectModalClose = () => {
    setIsRejectModalOpen(false);
  };

  const handleRejectTicket = async (rejectionReason) => {
    try {
      await dispatch(rejectFinanceRequest({ id: uuid, rejectionReason })).unwrap();
      setIsRejectModalOpen(false);
      dispatch(getFinanceRequestById(uuid));
      dispatch(
        getFinanceRequestStatusHistory({ id: uuid, params: { offset: 0, limit: 10000 } })
      );
      dispatch(getFinanceRequestHistory({ id: uuid, params: { offset: 0, limit: 10000 } }));
    } catch (error) {
      console.error('Error rejecting ticket:', error);
    }
  };

  const handleSplitExpenseClick = () => {
    setIsSplitExpenseModalOpen(true);
  };

  const handleSplitExpenseModalClose = () => {
    setIsSplitExpenseModalOpen(false);
  };

  const handleApproveWithSplit = async (approvalData) => {
    try {
      await dispatch(approveFinanceRequest({ id: uuid, approvalData })).unwrap();
      setIsSplitExpenseModalOpen(false);
      dispatch(getFinanceRequestById(uuid));
      dispatch(
        getFinanceRequestStatusHistory({ id: uuid, params: { offset: 0, limit: 10000 } })
      );
      dispatch(getFinanceRequestHistory({ id: uuid, params: { offset: 0, limit: 10000 } }));
    } catch (error) {
      console.error('Error approving ticket with split:', error);
    }
  };

  const handleApproveClick = () => {
    setIsApproveModalOpen(true);
  };

  const handleApproveModalClose = () => {
    setIsApproveModalOpen(false);
  };

  const handleApproveTicket = async (approvalData) => {
    try {
      await dispatch(approveFinanceRequest({ id: uuid, approvalData })).unwrap();
      setIsApproveModalOpen(false);
      dispatch(getFinanceRequestById(uuid));
      dispatch(
        getFinanceRequestStatusHistory({ id: uuid, params: { offset: 0, limit: 10000 } })
      );
      dispatch(getFinanceRequestHistory({ id: uuid, params: { offset: 0, limit: 10000 } }));
    } catch (error) {
      console.error('Error approving ticket:', error);
    }
  };

  const handleMarkAsDoneClick = () => {
    setIsMarkAsDoneModalOpen(true);
  };

  const handleMarkAsDoneModalClose = () => {
    setIsMarkAsDoneModalOpen(false);
  };

  const handleMarkAsDone = async (doneData) => {
    try {
      await dispatch(markFinanceRequestAsDone({ id: uuid, doneData })).unwrap();
      setIsMarkAsDoneModalOpen(false);
      dispatch(getFinanceRequestById(uuid));
      dispatch(
        getFinanceRequestStatusHistory({ id: uuid, params: { offset: 0, limit: 10000 } })
      );
      dispatch(getFinanceRequestHistory({ id: uuid, params: { offset: 0, limit: 10000 } }));
    } catch (error) {
      console.error('Error marking as done:', error);
    }
  };

  const handleMarkAsSeen = async () => {
    try {
      await dispatch(markFinanceRequestAsSeen({ uuid })).unwrap();
      dispatch(getFinanceRequestById(uuid));
    } catch (error) {
      console.error('Error marking as seen:', error);
    }
  };

  const handleNavigateToTicket = (ticketId) => {
    if (ticketId) {
      navigate(`/project-management/ticket/${ticketId}`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (uuid) {
      dispatch(getFinanceRequestById(uuid));
      dispatch(getFinanceRequestHistory({ id: uuid, params: { offset: 0, limit: 10000 } }));
      dispatch(
        getFinanceRequestStatusHistory({ id: uuid, params: { offset: 0, limit: 10000 } })
      );
    }
  }, [dispatch, uuid]);

  if (isLoading)
    return (
      <LoadContainer>
        <LoadingIcon src={loadIcon} alt="Loading..." />
      </LoadContainer>
    );

  return (
    <>
      <NavigationWrapper>
        <BackToListBtn onClick={handleBack}>{'< Back'}</BackToListBtn>
        <div>
          <StatusWrapper>
            {financeRequest?.status == 'Pending Approval' &&
              (userType === 'General Manager' || userType === 'Super Admin') && (
                <>
                  <StatusButton color={'#15c7a7'}>
                    <Button onClick={handleApproveClick}>
                      <Icon src={done} alt="done" />
                      Approve
                    </Button>
                  </StatusButton>
                  <StatusButton color={'#2D6CDF'}>
                    <Button onClick={handleSplitExpenseClick}>
                      <Icon src={approve} alt="done" />
                      Approve and Split
                    </Button>
                  </StatusButton>
                  <StatusButton color={'#E63946'}>
                    <Button onClick={handleRejectClick}>
                      <Icon width={24} height={24} src={rejectMenu} alt="done" />
                      Reject
                    </Button>
                  </StatusButton>
                </>
              )}
            {userType === 'Accounting Staff' && financeRequest?.status == 'Approved' && (
              <StatusButton color={'#2D6CDF'}>
                <Button onClick={handleMarkAsDoneClick}>
                  <Icon src={markAsDone} alt="done" />
                  Mark as Done
                </Button>
              </StatusButton>
            )}

            {(userType === 'General Manager' || userType === 'Super Admin') &&
              financeRequest?.status == 'Completed' && (
                <StatusButton color={'#2D6CDF'}>
                  <Button onClick={handleMarkAsSeen}>
                    <Icon src={seenIcon} alt="done" />
                    Mark as Seen
                  </Button>
                </StatusButton>
              )}
          </StatusWrapper>
          {windowWidth < 1401 && (
            <TabContainer>
              <TabButton
                $isActive={activeTab === 'details'}
                onClick={() => setActiveTab('details')}
              >
                Details
              </TabButton>
              <TabButton
                onClick={() => setActiveTab('history')}
                $isActive={activeTab === 'history'}
              >
                History
              </TabButton>
            </TabContainer>
          )}
        </div>
      </NavigationWrapper>
      <Container>
        {(windowWidth > 1400 || (windowWidth < 1401 && activeTab === 'details')) && (
          <ColumnContainer>
            <Content>
              <HeaderContent>
                <RowWithSpace>
                  <Title>{financeRequest?.title}</Title>
                  <Tag
                    type="financeStatus"
                    variant={
                      financeRequest?.status === 'Pending Approval'
                        ? 'Pending'
                        : financeRequest?.status
                    }
                  />
                </RowWithSpace>
                <DetailsRow>
                  <DetailHeaderTitle>Request ID:</DetailHeaderTitle>
                  <DetailInfo>{financeRequest?.id}</DetailInfo>
                </DetailsRow>
                <DetailsRow>
                  <DetailHeaderTitle>Requester:</DetailHeaderTitle>
                  <DetailInfo>
                    {financeRequest?.createdBy?.name} {financeRequest?.createdBy?.surname}
                  </DetailInfo>
                </DetailsRow>
                <DetailsRow>
                  <DetailHeaderTitle>Created date:</DetailHeaderTitle>
                  <DetailInfo>{formatDateTime(financeRequest?.createdAt)}</DetailInfo>
                </DetailsRow>
                {financeRequest?.completedAt && (
                  <DetailsRow>
                    <DetailHeaderTitle>Completed date:</DetailHeaderTitle>
                    <DetailInfo>{formatDateTime(financeRequest?.completedAt)}</DetailInfo>
                  </DetailsRow>
                )}

                {financeRequest?.linkedTicket?.id && (
                  <LinkedTicketWrapper>
                    <LinkedTicket>Linked ticket</LinkedTicket>
                    <ParentTaskNavigationWrapper
                      onClick={() =>
                        handleNavigateToTicket(financeRequest?.linkedTicket?.uuid)
                      }
                    >
                      <DetailsRow>
                        <DetailInfo>
                          ID - {financeRequest?.linkedTicket?.id} /{' '}
                          {financeRequest?.linkedTicket?.title}
                        </DetailInfo>
                      </DetailsRow>
                      <Icon src={arrowRight} alt="right" />
                    </ParentTaskNavigationWrapper>
                  </LinkedTicketWrapper>
                )}
              </HeaderContent>

              <AmountInfoWrapper>
                <RowWithSpace>
                  <DetailInfo>Amount Requested</DetailInfo>
                  <DetailInfo>Account Type</DetailInfo>
                </RowWithSpace>
                <RowWithSpace>
                  <Amount>{financeRequest?.amountRequested} AMD</Amount>
                  <ReturnsText>{financeRequest?.accountingType}</ReturnsText>
                </RowWithSpace>
                <RowBox>
                  <div>
                    <DetailsRow>
                      <DetailHeaderTitle>Flow type:</DetailHeaderTitle>
                      <DetailInfo>{financeRequest?.flowType}</DetailInfo>
                    </DetailsRow>
                    <DetailsRow>
                      <DetailHeaderTitle>Expense Type:</DetailHeaderTitle>
                      <DetailInfo>{financeRequest?.expenseType}</DetailInfo>
                    </DetailsRow>
                  </div>
                  {financeRequest?.amountProvided && (
                    <div>
                      <DetailsRow>
                        <DetailHeaderTitle>Amount Approved:</DetailHeaderTitle>
                        <DetailInfo>
                          {financeRequest?.amountProvided} {financeRequest?.currency}
                        </DetailInfo>
                      </DetailsRow>
                    </div>
                  )}
                  {(financeRequest?.frequency || financeRequest?.recurrenceEndDate) && (
                    <div>
                      {financeRequest?.frequency && (
                        <DetailsRow>
                          <DetailHeaderTitle>Frequency:</DetailHeaderTitle>
                          <DetailInfo>{financeRequest?.frequency}</DetailInfo>
                        </DetailsRow>
                      )}
                      {financeRequest?.recurrenceEndDate && (
                        <DetailsRow>
                          <DetailHeaderTitle>Recurrence:</DetailHeaderTitle>
                          <DetailInfo>
                            {formatDateTime(financeRequest?.recurrenceEndDate)}
                          </DetailInfo>
                        </DetailsRow>
                      )}
                    </div>
                  )}
                  <div>
                    {financeRequest?.startDate && (
                      <DetailsRow>
                        <DetailHeaderTitle>Start Date:</DetailHeaderTitle>
                        <DetailInfo>
                          {formatDateTime(financeRequest?.startDate || '')}
                        </DetailInfo>
                      </DetailsRow>
                    )}
                    {financeRequest?.endDate && (
                      <DetailsRow>
                        <DetailHeaderTitle>End Date:</DetailHeaderTitle>
                        <DetailInfo>
                          {formatDateTime(financeRequest?.endDate || '')}
                        </DetailInfo>
                      </DetailsRow>
                    )}
                  </div>
                  <div>
                    {financeRequest?.paymentMethod && (
                      <DetailsRow>
                        <DetailHeaderTitle>Payment method:</DetailHeaderTitle>
                        <DetailInfo>
                          {financeRequest?.paymentMethod === 'Transfer'
                            ? 'Transfer to Account'
                            : financeRequest?.paymentMethod}
                        </DetailInfo>
                      </DetailsRow>
                    )}
                    {financeRequest?.dueDate && (
                      <DetailsRow>
                        <DetailHeaderTitle>Due Date:</DetailHeaderTitle>
                        <DetailInfo>
                          {formatDateTime(financeRequest?.dueDate || '')}
                        </DetailInfo>
                      </DetailsRow>
                    )}
                  </div>
                </RowBox>

                {financeRequest?.reason && (
                  <ReasonWrapper>
                    <DetailHeaderTitle>Reason</DetailHeaderTitle>
                    <CommentArea style={{ marginTop: '5px' }}>
                      <p>{financeRequest?.reason}</p>
                    </CommentArea>
                  </ReasonWrapper>
                )}
              </AmountInfoWrapper>

              {financeRequest?.files?.length > 0 && (
                <FieldItemRow className="uploaded-files-wrapper">
                  {financeRequest?.files?.map((item, index) => {
                    return (
                      <AttachmentWrapper key={index} onClick={() => handleFilePreview(item)}>
                        <Icon src={fileIcon} alt="file" width="18px" height="22px" />
                        <Column>
                          <TruncatedFileName>{item.originalName}</TruncatedFileName>
                          <p>{formatFileSize(item.size)}</p>
                        </Column>
                      </AttachmentWrapper>
                    );
                  })}
                </FieldItemRow>
              )}
            </Content>
            {statusHistory?.length > 0 && (
              <Content>
                <StatusActivityWrapper>
                  <Icon src={bubble} alt="bubble" width="18px" height="22px" />
                  <StatusActivityText>Status Activity</StatusActivityText>
                </StatusActivityWrapper>
                {statusHistory.map((elm, i) => {
                  return <StatusActivity notes={elm.notes} key={i} data={elm} />;
                })}
              </Content>
            )}
          </ColumnContainer>
        )}

        {(windowWidth > 1400 || (windowWidth < 1401 && activeTab === 'history')) && (
          <FinanceHistory />
        )}
      </Container>
      {isRejectModalOpen && (
        <RejectTicketModal
          isOpen={isRejectModalOpen}
          onClose={handleRejectModalClose}
          onReject={handleRejectTicket}
          loading={rejectLoading}
        />
      )}
      {isSplitExpenseModalOpen && (
        <SplitExpenseModal
          isOpen={isSplitExpenseModalOpen}
          onClose={handleSplitExpenseModalClose}
          onApprove={handleApproveWithSplit}
          loading={approveLoading}
          financeRequest={financeRequest}
        />
      )}
      {isApproveModalOpen && (
        <ApproveModal
          isOpen={isApproveModalOpen}
          onClose={handleApproveModalClose}
          onApprove={handleApproveTicket}
          loading={approveLoading}
          financeRequest={financeRequest}
        />
      )}
      {isMarkAsDoneModalOpen && (
        <MarkAsDoneModal
          isOpen={isMarkAsDoneModalOpen}
          onClose={handleMarkAsDoneModalClose}
          onMarkAsDone={handleMarkAsDone}
          loading={markAsDoneLoading}
          financeRequest={financeRequest}
        />
      )}
    </>
  );
};

export default SingleFinanceView;
