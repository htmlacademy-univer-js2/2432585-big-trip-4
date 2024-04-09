import NewPointView from '../view/additional-new-point-view.js';
import EditPointView from '../view/editing-form-view.js';
import ListPointsView from '../view/list-points-view.js';
import ListView from '../view/list-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  listComponent = new ListView();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoint = [...this.pointsModel.getPoints()];
    this.currentPoint = this.pointsModel.getPoints();

    render(this.listComponent,this.listContainer);

    render(new EditPointView({point: this.currentPoint}), this.listComponent.getElement());
    render(new NewPointView({point: this.currentPoint}), this.listComponent.getElement());

    for (let i = 0; i < this.tripPoint.length; i++) {
      render(new ListPointsView({data: this.tripPoint[i]}), this.listComponent.getElement());
    }
  }
}
