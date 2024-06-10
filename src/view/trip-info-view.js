import AbstractView from '../framework/view/abstract-view.js';
import { createTripInfoTemplate } from '../template/trip-info-template.js';

export default class TripInfoView extends AbstractView {
  #info = null;

  constructor({ info }) {
    super();
    this.#info = info;
  }

  get template() {
    return createTripInfoTemplate(this.#info);
  }
}
