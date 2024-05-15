import { getRandomArrayElement } from '../utils/common.js';

const points = [
  {
    id: "f5a9215b-77a1-4a2b-89e7-d34f6da80b4e",
    basePrice: 6008,
    dateFrom: "2024-05-05T16:32:07.283Z",
    dateTo: "2024-05-07T14:51:07.283Z",
    destination: "bc8d6002-f60b-4196-b3b3-9549b62f323a",
    isFavorite: true,
    offers: [],
    type: "sightseeing"
  },
  {
    id: "3ca35f81-52b1-4e2f-bc5c-ee57c53edec3",
    basePrice: 3503,
    dateFrom: "2024-05-09T02:21:07.283Z",
    dateTo: "2024-05-09T22:52:07.283Z",
    destination: "e58c23c2-364c-4987-a1ca-491b4fd6f2e6",
    isFavorite: false,
    offers: [
      "c40aa58f-b5a9-41f4-999f-341ccf8898c1"
    ],
    type: "train"
  },
  {
    id: "e6aec202-de66-4959-85e6-fa0e5d711423",
    basePrice: 2755,
    dateFrom: "2024-05-11T20:51:07.283Z",
    dateTo: "2024-05-13T15:33:07.283Z",
    destination: "49ac16cb-176b-4d14-859c-d230d731811d",
    isFavorite: true,
    offers: [
      "961fa89a-1e5a-4e7a-873f-8d66428cdb27",
      "1b59a95f-4570-4447-9347-8fdef991de96",
      "74016829-fe16-4c1d-988d-3d1b6d06c36a"
    ],
    type: "flight"
  },
  {
    id: "3da72a5e-1426-4585-8c9b-21874eec93ee",
    basePrice: 9690,
    dateFrom: "2024-05-15T02:39:07.283Z",
    dateTo: "2024-05-17T01:33:07.283Z",
    destination: "518190c3-81f6-4bd1-91f6-a8f63c6ce7f0",
    isFavorite: false,
    offers: [
      "c40aa58f-b5a9-41f4-999f-341ccf8898c1"
    ],
    type: "train"
  },
  {
    id: "c8b03b49-7f75-47d9-8759-21c3b99247f2",
    basePrice: 1550,
    dateFrom: "2024-05-19T01:12:07.283Z",
    dateTo: "2024-05-19T10:36:07.283Z",
    destination: "bc8d6002-f60b-4196-b3b3-9549b62f323a",
    "is_favorite": true,
    offers: [
      "961fa89a-1e5a-4e7a-873f-8d66428cdb27",
      "1b59a95f-4570-4447-9347-8fdef991de96",
      "74016829-fe16-4c1d-988d-3d1b6d06c36a"
    ],
    type: "flight"
  },
  {
    id: "4dd3dbd9-a542-4c6a-980e-2e454255a906",
    basePrice: 2121,
    dateFrom: "2024-05-21T05:25:07.283Z",
    dateTo: "2024-05-22T00:02:07.283Z",
    destination: "5269a40c-e37c-4370-bd05-a9903491d66b",
    isFavorite: true,
    offers: [
      "961fa89a-1e5a-4e7a-873f-8d66428cdb27",
      "1b59a95f-4570-4447-9347-8fdef991de96",
      "74016829-fe16-4c1d-988d-3d1b6d06c36a"
    ],
    type: "flight"
  },
  {
    id: "a6dcea28-ad66-4bde-a5a7-db3e5b6142d2",
    basePrice: 8477,
    dateFrom: "2024-05-23T07:59:07.283Z",
    dateTo: "2024-05-24T01:15:07.283Z",
    destination: "9978fc13-8912-4e31-8059-b3e37039c3b7",
    isFavorite: true,
    offers: [
      "4bd06aa5-5d57-42c0-a601-50270eeeb7ca",
      "4154f7f6-f108-45cc-b38f-9947b8a31351",
      "9604fb2c-8452-4a61-91e3-25d65a1f3586",
      "39be9fb7-efc9-4885-8963-569321e34e7f",
      "933edee5-1cc9-41c5-abb2-61f3047a6a3e",
      "27965e6d-dee2-4cfa-9b68-476351460034"
    ],
    type: "ship"
  },
  {
    id: "9be435b5-33e0-425d-8396-85bb1e26c379",
    basePrice: 4060,
    dateFrom: "2024-05-25T10:57:07.283Z",
    dateTo: "2024-05-27T01:53:07.283Z",
    destination: "9978fc13-8912-4e31-8059-b3e37039c3b7",
    isFavorite: false,
    offers: [],
    type: "sightseeing"
  },
  {
    id: "031c39fa-20ab-4f2f-be8a-18473e77c9c8",
    basePrice: 4950,
    dateFrom: "2024-05-28T14:09:07.283Z",
    dateTo: "2024-05-29T19:52:07.283Z",
    destination: "49ac16cb-176b-4d14-859c-d230d731811d",
    isFavorite: false,
    offers: [
      "f35aff8f-c793-4f53-8e24-23631101ccb5",
      "18963e62-0ff2-4a9b-9809-eb3e941658bc",
      "961fa89a-1e5a-4e7a-873f-8d66428cdb27",
      "1b59a95f-4570-4447-9347-8fdef991de96",
      "74016829-fe16-4c1d-988d-3d1b6d06c36a"
    ],
    type: "flight"
  }
]

function getRandomPoint() {
  return getRandomArrayElement(points);
}

function getAllPoints() {
  return points;
}

export {getRandomPoint, getAllPoints};
