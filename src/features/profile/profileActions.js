import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';
import { notifyError } from 'utils/notifyConfig';

const removeEmptyFields = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => removeEmptyFields(item));
  } else if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([, value]) => value !== '')
        .map(([key, value]) => [key, removeEmptyFields(value)])
    );
  }
  return data;
};

export const getUserProfileInfo = createAsyncThunk(
  'profile/info',
  async (uuid, { rejectWithValue }) => {
    try {
      const userId = uuid || 'my';
      const response = await ApiClient.get(`/users/info/${userId}`);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        // notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserProfileInfoView = createAsyncThunk(
  'profile/info/view',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/users/info/view/${uuid}`);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAdditionalInfo = createAsyncThunk(
  'profile/info/additional',
  async (uuid, { rejectWithValue }) => {
    try {
      const userId = uuid || 'my';
      const response = await ApiClient.get(`/users/info/additional/${userId}`);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        // notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editAdditionalInfo = createAsyncThunk(
  'profile/additional/edit',
  async ({ userType, data, uuid }, { rejectWithValue }) => {
    try {
      const url =
        userType === 'Super Admin'
          ? `/users/personal/edit-super/${uuid}`
          : `/users/personal/edit/${uuid}`;

      await ApiClient.patch(url, {
        ...data,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserProfileInfoChangesById = createAsyncThunk(
  'profile/info/changes',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/users/info/changes/${uuid}`);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        // notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addProfileContactsEmail = createAsyncThunk(
  'profile/contacts/emails',
  async ({ newEmails, uuid, userType }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/contacts/emails/add-super/${uuid}`
        : `/profile/contacts/emails/add/${uuid}`
      : '/profile/contacts/emails';

    try {
      const response = await ApiClient.post(url, { newEmails });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addProfileContactsPhone = createAsyncThunk(
  'profile/contacts/phones',
  async ({ isMobile, newPhones, userType, uuid }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/contacts/phones/add-super/${uuid}`
        : `/profile/contacts/phones/add/${uuid}`
      : '/profile/contacts/phones';

    try {
      const response = await ApiClient.post(url, {
        isMobile,
        newPhones,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const uploadProfilePic = createAsyncThunk(
  'profile/avatar',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/users/photo', formData, {
        'Content-Type': 'multipart/form-data',
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfileContactsPhone = createAsyncThunk(
  'profile/contacts/phones/update',
  async ({ isMobile, phoneChanges, userType, uuid }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/contacts/phones/edit-super/${uuid}`
        : `/profile/contacts/phones/edit/${uuid}`
      : '/profile/contacts/phones';

    try {
      const response = await ApiClient.patch(url, {
        isMobile,
        phoneChanges,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePersonalInfo = createAsyncThunk(
  'profile/personal/info/update',
  async ({ userType, data, uuid }, { rejectWithValue }) => {
    try {
      const url = uuid
        ? userType === 'Super Admin'
          ? `/users/name/edit-super/${uuid}`
          : `/users/name/edit/${uuid}`
        : '/users/personal';

      await ApiClient.patch(url, {
        ...data,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const approveRejectContactUpdates = createAsyncThunk(
  'profile/updates/approve/reject/contact',
  async ({ userType, contactChangeIds, approve }, { rejectWithValue }) => {
    try {
      const url =
        userType === 'Super Admin'
          ? '/profile/contacts/approve-super'
          : '/profile/contacts/approve';

      await ApiClient.post(url, {
        approve,
        contactChangeIds,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const approveRejectAddressesUpdates = createAsyncThunk(
  'profile/updates/approve/reject/address',
  async ({ userType, addressChangeIds, approve }, { rejectWithValue }) => {
    try {
      const url =
        userType === 'Super Admin'
          ? '/profile/address/approve-super'
          : '/profile/address/approve';

      await ApiClient.post(url, {
        approve,
        addressChangeIds,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const approveRejectLanguagesUpdates = createAsyncThunk(
  'profile/updates/approve/reject/languages',
  async ({ userType, languageChangeIds, approve }, { rejectWithValue }) => {
    try {
      const url =
        userType === 'Super Admin'
          ? '/profile/languages/approve-super'
          : '/profile/languages/approve';

      await ApiClient.post(url, {
        approve,
        languageChangeIds,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createAddress = createAsyncThunk(
  'profile/addresses/create',
  async ({ addresses, userType, uuid, type }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/address/add-super/${uuid}`
        : `/profile/address/add/${uuid}`
      : '/profile/address';

    try {
      const cleanedParams = removeEmptyFields(addresses);

      const response = await ApiClient.post(url, { addresses: cleanedParams, type });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const approveRejectMainPhone = createAsyncThunk(
  'profile/main/phone/approve/reject',
  async ({ approve, contactChangeId }, { rejectWithValue }) => {
    try {
      const contactId = Array.isArray(contactChangeId) ? contactChangeId[0] : contactChangeId;
      const response = await ApiClient.post('/profile/contacts/main-phone/approve', {
        approve,
        contactChangeId: contactId,
      });

      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createLanguages = createAsyncThunk(
  'profile/languages/create',
  async ({ languages, userType, uuid }, { rejectWithValue }) => {
    try {
      const cleanedParams = removeEmptyFields(languages);
      const url = uuid
        ? userType === 'Super Admin'
          ? `/profile/languages/add-super/${uuid}`
          : `/profile/languages/add/${uuid}`
        : '/profile/languages';

      const response = await ApiClient.post(url, { languages: cleanedParams });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfileContactsEmail = createAsyncThunk(
  'profile/contacts/emails/update',
  async ({ emailChanges, userType, uuid }, { rejectWithValue }) => {
    try {
      const cleanedParams = removeEmptyFields(emailChanges);
      const url = uuid
        ? userType === 'Super Admin'
          ? `/profile/contacts/emails/edit-super/${uuid}`
          : `/profile/contacts/emails/edit/${uuid}`
        : '/profile/contacts/emails';

      const response = await ApiClient.patch(url, { emailChanges: cleanedParams });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editLanguages = createAsyncThunk(
  'profile/languages/edit',
  async ({ languageChanges, userType, uuid }, { rejectWithValue }) => {
    try {
      const cleanedParams = removeEmptyFields(languageChanges);
      const url = uuid
        ? userType === 'Super Admin'
          ? `/profile/languages/edit-super/${uuid}`
          : `/profile/languages/edit/${uuid}`
        : '/profile/languages';

      const response = await ApiClient.patch(url, { languageChanges: cleanedParams });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteLanguages = createAsyncThunk(
  'profile/languages/delete',
  async ({ languageIds, userType, uuid }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/languages/delete-super/${uuid}`
        : `/profile/languages/delete/${uuid}`
      : '/profile/languages';

    try {
      await ApiClient.del(url, { data: { languageIds } });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'profile/contacts/delete',
  async ({ contactIds, userType, uuid }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/contacts/delete-super/${uuid}`
        : `/profile/contacts/delete/${uuid}`
      : '/profile/contacts';
    try {
      const response = await ApiClient.del(url, { data: { contactIds } });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const approveRejectSkillsUpdates = createAsyncThunk(
  'profile/updates/approve/reject/skills',
  async ({ userType, skillChangeIds, approve }, { rejectWithValue }) => {
    try {
      const url =
        userType === 'Super Admin'
          ? '/profile/skills/approve-super'
          : '/profile/skills/approve';

      await ApiClient.post(url, {
        approve,
        skillChangeIds,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const approveRejectPersonalUpdates = createAsyncThunk(
  'profile/updates/approve/reject/personal',
  async ({ userType, changeId, approve }, { rejectWithValue }) => {
    try {
      const url =
        userType === 'Super Admin' ? '/users/name/approve-super' : '/users/name/approve';

      await ApiClient.post(url, {
        approve,
        changeId,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createSkills = createAsyncThunk(
  'profile/skills/create',
  async ({ skills, userType, uuid }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/skills/add-super/${uuid}`
        : `/profile/skills/add/${uuid}`
      : '/profile/skills';

    try {
      const cleanedParams = removeEmptyFields(skills);

      const response = await ApiClient.post(url, {
        skills: cleanedParams,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editAddress = createAsyncThunk(
  'profile/addresses/edit',
  async ({ userType, uuid, addressChanges, type }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/address/edit-super/${uuid}`
        : `/profile/address/edit/${uuid}`
      : '/profile/address';

    try {
      const cleanedParams = removeEmptyFields(addressChanges);

      const response = await ApiClient.patch(url, { addressChanges: cleanedParams, type });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editSkills = createAsyncThunk(
  'profile/skills/edit',
  async ({ skillChanges, userType, uuid }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/skills/edit-super/${uuid}`
        : `/profile/skills/edit/${uuid}`
      : '/profile/skills';

    try {
      const cleanedParams = removeEmptyFields(skillChanges);

      const response = await ApiClient.patch(url, {
        skillChanges: cleanedParams,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteSkills = createAsyncThunk(
  'profile/skills/delete',
  async ({ skillIds, uuid, userType }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/skills/delete-super/${uuid}`
        : `/profile/skills/delete/${uuid}`
      : '/profile/skills';

    try {
      await ApiClient.del(url, { data: { skillIds } });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteAddress = createAsyncThunk(
  'profile/address/delete',
  async ({ addressIds, userType, uuid }, { rejectWithValue }) => {
    const url = uuid
      ? userType === 'Super Admin'
        ? `/profile/address/delete-super/${uuid}`
        : `/profile/address/delete/${uuid}`
      : '/profile/address';

    try {
      await ApiClient.del(url, { data: { addressIds } });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editAssignedSchedule = createAsyncThunk(
  'schedules/assigned/edit',
  async ({ params, uuid }, { rejectWithValue }) => {
    try {
      return await ApiClient.patch(`/schedules/assign/${uuid}`, params);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const assignSchedule = createAsyncThunk(
  'schedules/assign',
  async ({ params, uuid }, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/schedules/assign/${uuid}`, params);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const assignNewSchedule = createAsyncThunk(
  'schedules/assign/new',
  async ({ params, uuid }, { rejectWithValue }) => {
    try {
      return await ApiClient.post(`/schedules/assign/new/${uuid}`, params);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        notifyError(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
