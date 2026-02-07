import { createSlice } from '@reduxjs/toolkit';

import {
  addAdministrativeDistrict,
  addBuildingHouse,
  addCity,
  addCountry,
  addCustomer,
  addRegion,
  addStreet,
  deleteAdministrativeDistrict,
  deleteBuildingHouse,
  deleteCity,
  deleteCountry,
  deleteRegion,
  deleteStreet,
  getAdministrativeDistricts,
  getBuildingHouses,
  getCities,
  getCountries,
  getRegions,
  getStreets,
  updateAdministrativeDistrict,
  updateBirthDate,
  updateBuildingHouse,
  updateCity,
  updateCountry,
  updateRegion,
  updateStreet,
} from './mainActions';

const initialState = {
  loading: {
    countries: false,
    addCountry: false,
    updateCountry: false,
    deleteCountry: false,
    regions: false,
    addRegion: false,
    updateRegion: false,
    deleteRegion: false,
    cities: false,
    addCity: false,
    updateCity: false,
    deleteCity: false,
    streets: false,
    addStreet: false,
    updateStreet: false,
    deleteStreet: false,
    administrativeDistricts: false,
    addAdministrativeDistrict: false,
    updateAdministrativeDistrict: false,
    deleteAdministrativeDistrict: false,
    buildingHouses: false,
    addBuildingHouse: false,
    updateBuildingHouse: false,
    deleteBuildingHouse: false,
    addCustomer: false,
    updateBirthDate: false,
  },
  error: null,
  countries: [],
  regions: [],
  cities: [],
  streets: [],
  administrativeDistricts: [],
  buildingHouses: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading.countries = true;
        state.error = null;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading.countries = false;
        state.countries = action.payload || [];
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading.countries = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCountry.pending, (state) => {
        state.loading.addCountry = true;
        state.error = null;
      })
      .addCase(addCountry.fulfilled, (state) => {
        state.loading.addCountry = false;
      })
      .addCase(addCountry.rejected, (state, action) => {
        state.loading.addCountry = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCountry.pending, (state) => {
        state.loading.updateCountry = true;
        state.error = null;
      })
      .addCase(updateCountry.fulfilled, (state) => {
        state.loading.updateCountry = false;
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.loading.updateCountry = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteCountry.pending, (state) => {
        state.loading.deleteCountry = true;
        state.error = null;
      })
      .addCase(deleteCountry.fulfilled, (state) => {
        state.loading.deleteCountry = false;
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.loading.deleteCountry = false;
        state.error = action.payload;
      });

    builder
      .addCase(getRegions.pending, (state) => {
        state.loading.regions = true;
        state.error = null;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.loading.regions = false;
        state.regions = action.payload || [];
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.loading.regions = false;
        state.error = action.payload;
      });

    builder
      .addCase(addRegion.pending, (state) => {
        state.loading.addRegion = true;
        state.error = null;
      })
      .addCase(addRegion.fulfilled, (state) => {
        state.loading.addRegion = false;
      })
      .addCase(addRegion.rejected, (state, action) => {
        state.loading.addRegion = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateRegion.pending, (state) => {
        state.loading.updateRegion = true;
        state.error = null;
      })
      .addCase(updateRegion.fulfilled, (state) => {
        state.loading.updateRegion = false;
      })
      .addCase(updateRegion.rejected, (state, action) => {
        state.loading.updateRegion = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteRegion.pending, (state) => {
        state.loading.deleteRegion = true;
        state.error = null;
      })
      .addCase(deleteRegion.fulfilled, (state) => {
        state.loading.deleteRegion = false;
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.loading.deleteRegion = false;
        state.error = action.payload;
      });

    builder
      .addCase(getCities.pending, (state) => {
        state.loading.cities = true;
        state.error = null;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading.cities = false;
        state.cities = action.payload || [];
      })
      .addCase(getCities.rejected, (state, action) => {
        state.loading.cities = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCity.pending, (state) => {
        state.loading.addCity = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state) => {
        state.loading.addCity = false;
      })
      .addCase(addCity.rejected, (state, action) => {
        state.loading.addCity = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCity.pending, (state) => {
        state.loading.updateCity = true;
        state.error = null;
      })
      .addCase(updateCity.fulfilled, (state) => {
        state.loading.updateCity = false;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.loading.updateCity = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteCity.pending, (state) => {
        state.loading.deleteCity = true;
        state.error = null;
      })
      .addCase(deleteCity.fulfilled, (state) => {
        state.loading.deleteCity = false;
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.loading.deleteCity = false;
        state.error = action.payload;
      });

    builder
      .addCase(getStreets.pending, (state) => {
        state.loading.streets = true;
        state.error = null;
      })
      .addCase(getStreets.fulfilled, (state, action) => {
        state.loading.streets = false;
        state.streets = action.payload || [];
      })
      .addCase(getStreets.rejected, (state, action) => {
        state.loading.streets = false;
        state.error = action.payload;
      });

    builder
      .addCase(addStreet.pending, (state) => {
        state.loading.addStreet = true;
        state.error = null;
      })
      .addCase(addStreet.fulfilled, (state) => {
        state.loading.addStreet = false;
      })
      .addCase(addStreet.rejected, (state, action) => {
        state.loading.addStreet = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateStreet.pending, (state) => {
        state.loading.updateStreet = true;
        state.error = null;
      })
      .addCase(updateStreet.fulfilled, (state) => {
        state.loading.updateStreet = false;
      })
      .addCase(updateStreet.rejected, (state, action) => {
        state.loading.updateStreet = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteStreet.pending, (state) => {
        state.loading.deleteStreet = true;
        state.error = null;
      })
      .addCase(deleteStreet.fulfilled, (state) => {
        state.loading.deleteStreet = false;
      })
      .addCase(deleteStreet.rejected, (state, action) => {
        state.loading.deleteStreet = false;
        state.error = action.payload;
      });

    builder
      .addCase(getAdministrativeDistricts.pending, (state) => {
        state.loading.administrativeDistricts = true;
        state.error = null;
      })
      .addCase(getAdministrativeDistricts.fulfilled, (state, action) => {
        state.loading.administrativeDistricts = false;
        state.administrativeDistricts = action.payload || [];
      })
      .addCase(getAdministrativeDistricts.rejected, (state, action) => {
        state.loading.administrativeDistricts = false;
        state.error = action.payload;
      });

    builder
      .addCase(addAdministrativeDistrict.pending, (state) => {
        state.loading.addAdministrativeDistrict = true;
        state.error = null;
      })
      .addCase(addAdministrativeDistrict.fulfilled, (state) => {
        state.loading.addAdministrativeDistrict = false;
      })
      .addCase(addAdministrativeDistrict.rejected, (state, action) => {
        state.loading.addAdministrativeDistrict = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateAdministrativeDistrict.pending, (state) => {
        state.loading.updateAdministrativeDistrict = true;
        state.error = null;
      })
      .addCase(updateAdministrativeDistrict.fulfilled, (state) => {
        state.loading.updateAdministrativeDistrict = false;
      })
      .addCase(updateAdministrativeDistrict.rejected, (state, action) => {
        state.loading.updateAdministrativeDistrict = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteAdministrativeDistrict.pending, (state) => {
        state.loading.deleteAdministrativeDistrict = true;
        state.error = null;
      })
      .addCase(deleteAdministrativeDistrict.fulfilled, (state) => {
        state.loading.deleteAdministrativeDistrict = false;
      })
      .addCase(deleteAdministrativeDistrict.rejected, (state, action) => {
        state.loading.deleteAdministrativeDistrict = false;
        state.error = action.payload;
      });

    builder
      .addCase(getBuildingHouses.pending, (state) => {
        state.loading.buildingHouses = true;
        state.error = null;
      })
      .addCase(getBuildingHouses.fulfilled, (state, action) => {
        state.loading.buildingHouses = false;
        state.buildingHouses = action.payload || [];
      })
      .addCase(getBuildingHouses.rejected, (state, action) => {
        state.loading.buildingHouses = false;
        state.error = action.payload;
      });

    builder
      .addCase(addBuildingHouse.pending, (state) => {
        state.loading.addBuildingHouse = true;
        state.error = null;
      })
      .addCase(addBuildingHouse.fulfilled, (state) => {
        state.loading.addBuildingHouse = false;
      })
      .addCase(addBuildingHouse.rejected, (state, action) => {
        state.loading.addBuildingHouse = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateBuildingHouse.pending, (state) => {
        state.loading.updateBuildingHouse = true;
        state.error = null;
      })
      .addCase(updateBuildingHouse.fulfilled, (state) => {
        state.loading.updateBuildingHouse = false;
      })
      .addCase(updateBuildingHouse.rejected, (state, action) => {
        state.loading.updateBuildingHouse = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteBuildingHouse.pending, (state) => {
        state.loading.deleteBuildingHouse = true;
        state.error = null;
      })
      .addCase(deleteBuildingHouse.fulfilled, (state) => {
        state.loading.deleteBuildingHouse = false;
      })
      .addCase(deleteBuildingHouse.rejected, (state, action) => {
        state.loading.deleteBuildingHouse = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCustomer.pending, (state) => {
        state.loading.addCustomer = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state) => {
        state.loading.addCustomer = false;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading.addCustomer = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateBirthDate.pending, (state) => {
        state.loading.updateBirthDate = true;
        state.error = null;
      })
      .addCase(updateBirthDate.fulfilled, (state) => {
        state.loading.updateBirthDate = false;
      })
      .addCase(updateBirthDate.rejected, (state, action) => {
        state.loading.updateBirthDate = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setError, clearError } = mainSlice.actions;
export default mainSlice.reducer;
