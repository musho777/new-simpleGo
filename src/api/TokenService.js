import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (accessToken) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken);
};

export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (refreshToken) => {
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
};

export const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN_KEY);
};
