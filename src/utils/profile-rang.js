const Rating = {
  MIN: -Infinity,
  MAX: +Infinity
};

const profileRang = new Map();

profileRang.set([Rating.MIN, 0], ``);
profileRang.set([1, 10], `Novice`);
profileRang.set([11, 20], `Fan`);
profileRang.set([21, Rating.MAX], `Movie Buff`);

export {profileRang};
