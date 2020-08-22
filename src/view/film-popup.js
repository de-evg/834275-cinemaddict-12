import SmartView from "./smart.js";
import {formatReleaseDate, formatDuration} from "../utils/film.js";

class FilmPopup extends SmartView {
  constructor(film) {
    super();
    this._isFullDate = true;
    this._data = FilmPopup.parseFilmToData(film);
    this._callback = {};
    this._submitHandler = this._submitHandler.bind(this);

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
      ageRating} = this._data;

    const releaseDate = formatReleaseDate(release, this._isFullDate);
    const filmDuration = formatDuration(duration);
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
                          <td class="film-details__cell">${filmDuration}</td>
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
                  
                </div>

                <div class="form-details__bottom-container">
                  <section class="film-details__comments-wrap">
                    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
                    <ul class="film-details__comments-list"></ul>                    
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
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._data.isWatched
    });
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      inWatchlist: !this._data.inWatchlist
    });
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(FilmPopup.parseDataToFilm(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._submitHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film
    );
  }

  static parseDataToFilm(data) {
    return Object.assign({}, data);
  }
}

export default FilmPopup;
