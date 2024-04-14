import EditPointView from '../view/editing-form-view.js';
import ListPointsView from '../view/list-points-view.js';
import ListView from '../view/list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import {render, replace} from '../framework/render.js';

export default class TripPresenter {
  #listComponent = new ListView();

  #listContainer;
  #pointsModel;
  #destinationsModel;
  #offersModel;

  #tripPoint = [];

  constructor({listContainer, pointsModel, destinationsModel, offersModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#tripPoint = [...this.#pointsModel.points];
  }

  init() {
    if (this.#tripPoint.length === 0) {
      render(new EventListEmptyView(), this.#listContainer);
      return;
    }

    this.currentPoint = this.#pointsModel.points;

    render(this.#listComponent,this.#listContainer);

    this.#tripPoint.forEach(point => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointComponent = new ListPointsView ({
      data: point,
      onEditClick: pointEditClickHandler
    });

    const editingForm = new EditPointView({
      point,
      onSubmitClick: pointSubmitHandler,
      onResetClick: resetButtonClickHandler
    });

    function replaceEditToPoint() {
      replace(pointComponent, editingForm);
    }

    function replacePointToEdit() {
      replace(editingForm, pointComponent);
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

    render(pointComponent, this.#listComponent.element)
  }
}
