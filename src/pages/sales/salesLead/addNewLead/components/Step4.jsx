import { Controller } from 'react-hook-form';

import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import TextArea from 'common-ui/textArea';

import { Date, Row } from '../addNewLead.styles';

const Step4 = ({
  control,
  errors,
  handleBack,
  createLeadB2BLoading,
  createLeadB2CLoading,
  updateLeadB2BLoading,
  updateLeadB2CLoading,
}) => {
  return (
    <>
      <Controller
        name="competitor"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            label="Competitor"
            error={errors.name?.message}
            resizeHorizontal={false}
            placeholder="Armenian or Latin letters"
            maxLength={250}
          />
        )}
      />
      <Controller
        name="tariff"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            label="Tariff"
            error={errors.name?.message}
            resizeHorizontal={false}
            placeholder="Armenian or Latin letters"
            maxLength={250}
          />
        )}
      />
      <Controller
        name="services"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            label="Included Services"
            error={errors.name?.message}
            resizeHorizontal={false}
            placeholder="Armenian or Latin letters"
            maxLength={50}
          />
        )}
      />
      <Date>
        <Controller
          name="contractEndDate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              clearable={false}
              label="Contract End Date"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          name="contactDate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              clearable={false}
              label="Contact Date"
              error={errors.name?.message}
            />
          )}
        />
      </Date>
      <Date>
        <Controller
          name="nextContactDate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              clearable={false}
              label="Next Contact Date"
              error={errors.name?.message}
            />
          )}
        />
      </Date>
      <Row>
        <Button outlined onClick={handleBack}>
          Back
        </Button>
        <Button
          loading={
            createLeadB2BLoading ||
            createLeadB2CLoading ||
            updateLeadB2BLoading ||
            updateLeadB2CLoading
          }
          secondary
          type="button"
        >
          Next/skip
        </Button>
      </Row>
    </>
  );
};

export default Step4;
