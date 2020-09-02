import moment from "moment";

const sortByRelease = (filmA, filmB) => {
  if (moment(filmA.release).format() > moment(filmB.release).format()) {
    return -1;
  }

  if (moment(filmA.release).format() < moment(filmB.release).format()) {
    return 1;
  }

  return 0;
};
const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;

export {sortByRelease, sortByRating};
