import ListView from '../view/list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import { render, remove } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import DestinationModel from '../model/destination-model.js';
import OffersModel from '../model/offer-model.js';

export default class TripPresenter {
  #listComponent = new ListView();

  #listContainer;
  #pointsModel;
  #destinationsModel;
  #offersModel;

  #tripPoint = [];

  #pointPresenters = new Map();

  constructor({ listContainer, pointsModel, destinationsModel, offersModel }) {
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
    if (!this.#listComponent.element) {
      throw new Error('List component element is not defined');
    }

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#tripPoint.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPointContainer = () => {
    render(this.#listComponent, this.#listContainer);
  }

  #renderBoard = () => {
    console.log('Rendering board');
    if (this.#tripPoint.length === 0) {
      render(new EventListEmptyView(), this.#listContainer);
      return;
    }

    this.#renderPointContainer();
    this.#renderPoints();
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatePoint) => {
    this.#tripPoint = updateItem(this.#tripPoint, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  }
}
