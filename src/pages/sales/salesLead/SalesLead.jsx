import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import arrow from 'assets/arrowLeft.svg';
import calendar from 'assets/calendar-outline.svg';
import Button from 'common-ui/button';
import loadIcon from 'common-ui/table/loading.svg';
import { withLeadLock } from 'components/LeadLock';
import { LEAD_STATE } from 'constants/constants';
import { updateLeadData } from 'features/sales/leadLockSlice';
import { getLeadById, getLeadFollowUps } from 'features/sales/salesActions';
import {
  selectAddNoteSuccess,
  selectAddOrderSuccess,
  selectGetLeadLoading,
  selectLeadById,
  selectLeadFollowUps,
  selectLeadFollowUpsLoading,
  selectNewLeadUuid,
  selectUpdateLeadB2BSuccess,
  selectUpdateLeadB2CSuccess,
  setResetAll,
  setResetCustomerExistsSuccess,
  setResetLeadById,
} from 'features/sales/salesSlice';
import Success from 'pages/components/success';
import sessionManager from 'utils/sessionManager';

import {
  AppointmentText,
  AppointmentWrapper,
  BackAction,
  BackTitle,
  Header,
  InfoCardWrapper,
  LoadContainer,
  LoadingIcon,
  NextContact,
  NoteWrapper,
  ViewContainer,
} from './SalesLead.styles';
import AddNewLead from './addNewLead/AddNewLead';
import { AddNote } from './components/AddNote';
import { AddOrder } from './components/AddOrder';
import { Card } from './components/Card';
import { CompetitorInfo } from './components/CompetitorInfo';
import ContactDate from './components/ContactDate';
import FollowUps from './components/FollowUps';
import { History } from './components/History';
import { LabelActions, ProductActions } from './components/LabelActions';
import LeadTicketHistory from './components/LeadTicketHistory';
import { Note } from './components/Note';
import { ScriptAction } from './components/ScriptAction';
import { ViewOrder } from './components/ViewOrder';
import { FullScreenScript } from './components/fullScreen/FullScreenScript';
import Filter from './filter';

