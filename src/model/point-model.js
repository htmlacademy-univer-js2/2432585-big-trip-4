import { getRandomPoint, getAllPoints } from '../mock/point';
import { POINTS_COUNT } from '../const';

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT }, () => getRandomPoint());

  get points() {
    return this.#points;
  }
}
