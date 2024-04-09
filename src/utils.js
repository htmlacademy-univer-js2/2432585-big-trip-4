import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomValue(lower = 0, upper = 1000) {
  return Math.round((upper - lower) * Math.random() + lower);
}

function formatStringToDateTime(date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

function formatFullDate(date) {
  return dayjs(date).format('DD/MM/YY hh:mm');
}

function formatStringToShortDate(date) {
  return dayjs(date).format('MMM DD');
}

function formatStringToTime(date) {
  return dayjs(date).format('HH:mm');
}

const periodsTime = {
  MINS_IN_HOUR: 60,
  HOURS_IN_DAY : 24,
  MINS_IN_DAY : 60 * 24,
  DAY_IN_MONTH : 31
};

function getDateDiff(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'm');

  if (diff > periodsTime.MINS_IN_HOUR) {
    return `${Math.ceil(diff / periodsTime.MINS_IN_HOUR)} H`;
  } else if (diff > periodsTime.HOURS_IN_DAY) {
    return `${Math.ceil(diff / periodsTime.MINS_IN_DAY)} D`;
  }

  return `${Math.ceil(diff)} M`;
}

export {getRandomArrayElement, getRandomValue, formatStringToDateTime, formatStringToShortDate, formatStringToTime, formatFullDate, getDateDiff};
