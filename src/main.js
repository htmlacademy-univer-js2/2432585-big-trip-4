import Filter from './view/filter.js';
import Sort from './view/sort.js';
import {render} from './render.js';
import TripPresenter from './trip-presenter.js';

const filterHeaderElement = document.querySelector('.trip-controls');
const siteFilterElement = filterHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const tripPresenter = new TripPresenter({listContainer: siteSortElement});

render(new Filter(), siteFilterElement);
render(new Sort(), siteSortElement);

tripPresenter.init();
