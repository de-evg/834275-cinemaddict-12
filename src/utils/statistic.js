import moment from "moment";

const Genre = {
  [`Sci-Fi`]: `Sci-Fi`,
  [`Animation`]: `Animation`,
  [`Fantasy`]: `Fantasy`,
  [`Comedy`]: `Comedy`,
  [`Adventure`]: `Adventure`,
  [`TV Series`]: `TV Series`,
  [`Family`]: `Family`,
  [`Drama`]: `Drama`,
  [`Thriller`]: `Thriller`,
  [`Action`]: `Action`
};

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

const countWatchedGenre = (films, soughtGenre) => {
  const initialValue = 0;
  return films.reduce((count, film) => {
    const index = film.genres.findIndex((genre) => genre === soughtGenre);
    if (index === -1) {
      return count;
    }
    count = count + 1;
    return count;
  }, initialValue);
};

const WatchedGenre = {
  [`Sci-Fi`]: (films) => countWatchedGenre(films, Genre[`Sci-Fi`]),
  [`Animation`]: (films) => countWatchedGenre(films, Genre[`Animation`]),
  [`Fantasy`]: (films) => countWatchedGenre(films, Genre[`Fantasy`]),
  [`Comedy`]: (films) => countWatchedGenre(films, Genre[`Comedy`]),
  [`TV Series`]: (films) => countWatchedGenre(films, Genre[`TV Series`]),
  [`Adventure`]: (films) => countWatchedGenre(films, Genre[`Adventure`]),
  [`Family`]: (films) => countWatchedGenre(films, Genre[`Family`]),
  [`Action`]: (films) => countWatchedGenre(films, Genre[`Action`]),
  [`Drama`]: (films) => countWatchedGenre(films, Genre[`Drama`]),
  [`Thriller`]: (films) => countWatchedGenre(films, Genre[`Thriller`])
};

const findTopGenre = (films) => {
  if (films.length) {
    const generateGenreMap = () => {
      const GenreMap = {};
      films.map((film) => {
        film.genres.forEach((genre) => {
          if (film.isWatched) {
            GenreMap[genre] = genre in GenreMap ? GenreMap[genre] + 1 : 1;
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

export {statisticFilter, findTopGenre, countDurationWatchedFilms, countWatchedFilms, WatchedGenre, Genre};
