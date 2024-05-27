const DEFAULT_TYPE = 'taxi';

//пустая точка
const POINT_EMPTY = {
  basePrice: 0,
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

const DESTINATION = [
  'Ekaterinburg',
  'Moscow',
  'Tokyo',
  'Kawaguchiko',
  'Shibuya',
  'Harayuki',
  'Roppongi',
  'Kyoto',
  'Gose Palace',
  'Kinkaku-ji',
  'Hiroshima',
  'Miyajima Island',
  'Nikko Park'
];

const DESCRIPTION = [
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Aliquam erat volutpat.'
];

const OFFERS = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = [{
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
}];

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
}

export {POINT_EMPTY,
  POINT_TYPE,
  DESTINATION,
  DESCRIPTION,
  OFFERS,
  FilterType,
  Mode,
  SortType,
  UserAction,
  EditingType,
  UpdateType,
  Method,
  ButtonLabels,
  TimeLimit};
