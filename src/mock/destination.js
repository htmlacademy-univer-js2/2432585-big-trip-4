import { getRandomArrayElement } from '../utils/common';

const destinations =
[
  {
    id: "fb59a2fb-aaba-48b2-a70f-aeec93f4cf2e",
    description: "Paris - with crowded streets",
    name: "Paris",
    pictures: [
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/20.jpg",
        description: "Paris with a beautiful old town"
      }
    ]
  },
  {
    id: "e58c23c2-364c-4987-a1ca-491b4fd6f2e6",
    description: "Barcelona - is a beautiful city",
    name: "Barcelona",
    pictures: [
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/9.jpg",
        description: "Barcelona with crowded streets"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/20.jpg",
        description: "Barcelona with an embankment of a mighty river as a centre of attraction"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/17.jpg",
        description: "Barcelona with an embankment of a mighty river as a centre of attraction"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/9.jpg",
        description: "Barcelona middle-eastern paradise"
      }
    ]
  },
  {
    id: "8cb872d0-b8fa-46d3-bfb2-9f17f41659bc",
    description: "Moscow - a true asian pearl",
    name: "Moscow",
    pictures: [
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/7.jpg",
        description: "Moscow with crowded streets"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/9.jpg",
        description: "Moscow is a beautiful city"
      }
    ]
  },
  {
    id: "3593993f-e3cb-41d1-a9ac-966d7d3f238f",
    description: "Berlin - for those who value comfort and coziness",
    name: "Berlin",
    pictures: [
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/9.jpg",
        description: "Berlin middle-eastern paradise"
      }
    ]
  },
  {
    id: "bc8d6002-f60b-4196-b3b3-9549b62f323a",
    description: "Amsterdam - full of of cozy canteens where you can try the best coffee in the Middle East",
    name: "Amsterdam",
    pictures: [
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/4.jpg",
        description: "Amsterdam a perfect place to stay with a family"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/14.jpg",
        description: "Amsterdam with crowded streets"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/5.jpg",
        description: "Amsterdam a true asian pearl"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/12.jpg",
        description: "Amsterdam a perfect place to stay with a family"
      }
    ]
  },
  {
    id: "49ac16cb-176b-4d14-859c-d230d731811d",
    description: "Rotterdam - famous for its crowded street markets with the best street food in Asia",
    name: "Rotterdam",
    pictures: [
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/5.jpg",
        description: "Rotterdam full of of cozy canteens where you can try the best coffee in the Middle East"
      }
    ]
  },
  {
    id: "0496fab3-92ec-43a0-9d3d-c82d17def782",
    description: "Munich - a perfect place to stay with a family",
    name: "Munich",
    pictures: [
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/13.jpg",
        description: "Munich middle-eastern paradise"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/11.jpg",
        description: "Munich in a middle of Europe"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/16.jpg",
        description: "Munich famous for its crowded street markets with the best street food in Asia"
      },
      {
        src: "https://21.objects.htmlacademy.pro/static/destinations/9.jpg",
        "description": "Munich in a middle of Europe"
      }
    ]
  }
]

function getRandomDestination() {
  return getRandomArrayElement(destinations);
}

function getAllDestinations() {
  return destinations;
}

export {getRandomDestination, getAllDestinations};
