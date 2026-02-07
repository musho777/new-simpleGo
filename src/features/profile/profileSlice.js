import { createSlice } from '@reduxjs/toolkit';

import {
  addProfileContactsEmail,
  addProfileContactsPhone,
  approveRejectAddressesUpdates,
  approveRejectContactUpdates,
  approveRejectLanguagesUpdates,
  approveRejectMainPhone,
  approveRejectPersonalUpdates,
  approveRejectSkillsUpdates,
  assignNewSchedule,
  assignSchedule,
  createAddress,
  createLanguages,
  createSkills,
  deleteAddress,
  deleteContacts,
  editAdditionalInfo,
  editAddress,
  editAssignedSchedule,
  editLanguages,
  editSkills,
  getAdditionalInfo,
  getUserProfileInfo,
  getUserProfileInfoChangesById,
  getUserProfileInfoView,
  updatePersonalInfo,
  updateProfileContactsEmail,
  updateProfileContactsPhone,
  uploadProfilePic,
} from './profileActions';

const initialState = {
  selectedNewContacts: {
    phones: [],
    mobiles: [],
    emails: [],
  },
  selectedNewAddresses: {
    home: [],
    work: [],
    billing: [],
    delivery: [],
    service: [],
  },
  selectedNewLanguages: [],
  selectedNewSkills: [],
  selectedProfileChanges: '',
  selectedMainPhone: '',
  mobilePhoneNumbers: [],
  phoneNumbers: [],
  mainPhone: {},
  addresses: [],
  languages: [],
  skills: [],
  emails: [],
  personal: {},
  additionalInfo: {},
  addressesById: {},
  languagesById: {},
  skillsById: {},
  userInfoById: {},
  contactsById: {},
  personalChanges: {},
  updateCount: null,
  newCount: null,
  loading: false,
  uploadLoading: false,
  additionalInfoLoading: false,
  personalUpdateSuccess: false,
  additionalUpdateSuccess: false,
  createSuccess: false,
  avatarUploadSuccess: false,
  updateSkillsSuccess: false,
  updateLanguagesSuccess: false,
  createLanguagesSuccess: false,
  createAddressesSuccess: false,
  updateContactsEmailSuccess: false,
  createContactsEmailSuccess: false,
  addressChangeSuccess: false,
  createContactsNumbersSuccess: false,
  updateContactsNumbersSuccess: false,
  selectAllChanges: false,
  selectAllNews: false,
  error: null,
  schedules: {},
  showSchedules: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setSelectedNewContacts: (state, { payload }) => {
      if (payload.phones) {
        state.selectedNewContacts.phones = payload.phones;
      }

      if (payload.mobiles) {
        state.selectedNewContacts.mobiles = payload.mobiles;
      }

      if (payload.emails) {
        state.selectedNewContacts.emails = payload.emails;
      }
    },
    resetSelectedNewContacts: (state) => {
      state.selectedNewContacts = {
        phones: [],
        mobiles: [],
        emails: [],
      };
    },
    setSelectedNewAddresses: (state, { payload }) => {
      if (payload.home) {
        state.selectedNewAddresses.home = payload.home;
      }

      if (payload.delivery) {
        state.selectedNewAddresses.delivery = payload.delivery;
      }

      if (payload.service) {
        state.selectedNewAddresses.service = payload.service;
      }

      if (payload.work) {
        state.selectedNewAddresses.work = payload.work;
      }

      if (payload.billing) {
        state.selectedNewAddresses.billing = payload.billing;
      }
    },
    resetSelectedNewAddresses: (state) => {
      state.selectedNewAddresses = {
        home: [],
        work: [],
        billing: [],
        delivery: [],
        service: [],
      };
    },
    setSelectedNewLanguages: (state, { payload }) => {
      state.selectedNewLanguages = payload;
    },
    resetSelectedNewLanguages: (state) => {
      state.selectedNewLanguages = [];
    },
    setSelectedNewSkills: (state, { payload }) => {
      state.selectedNewSkills = payload;
    },
    resetSelectedNewSkills: (state) => {
      state.selectedNewSkills = [];
    },
    setSelectedProfileChanges: (state, { payload }) => {
      state.selectedProfileChanges = payload;
    },
    resetSelectedProfileChanges: (state) => {
      state.selectedProfileChanges = [];
    },
    resetPersonalInfoSuccess: (state) => {
      state.personalUpdateSuccess = false;
    },
    resetAdditionalUpdateSuccess: (state) => {
      state.additionalUpdateSuccess = false;
    },
    setSelectedNewMainPhone: (state, { payload }) => {
      state.selectedMainPhone = payload;
    },
    resetSelectedNewMainPhone: (state) => {
      state.selectedMainPhone = '';
    },
    resetAddressSuccess: (state) => {
      state.addressChangeSuccess = false;
    },
    setSelectAllChanges: (state, { payload }) => {
      state.selectAllChanges = payload;
    },
    setSelectAllNews: (state, { payload }) => {
      state.selectAllNews = payload;
    },
    setResetUserInfo: (state) => {
      state.userInfoById = {};
      state.additionalInfo = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileInfo.fulfilled, (state, { payload }) => {
        state.emails = payload.contacts.emails;
        state.showSchedules = payload.showSchedule;
        state.schedules = payload.schedule;
        state.languages = payload.languages.languages;
        state.skills = payload.skills.skills;
        state.phoneNumbers = payload.contacts.phoneNumbers;
        state.mobilePhoneNumbers = payload.contacts.mobilePhoneNumbers;
        state.addresses = payload.addresses;
        state.personal = payload.personalInfo;
        state.mainPhone = payload.contacts.mainPhone;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserProfileInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUserProfileInfoView.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileInfoView.fulfilled, (state, { payload }) => {
        state.emails = payload.contacts.emails;
        state.showSchedules = payload.showSchedule;
        state.schedules = payload.schedule;
        state.languages = payload.languages.languages;
        state.skills = payload.skills.skills;
        state.phoneNumbers = payload.contacts.phoneNumbers;
        state.mobilePhoneNumbers = payload.contacts.mobilePhoneNumbers;
        state.addresses = payload.addresses;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserProfileInfoView.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUserProfileInfoChangesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileInfoChangesById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userInfoById = payload;
        state.contactsById = payload.contacts;
        state.addressesById = payload.addresses;
        state.schedules = payload.schedule;
        state.languagesById = payload.languages;
        state.skillsById = payload.skills;
        state.personalChanges = payload.personalInfo;

        const newContactCount = Object.values(payload.contacts?.new || {}).reduce(
          (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
          0
        );
        const newAddressCount = Object.values(payload.addresses?.new || {}).reduce(
          (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
          0
        );
        const newSkillCount = payload.skills?.new?.length || 0;

        const newLanguageCount = payload.languages?.new?.length || 0;
        state.newCount = newContactCount + newAddressCount + newSkillCount + newLanguageCount;

        const updateContactCount = Object.values(payload.contacts?.update || {}).reduce(
          (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
          0
        );
        const updateAddressCount = Object.values(payload.addresses?.update || {}).reduce(
          (acc, items) => acc + (Array.isArray(items) ? items.length : 0),
          0
        );
        const updateSkillCount = payload.skills?.update?.length || 0;
        const updateLanguageCount = payload.languages?.update?.length || 0;
        const personalUpdatesCount =
          payload.personalInfo === null
            ? 0
            : Object.values(payload.personalInfo).filter((item) => typeof item === 'object')
                .length;

        const mainPhoneCount = payload.contacts.update.mainPhone.uuid === null ? 0 : 1;

        state.updateCount =
          updateContactCount +
          updateAddressCount +
          updateSkillCount +
          updateLanguageCount +
          personalUpdatesCount +
          mainPhoneCount;
      })
      .addCase(getUserProfileInfoChangesById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addProfileContactsEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createContactsEmailSuccess = null;
      })
      .addCase(addProfileContactsEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data = payload;
        state.createContactsEmailSuccess = true;
      })
      .addCase(addProfileContactsEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.createContactsEmailSuccess = null;
      })
      .addCase(addProfileContactsPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createContactsNumbersSuccess = null;
      })
      .addCase(addProfileContactsPhone.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data = payload;
        state.createContactsNumbersSuccess = true;
      })
      .addCase(addProfileContactsPhone.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.createContactsNumbersSuccess = null;
      })
      .addCase(updateProfileContactsPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateContactsNumbersSuccess = null;
      })
      .addCase(updateProfileContactsPhone.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data = payload;
        state.updateContactsNumbersSuccess = true;
      })
      .addCase(updateProfileContactsPhone.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.updateContactsNumbersSuccess = null;
      })
      .addCase(deleteContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateContactsNumbersSuccess = false;
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data = payload;
        state.updateContactsNumbersSuccess = true;
      })
      .addCase(deleteContacts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.updateContactsNumbersSuccess = false;
      })
      .addCase(updateProfileContactsEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateContactsEmailSuccess = null;
      })
      .addCase(updateProfileContactsEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.updateContactsEmailSuccess = true;
      })
      .addCase(updateProfileContactsEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.updateContactsEmailSuccess = null;
      })
      .addCase(getAdditionalInfo.pending, (state) => {
        state.additionalInfoLoading = true;
        state.error = null;
      })
      .addCase(getAdditionalInfo.fulfilled, (state, { payload }) => {
        state.additionalInfoLoading = false;
        state.error = null;
        state.additionalInfo = payload;
      })
      .addCase(getAdditionalInfo.rejected, (state, { payload }) => {
        state.additionalInfoLoading = false;
        state.error = payload;
      })
      .addCase(createSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = null;
      })
      .addCase(createSkills.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.createSuccess = true;
      })
      .addCase(createSkills.rejected, (state, { payload }) => {
        state.createSuccess = null;
        state.loading = false;
        state.error = payload;
      })
      .addCase(editSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSkillsSuccess = null;
      })
      .addCase(editSkills.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.updateSkillsSuccess = true;
      })
      .addCase(editSkills.rejected, (state, { payload }) => {
        state.updateSkillsSuccess = null;
        state.loading = false;
        state.error = payload;
      })
      .addCase(editLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateLanguagesSuccess = null;
      })
      .addCase(editLanguages.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.updateLanguagesSuccess = true;
      })
      .addCase(editLanguages.rejected, (state, { payload }) => {
        state.updateLanguagesSuccess = null;
        state.loading = false;
        state.error = payload;
      })
      .addCase(createLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createLanguagesSuccess = null;
      })
      .addCase(createLanguages.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.createLanguagesSuccess = true;
      })
      .addCase(createLanguages.rejected, (state, { payload }) => {
        state.createLanguagesSuccess = null;
        state.loading = false;
        state.error = payload;
      })
      .addCase(uploadProfilePic.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
        state.avatarUploadSuccess = false;
      })
      .addCase(uploadProfilePic.fulfilled, (state) => {
        state.uploadLoading = false;
        state.avatarUploadSuccess = true;
        state.error = null;
      })
      .addCase(uploadProfilePic.rejected, (state) => {
        state.uploadLoading = false;
        state.avatarUploadSuccess = false;
      })
      .addCase(editAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addressChangeSuccess = false;
      })
      .addCase(editAddress.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.addressChangeSuccess = true;
      })
      .addCase(editAddress.rejected, (state, { payload }) => {
        state.addressChangeSuccess = false;
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addressChangeSuccess = false;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.loading = false;
        state.addressChangeSuccess = true;
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, { payload }) => {
        state.addressChangeSuccess = false;
        state.loading = false;
        state.error = payload;
      })
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.addressChangeSuccess = false;
        state.error = null;
        state.createAddressesSuccess = null;
      })
      .addCase(createAddress.fulfilled, (state) => {
        state.loading = false;
        state.addressChangeSuccess = true;
        state.error = null;
        state.createAddressesSuccess = true;
      })
      .addCase(createAddress.rejected, (state, { payload }) => {
        state.createAddressesSuccess = null;
        state.addressChangeSuccess = false;
        state.loading = false;
        state.error = payload;
      })
      .addCase(updatePersonalInfo.pending, (state) => {
        state.loading = true;
        state.personalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(updatePersonalInfo.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.personalUpdateSuccess = true;
      })
      .addCase(updatePersonalInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.personalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(editAdditionalInfo.pending, (state) => {
        state.loading = true;
        state.additionalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(editAdditionalInfo.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.additionalUpdateSuccess = true;
      })
      .addCase(editAdditionalInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.additionalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(approveRejectMainPhone.pending, (state) => {
        state.loading = true;
        state.additionalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(approveRejectMainPhone.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.additionalUpdateSuccess = true;
      })
      .addCase(approveRejectMainPhone.rejected, (state, { payload }) => {
        state.loading = false;
        state.additionalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(approveRejectAddressesUpdates.pending, (state) => {
        state.loading = true;
        state.additionalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(approveRejectAddressesUpdates.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.additionalUpdateSuccess = true;
      })
      .addCase(approveRejectAddressesUpdates.rejected, (state, { payload }) => {
        state.loading = false;
        state.additionalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(approveRejectSkillsUpdates.pending, (state) => {
        state.loading = true;
        state.additionalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(approveRejectSkillsUpdates.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.additionalUpdateSuccess = true;
      })
      .addCase(approveRejectSkillsUpdates.rejected, (state, { payload }) => {
        state.loading = false;
        state.additionalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(approveRejectPersonalUpdates.pending, (state) => {
        state.loading = true;
        state.additionalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(approveRejectPersonalUpdates.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.additionalUpdateSuccess = true;
      })
      .addCase(approveRejectPersonalUpdates.rejected, (state, { payload }) => {
        state.loading = false;
        state.additionalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(approveRejectLanguagesUpdates.pending, (state) => {
        state.loading = true;
        state.additionalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(approveRejectLanguagesUpdates.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.additionalUpdateSuccess = true;
      })
      .addCase(approveRejectLanguagesUpdates.rejected, (state, { payload }) => {
        state.loading = false;
        state.additionalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(approveRejectContactUpdates.pending, (state) => {
        state.loading = true;
        state.additionalUpdateSuccess = false;
        state.error = null;
      })
      .addCase(approveRejectContactUpdates.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.additionalUpdateSuccess = true;
      })
      .addCase(approveRejectContactUpdates.rejected, (state, { payload }) => {
        state.loading = false;
        state.additionalUpdateSuccess = false;
        state.error = payload;
      })
      .addCase(assignSchedule.pending, (state) => {
        state.error = null;
        state.success = false;
      })
      .addCase(assignSchedule.fulfilled, (state, { payload }) => {
        state.schedules = payload;
        state.error = null;
        state.success = true;
      })
      .addCase(assignSchedule.rejected, (state, { payload }) => {
        state.success = false;
        state.error = payload;
      })
      .addCase(assignNewSchedule.pending, (state) => {
        state.error = null;
        state.success = false;
      })
      .addCase(assignNewSchedule.fulfilled, (state, { payload }) => {
        state.schedules = payload;
        state.error = null;
        state.success = true;
      })
      .addCase(assignNewSchedule.rejected, (state, { payload }) => {
        state.success = false;
        state.error = payload;
      })
      .addCase(editAssignedSchedule.pending, (state) => {
        state.error = null;
        state.success = false;
      })
      .addCase(editAssignedSchedule.fulfilled, (state, { payload }) => {
        state.schedules = payload;
        state.error = null;
        state.success = true;
      })
      .addCase(editAssignedSchedule.rejected, (state, { payload }) => {
        state.success = false;
        state.error = payload;
      });
  },
});

export const {
  setCreateDepartmentStateStatus,
  setSelectedNewContacts,
  resetSelectedNewContacts,
  setSelectedNewAddresses,
  resetSelectedNewAddresses,
  setSelectedNewLanguages,
  resetSelectedNewLanguages,
  setSelectedNewSkills,
  resetSelectedNewSkills,
  setSelectedProfileChanges,
  resetSelectedProfileChanges,
  resetPersonalInfoSuccess,
  resetAdditionalUpdateSuccess,
  setSelectedNewMainPhone,
  resetSelectedNewMainPhone,
  resetAddressSuccess,
  setSelectAllChanges,
  setSelectAllNews,
  setResetUserInfo,
} = profileSlice.actions;

export const selectError = (state) => state.profile.error;
export const selectAllSelectedChanges = (state) => state.profile.selectAllChanges;
export const selectAllSelectedNews = (state) => state.profile.selectAllNews;
export const selectEmails = (state) => state.profile.emails;
export const selectPhones = (state) => state.profile.phoneNumbers;
export const selectMobilePhones = (state) => state.profile.mobilePhoneNumbers;
export const selectLoading = (state) => state.profile.loading;
export const selectAdditionalUpdateSuccess = (state) => state.profile.additionalUpdateSuccess;
export const selectPersonalUpdateSuccess = (state) => state.profile.personalUpdateSuccess;
export const selectUploadLoading = (state) => state.profile.uploadLoading;
export const selectContactsById = (state) => state.profile.contactsById;
export const selectAddressesById = (state) => state.profile.addressesById;
export const selectLanguagesById = (state) => state.profile.languagesById;
export const selectSkillsById = (state) => state.profile.skillsById;
export const selectNewChangesCount = (state) => state.profile.newCount;
export const selectUpdateChangesCount = (state) => state.profile.updateCount;
export const selectSelectedNewContacts = (state) => state.profile.selectedNewContacts;
export const selectSelectedNewAddresses = (state) => state.profile.selectedNewAddresses;
export const selectAddresses = (state) => state.profile.addresses;
export const selectLanguages = (state) => state.profile.languages;
export const selectAdditionalInfo = (state) => state.profile.additionalInfo;
export const selectAdditionalInfoLoading = (state) => state.profile.additionalInfoLoading;
export const selectSelectedNewLanguages = (state) => state.profile.selectedNewLanguages;
export const selectSkills = (state) => state.profile.skills;
export const selectSelectedNewSkills = (state) => state.profile.selectedNewSkills;
export const selectCreateSuccess = (state) => state.profile.createSuccess;
export const selectAvatarUploadSuccess = (state) => state.profile.avatarUploadSuccess;
export const selectUpdateSkillsSuccess = (state) => state.profile.updateSkillsSuccess;
export const selectUpdateLanguagesSuccess = (state) => state.profile.updateLanguagesSuccess;
export const selectCreateLanguagesSuccess = (state) => state.profile.createLanguagesSuccess;
export const selectPersonalInfoUpdates = (state) => state.profile.personalChanges;
export const selectPersonalChangeIds = (state) => state.profile.selectedProfileChanges;
export const selectCreateAddressesSuccess = (state) => state.profile.createAddressesSuccess;
export const selectPersonalInfo = (state) => state.profile.personal;
export const selectMainPhone = (state) => state.profile.mainPhone;
export const selectAddressSuccess = (state) => state.profile.addressChangeSuccess;
export const selectSelectedMainPhone = (state) => state.profile.selectedMainPhone;
export const selectCreateContactsEmailSuccess = (state) =>
  state.profile.createContactsEmailSuccess;
export const selectUpdateContactsEmailSuccess = (state) =>
  state.profile.updateContactsEmailSuccess;
export const selectCreateContactsNumbersSuccess = (state) =>
  state.profile.createContactsNumbersSuccess;
export const selectUpdateContactsNumbersSuccess = (state) =>
  state.profile.updateContactsNumbersSuccess;
export const selectSchedule = (state) => state.profile.schedules;
export const selectShowSchedule = (state) => state.profile.showSchedules;

export default profileSlice.reducer;
