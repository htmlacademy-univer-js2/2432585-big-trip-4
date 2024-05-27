function getRandomValue(lower = 0, upper = 1000) {
  return Math.round((upper - lower) * Math.random() + lower);
}

const getStartPoint = (points) => {
  let startPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currPointDate = points[i].startDate;
    const currentPointDate = points[i].startDate;
    const endPointDate = startPoint.startDate;
    if(dayjs(currPointDate).diff(dayjs(endPointDate), 'M') < 0
      || dayjs(currPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currPointDate).diff(dayjs(endPointDate), 'D') < 0) {
    if(dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') < 0
      || dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') < 0) {
      startPoint = points[i];
      }
    }
    return startPoint;
  }
};

const getEndPoint = (points) => {
  let endPoint = points[0];
  for(let i = 1; i < points.length; i++) {
    const currentPointDate = points[i].endDate;
    if(dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') > 0
      || dayjs(currentPointDate).diff(dayjs(endPointDate), 'M') === 0
      && dayjs(currentPointDate).diff(dayjs(endPointDate), 'D') > 0) {
      endPoint = points[i];
    }
  }
  return endPoint;
}
export { getRandomValue, getStartPoint, getEndPoint };
