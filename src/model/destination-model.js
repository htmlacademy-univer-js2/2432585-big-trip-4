import { getRandomDestination, getAllDestinations } from '../mock/destination';
import { DESTINATION_COUNT } from '../const';

export default class DestinationModel {
  #destination = Array.from({length: DESTINATION_COUNT}, () => getRandomDestination());

  get destinations() {
    return this.#destination;
  }

  getDestinationByType(type) {
    const destination = this.#destination.find((dest) => dest.type === type);

    if (destination) {
      return destination.destination;
    }
    return null;
  }

  getDestinationById(id) {
    return this.#destination.find((dest) => dest.id === id);
  }
}
