function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomValue(lower = 0, upper = 1000) {
  return Math.round((upper - lower) * Math.random() + lower);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, getRandomValue, updateItem};
