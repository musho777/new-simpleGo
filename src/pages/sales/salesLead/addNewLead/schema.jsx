import * as Yup from 'yup';

const allowedCharactersRegex = /^[\p{L}0-9 ,.:#\-/'&()]+$/u;

export const step1Schema = Yup.object().shape({
  leadType: Yup.object().required('Please select a lead type'),
});

export const step3Schema = Yup.object().shape({
  region: Yup.string().max(50).required('Region is required'),
  city: Yup.string().max(50).required('City is required'),
  street: Yup.string().max(50).required('Street is required'),
  house: Yup.string().max(50).required('House/Apt is required'),
});

export const step4Schema = Yup.object().shape({
  competitor: Yup.string().max(250, 'Maximum 250 characters'),
  tariff: Yup.string().nullable().notRequired().max(250, 'Maximum 250 characters'),
  services: Yup.string().nullable().notRequired().max(50, 'Maximum 50 characters'),
  contractEndDate: Yup.date().nullable(),
  contactDate: Yup.date().nullable(),
  nextContactDate: Yup.date().nullable(),
});

export const getStep2Schema = (leadTypeValue, isEdit = false) => {
  const phoneSchema = isEdit
    ? Yup.object({
        value: Yup.string()
          .required('Phone number is required')
          .min(11, 'Phone number is too short'),
      })
    : Yup.object().notRequired();

  if (leadTypeValue === 'B2C') {
    return Yup.object().shape({
      name: Yup.string().max(50).required('First name is required'),
      lastName: Yup.string().max(50).required('Last name is required'),
      phone: phoneSchema,
      leadStatus: Yup.object().required('Lead status is required'),
      source: Yup.object().required('Source is required'),
      type: Yup.object().required('Type is required'),
      state: Yup.object().required('State is required'),
      disabled: Yup.boolean(),
    });
  }
  return Yup.object().shape({
    name: Yup.string()
      .max(50, 'Max 50 characters long')
      .required('Name is required')
      .matches(
        allowedCharactersRegex,
        'Only  Latin and Armenian letters, numbers, and allowed special characters'
      ),
    webAddress: Yup.string().url('Invalid URL'),
    phone: phoneSchema,
    leadStatus: Yup.object().required('Lead status is required'),
    source: Yup.object().required('Source is required'),
    type: Yup.object().required('Type is required'),
    disabled: Yup.boolean(),
  });
};
