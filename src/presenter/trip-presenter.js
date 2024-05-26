import ListView from '../view/list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import SortPointsView from '../view/sort-points-view.js';

import { remove, render, RenderPosition } from '../framework/render.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import { sortPointsByTime, sortPointsByPrice } from '../utils/points.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import EditPointView from '../view/editing-form-view.js';

export default class TripPresenter {
  #listComponent = new ListView();
  #sortComponent = null;
  #noPointsComponent = null;

  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  //#tripPoint = [];
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  //#sourcedTripPoints = [];

  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({ listContainer, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new EditPointView({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    //this.#tripPoint = [...this.#pointsModel.points];
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType){
      case SortType.TIME:
        filteredPoints.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortPointsByPrice);
    }

    return filteredPoints;
  }

  init() {
    //this.#sourcedTripPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  createPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  };

  #renderNoPoints = () => {
    this.#noPointsComponent = new EventListEmptyView({
      filterType: this.#filterType,
    });
    render(this.#noPointsComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoint(point) {
    if (!this.#listComponent.element) {
      throw new Error('List component element is not defined');
    }

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => {this.#renderPoint(point);});
  };

  #renderPointContainer = () => {
    render(this.#listComponent, this.#listContainer);
  };

  #renderSort() {
    this.#sortComponent = new SortPointsView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderBoard = () => {
    /* console.log('Rendering board'); */
    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints(this.points);
  };

  /* #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  } */

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  /* #handlePointChange = (updatePoint) => {
    //this.#tripPoint = updateItem(this.#tripPoint, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  }; */

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if(resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  /* #sortPoints(sortType) {
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
  } */

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
