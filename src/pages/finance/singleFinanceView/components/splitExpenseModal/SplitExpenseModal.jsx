import React, { useEffect, useState } from 'react';

import split from 'assets/finance/split.svg';
import splitWhite from 'assets/finance/split_white.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Switch from 'common-ui/switch';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { formatDateTime } from 'utils/dateUtils';
import * as yup from 'yup';

import {
  AmountInfo,
  AmountText,
  ButtonWrapper,
  Container,
  FormWrapper,
  Header,
  Icon,
  InputWrapper,
  KeyText,
  MonthlyAmount,
  MonthlyAmountText,
  Row,
  SplitButton,
  SwitchWrapper,
  Text,
} from './SplitExpenseModal.styles';

const validationSchema = yup.object().shape({
  splitMonths: yup
    .number()
    .required('Number of months is required')
    .min(2, 'Must be at least 2 month')
    .max(60, 'Cannot exceed 60 months')
    .integer('Must be a whole number'),
});

const SplitExpenseModal = ({ isOpen, onClose, onApprove, financeRequest, loading }) => {
  const [splitMonths, setSplitMonths] = useState('');
  const [customSplits, setCustomSplits] = useState([]);
  const [isUnevenSplit, setIsUnevenSplit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (splitMonths && parseInt(splitMonths) >= 2) {
      const numMonths = parseInt(splitMonths);
      const totalAmount = financeRequest?.amountRequested || 0;

      if (isUnevenSplit) {
        const newSplits = Array.from({ length: numMonths }, () => ({
          amount: '',
          paymentDate: '',
        }));
        setCustomSplits(newSplits);
      } else {
        const baseAmount = Math.floor((totalAmount / numMonths) * 100) / 100;
        const newSplits = Array.from({ length: numMonths }, (_, index) => {
          let amount;
          if (index === numMonths - 1) {
            const sumOfPrevious = baseAmount * (numMonths - 1);
            amount = (totalAmount - sumOfPrevious).toFixed(2);
          } else {
            amount = baseAmount.toFixed(2);
          }

          return {
            amount: amount,
            paymentDate: '',
          };
        });
        setCustomSplits(newSplits);
      }
    } else {
      setCustomSplits([]);
    }
  }, [splitMonths, financeRequest?.amountRequested, isUnevenSplit]);

  const updateSplitAmount = (index, amount) => {
    const newSplits = [...customSplits];
    const totalAmount = financeRequest?.amountRequested || 0;

    newSplits[index].amount = amount;
    const newTotal = Number(
      newSplits.reduce((sum, split) => sum + (Number(split.amount) || 0), 0).toFixed(2)
    );

    if (newTotal <= totalAmount) {
      setCustomSplits(newSplits);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.totalAmount;
        return newErrors;
      });
    } else {
      setErrors((prev) => ({
        ...prev,
        totalAmount: `Total split amount cannot exceed ${totalAmount} AMD`,
      }));
    }
  };

  const updateSplitPaymentDate = (index, date) => {
    const newSplits = [...customSplits];
    newSplits[index].paymentDate = date;

    if (date) {
      for (let i = index + 1; i < newSplits.length; i++) {
        if (
          newSplits[i].paymentDate &&
          dayjs(newSplits[i].paymentDate).isBefore(dayjs(date))
        ) {
          newSplits[i].paymentDate = '';
        }
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`paymentDate_${index}`];
        return newErrors;
      });
    }

    setCustomSplits(newSplits);
  };

  const getOrdinalSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return num + 'st';
    if (j === 2 && k !== 12) return num + 'nd';
    if (j === 3 && k !== 13) return num + 'rd';
    return num + 'th';
  };

  const handleSubmit = async () => {
    try {
      const formData = { splitMonths: Number(splitMonths) };
      await validationSchema.validate(formData, { abortEarly: false });

      const splitErrors = {};
      const totalAmount = financeRequest?.amountRequested || 0;
      const currentTotalSplits = Number(
        customSplits.reduce((sum, split) => sum + (Number(split.amount) || 0), 0).toFixed(2)
      );

      if (currentTotalSplits > totalAmount) {
        splitErrors['totalAmount'] =
          `Total split amount (${currentTotalSplits} AMD) cannot exceed the original amount (${totalAmount} AMD)`;
      }

      customSplits.forEach((split, index) => {
        if (split.amount === '' || !split.amount || split.amount <= 0) {
          splitErrors[`amount_${index}`] = 'Amount is required and must be greater than 0';
        }
        if (!split.paymentDate) {
          splitErrors[`paymentDate_${index}`] = 'Payment date is required';
        }

        if (split.paymentDate && index > 0 && customSplits[index - 1]?.paymentDate) {
          const currentDate = dayjs(split.paymentDate);
          const previousDate = dayjs(customSplits[index - 1].paymentDate);
          if (currentDate.isBefore(previousDate)) {
            splitErrors[`paymentDate_${index}`] =
              'Payment date must be after the previous payment date';
          }
        }
      });

      if (Object.keys(splitErrors).length > 0) {
        setErrors(splitErrors);
        return;
      }

      setErrors({});

      const formattedSplits = customSplits.map((split) => ({
        dueDate: formatDateTime(split.paymentDate, true),
        amount: Number(split.amount),
      }));
      const requestBody = {
        partialApproval: true,
        approvedAmount: financeRequest?.amountRequested,
        enableSplitting: true,
        splitConfig: {
          splitMode: 'custom',
          splitMonths: parseInt(splitMonths),
          customSplits: formattedSplits,
        },
        dueDate: formattedSplits[formattedSplits.length - 1]?.dueDate || '',
      };

      onApprove(requestBody);
    } catch (validationErrors) {
      const errorMap = {};
      validationErrors.inner.forEach((error) => {
        errorMap[error.path] = error.message;
      });
      setErrors(errorMap);
    }
  };

  const handleClose = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSplitMonths('');
    setCustomSplits([]);
    setIsUnevenSplit(false);
    setErrors({});
    onClose();
  };

  const isFormValid =
    splitMonths > 0 &&
    customSplits.length > 0 &&
    customSplits.every(
      (split) => split.amount !== '' && split.amount > 0 && split.paymentDate
    ) &&
    Object.keys(errors).length === 0;

  return (
    <Modal
      maxHeight={'90%'}
      onClose={onClose}
      isOpen={isOpen}
      disabled={!isFormValid}
      width="500px"
    >
      <Container>
        <Header>
          <Icon src={split} alt="split" />
          <Text>Split Expense Across Months</Text>
        </Header>
        <AmountInfo>
          <Row>
            <KeyText>Total Amount</KeyText>
            <AmountText>{financeRequest?.amountRequested} AMD</AmountText>
          </Row>
          <Row>
            <KeyText>Ticket:</KeyText>
            <KeyText>{financeRequest?.id}</KeyText>
          </Row>
        </AmountInfo>
        <SwitchWrapper>
          <Switch isOn={isUnevenSplit} onToggle={() => setIsUnevenSplit(!isUnevenSplit)} />
          <KeyText>Uneven Split</KeyText>
        </SwitchWrapper>

        <FormWrapper>
          <Input
            type="number"
            label="Number of Months"
            value={splitMonths}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (e.target.value === '' || (!isNaN(value) && value >= 1 && value <= 100)) {
                setSplitMonths(e.target.value);

                // Validate immediately for min value
                if (e.target.value !== '' && value < 2) {
                  setErrors((prev) => ({ ...prev, splitMonths: 'Must be at least 2 month' }));
                } else {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.splitMonths;
                    return newErrors;
                  });
                }
              }
            }}
            placeholder="Enter number of months"
            min="1"
            max="100"
            required
            error={errors.splitMonths}
          />

          {customSplits.map((split, index) => (
            <Row
              key={index}
              style={{ marginTop: '16px', gap: '12px', alignItems: 'flex-start' }}
            >
              <InputWrapper>
                <Input
                  type="number"
                  label={`${getOrdinalSuffix(index + 1)} Split Amount`}
                  value={split.amount}
                  style={{ height: '38px' }}
                  onChange={(e) => {
                    const value = e.target.value === '' ? '' : Number(e.target.value);
                    updateSplitAmount(index, value);
                  }}
                  placeholder={`${getOrdinalSuffix(index + 1)} Split`}
                  min="0"
                  required
                  disabled={!isUnevenSplit}
                  error={errors[`amount_${index}`]}
                />
              </InputWrapper>
              <InputWrapper disabled={index > 0 && !customSplits[index - 1]?.paymentDate}>
                <CustomDatePicker
                  label={`${getOrdinalSuffix(index + 1)} Payment Date`}
                  value={split.paymentDate}
                  onChange={(date) => updateSplitPaymentDate(index, date)}
                  required
                  error={errors[`paymentDate_${index}`]}
                  disabled={index > 0 && !customSplits[index - 1]?.paymentDate}
                  minDate={
                    index === 0
                      ? dayjs()
                      : customSplits[index - 1]?.paymentDate
                        ? dayjs(customSplits[index - 1].paymentDate).add(1, 'day') // остальные только после предыдущей даты
                        : dayjs()
                  }
                />
              </InputWrapper>
            </Row>
          ))}
        </FormWrapper>
        {customSplits.length > 0 && (
          <AmountInfo>
            <Row>
              <MonthlyAmount>Total Split Amount</MonthlyAmount>
              <AmountText>
                {Number(
                  customSplits.reduce((sum, split) => sum + (Number(split.amount) || 0), 0)
                ).toFixed(2)}{' '}
                AMD
              </AmountText>
            </Row>
            <Row>
              <MonthlyAmount>Remaining Amount</MonthlyAmount>
              <AmountText>
                {Math.abs(
                  Number(
                    financeRequest?.amountRequested -
                      customSplits.reduce((sum, split) => sum + (Number(split.amount) || 0), 0)
                  ).toFixed(2)
                )}{' '}
                AMD
              </AmountText>
            </Row>
            <Row>
              <MonthlyAmountText>
                This will create {customSplits.length} separate approved tickets with custom
                amounts and dates
              </MonthlyAmountText>
            </Row>
            {errors.totalAmount && (
              <Row>
                <MonthlyAmountText style={{ color: '#ff4d4f' }}>
                  {errors.totalAmount}
                </MonthlyAmountText>
              </Row>
            )}
          </AmountInfo>
        )}
        <ButtonWrapper>
          <Button onClick={handleClose} outlined>
            Cancel
          </Button>
          <SplitButton>
            <Button onClick={handleSubmit} loading={loading}>
              <Icon src={splitWhite} alt="split" />
              Split Expense
            </Button>
          </SplitButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

SplitExpenseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  financeRequest: PropTypes.object,
};

export default SplitExpenseModal;
