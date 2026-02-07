import { Controller } from 'react-hook-form';

import Button from 'common-ui/button';
import { Select } from 'common-ui/select';
import { LEAD_TYPE } from 'constants/constants';

import { ButtonWrapper } from '../addNewLead.styles';

const Step1 = ({ control, errors, onClose, handleSubmit, handleNext, setSelectedType }) => {
  const handleLeadTypeChange = (e, field) => {
    setSelectedType(e);
    field.onChange(e);
  };

  const renderLeadTypeSelect = ({ field }) => (
    <Select
      {...field}
      label="Select and continue"
      $error={errors.leadType?.message}
      options={LEAD_TYPE}
      onChange={(e) => handleLeadTypeChange(e, field)}
      placeholder="Select"
      menuPlacement="bottom"
      maxLength={50}
      required
    />
  );

  return (
    <>
      <Controller name="leadType" control={control} render={renderLeadTypeSelect} />
      <ButtonWrapper>
        <Button outlined onClick={onClose}>
          Cancel
        </Button>
        <Button secondary type="button" onClick={handleSubmit(handleNext)}>
          Next
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default Step1;
