import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/editing-form-view.js';
import { UserAction, UpdateType, EditingType } from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;

  #handleDataChange = null;
  #handleDestroy = null;

  #destinationsModel = null;
  #offersModel = null;

  #pointEditComponent = null;

  constructor({ pointListContainer, onDataChange, onDestroy, destinationsModel, offersModel }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    if (this.#pointEditComponent) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.allOffers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      type: EditingType.NEW
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }

  destroy({isCanceled = true} = {}) {
    if (!this.#pointEditComponent) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDestroy({isCanceled});
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    //this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
