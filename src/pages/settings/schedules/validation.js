// utils/timeUtils.js

// Constants for time calculations
export const TimeMinutes = {
  DAY: 1440,
  HOUR: 60,
};

// Helper function to convert "HH:MM" to total minutes since midnight
export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Validates shift, break, and night times.
 * @param {Object} shiftTime - {startTime: 'HH:MM', endTime: 'HH:MM'}
 * @param {Object} breakTime - {startTime: 'HH:MM', endTime: 'HH:MM'}
 * @param {Object} nightTime - {startTime: 'HH:MM', endTime: 'HH:MM'}
 * @param {number} [offsetMinutes=0] - Optional offset for timezone adjustments.
 * @returns {string} - An error message if validation fails, or an empty string if all times are valid.
 */
export function validateTimes(shiftTime, breakTime, nightTime, offsetMinutes = 0) {
  // -------------------- Day Shift --------------------
  let shiftStartMinutes = timeToMinutes(shiftTime.startTime) - offsetMinutes;
  let shiftEndMinutes = timeToMinutes(shiftTime.endTime) - offsetMinutes;
  // Adjust if the shift crosses midnight
  if (shiftStartMinutes > shiftEndMinutes) {
    shiftEndMinutes += TimeMinutes.DAY;
  }

  // -------------------- Break Time --------------------
  let breakStartMinutes = timeToMinutes(breakTime.startTime) - offsetMinutes;
  if (breakStartMinutes < shiftStartMinutes) {
    breakStartMinutes += TimeMinutes.DAY;
  }

  let breakEndMinutes = timeToMinutes(breakTime.endTime) - offsetMinutes;
  if (breakEndMinutes < breakStartMinutes) {
    breakEndMinutes += TimeMinutes.DAY;
  }

  // Validate that break time falls within shift hours
  if (breakEndMinutes > shiftEndMinutes) {
    return 'Please ensure that the break time falls within the shift hours range.';
  }

  // -------------------- Night Shift --------------------
  let nightStartMinutes = timeToMinutes(nightTime.startTime) - offsetMinutes;
  if (nightStartMinutes < shiftEndMinutes) {
    nightStartMinutes += TimeMinutes.DAY;
  }

  let nightEndMinutes = timeToMinutes(nightTime.endTime) - offsetMinutes;
  if (nightEndMinutes < shiftEndMinutes) {
    nightEndMinutes += TimeMinutes.DAY;
  }

  // Validate night time order
  if (nightStartMinutes > nightEndMinutes) {
    return 'Night hours end must be later than start hours.';
  }

  // Validate that the overall time span does not exceed 24 hours
  if (nightEndMinutes - shiftStartMinutes > TimeMinutes.DAY) {
    return 'Please ensure that shift hours fall within a 24-hour range.';
  }

  // No errors: times are valid
  return '';
}
