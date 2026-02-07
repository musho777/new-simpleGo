import * as yup from 'yup';

const alphanumericWithSpecialCharsRegex =
  /^[a-zA-Z0-9\u0530-\u058F\u2010-\u2015,.:#\-/'&()\s]+$/;

const createStreetNameValidation = (existingStreets) =>
  yup
    .string()
    .required('Փողոցի անվանումը պարտադիր է')
    .max(50, 'Փողոցի անվանումը չի կարող գերազանցել 50 նիշը')
    .trim()
    .matches(
      alphanumericWithSpecialCharsRegex,
      "Փողոցի անվանումը պարունակում է արգելված նիշեր: Թույլատրելի են միայն լատինական և հայերեն տառեր, թվեր և հետևյալ նիշերը: ,.:#-/'&()"
    )
    .test(
      'is-unique-in-city',
      'Այս անունով փողոց արդեն գոյություն ունի տվյալ քաղաքում/գյուղում',
      function (value) {
        if (!value || !existingStreets) return true;

        const currentStreetId = this.parent?.id;
        const selectedCity = this.parent?.city;

        if (!selectedCity) return true;

        const isDuplicate = existingStreets.some(
          (street) =>
            street.name.toLowerCase().trim() === value.toLowerCase().trim() &&
            street.city?.value === selectedCity.value &&
            street.id !== currentStreetId
        );

        return !isDuplicate;
      }
    );

export const createStreetFormSchema = (existingStreets) =>
  yup.object().shape({
    city: yup.object().nullable(),
    streetName: createStreetNameValidation(existingStreets),
  });

export const createStreetCreateSchema = (existingStreets) =>
  yup.object().shape({
    country: yup.object().nullable().required('Երկիրը պարտադիր է'),
    region: yup.object().nullable().required('Շրջանը պարտադիր է'),
    city: yup.object().nullable().required('Քաղաքը/գյուղը պարտադիր է'),
    streetName: createStreetNameValidation(existingStreets),
  });
