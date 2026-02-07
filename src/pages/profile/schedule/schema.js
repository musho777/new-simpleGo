import * as Yup from 'yup';

const PayRateRegex = /^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/;

const rateValidation = Yup.number()
  .required('All fields are required')
  .min(0, 'Rate must be at least 0')
  .max(10, 'Rate cannot exceed 10')
  .test('decimal-places', 'Rate can have at most 2 decimal places', (value) => {
    if (value == null) return true;
    const decimalPlaces = (value.toString().split('.')[1] || '').length;
    return decimalPlaces <= 2;
  })
  .typeError('Rate must be a valid number');

export const schema = Yup.object().shape({
  salaryType: Yup.object().nullable().required('All fields are required'),
  salary: Yup.number()
    .required('Salary is required')
    .positive('Salary must be a positive number')
    .typeError('Salary is required')
    .test(
      'maxDigits',
      'Salary must not exceed 10 digits',
      (val) => val?.toString().length <= 10
    ),
  currency: Yup.object().nullable().required('Currency is required'),
  schedules: Yup.array().of(
    Yup.object().shape({
      scheduleId: Yup.object().nullable().required('All fields are required'),
      effectiveDate: Yup.date().required('All fields are required'),
    })
  ),
  overtimeRate: rateValidation,
  nightRate: rateValidation,
  weekendRate: rateValidation,
  holidayRate: rateValidation,
});

export const schemaWithoutRates = Yup.object().shape({
  salaryType: Yup.object().nullable().required('Salary type is required'),
  salary: Yup.number()
    .required('Salary amount is required')
    .positive('Salary must be a positive number')
    .typeError('Salary is required')
    .test(
      'maxDigits',
      'Salary must not exceed 10 digits',
      (val) => val?.toString().length <= 10
    ),
  currency: Yup.object().nullable().required('Currency is required'),
  schedules: Yup.array().of(
    Yup.object().shape({
      scheduleId: Yup.object().nullable().required('Salary schedule is required'),
      effectiveDate: Yup.date().required('Effective date is required'),
    })
  ),
});
