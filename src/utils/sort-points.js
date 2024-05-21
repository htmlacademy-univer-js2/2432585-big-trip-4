import dayjs from 'dayjs';

function sortPointsByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointsByTime(pointA, pointB) {
  const durationA = dayjs.duration(dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'minute'));
  const durationB = dayjs.duration(dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'minute'));

  if (durationA.asMilliseconds() > durationB.asMilliseconds()) {
    return -1;
  } else if (durationA.asMilliseconds() < durationB.asMilliseconds()) {
    return 1;
  } else {
    return 0;
  }
}

function sortPointsByPrice(pointA, pointB){
  const diff = pointA.basePrice - pointB.basePrice;

  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1;
  } else {
    return 0;
  }
}

export {sortPointsByPrice, sortPointsByTime, sortPointsByDay};
