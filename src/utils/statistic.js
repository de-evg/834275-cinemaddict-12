import moment from "moment";
import {getRandomInteger} from "../utils/common.js";

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

const generateStaistic = (films) => {
  return {
    watched: countWatchedFilms(films),
    duration: countDurationWatchedFilms(films),
    genre: findTopGenre(films),
    rank: userRanks[getRandomInteger(0, userRanks.length - 1)]
  };
};

const statisticFilter = {
  [`all-time`]: (films) => films,
  [`today`]: (films) => films.filter((film) => {
    return film.watched && (
      moment(film.watchetData).isSameOrBefore(new Date(), `day`) ||
      moment(film.watchetData).isSameOrAfter(new Date(), `day`));
  }),
  [`week`]: (films) => films.filter((film) => {
    return film.watched && (
      moment(film.watchetData).isSameOrBefore(new Date(), `week`) ||
      moment(film.watchetData).isSameOrAfter(new Date(), `week`));
  }),
  [`month`]: (films) => films.filter((film) => {
    return film.watched && (
      moment(film.watchetData).isSameOrBefore(new Date(), `month`) ||
      moment(film.watchetData).isSameOrAfter(new Date(), `month`));
  }),
  [`year`]: (films) => films.filter((film) => {
    return film.watched && (
      moment(film.watchetData).isSameOrBefore(new Date(), `year`) ||
      moment(film.watchetData).isSameOrAfter(new Date(), `year`));
  }),
};

export {generateStaistic, statisticFilter, findTopGenre, countDurationWatchedFilms, countWatchedFilms};
