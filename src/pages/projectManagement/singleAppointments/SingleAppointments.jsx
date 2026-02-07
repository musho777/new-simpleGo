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
  getSingleAppointment,
  getSingleTicket,
  removeIsNewFromTicket,
} from 'features/projectManagement/ProjectManagementActions';
import {
  selectCustomerData,
  selectCustomerDataLoading,
  selectLoading,
  selectSingleAppointment,
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
  TabButton,
  TabContainer,
  Title,
} from './SingleAppointments.styles';
import History from './history';

const SingleAppointments = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('details');

  const appointment = useSelector(selectSingleAppointment);
  const loading = useSelector(selectLoading);
  const isLoading = loading?.singleAppointment;
  const customerData = useSelector(selectCustomerData);
  const customerLoading = useSelector(selectCustomerDataLoading);
  console.log(appointment);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const appointmentRef = useRef(null);
  const currentUser = useSelector(selectUserInfo);
  const canCopy = appointment?.createdBy?.uuid === currentUser?.uuid;

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
    navigate(`/project-management/appointment/${id}`);
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
    dispatch(getSingleAppointment(uuid));
  }, [uuid]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              {appointment?.parentTask?.uuid && (
                <ParentTaskNavigationWrapper
                  onClick={() =>
                    handleNavigateToParentChildTask(appointment?.parentTask?.uuid)
                  }
                >
                  <DetailsRow>
                    <DetailHeaderTitle>Parent task</DetailHeaderTitle>
                    <DetailInfo>
                      ID - {appointment?.parentTask?.id} / {appointment?.parentTask?.title}
                    </DetailInfo>
                  </DetailsRow>
                  <Icon src={arrowRight} alt="right" />
                </ParentTaskNavigationWrapper>
              )}
              <HeaderContent>
                <RowWithSpace>
                  <Title>{appointment?.title}</Title>
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
                  <DetailInfo>{appointment?.id}</DetailInfo>
                </DetailsRow>
                <DetailsRow>
                  <DetailHeaderTitle>Creator:</DetailHeaderTitle>
                  <DetailInfo>{appointment?.createdBy?.name}</DetailInfo>
                </DetailsRow>
                <DetailsRow>
                  <DetailHeaderTitle>Created date:</DetailHeaderTitle>
                  <DetailInfo>{formatDateTime(appointment?.createdAt)}</DetailInfo>
                </DetailsRow>
              </HeaderContent>
              <RowWithSpace>
                <ColumnInfo>
                  {appointment?.customerId && (
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
                              : `Customer ID: ${appointment?.customerId}`}
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
                    <DetailInfo>{appointment?.project?.name}</DetailInfo>
                  </FieldItemRow>
                  <FieldItemRow>
                    <Icon src={subproject} alt="subproject" />
                    <DetailTitle>Subproject</DetailTitle>
                    <DetailInfo>{appointment?.subproject?.name}</DetailInfo>
                  </FieldItemRow>
                  {appointment?.parentTask?.title && (
                    <FieldItemRow>
                      <Icon src={parentTask} alt="parent task" />
                      <DetailTitle>Parent task</DetailTitle>
                      <DetailInfo>
                        ID - {appointment?.parentTask?.id} / {appointment?.parentTask?.title}
                      </DetailInfo>
                    </FieldItemRow>
                  )}

                  {appointment?.watchers?.length > 0 && (
                    <AssigneeWatcherWrapper>
                      <DetailsRow>
                        <Icon src={watchers} alt="watchers" />
                        <DetailTitle>Watchers</DetailTitle>
                      </DetailsRow>
                      <AvatarGroup data={appointment?.watchers} />
                    </AssigneeWatcherWrapper>
                  )}
                </ColumnInfo>
              </RowWithSpace>
              {appointment?.description && (
                <CommentArea>
                  <DescriptionView
                    dangerouslySetInnerHTML={{ __html: appointment?.description }}
                  ></DescriptionView>
                </CommentArea>
              )}

              {appointment?.files?.length > 0 && (
                <AttachmentText>
                  <Icon src={attachment} alt="attachment" />
                  Attachments {`(${appointment?.files?.length})`}
                </AttachmentText>
              )}
              <FieldItemRow className="uploaded-files-wrapper">
                {appointment?.files?.map((item, index) => (
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
              {appointment?.childTickets?.length > 0 && (
                <>
                  <AttachmentText>
                    <Icon src={subtaskIcon} />
                    Subtasks
                  </AttachmentText>
                  {appointment?.childTickets?.map((childTicket) => (
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
              {appointment?.appointment && (
                <div ref={appointmentRef}>
                  <AttachmentText>
                    <Icon src={appointment} alt="appointment" />
                    Appointment
                  </AttachmentText>
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

export default SingleAppointments;
