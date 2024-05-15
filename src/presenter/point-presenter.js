import { remove, render, replace } from "../framework/render";
import ListPointsView from "../view/list-points-view";
import EditPointView from "../view/editing-form-view";
import DestinationModel from "../model/destination-model";

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #destinationsModel = null;
  #offersModel = null;

  #point = null;

  constructor({pointListContainer, destinationsModel, offersModel}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new ListPointsView({
      point: this.#point,
      destination: this.#destinationsModel.getDestinationById(point.destination),
      offers: this.#offersModel.getOffersByType(point.type),
      onEditClick: pointEditClickHandler
    })

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onResetClick: resetButtonClickHandler,
      onSubmitClick: pointSubmitHandler
    })

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

    /* render(pointComponent, this.#pointListContainer.element); */
  }
}
