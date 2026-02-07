import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'api/TokenService';
import ApiClient from 'api/axiosClient';
import { notifySuccess } from 'utils/notifyConfig';

export const registerPhone = createAsyncThunk(
  'auth/register/phone',
  async ({ token, phoneNumber }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/auth/register-phone', {
        token,
        phoneNumber,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const setPassword = createAsyncThunk(
  'auth/register/phone',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/auth/register', {
        token,
        password,
      });
      return notifySuccess(data?.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verify/phone',
  async ({ token, otp, action }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/auth/verify-otp', {
        token,
        otp,
        action,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changePhone = createAsyncThunk(
  'auth/phone/change',
  async ({ phoneNumber }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/auth/change-phone-number', {
        phoneNumber,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const data = await ApiClient.post('/auth/login', { login, password });
      if (data?.accessToken && data.refreshToken) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        // notifyError(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        // notifyError('An unexpected error occurred');
        return rejectWithValue(error.message);
      }
    }
  }
);

export const adminNewPassword = createAsyncThunk(
  'auth/super-admin/new/pass',
  async ({ newPassword }, { rejectWithValue }) => {
    try {
      await ApiClient.post('/auth/new-password/admin', { newPassword });
      removeAccessToken();
      removeRefreshToken();
    } catch (error) {
      if (error.response && error.response.data.message) {
        // notifyError(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        // notifyError('An unexpected error occurred');
        return rejectWithValue(error.message);
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgot',
  async ({ email }, { rejectWithValue }) => {
    try {
      await ApiClient.post('/auth/recover-password', {
        email,
      });
      return { success: true };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const setNewPassword = createAsyncThunk(
  'auth/forgot/new',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      await ApiClient.post('/auth/new-password', {
        token,
        newPassword,
      });
      return { success: true };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await ApiClient.post('/auth/log-out');
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getPhoneNumber = createAsyncThunk(
  'auth/user/info',
  async (token, { rejectWithValue }) => {
    try {
      const data = await ApiClient.get(`/auth/invite-password/${token}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const deleteUser = createAsyncThunk(
//   "auth/user/delete",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await ApiClient.del("/v1/user/delete/user");
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const updateUserInfo = createAsyncThunk(
//   "user/info/update",
//   async (
//     {
//       first_name,
//       last_name,
//       email,
//       birthday,
//       sex,
//       phone_number,
//       receiver_address,
//       username,
//       passport,
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await ApiClient.patch("/v1/user/info/", {
//         first_name,
//         last_name,
//         email,
//         birthday,
//         sex,
//         phone_number,
//         receiver_address,
//         username,
//         passport,
//       });
//       if (data?.accessToken && data.refreshToken) {
//         setAccessToken(data.accessToken);
//         setRefreshToken(data.refreshToken);
//       }
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const updatePassword = createAsyncThunk(
//   "auth/password/update",
//   async ({ oldPassword, newPassword }, { rejectWithValue }) => {
//     try {
//       await ApiClient.post("/v1/user/password/reset", {
//         old_password: oldPassword.value,
//         new_password: newPassword.value,
//       });
//       return { success: true };
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const getUserInfo = createAsyncThunk('get/contact', async (_, { rejectWithValue }) => {
  try {
    const { user } = await ApiClient.get('/users/me');
    return user;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
