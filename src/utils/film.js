const sortFilmsByRelease = (films) => {
  films.slice.sort((filmA, filmB) => {
    return filmA.release - filmB.release;
  });
};

const sortFilmsByRating = (films) => {
  films.slice.sort((filmA, filmB) => {
    return filmA.rating - filmB.rating;
  });
};

const SortingMap = {
  default: (films) => films.slice(),
  release: sortFilmsByRelease,
  rating: sortFilmsByRating
};

const sortFilms = (films, sortType) => {
  return SortingMap[sortType](films);
};

export {sortFilms};
