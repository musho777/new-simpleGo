import * as yup from 'yup';

export const individualEditFormSchema = yup.object().shape({
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
  patronymic: yup
    .string()
    .required('Հայրանունը պարտադիր է')
    .max(50, 'Հայրանունը չի կարող գերազանցել 50 նիշը')
    .trim(),
  passportType: yup
    .string()
    .required('Անձնագրի տեսակը պարտադիր է')
    .oneOf(
      ['ARMENIAN_PASSPORT', 'ARMENIAN_ID_CARD', 'FOREIGN_PASSPORT'],
      'Անվավեր անձնագրի տեսակ'
    ),
  passportNumber: yup.string().when('$passportType', {
    is: 'ARMENIAN_PASSPORT',
    then: (schema) =>
      schema
        .required('Անձնագրի համարը պարտադիր է')
        .matches(/^[A-Za-z]{2}[0-9]{7}$/, '2 լատիներեն տառ + 7 թվանշան')
        .trim(),
    otherwise: (schema) =>
      schema.when('$passportType', {
        is: 'FOREIGN_PASSPORT',
        then: (schema) => schema.required('Անձնագրի համարը պարտադիր է').trim(),
        otherwise: (schema) => schema.trim(),
      }),
  }),
  idCardNumber: yup.string().when('$passportType', {
    is: 'ARMENIAN_ID_CARD',
    then: (schema) => schema.required('ID քարտի համարը պարտադիր է').trim(),
    otherwise: (schema) => schema.trim(),
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
  notificationAddress: yup.string().trim(),
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
  location: yup.string().trim(),
  email: yup.string().email('Էլ․ փոստի ֆորմատը սխալ է').trim(),
  externalId: yup.string().trim(),
  serviceAddresses: yup.array().of(
    yup.object().shape({
      streetId: yup.string().required('Փողոցը պարտադիր է'),
      buildingId: yup.string().required('Տունը պարտադիր է'),
      flat: yup
        .number()
        .transform((value) =>
          value === '' || value === null || value === undefined ? null : Number(value)
        )
        .nullable(),
      room: yup
        .number()
        .transform((value) =>
          value === '' || value === null || value === undefined ? null : Number(value)
        )
        .nullable(),
      entrance: yup
        .number()
        .transform((value) =>
          value === '' || value === null || value === undefined ? null : Number(value)
        )
        .nullable(),
      floor: yup
        .number()
        .transform((value) =>
          value === '' || value === null || value === undefined ? null : Number(value)
        )
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

export const firstNameSchema = individualEditFormSchema.fields.firstName;
export const lastNameSchema = individualEditFormSchema.fields.lastName;
export const patronymicSchema = individualEditFormSchema.fields.patronymic;
export const socialCardSchema = individualEditFormSchema.fields.socialCardNumber;
export const notificationAddressSchema = individualEditFormSchema.fields.notificationAddress;
export const emailSchema = individualEditFormSchema.fields.email;
export const externalIdSchema = individualEditFormSchema.fields.externalId;

export const passportTypeSchema = individualEditFormSchema.fields.passportType;
export const passportNumberSchema = individualEditFormSchema.fields.passportNumber;
export const passportDateSchema = individualEditFormSchema.fields.issueDate;
export const passportIssuerSchema = individualEditFormSchema.fields.issuerCode;
export const passportAddressSchema = individualEditFormSchema.fields.address;

export const firstNameModalSchema = yup.object().shape({
  firstName: firstNameSchema,
});

export const lastNameModalSchema = yup.object().shape({
  lastName: lastNameSchema,
});

export const patronymicModalSchema = yup.object().shape({
  patronymic: patronymicSchema,
});

export const socialCardModalSchema = yup.object().shape({
  socialCardNumber: socialCardSchema,
});

export const passportNumberModalSchema = yup.object().shape({
  type: passportTypeSchema,
  number: passportNumberSchema,
});

export const passportDateModalSchema = yup.object().shape({
  issueDate: passportDateSchema,
});

export const passportIssuerModalSchema = yup.object().shape({
  issuerCode: passportIssuerSchema,
});

export const passportAddressModalSchema = yup.object().shape({
  address: passportAddressSchema,
});

export const notificationAddressModalSchema = yup.object().shape({
  notificationAddress: notificationAddressSchema,
});

export const emailModalSchema = yup.object().shape({
  email: emailSchema,
});

export const externalIdModalSchema = yup.object().shape({
  externalId: externalIdSchema,
});

export const phoneNumberModalSchema = yup.object().shape({
  number: yup
    .string()
    .required('Հեռախոսահամարը պարտադիր է')
    .matches(/^\+374[0-9]{8}$/, 'Հեռախոսահամարը պետք է լինի +374 և 8 թվանշան')
    .trim(),
});

export const phoneCommentModalSchema = yup.object().shape({
  comment: yup.string().trim(),
});

export const birthDateModalSchema = yup.object().shape({
  birthDate: individualEditFormSchema.fields.birthDate,
});

export const serviceAddressModalSchema = yup.object().shape({
  streetId: yup.string().required('Փողոցը պարտադիր է'),
  buildingId: yup.string().required('Տունը պարտադիր է'),
  flat: yup
    .number()
    .transform((value) =>
      value === '' || value === null || value === undefined ? null : Number(value)
    )
    .nullable(),
  room: yup
    .number()
    .transform((value) =>
      value === '' || value === null || value === undefined ? null : Number(value)
    )
    .nullable(),
  entrance: yup
    .number()
    .transform((value) =>
      value === '' || value === null || value === undefined ? null : Number(value)
    )
    .nullable(),
  floor: yup
    .number()
    .transform((value) =>
      value === '' || value === null || value === undefined ? null : Number(value)
    )
    .nullable(),
  comment: yup.string().trim(),
});
