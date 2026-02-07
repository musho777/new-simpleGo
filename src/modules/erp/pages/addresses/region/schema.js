import * as yup from 'yup';

const alphanumericWithSpecialCharsRegex =
  /^[a-zA-Z0-9\u0530-\u058F\u2010-\u2015,.:#\-/'&()\s]+$/;

const createRegionNameValidation = (existingRegions) =>
  yup
    .string()
    .required('Շրջանի անվանումը պարտադիր է')
    .max(50, 'Շրջանի անվանումը չի կարող գերազանցել 50 նիշը')
    .trim()
    .matches(
      alphanumericWithSpecialCharsRegex,
      "Շրջանի անվանումը պարունակում է արգելված նիշեր: Թույլատրելի են միայն լատինական և հայերեն տառեր, թվեր և հետևյալ նիշերը: ,.:#-/'&()"
    )
    .test('is-unique', 'Այս անունով շրջան արդեն գոյություն ունի', function (value) {
      if (!value || !existingRegions) return true;

      const currentRegionId = this.parent?.id;

      const isDuplicate = existingRegions.some(
        (region) =>
          region.name.toLowerCase().trim() === value.toLowerCase().trim() &&
          region.id !== currentRegionId
      );

      return !isDuplicate;
    });

export const createRegionFormSchema = (existingRegions) =>
  yup.object().shape({
    country: yup.object().nullable(),
    regionName: createRegionNameValidation(existingRegions),
  });

export const createRegionCreateSchema = (existingRegions) =>
  yup.object().shape({
    country: yup.object().nullable().required('Երկիրը պարտադիր է'),
    regionName: createRegionNameValidation(existingRegions),
  });
