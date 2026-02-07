import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useLegalEntityFormSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getString = (key, fallback = '') => {
    const val = searchParams.get(key);
    return val !== null && val !== 'null' ? val : fallback;
  };

  const getPhoneNumbers = () => {
    const phoneNumbers = [];
    for (let i = 0; i < 4; i++) {
      const number = searchParams.get(`phoneNumber${i}`);
      const comment = searchParams.get(`phoneComment${i}`);
      if (number) {
        phoneNumbers.push({ number, comment: comment || '' });
      }
    }
    if (phoneNumbers.length === 0) {
      phoneNumbers.push({ number: '', comment: '' });
    }
    return phoneNumbers;
  };

  const getServiceAddresses = () => {
    const serviceAddresses = [];
    for (let i = 0; i < 3; i++) {
      const streetId = searchParams.get(`streetId${i}`);
      const buildingId = searchParams.get(`buildingId${i}`);
      const flat = searchParams.get(`flat${i}`);
      const room = searchParams.get(`room${i}`);
      const entrance = searchParams.get(`entrance${i}`);
      const floor = searchParams.get(`floor${i}`);
      const comment = searchParams.get(`addressComment${i}`);
      if (streetId || buildingId || flat || room || entrance || floor || comment) {
        serviceAddresses.push({
          streetId: streetId || '',
          buildingId: buildingId || '',
          flat: flat || '',
          room: room || '',
          entrance: entrance || '',
          floor: floor || '',
          comment: comment || '',
        });
      }
    }
    if (serviceAddresses.length === 0) {
      serviceAddresses.push({
        streetId: '',
        buildingId: '',
        flat: '',
        room: '',
        entrance: '',
        floor: '',
        comment: '',
      });
    }
    return serviceAddresses;
  };

  const searchData = useMemo(
    () => ({
      companyName: getString('companyName'),
      firstName: getString('firstName'),
      lastName: getString('lastName'),
      patronymic: getString('patronymic'),
      passportType: getString('passportType', 'ARMENIAN_PASSPORT'),
      passportNumber: getString('passportNumber'),
      idCardNumber: getString('idCardNumber'),
      socialCardNumber: getString('socialCardNumber'),
      issueDate: getString('issueDate'),
      issuerCode: getString('issuerCode'),
      address: getString('address'),
      location: getString('location'),
      taxpayerRegistrationNumber: getString('taxpayerRegistrationNumber'),
      email: getString('email'),
      erpExternalId: getString('erpExternalId'),
      phoneNumbers: getPhoneNumbers(),
      serviceAddresses: getServiceAddresses(),
    }),
    [searchParams]
  );

  const setFormSearchData = (updated) => {
    const nextParams = new URLSearchParams();
    const fullSearchData = { ...searchData, ...updated };

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
      if (key === 'phoneNumbers' && Array.isArray(value)) {
        value.forEach((phone, index) => {
          if (phone.number) {
            appendKey(`phoneNumber${index}`, phone.number);
            appendKey(`phoneComment${index}`, phone.comment);
          }
        });
      } else if (key === 'serviceAddresses' && Array.isArray(value)) {
        value.forEach((address, index) => {
          appendKey(`streetId${index}`, address.streetId);
          appendKey(`buildingId${index}`, address.buildingId);
          appendKey(`flat${index}`, address.flat);
          appendKey(`room${index}`, address.room);
          appendKey(`entrance${index}`, address.entrance);
          appendKey(`floor${index}`, address.floor);
          appendKey(`addressComment${index}`, address.comment);
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
