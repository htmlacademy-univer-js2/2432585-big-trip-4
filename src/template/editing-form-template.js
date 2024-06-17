import { pointTypes, ButtonLabels, EditingType } from '../const';
import { formatFullDate } from '../utils/day';
import he from 'he';

function createPointType(point) {
  return pointTypes.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}"${point.type === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1" ${point.type === type ? 'checked' : ''}>${type}</label>
    </div>`).join('');
}

function createPointOffer({ currentOffers, point, isDisabled }) {
  return currentOffers.map((offer) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" data-offer-id="${offer.id}"
        id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}"
        ${point.offers.includes(offer.id) ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
}

function createPointPictures(destination) {
  return destination.pictures.length ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
    </div>
    </div>`
    : '';
}

function createDestination(destination) {
  return destination.name ? `<section class="event__section  event__section--destination" >
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${createPointPictures(destination)}
  </section>` : '';
}

function createPointDestinations(destinations) {
  return ( `${destinations.map((destination) => `<option value="${he.encode(destination.name)}"></option>`).join('')} `);
}

function createResetButton({ pointType, isDisabled, isDeleting }) {
  let label;

  if (pointType === EditingType.NEW) {
    label = ButtonLabels.CANCEL;
  } else {
    label = isDeleting ? ButtonLabels.DELETE_IN_PROGRESS : ButtonLabels.DELETE_DEFAULT;
  }
  return `<button class="event__reset-btn" type="reset"
    ${isDisabled ? 'disabled' : ''}>${label}</button>`;
}

function createSaveButton({ isSaving, isDisabled }) {
  const label = isSaving ? ButtonLabels.SAVE_IN_PROGRESS : ButtonLabels.SAVE_DEFAULT;
  return `<button class="event__save-btn  btn  btn--blue" type="submit"
    ${isDisabled ? 'disabled' : ''}>${label}</button>`;
}

function createRollupButton(isDisabled) {
  return `
    <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
      <span class="visually-hidden">Open event</span>
    </button>`;
}

function createButtons({ pointType, isSaving, isDeleting, isDisabled }) {
  return `${createSaveButton({ isSaving, isDisabled })}
        ${createResetButton({ pointType, isDeleting, isDisabled })}
        ${pointType === EditingType.UPDATE ? createRollupButton(isDisabled) : ''}`;
}

function createEditPointTemplate({ state, pointDestinations, pointOffers, pointType }) {
  const { point, isDisabled, isSaving, isDeleting } = state;

  const currentDestination = pointDestinations.find((destination) => destination.id === point.destination);
  const currentOffers = pointOffers.find((offer) => offer.type === point.type).offers;
  const destinationName = (currentDestination) ? currentDestination.name : '';

  return (`
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${he.encode(point.type)}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createPointType(point)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${he.encode(point.type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1"/>
            ${createPointDestinations(pointDestinations)}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.dateFrom ? formatFullDate(point.dateFrom) : ''}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${point.dateTo ? formatFullDate(point.dateTo) : ''} ${isDisabled ? 'disabled' : ''}>
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(String(point.basePrice))}" ${isDisabled ? 'disabled' : ''}>
        </div>
        ${createButtons({ pointType, isSaving, isDeleting, isDisabled })}
      </header>
      <section class="event__details">
        ${currentOffers.length ?
      `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createPointOffer({ currentOffers, point, isDisabled })}
          </div>
        </section>` : ''}

        ${point.destination ? createDestination(currentDestination) : ''}
      </section>
    </form>
  </li>`);
}

export {createEditPointTemplate};
