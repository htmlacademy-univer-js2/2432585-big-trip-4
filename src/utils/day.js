import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const PeriodsTime = {
  MSEC_IN_HOUR : 60 * 60 * 1000,
  MSEC_IN_DAY : 24 * 60 * 60 * 1000
};

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
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  if (diff >= PeriodsTime.MSEC_IN_DAY) {
    return dayjs.duration(diff).format('DD[D] HH[H] mm[M]');
  } else if (diff >= PeriodsTime.MSEC_IN_HOUR) {
    return dayjs.duration(diff).format('HH[H] mm[M]');
  }

  return dayjs.duration(diff).format('mm[M]');
}

export {formatStringToDateTime, formatStringToShortDate, formatStringToTime, formatFullDate, getDateDiff};
