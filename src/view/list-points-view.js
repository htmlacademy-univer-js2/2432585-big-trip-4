import { createElement } from '../render.js';
import { createListPointsTemplate } from '../template/list-points-template.js'

export default class ListPointsView {
  constructor ({data}) {
    this.point = data;
  }

  getTemplate() {
    return createListPointsTemplate(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
