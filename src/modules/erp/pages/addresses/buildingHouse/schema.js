import * as yup from 'yup';

const buildingHouseNameRegex = /^[0-9,.:#\-/\s]+$/;

const createBuildingHouseNameValidation = (existingBuildingHouses) =>
  yup
    .string()
    .required('Շենքի/տան անվանումը պարտադիր է')
    .max(50, 'Շենքի/տան անվանումը չի կարող գերազանցել 50 նիշը')
    .trim()
    .matches(
      buildingHouseNameRegex,
      'Շենքի/տան անվանումը պարունակում է արգելված նիշեր: Թույլատրելի են միայն թվեր և հետևյալ նիշերը: ,.:#-/'
    )
    .test(
      'is-unique-in-street',
      'Այս անունով շենք/տուն արդեն գոյություն ունի տվյալ փողոցում',
      function (value) {
        if (!value || !existingBuildingHouses) return true;

        const currentBuildingHouseId = this.parent?.id;
        const selectedStreet = this.parent?.street;

        if (!selectedStreet) return true;

        const isDuplicate = existingBuildingHouses.some(
          (buildingHouse) =>
            buildingHouse.name.toLowerCase().trim() === value.toLowerCase().trim() &&
            buildingHouse.street?.value === selectedStreet.value &&
            buildingHouse.id !== currentBuildingHouseId
        );

        return !isDuplicate;
      }
    );

export const createBuildingHouseFormSchema = (existingBuildingHouses) =>
  yup.object().shape({
    city: yup.object().nullable(),
    street: yup.object().nullable(),
    district: yup.object().nullable(),
    buildingHouseName: createBuildingHouseNameValidation(existingBuildingHouses),
    comment: yup.string().nullable().max(250, 'Մեկնաբանությունը չի կարող գերազանցել 250 նիշը'),
  });

export const createBuildingHouseCreateSchema = (existingBuildingHouses) =>
  yup.object().shape({
    country: yup.object().nullable().required('Երկիրը պարտադիր է'),
    region: yup.object().nullable().required('Շրջանը պարտադիր է'),
    city: yup.object().nullable().required('Քաղաքը/գյուղը պարտադիր է'),
    street: yup.object().nullable().required('Փողոցը պարտադիր է'),
    district: yup.object().nullable(),
    buildingHouseName: createBuildingHouseNameValidation(existingBuildingHouses),
    comment: yup.string().nullable().max(250, 'Մեկնաբանությունը չի կարող գերազանցել 250 նիշը'),
  });
