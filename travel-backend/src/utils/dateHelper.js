import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const getRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

export const isFutureDate = (date) => {
  return dayjs(date).isAfter(dayjs());
};

export const getTomorrow = () => {
  return dayjs().add(1, 'day').startOf('day');
};

export default {
  formatDate,
  getRelativeTime,
  isFutureDate,
  getTomorrow,
};
