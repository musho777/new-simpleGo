import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import billingApiClient from 'api/billingApiClient';
import appointment from 'assets/tickets/appointment.svg';
import Button from 'common-ui/button';
import DragDropUploadFile from 'common-ui/dragDropUploadFile';
import Input from 'common-ui/input';
import { AsyncSelect, TypeToSearchSelect } from 'common-ui/select';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import TextEditor from 'common-ui/textEditor';
import {
  TICKET_APPOINTMENT_DURATION_OPTIONS,
  TICKET_APPOINTMENT_REMINDER_OPTIONS,
  TICKET_APPOINTMENT_WEEKDAY_OPTIONS,
} from 'constants/constants';
import {
  createAppointment,
  editTicket,
  getAppointmentContext,
  getSingleTicket,
  removeIsNewFromTicket,
} from 'features/projectManagement/ProjectManagementActions';
import {
  resetSuccess,
  selectAppointmentContext,
  selectLoading,
  selectSingleTicket,
} from 'features/projectManagement/ProjectManagementSlice';
import { createFormData, generateOptions, isObjectEmpty, stripHtmlTags } from 'utils';

import {
  AppointmentOpenCloseText,
  BtnWrapper,
  Container,
  Form,
  Icon,
  LeftContent,
  RightContent,
  Title,
  Wrapper,
} from '../createEditTicket/CreateEditTicket.styles';
import { AttachmentText } from '../singleTicketView/SingleTicketView.styles';
import Appointment from './appointment';
import { schemaWithAppointment } from './schema';

const getDurationView = (d) => {
  const result = TICKET_APPOINTMENT_DURATION_OPTIONS.find(
    (duration) => duration.value === String(d)
  );

  return result ?? null;
};

const getReminderView = (d) => {
  const result = TICKET_APPOINTMENT_REMINDER_OPTIONS.find(
    (reminder) => reminder.value === String(d)
  );

  return result ?? null;
};

const convertWeekdaysToObject = (weekdaysArray) => {
  return weekdaysArray.reduce((acc, { weekday, time }) => {
    acc[`appt-time-${weekday}`] = { startTime: time };
    return acc;
  }, {});
};

