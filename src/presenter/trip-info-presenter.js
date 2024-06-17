import { RenderPosition, remove, render, replace } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import { getInfoFromPoints } from '../utils/trip-info';

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #container = null;

  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;

  constructor({ container, pointsModel, destinationModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  init() {
    this.#renderTripInfo();
  }

  #renderTripInfo = () => {
    const prevTripInfoComponent = this.#tripInfoComponent;

    const points = this.#pointsModel.points;
    const destinations = this.#destinationModel.destinations;
    const offers = this.#offersModel.allOffers;

    this.#tripInfoComponent = new TripInfoView({ info: getInfoFromPoints({ points, destinations, offers }) });

    if (!prevTripInfoComponent) {
      render(
        this.#tripInfoComponent,
        this.#container,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleModelChange = () => {
    this.init();
  };
}
