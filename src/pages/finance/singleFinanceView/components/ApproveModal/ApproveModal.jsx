import React, { useState } from 'react';

import checked from 'assets/finance/checked.svg';
import checkedWhite from 'assets/finance/checked_white.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import {
  AmountInfo,
  AmountText,
  ApproveButton,
  ButtonWrapper,
  Container,
  FormWrapper,
  Header,
  Icon,
  IconButton,
  KeyText,
  Row,
  SwitchText,
  SwitchTitle,
  SwitchWrapper,
  Text,
} from './ApproveModal.styles';

const validationSchema = yup.object().shape({
  approvedAmount: yup.number().when('partialApproval', {
    is: true,
    then: (schema) =>
      schema
        .required('Approved amount is required when partial approval is enabled')
        .positive('Amount is required')
        .max(yup.ref('maxAmount'), 'Approved amount cannot exceed requested amount'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const ApproveModal = ({ isOpen, onClose, onApprove, financeRequest, loading = false }) => {
  const [notes, setNotes] = useState('');
  const [partialApproval, setPartialApproval] = useState(false);
  const [approvedAmount, setApprovedAmount] = useState('');
  const [errors, setErrors] = useState({});

  const handleApprovedAmountChange = (e) => {
    const value = e.target.value;
    setApprovedAmount(value);

    if (value && Number(value) > (financeRequest?.amountRequested || 0)) {
      setErrors((prev) => ({
        ...prev,
        approvedAmount: 'Approved amount cannot exceed requested amount',
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.approvedAmount;
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        notes,
        partialApproval,
        approvedAmount: partialApproval
          ? Number(approvedAmount)
          : financeRequest?.amountRequested,
        maxAmount: financeRequest?.amountRequested,
      };

      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const requestBody = {
        notes,
        partialApproval,
        approvedAmount: partialApproval
          ? Number(approvedAmount)
          : financeRequest?.amountRequested,
        enableSplitting: false,
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
    setNotes('');
    setPartialApproval(false);
    setApprovedAmount('');
    setErrors({});
    onClose();
  };

  const isFormValid =
    notes.trim() !== '' &&
    (!partialApproval || (partialApproval && approvedAmount > 0)) &&
    Object.keys(errors).length === 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} disabled={!isFormValid} width="500px">
      <Container>
        <Header>
          <Icon src={checked} alt="approve" />
          <Text>Approve Finance Request</Text>
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

        <FormWrapper>
          <TextArea
            label="Comment/Note"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter approval notes..."
            required
            resizeHorizontal={false}
            resizeVertical={false}
            error={errors.notes}
            rows={4}
            maxLength={500}
          />

          <SwitchWrapper>
            <Switch
              isOn={partialApproval}
              onToggle={() => setPartialApproval(!partialApproval)}
            />
            <div>
              <SwitchTitle>Partial Approval</SwitchTitle>
              <SwitchText>Approve a different amount</SwitchText>
            </div>
          </SwitchWrapper>

          {partialApproval && (
            <Input
              type="number"
              label="Approved Amount"
              value={approvedAmount}
              onChange={handleApprovedAmountChange}
              placeholder="Enter approved amount"
              min="1"
              max={financeRequest?.amountRequested}
              required
              error={errors.approvedAmount}
            />
          )}
        </FormWrapper>

        {partialApproval && approvedAmount > 0 && (
          <AmountInfo>
            <Row>
              <KeyText>Approved Amount</KeyText>
              <AmountText>{Number(approvedAmount).toFixed(2)} AMD</AmountText>
            </Row>
            <Row>
              <KeyText>Remaining Amount</KeyText>
              <AmountText>
                {((financeRequest?.amountRequested || 0) - Number(approvedAmount)).toFixed(2)}{' '}
                AMD
              </AmountText>
            </Row>
          </AmountInfo>
        )}

        <ButtonWrapper>
          <Button onClick={handleClose} outlined>
            Cancel
          </Button>
          <ApproveButton>
            <Button onClick={handleSubmit} loading={loading}>
              <IconButton src={checkedWhite} alt="approve" />
              Approve Request
            </Button>
          </ApproveButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

ApproveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  financeRequest: PropTypes.object,
};

export default ApproveModal;
