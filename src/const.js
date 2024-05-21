const DESTINATION_COUNT = 7;
const POINTS_COUNT = 9;
const OFFERS_COUNT = 5;
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

const FilterType = [{
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
}];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = [{
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
}];

export {POINT_EMPTY,
  POINT_TYPE, DESTINATION,
  DESCRIPTION,
  OFFERS,
  DESTINATION_COUNT,
  OFFERS_COUNT,
  POINTS_COUNT,
  FilterType,
  Mode,
  SortType};
