import { POINT_TYPE, OFFERS, ButtonLabels, EditingType } from '../const';
import { formatFullDate } from '../utils/day';
import { getRandomValue } from '../utils/common';
import he from 'he';

function createPointType(pointId, currentType, isDisabled) {
  return POINT_TYPE.map((type) => `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}"
  ${currentType === type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${pointId}"
  ${currentType === type ? 'checked' : ''}>${type}</label>
</div>`).join('');
}

function createPointOffer() {
  return OFFERS.map((offer) => `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.toLowerCase()}-1" type="checkbox" name="event-offer-${offer.toLowerCase()}" checked>
                      <label class="event__offer-label" for="event-offer-${offer.toLowerCase()}-1">
                        <span class="event__offer-title">Add ${offer.toLowerCase()}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${getRandomValue()}</span>
                      </label>
                    </div>`).join('');
}

function generateDestinations(destinations) {
  return ( `${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')} `);
}

function createSaveButtonTemplate({ isSaving, isDisabled }) {
  const label = isSaving ? ButtonLabels.SAVE_IN_PROGRESS : ButtonLabels.SAVE_DEFAULT;
  return `<button class="event__save-btn  btn  btn--blue" type="submit"
    ${isDisabled ? 'disabled' : ''}>${label}</button>`;
}

function createResetButtonTemplate({ type, isDisabled, isDeleting }) {
  let label;

  if (type === EditingType.NEW) {
    label = ButtonLabels.CANCEL;
  } else {
    label = isDeleting ? ButtonLabels.DELETE_IN_PROGRESS : ButtonLabels.DELETE_DEFAULT;
  }
  return `<button class="event__reset-btn" type="reset"
    ${isDisabled ? 'disabled' : ''}>${label}</button>`;
}

function createControlsButtonsTemplate({ type, isSaving, isDeleting, isDisabled }) {
  return `${createResetButtonTemplate(type)}
         ${type === EditingType.UPDATE ? createRollupBtn() : ''}
        ${createSaveButtonTemplate({ isSaving, isDisabled })}
        ${createResetButtonTemplate({ type, isDeleting, isDisabled })}
        ${type === EditingType.UPDATE ? createRollupBtn(isDisabled) : ''}`;
}

function createEditPointTemplate({state, pointDestinations, /* pointOffers */}) {
  const { point, isDisabled, isSaving, isDeleting } = state;
  const { id, price, /* dateFrom, dateTo, offers, */ type } = point;
  const currentDestination = pointDestinations.find((destination) => destination.id === point.destination);
  //const currentOffers = pointOffers.find((offer) => offer.type === type);
  const destinationName = (currentDestination) ? currentDestination.name : '';

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${createPointType(id, type, isDisabled)}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-${id}">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination"
                  value="${he.encode(destinationName)}" list="destination-list-${id}" ${isDisabled ? 'disabled' : ''}>
                  <datalist id="destination-list-${id}">
                    ${generateDestinations(pointDestinations)}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-${id}" type="text"
                    name="event-start-time" value="${point.dateFrom ? formatFullDate(point.dateFrom) : ''}" ${isDisabled ? 'disabled' : ''}>
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-${id}" type="text"
                    name="event-end-time" value="${point.dateTo ? formatFullDate(point.dateTo) : ''}" ${isDisabled ? 'disabled' : ''}>
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-${id}">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
                  value="${he.encode(String(price))} ${isDisabled ? 'disabled' : ''}">
                </div>

                ${createControlsButtonsTemplate({ type, isSaving, isDeleting, isDisabled })}
              </header>
              <section class="event__details">
                <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                  <div class="event__available-offers">
                    ${createPointOffer()}
                  </div>
                </section>

                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
                </section>
              </section>
            </form>
          </li>`;
}

export {createEditPointTemplate};
