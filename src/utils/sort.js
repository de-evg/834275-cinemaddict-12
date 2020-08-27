const sortByRelease = (filmA, filmB) => filmB.release - filmA.release;
const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;

export {sortByRelease, sortByRating};
