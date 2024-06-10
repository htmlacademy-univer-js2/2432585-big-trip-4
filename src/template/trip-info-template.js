function createTripInfoTemplate(info) {
  const { destinationsString, datesString, totalPrice } = info;
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${destinationsString}</h1>
              ${datesString}
            </div>

            <p class="trip-info__cost">
              ${totalPrice}
            </p>
          </section>`;
}

export {createTripInfoTemplate};
