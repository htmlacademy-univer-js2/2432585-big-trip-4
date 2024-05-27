getTripTitle = () => {

};

getOffersCost = (offerIds = [], offers = []) => {
  return offerIds.reduce((result, id) => result + (offers.find((offer) => offer.id === id)?.price ?? 0),0);
}

getTripCost = (points = [], offers = []) => {
  return points.reduce(
    (result, point) => result + point.basePrice + getOffersCost(point.offers, offers.find((offer) => point.type === offer.type)?.offers),
    0
  );
};

getTripDuration = () => {

};

export {getTripCost, getTripDuration, getTripTitle};
