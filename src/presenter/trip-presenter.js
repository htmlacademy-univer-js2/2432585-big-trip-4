import ListView from '../view/list-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import SortPointsView from '../view/sort-points-view.js';
import LoadingView from '../view/loading-view.js';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { remove, render, RenderPosition } from '../framework/render.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import { sortPointsByTime, sortPointsByPrice, sortPointsByDay } from '../utils/points.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType, FilterType, TimeLimit } from '../const.js';

export default class TripPresenter {
  #listComponent = new ListView();
  #sortComponent = null;
  #noPointsComponent = null;
  #loadingComponent = new LoadingView();
  #newPointButtonComponent = null;

  #listContainer = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #isLoading = true;
  #isCreatingNewPoint = false;
  #onNewPointDestroy = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor({ listContainer, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy, newPointButtonComponent }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#newPointButtonComponent = newPointButtonComponent;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newPointDestroyHandler,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
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
        break;
      case SortType.DAY:
        filteredPoints.sort(sortPointsByDay);
    }

    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createPoint = () => {
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    this.#isCreatingNewPoint = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  };

  #renderNoPoints = () => {
    this.#noPointsComponent = new EventListEmptyView({
      filterType: this.#filterType,
    });
    render(this.#noPointsComponent, this.#listContainer);
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #renderPoint(point) {
    if (!this.#listComponent.element) {
      throw new Error('List component element is not defined');
    }

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
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

    render(this.#sortComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #renderBoard = () => {
    const points = this.points;
    const pointsCount = points.length;

    if (!this.#isCreatingNewPoint){
      if (!pointsCount) {
        this.#renderNoPoints();
        return;
      }
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

  #newPointDestroyHandler = ({ isCanceled }) => {
    this.#isCreatingNewPoint = false;
    this.#onNewPointDestroy();
    if (!this.points.length && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch(actionType) {
      case UserAction.UPDATE_POINT:
        if(update.point){
          try {
            this.#pointPresenters.get(update.point.id).setSaving();
            await this.#pointsModel.updatePoint(updateType, update.point);
          } catch (err) {
            this.#pointPresenters.get(update.point.id).setAborting();
          }
        } else {
          try {
            this.#pointPresenters.get(update.id).setSaving();
            await this.#pointsModel.updatePoint(updateType, update);
          } catch (err) {
            this.#pointPresenters.get(update.id).setAborting();
          }
        }
        break;
      case UserAction.ADD_POINT:
        try {
          this.#newPointPresenter.setSaving();
          await this.#pointsModel.addPoint(updateType, update.point);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        try {
          this.#pointPresenters.get(update.point.id).setDeleting();
          await this.#pointsModel.deletePoint(updateType, update.point);
        } catch (err) {
          this.#pointPresenters.get(update.point.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    remove(this.#loadingComponent);

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
        this.#clearBoard();
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
