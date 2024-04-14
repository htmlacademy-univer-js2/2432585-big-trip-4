import NewPointView from '../view/additional-new-point-view.js';
import EditPointView from '../view/editing-form-view.js';
import ListPointsView from '../view/list-points-view.js';
import ListView from '../view/list-view.js';
import {render, replace} from '../framework/render.js';

export default class TripPresenter {
  point = null
  #listComponent = new ListView();

  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({listContainer, pointsModel, destinationsModel, offersModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.tripPoint = [...this.#pointsModel.points];
    this.currentPoint = this.#pointsModel.points;

    render(this.#listComponent,this.#listContainer);

    /* render(new EditPointView({point: this.currentPoint}), this.listComponent.element);
    render(new NewPointView({point: this.currentPoint}), this.listComponent.element);
 */
    for (let i = 0; i < this.tripPoint.length; i++) {
      this.#renderPoint(this.tripPoint[i]);
    }
  }

  #renderPoint(point) {
    const pointComponent = new ListPointsView ({
      data: point,
      onEditClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDown);
      }
    });

    render(pointComponent, this.#listComponent.element);

    const escKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDown);
      }
    };

    const editingForm = new EditPointView({
      point: point,
      pointDestinations: this.destinations,
      pointOffers: this.#offersModel.getOffersByType(point.type),
      onSubmitClick: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDown);
      },
      onResetClick: () => {
        replaceEditToPoint(),
        document.removeEventListener('keydown', escKeyDown);
      }
    })

    function replaceEditToPoint() {
      replace(pointComponent, editingForm);
    }

    function replacePointToEdit() {
      replace(editingForm, pointComponent)
    }
  }

  /* editComponent = new EditPointView({point: point}); */
}
