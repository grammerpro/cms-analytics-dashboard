import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

/**
 * Format date to a readable string
 * @param date - Date string or Date object
 * @param format - Format string (default: 'MMM D, YYYY')
 */
export const formatDate = (date: string | Date, format: string = 'MMM D, YYYY'): string => {
  return dayjs(date).format(format);
};

/**
 * Format date with time
 * @param date - Date string or Date object
 */
export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('MMM D, YYYY h:mm A');
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param date - Date string or Date object
 */
export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Format date to ISO string
 * @param date - Date string or Date object
 */
export const formatISO = (date: string | Date): string => {
  return dayjs(date).toISOString();
};

/**
 * Check if date is today
 * @param date - Date string or Date object
 */
export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

/**
 * Check if date is within last N days
 * @param date - Date string or Date object
 * @param days - Number of days
 */
export const isWithinDays = (date: string | Date, days: number): boolean => {
  return dayjs(date).isAfter(dayjs().subtract(days, 'day'));
};

/**
 * Get user-friendly date format
 * Shows "Today", "Yesterday", or formatted date
 * @param date - Date string or Date object
 */
export const formatFriendlyDate = (date: string | Date): string => {
  const d = dayjs(date);
  
  if (d.isSame(dayjs(), 'day')) {
    return 'Today';
  }
  
  if (d.isSame(dayjs().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }
  
  if (d.isAfter(dayjs().subtract(7, 'day'))) {
    return d.fromNow();
  }
  
  return d.format('MMM D, YYYY');
};

export default {
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatISO,
  isToday,
  isWithinDays,
  formatFriendlyDate,
};
