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
import { quizSchema } from '../shared/validationSchemas';

const QuizModal = ({ isOpen, onClose, onSave, quiz = null }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      passingScore: 70,
      passingScoreType: 'percentage',
      status: 'draft',
      timeLimitSeconds: '',
    },
  });

  const [selectedPassingScoreType, setSelectedPassingScoreType] = useState({
    value: 'percentage',
    label: 'Percentage',
  });
  const [selectedStatus, setSelectedStatus] = useState({ value: 'draft', label: 'Draft' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (quiz) {
      reset({
        title: quiz.title || '',
        description: quiz.description || '',
        passingScore: quiz.passingScore || 70,
        passingScoreType: quiz.passingScoreType || 'percentage',
        status: quiz.status || 'draft',
        timeLimitSeconds: quiz.timeLimitSeconds || '',
      });
      setSelectedPassingScoreType({
        value: quiz.passingScoreType || 'percentage',
        label: quiz.passingScoreType === 'percentage' ? 'Percentage' : 'Count',
      });
      setSelectedStatus({
        value: quiz.status || 'draft',
        label:
          quiz.status === 'active' ? 'Active' : quiz.status === 'draft' ? 'Draft' : 'Disabled',
      });
    } else {
      reset({
        title: '',
        description: '',
        passingScore: 70,
        passingScoreType: 'percentage',
        status: 'draft',
        timeLimitSeconds: '',
      });
      setSelectedPassingScoreType({ value: 'percentage', label: 'Percentage' });
      setSelectedStatus({ value: 'draft', label: 'Draft' });
    }
  }, [quiz, isOpen, reset]);

  const handlePassingScoreTypeChange = (selectedOption) => {
    setSelectedPassingScoreType(selectedOption);
    setValue('passingScoreType', selectedOption?.value || 'percentage');
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
    setValue('status', selectedOption?.value || 'draft');
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
      title={quiz ? 'Edit Quiz' : 'Create Quiz'}
      okText={quiz ? 'Update' : 'Create'}
      cancelText="Cancel"
      footer
      closeIcon
      width="550px"
      maxHeight="80vh"
      onOkLoading={saving}
    >
      <ModalContent>
        <FormGroup>
          <FormLabel>
            Title <span className="required">*</span>
          </FormLabel>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputWrapper>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter quiz title"
                  autoComplete="off"
                  $error={errors.title?.message}
                />
                {errors.title?.message && <ErrorText>{errors.title.message}</ErrorText>}
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
                  placeholder="Enter quiz description (max 80 characters)"
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
          <FormLabel>
            Passing Score <span className="required">*</span>
          </FormLabel>
          <Controller
            name="passingScore"
            control={control}
            render={({ field }) => (
              <InputWrapper>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter passing score"
                  autoComplete="off"
                  $error={errors.passingScore?.message}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : Number(value));
                  }}
                />
                {errors.passingScore?.message && (
                  <ErrorText>{errors.passingScore.message}</ErrorText>
                )}
              </InputWrapper>
            )}
          />
        </FormGroup>

        <FormGroup>
          <Select
            label="Passing Score Type"
            req
            value={selectedPassingScoreType}
            onChange={handlePassingScoreTypeChange}
            options={[
              { value: 'percentage', label: 'Percentage' },
              { value: 'count', label: 'Count' },
            ]}
            placeholder="Select passing score type"
            menuPlacement="bottom"
            $error={errors.passingScoreType?.message}
          />
          {errors.passingScoreType?.message && (
            <ErrorText>{errors.passingScoreType.message}</ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel>Time Limit (seconds)</FormLabel>
          <Controller
            name="timeLimitSeconds"
            control={control}
            render={({ field }) => (
              <InputWrapper>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter time limit in seconds (optional)"
                  autoComplete="off"
                  $error={errors.timeLimitSeconds?.message}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : Number(value));
                  }}
                />
                {errors.timeLimitSeconds?.message && (
                  <ErrorText>{errors.timeLimitSeconds.message}</ErrorText>
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
              { value: 'draft', label: 'Draft' },
              { value: 'active', label: 'Active' },
              { value: 'disabled', label: 'Disabled' },
            ]}
            placeholder="Select status"
            menuPlacement="bottom"
            $error={errors.status?.message}
          />
          {errors.status?.message && <ErrorText>{errors.status.message}</ErrorText>}
        </FormGroup>
      </ModalContent>
    </Modal>
  );
};

export default QuizModal;
