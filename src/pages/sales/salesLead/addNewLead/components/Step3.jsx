import { Controller } from 'react-hook-form';

import Button from 'common-ui/button';
import Input from 'common-ui/input';

import { AddressWrapper, InputWrapper, Row } from '../addNewLead.styles';

const Step3 = ({ control, errors, handleBack, handleSubmit, handleNext }) => {
  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Controller
          name="region"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Region"
                error={errors.region?.message}
                placeholder="Write region"
                maxLength={50}
                required
              />
            </InputWrapper>
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="City"
                error={errors.city?.message}
                placeholder="Write city"
                maxLength={50}
                required
              />
            </InputWrapper>
          )}
        />
      </Row>
      <AddressWrapper>
        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Street"
                error={errors.street?.message}
                placeholder="Write street"
                maxLength={50}
                required
                padding={'0 16px'}
                $width={'100%'}
              />
            </InputWrapper>
          )}
        />
        <Controller
          name="building"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Building"
                error={errors.building?.message}
                placeholder="00"
                maxLength={50}
                padding={'0 16px'}
                $width={'100%'}
              />
            </InputWrapper>
          )}
        />
        <Controller
          name="house"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="House/Apt"
                error={errors.house?.message}
                placeholder="00"
                maxLength={50}
                required
                padding={'0 16px'}
                $width={'100%'}
              />
            </InputWrapper>
          )}
        />
      </AddressWrapper>
      <Row>
        <Button outlined onClick={handleBack}>
          Back
        </Button>
        <Button secondary type="button" onClick={handleSubmit(handleNext)}>
          Next
        </Button>
      </Row>
    </>
  );
};

export default Step3;
