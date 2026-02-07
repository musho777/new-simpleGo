/**
 * Checks if a variable is an object.
 * @param {*} variable - The variable to check.
 * @returns {boolean} - Returns true if the variable is an object, false otherwise.
 */
export const isObject = (variable) => {
  return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
};

/**
 * Checks if an object is empty (has no properties).
 * @param {*} value - The object to check.
 * @returns {boolean} - Returns true if the object is empty, false otherwise.
 */
export const isObjectEmpty = (value) => {
  return isObject(value) && Object.keys(value).length === 0 && value.constructor === Object;
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} word - The string to capitalize.
 * @returns {string} - Returns the capitalized string.
 */
export const capitalizeFirstLetter = (word) => {
  if (typeof word !== 'string' || word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Generates an array of options with 'value' and 'label' properties from the input.
 * @param {Array} options - Array of options. Each option can be a string or an object.
 * @param {string} valueKey - The key to be used for the 'value' property in case of objects.
 * @param {string} labelKey - The key to be used for the 'label' property in case of objects.
 * @param {object} defaultOption - An optional default option to be included in the result.
 * @returns {Array} An array of objects with 'value' and 'label' properties.
 */
export const generateOptions = (
  options,
  defaultOption = null,
  valueKey = 'value',
  labelKey = 'label',
  extraKeys = []
) => {
  if (!Array.isArray(options)) {
    return [];
  }

  const optionArray = options
    .map((option) => {
      if (typeof option === 'string') {
        return {
          value: option,
          canDelete: option.canDelete ?? true,
          label: capitalizeFirstLetter(option.trim()),
        };
      } else if (isObject(option) && !isObjectEmpty(option)) {
        let optionObj = {
          value: option.uuid || option[valueKey] || option.id || option.name,
          label: option.name || option[labelKey] || option.label || option.title,
          userType: option.userType,
          canDelete: option.canDelete ?? true,
          isTeam: option.isTeam ?? null,
          id: option.id ?? null,
        };

        extraKeys.forEach((key) => {
          if (option[key] !== undefined) {
            optionObj[key] = option[key];
          }
        });

        return optionObj;
      } else {
        return null;
      }
    })
    .filter((option) => option !== null);

  if (defaultOption !== null && isObject(defaultOption)) {
    optionArray.unshift(defaultOption);
  }

  return optionArray;
};

/**
 * Generate a random color in hexadecimal format.
 * @returns {string} Random color in hexadecimal format (e.g., "#RRGGBB").
 */
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  const colorLength = 6;
  let color = '#';

  for (let i = 0; i < colorLength; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}

/**
 * Splits a string into an array of words, removing punctuation and converting to lowercase.
 *
 * @param {string} str - The input string to process.
 * @returns {string[]} An array of words extracted from the input string, or an empty array if no input string is provided.
 */
export function getWordsFromString(str) {
  if (typeof str !== 'string' || str.trim() === '') {
    return [];
  }

  const words = str
    .toLowerCase()
    // eslint-disable-next-line no-useless-escape
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  return words;
}

/**
 * Formats a number with specified options.
 * @param {number} number - The number to format.
 * @param {number} [decimalPlaces = 2] - The number of decimal places to round to.
 * @param {boolean} [useThousandsSeparator = false] - Whether to use thousands separator.
 * @param {string} [thousandsSeparator = ","] - The character used as thousands separator.
 * @param {string} [decimalSeparator = "."] - The character used as decimal separator.
 * @returns {string} - The formatted number as a string.
 */
export const formatNumber = (
  number,
  decimalPlaces = 2,
  useThousandsSeparator = false,
  thousandsSeparator = ',',
  decimalSeparator = '.'
) => {
  if (typeof number !== 'number') {
    throw new Error('Invalid input. Expected a number.');
  }

  if (isNaN(number)) {
    throw new Error('Invalid number.');
  }

  if (typeof decimalPlaces !== 'number') {
    throw new Error('Invalid decimalPlaces value. Expected a non-negative number.');
  }

  if (typeof useThousandsSeparator !== 'boolean') {
    throw new Error('Invalid useThousandsSeparator value. Expected a boolean.');
  }

  if (
    useThousandsSeparator &&
    (typeof thousandsSeparator !== 'string' || typeof decimalSeparator !== 'string')
  ) {
    throw new Error('Invalid separator. Expected string values.');
  }

  const formatted = number.toFixed(decimalPlaces);

  const parts = formatted.split('.');
  parts[0] = parts[0].replace(
    /\B(?=(\d{3})+(?!\d))/g,
    useThousandsSeparator ? thousandsSeparator : ''
  );

  // Skip decimal part if it's ".00"
  if (parseInt(parts[1]) === 0) {
    return parts[0];
  }

  return parts.join(decimalSeparator);
};

export const debounce = (callback, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const getModifiedKeys = (obj1, obj2) => {
  const result = {};

  Object.keys(obj1).forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (key === 'uuid') {
      result[key] = value1;
      return;
    }

    if (
      typeof value1 === 'object' &&
      typeof value2 === 'object' &&
      value1 !== null &&
      value2 !== null
    ) {
      const nestedResult = getModifiedKeys(value1, value2);

      if (Object.keys(nestedResult).length > 0) {
        result[key] = nestedResult;
      }
    } else if (value1 !== value2) {
      result[key] = value1;
    }
  });

  return result;
};

export const buildQueryString = (params) => {
  if (!params) return;

  return Object.entries(params)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}=${encodeURIComponent(item)}`);
      }
      return value !== undefined && value !== null && value !== ''
        ? `${key}=${encodeURIComponent(value)}`
        : [];
    })
    .join('&');
};

export const createDigitOptions = (start, end) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push({ value: `${i}`, label: `${i}` });
  }
  return options;
};

export const createFormData = (formData, data, parentKey = '') => {
  if (data && typeof data === 'object' && !Array.isArray(data) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;
      createFormData(formData, data[key], fullKey);
    });
  } else if (Array.isArray(data)) {
    data.forEach((value, index) => {
      if (value instanceof File) {
        formData.append(parentKey, value);
      } else {
        const fullKey = `${parentKey}[${index}]`;
        createFormData(formData, value, fullKey);
      }
    });
  } else {
    formData.append(parentKey, data);
  }

  return formData;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BASE_URL_LOCAL
    : process.env.REACT_APP_BASE_URL_SERVER;

export const stripHtmlTags = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const uniqueByUuid = (arr) => {
  const seen = new Set();
  return arr.filter((item) => {
    if (!item?.userId) return false;
    if (seen.has(item.userId)) return false;
    seen.add(item.userId);
    return true;
  });
};

/**
 * @param {string|Date} expirationDate
 * @returns {string}
 */
export const getCountdown = (expirationDate) => {
  if (!expirationDate) return '';

  const now = new Date();
  const expDate = new Date(expirationDate);

  if (isNaN(expDate.getTime())) {
    return 'Invalid date';
  }

  const diffMs = expDate.getTime() - now.getTime();

  // If expired
  if (diffMs <= 0) {
    return 'Expired';
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.ceil(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffDays > 0 && diffDays < 30) {
    return `${diffDays}d`;
  }

  const remainingMonths = diffMonths % 12;
  const remainingDays = diffDays % 30;
  const remainingHours = diffHours % 24;
  const remainingMinutes = diffMinutes % 60;

  const parts = [];

  if (diffYears > 0) {
    parts.push(`${diffYears}y`);
  }

  if (remainingMonths > 0) {
    parts.push(`${remainingMonths}m`);
  }

  if (remainingDays > 0) {
    parts.push(`${remainingDays}d`);
  }

  if (parts.length === 0) {
    if (remainingHours > 0) {
      return `${remainingHours}h`;
    } else if (remainingMinutes > 0) {
      return `${remainingMinutes}min`;
    } else {
      return '< 1min';
    }
  }

  return parts.join(',');
};
