import { generateOffer } from "../mock/offer";
import { OFFERS_COUNT, OFFERS } from "../const";
import { getRandomValue } from "../utils";

export default class OffersModel {
  allOffers = OFFERS.map((type) => ({
    type,
    offers: Array.from({ length: getRandomValue(0, OFFERS_COUNT) }, () => generateOffer())
  }));

  getAllOffers() {
    return this.allOffers;
  }

  getByType(type) {
    return this.allOffers.find((offer) => offer.type === type);
  }

  getById() {
    return this.allOffers.forEach((element) => {
      const result = element.offers.find((offer) => offer.id === id);
      if (result) {
        return result;
      }
    });
    return {};
  }
}
