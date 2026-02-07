import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import billingClient from 'api/billingApiClient';
import appointment from 'assets/tickets/appointment.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import DragDropUploadFile from 'common-ui/dragDropUploadFile';
import Input from 'common-ui/input';
import { AsyncSelect, Select, TypeToSearchSelect } from 'common-ui/select';
import Switch from 'common-ui/switch';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import TextEditor from 'common-ui/textEditor';
import {
  TICKET_APPOINTMENT_DURATION_OPTIONS,
  TICKET_APPOINTMENT_REMINDER_OPTIONS,
  TICKET_APPOINTMENT_WEEKDAY_OPTIONS,
  TICKET_PRIORITY_OPTIONS,
  TICKET_PROGRESS_OPTIONS,
  TICKET_STATUS_OPTIONS,
  TICKET_TRACKER_OPTIONS,
} from 'constants/constants';
import dayjs from 'dayjs';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  createTicket,
  editTicket,
  getSingleTicket,
  removeIsNewFromTicket,
} from 'features/projectManagement/ProjectManagementActions';
import {
  resetSuccess,
  selectLoading,
  selectSingleTicket,
  selectSuccess,
  setTicketJustClosed,
} from 'features/projectManagement/ProjectManagementSlice';
import {
  createDigitOptions,
  createFormData,
  generateOptions,
  isObjectEmpty,
  stripHtmlTags,
} from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import { AttachmentText } from '../singleTicketView/SingleTicketView.styles';
import {
  AppointmentOpenCloseText,
  BtnWrapper,
  Container,
  Form,
  Icon,
  Label,
  LeftContent,
  RightContent,
  Row,
  SwitchWrapper,
  TextEditorWrapper,
  TimeSelectWrapper,
  Title,
  Wrapper,
} from './CreateEditTicket.styles';
import Appointment from './appointment';
import { schema, schemaWithAppointment } from './schema';

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

