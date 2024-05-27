import TripInfoView from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

import { render, RenderPosition } from './framework/render.js';

import PointsModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import FilterModel from './model/filter-model.js';

import PointsApiService from './api-service/points-api-service.js';

import { AUTHORIZATION, END_POINT } from './const.js';

const siteMainElement = document.querySelector('.page-main');
const tripInfoElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationModel = new DestinationModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  listContainer: siteMainElement,
  pointsModel,
  filterModel,
  destinationsModel: destinationModel,
  offersModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteMainElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
tripPresenter.init();
offersModel.init().finally(() => {
  destinationModel.init().finally(() => {
    pointsModel.init().finally(() => {
      render(newPointButtonComponent, tripInfoElement);
    });
  });
});

