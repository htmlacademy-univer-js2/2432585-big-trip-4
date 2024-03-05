import Filter from './view/filter.js';
import Sort from './view/sort.js';
import NewPoint from './view/addition-new-point.js';
import EditPoint from './view/editing-form.js';
import List from './view/list.js';
import ListView from './view/list-view.js';
import {render} from './render.js';

export default class TripPresenter {
  listComponent = new ListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.listComponent,this.listContainer);
    render(new EditPoint(), this.listComponent.getElement());
    render(new NewPoint(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new List(), this.listComponent.getElement());
    }
  }
}
