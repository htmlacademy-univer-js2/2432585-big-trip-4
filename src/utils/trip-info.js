import dayjs from 'dayjs';
import { sortPointsByDay } from '../utils/points';

function getInfoFromPoints({ points, destinations, offers }) {
  if (!points || !destinations || !offers) {
    return {
      destinationsString: '',
      datesString: '',
      totalPrice: 0
    };
  }

  const sortedPoints = [...points.sort(sortPointsByDay)];
  const destinationsList = [];
  let totalPrice = 0;

  sortedPoints.forEach((point) => {
    const destination = destinations.find((dest) => dest.id === point.destination).name;
    destinationsList.push(destination);

    const offersOfCurrentType = offers.find((offer) => offer.type === point.type);
    offersOfCurrentType.offers.forEach((offer) => {
      if (point.offers.includes(offer.id)) {
        totalPrice += offer.price;
      }
    });
    totalPrice += point.basePrice;
  });

  return {
    destinationsString: createViewOfPath(destinationsList),
    datesString: createViewOfDates(sortedPoints[0]?.dateFrom, sortedPoints[sortedPoints.length - 1]?.dateTo),
    totalPrice: `&euro;&nbsp;${totalPrice}`
  };
}

function createViewOfPath(destinations) {
  let pathTrip = '';

  if (destinations.length <= 3) {
    destinations.forEach((destination, index) => {
      if (index !== destinations.length - 1) {
        pathTrip += `${destination} &mdash; `;
      } else {
        pathTrip += `${destination}`;
      }
    });
  } else {
    pathTrip = `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
  }

  return pathTrip;
}

function createViewOfDates(dateA, dateB) {
  return dateA && dateB ? `${dayjs(dateA).format('D MMM').toUpperCase()}&nbsp;&mdash;&nbsp;${dayjs(dateB).format('D MMM').toUpperCase()}` : '';
}

export { getInfoFromPoints };
