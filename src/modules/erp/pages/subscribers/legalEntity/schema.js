import * as yup from 'yup';

export const legalEntityFormSchema = yup.object().shape({
  companyName: yup.string().required('Կազմակերպության անվանումը պարտադիր է').trim(),
  firstName: yup
    .string()
    .required('Անունը պարտադիր է')
    .max(50, 'Անունը չի կարող գերազանցել 50 նիշը')
    .trim(),
  lastName: yup
    .string()
    .required('Ազգանունը պարտադիր է')
    .max(50, 'Ազգանունը չի կարող գերազանցել 50 նիշը')
    .trim(),
  patronymic: yup.string().required('Հայրանունը պարտադիր է').trim(),
  passportType: yup.string().required('Անձնագրի տեսակը պարտադիր է'),
  passportNumber: yup.string().when('passportType', {
    is: (val) => val !== 'ARMENIAN_ID_CARD',
    then: (schema) => schema.required('Անձնագրի համարը պարտադիր է').trim(),
    otherwise: (schema) => schema.optional().trim(),
  }),
  socialCardNumber: yup.string().when('passportType', {
    is: 'ARMENIAN_ID_CARD',
    then: (schema) =>
      schema
        .required('ID քարտի համարը պարտադիր է')
        .matches(/^[0-9]{9}$/, 'ID քարտի համարը պետք է լինի 9 թվանշան')
        .trim(),
    otherwise: (schema) => schema.optional().trim(),
  }),
  issueDate: yup.date().required('Տրման ամսաթիվը պարտադիր է').nullable(),
  issuerCode: yup
    .string()
    .required('Տրող մարմինը պարտադիր է')
    .matches(/^[0-9]+$/, 'Միայն թվանշաններ')
    .trim(),
  address: yup
    .string()
    .trim()
    .required('Գրանցման հասցեն պարտադիր է')
    .matches(
      /^[\p{Script=Armenian}0-9\s\p{P}\p{S}]+$/u,
      'Միայն հայերեն տառեր, թվեր և սիմվոլներ են թույլատրվում'
    ),
  location: yup.string().required('Գտնվելու վայրի հասցեն պարտադիր է').trim(),
  taxpayerRegistrationNumber: yup
    .string()
    .required('ՀՎՀՀ-ն պարտադիր է')
    .matches(/^[0-9]{8}$/, 'ՀՎՀՀ-ն պետք է լինի 8 թվանշան')
    .trim(),
  email: yup.string().email('Էլ․ փոստի ֆորմատը սխալ է').trim(),
  erpExternalId: yup.string().trim(),
  serviceAddresses: yup.array().of(
    yup.object().shape({
      streetId: yup.string().required('Փողոցը պարտադիր է'),
      buildingId: yup.string().required('Տունը պարտադիր է'),
      flat: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === '' || originalValue === null || originalValue === undefined) {
            return null;
          }
          return isNaN(Number(originalValue)) ? null : Number(originalValue);
        })
        .nullable(),
      room: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === '' || originalValue === null || originalValue === undefined) {
            return null;
          }
          return isNaN(Number(originalValue)) ? null : Number(originalValue);
        })
        .nullable(),
      entrance: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === '' || originalValue === null || originalValue === undefined) {
            return null;
          }
          return isNaN(Number(originalValue)) ? null : Number(originalValue);
        })
        .nullable(),
      floor: yup
        .number()
        .transform((value, originalValue) => {
          if (originalValue === '' || originalValue === null || originalValue === undefined) {
            return null;
          }
          return isNaN(Number(originalValue)) ? null : Number(originalValue);
        })
        .nullable(),
      comment: yup.string().trim(),
    })
  ),
  phoneNumbers: yup
    .array()
    .of(
      yup.object().shape({
        number: yup
          .string()
          .required('Հեռախոսահամարը պարտադիր է')
          .matches(/^\+374[0-9]{8}$/, 'Հեռախոսահամարը պետք է լինի +374 և 8 թվանշան')
          .trim(),
        comment: yup.string().trim(),
      })
    )
    .max(5, 'Կարող եք ավելացնել առավելագույնը 5 հեռախոսահամար'),
});
