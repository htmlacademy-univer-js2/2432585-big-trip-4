import { getRandomArrayElement } from "../utils";
import { DESTINATION, DESCRIPTION } from "../const";

function getRandomDestination() {
  const sity = getRandomArrayElement(DESTINATION);

  return {
    id: crypto.randomUUID(),
    description: DESCRIPTION,
    name: sity,
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'description': `${sity} description`
      }
    ]
  };
}

export {getRandomDestination};
