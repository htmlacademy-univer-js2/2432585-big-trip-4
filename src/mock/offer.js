import { getRandomArrayElement, getRandomValue } from '../utils/common';
import { OFFERS } from '../const';

function generateOffer() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomValue(),
  };
}

export {generateOffer};
