function getRandomValue(lower = 0, upper = 1000) {
  return Math.round((upper - lower) * Math.random() + lower);
}

export { getRandomValue };
