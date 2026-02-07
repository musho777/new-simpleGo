import * as yup from 'yup';

const alphanumericWithSpecialCharsRegex =
  /^[a-zA-Z0-9\u0530-\u058F\u2010-\u2015,.:#\-/'&()\s]+$/;

const createDistrictNameValidation = (existingDistricts) =>
  yup
    .string()
    .required('Թաղամասի անվանումը պարտադիր է')
    .max(50, 'Թաղամասի անվանումը չի կարող գերազանցել 50 նիշը')
    .trim()
    .matches(
      alphanumericWithSpecialCharsRegex,
      "Թաղամասի անվանումը պարունակում է արգելված նիշեր: Թույլատրելի են միայն լատինական և հայերեն տառեր, թվեր և հետևյալ նիշերը: ,.:#-/'&()"
    )
    .test(
      'is-unique-in-city',
      'Այս անունով թաղամաս արդեն գոյություն ունի տվյալ քաղաքում/գյուղում',
      function (value) {
        if (!value || !existingDistricts) return true;

        const currentDistrictId = this.parent?.id;
        const selectedCity = this.parent?.city;

        if (!selectedCity) return true;

        const isDuplicate = existingDistricts.some(
          (district) =>
            district.name.toLowerCase().trim() === value.toLowerCase().trim() &&
            district.city?.value === selectedCity.value &&
            district.id !== currentDistrictId
        );

        return !isDuplicate;
      }
    );

export const createAdministrativeDistrictFormSchema = (existingDistricts) =>
  yup.object().shape({
    city: yup.object().nullable(),
    districtName: createDistrictNameValidation(existingDistricts),
  });

export const createAdministrativeDistrictCreateSchema = (existingDistricts) =>
  yup.object().shape({
    country: yup.object().nullable().required('Երկիրը պարտադիր է'),
    region: yup.object().nullable().required('Շրջանը պարտադիր է'),
    city: yup.object().nullable().required('Քաղաքը/գյուղը պարտադիր է'),
    districtName: createDistrictNameValidation(existingDistricts),
  });
