import Observable from '../framework/observable';

export default class OffersModel extends Observable{
  #allOffers = [];
  #offersApiService = null;

  constructor({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init(){
    try {
      this.#allOffers = await this.#offersApiService.offers;
    } catch (err) {
      this.#allOffers = [];
    }
  }

  get allOffers() {
    return this.#allOffers;
  }

  getOffersByType(type) {
    return this.#allOffers.find((offer) => offer.type === type);
  }

  /* getById() {
    return this.allOffers.forEach((element) => {
      const result = element.offers.find((offer) => offer.id === id);
      if (result) {
        return result;
      }
    });
  } */
}
