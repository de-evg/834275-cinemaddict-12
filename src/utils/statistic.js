import moment from "moment";

const Interval = {
  WEEK: moment().startOf(`week`),
  MONTH: moment().startOf(`month`),
  YEAR: moment().startOf(`year`),
};

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
  [`all-time`]: (films) => films.filter((film) => {
    let today = new Date();
    today = moment(today).format(`YYYY-MM-DD`);
    const watched = moment(film.watchingDate).format(`YYYY-MM-DD`);
    const before = moment(watched).isSameOrBefore(today);
    return film.isWatched && (before);
  }),
  [`today`]: (films) => films.filter((film) => {
    let today = new Date();
    today = moment(today).format(`YYYY-MM-DD`);
    const watched = moment(film.watchingDate).format(`YYYY-MM-DD`);
    const before = moment(today).isSame(watched);
    return film.isWatched && (before);
  }),
  [`week`]: (films) => films.filter((film) => {
    const watched = moment(film.watchingDate).format(`YYYY-MM-DD`);
    const before = moment(watched).isSameOrAfter(Interval.WEEK);
    return film.isWatched && (before);
  }),
  [`month`]: (films) => films.filter((film) => {
    const watched = moment(film.watchingDate).format(`YYYY-MM-DD`);
    const before = moment(watched).isSameOrAfter(Interval.MONTH);
    return film.isWatched && (before);
  }),
  [`year`]: (films) => films.filter((film) => {
    const watched = moment(film.watchingDate).format(`YYYY-MM-DD`);
    const before = moment(watched).isSameOrAfter(Interval.YEAR);
    return film.isWatched && (before);
  }),
};

export {statisticFilter, findTopGenre, countDurationWatchedFilms, countWatchedFilms};