const CreateEditAppointments = () => {
  const location = useLocation();
  const projectUuid = location.state?.projectUuid;
  const crmUser = location.state?.crmUser;
  const [subprojectOptions, setSubprojectOptions] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [newOffers, setNewOffers] = useState([]);

  const [projectId, setProjectId] = useState(null);
  const [subprojectId, setSubprojectId] = useState(null);
  const [deletedFileIds, setDeletedFileIds] = useState([]);

  const ticket = useSelector(selectSingleTicket);
  const appointmentCtx = useSelector(selectAppointmentContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const isLoading = useSelector(selectLoading);

  const dispatch = useDispatch();

  const { uuid } = useParams();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const navigate = useNavigate();

  const mappedWeekdays = ticket?.appointment?.weekdays
    ?.map(({ weekday, time }) => {
      const dayOption = TICKET_APPOINTMENT_WEEKDAY_OPTIONS.find((opt) => opt.value == weekday);
      return dayOption ? { ...dayOption, time } : null;
    })
    .filter(Boolean);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    unregister,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schemaWithAppointment),
    defaultValues: {
      'appt-description': '',
      project: null,
      customerId: crmUser
        ? {
            label: `${crmUser.id || crmUser.phone} - ${crmUser.name}`,
            value: crmUser.id || crmUser.phone,
          }
        : null,
      subprojectId: null,
      assignee: null,
      comment: '',
      files: [],
      watchers: null,
      frequency: { label: 'One-time', value: 'One-time' },
      'appt-location': ticket?.appointment?.location,
      'appt-weekdays': mappedWeekdays,
      communication: {
        'phone-call': { enabled: true, value: '+374' },
        'text-message': { enabled: false, value: '+374' },
        email: { enabled: false, value: '' },
      },
      'appt-reminder': TICKET_APPOINTMENT_REMINDER_OPTIONS[0],
      currentOffers: '',
    },
  });

  const onSubmit = (data) => {
    const { customerId, subprojectId, assignee, comment, files, watchers, project } = data;
    const params = {};
    if (files) {
      params.files = files;
    }
    params.projectId = project?.value;
    if (customerId?.value) {
      params.customerId = customerId.value;
    }
    params.subprojectId = subprojectId?.value;
    params.assigneeIds =
      assignee?.filter((item) => item.isTeam === false).map((item) => item.value) ?? [];
    params.teamIds =
      assignee?.filter((item) => item.isTeam === true).map((item) => item.value) ?? [];
    params.watcherIds = watchers?.map((item) => item.value) ?? [];

    if (uuid) {
      if (stripHtmlTags(comment).trim().length > 0) {
        params.comment = comment ?? '';
      }
      params.uuid = uuid;
      if (deletedFileIds?.length > 0) {
        params.removedFileIds = deletedFileIds;
      }
    }

    params.appointment = {
      location: data['appt-location'],
      reminder: data['appt-reminder']?.value,
      frequency: data['appt-frequency']?.value,
      duration: data['appt-duration']?.value,
      service: data['appt-service']?.value,
      timezoneId: data['appt-timezoneId']?.value,
      communicationMethod: {
        email: data.communication?.email?.value || '',
        phoneCall: data.communication?.['phone-call']?.value || '',
        textMessage: data.communication?.['text-message']?.value || '',
      },
    };

    if (uuid) {
      params.appointment.disabled = data['appt-disabled'];
    }

    if (
      data['appt-frequency']?.value === 'One-time' ||
      data['appt-frequency']?.value === 'Monthly'
    ) {
      params.appointment = {
        ...params.appointment,
        date: data['appt-date'],
      };
    } else if (data['appt-frequency']?.value === 'Daily') {
      params.appointment = {
        ...params.appointment,
        time: data['appt-time']?.startTime,
      };
    } else if (data['appt-frequency'].value === 'Weekly') {
      const weekdays = Object.keys(data)
        .filter((key) => key.startsWith('appt-time-'))
        .map((key) => {
          const weekdayNumber = parseInt(key.split('-')[2], 10);

          return {
            time: data[key]?.startTime,
            weekday: weekdayNumber,
          };
        });

      params.appointment = {
        ...params.appointment,
        weekdays,
      };
    }

    const formData = new FormData();

    const formDataParams = createFormData(formData, params);
    if (uuid) {
      dispatch(editTicket(formDataParams));
    } else {
      dispatch(createAppointment(formData));
    }
  };

  const handleExitCreateEdit = (e) => {
    e?.preventDefault();
    dispatch(resetSuccess());
    navigate(-1);
  };

  const removeFile = (fileId) => {
    setDeletedFileIds((prev) => [...prev, fileId]);
    setUploadedFiles((prev) => prev.filter((file) => file.uuid !== fileId));
  };

  const handleProjectChange = (selectedProject) => {
    setProjectId(selectedProject);
    setValue('project', selectedProject);
    setValue('subprojectId', null);
    setValue('assignee', null);
    setValue('watchers', null);

    if (selectedProject?.subprojects) {
      const options = generateOptions(selectedProject.subprojects, null, 'uuid', 'name', [
        'subprojectType',
      ]);
      setSubprojectOptions(options);
    } else {
      setSubprojectOptions([]);
    }
  };

  const handleSubprojectChange = (selectedSubproject) => {
    setSubprojectId(selectedSubproject);
    setShowAppointmentForm(false);
    setValue('subprojectId', selectedSubproject);
    setValue('assignee', null);
    setValue('watchers', null);
  };

  const fetchSubprojectOptions = async (searchTerm) => {
    try {
      if (projectId?.subprojects) {
        let filteredSubprojects = projectId.subprojects;

        if (searchTerm) {
          filteredSubprojects = projectId.subprojects.filter((sp) =>
            sp.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        const options = generateOptions(filteredSubprojects, null, 'uuid', 'name', [
          'subprojectType',
        ]);
        setSubprojectOptions(options);
        return options;
      }
      return [];
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchAssigneeOptions = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/tickets/subproject-members-teams/${subprojectId?.value || subprojectId?.uuid}?name=${encodeURIComponent(searchTerm)}`
        : `/tickets/subproject-members-teams/${subprojectId?.value || subprojectId?.uuid}`;

      const response = await ApiClient.get(url);
      const options = generateOptions(response.members || []);
      setAssigneeOptions(options);
      return options;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchWatchersOptions = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/users/subproject-members/${subprojectId?.value || subprojectId?.uuid}?name=${encodeURIComponent(searchTerm)}`
        : `/users/subproject-members/${subprojectId?.value || subprojectId?.uuid}`;

      const response = await ApiClient.get(url);
      const options = generateOptions(response.users || []);
      setAssigneeOptions(options);
      return options;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchNewOfferOptions = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/tariff/active?name=${encodeURIComponent(searchTerm)}`
        : `/tariff/active`;

      const response = await billingApiClient.get(url);
      const options = generateOptions(response.data);
      setNewOffers(options);
      return options;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchCustomerOptions = async (searchTerm) => {
    try {
      if (!searchTerm || searchTerm.length < 1) {
        return [];
      }

      const response = await ApiClient.get(
        `/sales/customers?customerId=${encodeURIComponent(searchTerm)}`
      );

      const customers = response.data?.content || [];
      const options = customers.map((customer) => ({
        label: `${customer.customerId} - ${customer.fullName}`,
        value: customer.customerId,
      }));

      return options;
    } catch (error) {
      console.error('Error fetching customer options:', error);
      return [];
    }
  };

  useEffect(() => {
    if (uuid) {
      dispatch(getSingleTicket(uuid));
    }

    const customerId = crmUser?.id || crmUser?.phone;
    if (customerId) {
      dispatch(getAppointmentContext(customerId));
    }

    if (crmUser?.offers && Array.isArray(crmUser.offers)) {
      const offerNames = crmUser.offers.map((offer) => offer.tariffName).join(', ');
      setValue('currentOffers', offerNames);
    }
  }, []);

  useEffect(() => {
    if (appointmentCtx) {
      if (appointmentCtx.customerPhone) {
        setValue('communication.phone-call.value', appointmentCtx.customerPhone);
      }
      if (appointmentCtx.customerEmail) {
        setValue('communication.email.value', appointmentCtx.customerEmail);
      }
    }
  }, [appointmentCtx]);

  useEffect(() => {
    if (uuid && ticket.isNew) {
      dispatch(removeIsNewFromTicket(uuid));
    }

    if (uuid && !isObjectEmpty(ticket)) {
      setSubprojectId(ticket.subproject);

      const projectData = {
        label: ticket.project?.name,
        value: ticket.project?.uuid,
        subprojects: ticket.project?.subprojects || [],
        ...ticket.project,
      };
      setProjectId(projectData);

      // Update subproject options from project's subprojects
      if (ticket.project?.subprojects) {
        const options = generateOptions(ticket.project.subprojects, null, 'uuid', 'name', [
          'subprojectType',
        ]);
        setSubprojectOptions(options);
      }

      if (ticket.files) {
        setValue('files', ticket.files);
        setUploadedFiles(ticket.files);
      }

      if (ticket.appointment && uuid) {
        setShowAppointmentForm(true);
      }

      const weekdaysObject = ticket?.appointment?.weekdays
        ? convertWeekdaysToObject(ticket.appointment.weekdays)
        : {};

      const formData = {
        project: projectData,
        customerId: ticket.customerId
          ? { label: ticket.customerId, value: ticket.customerId }
          : null,
        subprojectId: {
          label: ticket.subproject?.name,
          value: ticket.subproject?.uuid,
        },
        assignee: generateOptions([...ticket.assignees, ...ticket.assignedTeams]),

        comment: '',

        watchers: generateOptions(ticket.watchers),

        'appt-location': ticket?.appointment?.location,
        'appt-description': ticket?.appointment?.description ?? '',
        'appt-timezoneId': ticket?.appointment?.timezone
          ? {
              label: ticket?.appointment?.timezone.name,
              value: ticket?.appointment?.timezone.uuid,
            }
          : null,
        'appt-service': {
          label: ticket?.appointment?.service,
          value: ticket?.appointment?.service,
        },
        'appt-frequency': {
          label: ticket?.appointment?.frequency,
          value: ticket?.appointment?.frequency,
        },
        'appt-weekdays': mappedWeekdays,
        'appt-duration': getDurationView(ticket?.appointment?.duration),
        'appt-reminder': getReminderView(ticket?.appointment?.reminder ?? 'null'),
        communication: {
          'phone-call': {
            enabled: !!ticket?.appointment?.communicationMethod?.phoneCall,
            value: ticket?.appointment?.communicationMethod?.phoneCall,
          },
          'text-message': {
            enabled: !!ticket?.appointment?.communicationMethod?.textMessage,
            value: ticket?.appointment?.communicationMethod?.textMessage,
          },
          email: {
            enabled: !!ticket?.appointment?.communicationMethod?.email,
            value: ticket?.appointment?.communicationMethod?.email,
          },
        },
        'appt-date': ticket?.appointment?.date,
        ...weekdaysObject,
        'appt-disabled': ticket?.appointment?.disabled,
        'appt-time': { startTime: ticket?.appointment?.time },
      };
      reset(formData);
    }
  }, [ticket, uuid, reset]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  if (isLoading.singleTicket)
    return (
      <LoadContainer>
        <LoadingIcon src={loadIcon} alt="Loading..." />
      </LoadContainer>
    );

  return (
    <Container>
      <Title>{uuid ? 'Edit' : 'Create'} ticket</Title>
      <Form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        <Wrapper>
          <LeftContent>
            <Controller
              name="customerId"
              control={control}
              render={({ field, fieldState }) => (
                <TypeToSearchSelect
                  {...field}
                  label="Customer ID"
                  $error={fieldState.error?.message}
                  placeholder="Type to search customer..."
                  isDisabled={!!crmUser}
                  loadOptions={fetchCustomerOptions}
                  debounceDelay={500}
                  isClearable={!crmUser}
                  value={field.value}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    if (selectedOption?.value) {
                      dispatch(getAppointmentContext(selectedOption.value));
                    }
                  }}
                />
              )}
            />
            <Controller
              name="project"
              control={control}
              render={({ field, fieldState }) => (
                <AsyncSelect
                  {...field}
                  label="Project"
                  placeholder="Select project"
                  req
                  isDisabled={uuid && ticket?.appointment}
                  $error={fieldState.error?.message}
                  defaultOptions={generateOptions(
                    appointmentCtx?.availableProjects,
                    null,
                    'uuid',
                    'name',
                    ['subprojects']
                  )}
                  onChange={(selectedProject) => handleProjectChange(selectedProject)}
                />
              )}
            />

            <Controller
              name="subprojectId"
              control={control}
              render={({ field, fieldState }) => (
                <AsyncSelect
                  {...field}
                  label="Subproject / Activity"
                  placeholder="Assign activity"
                  req
                  isDisabled={(!projectId && !projectUuid) || (ticket?.appointment && uuid)}
                  $error={fieldState.error?.message}
                  loadOptions={fetchSubprojectOptions}
                  onMenuOpen={fetchSubprojectOptions}
                  defaultOptions={subprojectOptions}
                  onChange={(selectedSubproject) => handleSubprojectChange(selectedSubproject)}
                />
              )}
            />
            <Controller
              name="assignee"
              control={control}
              render={({ field, fieldState }) => (
                <AsyncSelect
                  {...field}
                  isMulti
                  req
                  placeholder="Assign members"
                  label="Assignee"
                  menuPlacement="top"
                  isDisabled={!subprojectId}
                  $error={fieldState.error?.message}
                  loadOptions={fetchAssigneeOptions}
                  onMenuOpen={fetchAssigneeOptions}
                  defaultOptions={assigneeOptions}
                />
              )}
            />
            <Controller
              name="watchers"
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  isMulti
                  label="Watchers"
                  placeholder="Assign watchers"
                  isDisabled={!subprojectId}
                  loadOptions={fetchWatchersOptions}
                  onMenuOpen={fetchWatchersOptions}
                  defaultOptions={assigneeOptions}
                />
              )}
            />
          </LeftContent>
          <RightContent>
            {crmUser.id && (
              <Controller
                name="currentOffers"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Current offer"
                    required
                    disabled={true}
                    error={fieldState.error?.message}
                    maxLength={250}
                    placeholder="Enter ticket name"
                  />
                )}
              />
            )}
            {crmUser.id && (
              <Controller
                name="selectedOfferId"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    label="New offer"
                    defaultOptions={newOffers}
                    loadOptions={fetchNewOfferOptions}
                    onMenuOpen={fetchNewOfferOptions}
                    onInputChange={fetchNewOfferOptions}
                    placeholder="Select offer"
                    isClearable
                    isSearchable
                  />
                )}
              />
            )}
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <>
                  <DragDropUploadFile
                    {...field}
                    onFilesChange={(files) => setValue('files', files)}
                    removeDefaultFile={removeFile}
                    defaultFiles={uploadedFiles}
                  />
                </>
              )}
            />
          </RightContent>
        </Wrapper>
        {uuid && (
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextEditor
                {...field}
                label="Add notes"
                placeholder="Start writing here..."
                onChange={(newComment) => setValue('comment', newComment)}
              />
            )}
          />
        )}
        {uuid && ticket.appointment ? (
          <AttachmentText
            style={{
              marginTop: '18px',
            }}
          >
            <Icon src={appointment} alt="appointment" />
            Appointment
          </AttachmentText>
        ) : null}

        {uuid && <AppointmentOpenCloseText />}
        <Appointment
          control={control}
          setValue={setValue}
          watch={watch}
          unregister={unregister}
          errors={errors}
          clearErrors={clearErrors}
        />
        <BtnWrapper>
          <Button
            outlined
            type="button"
            onClick={handleExitCreateEdit}
            disabled={isLoading.edit || isLoading.create}
          >
            Cancel
          </Button>
          <Button secondary type="submit" loading={isLoading.edit || isLoading.create}>
            {uuid ? 'Save ticket' : 'Create ticket'}
          </Button>
        </BtnWrapper>
      </Form>
    </Container>
  );
};

export default CreateEditAppointments;
