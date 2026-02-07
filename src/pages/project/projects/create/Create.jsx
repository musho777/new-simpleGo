import { memo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import ColorPicker from 'common-ui/colorPicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect, Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import TimeSelector from 'common-ui/timeSelector';
import { MANAGEMENT_TYPE, SUBPROJECT_TYPE } from 'constants/constants';
import dayjs from 'dayjs';
import {
  createProject,
  createSubproject,
  getProjectTypes,
  getTimezone,
} from 'features/projects/projectsActions';
import { selectProjectTypes, selectTimezone } from 'features/projects/projectsSlice';
import { getUsers } from 'features/users/usersActions';
import { selectUsers } from 'features/users/usersSlice';
import { generateOptions } from 'utils';

import { BtnWrapper, Form, Row, SwitchWrapper } from './Create.styles';
import { projectSchema, subprojectSchema } from './schema';

const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const types = useSelector(selectProjectTypes);
  const timezone = useSelector(selectTimezone);
  const users = useSelector(selectUsers);
  const userOptions = generateOptions(
    users?.map((item) => ({
      label: `${item.name} ${item.surname}`,
      value: item.uuid,
    }))
  );

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const schema = pathname === '/project/projects' ? projectSchema : subprojectSchema;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      surname: '',
      description: '',
      disabled: false,
      projectTypeId: null,
      subprojectType: null,
      managementTypeId: null,
      timezoneId: null,
      color: '#FD7E14',
      time: {
        startTime: dayjs().startOf('day').format('HH:mm'),
        endTime: dayjs().startOf('day').format('HH:mm'),
      },
    },
  });

  const colorOptions = [
    '#E63946',
    '#2D6CDF',
    '#28A745',
    '#FFC107',
    '#6F42C1',
    '#FD7E14',
    '#6C757D',
    '#000000',
    '#FFFFFF',
  ];

  const handleColorClick = (color) => {
    setValue('color', color);
  };

  const handleOpenCreateProjectModal = () => setIsModalOpen(!isModalOpen);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    const {
      name,
      description,
      disabled,
      projectTypeId,
      subprojectType,
      managementTypeId,
      timezoneId,
      color,
      time,
      ownerId,
    } = data;

    const params = {};

    params.name = name;
    if (description?.length > 0) {
      params.description = description;
    }
    params.disabled = disabled;

    if (pathname === '/project/projects') {
      params.projectTypeId = projectTypeId.value;
    } else if (pathname === '/project/projects/sub') {
      params.subprojectType = subprojectType?.value;
      params.managementType = managementTypeId?.value;
      params.timezoneId = timezoneId?.value;
      params.startTime = time.startTime;
      params.endTime = time.endTime;
    }

    if (color) {
      params.color = color;
    }

    params.ownerId = ownerId ? ownerId?.value : null;

    pathname === '/project/projects'
      ? dispatch(createProject(params))
      : dispatch(createSubproject(params));

    handleCloseModal();
  };

  const handleGetProjectTypes = () => {
    dispatch(getProjectTypes({ disabled: false }));
  };

  const handleGetUsers = () => {
    dispatch(getUsers({ limit: 999999, offset: 0, disabled: false, isVerified: true }));
  };

  const handleGetTimezone = () => {
    dispatch(getTimezone());
  };

  return (
    <>
      <BtnWrapper>
        <Button secondary onClick={handleOpenCreateProjectModal} className="h-38">
          {pathname === '/project/projects' ? '+ Create project' : '+ Create subproject'}
        </Button>
      </BtnWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={pathname === '/project/projects' ? 'Create project' : 'Create subproject'}
        width="474px"
        footer={true}
        onOk={handleSubmit(onSubmit)}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                maxLength={50}
                label={pathname === '/project/projects' ? 'Project name' : 'Subproject name'}
                error={errors.name?.message}
                required
                placeholder={
                  pathname === '/project/projects'
                    ? 'Enter project name'
                    : 'Enter subproject name'
                }
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                resizeVertical={false}
                resizeHorizontal={false}
                maxLength={500}
                label="Description"
                placeholder={
                  pathname === '/project/projects' ? 'Describe project' : 'Describe subproject'
                }
                error={errors.description?.message}
                tooltip="You can skip this step!"
              />
            )}
          />

          {pathname === '/project/projects' && (
            <Controller
              name="projectTypeId"
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  label="Project type"
                  $error={errors.projectTypeId?.message}
                  loadOptions={handleGetProjectTypes}
                  onMenuOpen={handleGetProjectTypes}
                  defaultOptions={generateOptions(types)}
                  placeholder="Select project type"
                  req
                />
              )}
            />
          )}

          {pathname === '/project/projects/sub' && (
            <>
              <Controller
                name="subprojectType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Subproject type"
                    $error={errors.subprojectType?.message}
                    options={SUBPROJECT_TYPE}
                    req
                    placeholder="Select subproject type"
                  />
                )}
              />
              <Controller
                name="managementTypeId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Management type"
                    $error={errors.managementTypeId?.message}
                    options={MANAGEMENT_TYPE}
                    req
                    placeholder="Select managment type"
                  />
                )}
              />
              <Controller
                name="timezoneId"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    label="Time zone"
                    isSearchable={false}
                    $error={errors.timezoneId?.message}
                    loadOptions={handleGetTimezone}
                    onMenuOpen={handleGetTimezone}
                    defaultOptions={generateOptions(timezone)}
                    req
                    placeholder="Select timezone"
                  />
                )}
              />
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <TimeSelector
                    {...field}
                    allowDisabled={true}
                    onSubmit={(time) => field.onChange(time)}
                    error={errors.time?.startTime?.message || errors.time?.endTime?.message}
                  />
                )}
              />
            </>
          )}

          {pathname === '/project/projects' && (
            <>
              <Controller
                name="ownerId"
                control={control}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    isClearable
                    label="Project owner"
                    placeholder="Select project owner"
                    $error={errors.ownerId?.message}
                    loadOptions={handleGetUsers}
                    onMenuOpen={handleGetUsers}
                    tooltip="You can skip this step!"
                    defaultOptions={userOptions}
                  />
                )}
              />

              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <ColorPicker
                    handleColorClick={handleColorClick}
                    colorOptions={colorOptions}
                    selectedColor={field.value}
                    onChange={field.onChange}
                    label="Select project color"
                  />
                )}
              />
            </>
          )}

          <Controller
            name="disabled"
            control={control}
            render={({ field }) => (
              <SwitchWrapper>
                <Switch isOn={!field.value} onToggle={() => field.onChange(!field.value)} />
                {field.value ? 'Disabled' : 'Enabled'}
              </SwitchWrapper>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
