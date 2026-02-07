import * as yup from 'yup';

export const attendancePolicySchema = yup.object().shape({
  dailyAcceptable: yup
    .number()
    .typeError('Must be a number')
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(240, 'Max allowed is 240 minutes')
    .test(
      'daily-vs-monthly-acceptable',
      'Daily acceptable cannot be more than monthly acceptable',
      function (value) {
        const { monthlyAcceptable } = this.parent;
        if (value && monthlyAcceptable) {
          return Number(value) <= Number(monthlyAcceptable);
        }
        return true;
      }
    ),

  dailyUnacceptable: yup
    .number()
    .typeError('Must be a number')
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(480, 'Max allowed is 480 minutes')
    .test(
      'daily-vs-monthly-unacceptable',
      'Daily unacceptable cannot be more than monthly unacceptable',
      function (value) {
        const { monthlyUnacceptable } = this.parent;
        if (value && monthlyUnacceptable) {
          return Number(value) <= Number(monthlyUnacceptable);
        }
        return true;
      }
    ),

  monthlyAcceptable: yup
    .number()
    .typeError('Must be a number')
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(4800, 'Max allowed is 4800 minutes')
    .test(
      'monthly-vs-daily-acceptable',
      'Monthly acceptable cannot be less than daily acceptable',
      function (value) {
        const { dailyAcceptable } = this.parent;
        if (value && dailyAcceptable) {
          return Number(value) >= Number(dailyAcceptable);
        }
        return true;
      }
    ),

  monthlyUnacceptable: yup
    .number()
    .typeError('Must be a number')
    .required('Required')
    .min(0, 'Cannot be negative')
    .max(9000, 'Max allowed is 9000 minutes')
    .test(
      'monthly-vs-daily-unacceptable',
      'Monthly unacceptable cannot be less than daily unacceptable',
      function (value) {
        const { dailyUnacceptable } = this.parent;
        if (value && dailyUnacceptable) {
          return Number(value) >= Number(dailyUnacceptable);
        }
        return true;
      }
    ),
});
