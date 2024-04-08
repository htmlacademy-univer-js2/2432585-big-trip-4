import { getRandomDestination } from "../mock/destination";
import { DESTINATION_COUNT } from "../const";

export default class DestinationModel {
  destinations = Array.from({length: DESTINATION_COUNT}, () => getRandomDestination);

  get() {
    return this.destinations;
  }

  getByType(type) {
    return this.destinations.find((destination) => destination.type === type).destinations;
  }
}
