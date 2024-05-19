import { remove, render, replace } from "../framework/render";
import ListPointsView from "../view/list-points-view";
import EditPointView from "../view/editing-form-view";
import DestinationModel from "../model/destination-model";

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent;
  #pointEditComponent;

  #destinationsModel = null;
  #offersModel = null;

  #point = null;

  constructor({ pointListContainer, destinationsModel, offersModel }) {
    console.log('PointPresenter constructor:', { pointListContainer, destinationsModel, offersModel });

    if (!pointListContainer || !pointListContainer instanceof Element) {
      throw new Error('Invalid pointListContainer or its element');
    }

    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
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
      onEditClick: pointEditClickHandler,
      /* onFavoriteClick: */
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.allOffers,
      onResetClick: resetButtonClickHandler,
      onSubmitClick: pointSubmitHandler
    });

    if (!prevPointComponent || !prevPointEditComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    function replaceEditToPoint() {
      replace(prevPointComponent, prevPointEditComponent);
    }

    function replacePointToEdit() {
      replace(prevPointEditComponent, prevPointComponent);
    }

    const escKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDown);
      }
    };

    function pointEditClickHandler() {
      replacePointToEdit();
      document.addEventListener('keydown', escKeyDown);
    }

    function resetButtonClickHandler() {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDown);
    }

    function pointSubmitHandler() {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDown);
    }

    /* function pointFavoriteHandler() {

    } */

    console.log('Rendering point component to:', this.#pointListContainer);
    render(this.#pointComponent, this.#pointListContainer);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
