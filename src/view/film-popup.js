import moment from "moment";
import SmartView from "./smart.js";
import {Controls, Mode} from "../const.js";
import {formatReleaseDate, formatDuration} from "../utils/film.js";

class FilmPopup extends SmartView {
  constructor(film, changeData) {
    super();
    this._isFullDate = true;
    this._data = FilmPopup.parseFilmToData(film);
    this._changeData = changeData;
    this._callback = {};

    this._btnCloseClickHandler = this._btnCloseClickHandler.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
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
      isFavorite,
      isFormDisabled} = this._data;
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
                      <img class="film-details__poster-img" src="${poster}" alt="">

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
                  <section class="film-details__controls">
                    <input 
                      type="checkbox" 
                      class="film-details__control-input visually-hidden" 
                      id="list" 
                      name="watchlist" 
                      value="${Controls.LIST}" 
                      ${inWatchlist ? `checked` : ``}
                      ${isFormDisabled ? `disabled` : ``}>
                    <label for="list" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                    <input 
                      type="checkbox" 
                      class="film-details__control-input visually-hidden" 
                      id="watched" 
                      name="watched" 
                      value="${Controls.WATCHED}" 
                      ${isWatched ? `checked` : ``}
                      ${isFormDisabled ? `disabled` : ``}>
                    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      
                    <input type="checkbox" 
                      class="film-details__control-input visually-hidden" 
                      id="favorite" 
                      name="favorite" 
                      value="${Controls.FAVORITE}" 
                      ${isFavorite ? `checked` : ``}
                      ${isFormDisabled ? `disabled` : ``}>
                    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                  </section>
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

  setChangeControlHandler(callback) {
    this._callback.change = callback;
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`change`, this._changeHandler);
  }

  setClosePopupHandler(callback) {
    this._callback.close = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._btnCloseClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._btnCloseClickHandler);
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`change`, this._changeHandler);
  }

  _changeHandler(evt) {
    if (evt.target.classList.contains(`film-details__control-input`)) {
      evt.preventDefault();
      let update;
      switch (evt.target.id) {
        case Controls.LIST:
          update = {inWatchlist: !this._data.inWatchlist};
          break;
        case Controls.WATCHED:
          update = {isWatched: !this._data.isWatched};
          update.watchingDate = update.isWatched ? moment(new Date()).toISOString() : null;
          break;
        case Controls.FAVORITE:
          update = {isFavorite: !this._data.isFavorite};
          break;
      }
      this.updateData({isFormDisabled: true,
        update
      });
      update.mode = Mode.DETAILS;
      this._changeData(update);
    }
  }

  _btnCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.close();
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film
    );
  }
}

export default FilmPopup;
