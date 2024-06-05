import dayjs from 'dayjs';

function sortPointsByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointsByTime(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationA - durationB;
}

const sortPointsByPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

const humanizePointDate = (date, form) => dayjs(date).format(form);

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isPriceEqual(priceA, priceB) {
  return priceA === priceB;
}

export {sortPointsByPrice, sortPointsByTime, sortPointsByDay, isDatesEqual, isPriceEqual, humanizePointDate};
