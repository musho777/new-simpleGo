import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';

import Lock from '../../assets/lock.svg';
import {
  Icon,
  SecurityButtonWrapper,
  SecurityLabel,
  SecurityWrapper,
} from './SecurityModal.styles';

const SecurityModal = ({
  isOpen,
  onClose,
  securityValue,
  handleSecurityValueChange,
  handleClickCheckSecurityValue,
  loading,
  error,
  onCancel,
}) => {
  return (
    <Modal width="327px" isOpen={isOpen} onClose={onClose} closeIcon>
      <SecurityWrapper>
        <Icon src={Lock} alt="Lock Icon" />
        <SecurityLabel>Please fill in the security code to proceed.</SecurityLabel>
      </SecurityWrapper>
      <Input
        value={securityValue}
        error={error}
        onChange={handleSecurityValueChange}
        placeholder="Enter security code"
        aria-label="Security Code"
        disabled={loading}
      />
      <SecurityButtonWrapper>
        <Button outlined onClick={onCancel}>
          Cancel
        </Button>
        <Button secondary onClick={handleClickCheckSecurityValue}>
          Submit
        </Button>
      </SecurityButtonWrapper>
    </Modal>
  );
};

export default SecurityModal;
