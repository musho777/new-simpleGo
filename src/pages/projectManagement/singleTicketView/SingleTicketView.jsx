import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import editIcon from 'assets/profileHeader/edit.svg';
import arrowRight from 'assets/right-black.svg';
import appointment from 'assets/singleTicket/appointment.png';
import assignees from 'assets/singleTicket/assignees.png';
import attachment from 'assets/singleTicket/attachment.png';
import copyNew from 'assets/singleTicket/copyNew.svg';
import customerSvg from 'assets/singleTicket/customerSvg.svg';
import dates from 'assets/singleTicket/date.png';
import nestedIndicator from 'assets/singleTicket/nested-indicator.svg';
import parentTask from 'assets/singleTicket/parent-task.png';
import priority from 'assets/singleTicket/priority.png';
import progress from 'assets/singleTicket/progress.png';
import project from 'assets/singleTicket/project.png';
import status from 'assets/singleTicket/status.png';
import subproject from 'assets/singleTicket/subproject.png';
import subtaskIcon from 'assets/singleTicket/subproject.png';
import estimatedTime from 'assets/singleTicket/time.png';
import tracker from 'assets/singleTicket/tracker.png';
import watchers from 'assets/singleTicket/watchers.png';
import fileIcon from 'assets/tickets/file.svg';
import Button from 'common-ui/button';
import { Column } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import ProgressBar from 'common-ui/progressBar';
import Switch from 'common-ui/switch';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  changePrivateTickets,
  getCustomerData,
  getSingleTicket,
  removeIsNewFromTicket,
} from 'features/projectManagement/ProjectManagementActions';
import {
  selectCustomerData,
  selectCustomerDataLoading,
  selectLoading,
  selectSingleTicket,
} from 'features/projectManagement/ProjectManagementSlice';
import AvatarGroup from 'pages/components/avatarGroup';
import Tag from 'pages/components/tag';
import { baseURL, formatFileSize } from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import Comment from '../comment';
import { Tracker } from '../tickets/Tickets.styles';
import {
  AssigneeWatcherWrapper,
  AttachmentText,
  AttachmentWrapper,
  BackToListBtn,
  ButtonsWrapper,
  ColumnContainer,
  ColumnInfo,
  CommentArea,
  Container,
  Content,
  ContractItem,
  ContractsList,
  CopySvg,
  CustomerInfo,
  CustomerInfoWrapper,
  DescriptionView,
  DetailHeaderTitle,
  DetailInfo,
  DetailTitle,
  DetailsRow,
  FieldItemRow,
  HeaderContent,
  Icon,
  NavigationWrapper,
  NestedIcon,
  ParentTaskNavigationWrapper,
  RowWithSpace,
  SwitchWrapper,
  TabButton,
  TabContainer,
  Title,
} from './SingleTicketView.styles';
import Appointment from './appointment';
import History from './history';

