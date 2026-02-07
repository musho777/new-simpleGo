import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAccessToken } from 'api/TokenService';
import axios from 'axios';

const ERP_BASE_URL = 'https://erp-dev-api.simplego.am';

const erpClient = axios.create({
  baseURL: ERP_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

erpClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

erpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('ERP API Error:', error);
    throw error;
  }
);

export const getCountries = createAsyncThunk(
  'main/countries',
  async (name = '', { rejectWithValue }) => {
    try {
      const url = name ? `/country?name=${name}` : '/country';
      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to fetch countries');
      }
    }
  }
);

export const addCountry = createAsyncThunk(
  'main/addCountry',
  async (name, { rejectWithValue }) => {
    try {
      const response = await erpClient.post('/country/add', { name });
      return response.data;
    } catch (error) {
      console.error('Error adding country:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to add country');
      }
    }
  }
);

export const updateCountry = createAsyncThunk(
  'main/updateCountry',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/country/update?id=${id}`, { name });
      return response.data;
    } catch (error) {
      console.error('Error updating country:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update country');
      }
    }
  }
);

export const deleteCountry = createAsyncThunk(
  'main/deleteCountry',
  async (id, { rejectWithValue }) => {
    try {
      const response = await erpClient.delete(`/country?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting country:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message || 'Failed to delete country' });
      }
    }
  }
);

export const getRegions = createAsyncThunk(
  'main/regions',
  async ({ countryId, name = '' }, { rejectWithValue }) => {
    try {
      let url = `/region?countryId=${countryId}`;
      if (name) {
        url += `&name=${name}`;
      }
      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching regions:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to fetch regions');
      }
    }
  }
);

export const addRegion = createAsyncThunk(
  'main/addRegion',
  async ({ name, country }, { rejectWithValue }) => {
    try {
      const response = await erpClient.post('/region/add', {
        name,
        country: {
          id: country.value,
          name: country.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding region:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to add region');
      }
    }
  }
);

export const updateRegion = createAsyncThunk(
  'main/updateRegion',
  async ({ id, name, country }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/region/update?id=${id}`, {
        name,
        country: {
          id: country.value,
          name: country.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating region:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update region');
      }
    }
  }
);

export const deleteRegion = createAsyncThunk(
  'main/deleteRegion',
  async (id, { rejectWithValue }) => {
    try {
      const response = await erpClient.delete(`/region?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting region:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message || 'Failed to delete region' });
      }
    }
  }
);

export const getCities = createAsyncThunk(
  'main/cities',
  async ({ regionId, name = '' }, { rejectWithValue }) => {
    try {
      let url = `/city?regionId=${regionId}`;
      if (name) {
        url += `&name=${name}`;
      }
      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to fetch cities');
      }
    }
  }
);

export const addCity = createAsyncThunk(
  'main/addCity',
  async ({ name, region }, { rejectWithValue }) => {
    try {
      const response = await erpClient.post('/city/add', {
        name,
        region: {
          id: region.value,
          name: region.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding city:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to add city');
      }
    }
  }
);

export const updateCity = createAsyncThunk(
  'main/updateCity',
  async ({ id, name, region }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/city/update?id=${id}`, {
        name,
        region: {
          id: region.value,
          name: region.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating city:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update city');
      }
    }
  }
);

export const deleteCity = createAsyncThunk(
  'main/deleteCity',
  async (id, { rejectWithValue }) => {
    try {
      const response = await erpClient.delete(`/city?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting city:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message || 'Failed to delete city' });
      }
    }
  }
);

export const getStreets = createAsyncThunk(
  'main/streets',
  async ({ cityId, name = '' }, { rejectWithValue }) => {
    try {
      let url = `/street?cityId=${cityId}`;
      if (name) {
        url += `&name=${name}`;
      }
      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching streets:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to fetch streets');
      }
    }
  }
);

export const searchStreets = createAsyncThunk(
  'main/searchStreets',
  async (name, { rejectWithValue }) => {
    try {
      const encodedName = encodeURIComponent(name);
      const response = await erpClient.get(`/street/get-with-additional-info/${encodedName}`);
      return response.data;
    } catch (error) {
      console.error('Error searching streets:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to search streets');
      }
    }
  }
);

