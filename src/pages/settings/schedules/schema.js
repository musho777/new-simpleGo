// At the top of your file, import your custom validation function
import * as Yup from 'yup';

import { validateTimes } from './validation';

// Define your base field-level validations as before.
const PayRateRegex = /^(10(\.0)?|[0-9](\.[0-9]{1,2})?)$/;

export const baseSchema = Yup.object().shape({
  name: Yup.string().required('Schedule Name is required'),
  weekdays: Yup.array()
    .min(1, 'At least one weekday is required')
    .required('Weekdays are required'),
  timezoneId: Yup.object().nullable().required('Time zone is required').shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }),
});
const baseSchemaSecond = Yup.object().shape({
  shiftTime: Yup.object().shape({
    startTime: Yup.string()
      .required('Start time is required')
      .matches(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format'),
    endTime: Yup.string()
      .required('End time is required')
      .matches(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format'),
  }),
  breakTime: Yup.object().shape({
    startTime: Yup.string()
      .required('Start time is required')
      .matches(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format'),
    endTime: Yup.string()
      .required('End time is required')
      .matches(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format'),
  }),
  nightTime: Yup.object().shape({
    startTime: Yup.string()
      .required('Start time is required')
      .matches(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format'),
    endTime: Yup.string()
      .required('End time is required')
      .matches(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format'),
  }),
  overtimeRate: Yup.string()
    .matches(
      PayRateRegex,
      'Overtime must be a number between 0 and 10 with at most 2 decimals.'
    )
    .required('Overtime is required'),
  nightRate: Yup.string()
    .matches(PayRateRegex, 'Night must be a number between 0 and 10 with at most 2 decimals.')
    .required('Night is required'),
  weekendRate: Yup.string()
    .matches(
      PayRateRegex,
      'Weekend must be a number between 0 and 10 with at most 2 decimals.'
    )
    .required('Weekend is required'),
  holidayRate: Yup.string()
    .matches(
      PayRateRegex,
      'Holiday must be a number between 0 and 10 with at most 2 decimals.'
    )
    .required('Holiday is required'),
});

export const validationSchema = baseSchemaSecond.test(
  'time-range-validation',
  null,
  function (values) {
    const { shiftTime, breakTime, nightTime } = values;
    if (shiftTime && breakTime && nightTime) {
      const errorMsg = validateTimes(shiftTime, breakTime, nightTime);
      if (errorMsg) {
        if (errorMsg.includes('break time')) {
          return this.createError({
            path: 'breakTime.endTime',
            message: errorMsg,
          });
        }
        if (errorMsg.includes('Night hours end must be later than start hours')) {
          return this.createError({
            path: 'nightTime.startTime',
            message: errorMsg,
          });
        }
        if (errorMsg.includes('24-hour range')) {
          return this.createError({
            path: 'nightTime.endTime',
            message: errorMsg,
          });
        }
        return this.createError({
          path: 'shiftTime.startTime',
          message: errorMsg,
        });
      }
    }
    return true;
  }
);
