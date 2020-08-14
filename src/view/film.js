import AbstractView from "./abstract.js";

class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    const {title, rating, release, duration, genres, poster, description, comments, inWatchlist, isWatched, isFavorite} = this._film;
    const year = release.getFullYear();
    const watchlistClassName = inWatchlist ? `film-card__controls-item--active` : null;
    const watchedClassName = isWatched ? `film-card__controls-item--active` : null;
    const favoriteClassName = isFavorite ? `film-card__controls-item--active` : null;
    const shortDescription = description.length > 140
      ? `${description.slice(0, 138)}...`
      : description;

    return `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}">Mark as favorite</button>
        </form>
    </article>`;
  }

  _clickHandler(evt) {
    const target = evt.target;
    if (target.classList.contains(`film-card__title`) || target.classList.contains(`film-card__poster`) || target.classList.contains(`film-card__comments`)) {
      evt.preventDefault();
      this._callback.click();
    }

  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

export default Film;
