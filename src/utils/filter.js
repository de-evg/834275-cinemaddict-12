const filter = {
  all: (films) => films,
  watchlist: (films) => films.filter((film) => film.inWatchlist),
  history: (films) => films.filter((film) => film.isWatched),
  favorites: (films) => films.filter((film) => film.isFavorite),
  stats: (films) => films
};

export {filter};
