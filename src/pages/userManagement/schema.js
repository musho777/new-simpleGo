import * as Yup from 'yup';

const armenianNameRegex = /^[\u0531-\u0556][\u0530-\u058F\s-]*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const schemaStep1 = Yup.object().shape({
  name: Yup.string()
    .required('First name is required')
    .matches(armenianNameRegex, 'Only Armenian letters, starting with an uppercase')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  surname: Yup.string()
    .required('Last name is required')
    .matches(armenianNameRegex, 'Only Armenian letters, starting with an uppercase')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  role: Yup.object().nullable().required('Role is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .min(11, 'Phone number is too short'),
  email: Yup.string()
    .required('Email address is required')
    .max(65, 'Email must not exceed 65 characters')
    .matches(emailRegex, 'Invalid email address'),
});

export const schemaStep2 = Yup.object().shape({
  occupation: Yup.object()
    .nullable()
    .when([], {
      is: () => localStorage.getItem('userType') === 'Hr Manager',
      then: (schema) => schema.required('Occupation is required'),
      otherwise: (schema) => schema.nullable(),
    }),
  commission: Yup.object().nullable().required('Commission is required'),
  holidays: Yup.object().nullable().required('Holidays are required'),
  officeLocation: Yup.object().nullable().required('Office location is required'),
  timezoneId: Yup.object().nullable().required('Timezone is required'),
});
