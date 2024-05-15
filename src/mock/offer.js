import { getRandomArrayElement } from '../utils/common';

const offers =
[
  {
    type: "taxi",
    offers: [
      {
        id: 'fff61b86-4a48-4406-a072-96775b21f084',
        title: "Upgrade to a business class",
        price: 174
      },
      {
        id: "50aaa585-7cee-4359-a593-0d722870d0cf",
        title: "Choose the radio station",
        price: 96
      },
      {
        id: "6c7e9808-ba71-4abb-9c91-46f4dbd2e8c2",
        title: "Choose temperature",
        price: 76
      },
      {
        id: "a5d3c2f8-b055-4c08-ab66-fee37d5466b4",
        title: "Drive quickly, I'm in a hurry",
        price: 166
      },
      {
        id: "c59fcb6e-fcde-484b-94a7-31a04f33fb2c",
        title: "Drive slowly",
        price: 194
      }
    ]
  },
  {
    type: "bus",
    offers: [
      {
        id: "3e33e7df-afa8-41df-9778-690eedd2a3a9",
        title: "Infotainment system",
        price: 116
      },
      {
        id: "2d0c6c39-3f07-4676-aa7f-281d4c37a4a5",
        title: "Order meal",
        price: 66
      },
      {
        id: "2163d3f6-89cf-4b87-999b-39dee574cd59",
        title: "Choose seats",
        price: 81
      }
    ]
  },
  {
    type: "train",
    offers: [
      {
        id: "543073a1-1f5b-4662-870a-ebff50adeb4a",
        title: "Book a taxi at the arrival point",
        price: 38
      },
      {
        id: "44326448-2406-475b-9a9b-885754ea74a7",
        title: "Order a breakfast",
        price: 104
      },
      {
        id: "c40aa58f-b5a9-41f4-999f-341ccf8898c1",
        title: "Wake up at a certain time",
        price: 167
      }
    ]
  },
  {
    type: "flight",
    offers: [
      {
        id: "cc5a07f6-747f-4803-9880-ba6be75fec14",
        title: "Choose meal",
        price: 124
      },
      {
        id: "f35aff8f-c793-4f53-8e24-23631101ccb5",
        title: "Choose seats",
        price: 183
      },
      {
        id: "18963e62-0ff2-4a9b-9809-eb3e941658bc",
        title: "Upgrade to comfort class",
        price: 93
      },
      {
        id: "961fa89a-1e5a-4e7a-873f-8d66428cdb27",
        title: "Upgrade to business class",
        price: 117
      },
      {
        id: "1b59a95f-4570-4447-9347-8fdef991de96",
        title: "Add luggage",
        price: 156
      },
      {
        id: "74016829-fe16-4c1d-988d-3d1b6d06c36a",
        title: "Business lounge",
        price: 200
      }
    ]
  },
  {
    type: "check-in",
    offers: [
      {
        id: "37b653b1-7b0b-4127-b981-7a8ea4201527",
        title: "Choose the time of check-in",
        price: 180
      },
      {
        id: "867036e6-6110-4a02-9c14-1a428263c505",
        title: "Choose the time of check-out",
        price: 131
      },
      {
        id: "2faf1c38-9a97-42ba-a59c-c18a49be81b3",
        title: "Add breakfast",
        price: 102
      },
      {
        id: "32e839d4-e29d-49ff-b92d-2a9afead503b",
        title: "Laundry",
        price: 156
      },
      {
        id: "3815fc7e-a4b3-4064-89bc-702794cff2f5",
        title: "Order a meal from the restaurant",
        price: 65
      }
    ]
  },
  {
    type: "sightseeing",
    offers: []
  },
  {
    type: "ship",
    offers: [
      {
        id: "4bd06aa5-5d57-42c0-a601-50270eeeb7ca",
        title: "Choose meal",
        price: 135
      },
      {
        id: "4154f7f6-f108-45cc-b38f-9947b8a31351",
        title: "Choose seats",
        price: 171
      },
      {
        id: "9604fb2c-8452-4a61-91e3-25d65a1f3586",
        title: "Upgrade to comfort class",
        price: 200
      },
      {
        id: "39be9fb7-efc9-4885-8963-569321e34e7f",
        title: "Upgrade to business class",
        price: 104
      },
      {
        id: "933edee5-1cc9-41c5-abb2-61f3047a6a3e",
        title: "Add luggage",
        price: 96
      },
      {
        id: "27965e6d-dee2-4cfa-9b68-476351460034",
        title: "Business lounge",
        price: 196
      }
    ]
  }
]

function getRandomOffer() {
  return getRandomArrayElement(offers);
}

function getAllOffers() {
  return offers;
}

export {getRandomOffer, getAllOffers};
