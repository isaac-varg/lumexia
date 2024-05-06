// This gets a random integer between the parameters

export const getRandomIntBetween = (minimum: number, maximum: number) => {
  let min = Math.ceil(minimum);
  let max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
