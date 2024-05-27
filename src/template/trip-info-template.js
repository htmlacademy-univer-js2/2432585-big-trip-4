import { humanizePointDate } from '../utils/points';
import { getStartPoint, getEndPoint } from '../utils/common';



function getTotalPrice(points, offers) {
  if (points.length === 0) {
    return '';
  }
  let totalPrice = 0;
  points.forEach((point) => {

    if (offers.length === 0) {
      return 0;
    }

    let pricePointOffers = 0;
    const offersByType = offers.find((offer) => offer.type === point.type);
    const pointOffers = point.offers;

    pointOffers.forEach((offer) => {
      pricePointOffers += offersByType.offers.find((item) => item.id === offer).price;
    });

    totalPrice += point.basePrice;
    totalPrice += pricePointOffers;
  });

  return `Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>`;
}

function getDates(points) {
  if (points.length === 0) {
    return '';
  }
  
  const startPoint = getStartPoint(points);
  const endPoint = getEndPoint(points);

  return `<p class="trip-info__dates">${humanizePointDate(startPoint.startDate, 'MMM D')}&nbsp;&mdash;&nbsp;${humanizePointDate(endPoint.endDate, 'MMM D')}</p>`
}

function getRouteTrip(points, destinations) {
  if (points.length === 0) {
    return '';
  }
  const route = [points[0].destination];
  for (let i = 1; i < points.length; i++) {
    if (points[i].destination !== points[i - 1].destination) {
      route.push(points[i].destination);
    }
  }

  if (route.length > 3) {
    const startPoint = destinations.find((item) => item.id === route[0]);
    const endPoint = destinations.find((item) => item.id === route[route.length - 1]);
    return `${startPoint.name} &mdash; ... &mdash; ${endPoint.name}`;
  }

  return route.map((destination) => `${destinations.find((item) => item.id === destination).name}`).join(' &mdash; ');

};

function createTripInfoTemplate(points, destinations, offers) {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getRouteTrip(points, destinations)}</h1>
              ${getDates(points)}
            </div>

            <p class="trip-info__cost">
              ${getTotalPrice(points, offers)}
            </p>
          </section>`;
}

export {createTripInfoTemplate};
