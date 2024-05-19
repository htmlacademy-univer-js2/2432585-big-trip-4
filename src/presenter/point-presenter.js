import { remove, render, replace } from "../framework/render";
import ListPointsView from "../view/list-points-view";
import EditPointView from "../view/editing-form-view";
import DestinationModel from "../model/destination-model";

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent;
  #pointEditComponent;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, destinationsModel, offersModel, onDataChange, onModeChange }) {
    console.log('PointPresenter constructor:', { pointListContainer, destinationsModel, offersModel });

    if (!pointListContainer || !pointListContainer instanceof Element) {
      throw new Error('Invalid pointListContainer or its element');
    }

    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    console.log('Init point:', point);
    console.log('Destinations Model:', this.#destinationsModel);

    this.#pointComponent = new ListPointsView({
      point: this.#point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: this.#offersModel.getOffersByType(point.type),
      onEditClick: this.#pointEditClickHandler,
      onFavoriteClick: this.#pointFavoriteHandler
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.allOffers,
      onResetClick: this.#resetButtonClickHandler,
      onSubmitClick: this.#handleFormSubmit
    });

    if (!prevPointComponent || !prevPointEditComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent)
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
    console.log('Rendering point component to:', this.#pointListContainer);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  }

  #replacePointToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditToPoint () {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditToPoint();
  }

  #pointEditClickHandler = () => {
    this.#replacePointToEdit();
  }

  #resetButtonClickHandler = () => {
    replaceEditToPoint();
  }

  #pointFavoriteHandler = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite})
  }
}