const SingleTicketView = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPrivate, setIsPrivate] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [fullAssignee, setFullAssignee] = useState([]);
  const [appointmentHighlighted, setAppointmentHighlighted] = useState(false);

  const ticket = useSelector(selectSingleTicket);
  const loading = useSelector(selectLoading);
  const isLoading = loading?.singleTicket;
  const customerData = useSelector(selectCustomerData);
  const customerLoading = useSelector(selectCustomerDataLoading);

  const { uuid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const currentUser = useSelector(selectUserInfo);
  const canCopy = ticket?.createdBy?.uuid === currentUser?.uuid;

  const dispatch = useDispatch();

  const handleNavigateEdit = (copy = false) => {
    navigate(`/project-management/tickets/create-edit/${uuid}?copy=${copy}`);
  };

  const handleFilePreview = async (file) => {
    try {
      const fileUrl = `${baseURL.slice(0, -1)}${file.link}`;

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleNavigateToParentChildTask = (id) => {
    navigate(`/project-management/ticket/${id}`);
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/project-management/tickets');
    }
  };

  const handleNavigationToCustomerPage = (id) => {
    navigate(`/customer-relationship-management/${id}`);
  };

  useEffect(() => {
    dispatch(getSingleTicket(uuid));
  }, [uuid]);

  useEffect(() => {
    if (ticket?.customerId) {
      dispatch(getCustomerData(ticket.customerId));
    }
  }, [dispatch, ticket?.customerId]);

  useEffect(() => {
    if (ticket.isNew) {
      dispatch(removeIsNewFromTicket(uuid));
    }
    setIsPrivate(ticket?.isPrivate);
  }, [ticket]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const assignedTeamsAndMembers = [
      ...(ticket.assignees ?? []),
      ...(ticket.assignedTeams ?? []),
    ];
    setFullAssignee(assignedTeamsAndMembers);
  }, [uuid, ticket]);

  useEffect(() => {
    if (
      location.state?.scrollToAppointment &&
      appointmentRef.current &&
      ticket.appointment &&
      !hasScrolledRef.current
    ) {
      setTimeout(() => {
        appointmentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setAppointmentHighlighted(true);
        setTimeout(() => setAppointmentHighlighted(false), 2000);
      }, 100);
      hasScrolledRef.current = true;
    }
  }, [location.state?.scrollToAppointment, ticket.appointment]);

  const changeTicketPrivate = (value) => {
    setIsPrivate(!value);
    dispatch(changePrivateTickets({ uuid, isPrivate: !value }));
  };

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
      </NavigationWrapper>
      <Container>
        {(windowWidth > 1400 || (windowWidth < 1401 && activeTab === 'details')) && (
          <ColumnContainer>
            <Content>
              {ticket?.parentTask?.uuid && (
                <ParentTaskNavigationWrapper
                  onClick={() => handleNavigateToParentChildTask(ticket?.parentTask?.uuid)}
                >
                  <DetailsRow>
                    <DetailHeaderTitle>Parent task</DetailHeaderTitle>
                    <DetailInfo>
                      ID - {ticket.parentTask?.id} / {ticket.parentTask?.title}
                    </DetailInfo>
                  </DetailsRow>
                  <Icon src={arrowRight} alt="right" />
                </ParentTaskNavigationWrapper>
              )}
              <HeaderContent>
                <RowWithSpace>
                  <Title>{ticket?.title}</Title>
                  <ButtonsWrapper>
                    {canCopy && (
                      <Button
                        style={{ minWidth: '80px' }}
                        outlined
                        onClick={() => handleNavigateEdit(true)}
                      >
                        <CopySvg src={copyNew} alt="copy" />
                        Copy
                      </Button>
                    )}

                    <Button outlined icon={editIcon} onClick={() => handleNavigateEdit(false)}>
                      Edit
                    </Button>
                  </ButtonsWrapper>
                </RowWithSpace>
                <DetailsRow>
                  <DetailHeaderTitle>Ticket ID:</DetailHeaderTitle>
                  <DetailInfo>{ticket?.id}</DetailInfo>
                </DetailsRow>
                <DetailsRow>
                  <DetailHeaderTitle>Creator:</DetailHeaderTitle>
                  <DetailInfo>{ticket.createdBy?.name}</DetailInfo>
                </DetailsRow>
                <DetailsRow>
                  <DetailHeaderTitle>Created date:</DetailHeaderTitle>
                  <DetailInfo>{formatDateTime(ticket.createdAt)}</DetailInfo>
                </DetailsRow>
                <SwitchWrapper>
                  <div>
                    <p>Private ticket:</p>
                  </div>
                  <Switch isOn={isPrivate} onToggle={() => changeTicketPrivate(isPrivate)} />
                </SwitchWrapper>
              </HeaderContent>
              <RowWithSpace>
                <ColumnInfo>
                  <FieldItemRow>
                    <Icon src={tracker} alt="tracker" />
                    <DetailTitle>Tracker</DetailTitle>
                    <Tracker $color={ticket.tracker}>{ticket.tracker}</Tracker>
                  </FieldItemRow>
                  <FieldItemRow>
                    <Icon src={priority} alt="priority" />
                    <DetailTitle>Priority</DetailTitle>
                    <Tag type="ticketPriority" variant={ticket.priority} />
                  </FieldItemRow>
                  <FieldItemRow>
                    <Icon src={status} alt="status" />
                    <DetailTitle>Status</DetailTitle>
                    <Tag type="ticketStatuses" variant={ticket.status} />
                  </FieldItemRow>
                  <FieldItemRow>
                    <Icon src={progress} alt="progress" />
                    <DetailTitle>Progress</DetailTitle>
                    <DetailInfo>{ticket.progress}%</DetailInfo>
                    <ProgressBar variant="determinate" value={ticket.progress} />
                  </FieldItemRow>

                  {(ticket.startDate || ticket.dueDate) && (
                    <FieldItemRow>
                      <Icon src={dates} alt="dates" />
                      <DetailTitle>Dates</DetailTitle>
                      <DetailInfo>
                        {ticket.startDate && ticket.dueDate
                          ? `${formatDateTime(ticket.startDate)} - ${formatDateTime(ticket.dueDate)}`
                          : ticket.startDate
                            ? formatDateTime(ticket.startDate)
                            : formatDateTime(ticket.dueDate)}
                      </DetailInfo>
                    </FieldItemRow>
                  )}

                  {ticket.estimatedTime && ticket.estimatedTime !== '-' && (
                    <FieldItemRow>
                      <Icon src={estimatedTime} alt="estimated time" />
                      <DetailTitle>Estimated time</DetailTitle>
                      <DetailInfo>{ticket.estimatedTime}</DetailInfo>
                    </FieldItemRow>
                  )}
                  {ticket.customerId && (
                    <CustomerInfoWrapper>
                      <FieldItemRow>
                        <NestedIcon src={customerSvg} alt="customer" />
                        <CustomerInfo
                          $disabled={
                            customerData?.contracts && customerData.contracts.length > 1
                          }
                          onClick={() => {
                            if (
                              customerData?.contracts &&
                              customerData.contracts.length === 1
                            ) {
                              handleNavigationToCustomerPage(customerData.contracts[0]);
                            } else if (
                              !customerData?.contracts ||
                              customerData.contracts.length === 0
                            ) {
                              handleNavigationToCustomerPage(
                                customerData?.customerId || '7034234'
                              );
                            }
                          }}
                        >
                          {customerLoading
                            ? 'Loading customer data...'
                            : customerData
                              ? `Customer ID: ${customerData.customerId}, ${customerData.fullName}: +${customerData.phoneNumbers?.[0] || 'N/A'}`
                              : `Customer ID: ${ticket.customerId}`}
                        </CustomerInfo>
                      </FieldItemRow>
                      {customerData?.contracts && customerData.contracts.length > 1 && (
                        <ContractsList>
                          {customerData.contracts.map((contractId, index) => (
                            <ContractItem
                              key={contractId}
                              onClick={() => handleNavigationToCustomerPage(contractId)}
                            >
                              <NestedIcon style={{ marginTop: -12 }} src={nestedIndicator} />
                              Contract {index + 1}: {contractId}
                            </ContractItem>
                          ))}
                        </ContractsList>
                      )}
                    </CustomerInfoWrapper>
                  )}
                </ColumnInfo>
                <ColumnInfo>
                  <FieldItemRow>
                    <Icon src={project} alt="project" />
                    <DetailTitle>Project</DetailTitle>
                    <DetailInfo>{ticket.project?.name}</DetailInfo>
                  </FieldItemRow>
                  <FieldItemRow>
                    <Icon src={subproject} alt="subproject" />
                    <DetailTitle>Subproject</DetailTitle>
                    <DetailInfo>{ticket.subproject?.name}</DetailInfo>
                  </FieldItemRow>
                  {ticket.parentTask?.title && (
                    <FieldItemRow>
                      <Icon src={parentTask} alt="parent task" />
                      <DetailTitle>Parent task</DetailTitle>
                      <DetailInfo>
                        ID - {ticket.parentTask?.id} / {ticket.parentTask?.title}
                      </DetailInfo>
                    </FieldItemRow>
                  )}
                  {fullAssignee?.length > 0 && (
                    <AssigneeWatcherWrapper>
                      <DetailsRow>
                        <Icon src={assignees} alt="assignees" />
                        <DetailTitle>Assignees</DetailTitle>
                      </DetailsRow>
                      <AvatarGroup data={fullAssignee} />
                    </AssigneeWatcherWrapper>
                  )}
                  {ticket.watchers?.length > 0 && (
                    <AssigneeWatcherWrapper>
                      <DetailsRow>
                        <Icon src={watchers} alt="watchers" />
                        <DetailTitle>Watchers</DetailTitle>
                      </DetailsRow>
                      <AvatarGroup data={ticket.watchers} />
                    </AssigneeWatcherWrapper>
                  )}
                </ColumnInfo>
              </RowWithSpace>
              {ticket.description && (
                <CommentArea>
                  <DescriptionView
                    dangerouslySetInnerHTML={{ __html: ticket.description }}
                  ></DescriptionView>
                </CommentArea>
              )}

              {ticket.files?.length > 0 && (
                <AttachmentText>
                  <Icon src={attachment} alt="attachment" />
                  Attachments {`(${ticket.files?.length})`}
                </AttachmentText>
              )}
              <FieldItemRow className="uploaded-files-wrapper">
                {ticket.files?.map((item, index) => (
                  <AttachmentWrapper key={index} onClick={() => handleFilePreview(item)}>
                    <Icon
                      src={fileIcon}
                      alt="file"
                      style={{ width: '18px', height: '22px' }}
                    />
                    <Column>
                      <p>{item.name}</p>
                      <p>{formatFileSize(item.size)}</p>
                    </Column>
                  </AttachmentWrapper>
                ))}
              </FieldItemRow>
              {ticket.childTickets?.length > 0 && (
                <>
                  <AttachmentText>
                    <Icon src={subtaskIcon} />
                    Subtasks
                  </AttachmentText>
                  {ticket?.childTickets?.map((childTicket) => (
                    <ParentTaskNavigationWrapper
                      key={childTicket?.uuid}
                      onClick={() => handleNavigateToParentChildTask(childTicket?.uuid)}
                    >
                      <DetailsRow>
                        <DetailInfo>
                          ID - {childTicket?.id} / {childTicket?.title}
                        </DetailInfo>
                      </DetailsRow>
                      <Icon src={arrowRight} alt="right" />
                    </ParentTaskNavigationWrapper>
                  ))}
                </>
              )}
              {ticket.appointment && (
                <div ref={appointmentRef}>
                  <AttachmentText>
                    <Icon src={appointment} alt="appointment" />
                    Appointment
                  </AttachmentText>
                  <Appointment highlighted={appointmentHighlighted} />
                </div>
              )}
            </Content>
            <Comment />
          </ColumnContainer>
        )}

        {(windowWidth > 1400 || (windowWidth < 1401 && activeTab === 'history')) && (
          <History />
        )}
      </Container>
    </>
  );
};

export default SingleTicketView;
