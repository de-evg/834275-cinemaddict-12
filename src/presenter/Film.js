import FilmView from "../view/film";
import FilmPopupView from "../view/film-popup.js";
import Comment from "../view/comment.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import CommentList from "../view/comment-list.js";
import NewCommentForm from "../view/new-comment.js";

class Film {
  constructor(popupContainer, changeData, closeAllPopup) {
    this._popupContainerElement = popupContainer;
    this._changeData = changeData;
    this._closeAllPopup = closeAllPopup;

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
    this._filmsContainerElement = filmsContainer;

    this._prevFilmComponent = this._filmComponent;
    this._prevFilmPopupComponent = this._filmPopupComponent;

    this._initFilm();
    this._initPopup();

    if (!this._prevFilmComponent || !this._prevFilmPopupComponent) {
      this._renderFilm();
      return;
    }

    replace(this._filmComponent, this._prevFilmComponent);
    replace(this._filmPopupComponent, this._prevFilmPopupComponent);

    remove(this._prevFilmComponent);
    remove(this._prevFilmPopupComponent);
  }

  _initFilm() {
    this._filmComponent = new FilmView(this._film);
    this._setFilmHandlers();
  }

  _renderCommentList() {
    render(this._commentsContainer, this._commentListComponent, RenderPosition.BEFOREEND);
  }

  _renderComments(comments) {
    comments.forEach((comment) => {
      render(this._commentListComponent, new Comment(comment), RenderPosition.BEFOREEND);
    });
  }

  _renderNewCommentForm() {
    render(this._commentsContainer, this._newCommentFormComponent, RenderPosition.BEFOREEND);
  }

  _initPopup() {
    this._filmPopupComponent = new FilmPopupView(this._film);
    this._commentsContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-wrap`);
    this._newCommentFormComponent = new NewCommentForm(this._film);
    this._commentListComponent = new CommentList();
    this._renderCommentList();
    this._renderNewCommentForm();
    this._renderComments(this._film.comments);
    this._setFilmPopupHandlers();
    this._setNewCommentFormHandlers();
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
  }

  _setNewCommentFormHandlers() {
    this._newCommentFormComponent.setEmojiClickHandler(this._handleEmojiClick);
  }

  _showPopup() {
    this._closeAllPopup();
    this._initPopup(this._film);
    this._renderPopup();
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

  _renderPopup() {
    render(this._popupContainerElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm() {
    render(this._filmsContainerElement, this._filmComponent, RenderPosition.BEFOREEND);
  }
}

export default Film;
