import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(250, 'Title must be less than or equal to 250 characters'),

  project: yup
    .object()
    .required('Project is required')
    .shape({
      value: yup.string().uuid('Invalid project ID'),
      label: yup.string().required('Project label is required'),
    }),

  subprojectId: yup
    .object()
    .required('Subproject is required')
    .shape({
      value: yup.string().uuid('Invalid subproject ID'),
      label: yup.string().required('Subproject label is required'),
    }),

  tracker: yup
    .object()
    .required('Tracker is required')
    .shape({
      value: yup.string().required('Tracker value is required'),
      label: yup.string().required('Tracker label is required'),
    }),

  priority: yup
    .object()
    .required('Priority is required')
    .shape({
      value: yup
        .number()
        .required('Priority value is required')
        .min(1)
        .max(5, 'Priority must be between 1 and 5'),
      label: yup.string().required('Priority label is required'),
    }),

  status: yup
    .object()
    .required('Status is required')
    .shape({
      value: yup.string().required('Status value is required'),
      label: yup.string().required('Status label is required'),
    }),

  progress: yup
    .object()
    .required('Progress is required')
    .shape({
      value: yup.number().required('Progress value is required'),
      label: yup.string().required('Progress label is required'),
    }),

  assignee: yup
    .array()
    .min(1, 'At least one assignee is required')
    .required('Assignee is required'),
});

export const schemaWithAppointment = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(250, 'Title must be less than or equal to 250 characters'),

  project: yup
    .object()
    .required('Project is required')
    .shape({
      value: yup.string().uuid('Invalid project ID'),
      label: yup.string().required('Project label is required'),
    }),

  subprojectId: yup
    .object()
    .required('Subproject is required')
    .shape({
      value: yup.string().uuid('Invalid subproject ID'),
      label: yup.string().required('Subproject label is required'),
    }),

  tracker: yup
    .object()
    .required('Tracker is required')
    .shape({
      value: yup.string().required('Tracker value is required'),
      label: yup.string().required('Tracker label is required'),
    }),

  priority: yup
    .object()
    .required('Priority is required')
    .shape({
      value: yup
        .number()
        .required('Priority value is required')
        .min(1)
        .max(5, 'Priority must be between 1 and 5'),
      label: yup.string().required('Priority label is required'),
    }),

  status: yup
    .object()
    .required('Status is required')
    .shape({
      value: yup.string().required('Status value is required'),
      label: yup.string().required('Status label is required'),
    }),

  progress: yup
    .object()
    .required('Progress is required')
    .shape({
      value: yup.number().required('Progress value is required'),
      label: yup.string().required('Progress label is required'),
    }),

  assignee: yup
    .array()
    .min(1, 'At least one assignee is required')
    .required('Assignee is required'),

  'appt-location': yup
    .string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters'),

  'appt-description': yup
    .string()
    .nullable()
    .test(
      'min-length-or-empty',
      'Description must be at least 10 characters or empty',
      (value) => value === '' || value?.length >= 10
    ),

  'appt-timezoneId': yup.mixed().required('Time zone is required'),

  'appt-service': yup.mixed().required('Service is required'),

  'appt-frequency': yup.mixed().required('Frequency is required'),

  'appt-duration': yup.mixed().required('Duration is required'),

  'appt-reminder': yup.mixed().required('Reminder is required'),

  communication: yup
    .object()
    .shape({
      'phone-call': yup.object().shape({
        enabled: yup.boolean(),
        value: yup
          .string()
          .nullable()
          .when('enabled', {
            is: true,
            then: (schema) => schema.required('Phone number is required'),
            otherwise: (schema) => schema.notRequired(),
          }),
      }),
      'text-message': yup.object().shape({
        enabled: yup.boolean(),
        value: yup
          .string()
          .nullable()
          .when('enabled', {
            is: true,
            then: (schema) => schema.required('Text message number is required'),
            otherwise: (schema) => schema.notRequired(),
          }),
      }),
      email: yup.object().shape({
        enabled: yup.boolean(),
        value: yup
          .string()
          .nullable()
          .when('enabled', {
            is: true,
            then: (schema) =>
              schema
                .required('Email is required')
                .matches(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  'Invalid email format'
                ),
            otherwise: (schema) => schema.notRequired(),
          }),
      }),
    })
    .test(
      'at-least-one-enabled',
      'At least one communication method must be enabled',
      function (value) {
        if (!value || typeof value !== 'object') return false;

        const methods = ['phone-call', 'text-message', 'email'];
        const oneEnabled = methods.some((key) => value[key]?.enabled === true);

        return oneEnabled;
      }
    ),

  'appt-disabled': yup.boolean(),
});
