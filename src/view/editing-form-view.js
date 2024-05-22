import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createEditPointTemplate } from '../template/editing-form-template.js';
import { POINT_EMPTY } from '../const.js';

export default class EditPointView extends AbstractStatefulView {
  //#point = null;
  #pointDestinations = null;
  #pointOffers = null;
  #handleResetClick = null;
  #handleSubmitClick = null;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onResetClick, onSubmitClick}) {
    super();
    //this.#point = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#handleResetClick = onResetClick;
    this.#handleSubmitClick = onSubmitClick;

    this._setState(EditPointView.parsePointToState({point}));

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers
    });
  }

  reset({point}) {
    this.updateElement(
      EditPointView.parsePointToState({point}),
    );
  }

  _restoreHandlers = () => {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#resetButtonClickHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefalt();
    this.#handleSubmitClick(EditPointView.parseStateToPoint(this._state));
  };

  #resetButtonClickHandler = (evt) => {
    evt.preventDefalt();
    this.#handleResetClick(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefalt();
    this.updateElement( {
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefalt();

    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: checkedOffers.map((element) => element.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefalt();
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.valueAsNumber
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefalt();
    const selectedDestination = this.#pointDestinations
      .find((pointDestination) => pointDestination.name === evt.target.value);

    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestinationId
      }
    });
  };

  static parsePointToState = (point) => ({point});
  static parseStateToPoint = (state) => ({...state});
}
