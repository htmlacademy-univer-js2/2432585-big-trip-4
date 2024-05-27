import AbstractView from '../framework/view/abstract-view.js';
import { createTripInfoTemplate } from '../template/trip-info-template.js';

export default class TripInfoView extends AbstractView {
  #destinations = null;
  #offers = null;
  #points = 0;

  constructor({destinations, offers, points}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
