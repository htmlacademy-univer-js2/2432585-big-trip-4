function sortPointsByDay(pointA, pointB) {
    return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointsByTime(pointA, pointB) {
  const durationA = getDurationNF(pointA.dateFrom, pointA.dateTo);
  const durationB = getDurationNF(pointB.dateFrom, pointB.dateTo);

  return (durationA.asMilliseconds() > durationB.asMilliseconds()) ? -1
        : ((durationA.asMilliseconds() < durationB.asMilliseconds()) ? 1 : 0);
}

function sortPointsByPrice(pointA, pointB){
  const diff = pointA.basePrice - pointB.basePrice;

  return (diff > 0) ? -1 : ((diff < 0) ? 1 : 0);
}

export {sortPointsByPrice, sortPointsByTime, sortPointsByDay};
