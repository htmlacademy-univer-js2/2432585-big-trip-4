import dayjs from 'dayjs';
import { PeriodsTime } from '../const';

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


function getDateDiff(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'm');

  if (diff > PeriodsTime.MINS_IN_HOUR) {
    return `${Math.ceil(diff / PeriodsTime.MINS_IN_HOUR)} H`;
  } else if (diff > PeriodsTime.HOURS_IN_DAY) {
    return `${Math.ceil(diff / PeriodsTime.MINS_IN_DAY)} D`;
  }

  return `${Math.ceil(diff)} M`;
}

export {formatStringToDateTime, formatStringToShortDate, formatStringToTime, formatFullDate, getDateDiff};
