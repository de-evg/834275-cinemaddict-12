const filmsToFilterMap = {
  watchlist: (films) => films.filter((film) => film.inWatchlist),
  history: (films) => films.filter((film) => film.isWatched),
  favorites: (films) => films.filter((film) => film.isFavorite)
};

export {filmsToFilterMap};
