import { Controller } from 'react-hook-form';

import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { AsyncSelect, Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import TextArea from 'common-ui/textArea';
import { DIRECTION_TYPE } from 'constants/constants';
import MyPhoneInput from 'pages/components/myPhoneInput';

import { InputWrapper, Row, SelectWrapper, SwitchWrapper } from '../addNewLead.styles';

const Step2B2B = ({
  control,
  errors,
  handleBack,
  handleSubmit,
  handleNext,
  handleGetWorkflowStatuses,
  handleLoadMoreWorkflowStatuses,
  workflowOptions,
  handleGetLeadSources,
  handleLoadMoreLeadSources,
  leadSourceOptions,
  isEdit,
}) => {
  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Input
              {...field}
              label="Name"
              error={errors.name?.message}
              placeholder="Armenian or Latin letters"
              maxLength={50}
              required
            />
          </InputWrapper>
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
            placeholder="Describe offer"
            maxLength={250}
            required
          />
        )}
      />
      <Controller
        name="webAddress"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Input
              {...field}
              label="Web Address"
              type="url"
              error={errors.webAddress?.message}
              placeholder="URL validation"
            />
          </InputWrapper>
        )}
      />
      {isEdit && (
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <MyPhoneInput
                value={field.value?.value || ''}
                error={errors.phone?.value?.message || errors.phone?.message}
                onChange={(phone) => {
                  field.onChange({ ...field.value, value: phone });
                }}
                label="Phone Number"
                required
              />
            </InputWrapper>
          )}
        />
      )}
      <Row>
        <Controller
          name="leadStatus"
          control={control}
          render={({ field }) => {
            return (
              <AsyncSelect
                {...field}
                placeholder="Lead Status"
                label="Lead Status"
                $error={errors.leadStatus?.message}
                loadOptions={(e) => handleGetWorkflowStatuses(1, true, e)}
                onMenuOpen={() => handleGetWorkflowStatuses(1, true)}
                onMenuScrollToBottom={handleLoadMoreWorkflowStatuses}
                req
                defaultOptions={workflowOptions}
              />
            );
          }}
        />
        <Controller
          name="source"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              placeholder="Select source"
              label="Source"
              $error={errors.source?.message}
              req
              loadOptions={(e) => handleGetLeadSources(1, true, e)}
              onMenuOpen={() => handleGetLeadSources(1, true)}
              onMenuScrollToBottom={handleLoadMoreLeadSources}
              defaultOptions={leadSourceOptions}
            />
          )}
        />
      </Row>
      <Row>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <SelectWrapper>
              <Select
                {...field}
                label="Type"
                isSearchable={false}
                $error={errors.type?.message}
                placeholder="Select type"
                maxLength={50}
                options={DIRECTION_TYPE}
                req
              />
            </SelectWrapper>
          )}
        />
        <Controller
          name="numberOfEmployees"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                type="number"
                label="Number of Employees"
                error={errors.numberOfEmployees?.message}
                placeholder="Max 20 characters"
                onInput={(e) => {
                  if (e.target.value.length > 20) {
                    e.target.value = e.target.value.slice(0, 20);
                  }
                }}
              />
            </InputWrapper>
          )}
        />
      </Row>
      <Controller
        name="disabled"
        control={control}
        render={({ field }) => (
          <SwitchWrapper>
            <Switch isOn={!field.value} onToggle={() => field.onChange(!field.value)} />
            {field.value ? 'Disabled' : 'Enabled'}
          </SwitchWrapper>
        )}
      />
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

export default Step2B2B;
