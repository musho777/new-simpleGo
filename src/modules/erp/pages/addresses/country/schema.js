import * as yup from 'yup';

const alphanumericWithSpecialCharsRegex =
  /^[a-zA-Z0-9\u0530-\u058F\u2010-\u2015,.:#\-/'&()\s]+$/;

export const createCountryFormSchema = (existingCountries) =>
  yup.object().shape({
    countryName: yup
      .string()
      .required('Երկրի անվանումը պարտադիր է')
      .max(50, 'Երկրի անվանումը չի կարող գերազանցել 50 նիշը')
      .trim()
      .matches(
        alphanumericWithSpecialCharsRegex,
        "Երկրի անվանումը պարունակում է արգելված նիշեր: Թույլատրելի են միայն լատինական և հայերեն տառեր, թվեր և հետևյալ նիշերը: ,.:#-/'&()"
      )
      .test('is-unique', 'Այս անունով երկիր արդեն գոյություն ունի', function (value) {
        if (!value || !existingCountries) return true;

        const currentCountryId = this.parent?.id;

        const isDuplicate = existingCountries.some(
          (country) =>
            country.name.toLowerCase().trim() === value.toLowerCase().trim() &&
            country.id !== currentCountryId
        );

        return !isDuplicate;
      }),
  });
