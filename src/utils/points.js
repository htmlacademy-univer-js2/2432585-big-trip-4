import dayjs from 'dayjs';

function sortPointsByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointsByTime(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationA - durationB;
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

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isPriceEqual(priceA, priceB) {
  return priceA === priceB;
}

export {sortPointsByPrice, sortPointsByTime, sortPointsByDay, isDatesEqual, isPriceEqual};
