import TripInfoView from './view/trip-info-view.js';
import NewPointButtonView from './view/new-point-button-view.js';

import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

import { render, RenderPosition } from './framework/render.js';

import PointsModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import FilterModel from './model/filter-model.js';

import PointsApiService from './api-service/points-api-service.js';
import DestinationsApiService from './api-service/destinations-api-server.js'
import OffersApiService from './api-service/offers-api-server.js'

import { AUTHORIZATION, END_POINT } from './const.js';

const siteMainElement = document.querySelector('.page-main');
const tripInfoElement = document.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');
//const eventListElement = tripInfoElement.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationModel = new DestinationModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

const tripInfoPresenter = new TripInfoPresenter({
  container: tripInfoElement,
  pointsModel,
  destinationModel,
  offersModel,
});

const tripPresenter = new TripPresenter({
  listContainer: siteMainElement,
  pointsModel,
  destinationsModel: destinationModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
  newPointButtonComponent
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointsModel
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

async function initModels() {
  await destinationModel.init();
  await offersModel.init();
  await pointsModel.init();
  render(newPointButtonComponent, tripInfoElement);
}

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();
initModels();
