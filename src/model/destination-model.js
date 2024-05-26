import Observable from '../framework/observable';

export default class DestinationModel extends Observable{
  #destination = [];
  #destinationsApiService = null;

  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init(){
    try {
      this.#destination = await this.#destinationsApiService.destinations;
    } catch (err) {
      this.#destination = [];
    }
  }

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
