import moment from "moment";

const countWatchedFilms = (films) => {
  const initialValue = 0;
  return films.reduce((count, film) => film.isWatched ? count + 1 : count, initialValue);
};

const countDurationWatchedFilms = (films) => {
  const initialValue = 0;
  return films.reduce((count, film) => {
    count = film.isWatched ? count + +film.duration : count;
    return count;
  }, initialValue);
};

const findTopGenre = (films) => {
  if (films.length) {
    const generateGenreMap = () => {
      const GenreMap = {};
      films.map((film) => {
        film.genres.forEach((genre) => {
          if (film.isWatched) {
            GenreMap[genre] = genre in GenreMap ? GenreMap[genre] + 1 : 0;
          }
        });
      });
      return GenreMap;
    };
    const GenreMap = generateGenreMap();
    const sortGenres = (genre) => {
      return Object.entries(genre)
        .sort((a, b) => b[1] - a[1]);
    };
    const topGanres = sortGenres(GenreMap);
    return topGanres[0][0];
  } else {
    return ``;
  }
};

const statisticFilter = {
  [`all-time`]: (films) => films,
  [`today`]: (films) => films.filter((film) => {
    return film.isWatched && (
      moment(film.watchedDate).isSameOrBefore(new Date(), `day`) ||
      moment(film.watchedDate).isSameOrAfter(new Date(), `day`));
  }),
  [`week`]: (films) => films.filter((film) => {
    return film.isWatched && (
      moment(film.watchedDate).isSameOrBefore(new Date(), `week`) ||
      moment(film.watchedDate).isSameOrAfter(new Date(), `week`));
  }),
  [`month`]: (films) => films.filter((film) => {
    return film.isWatched && (
      moment(film.watchedDate).isSameOrBefore(new Date(), `month`) ||
      moment(film.watchedDate).isSameOrAfter(new Date(), `month`));
  }),
  [`year`]: (films) => films.filter((film) => {
    return film.isWatched && (
      moment(film.watchedDate).isSameOrBefore(new Date(), `year`) ||
      moment(film.watchedDate).isSameOrAfter(new Date(), `year`));
  }),
};

export {statisticFilter, findTopGenre, countDurationWatchedFilms, countWatchedFilms};
