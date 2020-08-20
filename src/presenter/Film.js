import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import Comments from "../view/comments.js";
import {render, RenderPosition, insert, remove, replace} from "../utils/render.js";

class Film {
  constructor(popupContainer, changeData, changePopup) {
    this._popupContainerElement = popupContainer;
    this._changeData = changeData;
    this._changePopup = changePopup;

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleBtnCloseClick = this._handleBtnCloseClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEmojiClick = this._handleEmojiClick.bind(this);
    this._EscKeyDownHandler = this._EscKeyDownHandler.bind(this);
  }

  init(film, filmsContainer) {
    this._film = film;

    this._prevFilmComponent = this._filmComponent;
    this._prevFilmPopupComponent = this._filmPopupComponent;

    this._filmComponent = new FilmView(film);
    this._filmPopupComponent = new FilmPopupView(film);
    this._commentsComponent = new Comments(film.comments);
    this._commentsContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-list`);
    this._filmsContainerElement = filmsContainer;

    this._setFilmHandlers();
    this._setFilmPopupHandlers();

    if (!this._prevFilmComponent || !this._prevFilmPopupComponent) {
      this._renderFilm();
      return;
    }

    replace(this._filmComponent, this._prevFilmComponent);
    replace(this._filmPopupComponent, this._prevFilmPopupComponent);

    remove(this._prevFilmComponent);
    remove(this._prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  _setFilmHandlers() {
    this._filmComponent.setClickHandler(this._handleFilmClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _setFilmPopupHandlers() {
    this._filmPopupComponent.setBtnCloseClickHandler(this._handleBtnCloseClick);
    this._filmPopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmPopupComponent.setEmojiClickHandler(this._handleEmojiClick);    
  }

  _showPopup() {
    this._changePopup();
    insert(this._popupContainerElement, this._filmPopupComponent);
    document.addEventListener(`keydown`, this._EscKeyDownHandler);
  }

  removeOpenedPopup() {
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._EscKeyDownHandler);
    this._setFilmPopupHandlers();
  }

  _handleFilmClick() {
    this._showPopup();
  }

  _handleBtnCloseClick() {
    this.removeOpenedPopup();
  }

  _EscKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._handleBtnCloseClick();
      document.removeEventListener(`keydown`, this._EscKeyDownHandler);
    }
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              inWatchlist: !this._film.inWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleEmojiClick(emojiElement) {
    const parent = emojiElement.parentElement;
    const emojyName = parent.htmlFor;
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              emoji: emojyName
            }
        )
    );
  }

  _renderFilm() {
    render(this._commentsContainer, this._commentsComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerElement, this._filmComponent, RenderPosition.BEFOREEND);
  }
}

export default Film;
