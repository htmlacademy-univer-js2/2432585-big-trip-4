import FilterPointsView from './view/filter-points-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';

import { render, RenderPosition } from './framework/render.js';

import PointsModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';

import { generateFilters } from './mock/filter.js';

const filterHeaderElement = document.querySelector('.trip-controls');
const siteFilterElement = filterHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripInfoElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();

const tripPresenter = new TripPresenter({
  listContainer: siteMainElement,
  pointsModel,
  destinationsModel: destinationModel,
  offersModel
});

const filters = generateFilters(pointsModel.points);

render(new FilterPointsView({ filters }), siteFilterElement);
render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

tripPresenter.init();
