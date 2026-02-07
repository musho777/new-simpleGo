import React, { useState } from 'react';

import doneWhite from 'assets/finance/checked_white.svg';
import done from 'assets/finance/mark_as_done.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import DragDropUploadFile from 'common-ui/dragDropUploadFile';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import {
  AmountInfo,
  AmountText,
  ButtonWrapper,
  Container,
  DoneButton,
  FormWrapper,
  Header,
  Icon,
  IconButton,
  KeyText,
  Label,
  Text,
} from './MarkAsDoneModal.styles';

const createValidationSchema = (approvedAmount) =>
  yup.object().shape({
    actualAmountProvided: yup
      .number()
      .typeError('Actual amount is required')
      .required('Actual amount is required')
      .positive('Amount must be positive')
      .max(approvedAmount, `Actual amount cannot exceed approved amount of ${approvedAmount}`),
    paymentDate: yup.string().required('Payment date is required'),
  });

const MarkAsDoneModal = ({
  isOpen,
  onClose,
  onMarkAsDone,
  financeRequest,
  loading = false,
}) => {
  const [actualAmountProvided, setActualAmountProvided] = useState(
    financeRequest?.amountProvided || ''
  );
  const [paymentDate, setPaymentDate] = useState('');
  const [transactionReference, setTransactionReference] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const handleDateChange = (dateValue) => {
    if (errors.paymentDate) {
      setErrors((prev) => ({ ...prev, paymentDate: '' }));
    }
    if (dateValue) {
      const formattedDate = dayjs(dateValue).format('YYYY-MM-DD');
      setPaymentDate(formattedDate);
    } else {
      setPaymentDate('');
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        actualAmountProvided,
        paymentDate,
        transactionReference,
        notes,
      };

      const validationSchema = createValidationSchema(financeRequest?.amountProvided || 0);
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const requestBody = new FormData();
      requestBody.append('actualAmountProvided', Number(actualAmountProvided));
      requestBody.append('paymentDate', paymentDate);
      requestBody.append('transactionReference', transactionReference);

      files.forEach((file) => {
        requestBody.append('files', file);
      });

      onMarkAsDone(requestBody);
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
    setActualAmountProvided(financeRequest?.amountProvided || '');
    setPaymentDate('');
    setTransactionReference('');
    setNotes('');
    setFiles([]);
    setErrors({});
    onClose();
  };

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  const isFormValid =
    actualAmountProvided > 0 &&
    paymentDate.trim() !== '' &&
    transactionReference.trim() !== '' &&
    notes.trim() !== '' &&
    Object.keys(errors).length === 0;
  return (
    <Modal
      maxHeight={'90%'}
      isOpen={isOpen}
      onClose={handleClose}
      disabled={!isFormValid}
      width="500px"
    >
      <Container>
        <Header>
          <Icon src={done} alt="done" />
          <Text>Mark as Done</Text>
        </Header>

        <AmountInfo>
          <KeyText>Mark as done</KeyText>
          <AmountText>{financeRequest?.amountProvided} AMD</AmountText>
        </AmountInfo>

        <FormWrapper>
          <Input
            type="number"
            label="Actual Amount Provided"
            value={actualAmountProvided}
            onChange={(e) => {
              const value = e.target.value;
              setActualAmountProvided(value);
              if (value && !isNaN(value)) {
                const numValue = Number(value);
                const approvedAmount = financeRequest?.amountProvided || 0;

                if (numValue > approvedAmount) {
                  setErrors((prev) => ({
                    ...prev,
                    actualAmountProvided: `Actual amount cannot exceed approved amount of ${approvedAmount}`,
                  }));
                } else if (errors.actualAmountProvided) {
                  setErrors((prev) => ({ ...prev, actualAmountProvided: '' }));
                }
              } else if (errors.actualAmountProvided) {
                setErrors((prev) => ({ ...prev, actualAmountProvided: '' }));
              }
            }}
            placeholder="Enter actual amount"
            min="1"
            required
            error={errors.actualAmountProvided || undefined}
          />
          <CustomDatePicker
            label="Payment Date"
            value={paymentDate}
            onChange={handleDateChange}
            height={44}
            error={errors.paymentDate}
            required
          />
          <Input
            type="text"
            label="Transaction Reference"
            value={transactionReference}
            onChange={(e) => {
              if (errors.transactionReference) {
                setErrors((prev) => ({ ...prev, transactionReference: '' }));
              }
              setTransactionReference(e.target.value);
            }}
            placeholder="Enter transaction reference"
            error={errors.transactionReference}
          />

          <div>
            <Label>Invoice Attachment</Label>
            <DragDropUploadFile
              onFilesChange={handleFilesChange}
              isMulti={false}
              maxFiles={15}
              uploadDescription="PDF,PNG,JPG,DOC (Max 10MB)"
              clickTitle="Upload Invoice"
              uploadTitle="or drag and drop"
            />
          </div>
        </FormWrapper>

        <ButtonWrapper>
          <Button onClick={handleClose} outlined>
            Cancel
          </Button>
          <DoneButton>
            <Button onClick={handleSubmit} loading={loading}>
              <IconButton src={doneWhite} alt="done" />
              Mark as Done
            </Button>
          </DoneButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

MarkAsDoneModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMarkAsDone: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  financeRequest: PropTypes.object,
};

export default MarkAsDoneModal;
