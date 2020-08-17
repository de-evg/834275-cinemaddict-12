import {getRandomInteger} from "../utils/common.js";

const Rating = {
  MIN: 0,
  MAX: 50
};

const profileRang = new Map();

profileRang.set([Rating.MIN, 0], ``);
profileRang.set([1, 10], `Novice`);
profileRang.set([11, 20], `Fan`);
profileRang.set([21, Rating.MAX], `Movie Buff`);

const generateProfileRang = () => {
  const ratingCount = getRandomInteger(Rating.MIN, Rating.MAX);
  let result;
  for (const entry of profileRang) {
    const range = entry[0];
    const rang = entry[1];
    if (range[0] <= ratingCount && range[1] >= ratingCount) {
      result = rang;
    }
  }
  return result;
};

export {generateProfileRang};
