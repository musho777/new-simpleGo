import { memo, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import { getDepartments } from 'features/departments/departmentsActions';
import { selectDepartments } from 'features/departments/departmentsSlice';
import { getTimezone } from 'features/projects/projectsActions';
import { selectTimezone } from 'features/projects/projectsSlice';
import { createTeam, editTeam, getLeads } from 'features/teamManagement/teamManagementActions';
import { selectLeads } from 'features/teamManagement/teamManagementSlice';
import { promoteUser } from 'features/users/usersActions';
import { selectPromoteLoading, selectPromoteSuccess } from 'features/users/usersSlice';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import edit from '../../project/assets/edit.svg';
import { BtnWrapper, Form, Icon, Prompt, Row, SwitchWrapper } from './CreateEdit.styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Team name is required'),
  timeZoneId: Yup.object()
    .shape({
      value: Yup.string().required('Time zone is required'),
      label: Yup.string(),
    })
    .required('Time zone is required'),
  departmentId: Yup.object()
    .shape({
      value: Yup.string().required('Department is required'),
      label: Yup.string(),
    })
    .required('Department is required'),
  disabled: Yup.boolean().required(),
});

const CreateEdit = ({ data: teamManagementData, editMode = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [promoteModalOpen, setPromoteModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const departments = useSelector(selectDepartments);
  const timezone = useSelector(selectTimezone);
  const leads = useSelector(selectLeads);
  const promoteLoading = useSelector(selectPromoteLoading);
  const promoteSuccess = useSelector(selectPromoteSuccess);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: teamManagementData?.name ?? '',
      description: teamManagementData?.description ?? '',
      disabled: teamManagementData?.disabled ?? false,
      teamLeadId: teamManagementData?.lead
        ? {
            label: `${teamManagementData?.lead?.name} ${teamManagementData?.lead?.surname}`,
            value: teamManagementData?.lead?.uuid,
          }
        : null,
      timeZoneId: teamManagementData?.timezone
        ? {
            label: teamManagementData?.timezone?.name,
            value: teamManagementData?.timezone?.uuid,
          }
        : null,
      departmentId: teamManagementData?.department
        ? {
            label: teamManagementData?.department?.name,
            value: teamManagementData?.department?.uuid,
          }
        : null,
      uuid: teamManagementData?.uuid,
    },
  });

  const handleOpenCreateTeamModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEdit(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    reset();
  };

  const onSubmit = (data) => {
    const { name, description, disabled, teamLeadId, timeZoneId, departmentId } = data;

    const params = {
      name,
      description,
      disabled,
      teamLeadId: teamLeadId?.value || null,
      timezoneId: timeZoneId.value,
      departmentId: departmentId.value,
      uuid: teamManagementData?.uuid,
    };

    isEdit ? dispatch(editTeam(params)) : dispatch(createTeam(params));
    handleCloseModal();
  };

  const handleGetTimezone = (name) => {
    dispatch(getTimezone({ name }));
  };

  const handleGetDepartments = (name) => {
    dispatch(getDepartments({ limit: 9999, offset: 0, name, disabled: false }));
  };

  const handleGetLeads = (name) => {
    dispatch(getLeads({ name }));
  };

  const handleOpenEditTeamModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEdit(true);
  };

  const handleTeamLeadChange = (option) => {
    setPromoteModalOpen(option?.userType === 'Team Member');
    setUserData(option);
  };

  const handlePromoteUser = () => {
    const uuid = userData?.value;
    dispatch(promoteUser(uuid));
  };

  const handleClosePromoteModal = () => {
    setPromoteModalOpen(false);
  };

  useEffect(() => {
    if (promoteSuccess) {
      setPromoteModalOpen(false);
    }
  }, [promoteSuccess]);

  return (
    <>
      <BtnWrapper>
        {teamManagementData ? (
          <BtnWrapper onClick={handleOpenEditTeamModal}>
            <Icon src={edit} alt="e" />
          </BtnWrapper>
        ) : (
          <Button secondary onClick={handleOpenCreateTeamModal} className="h-38">
            + Create team
          </Button>
        )}
      </BtnWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={!editMode ? 'Create team' : 'Edit team'}
        width="474px"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Enter team name"
                maxLength={50}
                {...field}
                label="Team name"
                error={errors.name?.message}
                required
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
                placeholder="Describe team"
                label="Description"
                error={errors.description?.message}
                tooltip="You can skip this step!"
              />
            )}
          />

          <Controller
            name="teamLeadId"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                label="Team lead"
                placeholder="Select team lead"
                isClearable
                tooltip="You can skip this step!"
                $error={errors.teamLeadId?.message}
                loadOptions={handleGetLeads}
                onMenuOpen={handleGetLeads}
                defaultOptions={generateOptions(leads)}
                onChange={(option) => {
                  field.onChange(option);
                  handleTeamLeadChange(option);
                }}
              />
            )}
          />

          <Controller
            name="timeZoneId"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                label="Time zone"
                placeholder="Select time zone"
                isSearchable={false}
                $error={errors.timeZoneId?.message}
                loadOptions={handleGetTimezone}
                onMenuOpen={handleGetTimezone}
                defaultOptions={generateOptions(timezone)}
                req
              />
            )}
          />

          <Controller
            name="departmentId"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                label="Department"
                placeholder="Select department"
                $error={errors.departmentId?.message}
                loadOptions={handleGetDepartments}
                onMenuOpen={handleGetDepartments}
                defaultOptions={generateOptions(departments)}
                req
              />
            )}
          />

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
          <Row>
            <Button outlined onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button secondary type="submit">
              {!editMode ? 'Create' : 'Save'}
            </Button>
          </Row>
        </Form>
      </Modal>
      <Modal
        isOpen={promoteModalOpen}
        onClose={handleClosePromoteModal}
        title="Confirmation of changes"
      >
        <Prompt>
          The selected user currently has a team member’s role. Assigning them as Team Lead
          will change their role to Team head. Do you want to proceed?
        </Prompt>
        <Row>
          <Button outlined onClick={handleClosePromoteModal} loading={promoteLoading}>
            Cancel
          </Button>
          <Button secondary onClick={handlePromoteUser} loading={promoteLoading}>
            Approve
          </Button>
        </Row>
      </Modal>
    </>
  );
};

export default memo(CreateEdit);
