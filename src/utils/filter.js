import { FilterType } from "../const";

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom > new Date()),
  [FilterType.PRESENT]: (points) => points.filter((point) => point.dateFrom <= new Date() && point.dateTo >= new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateTo < new Date())
};

export {filter};