export const addStreet = createAsyncThunk(
  'main/addStreet',
  async ({ name, city }, { rejectWithValue }) => {
    try {
      const response = await erpClient.post('/street/add', {
        name,
        city: {
          id: city.value,
          name: city.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding street:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to add street');
      }
    }
  }
);

export const updateStreet = createAsyncThunk(
  'main/updateStreet',
  async ({ id, name, city }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/street/update?id=${id}`, {
        name,
        city: {
          id: city.value,
          name: city.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating street:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update street');
      }
    }
  }
);

export const deleteStreet = createAsyncThunk(
  'main/deleteStreet',
  async (id, { rejectWithValue }) => {
    try {
      const response = await erpClient.delete(`/street?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting street:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message || 'Failed to delete street' });
      }
    }
  }
);

export const getAdministrativeDistricts = createAsyncThunk(
  'main/administrativeDistricts',
  async ({ cityId, name = '' }, { rejectWithValue }) => {
    try {
      let url = `/administrative-district?cityId=${cityId}`;
      if (name) {
        url += `&name=${name}`;
      }
      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching administrative districts:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to fetch administrative districts');
      }
    }
  }
);

export const addAdministrativeDistrict = createAsyncThunk(
  'main/addAdministrativeDistrict',
  async ({ name, city }, { rejectWithValue }) => {
    try {
      const response = await erpClient.post('/administrative-district/add', {
        name,
        city: {
          id: city.value,
          name: city.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding administrative district:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to add administrative district');
      }
    }
  }
);

export const updateAdministrativeDistrict = createAsyncThunk(
  'main/updateAdministrativeDistrict',
  async ({ id, name, city }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/administrative-district/update?id=${id}`, {
        name,
        city: {
          id: city.value,
          name: city.label,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating administrative district:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update administrative district');
      }
    }
  }
);

export const deleteAdministrativeDistrict = createAsyncThunk(
  'main/deleteAdministrativeDistrict',
  async (id, { rejectWithValue }) => {
    try {
      const response = await erpClient.delete(`/administrative-district?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting administrative district:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({
          message: error.message || 'Failed to delete administrative district',
        });
      }
    }
  }
);

export const getBuildingHouses = createAsyncThunk(
  'main/buildingHouses',
  async ({ streetId, districtId, name = '' }, { rejectWithValue }) => {
    try {
      let url = '/building?';
      const params = [];

      if (streetId) params.push(`streetId=${streetId}`);
      if (districtId) params.push(`districtId=${districtId}`);
      if (name) params.push(`name=${name}`);

      url += params.join('&');

      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching building houses:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to fetch building houses');
      }
    }
  }
);

export const searchBuildings = createAsyncThunk(
  'main/searchBuildings',
  async ({ streetId, name = '' }, { rejectWithValue }) => {
    try {
      let url = `/building?streetId=${streetId}`;
      if (name) {
        url += `&name=${name}`;
      }
      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error searching buildings:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to search buildings');
      }
    }
  }
);

export const addBuildingHouse = createAsyncThunk(
  'main/addBuildingHouse',
  async ({ name, street, administrativeDistrict, comment }, { rejectWithValue }) => {
    try {
      const response = await erpClient.post('/building/add', {
        name,
        street: {
          id: street.value,
          name: street.label,
        },
        administrativeDistrict: administrativeDistrict
          ? {
              id: administrativeDistrict.value,
              name: administrativeDistrict.label,
            }
          : null,
        comment: comment || '',
      });
      return response.data;
    } catch (error) {
      console.error('Error adding building house:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to add building house');
      }
    }
  }
);

export const updateBuildingHouse = createAsyncThunk(
  'main/updateBuildingHouse',
  async ({ id, name, street, administrativeDistrict, comment }, { rejectWithValue }) => {
    try {
      const payload = {
        name,
        street: {
          id: street.value,
          name: street.label,
        },
        comment: comment || '',
      };

      if (administrativeDistrict) {
        payload.administrativeDistrict = {
          id: administrativeDistrict.value,
          name: administrativeDistrict.label,
        };
      }

      const response = await erpClient.put(`/building/update?id=${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating building house:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update building house');
      }
    }
  }
);

export const deleteBuildingHouse = createAsyncThunk(
  'main/deleteBuildingHouse',
  async (id, { rejectWithValue }) => {
    try {
      const response = await erpClient.delete(`/building?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting building house:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to delete building house');
      }
    }
  }
);

// Customer endpoints
export const addCustomer = createAsyncThunk(
  'main/addCustomer',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await erpClient.post('/customer/add', customerData);
      return response.data;
    } catch (error) {
      console.error('Error adding customer:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to add customer');
      }
    }
  }
);

