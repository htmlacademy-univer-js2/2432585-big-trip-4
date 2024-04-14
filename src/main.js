import FilterPointsView from './view/filter-points-view.js';
import TripInfoView from './view/trip-info-view.js';
import SortPointsView from './view/sort-points-view.js';
import TripPresenter from './presenter/trip-presenter.js';

import {render, RenderPosition} from './framework/render.js';

import PointsModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';


const filterHeaderElement = document.querySelector('.trip-controls');
const siteFilterElement = filterHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const tripInfoElement = document.querySelector('.trip-main');
/* const tripPresenter = new TripPresenter({listContainer: siteSortElement}); */

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();

const tripPresenter = new TripPresenter({
  listContainer: siteSortElement,
  destinationModel,
  offersModel,
  pointsModel
});

render(new SortPointsView(), siteSortElement);
render(new FilterPointsView(), siteFilterElement);
render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

tripPresenter.init();
