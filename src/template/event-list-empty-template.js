import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyListPointsTemplate = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">${noPointTextValue}</p>`
  );
};

export {createEmptyListPointsTemplate};
