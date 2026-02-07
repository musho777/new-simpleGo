import { notifyError } from 'utils/notifyConfig';

export const handleApiRequest = async (apiRequestFn, thunkAPI, showNotification = false) => {
  try {
    const response = await apiRequestFn();
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    if (showNotification) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'An error occurred.';
        notifyError(errorMessage);
      } else {
        notifyError('An error occurred.');
      }
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
};

export const handleApiError = (error, thunkAPI) => {
  if (error.response && error.response.data.message) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  } else {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const handleApiResponse = async (response, errorMessage = null, showNotification) => {
  if (response.status !== 'ok') {
    const message = errorMessage || response.error.text;

    if (showNotification) {
      notifyError(message);
    }

    throw new Error(message);
  }

  return response.data;
};
