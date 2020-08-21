import {getRandomInteger} from "../utils/common.js";

const userRank = [
  `Sci-Fighter`, `Sci-Defender`, `Sci-Finder`, `Sci-Minder`
];

const countWatchedFilms = (films) => {
  const initialValue = 0;
  return films.reduce((count, film) => film.isWatched ? count + 1 : count, initialValue);
};

const countDurationWatchedFilms = (films) => {
  const initialValue = 0;
  return films.reduce((count, film) => {
    count = film.isWatched ? count + film.duration.getTime() : count;
    count = new Date(count);    
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
    rank: userRank[getRandomInteger(0, userRank.length - 1)]
  };
};

export {generateStaistic};
