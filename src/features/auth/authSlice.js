import { createSelector, createSlice } from '@reduxjs/toolkit';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from 'api/TokenService';

import {
  adminNewPassword,
  changePhone,
  getPhoneNumber,
  getUserInfo,
  registerPhone,
  userLogin,
  userLogout,
  verifyOtp,
} from './authActions';

const initialState = {
  loading: false,
  userInfo: {},
  accessToken: getAccessToken() || null,
  refreshToken: getRefreshToken() || null,
  error: null,
  success: false,
  successMainPhone: false,
  otp: null,
  otpToken: null,
  isLoginPage: 'login',
  registrationStep: 'stepOne',
  forgetStep: 'stepOne',
  forgetEmail: '',
  userType: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegistrationStep: (state, { payload }) => {
      state.registrationStep = payload;
    },
    setForgetStep: (state, { payload }) => {
      state.forgetStep = payload;
    },
    setForgetEmail: (state, { payload }) => {
      state.forgetEmail = payload;
    },
    resetSuccess: (state) => {
      state.successMainPhone = false;
    },
    resetOtp: (state) => {
      state.otp = null;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        removeAccessToken();
        removeRefreshToken();
        localStorage.clear();
        state.loading = false;
        state.error = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.userInfo = null;
        state.success = false;
      })
      .addCase(userLogout.rejected, (state) => {
        state.loading = false;
        localStorage.clear();
        removeAccessToken();
        removeRefreshToken();
        state.error = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.userInfo = null;
        state.success = false;
      })

      .addCase(getPhoneNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(getPhoneNumber.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(getPhoneNumber.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPhone.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.otp = payload;
      })
      .addCase(registerPhone.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMainPhone = false;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.successMainPhone = true;
        state.otpToken = payload.token;
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.success = false;
        state.successMainPhone = false;
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userType = payload.userType;
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(adminNewPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminNewPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(adminNewPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(changePhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePhone.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.otp = payload.otp;
        state.otpToken = payload.token;
      })
      .addCase(changePhone.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const selectIsLoginPage = (state) => state.auth.isLoginPage;
export const { setRegistrationStep, setForgetStep, setForgetEmail, resetSuccess, resetOtp } =
  authSlice.actions;

export const selectLoading = (state) => state.auth.loading;
export const selectSuccess = (state) => state.auth.success;
export const selectSuccessMainPhone = (state) => state.auth.successMainPhone;
export const selectLoginError = (state) => state.auth.error;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectRegistrationStep = (state) => state.auth.registrationStep;
export const selectForgetStep = (state) => state.auth.forgetStep;
export const selectOtp = (state) => state.auth.otp;
export const selectOtpToken = (state) => state.auth.otpToken;
export const selectAuthSuccess = (state) => state.auth.success;
export const selectForgetEmail = (state) => state.auth.forgetEmail;
export const selectUserType = (state) => state.auth.userType;

export const isAuthorized = createSelector(selectCurrentAccessToken, (accessToken) => {
  return !!accessToken;
});

export default authSlice.reducer;
