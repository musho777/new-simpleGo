import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { checkCustomerExists } from 'features/sales/salesActions';
import {
  selectExistCostumer,
  selectExistCostumerLoading,
  selectExistCostumerSuccess,
  setResetCustomerExistsSuccess,
} from 'features/sales/salesSlice';
import * as Yup from 'yup';

import {
  CustomerInfoLabel,
  CustomerInfoRow,
  CustomerInfoValue,
  ModalActions,
  PhoneNumbersWrapper,
} from './Components.styles';

const schema = Yup.object().shape({
  erpCustomerId: Yup.string()
    .required('ERP Customer ID is required to convert a lead.')
    .matches(/^[0-9]+$/, 'Only digits are allowed')
    .max(20, 'Maximum 20 characters allowed'),
});

const AssignCustomerModal = ({ isOpen, onClose, onApprove }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [customerId, setCustomerId] = useState('');

  const customerExists = useSelector(selectExistCostumer);
  const isLoading = useSelector(selectExistCostumerLoading);
  const success = useSelector(selectExistCostumerSuccess);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      erpCustomerId: '',
    },
    shouldFocusError: false,
  });

  const erpCustomerId = watch('erpCustomerId');

  useEffect(() => {
    if (success) {
      setStep(2);
    }
    return () => {
      dispatch(setResetCustomerExistsSuccess());
    };
  }, [success]);

  const handleFetchCustomer = (data) => {
    setCustomerId(data.erpCustomerId);
    dispatch(checkCustomerExists({ customerId: Number(data.erpCustomerId) }));
  };

  const handleApproveClick = () => {
    handleClose();
    onApprove(customerId);
  };

  const handleDecline = () => {
    handleClose();
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    setCustomerId('');
    reset();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(handleFetchCustomer)();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDecline}
      title={step === 1 ? 'Enter Customer ID' : 'Customer Information'}
      closeIcon
      maxHeight="60%"
      footer={false}
    >
      {step === 1 && (
        <form onSubmit={handleSubmit(handleFetchCustomer)} onKeyDown={handleKeyDown}>
          <Controller
            name="erpCustomerId"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 20) {
                    field.onChange(e);
                  }
                }}
                type="number"
                label="ERP Customer ID"
                placeholder="Enter ERP Customer ID"
                error={errors.erpCustomerId?.message}
                required
                maxLength={20}
              />
            )}
          />
          <ModalActions>
            <Button outlined onClick={handleDecline} type="button">
              Cancel
            </Button>
            <Button
              secondary
              type="submit"
              loading={isLoading}
              disabled={!erpCustomerId?.trim()}
            >
              Submit
            </Button>
          </ModalActions>
        </form>
      )}

      {step === 2 && (
        <div>
          <CustomerInfoRow>
            <CustomerInfoLabel>Customer Name:</CustomerInfoLabel>
            <CustomerInfoValue>{customerExists?.fullName}</CustomerInfoValue>
          </CustomerInfoRow>
          <CustomerInfoRow>
            <CustomerInfoLabel>Phone Numbers:</CustomerInfoLabel>
            <PhoneNumbersWrapper>
              {customerExists?.phoneNumbers && (
                <CustomerInfoValue>{customerExists.phoneNumbers.join(', ')}</CustomerInfoValue>
              )}
            </PhoneNumbersWrapper>
          </CustomerInfoRow>
          <ModalActions>
            <Button outlined onClick={handleDecline} type="button">
              Cancel
            </Button>
            <Button secondary onClick={handleApproveClick} loading={isLoading.checkExists}>
              Submit
            </Button>
          </ModalActions>
        </div>
      )}
    </Modal>
  );
};

export default AssignCustomerModal;
