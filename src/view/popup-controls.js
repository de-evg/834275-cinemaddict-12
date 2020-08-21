import SmartView from "./smart.js";
import {Controls} from "../const.js";

class PopupControl extends SmartView {
  constructor(film) {
    super();
    this._data = film;
    this._changeHandler = this._changeHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    const {inWatchlist, isWatched, isFavorite} = this._data;
    return `<section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inWatchlist ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>`;
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().addEventListener(`change`, this._changeHandler);
  }

  _changeHandler(evt) {
    if (evt.target.classList.contains(`film-details__control-input`)) {
      evt.preventDefault();
      let update;
      switch (evt.target.id) {
        case Controls.WATCHLIST:
          update = {inWatchlist: !this._data.inWatchlist};
          break;
        case Controls.WATCHED:
          update = {isWatched: !this._data.isWatched};
          break;
        case Controls.FAVORITE:
          update = {isFavorite: !this._data.isFavorite};
          break;
      }
      this.updateData(update);
      this._callback.change(update);
    }
  }

  setChangeControlHandler(callback) {
    this._callback.change = callback;
    this.getElement().addEventListener(`change`, this._changeHandler);
  }
}

export default PopupControl;
