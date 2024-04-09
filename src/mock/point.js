import { getRandomArrayElement, getRandomValue } from '../utils.js';
import { POINT_TYPE } from '../const.js';

function generatePoint(destinationId, offersIds) {

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomValue(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: destinationId,
    isFavorite: getRandomArrayElement([0,1]),
    offers: offersIds,
    type: getRandomArrayElement(POINT_TYPE)
  };
}

export {generatePoint};
