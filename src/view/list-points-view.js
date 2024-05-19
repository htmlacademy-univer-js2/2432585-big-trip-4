import AbstractView from '../framework/view/abstract-view.js';
import { createListPointsTemplate } from '../template/list-points-template.js';
import { POINT_EMPTY } from '../const.js';

export default class ListPointsView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor ({point = POINT_EMPTY, destination, offers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editButtonClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createListPointsTemplate({
      point: this.#point,
      destination: this.#destination,
      offers: this.#offers
    });
  }

  #editButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
