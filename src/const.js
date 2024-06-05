const DEFAULT_TYPE = 'taxi';

const AUTHORIZATION = 'Basic moLfy87osjm1dqP';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

//пустая точка
const POINT_EMPTY = {
  basePrice: 1,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

const POINT_TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

/* const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
}; */

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const EditingType = {
  UPDATE: 'UPDATE',
  NEW: 'NEW'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const ButtonLabels = {
  CANCEL: 'Cancel',
  DELETE_DEFAULT: 'Delete',
  DELETE_IN_PROGRESS: 'Deleting...',
  SAVE_DEFAULT: 'Save',
  SAVE_IN_PROGRESS: 'Saving...'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const PeriodsTime = {
  MINS_IN_HOUR: 60,
  HOURS_IN_DAY : 24,
  MINS_IN_DAY : 60 * 24,
  DAY_IN_MONTH : 31
};

export {POINT_EMPTY,
  AUTHORIZATION,
  END_POINT,
  POINT_TYPE,
  FilterType,
  /* Mode, */
  SortType,
  UserAction,
  EditingType,
  UpdateType,
  Method,
  ButtonLabels,
  TimeLimit,
  PeriodsTime};
