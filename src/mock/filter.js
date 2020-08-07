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

export {generateFilter};