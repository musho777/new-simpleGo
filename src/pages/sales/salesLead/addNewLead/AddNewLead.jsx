import { useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Modal from 'common-ui/modal';
import { DIRECTION_TYPE, LEAD_STATE, LEAD_TYPE } from 'constants/constants';
import {
  createLeadB2B,
  createLeadB2C,
  getLeadSources,
  getWorkflowStatuses,
  updateLeadB2BDetails,
  updateLeadB2CDetails,
} from 'features/sales/salesActions';
import {
  selectCreateLeadB2BLoading,
  selectCreateLeadB2CLoading,
  selectLeadSources,
  selectUpdateLeadB2BLoading,
  selectUpdateLeadB2CLoading,
} from 'features/sales/salesSlice';
import { generateOptions } from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import { Form } from './addNewLead.styles';
import Step1 from './components/Step1';
import Step2B2B from './components/Step2B2B';
import Step2B2C from './components/Step2B2C';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import { getStep2Schema, step1Schema, step3Schema, step4Schema } from './schema';

const AddNewLead = ({
  isModalOpen,
  isEdit,
  lead,
  onClose,
  currentStatus,
  phone,
  handleClose,
}) => {
  const createLeadB2BLoading = useSelector(selectCreateLeadB2BLoading);
  const createLeadB2CLoading = useSelector(selectCreateLeadB2CLoading);

  const updateLeadB2BLoading = useSelector(selectUpdateLeadB2BLoading);

  const updateLeadB2CLoading = useSelector(selectUpdateLeadB2CLoading);

  const [selectedType, setSelectedType] = useState();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const prevLeadTypeRef = useRef();

  const [workflowStatusPage, setWorkflowStatusPage] = useState(1);
  const [leadSourcesPage, setLeadSourcesPage] = useState(1);
  const [hasMoreWorkflowStatuses, setHasMoreWorkflowStatuses] = useState(true);
  const [hasMoreLeadSources, setHasMoreLeadSources] = useState(true);
  const [workflowOptions, setWorkflowOptions] = useState([]);
  const [leadSourceOptions, setLeadSourceOptions] = useState([]);
  const currentSchema =
    step === 1
      ? step1Schema
      : step === 2
        ? getStep2Schema(selectedType?.value, isEdit)
        : step === 3
          ? step3Schema
          : step4Schema;

  const { leadSources } = useSelector(selectLeadSources);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(currentSchema),
    defaultValues: {
      name: '',
      webAddress: '',
      region: '',
      city: '',
      street: '',
      building: '',
      house: '',
      lastName: '',
      numberOfEmployees: '',
    },
    shouldFocusError: false,
  });
  const onSubmit = (data) => {
    const commonData = {
      phoneNumber: data.phone?.value || phone,
      leadStatusId: data.leadStatus?.value,
      sourceId: data.source?.value,
      type: data.type.value,
      region: data.region,
      city: data.city,
      street: data.street,
      house: data.house,
      building: data.building,
      competitor: data.competitor || '',
      tariff: data.tariff,
      includedServices: data.services,
      contractEndDate: formatDateTime(data.contractEndDate, true),
      contactDate: formatDateTime(data.contactDate, true),
      nextContactDate: formatDateTime(data.nextContactDate, true),
    };

    const isB2B = selectedLeadType.value === 'B2B';

    const handleDispatch = (action) => {
      dispatch(action)
        .unwrap?.()
        .then(() => {
          handleClose();
        })
        .catch((err) => {
          console.error('Submit error:', err);
        });
    };

    if (isEdit) {
      if (isB2B) {
        handleDispatch(
          updateLeadB2BDetails({
            leadId: lead.uuid,
            data: {
              ...commonData,
              companyName: data.name,
              description: data.description,
              webAddress: data.webAddress,
              numberOfEmployees: data.numberOfEmployees,
            },
          })
        );
      } else {
        handleDispatch(
          updateLeadB2CDetails({
            leadId: lead.uuid,
            data: {
              ...commonData,
              firstName: data.name,
              lastName: data.lastName,
              patronymic: data.patronymic,
              state: data.state?.value,
            },
          })
        );
      }
    } else {
      if (isB2B) {
        handleDispatch(
          createLeadB2B({
            ...commonData,
            companyName: data.name,
            description: data.description,
            webAddress: data.webAddress,
            numberOfEmployees: data.numberOfEmployees,
          })
        );
      } else {
        handleDispatch(
          createLeadB2C({
            ...commonData,
            firstName: data.name,
            lastName: data.lastName,
            patronymic: data.patronymic,
            state: data.state?.value,
          })
        );
      }
    }
  };
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleGetWorkflowStatuses = async (page = 1, reset = false, search = '') => {
    try {
      const params = { page, limit: 10, status: 'enabled' };
      params.search = search;

      const response = await dispatch(getWorkflowStatuses(params)).unwrap();
      const newOptions = generateOptions(response.workflowStatuses || []);
      if (reset) {
        setWorkflowOptions(newOptions);
        setWorkflowStatusPage(1);
      } else {
        setWorkflowOptions((prev) => [...prev, ...newOptions]);
      }

      setHasMoreWorkflowStatuses(
        response.workflowStatuses?.length === 10 && response.total > page * 10
      );

      if (!reset) setWorkflowStatusPage(page);

      return newOptions;
    } catch (error) {
      return [];
    }
  };
  const handleGetLeadSources = async (page = 1, reset = false, search = '') => {
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;

      const response = await dispatch(getLeadSources(params)).unwrap();
      const newOptions = generateOptions(response.leadSources || []);

      if (reset) {
        setLeadSourceOptions(newOptions);
        setLeadSourcesPage(1);
      } else {
        setLeadSourceOptions((prev) => [...prev, ...newOptions]);
      }

      setHasMoreLeadSources(response.leadSources?.length === 10 && response.total > page * 10);

      if (!reset) setLeadSourcesPage(page);

      return newOptions;
    } catch (error) {
      return [];
    }
  };

  const handleLoadMoreWorkflowStatuses = () => {
    if (hasMoreWorkflowStatuses) {
      handleGetWorkflowStatuses(workflowStatusPage + 1);
    }
  };

  const handleLoadMoreLeadSources = () => {
    if (hasMoreLeadSources) {
      handleGetLeadSources(leadSourcesPage + 1);
    }
  };

  const selectedLeadType = watch('leadType');
  const leadTypeValue = selectedLeadType?.value;

  useEffect(() => {
    const currentFormData = watch();
    if (selectedLeadType?.value !== lead?.leadType) {
      reset({
        ...currentFormData,
        name: '',
        lastName: '',
      });
    } else {
      reset({
        ...currentFormData,
        name: '',
      });
    }
    prevLeadTypeRef.current = selectedLeadType?.value;
  }, [selectedLeadType?.value, isEdit]);

  useEffect(() => {
    if (isEdit) {
      const leadType = LEAD_TYPE.find((elm) => elm?.value === lead?.leadType);
      const leadState = LEAD_STATE.find((elm) => elm?.value === lead?.state);
      setSelectedType(leadType);
      reset({
        leadType: leadType,
        name: lead.companyName || lead.firstName,
        lastName: lead.lastName,
        patronymic: lead?.patronymic,
        leadStatus: {
          value: currentStatus.uuid,
          label: currentStatus.name,
        },
        source: {
          value: lead.leadSource.uuid,
          label: lead.leadSource.name,
        },
        type: DIRECTION_TYPE.find((elm) => elm?.value === lead.type),
        description: lead.description,
        webAddress: lead.webAddress || '',
        numberOfEmployees: lead.numberOfEmployees,
        city: lead.city,
        region: lead.region,
        street: lead.street,
        state: leadState,
        building: lead.building,
        house: lead?.house,
        phone: phone ? { value: phone } : undefined,
        competitor: lead.competitor || '',
        tariff: lead.tariff,
        services: lead.includedServices,
        contractEndDate: formatDateTime(lead.contractEndDate, true),
        contactDate: formatDateTime(lead.contactDate, true),
        nextContactDate: formatDateTime(lead.nextContactDate, true),
      });
    }
  }, [lead, isEdit, leadSources]);

  useEffect(() => {
    if (!isModalOpen) {
      reset();
      setStep(1);
      setSelectedType(undefined);
      setWorkflowStatusPage(1);
      setLeadSourcesPage(1);
      setHasMoreWorkflowStatuses(true);
      setHasMoreLeadSources(true);
      setWorkflowOptions([]);
      setLeadSourceOptions([]);
    } else {
      handleGetWorkflowStatuses(1, true);
      handleGetLeadSources(1, true);
    }
  }, [isModalOpen]);

  return (
    <Modal
      closeIcon={true}
      isOpen={isModalOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Lead' : 'Add New Lead'}
      maxHeight={'80%'}
      className="your-custom-class"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <Step1
            control={control}
            setSelectedType={setSelectedType}
            errors={errors}
            onClose={onClose}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        )}
        {step === 2 &&
          (leadTypeValue === 'B2C' ? (
            <Step2B2C
              control={control}
              errors={errors}
              handleBack={handleBack}
              handleSubmit={handleSubmit}
              handleNext={handleNext}
              handleGetWorkflowStatuses={handleGetWorkflowStatuses}
              handleLoadMoreWorkflowStatuses={handleLoadMoreWorkflowStatuses}
              workflowOptions={workflowOptions}
              handleGetLeadSources={handleGetLeadSources}
              handleLoadMoreLeadSources={handleLoadMoreLeadSources}
              leadSourceOptions={leadSourceOptions}
              isEdit={isEdit}
            />
          ) : (
            <Step2B2B
              control={control}
              errors={errors}
              handleBack={handleBack}
              handleSubmit={handleSubmit}
              handleNext={handleNext}
              handleGetWorkflowStatuses={handleGetWorkflowStatuses}
              handleLoadMoreWorkflowStatuses={handleLoadMoreWorkflowStatuses}
              workflowOptions={workflowOptions}
              handleGetLeadSources={handleGetLeadSources}
              handleLoadMoreLeadSources={handleLoadMoreLeadSources}
              leadSourceOptions={leadSourceOptions}
              isEdit={isEdit}
            />
          ))}
        {step === 3 && (
          <Step3
            control={control}
            errors={errors}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
          />
        )}
        {step === 4 && (
          <Step4
            control={control}
            errors={errors}
            handleBack={handleBack}
            createLeadB2BLoading={createLeadB2BLoading}
            createLeadB2CLoading={createLeadB2CLoading}
            updateLeadB2BLoading={updateLeadB2BLoading}
            updateLeadB2CLoading={updateLeadB2CLoading}
          />
        )}
      </Form>
    </Modal>
  );
};

export default AddNewLead;
