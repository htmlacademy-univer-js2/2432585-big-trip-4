function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomValue(lower = 0, upper = 1000) {
  return Math.round((upper - lower) * Math.random() + lower);
}

export {  getRandomArrayElement, getRandomValue}
