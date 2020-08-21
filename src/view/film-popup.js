import SmartView from "./smart.js";

class FilmPopup extends SmartView {
  constructor(film) {
    super();
    this._data = FilmPopup.parseFilmToData(film);
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    const {title,
      originalTitle,
      poster,
      rating,
      director,
      writers,
      actors,
      release,
      duration,
      country,
      genres,
      description,
      comments,
      ageRating,
      inWatchlist,
      isWatched,
      isFavorite} = this._data;

    const releaseDate = `${release.getDate()} ${release.toLocaleString(`en-US`, {month: `long`})} ${release.getFullYear()}`;
    const genreElements = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`);

    return `<section class="film-details">
              <form class="film-details__inner" action="" method="get">
                <div class="form-details__top-container">
                  <div class="film-details__close">
                    <button class="film-details__close-btn" type="button">close</button>
                  </div>
                  <div class="film-details__info-wrap">
                    <div class="film-details__poster">
                      <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

                      <p class="film-details__age">${ageRating}</p>
                    </div>

                    <div class="film-details__info">
                      <div class="film-details__info-head">
                        <div class="film-details__title-wrap">
                          <h3 class="film-details__title">${title}</h3>
                          <p class="film-details__title-original">Original: ${originalTitle}</p>
                        </div>

                        <div class="film-details__rating">
                          <p class="film-details__total-rating">${rating}</p>
                        </div>
                      </div>

                      <table class="film-details__table">
                        <tr class="film-details__row">
                          <td class="film-details__term">Director</td>
                          <td class="film-details__cell">${director}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Writers</td>
                          <td class="film-details__cell">${writers.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Actors</td>
                          <td class="film-details__cell">${actors.join(`, `)}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Release Date</td>
                          <td class="film-details__cell">${releaseDate}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Runtime</td>
                          <td class="film-details__cell">${duration}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Country</td>
                          <td class="film-details__cell">${country}</td>
                        </tr>
                        <tr class="film-details__row">
                          <td class="film-details__term">Genre${genreElements.length > 1 ? `s` : ``}</td>
                          <td class="film-details__cell">
                            ${genreElements.join(``)}</td>
                        </tr>
                      </table>

                      <p class="film-details__film-description">
                        ${description}
                      </p>
                    </div>
                  </div>

                  <section class="film-details__controls">
                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inWatchlist ? `checked` : ``}>
                    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
                    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
                    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                  </section>
                </div>

                <div class="form-details__bottom-container">
                  <section class="film-details__comments-wrap">
                    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
                  </section>                  
                </div>
              </form>
            </section>`;
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setBtnCloseClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film
    );
  }
}

export default FilmPopup;
