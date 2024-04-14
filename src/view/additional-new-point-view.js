import AbstractView from '../framework/view/abstract-view.js';
import { createNewPointTemplate } from '../template/additional-new-point-template.js';

export default class NewPointView extends AbstractView {
  constructor({point}) {
    super();
    this.point = point;
  }

  get template() {
    return createNewPointTemplate(this.point);
  }
}
