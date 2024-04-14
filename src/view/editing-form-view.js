import AbstractView from '../framework/view/abstract-view.js';
import { createEditPointTemplate } from '../template/editing-form-template.js';
import { POINT_EMPTY } from '../const.js';

export default class EditPointView extends AbstractView {
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;
  #onResetClick = null;
  #onSubmitClick = null;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onResetClick, onSubmitClick}) {
    super();
    this.#point = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#onResetClick = onResetClick;
    this.#onSubmitClick = onSubmitClick;

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetButtonClickHandler);
  }

  get template() {
    return createEditPointTemplate({
      point: this.#point,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefalt();
    this.#onSubmitClick;
  }

  #resetButtonClickHandler = (evt) => {
    evt.preventDefalt();
    this.#onResetClick;
  }
}
