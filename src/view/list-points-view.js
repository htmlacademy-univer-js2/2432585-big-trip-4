import AbstractView from '../framework/view/abstract-view.js';
import { createListPointsTemplate } from '../template/list-points-template.js';
import { POINT_EMPTY } from '../const.js';

export default class ListPointsView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #onEditClick = null;

  constructor ({data = POINT_EMPTY, destinations, offers, onEditClick}) {
    super();
    this.#point = data;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEditClick = onEditClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editButtonClickHandler);
  }

  get template() {
    return createListPointsTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  #editButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick;
  }
}
