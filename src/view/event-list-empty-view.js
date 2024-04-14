import { extend } from "dayjs";
import AbstractView from "../framework/view/abstract-view";
import { createEmptyListPointsTemplate } from "../template/event-list-empty-template";

export default class EventListEmptyView extends AbstractView {
  get template() {
    return createEmptyListPointsTemplate();
  }
}
