import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from '../template/filter-template.js';

export default class FilterPointsView  extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
