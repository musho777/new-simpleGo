import { memo, useEffect, useState } from 'react';

import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import Trash from 'assets/profile/trash.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import MyRadioGroup from 'common-ui/radioGroup';
import { AsyncSelect } from 'common-ui/select';
import Select from 'common-ui/select/Select';
import { CURRENCY, SALARY_TYPE } from 'constants/constants';
import dayjs from 'dayjs';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  assignNewSchedule,
  assignSchedule,
  editAssignedSchedule,
} from 'features/profile/profileActions';
import { ErrorForInputs } from 'pages/settings/schedules/Schedules.styles';
import { generateOptions } from 'utils';

import {
  AddRowBtnWrapper,
  DatePickerWrapper,
  Form,
  RatesRow,
  Row,
  SalaryAmountTypeWrapper,
  SalaryCurrency,
  SalaryType,
  TrashIcon,
  TrashWrapper,
} from './Schedule.styles';
import { schema, schemaWithoutRates } from './schema';

const tomorrow = dayjs().add(1, 'day');

const CreateEditSchedule = ({
  initialData,
  isModalOpen,
  onCancel,
  newScheduleCreation,
  lastAllowedEffectiveDate,
}) => {
  const [showNewRates, setShowNewRates] = useState('hide');
  const [isLastRowFilled, setIsLastRowFilled] = useState(false);
  const [scheduleOptions, setScheduleOptions] = useState([]);

  const [rowCount, setRowCount] = useState(1);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const { uuid } = useParams();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(showNewRates === 'hide' ? schemaWithoutRates : schema),
    defaultValues: {
      salary: '',
      salaryType: null,
      currency: { label: 'AMD', value: 'AMD' },
      schedules: [{ scheduleId: null, effectiveDate: null }],
      overtimeRate: '',
      nightRate: '',
      weekendRate: '',
      holidayRate: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  });

  const handleCloseModal = (e) => {
    reset();
    onCancel();
  };

  const schedulesWatch = useWatch({ control, name: 'schedules' });

  useEffect(() => {
    const lastSchedule = schedulesWatch?.[schedulesWatch.length - 1];
    const isFilled = !!lastSchedule?.scheduleId?.value && !!lastSchedule?.effectiveDate;
    setIsLastRowFilled(isFilled);
  }, [schedulesWatch]);

  const isSubmitDisabled = () => {
    if (!schedulesWatch || schedulesWatch.length === 0) return true;

    const minAllowedDate =
      newScheduleCreation && lastAllowedEffectiveDate
        ? dayjs(lastAllowedEffectiveDate).add(1, 'day').startOf('day')
        : dayjs().add(1, 'day').startOf('day');

    return schedulesWatch.some((schedule, index) => {
      if (!schedule.effectiveDate) return false;

      const effectiveDate = dayjs(schedule.effectiveDate).startOf('day');

      if (initialData && fields[index]?.scheduleOrderType) {
        const orderType = fields[index].scheduleOrderType;
        if (orderType === 'Current' || orderType === 'Old') {
          return false;
        }
      }

      return effectiveDate.isBefore(minAllowedDate);
    });
  };

  const onSubmit = (data) => {
    const params = {
      currency: data.currency?.value,
      scheduleId: data.scheduleId?.value,
      salaryType: data.salaryType?.value,
      salary: data.salary,
      schedules: data?.schedules?.map((item) => ({
        scheduleId: item.scheduleId?.value,
        effectiveDate: item.effectiveDate,
        orderType: item.scheduleOrderType ?? 'Upcoming',
      })),
    };

    if (initialData) {
      params.userScheduleId = initialData.userScheduleId;
    }

    if (showNewRates === 'show') {
      params.rates = {
        overtimeRate: data.overtimeRate,
        nightRate: data.nightRate,
        weekendRate: data.weekendRate,
        holidayRate: data.holidayRate,
      };
    }

    if (newScheduleCreation) {
      dispatch(assignNewSchedule({ params, uuid: uuid ?? userInfo?.uuid }));
    } else {
      initialData
        ? dispatch(editAssignedSchedule({ params, uuid: uuid ?? userInfo?.uuid }))
        : dispatch(assignSchedule({ params, uuid: uuid ?? userInfo?.uuid }));
    }
    handleCloseModal();
  };

  const handleAssignNewRates = (e) => {
    setShowNewRates(e.target.value);
  };

  const handleGetSchedules = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/schedules?limit=20&offset=0&name=${encodeURIComponent(searchTerm)}`
        : `/schedules?limit=20&offset=0`;

      const response = await ApiClient.get(url);
      const options = generateOptions(response.schedules || []);
      setScheduleOptions(options);
      return options;
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (rowCount < 5) {
      append({ scheduleId: null, effectiveDate: null });
      setRowCount(rowCount + 1);
    }
  };

  const handleRemoveRow = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    if (rowCount > 1) {
      setRowCount(rowCount - 1);
      remove(index);
    }
  };

  useEffect(() => {
    if (initialData) {
      setRowCount(initialData?.schedules?.length);
      if (initialData.rates) {
        setShowNewRates('show');
      }

      reset({
        schedules: initialData?.schedules?.map((item) => ({
          scheduleId: {
            label: item.scheduleName,
            value: item.scheduleId,
          },
          scheduleOrderType: item.scheduleOrderType,
          effectiveDate: new Date(item.effectiveDate),
        })),
        salaryType: initialData.salaryType
          ? { label: initialData.salaryType, value: initialData.salaryType }
          : null,
        salary: initialData.salary || '',
        currency: initialData.currency
          ? { label: initialData.currency, value: initialData.currency }
          : { label: 'AMD', value: 'AMD' },
        effectiveDate: initialData.effectiveDate
          ? dayjs(initialData.effectiveDate).toDate()
          : null,
        overtimeRate: initialData?.rates?.overtimeRate,
        nightRate: initialData?.rates?.nightRate,
        weekendRate: initialData?.rates?.weekendRate,
        holidayRate: initialData?.rates?.holidayRate,
      });
    } else {
      reset({
        scheduleId: null,
        salaryType: null,
        salary: '',
        currency: { label: 'AMD', value: 'AMD' },
        effectiveDate: null,
      });
    }
  }, [initialData, reset]);

  return (
    <Form>
      <Modal
        maxHeight="90%"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={initialData ? 'Edit Schedule' : 'Assign Schedule'}
        footer={true}
        width={'644px'}
        onOk={handleSubmit(onSubmit)}
        disabled={isSubmitDisabled()}
      >
        {fields.map((field, index) => (
          <Row key={field.id}>
            <Controller
              name={`schedules[${index}].scheduleId`}
              control={control}
              render={({ field }) => (
                <AsyncSelect
                  {...field}
                  label="Choose schedule"
                  placeholder="Choose schedule"
                  $error={errors.schedules?.[index]?.scheduleId?.message}
                  loadOptions={handleGetSchedules}
                  onMenuOpen={handleGetSchedules}
                  defaultOptions={scheduleOptions}
                  menuPlacement="bottom"
                  className="schedule-select-dropdown"
                  isDisabled={
                    fields[index].scheduleOrderType === 'Current' ||
                    fields[index].scheduleOrderType === 'Old'
                  }
                />
              )}
            />
            <Controller
              name={`schedules[${index}].effectiveDate`}
              control={control}
              render={({ field }) => (
                <DatePickerWrapper>
                  <CustomDatePicker
                    {...field}
                    label="Effective date"
                    height="44px"
                    hideActionBar
                    minDate={
                      index === 0
                        ? newScheduleCreation && lastAllowedEffectiveDate
                          ? dayjs(lastAllowedEffectiveDate).add(1, 'day')
                          : dayjs(tomorrow)
                        : dayjs(getValues(`schedules[${index - 1}].effectiveDate`)).add(
                            1,
                            'day'
                          ) || dayjs(tomorrow)
                    }
                    error={errors.schedules?.[index]?.effectiveDate?.message}
                    disabled={
                      fields[index].scheduleOrderType === 'Current' ||
                      fields[index].scheduleOrderType === 'Old' ||
                      (index > 0 && !getValues(`schedules[${index - 1}].effectiveDate`))
                    }
                  />
                </DatePickerWrapper>
              )}
            />

            {index > 0 &&
              field.scheduleOrderType !== 'Current' &&
              field.scheduleOrderType !== 'Old' && (
                <TrashWrapper
                  disabled={
                    field.scheduleOrderType === 'Current' ||
                    field.scheduleOrderType === 'Old' ||
                    index === 0
                  }
                  onClick={(e) => handleRemoveRow(e, index)}
                >
                  <TrashIcon src={Trash} alt="Remove row" />
                </TrashWrapper>
              )}
          </Row>
        ))}

        {rowCount < 5 && isLastRowFilled && (
          <AddRowBtnWrapper>
            <Button type="link" onClick={handleAddRow}>
              + Add another schedule
            </Button>
          </AddRowBtnWrapper>
        )}

        <SalaryAmountTypeWrapper>
          <SalaryType>
            <Controller
              width={'20px'}
              name="salaryType"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    label="Select salary type"
                    placeholder="Select salary type"
                    $error={errors.salaryType?.message}
                    options={SALARY_TYPE}
                  />
                </>
              )}
            />
          </SalaryType>

          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  label="Salary amount"
                  error={errors.salary?.message}
                  placeholder="0.00"
                  type="number"
                  className="salary-type"
                />
              </>
            )}
          />

          <SalaryCurrency>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    className="salary-type"
                    label="Currency"
                    $error={errors.currency?.message}
                    options={CURRENCY}
                  />
                </>
              )}
            />
          </SalaryCurrency>
        </SalaryAmountTypeWrapper>
        <MyRadioGroup
          value={showNewRates}
          onChange={handleAssignNewRates}
          options={[
            { label: 'Out of shift rates of the schedule.', value: 'hide' },
            { label: 'Set new out of shift rates', value: 'show' },
          ]}
          row={false}
        />
        {showNewRates === 'show' && (
          <>
            <RatesRow>
              <Controller
                name="overtimeRate"
                control={control}
                render={({ field }) => (
                  <Input
                    labelColor="#6C757D"
                    {...field}
                    label="Overtime"
                    placeholder="0.00"
                    error={!!errors.overtimeRate?.message}
                    type="number"
                  />
                )}
              />

              <Controller
                name="nightRate"
                control={control}
                render={({ field }) => (
                  <Input
                    labelColor="#6C757D"
                    {...field}
                    label="Night"
                    placeholder="0.00"
                    type="number"
                    error={!!errors.nightRate?.message}
                  />
                )}
              />

              <Controller
                name="weekendRate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Weekend"
                    type="number"
                    labelColor="#6C757D"
                    placeholder="0.00"
                    error={!!errors.weekendRate?.message}
                  />
                )}
              />

              <Controller
                name="holidayRate"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Holiday"
                    type="number"
                    labelColor="#6C757D"
                    placeholder="0.00"
                    error={!!errors.holidayRate?.message}
                  />
                )}
              />
            </RatesRow>
            <ErrorForInputs>
              <p>
                {errors.overtimeRate?.message ||
                  errors.nightRate?.message ||
                  errors.weekendRate?.message ||
                  errors.holidayRate?.message}
              </p>
            </ErrorForInputs>
          </>
        )}
      </Modal>
    </Form>
  );
};

export default memo(CreateEditSchedule);