const SalesLead = ({ leadLock, canEdit, readOnlyMode }) => {
  const [showTooltipHistory, setShowTooltipHistory] = useState(false);
  const [showTooltipOrder, setShowTooltipOrder] = useState(false);
  const [addOrder, setAddOrder] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [showCompetitorInfo, setShowCompetitorInfo] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [addNewLead, setAddNewLead] = useState(false);
  const [openContactDate, setOpenContactDate] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedScript, setSelectedScript] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { leadId } = useParams();
  const [searchParams] = useSearchParams();
  const lead = useSelector(selectLeadById);
  const successAddNote = useSelector(selectAddNoteSuccess);
  const successAddOrder = useSelector(selectAddOrderSuccess);
  const updateLeadB2BSuccess = useSelector(selectUpdateLeadB2BSuccess);
  const updateLeadB2CSuccess = useSelector(selectUpdateLeadB2CSuccess);
  const newLeadUuid = useSelector(selectNewLeadUuid);
  const [showSuccess, setShowSuccess] = useState(false);
  const getLeadLoading = useSelector(selectGetLeadLoading);
  const leadFollowUps = useSelector(selectLeadFollowUps);
  const leadFollowUpsLoading = useSelector(selectLeadFollowUpsLoading);
  const leadData = leadLock?.lockedLead?.data || lead;

  const [phone, setPhone] = useState(location.state?.phone || '');
  const leadInformation = leadData?.leadInformation || {};

  const offers = leadData?.availableOffers || [];

  const handleShowHistoryTooltip = () => setShowTooltipHistory(true);
  const handleHideHistoryTooltip = () => setShowTooltipHistory(false);
  const handleShowOrderTooltip = () => setShowTooltipOrder(true);
  const handleHideOrderTooltip = () => setShowTooltipOrder(false);

  const handleEditClick = () => {
    if (!canEdit) {
      return;
    }
    setIsEdit(true);
    setAddNewLead(true);
  };

  const handleOpenHistory = () => {
    setShowTooltipHistory(false);
    setOpenHistory(true);
  };
  const handleOpenOrder = () => setShowOrder(true);
  const handleOpenAddOrder = () => {
    if (!canEdit) return;
    setAddOrder(true);
  };
  const handleOpenCompetitorInfo = () => setShowCompetitorInfo(true);
  const handleAddNote = () => {
    if (!canEdit) return;
    setAddNote(true);
  };

  const leadInfoGroup = [
    {
      group: [
        { label: 'Company', value: leadInformation.companyName },
        {
          label: 'Full name',
          value:
            leadInformation.firstName ||
            leadInformation.lastName ||
            leadInformation?.patronymic
              ? [
                  leadInformation.firstName,
                  leadInformation.lastName,
                  leadInformation?.patronymic,
                ]
                  .filter(Boolean)
                  .join(' ')
              : null,
        },
        { label: 'Business model', value: leadInformation.leadType },
        { label: 'Email address', value: leadInformation?.email },
        { label: 'Phone', value: leadInformation.phone },
        { label: 'Address', value: leadInformation.address },
        { label: 'Description', value: leadInformation.description },
        { label: 'Lead Source', value: leadInformation.leadSource?.name },
        { label: 'Number of employees', value: leadInformation.numberOfEmployees },
        {
          label: 'State',
          value: LEAD_STATE.find((elm) => elm?.value === leadInformation.state)?.label,
        },
        { label: 'Type', value: leadInformation.type },
        { label: 'WebAddress', value: leadInformation.webAddress },
        { label: 'Added By', value: leadInformation?.addedByName },
      ],
      isSelected: false,
      onClick: undefined,
    },
  ];

  const productOffersData = offers.map((elm) => ({
    group: [
      { label: 'CenterField', value: elm?.name ? `${elm?.name}` : null },
      { label: 'StackField', stackLabel: 'Description:', value: elm?.description },
      { label: 'StackField', stackLabel: 'Help Text', value: elm?.salesHelpText },
      {
        label: 'DualField',
        value:
          elm?.count != null || elm?.price != null
            ? [
                elm?.count != null ? `Count: ${elm.count}` : null,
                elm?.price != null
                  ? `Price: ${elm.price}${elm?.currency ? ` ${elm.currency}` : ''}`
                  : null,
              ]
                .filter(Boolean)
                .join(' ')
            : null,
      },
      {
        label: 'CenterField',
        value: elm?.productName ? `Product: ${elm?.productName}` : null,
      },
      {
        label: 'DualField',
        value: [elm?.startDate, elm?.endDate].some(Boolean)
          ? `Start Date: ${elm?.startDate || 'N/A'} End Date: ${elm?.endDate || 'N/A'}`
          : null,
      },
    ],
    uuid: elm.script.uuid,
    onClick: () => handleSelectScript(elm.script),
  }));

  const scriptData = selectedScript
    ? [
        {
          group: [
            { label: 'Name', value: selectedScript?.name },
            { label: 'Description', value: selectedScript?.description },
            { label: 'Script', value: selectedScript?.script },
          ],
          isSelected: false,
          onClick: undefined,
        },
      ]
    : [];

  const competitorInfoData = [
    {
      competitor: leadInformation.competitor,
      tariff: leadInformation.tariff,
      includedServices: leadInformation.includedServices,
      contractEndDate: leadInformation.contractEndDate,
      contactDate: leadInformation.contactDate,
      nextContactDate: leadInformation.nextContactDate,
    },
  ];

  const additionalInfo =
    leadInformation.competitor ||
    leadInformation.tariff ||
    leadInformation.includedServices ||
    leadInformation.contractEndDate ||
    leadInformation.contactDate ||
    leadInformation.nextContactDate;

  const handleAppointmentNavigation = () => {
    navigate('/project-management/appointment/create-edit', {
      state: {
        crmUser: {
          phone: leadInformation.phone,
          name: leadInformation.companyName
            ? leadInformation.companyName
            : ` ${leadInformation.firstName} ${leadInformation.lastName}`,
        },
      },
    });
  };

  const handleCloseCompetitorInfo = () => setShowCompetitorInfo(false);

  const handleOrderUpdate = () => {
    dispatch(getLeadById(leadId));
  };

  const handleAddNewLeadNavigation = () => {
    navigate('/sales/search-lead', { state: { leadId } });
  };

  const handleCloseModal = () => {
    setAddNote(false);
    setAddOrder(false);
  };

  const handleCloseAddLeadModal = () => {
    if (isEdit) {
      handleCloseAddLeadModalSuccess();
    } else {
      navigate('/sales/search-lead');
    }
  };

  const handleCloseAddLeadModalSuccess = () => {
    setIsEdit(false);
    setAddNewLead(false);
  };

  const handleSelectScript = (script) => {
    setSelectedScript(script);
  };

  const handleFullScreen = (full) => {
    setFullScreen(full);
  };

  const goBack = () => {
    if (location.state?.from === '/sales/search-lead') {
      navigate(-3);
    } else {
      navigate(-1);
    }
  };

  const onFullScreenClick = (full) => {
    handleFullScreen(full);
    localStorage.removeItem('salesScriptHistory');
    localStorage.removeItem('salesHistory');
  };

  useEffect(() => {
    // Store projectId from URL query params in sessionManager
    const projectIdFromUrl = searchParams.get('projectId');
    if (projectIdFromUrl) {
      sessionManager.setProjectId(projectIdFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!phone) {
      if (!leadLock?.lockedLead?.data && !lead && leadId !== 'not-found') {
        dispatch(getLeadById(leadId));
        dispatch(getLeadFollowUps(leadId));
      }
    } else {
      setAddNewLead(true);
    }
  }, [dispatch, leadId, leadLock?.lockedLead?.data, lead, phone]);

  useEffect(() => {
    if (successAddNote || successAddOrder || updateLeadB2BSuccess || updateLeadB2CSuccess) {
      dispatch(getLeadById(leadId));
      dispatch(getLeadFollowUps(leadId));
    }
  }, [
    dispatch,
    leadId,
    successAddNote,
    successAddOrder,
    updateLeadB2BSuccess,
    updateLeadB2CSuccess,
  ]);

  useEffect(() => {
    if (lead && leadLock?.lockedLead?.data) {
      dispatch(updateLeadData(lead));
    }
  }, [dispatch, lead, leadLock?.lockedLead?.data]);

  useEffect(() => {
    if (newLeadUuid) {
      setPhone('');
      if (leadId === 'not-found') {
        dispatch(setResetAll());
        setShowSuccess(true);
      } else {
        dispatch(setResetAll());
        dispatch(getLeadById(leadId));
      }
    }
  }, [newLeadUuid]);

  useEffect(() => {
    setSelectedScript(offers[0]?.script);
  }, [offers]);

  useEffect(() => {
    return () => {
      dispatch(setResetCustomerExistsSuccess());
      dispatch(setResetLeadById());
    };
  }, []);

  if (showSuccess) {
    return (
      <Success
        height="340px"
        title="New Lead Has Been Added!"
        description={`You successfully created new lead`}
        buttonText="Ok, thanks"
        route="/sales/search-lead"
      />
    );
  }
  return (
    <>
      <AddNote leadId={leadId} handleCloseModal={handleCloseModal} isModalOpen={addNote} />
      <AddOrder
        offers={offers}
        leadId={leadId}
        handleCloseModal={handleCloseModal}
        isModalOpen={addOrder}
      />
      <AddNewLead
        onClose={handleCloseAddLeadModal}
        handleClose={handleCloseAddLeadModalSuccess}
        phone={phone || leadInformation.phone}
        currentStatus={leadData?.currentStatus}
        lead={leadInformation}
        isEdit={isEdit}
        isModalOpen={addNewLead}
      />
      <ViewOrder
        data={leadData?.orders}
        onClose={() => setShowOrder(false)}
        isModalOpen={showOrder}
        onOrderUpdate={handleOrderUpdate}
        leadId={leadId}
        offers={offers}
      />
      <CompetitorInfo
        data={competitorInfoData}
        isModalOpen={showCompetitorInfo}
        onClose={handleCloseCompetitorInfo}
      />
      <History
        onClose={() => setOpenHistory(false)}
        data={leadData?.statusHistory}
        isModalOpen={openHistory}
      />
      <ContactDate
        leadId={leadId}
        isOpen={openContactDate}
        onClose={() => setOpenContactDate(false)}
      />

      {!phone && (
        <ViewContainer>
          <Header>
            <BackAction onClick={goBack}>
              <img src={arrow} alt="arrow" />
              <BackTitle>Back to list</BackTitle>
            </BackAction>
            <NextContact>
              <Button
                onClick={() => setOpenContactDate(true)}
                width="90px"
                height="38px"
                secondary
              >
                <img src={calendar} alt="calendar" />
                Next Contact
              </Button>
              <Button
                onClick={handleAddNewLeadNavigation}
                width="90px"
                height="38px"
                secondary
              >
                + Add New Lead
              </Button>
            </NextContact>
          </Header>

          <Filter
            currentStatus={leadData?.currentStatus}
            leadId={leadId}
            status={leadData?.availableStatuses}
            disabled={!canEdit}
          />
          <FollowUps
            followUps={leadFollowUps}
            loading={leadFollowUpsLoading}
            leadId={leadId}
          />

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
              <strong>🔒 Read-Only Mode:</strong> This lead is currently being edited by
              another user. Changes cannot be saved until it becomes available.
            </div>
          )}

          {getLeadLoading || leadLock?.isLoading?.getLead ? (
            <LoadContainer>
              <LoadingIcon src={loadIcon} alt="Loading..." />
            </LoadContainer>
          ) : (
            <InfoCardWrapper>
              <Card
                setShowCompetitorInfo={handleOpenCompetitorInfo}
                additional={additionalInfo}
                title="Lead Info"
                leadInformation={leadInformation}
                data={leadInfoGroup}
                action={
                  <LabelActions
                    lead={leadData}
                    showTooltipHistory={showTooltipHistory}
                    onShowTooltipHistory={handleShowHistoryTooltip}
                    onHideTooltipHistory={handleHideHistoryTooltip}
                    onOpenHistory={handleOpenHistory}
                    onEditClick={handleEditClick}
                    canEdit={canEdit}
                  />
                }
              />
              <Card
                title="Product offers"
                action={
                  <ProductActions
                    lead={leadData}
                    showTooltipOrder={showTooltipOrder}
                    onShowTooltipOrder={handleShowOrderTooltip}
                    onHideTooltipOrder={handleHideOrderTooltip}
                    onOpenOrder={handleOpenOrder}
                    onOpenAddOrder={handleOpenAddOrder}
                    canEdit={canEdit}
                  />
                }
                data={productOffersData}
              />
              <Card
                action={<ScriptAction onFullScreenClick={() => onFullScreenClick(true)} />}
                title="Script"
                data={scriptData}
              />
            </InfoCardWrapper>
          )}
          {/* <LeadTicketHistory data={[]} /> */}
          <AppointmentWrapper>
            <AppointmentText
              onClick={canEdit ? handleAppointmentNavigation : undefined}
              style={{
                opacity: canEdit ? 1 : 0.6,
                cursor: canEdit ? 'pointer' : 'not-allowed',
              }}
            >
              + Add Appointment
            </AppointmentText>
          </AppointmentWrapper>
          <AppointmentWrapper
            onClick={canEdit ? handleAddNote : undefined}
            style={{ opacity: canEdit ? 1 : 0.6, cursor: canEdit ? 'pointer' : 'not-allowed' }}
          >
            <AppointmentText $color="#FF6A00">+ Add note</AppointmentText>
          </AppointmentWrapper>
          <NoteWrapper>
            {leadData?.notes.map((elm) => (
              <Note title={elm.title} description={elm.description} key={elm.uuid} />
            ))}
          </NoteWrapper>
          <FullScreenScript
            onFullScreenClick={() => onFullScreenClick(false)}
            isOpen={fullScreen}
            leadId={selectedScript?.uuid}
            script={selectedScript}
          />
        </ViewContainer>
      )}
    </>
  );
};

const SalesLeadWithLock = withLeadLock(SalesLead, {
  autoLock: true,
  enableHeartbeat: true,
  showLockStatus: true,
  showConflictModal: false,
  showLeaveWarning: true,
  redirectOnConflict: null,
  onLockConflict: (error) => {
    console.warn('Lead lock conflict:', error.message || error);
  },
});

export default SalesLeadWithLock;
