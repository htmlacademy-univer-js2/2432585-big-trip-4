import ListView from '../view/list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import {render, remove} from '../framework/render.js';
import PointPresenter from './point-presenter.js';

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
    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
    });

    pointPresenter.init(point);
  };

  #renderPoints = () => {
    this.#tripPoint.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #renderPointContainer = () => {
    this.currentPoint = this.#pointsModel.points;

    render(this.#listComponent,this.#listContainer);
  }

  #renderBoard = () => {
    if (this.#tripPoint.length === 0) {
      render(new EventListEmptyView(), this.#listContainer);
      return;
    }

    this.#renderPointContainer();
    this.#renderPoints();
  };
}
