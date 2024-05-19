import ListView from '../view/list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import SortPointsView from '../view/sort-points-view.js';

import { render, RenderPosition } from '../framework/render.js';

import PointPresenter from './point-presenter.js';

import { updateItem } from '../utils/common.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils/sort-points.js';
import { SortType } from '../const.js';

export default class TripPresenter {
  #listComponent = new ListView();
  #sortComponent = null;

  #listContainer;
  #pointsModel;
  #destinationsModel;
  #offersModel;

  #tripPoint = [];
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  #pointPresenters = new Map();

  constructor({ listContainer, pointsModel, destinationsModel, offersModel }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#tripPoint = [...this.#pointsModel.points];
  }

  init() {
    this.#sourcedTripPoints = [...this.#pointsModel.points];

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
  };

  #renderPointContainer = () => {
    render(this.#listComponent, this.#listContainer);
  };

  #renderSort() {
    this.#sortComponent = new SortPointsView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderBoard = () => {
    /* console.log('Rendering board'); */
    if (this.#tripPoint.length === 0) {
      render(new EventListEmptyView(), this.#listContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints();
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatePoint) => {
    this.#tripPoint = updateItem(this.#tripPoint, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.TIME:
        this.#tripPoint.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.#tripPoint.sort(sortPointsByPrice);
        break;
      default:
        this.#tripPoint = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPoints();
  };
}
