import Observable from '../framework/observable';
import { UpdateType } from '../const';

export default class OffersModel extends Observable{
  #allOffers = [];
  #offersApiService = null;

  constructor({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  get allOffers() {
    return this.#allOffers;
  }

  getOffersByType(type) {
    return this.#allOffers.find((offer) => offer.type === type).offers;
  }

  async init(){
    try {
      this.#allOffers = await this.#offersApiService.offers;
    } catch (err) {
      this.#allOffers = [];
      this._notify(UpdateType.INIT);
    }
  }
}
