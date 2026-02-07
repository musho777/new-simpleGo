import { memo, useEffect, useRef, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import TextEditor from 'common-ui/textEditor';
import {
  createSalesScript,
  editSalesScript,
  getSalesScriptEnhanced,
  getSalesScripts,
} from 'features/sales/salesActions';
import { TextEditorWrapper } from 'pages/projectManagement/createEditTicket/CreateEditTicket.styles';
import * as Yup from 'yup';

import {
  AddStep,
  BtnWrapper,
  EnableSwitchContainer,
  EnableSwitchWrapper,
  Form,
  ShiftControl,
  SwitchLabel,
} from '../Sales.styles';
import Step from './components/Step';
import useSearchData from './useSearchData';

const nameRegex = /^[A-Za-zԱ-Ֆա-ֆև0-9 ,.:#\-/'&()]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(
      nameRegex,
      'Only  Latin and Armenian letters, numbers, and allowed special characters'
    ),
  description: Yup.string().max(250, 'Description must be at most 250 characters'),
  script: Yup.string()
    .required('Script is required')
    .max(10000, 'Script must be at most 10000 characters'),
  isEnabled: Yup.boolean(),
});

const Create = ({ isEdit = false, initialData = null, onCloseEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState('430px');
  const [steps, setSteps] = useState([]);
  const [stepResponseOptions, setStepResponseOptions] = useState({});
  const [stepErrors, setStepErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { searchData } = useSearchData();
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      script: '',
      isEnabled: true,
    },
    shouldFocusError: false,
  });
  const fetchSalesScriptData = async (uuid) => {
    setIsLoading(true);
    try {
      const response = await dispatch(getSalesScriptEnhanced(uuid));
      const data = response.payload;

      const formValues = {
        name: data.name || '',
        description: data.description || '',
        script: data.script || '',
        isEnabled: data.isEnabled ?? true,
      };

      if (data.steps && data.steps.length > 0) {
        const stepsData = data.steps.map((step, index) => ({
          id: step.uuid || Date.now() + index,
          uuid: step.uuid,
          title: step.stepTitle || '',
          stepTitle: step.stepTitle || step.targetStepTitle || '',
        }));
        setSteps(stepsData);

        data.steps.forEach((step, stepIndex) => {
          formValues[`title-${stepIndex}`] = step.stepTitle || '';
          formValues[`question-${stepIndex}`] = step.question || '';
          formValues[`agentNotes-${stepIndex}`] = step.agentNotes || '';
        });

        const responseOptionsData = {};
        data.steps.forEach((step, stepIndex) => {
          if (step.responseOptions && step.responseOptions.length > 0) {
            responseOptionsData[stepIndex] = step.responseOptions.map((option) => ({
              uuid: option.uuid,
              text: option.optionText || '',
              error: '',
              targetStepTitle: option.targetStepTitle,
              target: option.targetStepId || 'end',
              // target:
              //   option.actionType === 'end_script'
              //     ? 'end'
              //     : option.targetStepId
              //       ? stepsData[parseInt(option.targetStepId) - 1]?.id?.toString() || 'end'
              //       : 'end',
              targetError: '',
            }));
          }
        });
        setStepResponseOptions(responseOptionsData);
      }

      reset(formValues);
    } catch (error) {
      console.error('Error fetching sales script data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (!isEdit && steps.length === 0) {
      const defaultStepId = Date.now();
      setSteps([{ id: defaultStepId, title: '' }]);
      setStepResponseOptions({
        0: [
          { id: 1, text: 'Yes', error: '', target: 'end', targetError: '' },
          { id: 2, text: 'No', error: '', target: 'end', targetError: '' },
        ],
      });
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
    setSteps([]);
    setStepResponseOptions({});
    setStepErrors({});
    if (onCloseEdit) onCloseEdit();
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    const newStepId = Date.now();
    setSteps((prev) => [...prev, { id: newStepId, title: '' }]);

    const newStepIndex = steps.length;
    setStepResponseOptions((prev) => ({
      ...prev,
      [newStepIndex]: [
        { id: 1, text: 'Yes', error: '', target: 'end', targetError: '' },
        { id: 2, text: 'No', error: '', target: 'end', targetError: '' },
      ],
    }));
  };
  const handleDeleteStep = (stepIndex) => {
    const deletedStepId = steps[stepIndex]?.id || steps[stepIndex]?.uuid;

    setSteps((prev) => prev.filter((_, index) => index !== stepIndex));

    setStepResponseOptions((prev) => {
      const newOptions = {};
      Object.keys(prev).forEach((key) => {
        const index = parseInt(key);
        if (index < stepIndex) {
          newOptions[index] = prev[index].map((opt) => ({
            ...opt,
            target: opt.target === deletedStepId ? 'end' : opt.target,
            targetError: opt.target === deletedStepId ? '' : opt.targetError,
          }));
        } else if (index > stepIndex) {
          newOptions[index - 1] = prev[index].map((opt) => ({
            ...opt,
            target: opt.target === deletedStepId ? 'end' : opt.target,
            targetError: opt.target === deletedStepId ? '' : opt.targetError,
          }));
        }
      });
      return newOptions;
    });

    setStepErrors((prev) => {
      const newErrors = {};
      Object.keys(prev).forEach((key) => {
        if (key.includes(`-${stepIndex}`)) {
          return;
        }
        const match = key.match(/(\w+)-(\d+)/);
        if (match) {
          const [, prefix, indexStr] = match;
          const index = parseInt(indexStr);
          if (index > stepIndex) {
            newErrors[`${prefix}-${index - 1}`] = prev[key];
          } else if (index < stepIndex) {
            newErrors[key] = prev[key];
          }
        }
      });
      return newErrors;
    });
  };

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

  const validateResponseTarget = (target) => {
    if (!target) {
      return "All response options must point to another step or to 'End script'";
    }
    return '';
  };

  const handleResponseTextChange = (e, optionId, stepIndex, error) => {
    const newText = e.target.value;
    const newOptions = (stepResponseOptions[stepIndex] || []).map((opt) => {
      const currentOptionId = opt.uuid || opt.id;
      return currentOptionId === optionId ? { ...opt, text: newText, error } : opt;
    });
    setStepResponseOptions((prev) => ({
      ...prev,
      [stepIndex]: newOptions,
    }));
  };

  const handleTargetChange = (selectedOption, optionId, stepIndex) => {
    const target = selectedOption ? selectedOption.value : null;
    const targetError = validateResponseTarget(target);
    const newOptions = (stepResponseOptions[stepIndex] || []).map((opt) => {
      const currentOptionId = opt.uuid || opt.id;
      return currentOptionId === optionId ? { ...opt, target, targetError } : opt;
    });
    setStepResponseOptions((prev) => ({
      ...prev,
      [stepIndex]: newOptions,
    }));
  };

  const handleAddResponseOption = (e, stepIndex) => {
    e.preventDefault();
    const currentOptions = stepResponseOptions[stepIndex] || [];
    setStepResponseOptions((prev) => ({
      ...prev,
      [stepIndex]: [
        ...currentOptions,
        { id: Date.now(), text: '', error: '', target: 'end', targetError: '' },
      ],
    }));
  };

  const handleDeleteResponseOption = (e, optionId, stepIndex) => {
    e.preventDefault();
    const currentOptions = stepResponseOptions[stepIndex] || [];
    if (currentOptions.length > 2) {
      setStepResponseOptions((prev) => ({
        ...prev,
        [stepIndex]: currentOptions.filter((opt) => (opt.uuid || opt.id) !== optionId),
      }));
    }
  };

  const handleStepTitleChange = (e, stepIndex) => {
    const newSteps = steps.map((s, i) =>
      i === stepIndex ? { ...s, title: e.target.value } : s
    );
    setSteps(newSteps);

    if (stepErrors[`title-${stepIndex}`]) {
      setStepErrors((prev) => ({
        ...prev,
        [`title-${stepIndex}`]: '',
      }));
    }
  };

  const handleStepFieldChange = (e, stepIndex, fieldType) => {
    if (stepErrors[`${fieldType}-${stepIndex}`]) {
      setStepErrors((prev) => ({
        ...prev,
        [`${fieldType}-${stepIndex}`]: '',
      }));
    }
  };

  const validateSteps = () => {
    let hasErrors = false;
    const newErrors = {};
    steps.forEach((step, index) => {
      if (step.title?.trim() && !nameRegex.test(step.title)) {
        newErrors[`title-${index}`] =
          'Only Latin and Armenian letters, numbers, and allowed special characters';
        hasErrors = true;
      }
      const questionValue = document.querySelector(`input[name="question-${index}"]`)?.value;
      if (!questionValue?.trim()) {
        newErrors[`question-${index}`] = 'Question is required';
        hasErrors = true;
      }
    });

    const updatedStepResponseOptions = { ...stepResponseOptions };
    steps.forEach((step, stepIndex) => {
      const stepOptions = stepResponseOptions[stepIndex] || [];
      const newStepOptions = stepOptions.map((option) => {
        const error = validateResponseOption(option.text, option.id, stepIndex);
        const targetError = validateResponseTarget(option.target);
        if (error || targetError) {
          hasErrors = true;
        }
        return { ...option, error, targetError };
      });
      updatedStepResponseOptions[stepIndex] = newStepOptions;
    });

    setStepResponseOptions(updatedStepResponseOptions);
    setStepErrors(newErrors);
    return !hasErrors;
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = (data) => {
    if (!validateSteps()) {
      return;
    }

    const stepsArray = steps.map((step, index) => {
      const stepTitle = step.title || `Step ${index + 1}`;
      const questionValue =
        document.querySelector(`input[name="question-${index}"]`)?.value || '';
      const agentNotesValue =
        document.querySelector(`input[name="agentNotes-${index}"]`)?.value || '';

      const stepOptions = stepResponseOptions[index] || [];
      const responseOptions = stepOptions.map((option, optionIndex) => {
        let targetStepId = null;
        if (option.target !== 'end') {
          const targetStepIndex = steps.findIndex(
            (s) => s.id.toString() === option.target.toString()
          );
          targetStepId =
            targetStepIndex !== -1
              ? (targetStepIndex + 1).toString()
              : option.target.toString();
        }

        return {
          optionText: option.text,
          displayOrder: optionIndex + 1,
          actionType: option.target === 'end' ? 'end_script' : 'goto_step',
          targetStepId,
          isEnabled: true,
        };
      });

      return {
        stepTitle,
        question: questionValue,
        agentNotes: agentNotesValue,
        stepOrder: index + 1,
        isEnabled: true,
        responseOptions,
      };
    });

    const body = {
      name: data.name,
      description: data.description,
      script: data.script,
      isEnabled: data.isEnabled,
      steps: stepsArray,
    };

    const action =
      isEdit && initialData?.uuid
        ? editSalesScript({ uuid: initialData.uuid, body })
        : createSalesScript(body);

    dispatch(action)
      .unwrap()
      .then(() => {
        dispatch(getSalesScripts(searchData));
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 500 ? '370px' : '470px');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isModalOpen && isEdit && initialData?.uuid) {
      fetchSalesScriptData(initialData.uuid);
    }
  }, [initialData, isEdit, dispatch, isModalOpen]);

  return (
    <>
      {isEdit ? (
        <ShiftControl onClick={handleOpenModal}>
          <img alt="Edit icon" src={EditIcon} />
        </ShiftControl>
      ) : (
        <BtnWrapper>
          <Button secondary onClick={handleOpenModal} className="h-38">
            + Add Sales Script
          </Button>
        </BtnWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        width={modalWidth}
        onOk={() => {
          validateSteps();
          handleSubmit(onSubmit, scrollToTop)();
        }}
        title={isEdit ? 'Edit Sales Script' : 'Create Sales Script'}
        footer={true}
        maxHeight={'80%'}
        loading={isLoading}
      >
        <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                error={errors.name?.message}
                placeholder="Enter name"
                maxLength={50}
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
                label="Description"
                resizeHorizontal={false}
                error={errors.description?.message}
                placeholder="Enter description"
                maxLength={250}
              />
            )}
          />
          <Controller
            name="script"
            control={control}
            render={({ field }) => (
              <TextEditorWrapper>
                <TextEditor
                  {...field}
                  label="Add script"
                  errorText={errors.script?.message}
                  placeholder="Enter script"
                  maxLength={10000}
                  required
                />
              </TextEditorWrapper>
            )}
          />

          <Controller
            name="isEnabled"
            control={control}
            render={({ field }) => (
              <EnableSwitchContainer>
                <EnableSwitchWrapper>
                  <SwitchLabel>{field.value ? 'Enabled' : 'Disabled'}</SwitchLabel>
                  <Switch isOn={field.value} onToggle={() => field.onChange(!field.value)} />
                </EnableSwitchWrapper>
              </EnableSwitchContainer>
            )}
          />
          <AddStep>
            <Button type="link" onClick={handleAddStep}>
              + Add Step
            </Button>
          </AddStep>
          {steps.map((step, index) => (
            <Step
              key={step.id || step.uuid}
              step={step}
              index={index}
              control={control}
              stepErrors={stepErrors}
              stepResponseOptions={stepResponseOptions}
              steps={steps}
              onDeleteStep={handleDeleteStep}
              onStepTitleChange={handleStepTitleChange}
              onStepFieldChange={handleStepFieldChange}
              onResponseTextChange={handleResponseTextChange}
              onTargetChange={handleTargetChange}
              onAddResponseOption={handleAddResponseOption}
              onDeleteResponseOption={handleDeleteResponseOption}
            />
          ))}
        </Form>
      </Modal>
    </>
  );
};

export default memo(Create);
