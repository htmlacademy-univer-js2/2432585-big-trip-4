import AbstractView from '../framework/view/abstract-view';
import { createEmptyListPointsTemplate } from '../template/event-list-empty-template';

export default class EventListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListPointsTemplate(this.#filterType);
  }
}
