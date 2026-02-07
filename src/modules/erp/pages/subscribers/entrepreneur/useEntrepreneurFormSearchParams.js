import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useEntrepreneurFormSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getString = (key, fallback = '') => {
    const val = searchParams.get(key);
    return val !== null && val !== 'null' ? val : fallback;
  };

  const getPhones = () => {
    const phones = [];
    for (let i = 0; i < 4; i++) {
      const phoneNumber = searchParams.get(`phone${i}`);
      const phoneComment = searchParams.get(`phoneComment${i}`);
      if (phoneNumber) {
        phones.push({ phoneNumber, phoneComment: phoneComment || '' });
      }
    }
    return phones;
  };

  const searchData = useMemo(
    () => ({
      // Entrepreneur form fields
      passportNumber: getString('passportNumber'),
      issueDate: getString('issueDate'),
      issuerCode: getString('issuerCode'),
      address: getString('address'),
      birthDate: getString('birthDate'),
      socialCardNumber: getString('socialCardNumber'),
      notificationAddress: getString('notificationAddress'),
      email: getString('email'),
      erpExternalId: getString('erpExternalId'),
      hvhh: getString('hvhh'),
      locationAddress: getString('locationAddress'),
      // Address form fields
      street: getString('street'),
      house: getString('house'),
      apartment: getString('apartment'),
      roomNumber: getString('roomNumber'),
      entrance: getString('entrance'),
      floor: getString('floor'),
      comment: getString('comment'),
      // Phone form fields - array
      phones: getPhones(),
      // Addresses - empty array for now
      addresses: [],
    }),
    [searchParams]
  );

  const setFormSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

    // Preserve step parameter
    const currentStep = searchParams.get('step');
    if (currentStep) {
      nextParams.set('step', currentStep);
    }

    const appendKey = (key, value) => {
      if (value !== null && value !== undefined && value !== '') {
        nextParams.set(key, value);
      }
    };

    Object.entries(fullSearchData).forEach(([key, value]) => {
      if (key === 'phones' && Array.isArray(value)) {
        // Handle phones array
        value.forEach((phone, index) => {
          if (phone.phoneNumber) {
            appendKey(`phone${index}`, phone.phoneNumber);
            appendKey(`phoneComment${index}`, phone.phoneComment);
          }
        });
      } else {
        appendKey(key, value);
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  const resetFormSearchData = () => {
    setSearchParams({}, { replace: true });
  };

  return {
    formData: searchData,
    setFormSearchData,
    resetFormSearchData,
  };
};
