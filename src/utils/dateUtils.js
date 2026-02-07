import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY';
// const DATE_TIME_FORMAT = `${DATE_FORMAT} HH:mm`;
const BACKEND_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Formats a date and time.
 * @param {string|Date} date - The date to format.
 * @param {boolean} forBack - Whether to format for the backend (YYYY-MM-DD).
 * @param {boolean} withTime - Whether to include the time in the formatted result.
 * @param {string} customDateFormat - Custom date format (optional).
 * @returns {string} The formatted date and time.
 */

export const formatDateTime = (date, forBack = false, withTime = false, customDateFormat) => {
  if (!date) {
    return;
  }

  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) {
    return date;
  }

  if (forBack) {
    return dayjs(date).format(BACKEND_DATE_FORMAT);
  }

  let formatString;
  if (customDateFormat) {
    formatString = customDateFormat;
  } else {
    formatString = withTime ? 'DD/MM/YYYY HH:mm:ss' : 'MMMM D, YYYY';
  }

  try {
    return dayjs(date).format(formatString);
  } catch (error) {
    return '-- --';
  }
};

export const daysLeftUntil30Days = (dateString) => {
  const givenDate = new Date(dateString);
  const targetDate = new Date(givenDate);
  targetDate.setDate(givenDate.getDate() + 30);

  const today = new Date();
  const timeDifference = targetDate - today;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft > 0 ? daysLeft : 0;
};

export const getPreviousDate = () => {
  const currentDate = new Date(); // Get current date and time
  currentDate.setDate(currentDate.getDate() - 1); // Subtract 1 day

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const readableDateFormat = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  // Calculate time difference in days
  const diffInTime = now - date;
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  const timePart = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Optional: use 12-hour format
  });

  if (diffInDays === 0) {
    return `Today at ${timePart}`;
  } else if (diffInDays === 1) {
    return `Yesterday at ${timePart}`;
  } else {
    const datePart = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return `${datePart} at ${timePart}`;
  }
};

export const getTimeFromDate = (dateInput) => {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return '';

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} h`);
  if (mins > 0) parts.push(`${mins} m`);

  return parts.join(' ') || '0 minutes';
};
