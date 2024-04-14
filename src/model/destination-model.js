import { getRandomDestination } from '../mock/destination';
import { DESTINATION_COUNT } from '../const';

export default class DestinationModel {
  #destinations = Array.from({length: DESTINATION_COUNT}, () => getRandomDestination);

  get destinations() {
    return this.#destinations;
  }

  getDestinationByType(type) {
    const destination = this.#destinations.find((dest) => dest.type === type);

    if (destination) {
      return destination.destinations;
    }
    return null;
  }
}
