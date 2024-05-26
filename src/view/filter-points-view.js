import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from '../template/filter-template.js';

export default class FilterPointsView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor(filters, currentFilter, onFilterTypeChange) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
