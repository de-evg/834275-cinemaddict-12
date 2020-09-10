const Rating = {
  MIN: -Infinity,
  MAX: +Infinity
};

const profileRang = new Map();

profileRang.set([Rating.MIN, 0], ``);
profileRang.set([1, 10], `Novice`);
profileRang.set([11, 20], `Fan`);
profileRang.set([21, Rating.MAX], `Movie Buff`);

const setProfileRang = (watchedFilmCount) => {
  let result = ``;
  for (const entry of profileRang) {
    const range = entry[0];
    const rang = entry[1];
    if (range[0] <= watchedFilmCount && range[1] >= watchedFilmCount) {
      result = rang;
    }
  }
  return result;
};

export {setProfileRang};
