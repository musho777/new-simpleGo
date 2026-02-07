import { memo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ColorPicker from 'common-ui/colorPicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect, Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import TimeSelector from 'common-ui/timeSelector';
import { MANAGEMENT_TYPE, SUBPROJECT_TYPE } from 'constants/constants';
import {
  editProject,
  editSubproject,
  getProjectTypes,
  getTimezone,
} from 'features/projects/projectsActions';
import { selectProjectTypes, selectTimezone } from 'features/projects/projectsSlice';
import { getUsers } from 'features/users/usersActions';
import { selectUsers } from 'features/users/usersSlice';
import { generateOptions } from 'utils';

import edit from '../../assets/edit.svg';
import { Icon } from '../Projects.styles';
import { BtnWrapper, Form, SwitchWrapper } from './Edit.styles';
import { projectSchema, subprojectSchema } from './schema';

const Edit = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const types = useSelector(selectProjectTypes);
  const users = useSelector(selectUsers);
  const timezone = useSelector(selectTimezone);

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
      uuid: data?.uuid,
      name: data.name,
      description: data.description ?? '',
      disabled: data.disabled,
      projectTypeId: {
        value: data?.projectType?.uuid ?? '',
        label: data?.projectType?.name ?? '',
      },
      subprojectType: {
        value: data?.subprojectType ?? '',
        label: data?.subprojectType ?? '',
      },
      managementTypeId: {
        label: data?.managementType,
        value: data?.managementType,
      },
      timezoneId: {
        value: data?.timezone?.uuid ?? '',
        label: data?.timezone?.name ?? '',
      },
      time: {
        startTime: data?.startTime,
        endTime: data?.endTime,
      },
      color: data?.color ?? '#FD7E14',
      ownerId: data?.owner
        ? {
            value: data?.owner?.uuid,
            label: data?.owner?.name,
          }
        : null,
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

  const handleOpenEditProjectModal = () => setIsModalOpen(!isModalOpen);

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
      uuid,
      ownerId,
    } = data;

    const params = {};

    params.uuid = uuid;
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
      ? dispatch(editProject(params))
      : dispatch(editSubproject(params));

    handleCloseModal();
  };

  const handleGetUsers = () => {
    dispatch(getUsers({ limit: 999999, offset: 0, disabled: false, isVerified: true }));
  };

  const handleGetProjectTypes = (name) => {
    dispatch(getProjectTypes({ name }));
  };

  const handleGetTimezone = () => dispatch(getTimezone());

  return (
    <>
      <BtnWrapper onClick={handleOpenEditProjectModal}>
        <Icon src={edit} alt="e" />
      </BtnWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={pathname === '/project/projects' ? 'Edit project' : 'Edit subproject'}
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
                label="Project name"
                error={errors.name?.message}
                required
                placeholder="Enter project name"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                maxLength={500}
                resizeVertical={false}
                resizeHorizontal={false}
                label="Description"
                placeholder="Describe project"
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
                    defaultOptions={generateOptions(users)}
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
                <Switch
                  isOn={!field.value}
                  onToggle={() => field.onChange(!field.value)}
                  disabled={data.hasActiveSubprojects}
                />
                {field.value ? 'Disabled' : 'Enabled'}
              </SwitchWrapper>
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(Edit);
