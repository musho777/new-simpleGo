import * as Yup from 'yup';

const typeReg = /^[Ա-ֆa-zA-Z0-9,.:#\-/()&' ]+$/;

export const projectSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required').matches(typeReg, 'Invalid format'),
  description: Yup.string().max(500, 'Description cannot exceed 500 characters'),
  projectTypeId: Yup.object().nullable().required('Project type is required').shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }),
  disabled: Yup.boolean(),
});

export const subprojectSchema = Yup.object().shape({
  name: Yup.string()
    .required('Subproject name is required')
    .matches(typeReg, 'Invalid format'),
  description: Yup.string()
    .nullable()
    .notRequired()
    .test(
      'description-length',
      'Description must be between 10 and 500 characters',
      (value) => !value || (value.length >= 10 && value.length <= 500)
    ),
  subprojectType: Yup.object().nullable().required('Subproject type is required').shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }),
  managementTypeId: Yup.object().nullable().required('Management type is required').shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }),
  timezoneId: Yup.object().nullable().required('Time zone is required').shape({
    value: Yup.string().required(),
    label: Yup.string().required(),
  }),
  time: Yup.object().shape({
    startTime: Yup.string()
      .required('Start time is required')
      .matches(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format'),
    endTime: Yup.string()
      .required('End time is required')
      .matches(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format')
      .test('is-greater', function (value) {
        const { startTime } = this.parent;

        if (!startTime || !value) {
          return this.createError({ message: 'Both start and end times are required' });
        }

        const start = Number(startTime.split(':')[0]) * 60 + Number(startTime.split(':')[1]);
        const end = Number(value.split(':')[0]) * 60 + Number(value.split(':')[1]);

        if (end > start) {
          return true;
        }

        return this.createError({ message: 'End time must be greater than start time' });
      }),
  }),

  disabled: Yup.boolean(),
});
