import * as yup from 'yup';

const alphanumericWithSpecialCharsRegex =
  /^[a-zA-Z0-9\u0530-\u058F\u2010-\u2015,.:#\-/'&()\s]+$/;

const createCityNameValidation = (existingCities) =>
  yup
    .string()
    .required('Քաղաքի/գյուղի անվանումը պարտադիր է')
    .max(50, 'Քաղաքի/գյուղի անվանումը չի կարող գերազանցել 50 նիշը')
    .trim()
    .matches(
      alphanumericWithSpecialCharsRegex,
      "Քաղաքի/գյուղի անվանումը պարունակում է արգելված նիշեր: Թույլատրելի են միայն լատինական և հայերեն տառեր, թվեր և հետևյալ նիշերը: ,.:#-/'&()"
    )
    .test(
      'is-unique-in-region',
      'Այս անունով քաղաք/գյուղ արդեն գոյություն ունի տվյալ շրջանում',
      function (value) {
        if (!value || !existingCities) return true;

        const currentCityId = this.parent?.id;
        const selectedRegion = this.parent?.region;

        if (!selectedRegion) return true;

        const isDuplicate = existingCities.some(
          (city) =>
            city.name.toLowerCase().trim() === value.toLowerCase().trim() &&
            city.region?.value === selectedRegion.value &&
            city.id !== currentCityId
        );

        return !isDuplicate;
      }
    );

export const createCityFormSchema = (existingCities, isEditMode = false) =>
  yup.object().shape({
    country: isEditMode
      ? yup.object().nullable()
      : yup.object().nullable().required('Երկիրը պարտադիր է'),
    region: isEditMode
      ? yup.object().nullable()
      : yup.object().nullable().required('Շրջանը պարտադիր է'),
    cityName: createCityNameValidation(existingCities),
  });

export const createCityCreateSchema = (existingCities) =>
  yup.object().shape({
    country: yup.object().nullable().required('Երկիրը պարտադիր է'),
    region: yup.object().nullable().required('Շրջանը պարտադիր է'),
    cityName: createCityNameValidation(existingCities),
  });
