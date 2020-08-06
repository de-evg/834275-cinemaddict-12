const createFilmTemplate = (film) => {
  const {title, rating, release, duration, genres, poster, description, comments, id} = film;
  const year = release.getFullYear();
  const shortDescription = description.length > 140
    ? `${description.slice(0, 138)}...`
    : description;
  return (
    `<article class="film-card" id="${id}">
              <h3 class="film-card__title">${title}</h3>
              <p class="film-card__rating">${rating}</p>
              <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genres[0]}</span>
              </p>
              <img src="./images/posters/${poster}" alt="" class="film-card__poster">
              <p class="film-card__description">${shortDescription}</p>
              <a class="film-card__comments">${comments} comments</a>
              <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
              </form>
          </article>`
  );
};

export {createFilmTemplate};