export const updateBirthDate = createAsyncThunk(
  'main/updateBirthDate',
  async ({ id, birthDate }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/birth-date?id=${id}&birthDate=${birthDate}`
      );
      return { id, birthDate, ...response.data };
    } catch (error) {
      console.error('Error updating birth date:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update birth date');
      }
    }
  }
);

export const getCustomer = createAsyncThunk(
  'main/getCustomer',
  async (id, { rejectWithValue }) => {
    try {
      const response = await erpClient.get(`/customer/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to fetch customer');
      }
    }
  }
);

export const searchCustomers = createAsyncThunk(
  'main/searchCustomers',
  async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      let url = `/customer/search?page=${page}&limit=${limit}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const response = await erpClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error searching customers:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to search customers');
      }
    }
  }
);

export const updatePassport = createAsyncThunk(
  'main/updatePassport',
  async ({ id, passportData }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/customer/passport?id=${id}`, passportData);
      return { id, passportData, ...response.data };
    } catch (error) {
      console.error('Error updating passport:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update passport');
      }
    }
  }
);

export const updateName = createAsyncThunk(
  'main/updateName',
  async ({ id, nameData }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/customer/name?id=${id}`, nameData);
      return { id, nameData, ...response.data };
    } catch (error) {
      console.error('Error updating name:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update name');
      }
    }
  }
);

export const updateSocialCardNumber = createAsyncThunk(
  'main/updateSocialCardNumber',
  async ({ id, socialCardNumber }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/social-card-number?id=${id}&socialCardNumber=${socialCardNumber}`
      );
      return { id, socialCardNumber, ...response.data };
    } catch (error) {
      console.error('Error updating social card number:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update social card number');
      }
    }
  }
);

export const updateNotificationAddress = createAsyncThunk(
  'main/updateNotificationAddress',
  async ({ id, notificationAddress }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/notification-address?id=${id}&notificationAddress=${notificationAddress}`
      );
      return { id, notificationAddress, ...response.data };
    } catch (error) {
      console.error('Error updating notification address:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update notification address');
      }
    }
  }
);

export const updateEmail = createAsyncThunk(
  'main/updateEmail',
  async ({ id, email }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/customer/email?id=${id}&email=${email}`);
      return { id, email, ...response.data };
    } catch (error) {
      console.error('Error updating email:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update email');
      }
    }
  }
);

export const updateExternalId = createAsyncThunk(
  'main/updateExternalId',
  async ({ id, externalId }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/external-id?id=${id}&externalId=${externalId}`
      );
      return { id, externalId, ...response.data };
    } catch (error) {
      console.error('Error updating external ID:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update external ID');
      }
    }
  }
);

export const updatePhoneNumbers = createAsyncThunk(
  'main/updatePhoneNumbers',
  async ({ id, phoneNumbers }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(`/customer/phone-numbers?id=${id}`, phoneNumbers);
      return { id, phoneNumbers, ...response.data };
    } catch (error) {
      console.error('Error updating phone numbers:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update phone numbers');
      }
    }
  }
);

export const updateServiceAddresses = createAsyncThunk(
  'main/updateServiceAddresses',
  async ({ id, serviceAddresses }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/service-addresses?id=${id}`,
        serviceAddresses
      );
      return { id, serviceAddresses, ...response.data };
    } catch (error) {
      console.error('Error updating service addresses:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update service addresses');
      }
    }
  }
);

export const updateCompanyName = createAsyncThunk(
  'main/updateCompanyName',
  async ({ id, companyName }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/company-name?id=${id}&companyName=${encodeURIComponent(companyName)}`
      );
      return { id, companyName, ...response.data };
    } catch (error) {
      console.error('Error updating company name:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update company name');
      }
    }
  }
);

export const updateLocation = createAsyncThunk(
  'main/updateLocation',
  async ({ id, location }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/location?id=${id}&location=${encodeURIComponent(location)}`
      );
      return { id, location, ...response.data };
    } catch (error) {
      console.error('Error updating location:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || 'Failed to update location');
      }
    }
  }
);

export const updateTaxpayerRegistrationNumber = createAsyncThunk(
  'main/updateTaxpayerRegistrationNumber',
  async ({ id, taxpayerRegistrationNumber }, { rejectWithValue }) => {
    try {
      const response = await erpClient.put(
        `/customer/taxpayer-registration-number?id=${id}&taxpayerRegistrationNumber=${encodeURIComponent(taxpayerRegistrationNumber)}`
      );
      return { id, taxpayerRegistrationNumber, ...response.data };
    } catch (error) {
      console.error('Error updating taxpayer registration number:', error);
      if (error.response && error.response.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          error.message || 'Failed to update taxpayer registration number'
        );
      }
    }
  }
);
