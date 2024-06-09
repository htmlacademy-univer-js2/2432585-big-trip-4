import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createEditPointTemplate } from '../template/editing-form-template.js';
import { POINT_EMPTY, EditingType } from '../const.js';

import dayjs from 'dayjs';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditPointView extends AbstractStatefulView {
  #pointDestinations = null;
  #pointOffers = null;
  #type = null;

  #handleResetClick = null;
  #handleSubmitClick = null;
  #handlePointDelete = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onResetClick, onSubmitClick, onDeleteClick, type = EditingType.UPDATE}) {
    super();
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#type = type;
    this.#handleResetClick = onResetClick;
    this.#handleSubmitClick = onSubmitClick;
    this.#handlePointDelete = onDeleteClick;

    this._setState(EditPointView.parsePointToState({point}));

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({
      state: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
      pointType: this.#type,
    });
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  reset = (point) => { this.updateElement(EditPointView.parsePointToState(point),);};

  _restoreHandlers = () => {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#resetClickHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);

    this.#setDatepickers();
    this.#detectedSaveButtonState();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmitClick(EditPointView.parseStateToPoint(this._state));
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick(EditPointView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handlePointDelete(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement( {
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: [],
      }
    });
  };

  #offerChangeHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: checkedOffers.map((element) => element.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    const priceElement = this.element.querySelector('.event__input--price');

    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value
      }
    });

    priceElement.addEventListener('change', this.#detectedSaveButtonState);
  };

  #destinationChangeHandler = (evt) => {
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

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      }
    });
    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate,
      }
    });
    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.point.dateTo,
      },
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.point.dateFrom,
      },
    );

    dateFromElement.addEventListener('change', this.#detectedSaveButtonState);
    dateToElement.addEventListener('change', this.#detectedSaveButtonState);
  };

  #detectedSaveButtonState = () => {
    const destinationElement = this.element.querySelector('#event-destination-1');
    const dateFromElement = this.element.querySelector('#event-start-time-1');
    const dateToElement = this.element.querySelector('#event-end-time-1');
    const priceElement = this.element.querySelector('#event-price-1');
    const saveButton = this.element.querySelector('.event__save-btn');

    if (!destinationElement.value|| dateFromElement.value === dateToElement.value || priceElement.value <= 0
      || !dateFromElement.value || !dateToElement.value) {
        saveButton.disabled = true;
    } else {
      saveButton.disabled = false;
    }
  }

  static parsePointToState = (point) => ({
    ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const point = {...state,
      dateFrom: dayjs(state.dateFrom).format(),
      dateTo: dayjs(state.dateTo).format(),
      basePrice: Number(state.basePrice)
    };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
