import { Controller } from 'react-hook-form';

import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { AsyncSelect, Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import { DIRECTION_TYPE, LEAD_STATE } from 'constants/constants';
import MyPhoneInput from 'pages/components/myPhoneInput';

import { InputWrapper, Row, SelectWrapper, SwitchWrapper } from '../addNewLead.styles';

const Step2B2C = ({
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
      <Row>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Name"
                error={errors.name?.message}
                placeholder="First name"
                maxLength={50}
                required
              />
            </InputWrapper>
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <InputWrapper>
              <Input
                {...field}
                label="Last name"
                error={errors.lastName?.message}
                placeholder="Last name"
                maxLength={50}
                required
              />
            </InputWrapper>
          )}
        />
      </Row>
      <Controller
        name="patronymic"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Input
              {...field}
              label="Patronymic"
              error={errors.patronymic?.message}
              placeholder="Patronymic"
              maxLength={50}
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
                $error={errors.leadStatus?.message}
                label="Lead Status"
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
          name="state"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="State"
              isSearchable={false}
              $error={errors.state?.message}
              options={LEAD_STATE}
              placeholder="Select"
              menuPlacement="top"
              maxLength={50}
              req
            />
          )}
        />
      </Row>
      <Controller
        name="disabled"
        control={control}
        render={({ field }) => (
          <SwitchWrapper>
            <Switch isOn={!field.value} onToggle={() => field.onChange(!field.value)} />
            {field?.value ? 'Disabled' : 'Enabled'}
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

export default Step2B2C;
