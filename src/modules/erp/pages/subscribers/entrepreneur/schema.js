import * as yup from 'yup';

export const entrepreneurFormSchema = yup.object().shape({
  companyName: yup.string().required('Ա/Ձ֊ի անվանումը պարտադիր է').trim(),
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
  idCardNumber: yup.string().when('passportType', {
    is: 'ARMENIAN_ID_CARD',
    then: (schema) =>
      schema
        .required('ID քարտի համարը պարտադիր է')
        .matches(/^[0-9]{9}$/, 'ID քարտի համարը պետք է լինի 9 թվանշան')
        .trim(),
    otherwise: (schema) => schema.optional().trim(),
  }),
  socialCardNumber: yup
    .string()
    .required('Սոց. քարտի համարը պարտադիր է')
    .matches(/^[0-9]{10}$/, 'Սոց. քարտի համարը պետք է լինի 10 թվանշան')
    .test('no-consecutive-sixes', '3 հատ 6 թվանշան չեն կարող իրար հաջորդել', function (value) {
      if (!value) return true;
      return !/666/.test(value);
    })
    .trim(),
  issueDate: yup
    .date()
    .required('Տրման ամսաթիվը պարտադիր է')
    .max(new Date(), 'Տրման ամսաթիվը չի կարող ապագայում լինել')
    .test(
      'not-too-old',
      'Եթե ամսաթիվը 10 տարուց ավելի վաղ է, ապա համակարգը չի թույլատրի գրանցումը',
      function (value) {
        if (!value) return true;
        const tenYearsAgo = new Date();
        tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
        tenYearsAgo.setDate(tenYearsAgo.getDate() - 1);
        return value >= tenYearsAgo;
      }
    )
    .nullable(),
  issuerCode: yup
    .string()
    .required('Ում կողմից է տրված դաշտը պարտադիր է')
    .matches(/^[0-9]+$/, 'Միայն թվանշաններ են թույլատրվում')
    .trim(),
  address: yup
    .string()
    .trim()
    .required('Գրանցման հասցեն պարտադիր է')
    .matches(
      /^[\p{Script=Armenian}0-9\s\p{P}\p{S}]+$/u,
      'Միայն հայերեն տառեր, թվեր և սիմվոլներ են թույլատրվում'
    ),
  birthDate: yup.date().required('Ծննդյան ամսաթիվը պարտադիր է').nullable(),
  notificationAddress: yup.string().trim(),
  email: yup
    .string()
    .email('Էլ․ փոստի ֆորմատը սխալ է')
    .trim()
    .required('Էլ․ փոստը պարտադիր է'),

  erpExternalId: yup.string().trim(),
  taxpayerRegistrationNumber: yup
    .string()
    .required('ՀՎՀՀ-ն պարտադիր է')
    .matches(/^[0-9]{8}$/, 'ՀՎՀՀ-ն պետք է լինի 8 թվանշան')
    .trim(),
  location: yup.string().required('Գտնվելու վայրի հասցեն պարտադիր է').trim(),
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
