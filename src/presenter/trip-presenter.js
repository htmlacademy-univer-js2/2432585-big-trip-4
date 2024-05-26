import ListView from '../view/list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import SortPointsView from '../view/sort-points-view.js';
import LoadingView from '../view/loading-view.js';

import { remove, render, RenderPosition } from '../framework/render.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import { sortPointsByTime, sortPointsByPrice } from '../utils/points.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
//import EditPointView from '../view/editing-form-view.js';

export default class TripPresenter {
  #listComponent = new ListView();
  #sortComponent = null;
  #noPointsComponent = null;
  #loadingComponent = new LoadingView();

  #listContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({ listContainer, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
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

  #renderLoading() {
    render(this.#loadingComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSort();
    this.#renderPointContainer();
    this.#renderPoints(this.points);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.update(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.add(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.remove(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
