import { memo } from 'react';

import { Controller } from 'react-hook-form';

import Trash from 'assets/salesTrash.svg';
import Input from 'common-ui/input';
import { AsyncSelect } from 'common-ui/select';

import {
  AddResponseOption,
  AddResponseWrapper,
  DelateStep,
  DelateStepText,
  Label,
  OptionInputWrapper,
  OptionWrapper,
  ResponseOptions,
  TrashIcon,
} from '../../Sales.styles';

const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const Step = ({
  step,
  index,
  control,
  stepErrors,
  stepResponseOptions,
  steps,
  onDeleteStep,
  onStepTitleChange,
  onStepFieldChange,
  onResponseTextChange,
  onTargetChange,
  onAddResponseOption,
  onDeleteResponseOption,
}) => {
  const validateResponseOption = (text, optionId, stepIndex) => {
    if (!text.trim()) {
      return 'Response option is required';
    }

    if (text.length > 30) {
      return 'Response option must be at most 30 characters';
    }

    if (!nameRegex.test(text)) {
      return 'Only Latin and Armenian letters, numbers, and allowed special characters';
    }

    const stepOptions = stepResponseOptions[stepIndex] || [];
    const duplicates = stepOptions.filter(
      (opt) => opt.id !== optionId && opt.text.toLowerCase() === text.toLowerCase()
    );

    if (duplicates.length > 0) {
      return 'Response names must be unique';
    }

    return '';
  };

  const getStepOptions = (currentStepIndex) => {
    const options = [{ value: 'end', label: 'End script' }];
    steps.forEach((step, index) => {
      const stepNumber = index + 1;
      if (index !== currentStepIndex) {
        const stepTitle =
          step.targetStepTitle || step.stepTitle || step.title || `Step ${stepNumber}`;
        const stepValue = step.uuid || step.id || stepNumber;
        options.push({ value: stepValue, label: stepTitle });
      }
    });
    return options;
  };

  const handleResponseTextChange = (e, optionId) => {
    const newText = e.target.value;
    const error = validateResponseOption(newText, optionId, index);
    onResponseTextChange(e, optionId, index, error);
  };

  const handleTargetChange = (selectedOption, optionId) => {
    onTargetChange(selectedOption, optionId, index);
  };

  const handleAddResponseOption = (e) => {
    onAddResponseOption(e, index);
  };

  const handleDeleteResponseOption = (e, optionId) => {
    onDeleteResponseOption(e, optionId, index);
  };

  return (
    <div key={step.id}>
      {steps.length > 1 && (
        <DelateStep>
          <DelateStepText onClick={() => onDeleteStep(index)}>x</DelateStepText>
        </DelateStep>
      )}

      <Controller
        name={`title-${index}`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Title"
            error={stepErrors[`title-${index}`] || null}
            placeholder="Enter title"
            maxLength={50}
            onChange={(e) => {
              field.onChange(e);
              onStepTitleChange(e, index);
            }}
          />
        )}
      />

      <Controller
        name={`question-${index}`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Question"
            error={stepErrors[`question-${index}`] || null}
            placeholder="Enter question"
            maxLength={250}
            required
            onChange={(e) => {
              field.onChange(e);
              onStepFieldChange(e, index, 'question');
            }}
          />
        )}
      />

      {/* <Controller
        name={`agentNotes-${index}`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Agent Notes"
            error={stepErrors[`agentNotes-${index}`] || null}
            placeholder="Enter agent notes"
            maxLength={250}
            onChange={(e) => {
              field.onChange(e);
              onStepFieldChange(e, index, 'agentNotes');
            }}
          />
        )}
      /> */}

      <Label>
        Response options <span>*</span>
      </Label>
      <ResponseOptions>
        {(stepResponseOptions[index] || []).map((option) => {
          const optionId = option.uuid || option.id;
          return (
            <OptionWrapper key={optionId}>
              <OptionInputWrapper>
                <Input
                  value={option.text}
                  error={option.error || null}
                  onChange={(e) => handleResponseTextChange(e, optionId)}
                />
              </OptionInputWrapper>
              <OptionInputWrapper>
                <AsyncSelect
                  placeholder="Select target"
                  isDisabled={steps.length < 2}
                  value={
                    option.target
                      ? getStepOptions(index).find((opt) => opt.value === option.target)
                      : { value: 'end', label: 'End script', target: 'end' }
                  }
                  defaultOptions={getStepOptions(index)}
                  error={option.targetError}
                  className="AsyncSelect"
                  onChange={(selectedOption) => handleTargetChange(selectedOption, optionId)}
                />
                {(stepResponseOptions[index] || []).length > 2 && (
                  <TrashIcon
                    src={Trash}
                    alt="Trash"
                    onClick={(e) => handleDeleteResponseOption(e, optionId)}
                  />
                )}
              </OptionInputWrapper>
            </OptionWrapper>
          );
        })}
        <AddResponseWrapper>
          <AddResponseOption onClick={handleAddResponseOption}>
            + Add Response option
          </AddResponseOption>
        </AddResponseWrapper>
      </ResponseOptions>
    </div>
  );
};

export default memo(Step);
