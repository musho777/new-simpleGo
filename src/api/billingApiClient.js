import axios from 'axios';
import { notifyError } from 'utils/notifyConfig';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from './TokenService';

let logoutInitiated = false;

class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiError extends AppError {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const baseURL = process.env.REACT_APP_BILLING_API_URL;

const client = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    const message = error.response ? error.response.data?.message : null;
    const originalRequest = error.config;

    if (status === 401) {
      if (message === 'Unauthorized' && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            throw new ApiError('No refresh token available', 401);
          }
          const response = await axios.post(
            `${baseURL}auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const { accessToken } = response.data;
          setAccessToken(accessToken);

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return client(originalRequest);
        } catch (err) {
          removeAccessToken();
          removeRefreshToken();
          localStorage.clear();
          notifyError('Session expired. Please log in again.');
          window.location.replace('/login');
          throw new ApiError('Failed to refresh access token', 401);
        }
      } else {
        if (!logoutInitiated) {
          logoutInitiated = true;
          notifyError('Session expired. Please log in again.');
          localStorage.clear();
          removeAccessToken();
          removeRefreshToken();
          window.location.replace('/login');
        }
        throw new ApiError(message || 'Authentication error', status);
      }
    } else if (status === 404) {
      throw new ApiError(message || 'Resource not found', 404);
    } else if (status === 400) {
      const messages = Array.isArray(message) ? message : [message];
      if (messages.some((item) => item.endsWith('id must be uuid'))) {
        window.location.replace('/not-found');
      }
      throw new ApiError(messages.join('\n') || 'Resource not found', 400);
    } else if (status === 409) {
      // Handle lead lock conflicts - preserve the response data for the lead lock system
      const apiError = new ApiError(message || 'Resource conflict', 409);
      // Preserve additional conflict data from the response
      const responseData = error.response?.data || {};
      apiError.lockedBy = responseData.lockedBy;
      apiError.leadId = responseData.leadId;
      throw apiError;
    } else if (status === 500) {
      throw new ApiError(message || 'Internal Server Error', 500);
    } else {
      throw new ApiError(message || 'An unexpected error occurred', status || 500);
    }
  }
);

const request = async (options, customClient = null) => {
  const axiosInstance = customClient || client;
  try {
    const response = await axiosInstance(options);
    return response;
  } catch (error) {
    // If it's already an ApiError (from interceptor), just re-throw it
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle other errors
    if (error.response) {
      const { data, status } = error.response;
      throw new Error(`${status}: ${data?.error?.text || 'Unknown Error'}`);
    }
    throw error;
  }
};

const get = async (url, options = {}, customClient = null) => {
  return request(
    {
      method: 'GET',
      url,
      ...options,
    },
    customClient
  );
};

const post = async (url, data, headers = {}, options = {}, customClient = null) => {
  const requestHeaders = {
    'Content-type': 'application/json',
    ...headers,
  };

  return request(
    {
      method: 'POST',
      url,
      data,
      headers: requestHeaders,
      ...options,
    },
    customClient
  );
};

const patch = async (url, data, headers = {}, options = {}, customClient = null) => {
  const requestHeaders = {
    'Content-type': 'application/json',
    ...headers,
  };

  return request(
    {
      method: 'PATCH',
      url,
      data,
      headers: requestHeaders,
      ...options,
    },
    customClient
  );
};

const put = async (url, data, options = {}, customClient = null) => {
  return request(
    {
      method: 'PUT',
      url,
      data,
      ...options,
    },
    customClient
  );
};

const del = async (url, options = {}, customClient = null) => {
  return request(
    {
      method: 'DELETE',
      url,
      ...options,
    },
    customClient
  );
};

const billingApiClient = {
  ApiError,
  get,
  post,
  patch,
  put,
  del,
};

export default billingApiClient;