const CreateEditTicket = () => {
  const location = useLocation();
  const projectUuid = location.state?.projectUuid;
  const crmUser = location.state?.crmUser;
  const [projectOptions, setProjectOptions] = useState([]);
  const [subprojectOptions, setSubprojectOptions] = useState([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [parentTaskOptions, setParentTaskOptions] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [subprojectId, setSubprojectId] = useState(null);
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  const userInfo = useSelector(selectUserInfo);
  const [searchParams] = useSearchParams();
  const ticket = useSelector(selectSingleTicket);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);

  const dispatch = useDispatch();
  const { uuid } = useParams();

  const isCopy = searchParams.get('copy') === 'true';
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
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(showAppointmentForm ? schemaWithAppointment : schema),
    defaultValues: {
      title: '',
      description: '',
      'appt-description': '',
      project: null,
      customerId: crmUser
        ? { label: `${crmUser.id} - ${crmUser.name}`, value: crmUser.id }
        : null,
      subprojectId: null,
      assignee: null,
      tracker: { label: 'Task', value: 'Task' },
      priority: { label: 'Medium', value: 2 },
      status: { label: 'To Do', value: 'To Do' },
      startDate: null,
      dueDate: null,
      comment: '',
      files: [],
      estimatedTime: { hours: '', minutes: '' },
      watchers: null,
      progress: { label: '0 %', value: 0 },
      parentTaskId: null,
      isPrivate: false,
      frequency: { label: 'One-time', value: 'One-time' },
      'appt-location': ticket?.appointment?.location,
      'appt-weekdays': mappedWeekdays,
      communication: {
        'phone-call': { enabled: true, value: '+374' },
        'text-message': { enabled: false, value: '+374' },
        email: { enabled: false, value: '' },
      },
      'appt-reminder': TICKET_APPOINTMENT_REMINDER_OPTIONS[0],
    },
  });

  const onSubmit = (data) => {
    const {
      title,
      description,
      customerId,
      subprojectId,
      assignee,
      tracker,
      priority,
      status,
      startDate,
      dueDate,
      comment,
      files,
      estimatedTime,
      watchers,
      progress,
      project,
      parentTaskId,
      isPrivate,
    } = data;
    const params = {};
    params.title = title;
    if (files) {
      params.files = files;
    }
    params.description = stripHtmlTags(description).trim().length > 0 ? description : '';
    params.status = status?.value;
    params.tracker = tracker?.value;
    params.projectId = project?.value;
    params.priority = priority?.value;
    params.progress = progress?.value;
    if (customerId?.value) {
      params.customerId = customerId.value;
    }
    params.subprojectId = subprojectId?.value;
    params.isPrivate = isPrivate;
    params.assigneeIds =
      assignee?.filter((item) => item.isTeam === false).map((item) => item.value) ?? [];
    params.teamIds =
      assignee?.filter((item) => item.isTeam === true).map((item) => item.value) ?? [];
    params.watcherIds = watchers?.map((item) => item.value) ?? [];
    if (startDate) {
      params.startDate = formatDateTime(startDate, true);
    }
    if (dueDate) {
      params.dueDate = formatDateTime(dueDate, true);
    }
    if (
      (estimatedTime?.hours?.value !== undefined && estimatedTime?.hours?.value > 0) ||
      (estimatedTime?.minutes?.value !== undefined && estimatedTime?.minutes?.value > 0)
    ) {
      params.estimatedTime = `${estimatedTime?.hours?.value ?? '00'}:${estimatedTime?.minutes?.value ?? '00'}`;
    }
    if (parentTaskId?.value) {
      params.parentTaskId = parentTaskId?.value ?? '';
    }
    if (uuid && !isCopy) {
      if (stripHtmlTags(comment).trim().length > 0) {
        params.comment = comment ?? '';
      }
      params.uuid = uuid;
      if (deletedFileIds?.length > 0) {
        params.removedFileIds = deletedFileIds;
      }
    }

    if (showAppointmentForm) {
      params.appointment = {
        location: data['appt-location'],
        description: data['appt-description'] ?? '',
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

      if (uuid && !isCopy) {
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
    } else {
      params.appointment = null;
    }

    const formData = new FormData();

    const formDataParams = createFormData(formData, params);

    if (uuid) {
      if (status?.value === 'Closed') {
        dispatch(setTicketJustClosed(true));
      }
      if (isCopy) {
        dispatch(createTicket(formData));
      } else {
        dispatch(editTicket(formDataParams));
      }
    } else {
      dispatch(createTicket(formData));
    }
  };

  const handleExitCreateEdit = (e) => {
    e?.preventDefault();
    dispatch(resetSuccess());
    if (isCopy) {
      navigate('/project-management/tickets');
    } else {
      navigate(-1);
    }
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
    setValue('parentTaskId', null);
    setValue('watchers', null);
  };

  const handleSubprojectChange = (selectedSubproject) => {
    setSubprojectId(selectedSubproject);
    setShowAppointmentForm(false);
    setValue('subprojectId', selectedSubproject);
    setValue('assignee', null);
    setValue('watchers', null);
  };

  const fetchProjectOptions = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/projects/user/all?name=${encodeURIComponent(searchTerm)}`
        : `/projects/user/all`;

      const response = await ApiClient.get(url);
      const options = generateOptions(response.projects || []);
      setProjectOptions(options);
      return options;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchSubprojectOptions = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/subprojects/user?projectId=${projectId?.value || projectId?.uuid || projectUuid}&?name=${encodeURIComponent(searchTerm)}`
        : `/subprojects/user?projectId=${projectId?.value || projectId?.uuid || projectUuid}`;

      const response = await ApiClient.get(url);
      const options = generateOptions(response.subprojects || [], null, 'uuid', 'name', [
        'subprojectType',
      ]);

      setSubprojectOptions(options);
      return options;
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

  const fetchParentTaskOptions = async (searchTerm) => {
    try {
      let url = `/tickets/project/${projectId?.value || projectId?.uuid || projectUuid}`;

      if (uuid !== undefined) {
        url += `?ticketId=${uuid}`;
      }

      if (searchTerm) {
        url += `${uuid !== undefined ? '&' : '?'}name=${encodeURIComponent(searchTerm)}`;
      }

      const response = await ApiClient.get(url);
      const options = generateOptions(response.tickets || []);
      setParentTaskOptions(options);
      return options;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchCustomerOptions = async (searchTerm) => {
    try {
      const trimmedTerm = searchTerm?.trim();
      if (!trimmedTerm || trimmedTerm.length < 1) {
        return [];
      }
      const response = await billingClient.get(
        `/sales/customer-exists?id=${encodeURIComponent(trimmedTerm)}`
      );
      const customer = response.data;
      if (!customer) return [];
      return [
        {
          label: `${customer.customerId} - ${customer.fullName}`,
          value: customer.customerId,
        },
      ];
    } catch (error) {
      console.error('Error fetching customer options:', error);
      return [];
    }
  };

  const handleOpenCloseAppointmentForm = () => {
    const currentValues = getValues();

    reset({
      ...currentValues,
      'appt-description': '',
      'appt-frequency': { label: 'One-time', value: 'One-time' },
      'appt-location': '',
      'appt-weekdays': null,
      'appt-timezoneId': {
        uuid: '334e105b-e95f-494e-9d80-a0b76348bbba',
        label: 'Asia/Yerevan +04:00',
      },
      'appt-service': null,
      'appt-duration': null,
      'appt-reminder': { label: 'Never', value: 'null' },
      'appt-date': null,
      'appt-time': null,
      'appt-date-0': '',
      'appt-date-1': '',
      'appt-date-2': '',
      'appt-date-3': '',
      'appt-date-4': '',
      'appt-date-5': '',
      'appt-date-6': '',
      communication: {
        'phone-call': {
          enabled: true,
          value: '',
        },
      },
    });

    setShowAppointmentForm((prev) => !prev);
  };

  useEffect(() => {
    fetchProjectOptions();

    if (uuid) {
      dispatch(getSingleTicket(uuid));
    }
  }, []);

  useEffect(() => {
    if (!uuid) {
      reset({
        ...getValues(),
        project: projectOptions?.find((item) => item.value === projectUuid),
      });
    }
  }, [projectOptions]);

  useEffect(() => {
    if (uuid && ticket.isNew) {
      dispatch(removeIsNewFromTicket(uuid));
    }

    if (uuid && !isObjectEmpty(ticket)) {
      setSubprojectId(ticket.subproject);
      setProjectId(ticket.project);

      const [hours, minutes] = (ticket.estimatedTime ?? '0:0').split(':');

      const defaultPriority =
        TICKET_PRIORITY_OPTIONS.find((item) => item.value === +ticket?.priority) ?? null;

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
        title: ticket.title ?? '',
        description: ticket.description ?? '',
        project: {
          label: ticket.project?.name,
          value: ticket.project?.uuid,
        },
        customerId: ticket.customerId
          ? { label: ticket.customerId, value: ticket.customerId }
          : null,
        subprojectId: {
          label: ticket.subproject?.name,
          value: ticket.subproject?.uuid,
        },
        assignee: generateOptions([...ticket.assignees, ...ticket.assignedTeams]),
        tracker: {
          label: ticket?.tracker,
          value: ticket?.tracker,
        },
        priority: defaultPriority,
        status: {
          label: ticket?.status,
          value: ticket?.status,
        },
        startDate: ticket.startDate,
        dueDate: ticket.dueDate,
        comment: '',
        estimatedTime: {
          hours: { label: hours, value: hours },
          minutes: { label: minutes, value: minutes },
        },
        watchers: generateOptions(ticket.watchers),
        progress: {
          label: `${ticket?.progress} %`,
          value: ticket?.progress,
        },
        parentTaskId: { label: ticket.parentTask?.title, value: ticket.parentTask?.uuid },
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
        isPrivate: ticket?.isPrivate,
      };
      reset(formData);
    }
  }, [ticket, uuid, reset]);

  useEffect(() => {
    if (success.edit || success.create) {
      dispatch(resetSuccess());
      handleExitCreateEdit();
    }
  }, [success.edit, success.create]);

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
      <Title>{uuid ? (isCopy ? 'Copy' : 'Edit') : 'Create'} ticket</Title>
      <Form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
        <Wrapper>
          <LeftContent>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Title"
                  required
                  disabled={uuid && !isCopy && ticket?.canEditTitle === false}
                  error={fieldState.error?.message}
                  maxLength={250}
                  placeholder="Enter ticket name"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TextEditorWrapper>
                  <TextEditor
                    {...field}
                    readOnly={uuid && !isCopy && ticket?.canEditTitle === false}
                    label="Description"
                    error={fieldState.error?.message}
                    maxLength={60000}
                    value={field.value}
                    placeholder="Describe ticket"
                  />
                </TextEditorWrapper>
              )}
            />

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
                  loadOptions={fetchProjectOptions}
                  onMenuOpen={fetchProjectOptions}
                  defaultOptions={projectOptions}
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
              name="parentTaskId"
              control={control}
              render={({ field, fieldState }) => (
                <AsyncSelect
                  {...field}
                  label="Parent task"
                  placeholder="Search by ID or title"
                  menuPlacement="top"
                  isClearable={true}
                  isDisabled={!projectId && !projectUuid}
                  $error={fieldState.error?.message}
                  loadOptions={fetchParentTaskOptions}
                  onMenuOpen={fetchParentTaskOptions}
                  defaultOptions={generateOptions(parentTaskOptions)}
                />
              )}
            />
          </LeftContent>
          <RightContent>
            <Row>
              <Controller
                name="tracker"
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    req
                    {...field}
                    label="Tracker"
                    className="select-option"
                    options={TICKET_TRACKER_OPTIONS}
                    $error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="priority"
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    req
                    {...field}
                    label="Priority"
                    className="select-option"
                    options={TICKET_PRIORITY_OPTIONS}
                    $error={fieldState.error?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    req
                    {...field}
                    label="Status"
                    className="select-option"
                    options={TICKET_STATUS_OPTIONS}
                    $error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="progress"
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    req
                    options={TICKET_PROGRESS_OPTIONS}
                    className="select-option"
                    label="Progress"
                    $error={fieldState.error?.message}
                  />
                )}
              />
            </Row>
            <Row>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    label="Start date"
                    height="44px"
                    maxDate={watch('dueDate') ? dayjs(watch('dueDate')) : null}
                  />
                )}
              />
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <CustomDatePicker
                    {...field}
                    height="44px"
                    label="End date"
                    minDate={watch('startDate') ? dayjs(watch('startDate')) : null}
                  />
                )}
              />
            </Row>
            <Label>Estimated time</Label>
            <TimeSelectWrapper>
              <TimeSelectWrapper>
                <Controller
                  name="estimatedTime.hours"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="w-75"
                      placeholder=" "
                      isClearable
                      options={createDigitOptions(0, 99)}
                    />
                  )}
                />
                <p>h</p>
              </TimeSelectWrapper>
              <TimeSelectWrapper>
                <Controller
                  name="estimatedTime.minutes"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      hideLabel
                      className="w-75"
                      placeholder=" "
                      options={createDigitOptions(0, 59)}
                    />
                  )}
                />
                <p>m</p>
              </TimeSelectWrapper>
            </TimeSelectWrapper>
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

            <Controller
              name="isPrivate"
              control={control}
              defaultValue={false}
              render={({ field }) => {
                return (
                  <SwitchWrapper>
                    <div> Set as a private</div>
                    <Switch
                      {...field}
                      isOn={field.value}
                      onToggle={() => field.onChange(!field.value)}
                      isDisabled={ticket.createdBy?.uuid !== userInfo?.uuid}
                    />
                  </SwitchWrapper>
                );
              }}
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
        {subprojectId &&
          subprojectId.subprojectType !== 'Activity' &&
          (!uuid || (uuid && ticket.appointment === null) ? (
            <AppointmentOpenCloseText
              onClick={handleOpenCloseAppointmentForm}
              $isOpen={showAppointmentForm}
            >
              {showAppointmentForm ? '- Clear and close appointment' : '+ Add appointment'}
            </AppointmentOpenCloseText>
          ) : null)}

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
        {showAppointmentForm && (
          <Appointment
            control={control}
            setValue={setValue}
            watch={watch}
            unregister={unregister}
            errors={errors}
            clearErrors={clearErrors}
          />
        )}
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
            {uuid ? (isCopy ? 'Copy ticket' : 'Save ticket') : 'Create ticket'}
          </Button>
        </BtnWrapper>
      </Form>
    </Container>
  );
};

export default CreateEditTicket;
