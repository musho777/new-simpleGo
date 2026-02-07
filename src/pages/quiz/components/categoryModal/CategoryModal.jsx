import { useCallback, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'common-ui/modal';
import Select from 'common-ui/select/Select';
import {
  fetchDepartments,
  fetchQuizBranchesForDepartments,
  fetchTeamsForBranches,
} from 'features/quiz';

import {
  ErrorText,
  FormGroup,
  FormLabel,
  Input,
  InputWrapper,
  ModalContent,
  Textarea,
} from '../shared/FormStyles';
import { categorySchema } from '../shared/validationSchemas';

const CategoryModal = ({ isOpen, onClose, onSave, category = null }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      teamUuids: [],
      status: 'active',
    },
  });

  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({ value: 'active', label: 'Active' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Reset all state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsInitialized(false);
      setSelectedDepartments([]);
      setSelectedBranches([]);
      setSelectedTeams([]);
      setBranches([]);
      setTeams([]);
      setSelectedStatus({ value: 'active', label: 'Active' });
    }
  }, [isOpen]);

  // Initialize modal data when it opens
  const initializeModal = useCallback(async () => {
    if (!isOpen || isInitialized) return;

    setLoading(true);

    try {
      // 1. Load all departments
      const departmentsData = await fetchDepartments();
      setDepartments(departmentsData);

      // Creating new category - reset form
      if (!category) {
        reset({
          name: '',
          description: '',
          teamUuids: [],
          status: 'active',
        });
        setSelectedStatus({ value: 'active', label: 'Active' });
        setIsInitialized(true);
        return;
      }

      // ---- EDITING: Set form fields ----
      const teamUuids = category.teams?.map((t) => t.uuid) || [];
      reset({
        name: category.name || '',
        description: category.description || '',
        teamUuids,
        status: category.status || 'active',
      });

      setSelectedStatus({
        value: category.status || 'active',
        label: category.status === 'active' ? 'Active' : 'Disabled',
      });

      // ---- EDITING: Populate selects from arrays ----
      const categoryDepartments = category.departments || [];
      const categoryBranches = category.branches || [];
      const categoryTeams = category.teams || [];

      // 2. Set departments select
      if (categoryDepartments.length > 0) {
        const deptOptions = categoryDepartments.map((dept) => ({
          value: dept.uuid,
          label: dept.name,
        }));
        setSelectedDepartments(deptOptions);

        // 3. Fetch and set branches
        const departmentUuids = categoryDepartments.map((d) => d.uuid);
        const branchesData = await fetchQuizBranchesForDepartments(departmentUuids);
        setBranches(branchesData);

        if (categoryBranches.length > 0) {
          const branchOptions = categoryBranches.map((branch) => ({
            value: branch.uuid,
            label: branch.name,
          }));
          setSelectedBranches(branchOptions);

          // 4. Fetch and set teams
          const branchUuids = categoryBranches.map((b) => b.uuid);
          const teamsData = await fetchTeamsForBranches(branchUuids);
          setTeams(teamsData);

          if (categoryTeams.length > 0) {
            const teamOptions = categoryTeams.map((team) => ({
              value: team.uuid,
              label: team.name,
            }));
            setSelectedTeams(teamOptions);
          }
        }
      }

      setIsInitialized(true);
    } catch (e) {
      console.error('Init edit modal error:', e);
    } finally {
      setLoading(false);
    }
  }, [isOpen, category, isInitialized, reset]);

  useEffect(() => {
    initializeModal();
  }, [initializeModal]);

  const handleDepartmentChange = async (selectedOptions) => {
    setSelectedDepartments(selectedOptions || []);
    setSelectedBranches([]);
    setSelectedTeams([]);
    setValue('teamUuids', []);
    setBranches([]);
    setTeams([]);

    if (selectedOptions && selectedOptions.length > 0) {
      setLoading(true);
      try {
        const departmentUuids = selectedOptions.map((opt) => opt.value);
        const branchesData = await fetchQuizBranchesForDepartments(departmentUuids);
        setBranches(branchesData);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBranchChange = async (selectedOptions) => {
    setSelectedBranches(selectedOptions || []);
    setSelectedTeams([]);
    setValue('teamUuids', []);
    setTeams([]);

    if (selectedOptions && selectedOptions.length > 0) {
      setLoading(true);
      try {
        const branchUuids = selectedOptions.map((opt) => opt.value);
        const teamsData = await fetchTeamsForBranches(branchUuids);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTeamChange = (selectedOptions) => {
    setSelectedTeams(selectedOptions || []);
    const teamUuids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setValue('teamUuids', teamUuids);
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setValue('status', selectedOption?.value || 'active');
  };

  const onSubmit = async (data) => {
    setSaving(true);

    try {
      // Include departmentUuids and branchUuids from selected state
      const submitData = {
        ...data,
        departmentUuids: selectedDepartments.map((dept) => dept.value),
        branchUuids: selectedBranches.map((branch) => branch.value),
      };
      await onSave(submitData);
    } catch (error) {
      console.log('SUBMIT ERROR:', error);

      const backendMessage = error?.response?.data?.message;

      if (backendMessage?.includes('already exists')) {
        setError('name', {
          type: 'server',
          message: backendMessage,
        });
      } else {
        alert(backendMessage || 'Something went wrong');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
      title={category ? 'Edit Category' : 'Create Category'}
      okText={category ? 'Update' : 'Create'}
      cancelText="Cancel"
      footer
      closeIcon
      width="600px"
      maxHeight="80vh"
      onOkLoading={saving}
    >
      <ModalContent>
        <FormGroup>
          <FormLabel>
            Name <span className="required">*</span>
          </FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWrapper>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter category name"
                  autoComplete="off"
                  $error={errors.name?.message}
                />
                {errors.name?.message && <ErrorText>{errors.name.message}</ErrorText>}
              </InputWrapper>
            )}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Description</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputWrapper>
                <Textarea
                  {...field}
                  placeholder="Enter description (max 80 characters)"
                  rows={3}
                  autoComplete="off"
                  $error={errors.description?.message}
                />
                {errors.description?.message && (
                  <ErrorText>{errors.description.message}</ErrorText>
                )}
              </InputWrapper>
            )}
          />
        </FormGroup>

        <FormGroup>
          <Select
            label="Department"
            req
            isMulti
            value={selectedDepartments}
            onChange={handleDepartmentChange}
            options={departments.map((dept) => ({
              value: dept.uuid,
              label: dept.name,
            }))}
            placeholder="Select Departments"
            isDisabled={loading}
            isClearable
            menuPlacement="bottom"
          />
        </FormGroup>

        <FormGroup>
          <Select
            label="Branch"
            req
            isMulti
            value={selectedBranches}
            onChange={handleBranchChange}
            options={branches.map((branch) => ({
              value: branch.uuid,
              label: branch.name,
            }))}
            placeholder="Select Branches"
            isDisabled={selectedDepartments.length === 0 || loading}
            isClearable
            menuPlacement="bottom"
          />
        </FormGroup>

        <FormGroup>
          <Select
            label="Team"
            req
            isMulti
            value={selectedTeams}
            onChange={handleTeamChange}
            options={teams.map((team) => ({
              value: team.uuid,
              label: team.name,
            }))}
            placeholder="Select Teams"
            isDisabled={selectedBranches.length === 0 || loading}
            isClearable
            menuPlacement="bottom"
            $error={errors.teamUuids?.message}
          />
        </FormGroup>

        <FormGroup>
          <Select
            label="Status"
            req
            value={selectedStatus}
            onChange={handleStatusChange}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'disabled', label: 'Disabled' },
            ]}
            placeholder="Select Status"
            menuPlacement="bottom"
            $error={errors.status?.message}
          />
          {errors.status?.message && <ErrorText>{errors.status.message}</ErrorText>}
        </FormGroup>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
