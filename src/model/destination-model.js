import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class DestinationModel extends Observable{
  #destination = [];
  #destinationsApiService = null;

  constructor({ destinationsApiService }) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init(){
    try {
      this.#destination = await this.#destinationsApiService.destinations;
    } catch (err) {
      this.#destination = [];
      this._notify(UpdateType.INIT);
    }
  }

  get destinations() {
    return this.#destination;
  }

  getDestinationById(id) {
    return this.#destination.find((dest) => dest.id === id);
  }
}
