import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'common-ui/modal';
import Select from 'common-ui/select/Select';

import {
  ErrorText,
  FormGroup,
  FormLabel,
  Input,
  InputWrapper,
  ModalContent,
  Textarea,
} from '../shared/FormStyles';
import { subCategorySchema } from '../shared/validationSchemas';

const SubCategoryModal = ({ isOpen, onClose, onSave, subCategory = null }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(subCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'active',
    },
  });

  const [selectedStatus, setSelectedStatus] = useState({ value: 'active', label: 'Active' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (subCategory) {
      reset({
        name: subCategory.name || '',
        description: subCategory.description || '',
        status: subCategory.status || 'active',
      });
      setSelectedStatus({
        value: subCategory.status || 'active',
        label: subCategory.status === 'active' ? 'Active' : 'Disabled',
      });
    } else {
      reset({
        name: '',
        description: '',
        status: 'active',
      });
      setSelectedStatus({ value: 'active', label: 'Active' });
    }
  }, [subCategory, isOpen, reset]);

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setValue('status', selectedOption?.value || 'active');
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await onSave(data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSubmit(onSubmit)}
      title={subCategory ? 'Edit Subcategory' : 'Create Subcategory'}
      okText={subCategory ? 'Update' : 'Create'}
      cancelText="Cancel"
      footer
      closeIcon
      width="500px"
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
                  placeholder="Enter subcategory name"
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

export default SubCategoryModal;
