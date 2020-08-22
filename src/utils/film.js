import moment from "moment";

const sortByRelease = (filmA, filmB) => filmB.release - filmA.release;

const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;

const filmsToFilterMap = {
  watchlist: (films) => films.filter((film) => film.inWatchlist).length,
  history: (films) => films.filter((film) => film.isWatched).length,
  favorites: (films) => films.filter((film) => film.isFavorite).length
};

const generateFilter = (films) => {
  return Object.entries(filmsToFilterMap).map(([filterName, countFilter]) => {
    return {
      name: filterName,
      count: countFilter(films)
    };
  });
};

const generateSortedFilms = (films) => {
  return {
    default: films.slice(),
    rating: films
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .filter((film) => film.rating),
    comments: films
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .filter((film) => film.comments.length)
  };
};

const formatReleaseDate = (date, isFullDate) => {
  return isFullDate ? moment(date).format(`DD MMMM YYYY`) : moment(date).format(`YYYY`);
};

const formatDuration = (duration) => {
  let hours = Math.trunc(duration / 60);
  let minutes = duration % 60;
  minutes = minutes > 10 ? minutes : `0${minutes}`;
  let time = moment(`${hours}${minutes}`, `hmm`).format(`H:mm`);
  time = time.split(`:`);
  const result = time.reduce((foramtedTime, value) => {
    const format = foramtedTime.length
      ? `m`
      : `h `;
    foramtedTime = `${foramtedTime}${value}${format}`;
    return foramtedTime;
  }, ``);

  return result;
};

export {sortByRelease, sortByRating, generateFilter, generateSortedFilms, formatReleaseDate, formatDuration};
